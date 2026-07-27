"use client";

// Real interactive map area-picker (replaces the cross-origin GovMap iframe
// for the ORDER flow). Built on Leaflet: the polygon is a GEO object locked to
// lat/lng, so it stays on the same real-world area when zooming/panning. Area
// is a genuine geodesic measurement; the centroid is converted to Israeli TM
// (ITM / EPSG:2039). Supports a street basemap and an orthophoto (aerial) one.

/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import proj4 from "proj4";

proj4.defs(
  "EPSG:2039",
  "+proj=tmerc +lat_0=31.7343936111111 +lon_0=35.2045169444444 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=-24.0024,-17.1032,-17.8444,-0.33077,-1.85269,1.66969,5.4262 +units=m +no_defs"
);
const toItm = (lat: number, lng: number): [number, number] => {
  const [x, y] = proj4("EPSG:4326", "EPSG:2039", [lng, lat]);
  return [Math.round(x), Math.round(y)];
};

function geodesicArea(latlngs: { lat: number; lng: number }[]): number {
  const R = 6378137, rad = (d: number) => (d * Math.PI) / 180;
  let area = 0; const n = latlngs.length;
  for (let i = 0; i < n; i++) {
    const p1 = latlngs[i], p2 = latlngs[(i + 1) % n];
    area += rad(p2.lng - p1.lng) * (2 + Math.sin(rad(p1.lat)) + Math.sin(rad(p2.lat)));
  }
  return Math.abs((area * R * R) / 2);
}

const STREET = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ORTHO = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

export interface AreaResult {
  vertices: number; sqkm: number; itmX: number; itmY: number;
  shape: { x: number; y: number }[];
  latlngs: { lat: number; lng: number }[];
  basemap: "street" | "ortho";
}

interface Props {
  center?: [number, number];
  zoom?: number;
  height?: string;
  /** Start on the orthophoto (aerial) basemap */
  ortho?: boolean;
  onAreaSelected?: (a: AreaResult) => void;
}

export default function PolygonMapPicker({
  center = [32.0853, 34.7818], zoom = 15, height = "500px", ortho = false, onAreaSelected
}: Props) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const LRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const tileRef = useRef<any>(null);
  const ptsRef = useRef<{ lat: number; lng: number }[]>([]);

  const [drawing, setDrawing] = useState(false);
  const [count, setCount] = useState(0);
  const [basemap, setBasemap] = useState<"street" | "ortho">(ortho ? "ortho" : "street");
  const [result, setResult] = useState<{ sqkm: number; itmX: number; itmY: number; vertices: number } | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapEl.current) return;
      LRef.current = L;
      const map = L.map(mapEl.current, { center, zoom, zoomControl: true });
      tileRef.current = L.tileLayer(ortho ? ORTHO : STREET, { maxZoom: 19, attribution: ortho ? "© Esri" : "© OpenStreetMap" }).addTo(map);
      mapRef.current = map;
      layerRef.current = L.layerGroup().addTo(map);
      setReady(true);
    })();
    return () => { cancelled = true; if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);

  const switchBasemap = (b: "street" | "ortho") => {
    setBasemap(b);
    const L = LRef.current, map = mapRef.current;
    if (!L || !map) return;
    if (tileRef.current) map.removeLayer(tileRef.current);
    tileRef.current = L.tileLayer(b === "ortho" ? ORTHO : STREET, { maxZoom: 19, attribution: b === "ortho" ? "© Esri" : "© OpenStreetMap" }).addTo(map);
    tileRef.current.bringToBack();
  };

  const redraw = () => {
    const L = LRef.current, layer = layerRef.current;
    if (!L || !layer) return;
    layer.clearLayers();
    const pts = ptsRef.current;
    if (pts.length > 1) {
      L.polygon(pts.map(p => [p.lat, p.lng]), { color: "#8f7439", weight: 3, fillColor: "#b4924e", fillOpacity: 0.22 }).addTo(layer);
    }
    pts.forEach(p => L.circleMarker([p.lat, p.lng], { radius: 5, color: "#8f7439", fillColor: "#fff", fillOpacity: 1, weight: 2 }).addTo(layer));
  };

  const onMapClick = (e: any) => {
    ptsRef.current = [...ptsRef.current, { lat: e.latlng.lat, lng: e.latlng.lng }];
    setCount(ptsRef.current.length); redraw();
  };
  const startDraw = () => {
    ptsRef.current = []; setCount(0); setResult(null); redraw(); setDrawing(true);
    mapRef.current?.on("click", onMapClick);
    mapRef.current?.getContainer().style.setProperty("cursor", "crosshair");
  };
  const stopDraw = () => {
    setDrawing(false); mapRef.current?.off("click", onMapClick);
    mapRef.current?.getContainer().style.removeProperty("cursor");
  };
  const undo = () => { ptsRef.current = ptsRef.current.slice(0, -1); setCount(ptsRef.current.length); redraw(); };
  const cancel = () => { ptsRef.current = []; setCount(0); redraw(); stopDraw(); };

  const finish = () => {
    const pts = ptsRef.current;
    if (pts.length < 3) return;
    const sqkm = parseFloat((geodesicArea(pts) / 1_000_000).toFixed(3));
    const clat = pts.reduce((s, p) => s + p.lat, 0) / pts.length;
    const clng = pts.reduce((s, p) => s + p.lng, 0) / pts.length;
    const [itmX, itmY] = toItm(clat, clng);
    const lats = pts.map(p => p.lat), lngs = pts.map(p => p.lng);
    const minLat = Math.min(...lats), maxLat = Math.max(...lats), minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
    const shape = pts.map(p => ({ x: (p.lng - minLng) / (maxLng - minLng || 1), y: (maxLat - p.lat) / (maxLat - minLat || 1) }));
    setResult({ sqkm, itmX, itmY, vertices: pts.length });
    stopDraw();
    onAreaSelected?.({ vertices: pts.length, sqkm, itmX, itmY, shape, latlngs: [...pts], basemap });
  };

  const btn = "shine px-4 py-2 rounded-full text-sm font-semibold transition-colors min-h-[40px] flex items-center gap-1.5";
  const chip = (active: boolean) => `shine px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${active ? "bg-primary text-white border-primary" : "bg-white text-primary border-outline-variant hover:border-gold"}`;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gold/30 shadow-md relative">
      <div ref={mapEl} style={{ height }} className="w-full bg-surface-container z-0" aria-label="מפה אינטראקטיבית לסימון אזור" />
      {/* Basemap switch */}
      {ready && (
        <div className="absolute top-3 right-3 z-[500] flex gap-1.5 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-md">
          <button type="button" onClick={() => switchBasemap("street")} className={chip(basemap === "street")}
            data-tooltip="מפת רחובות רגילה כרקע.">מפה</button>
          <button type="button" onClick={() => switchBasemap("ortho")} className={chip(basemap === "ortho")}
            data-tooltip="תצלום אוויר (אורתופוטו) כרקע — לזיהוי מבנים ושטח בפועל.">תצלום אוויר</button>
        </div>
      )}
      <div className="bg-white p-3 flex items-center gap-2 flex-wrap border-t border-gold/20">
        {!ready && <span className="text-xs text-on-surface-variant">טוען מפה...</span>}
        {ready && !drawing && (
          <button type="button" onClick={startDraw} className={`${btn} btn-lux-primary`}
            data-tooltip="הפעלת מצב סימון: כל לחיצה על המפה מוסיפה קודקוד. הפוליגון נעול לגאוגרפיה ונשאר על אותו אזור בזום ובהזזה.">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">polyline</span>
            {result ? "סמן מחדש" : "התחל סימון אזור"}
          </button>
        )}
        {ready && drawing && (
          <>
            <button type="button" onClick={finish} disabled={count < 3} className={`${btn} bg-positive-green text-white disabled:opacity-40`}
              data-tooltip="סוגר את הפוליגון, מחשב שטח גאוגרפי אמיתי ומרכז ברשת ישראל (ITM), ושומר להזמנה.">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">check_circle</span>סיים ואשר</button>
            <button type="button" onClick={undo} disabled={count === 0} className={`${btn} bg-white text-gold-dark border border-gold/50 disabled:opacity-40`}
              data-tooltip="מחיקת הקודקוד האחרון שסומן.">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">undo</span>בטל קודקוד</button>
            <button type="button" onClick={cancel} className={`${btn} bg-white text-on-surface-variant border border-outline-variant`}
              data-tooltip="ביטול הסימון וחזרה לניווט חופשי.">ביטול</button>
            <span className="text-xs text-on-surface-variant">{count} קודקודים{count < 3 ? " (נדרשים ≥3)" : ""}</span>
          </>
        )}
        {result && !drawing && (
          <div className="text-xs text-primary font-semibold" dir="rtl">
            ✓ שטח: {result.sqkm.toLocaleString()} קמ"ר · מרכז ITM <span dir="ltr" className="font-mono">{result.itmX.toLocaleString()}, {result.itmY.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
