// Client-side branded document generator (no dependencies).
// Opens a print-optimized window the user saves as PDF via the browser's
// native "Save as PDF" — the standard dependency-free approach. Production
// swaps this for a server-rendered DocGen/PDF from Salesforce.

export interface QuoteDocData {
  title: string;          // e.g. "הצעת מחיר" / "אישור הזמנה"
  serviceName: string;
  orderId?: string;
  total: number;
  lines: string[];        // route/summary lines
  delivery?: string;
  date?: string;          // ISO or display date passed in (no Date.now here)
  /** Ordered-area polygon, points normalized 0-1 (drawn in an 18×15cm box) */
  shape?: { x: number; y: number }[];
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

  // The ordered-area block: an 18cm × 15cm centered frame containing the
  // customer's marked polygon over a light grid (a simple map-like backdrop).
  const shape = d.shape && d.shape.length >= 3 ? d.shape : null;
  const areaBlock = shape ? (() => {
    const W = 680, H = 566; // 18cm × 15cm at ~96dpi/cm scaled for print
    const pts = shape.map(p => `${(p.x * W).toFixed(1)},${(p.y * H).toFixed(1)}`).join(" ");
    const grid = Array.from({ length: 13 }, (_, i) => `<line x1="${i * W / 12}" y1="0" x2="${i * W / 12}" y2="${H}" stroke="#0b61a1" stroke-opacity="0.08"/>`).join("")
      + Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${i * H / 10}" x2="${W}" y2="${i * H / 10}" stroke="#0b61a1" stroke-opacity="0.08"/>`).join("");
    return `<div class="area">
      <p class="area-ttl">הטווח שהוזמן על ידי הלקוח</p>
      <svg viewBox="0 0 ${W} ${H}" width="18cm" height="15cm" xmlns="http://www.w3.org/2000/svg">
        <rect width="${W}" height="${H}" fill="#fbfaf7"/>
        ${grid}
        <polygon points="${pts}" fill="rgba(180,146,78,0.18)" stroke="#8f7439" stroke-width="2.5"/>
        <rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke="#b4924e" stroke-width="2"/>
      </svg>
      <p class="area-note">הפוליגון מייצג את האזור שהלקוח סימן במפת GovMap. המידות המדויקות (שטח וקואורדינטות ITM) ייקבעו על ידי מפ"י מהפוליגון המסומן.</p>
    </div>`;
  })() : "";

  const html = `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">
<title>${esc(d.title)} — ${esc(d.serviceName)}</title>
<style>
  @page { size: A4; margin: 18mm; }
  * { box-sizing: border-box; }
  body { font-family: "Heebo","Assistant",Arial,sans-serif; color: #1b2b45; margin: 0; padding: 28px; }
  .hd { display:flex; justify-content:space-between; align-items:center; border-bottom: 2px solid #b4924e; padding-bottom: 16px; margin-bottom: 22px; }
  .brandbox { display:flex; align-items:center; gap:14px; }
  .brandbox img { width:64px; height:64px; object-fit:contain; }
  .brand { font-size: 24px; font-weight: 800; color:#001d35; }
  .brand small { display:block; font-size: 12px; color:#8f7439; font-weight:600; }
  .meta { text-align:left; font-size: 12px; color:#42474f; }
  .area { margin-top: 30px; page-break-inside: avoid; text-align:center; }
  .area-ttl { font-size: 15px; font-weight:700; color:#463f7a; margin-bottom: 10px; }
  .area svg { border-radius: 8px; box-shadow: 0 4px 14px -6px rgba(27,43,69,0.25); }
  .area-note { font-size: 11px; color:#6b7280; margin-top: 10px; max-width: 18cm; margin-inline:auto; line-height:1.6; }
  h1 { font-size: 20px; color:#463f7a; margin: 0 0 4px; }
  .svc { font-size: 15px; color:#0b2545; margin-bottom: 18px; }
  table { width:100%; border-collapse: collapse; margin: 8px 0 20px; }
  td { padding: 9px 12px; border-bottom: 1px solid #e7e3f6; font-size: 13px; }
  .total { display:flex; justify-content:space-between; align-items:baseline; background:#faf6ec; border:1px solid rgba(180,146,78,0.5); border-radius: 10px; padding: 14px 18px; margin-top: 8px; }
  .total b { font-size: 24px; color:#001d35; }
  .note { font-size: 11px; color:#6b7280; margin-top: 22px; line-height:1.6; }
  .stamp { margin-top: 28px; border:1px dashed rgba(180,146,78,0.6); border-radius:10px; padding:12px; text-align:center; font-size:12px; color:#8f7439; }
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
