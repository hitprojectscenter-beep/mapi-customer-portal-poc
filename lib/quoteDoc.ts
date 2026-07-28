// Client-side branded document generator. Opens a print-optimized window the
// user saves as PDF via the browser's native "Save as PDF". Real tiled maps
// (street + orthophoto) with north arrow / scale bar / ITM coordinates.
// Production swaps this for a server-rendered DocGen/PDF from Salesforce.

import proj4 from "proj4";

proj4.defs(
  "EPSG:2039",
  "+proj=tmerc +lat_0=31.7343936111111 +lon_0=35.2045169444444 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=-24.0024,-17.1032,-17.8444,-0.33077,-1.85269,1.66969,5.4262 +units=m +no_defs"
);

export interface QuoteDocData {
  title: string;          // e.g. "הצעת מחיר" / "אישור הזמנה"
  serviceName: string;
  orderId?: string;
  total: number;
  lines: string[];        // route/summary lines
  delivery?: string;
  date?: string;          // ISO or display date passed in (no Date.now here)
  /** Ordered-area polygon, points normalized 0-1 (fallback drawing) */
  shape?: { x: number; y: number }[];
  /** Geo data — renders a REAL tiled map (street/ortho) with the polygon,
      compass and scale bar in the 18×15cm ordered-area block. */
  geo?: { latlngs: { lat: number; lng: number }[]; basemap: "street" | "ortho" };
}

// Web Mercator world-pixel coords at a given zoom (256px tiles)
function project(lat: number, lng: number, z: number) {
  const s = 256 * Math.pow(2, z);
  const x = (lng + 180) / 360 * s;
  const sinL = Math.sin(lat * Math.PI / 180);
  const y = (0.5 - Math.log((1 + sinL) / (1 - sinL)) / (4 * Math.PI)) * s;
  return { x, y };
}

// Build an HTML block with a real tiled map (street or orthophoto) covering the
// polygon, the polygon overlaid, a north arrow and a scale bar.
function tiledAreaMap(geo: { latlngs: { lat: number; lng: number }[]; basemap: "street" | "ortho" }): string {
  const pts = geo.latlngs;
  if (!pts || pts.length < 3) return "";
  const W = 540, H = 300; // compact so the whole quote fits one A4 page
  const lats = pts.map(p => p.lat), lngs = pts.map(p => p.lng);
  let minLat = Math.min(...lats), maxLat = Math.max(...lats), minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
  // pad the bbox by 25%
  const padLat = (maxLat - minLat) * 0.25 || 0.002, padLng = (maxLng - minLng) * 0.25 || 0.002;
  minLat -= padLat; maxLat += padLat; minLng -= padLng; maxLng += padLng;
  const cLat = (minLat + maxLat) / 2, cLng = (minLng + maxLng) / 2;

  // pick the zoom that fits the padded bbox inside W×H
  let zoom = 18;
  for (let z = 18; z >= 6; z--) {
    const a = project(minLat, minLng, z), b = project(maxLat, maxLng, z);
    if (Math.abs(b.x - a.x) <= W && Math.abs(a.y - b.y) <= H) { zoom = z; break; }
  }
  const cPix = project(cLat, cLng, zoom);
  const originX = cPix.x - W / 2, originY = cPix.y - H / 2; // top-left world-pixel of the box

  // tiles covering the box
  const tileUrl = (z: number, x: number, y: number) => geo.basemap === "ortho"
    ? `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`
    : `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  const tx0 = Math.floor(originX / 256), ty0 = Math.floor(originY / 256);
  const tx1 = Math.floor((originX + W) / 256), ty1 = Math.floor((originY + H) / 256);
  let tiles = "";
  for (let tx = tx0; tx <= tx1; tx++) for (let ty = ty0; ty <= ty1; ty++) {
    const left = tx * 256 - originX, top = ty * 256 - originY;
    tiles += `<img src="${tileUrl(zoom, tx, ty)}" style="position:absolute;left:${left}px;top:${top}px;width:256px;height:256px" onerror="this.style.display='none'"/>`;
  }
  // polygon in box-pixel space
  const poly = pts.map(p => { const q = project(p.lat, p.lng, zoom); return `${(q.x - originX).toFixed(1)},${(q.y - originY).toFixed(1)}`; }).join(" ");

  // scale bar: meters-per-pixel at this zoom & latitude, pick a round distance
  const mpp = 156543.03392 * Math.cos(cLat * Math.PI / 180) / Math.pow(2, zoom);
  const targetPx = 120;
  const roundMeters = [10,20,50,100,200,500,1000,2000,5000].reduce((a,b)=> Math.abs(b/mpp-targetPx) < Math.abs(a/mpp-targetPx) ? b : a, 100);
  const barPx = roundMeters / mpp;
  const scaleLabel = roundMeters >= 1000 ? `${roundMeters/1000} ק"מ` : `${roundMeters} מ'`;

  return `<div class="area">
    <p class="area-ttl">הטווח שהוזמן על ידי הלקוח — ${geo.basemap === "ortho" ? "תצלום אוויר" : "מפת רחובות"}</p>
    <div class="mapbox" style="position:relative;width:${W}px;height:${H}px;overflow:hidden;border:2px solid #b4924e;border-radius:8px;margin:0 auto;background:#e8ecef">
      ${tiles}
      <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">
        <polygon points="${poly}" fill="rgba(180,146,78,0.28)" stroke="#8f5a00" stroke-width="3"/>
      </svg>
      <!-- North arrow (Web Mercator is north-up) -->
      <svg width="46" height="56" style="position:absolute;top:8px;right:8px" viewBox="0 0 46 56">
        <rect x="0" y="0" width="46" height="56" rx="6" fill="rgba(255,255,255,0.88)" stroke="#b4924e"/>
        <polygon points="23,6 30,30 23,24 16,30" fill="#001d35"/>
        <text x="23" y="48" text-anchor="middle" font-size="15" font-weight="bold" fill="#001d35">N</text>
      </svg>
      <!-- Scale bar -->
      <div style="position:absolute;left:10px;bottom:10px;background:rgba(255,255,255,0.9);padding:3px 8px;border-radius:6px;border:1px solid #b4924e;font-size:11px;color:#001d35;font-weight:600">
        <div style="width:${barPx.toFixed(0)}px;height:6px;border:1.5px solid #001d35;border-top:none;display:inline-block;vertical-align:middle"></div>
        <span style="margin-inline-start:6px">${scaleLabel}</span>
      </div>
    </div>
    <p class="area-note">הפוליגון מייצג את האזור שהלקוח סימן על המפה. המידות המדויקות (שטח וקואורדינטות ITM) יאומתו על ידי מפ"י.</p>
  </div>`;
}

function esc(s: string): string {
  return (s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
}

export function openQuoteDoc(d: QuoteDocData): void {
  const w = window.open("", "_blank", "width=820,height=1000");
  if (!w) {
    alert("הדפדפן חסם את חלון ההורדה. אנא אפשר חלונות קופצים ונסה שוב.");
    return;
  }
  const rows = d.lines.filter(Boolean).map(l => `<tr><td>${esc(l)}</td></tr>`).join("");
  const origin = window.location.origin;

  // The ordered-area block: a REAL tiled map (street or orthophoto) with the
  // marked polygon, a north arrow and a scale bar. Falls back to a simple
  // outline if geo data is missing.
  const areaBlock = d.geo && d.geo.latlngs?.length >= 3
    ? tiledAreaMap(d.geo)
    : (d.shape && d.shape.length >= 3 ? (() => {
        const W = 660, H = 520;
        const pts = d.shape!.map(p => `${(p.x * W).toFixed(1)},${(p.y * H).toFixed(1)}`).join(" ");
        return `<div class="area"><p class="area-ttl">הטווח שהוזמן על ידי הלקוח</p>
          <svg viewBox="0 0 ${W} ${H}" width="17cm" height="13cm"><rect width="${W}" height="${H}" fill="#fbfaf7"/>
          <polygon points="${pts}" fill="rgba(180,146,78,0.2)" stroke="#8f7439" stroke-width="2.5"/>
          <rect x="1" y="1" width="${W-2}" height="${H-2}" fill="none" stroke="#b4924e" stroke-width="2"/></svg></div>`;
      })() : "");

  const html = `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>${esc(d.title)} — ${esc(d.serviceName)}</title>
<style>
  @page { size: A4; margin: 12mm; }
  * { box-sizing: border-box; }
  html, body { height: auto; }
  body { font-family: "Heebo","Assistant",Arial,sans-serif; color: #1b2b45; margin: 0; padding: 14px; }
  .hd { display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #b4924e; padding-bottom: 10px; margin-bottom: 12px; }
  .brandbox { display:flex; align-items:center; gap:12px; }
  .brandbox img { width:52px; height:52px; object-fit:contain; }
  .brand { font-size: 21px; font-weight: 800; color:#001d35; }
  .brand small { display:block; font-size: 11px; color:#8f7439; font-weight:600; }
  .meta { text-align:left; font-size: 11px; color:#42474f; }
  .area { margin-top: 14px; page-break-inside: avoid; text-align:center; }
  .area-ttl { font-size: 13px; font-weight:700; color:#463f7a; margin-bottom: 6px; }
  .area svg, .area .mapbox { border-radius: 8px; }
  .area-note { font-size: 10px; color:#6b7280; margin-top: 6px; max-width: 14cm; margin-inline:auto; line-height:1.5; }
  h1 { font-size: 18px; color:#463f7a; margin: 0 0 2px; }
  .svc { font-size: 14px; color:#0b2545; margin-bottom: 10px; }
  table { width:100%; border-collapse: collapse; margin: 6px 0 10px; }
  td { padding: 6px 12px; border-bottom: 1px solid #e7e3f6; font-size: 12.5px; }
  .total { display:flex; justify-content:space-between; align-items:baseline; background:#faf6ec; border:1px solid rgba(180,146,78,0.5); border-radius: 10px; padding: 10px 16px; margin-top: 6px; }
  .total b { font-size: 22px; color:#001d35; }
  .note { font-size: 10px; color:#6b7280; margin-top: 12px; line-height:1.5; }
  .stamp { margin-top: 10px; border:1px dashed rgba(180,146,78,0.6); border-radius:10px; padding:8px; text-align:center; font-size:11px; color:#8f7439; }
  @media print { .noprint { display:none; } }
  .btn { background:#0b2545; color:#fff; border:none; border-radius:999px; padding:12px 26px; font-size:14px; font-weight:700; cursor:pointer; }
</style></head><body>
  <div class="hd">
    <div class="brandbox">
      <img src="${origin}/mapi-logo.png" alt="מפי" onerror="this.style.display='none'"/>
      <div class="brand">מפ&quot;י<small>המרכז למיפוי ישראל</small></div>
    </div>
    <div class="meta">${esc(d.title)}${d.orderId ? `<br>מס' סימוכין: ${esc(d.orderId)}` : ""}${d.date ? `<br>תאריך: ${esc(d.date)}` : ""}</div>
  </div>
  <h1>${esc(d.title)}</h1>
  <div class="svc">${esc(d.serviceName)}</div>
  ${rows ? `<table>${rows}</table>` : ""}
  ${d.delivery ? `<div class="svc">אספקה: ${esc(d.delivery)}</div>` : ""}
  <div class="total"><span>סכום לתשלום (כולל מע&quot;מ)</span><b>₪${Number(d.total).toLocaleString()}</b></div>
  ${areaBlock}
  <div class="note">
    מסמך זה הופק מפורטל הלקוחות של המרכז למיפוי ישראל והוא מהווה הצעת מחיר.
    התשלום מתבצע דרך שירות התשלומים הממשלתי. לפרטים: *6274 · service@mapi.gov.il
  </div>
  <div class="stamp">מסמך הדגמה (POC) — בפרודקשן יופק כ-PDF חתום דרך Salesforce DocGen</div>
  <div class="noprint" style="margin-top:26px; text-align:center;">
    <button class="btn" onclick="window.print()">שמור כ-PDF / הדפס</button>
  </div>
  <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 400); };</script>
</body></html>`;
  w.document.open();
  w.document.write(html);
  w.document.close();
}

// ---------------------------------------------------------------------------
// Realistic product sample — a branded document showing a REAL tiled map of a
// sample area (street + orthophoto), with title block, north arrow, scale bar,
// coordinate labels and a legend. Opened from the PDP "download sample" CTA.
// ---------------------------------------------------------------------------

// Render a real tiled map into a fixed WxH box centered on lat/lng at a zoom,
// with a polygon (optional), north arrow, scale bar and coordinate ticks.
function tiledMapBox(opts: {
  lat: number; lng: number; zoom: number; W: number; H: number;
  basemap: "street" | "ortho"; poly?: { lat: number; lng: number }[];
}): string {
  const { lat, lng, zoom, W, H, basemap, poly } = opts;
  const c = project(lat, lng, zoom);
  const originX = c.x - W / 2, originY = c.y - H / 2;
  const tileUrl = (x: number, y: number) => basemap === "ortho"
    ? `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${y}/${x}`
    : `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
  const tx0 = Math.floor(originX / 256), ty0 = Math.floor(originY / 256);
  const tx1 = Math.floor((originX + W) / 256), ty1 = Math.floor((originY + H) / 256);
  let tiles = "";
  for (let tx = tx0; tx <= tx1; tx++) for (let ty = ty0; ty <= ty1; ty++) {
    tiles += `<img src="${tileUrl(tx, ty)}" style="position:absolute;left:${tx * 256 - originX}px;top:${ty * 256 - originY}px;width:256px;height:256px" onerror="this.style.display='none'"/>`;
  }
  const polySvg = poly && poly.length >= 3
    ? `<polygon points="${poly.map(p => { const q = project(p.lat, p.lng, zoom); return `${(q.x - originX).toFixed(0)},${(q.y - originY).toFixed(0)}`; }).join(" ")}" fill="rgba(180,146,78,0.25)" stroke="#8f5a00" stroke-width="3"/>`
    : "";
  const mpp = 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom);
  const roundM = [10,20,50,100,200,500,1000,2000].reduce((a,b)=> Math.abs(b/mpp-120) < Math.abs(a/mpp-120) ? b : a, 100);
  const barPx = roundM / mpp;
  const scaleLabel = roundM >= 1000 ? `${roundM/1000} ק"מ` : `${roundM} מ'`;
  const [itmX, itmY] = (() => { const p = proj4("EPSG:4326", "EPSG:2039", [lng, lat]); return [Math.round(p[0]), Math.round(p[1])]; })();
  return `<div class="mapbox" style="position:relative;width:${W}px;height:${H}px;overflow:hidden;border:2px solid #b4924e;border-radius:8px;background:#e8ecef">
    ${tiles}
    ${polySvg ? `<svg width="${W}" height="${H}" style="position:absolute;inset:0">${polySvg}</svg>` : ""}
    <svg width="46" height="56" style="position:absolute;top:8px;right:8px" viewBox="0 0 46 56"><rect width="46" height="56" rx="6" fill="rgba(255,255,255,0.9)" stroke="#b4924e"/><polygon points="23,6 30,30 23,24 16,30" fill="#001d35"/><text x="23" y="48" text-anchor="middle" font-size="15" font-weight="bold" fill="#001d35">N</text></svg>
    <div style="position:absolute;left:10px;bottom:10px;background:rgba(255,255,255,0.9);padding:3px 8px;border-radius:6px;border:1px solid #b4924e;font-size:11px;color:#001d35;font-weight:600"><div style="width:${barPx.toFixed(0)}px;height:6px;border:1.5px solid #001d35;border-top:none;display:inline-block;vertical-align:middle"></div><span style="margin-inline-start:6px">${scaleLabel}</span></div>
    <div style="position:absolute;right:10px;bottom:10px;background:rgba(255,255,255,0.9);padding:2px 8px;border-radius:6px;font-size:10px;font-family:monospace;color:#42474f">ITM ${itmX.toLocaleString()}, ${itmY.toLocaleString()}</div>
  </div>`;
}

export function openSampleMap(serviceName: string, slug: string): void {
  const w = window.open("", "_blank", "width=900,height=1100");
  if (!w) { alert("הדפדפן חסם את חלון הדגימה. אנא אפשר חלונות קופצים ונסה שוב."); return; }
  const origin = window.location.origin;
  // Sample location: central Tel Aviv (data-rich, recognizable)
  const lat = 32.0809, lng = 34.7806;
  const aerialFirst = /aerial|ortho|elevation|photo/.test(slug);
  const street = tiledMapBox({ lat, lng, zoom: 16, W: 720, H: 300, basemap: "street" });
  const ortho = tiledMapBox({ lat, lng, zoom: 16, W: 720, H: 300, basemap: "ortho" });
  const html = `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>דגימה — ${esc(serviceName)} · מפי</title>
<style>
  @page { size: A4; margin: 14mm; }
  * { box-sizing:border-box; }
  body { font-family:"Heebo","Assistant",Arial,sans-serif; color:#1b2b45; margin:0; padding:26px; }
  .hd { display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #b4924e; padding-bottom:14px; margin-bottom:16px; }
  .brandbox { display:flex; align-items:center; gap:12px; }
  .brandbox img { width:58px; height:58px; object-fit:contain; }
  .brand { font-size:22px; font-weight:800; color:#001d35; }
  .brand small { display:block; font-size:11px; color:#8f7439; font-weight:600; }
  .tag { border:1px solid #8f7439; color:#8f7439; font-size:12px; font-weight:700; padding:5px 14px; border-radius:999px; }
  h1 { font-size:20px; color:#463f7a; margin:6px 0 2px; }
  .sub { color:#6b7280; font-size:12px; margin-bottom:16px; }
  .cap { font-size:13px; font-weight:700; color:#001d35; margin:14px 0 6px; display:flex; align-items:center; gap:6px; }
  .legend { display:flex; gap:18px; flex-wrap:wrap; margin-top:14px; font-size:11px; color:#42474f; }
  .legend span { display:inline-flex; align-items:center; gap:5px; }
  .sw { width:14px; height:10px; border-radius:2px; display:inline-block; }
  .note { font-size:11px; color:#9aa0a6; margin-top:16px; line-height:1.6; border-top:1px solid #eee; padding-top:10px; }
  @media print { .noprint { display:none; } }
  .btn { background:#0b2545; color:#fff; border:none; border-radius:999px; padding:11px 24px; font-size:14px; font-weight:700; cursor:pointer; }
</style></head><body>
  <div class="hd">
    <div class="brandbox"><img src="${origin}/mapi-logo.png" onerror="this.style.display='none'"/><div class="brand">מפ&quot;י<small>המרכז למיפוי ישראל</small></div></div>
    <span class="tag">דגימה חינם · ללא עלות</span>
  </div>
  <h1>${esc(serviceName)} — דגימת מוצר</h1>
  <p class="sub">אזור לדוגמה: מרכז תל אביב-יפו · מערכת ייחוס רשת ישראל (ITM / EPSG:2039)</p>

  ${aerialFirst ? `<p class="cap">▸ תצלום אוויר (אורתופוטו)</p>${ortho}<p class="cap">▸ שכבת מפה סטנדרטית</p>${street}`
                : `<p class="cap">▸ שכבת מפה סטנדרטית</p>${street}<p class="cap">▸ תצלום אוויר (אורתופוטו)</p>${ortho}`}

  <div class="legend">
    <span><span class="sw" style="background:rgba(180,146,78,0.35);border:1px solid #8f5a00"></span> אזור לדוגמה</span>
    <span><span class="sw" style="background:#001d35"></span> חץ צפון</span>
    <span>📏 קנה מידה גרפי</span>
    <span>🧭 קואורדינטות ITM</span>
  </div>

  <p class="note">
    זוהי דגימת התרשמות (POC) הממחישה את שכבות המוצר — תצלום אוויר ומפה — עם חץ צפון, קנה מידה וקואורדינטות ITM.
    בפרודקשן יסופק קובץ המוצר האמיתי מארכיון מפ&quot;י ברזולוציה ובפורמט המוזמנים (GeoTIFF/PDF/DWG). לפרטים: *6274 · service@mapi.gov.il
  </p>
  <div class="noprint" style="margin-top:22px;text-align:center"><button class="btn" onclick="window.print()">שמור כ-PDF / הדפס</button></div>
  <script>window.onload=function(){ setTimeout(function(){ window.print(); }, 900); };</script>
</body></html>`;
  w.document.open(); w.document.write(html); w.document.close();
}

// ---------------------------------------------------------------------------
// Clean payment receipt (opened from the payment sandbox). A dedicated
// document — NOT window.print() of the page — so no UI chrome leaks in.
// ---------------------------------------------------------------------------
export interface ReceiptData {
  receiptNo: string;
  referenceId: string;
  serviceName: string;
  amount: number;
  date: string;          // display date
  method?: string;       // e.g. "כרטיס אשראי"
}

export function openReceiptDoc(d: ReceiptData): void {
  const w = window.open("", "_blank", "width=760,height=920");
  if (!w) { alert("הדפדפן חסם את חלון ההדפסה. אנא אפשר חלונות קופצים ונסה שוב."); return; }
  const origin = window.location.origin;
  const html = `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>קבלה ${esc(d.receiptNo)} — מפי</title>
<style>
  @page { size: A4; margin: 20mm; }
  * { box-sizing: border-box; }
  body { font-family:"Heebo","Assistant",Arial,sans-serif; color:#1b2b45; margin:0; padding:32px; }
  .hd { display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #b4924e; padding-bottom:18px; margin-bottom:8px; }
  .brandbox { display:flex; align-items:center; gap:14px; }
  .brandbox img { width:66px; height:66px; object-fit:contain; }
  .brand { font-size:24px; font-weight:800; color:#001d35; }
  .brand small { display:block; font-size:12px; color:#8f7439; font-weight:600; }
  .rc { text-align:left; font-size:12px; color:#42474f; line-height:1.7; }
  .rc b { color:#001d35; font-size:14px; }
  h1 { font-size:22px; color:#463f7a; text-align:center; margin:26px 0 4px; }
  .sub { text-align:center; color:#6b7280; font-size:12px; margin-bottom:24px; }
  table { width:100%; border-collapse:collapse; margin:12px 0; }
  td { padding:12px 14px; border-bottom:1px solid #e7e3f6; font-size:14px; }
  td.k { color:#6b7280; width:42%; }
  td.v { font-weight:600; color:#0b2545; }
  .total { display:flex; justify-content:space-between; align-items:baseline; background:#faf6ec; border:1px solid rgba(180,146,78,0.5); border-radius:12px; padding:16px 20px; margin-top:14px; }
  .total b { font-size:26px; color:#001d35; }
  .paid { text-align:center; margin-top:22px; }
  .paid span { display:inline-block; border:2px solid #548235; color:#548235; font-weight:800; font-size:18px; letter-spacing:2px; padding:8px 26px; border-radius:10px; transform:rotate(-4deg); }
  .true { text-align:center; margin-top:26px; font-size:13px; color:#8f7439; font-weight:600; }
  .note { text-align:center; font-size:11px; color:#9aa0a6; margin-top:10px; line-height:1.6; }
  @media print { .noprint { display:none; } }
  .btn { background:#0b2545; color:#fff; border:none; border-radius:999px; padding:12px 26px; font-size:14px; font-weight:700; cursor:pointer; }
</style></head><body>
  <div class="hd">
    <div class="brandbox">
      <img src="${origin}/mapi-logo.png" alt="מפי" onerror="this.style.display='none'"/>
      <div class="brand">מפ&quot;י<small>המרכז למיפוי ישראל</small></div>
    </div>
    <div class="rc">קבלה מס'<br><b>${esc(d.receiptNo)}</b></div>
  </div>

  <h1>קבלה על תשלום</h1>
  <p class="sub">שולם באמצעות שירות התשלומים הממשלתי</p>

  <table>
    <tr><td class="k">תאריך</td><td class="v">${esc(d.date)}</td></tr>
    <tr><td class="k">עבור שירות</td><td class="v">${esc(d.serviceName)}</td></tr>
    <tr><td class="k">מספר סימוכין לעסקה</td><td class="v" style="font-family:monospace">${esc(d.referenceId)}</td></tr>
    ${d.method ? `<tr><td class="k">אמצעי תשלום</td><td class="v">${esc(d.method)}</td></tr>` : ""}
    <tr><td class="k">סטטוס</td><td class="v" style="color:#548235">שולם ✓</td></tr>
  </table>

  <div class="total"><span>סכום ששולם (כולל מע&quot;מ)</span><b>₪${Number(d.amount).toLocaleString()}</b></div>

  <div class="paid"><span>שולם / PAID</span></div>
  <p class="true">מסמך זה נאמן למקור</p>
  <p class="note">
    קבלה זו הופקה אוטומטית מפורטל הלקוחות של המרכז למיפוי ישראל. לבירורים: *6274 · service@mapi.gov.il<br>
    מסמך הדגמה (POC) — בפרודקשן הקבלה מונפקת וחתומה דיגיטלית דרך שירות התשלומים הממשלתי.
  </p>
  <div class="noprint" style="margin-top:26px; text-align:center;">
    <button class="btn" onclick="window.print()">שמור כ-PDF / הדפס</button>
  </div>
  <script>window.onload=function(){ setTimeout(function(){ window.print(); }, 400); };</script>
</body></html>`;
  w.document.open();
  w.document.write(html);
  w.document.close();
}
