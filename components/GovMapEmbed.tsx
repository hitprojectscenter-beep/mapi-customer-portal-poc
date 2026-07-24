"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import type { TKey } from "@/lib/i18n";

interface Props {
  /** Map mode preset */
  mode?: "default" | "cadastre" | "ortho" | "marine" | "cors" | "topo";
  /** Initial center [longitude, latitude] in WGS84 */
  center?: [number, number];
  /** Initial zoom level (1-13) */
  zoom?: number;
  /** Whether to allow polygon drawing (POC: shows UI hint) */
  allowDraw?: boolean;
  /** Fixed height of the map container */
  height?: string;
  /** Show fullscreen toggle */
  showFullscreen?: boolean;
  /** Compact view (no toolbar) */
  compact?: boolean;
  /** Optional title above the map */
  title?: string;
  /** Callback with the drawn area: approx. km² + polygon centroid in ITM */
  onAreaSelected?: (area: { sqkm: number; itmX: number; itmY: number; vertices: number }) => void;
}

type BasemapId = "standard" | "ortho";

// Real public GovMap URL contract (api.govmap.gov.il docs):
//   ?z=<zoom>&c=<ITM-x>,<ITM-y>&b=<basemap>&lay=<numeric layer ids>
// Only options verified to work in the public iframe are offered here.
// Full basemap/layer control arrives with the official JS SDK + org token
// (production task — see PRODUCTION.md).
const BASEMAPS: Array<{ id: BasemapId; labelKey: TKey; icon: string; code: string | null }> = [
  { id: "standard", labelKey: "govmap.basemap.standard", icon: "map", code: null },
  { id: "ortho", labelKey: "govmap.basemap.ortho", icon: "satellite_alt", code: "3" }
];

// Info layers need NUMERIC GovMap ids the public embed doesn't document —
// so each layer opens the full GovMap site (where the layer tree is native)
// instead of pretending to toggle inside the iframe.
const LAYER_LINKS: Array<{ labelKey: TKey; icon: string }> = [
  { labelKey: "govmap.layer.parcels", icon: "grid_on" },
  { labelKey: "govmap.layer.buildings", icon: "domain" },
  { labelKey: "govmap.layer.gnss", icon: "satellite" },
  { labelKey: "govmap.layer.contours", icon: "line_curve" }
];

// Mode presets → basemap + ITM center/zoom that actually render
const MODE_PRESETS: Record<string, { basemap: BasemapId; itm?: [number, number]; z?: number }> = {
  default: { basemap: "standard" },
  cadastre: { basemap: "standard", itm: [220800, 631500], z: 9 },   // ירושלים — רזולוציית גושים
  ortho: { basemap: "ortho", itm: [178500, 663900], z: 8 },         // תל אביב
  marine: { basemap: "standard", itm: [175000, 645000], z: 6 },
  cors: { basemap: "standard", z: 3 },                               // מבט ארצי
  topo: { basemap: "standard", itm: [220800, 631500], z: 7 }
};

/**
 * GovMap iframe embed with basemap switcher + info-layer toggles.
 *
 * Cross-origin iframes can't be controlled directly, so switching rebuilds
 * the iframe URL with the chosen background (b=) and layers (lyrs=) params.
 * In production this upgrades to the official GovMap JS SDK with a token.
 */
export default function GovMapEmbed({
  mode = "default",
  center,
  zoom = 8,
  allowDraw = false,
  height = "500px",
  showFullscreen = true,
  compact = false,
  title,
  onAreaSelected
}: Props) {
  const { t } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [areaMarked, setAreaMarked] = useState(false);
  // Polygon drawing overlay (POC: freezes the map view while marking;
  // exact in-map drawing arrives with the official GovMap SDK)
  const [drawing, setDrawing] = useState(false);
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);

  // Map controls state (initialized from mode preset)
  const preset = MODE_PRESETS[mode] || MODE_PRESETS.default;
  const [basemap, setBasemap] = useState<BasemapId>(preset.basemap);
  const [panelOpen, setPanelOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const firstLoadDone = useRef(false);

  // Build the GovMap URL with the REAL public params: z / c(ITM) / b
  const iframeSrc = useMemo(() => {
    const base = "https://www.govmap.gov.il/";
    const params = new URLSearchParams();

    const bm = BASEMAPS.find(b => b.id === basemap);
    if (bm?.code) params.set("b", bm.code);

    if (preset.itm) {
      params.set("c", `${preset.itm[0]},${preset.itm[1]}`);
      params.set("z", String(preset.z ?? 7));
    } else if (preset.z) {
      params.set("z", String(preset.z));
    }

    const query = params.toString();
    return query ? `${base}?${query}` : base;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basemap, mode]);

  // Show a small "updating map" chip when src changes after the initial load
  useEffect(() => {
    if (!firstLoadDone.current) return;
    setRefreshing(true);
    const timer = setTimeout(() => setRefreshing(false), 3500);
    return () => clearTimeout(timer);
  }, [iframeSrc]);

  // Hide the loading spinner after a reasonable time (cross-origin iframes
  // don't always fire onLoad). Only show error if onError actually fires.
  useEffect(() => {
    if (loaded) return;
    const timer = setTimeout(() => {
      setLoaded(true);
      firstLoadDone.current = true;
    }, 4000);
    return () => clearTimeout(timer);
  }, [loaded]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.govmap.gov.il") return;
      // Production: parse polygon/feature data from event.data
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Approximate ITM meters-per-pixel by the preset zoom (POC scale table;
  // the SDK provides exact georeferencing in production)
  const metersPerPixel = (() => {
    const z = preset.z ?? 7;
    if (z >= 10) return 2.5;
    if (z >= 9) return 5;
    if (z >= 8) return 10;
    if (z >= 7) return 20;
    if (z >= 6) return 40;
    return 80;
  })();

  const overlayPoint = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPoints(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  // Keyboard while drawing: Backspace removes the last vertex, Esc cancels
  useEffect(() => {
    if (!drawing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        setPoints(prev => prev.slice(0, -1));
      } else if (e.key === "Escape") {
        setDrawing(false);
        setPoints([]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawing]);

  /** px → approximate ITM using the preset center + zoom scale */
  const toItm = (px: { x: number; y: number }, rect: { width: number; height: number }) => {
    const [cx, cy] = preset.itm ?? [200000, 620000];
    return {
      x: Math.round(cx + (px.x - rect.width / 2) * metersPerPixel),
      y: Math.round(cy - (px.y - rect.height / 2) * metersPerPixel) // screen y is inverted vs. ITM north
    };
  };

  // Confirm the drawn polygon: shoelace area (px²→km²) + centroid in ITM
  const handleConfirmArea = () => {
    const el = containerRef.current;
    if (!el || points.length < 3) return;
    const rect = { width: el.clientWidth, height: el.clientHeight };
    let sum = 0;
    for (let i = 0; i < points.length; i++) {
      const a = points[i], b = points[(i + 1) % points.length];
      sum += a.x * b.y - b.x * a.y;
    }
    const areaPx = Math.abs(sum) / 2;
    const sqkm = parseFloat(((areaPx * metersPerPixel * metersPerPixel) / 1_000_000).toFixed(2));
    const centroidPx = {
      x: points.reduce((s, p) => s + p.x, 0) / points.length,
      y: points.reduce((s, p) => s + p.y, 0) / points.length
    };
    const itm = toItm(centroidPx, rect);
    setDrawing(false);
    setAreaMarked(true);
    onAreaSelected?.({ sqkm, itmX: itm.x, itmY: itm.y, vertices: points.length });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-surface-container rounded-2xl overflow-hidden border border-secondary/30 shadow-md ${
        isFullscreen ? "fixed inset-0 z-[300] rounded-none" : ""
      }`}
      style={{ height: isFullscreen ? "100vh" : height }}
    >
      {/* Single GovMap brand pill — top-left, clickable → GovMap site */}
      {!compact && (
        <a
          href="https://www.govmap.gov.il/"
          target="_blank"
          rel="noopener noreferrer"
          className="shine absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-sm rounded-full px-3.5 py-1.5 shadow-md flex items-center gap-2 hover:bg-white hover:shadow-lg transition-all group"
          aria-label={t("govmap.openSite")}
          data-tooltip={t("govmap.openSite")}
          data-tooltip-position="bottom"
        >
          <span className="w-6 h-6 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[14px]">public</span>
          </span>
          <span className="text-xs font-bold text-primary group-hover:text-secondary transition-colors">GovMap</span>
        </a>
      )}

      {/* Top toolbar: map-settings + fullscreen */}
      {!compact && (
        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          <div className="flex items-start gap-2 pointer-events-auto">
            {/* Map settings (basemap + layers) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPanelOpen(!panelOpen)}
                className={`shine backdrop-blur-sm rounded-full w-9 h-9 shadow-md flex items-center justify-center transition-colors ${
                  panelOpen ? "bg-secondary text-white" : "bg-white/95 hover:bg-secondary hover:text-white"
                }`}
                aria-label={t("govmap.mapSettings")}
                aria-expanded={panelOpen}
                data-tooltip={t("govmap.mapSettings")}
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined text-[20px]">stacks</span>
              </button>

              {/* Control panel dropdown — anchored to physical right so it grows
                  leftward INTO the map (the container is overflow-hidden) */}
              {panelOpen && (
                <div className="absolute top-11 right-0 left-auto w-64 bg-white rounded-2xl shadow-2xl border border-gold/30 p-4 animate-scale-in max-h-[min(18rem,55vh)] overflow-y-auto overscroll-contain">
                  {/* Panel header: title + explicit close (mobile users have no Esc) */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-gold/20 sticky -top-4 -mx-4 px-4 pt-0 bg-white z-10">
                    <p className="text-[11px] uppercase tracking-widest font-bold text-gold-dark flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]" aria-hidden="true">tune</span>
                      <span>{t("govmap.mapSettings")}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setPanelOpen(false)}
                      className="shine w-8 h-8 rounded-full hover:bg-error-red/10 hover:text-error-red text-on-surface-variant flex items-center justify-center transition-colors"
                      aria-label="סגור את חלונית השכבות"
                      data-tooltip="סגירת חלונית מפת הרקע והשכבות"
                      data-tooltip-position="bottom"
                      data-tooltip-edge="right"
                    >
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">close</span>
                    </button>
                  </div>

                  {/* Basemap section — only options verified in the public embed */}
                  <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">
                    {t("govmap.basemap")}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 mb-4">
                    {BASEMAPS.map(bm => (
                      <button
                        key={bm.id}
                        type="button"
                        onClick={() => setBasemap(bm.id)}
                        className={`shine flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-[11px] font-semibold transition-colors border ${
                          basemap === bm.id
                            ? "bg-secondary text-white border-secondary"
                            : "bg-surface-container/50 text-primary border-transparent hover:border-secondary"
                        }`}
                        aria-pressed={basemap === bm.id}
                        data-tooltip={bm.id === "ortho" ? "תצלום אוויר עדכני כרקע המפה" : "מפת הרקע הסטנדרטית של GovMap"}
                        data-tooltip-position="bottom"
                      >
                        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{bm.icon}</span>
                        <span>{t(bm.labelKey)}</span>
                      </button>
                    ))}
                  </div>

                  {/* Layers — open natively in the full GovMap site (the public
                      iframe can't toggle layers; the SDK token unlocks it) */}
                  <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2 pt-3 border-t border-outline-variant/50">
                    {t("govmap.layers")}
                  </p>
                  <div className="space-y-1">
                    {LAYER_LINKS.map(layer => (
                      <a
                        key={layer.labelKey}
                        href="https://www.govmap.gov.il/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gold-tint transition-colors group"
                        data-tooltip="נפתח באתר GovMap המלא — שם עץ השכבות המלא זמין; שליטה בשכבות בתוך הפורטל תתאפשר עם ה-SDK הרשמי"
                        data-tooltip-position="bottom"
                      >
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-gold-dark" aria-hidden="true">
                          {layer.icon}
                        </span>
                        <span className="text-xs text-on-surface flex-1">{t(layer.labelKey)}</span>
                        <span className="material-symbols-outlined text-[14px] text-on-surface-variant" aria-hidden="true">open_in_new</span>
                      </a>
                    ))}
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-2 bg-surface-container/60 rounded-lg px-2 py-1.5">
                    הצגת שכבות בתוך הפורטל מחייבת את GovMap JS SDK עם token ארגוני (משימת פרודקשן)
                  </p>
                </div>
              )}
            </div>

            {showFullscreen && (
              <button
                type="button"
                onClick={toggleFullscreen}
                className="shine bg-white/95 backdrop-blur-sm rounded-full w-9 h-9 shadow-md flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
                aria-label={isFullscreen ? "צא ממסך מלא" : "מסך מלא"}
                data-tooltip={isFullscreen ? "צא ממסך מלא" : "מסך מלא"}
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isFullscreen ? "fullscreen_exit" : "fullscreen"}
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tap anywhere on the map closes the settings panel */}
      {panelOpen && (
        <div
          className="absolute inset-0 z-10"
          onClick={() => setPanelOpen(false)}
          aria-hidden="true"
        />
      )}

      {!loaded && !error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-on-surface-variant">טוען GovMap...</p>
            <p className="text-xs text-on-surface-variant mt-1 opacity-60">www.govmap.gov.il</p>
          </div>
        </div>
      )}

      {/* Refreshing chip (after basemap/layer change) */}
      {refreshing && loaded && !error && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 pointer-events-none animate-fade-in">
          <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>{t("govmap.refreshing")}</span>
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface-container p-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-alert-yellow/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px] text-alert-yellow">map</span>
            </div>
            <h3 className="font-bold text-primary mb-2">GovMap לא נטען</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              ייתכן שיש בעיית רשת או חסימה של iframes. ניתן לפתוח את GovMap בחלון חדש:
            </p>
            <a
              href={iframeSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="shine inline-flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary transition-colors"
            >
              <span>פתח GovMap</span>
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            </a>
          </div>
        </div>
      ) : (
        <iframe
          key={iframeSrc}
          ref={iframeRef}
          src={iframeSrc}
          title={title || "GovMap - מערכת המפות הציבורית"}
          className="w-full h-full border-0"
          loading="lazy"
          allow="geolocation; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => {
            setLoaded(true);
            firstLoadDone.current = true;
            setRefreshing(false);
          }}
          onError={() => setError(true)}
        />
      )}

      {/* Drawing overlay: freezes the map view and captures polygon clicks */}
      {drawing && (
        <div
          className="absolute inset-0 z-[25] cursor-crosshair"
          onClick={overlayPoint}
          role="application"
          aria-label="סימון פוליגון על המפה — כל לחיצה מוסיפה קודקוד"
        >
          <svg className="w-full h-full pointer-events-none" aria-hidden="true">
            {points.length > 1 && (
              <polyline
                points={points.map(p => `${p.x},${p.y}`).join(" ")}
                fill="rgba(180,146,78,0.15)"
                stroke="#8f7439"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
            )}
            {points.length > 2 && (
              <line
                x1={points[points.length - 1].x} y1={points[points.length - 1].y}
                x2={points[0].x} y2={points[0].y}
                stroke="#8f7439" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.6"
              />
            )}
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="6" fill="#fff" stroke="#8f7439" strokeWidth="2.5" />
            ))}
          </svg>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-primary/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full pointer-events-none">
            {points.length === 0 ? "לחצו על המפה להוספת קודקודים" : `${points.length} קודקודים — נדרשים לפחות 3`}
          </div>
        </div>
      )}

      {/* Confirmed polygon stays visible after drawing ends */}
      {!drawing && points.length > 2 && areaMarked && (
        <svg className="absolute inset-0 z-[15] w-full h-full pointer-events-none" aria-hidden="true">
          <polygon
            points={points.map(p => `${p.x},${p.y}`).join(" ")}
            fill="rgba(180,146,78,0.18)"
            stroke="#8f7439"
            strokeWidth="2.5"
          />
        </svg>
      )}

      {/* Polygon drawing helper (POC simulation) — z-30: the action buttons
          must sit ABOVE the click-capture overlay (z-25), else they go dead */}
      {allowDraw && loaded && !error && (
        <div className="absolute bottom-4 left-4 right-4 z-[30] flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between pointer-events-none">
          <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-3 max-w-sm pointer-events-auto ${drawing ? "hidden" : ""}`}>
            <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-1">
              📍 הגדרת אזור
            </p>
            <p className="text-xs text-on-surface leading-relaxed">
              נווטו במפה אל האזור המבוקש ולחצו "אשר אזור מסומן".
              ציור פוליגון מדויק בתוך הפורטל יתאפשר עם ה-SDK הרשמי של GovMap;
              בינתיים ניתן גם להעלות קובץ וקטורי (ZIP/DWG/KML) בשלבי המסלול,
              או{" "}
              <a
                href="https://www.govmap.gov.il/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary font-bold underline"
              >
                לפתוח את GovMap המלא
              </a>{" "}
              לסימון ומדידה.
              {areaMarked && (
                <span className="block mt-1 text-positive-green font-bold">✓ אזור נשמר</span>
              )}
            </p>
          </div>
          <div className="flex gap-2 pointer-events-auto flex-wrap justify-end">
            {!drawing && !areaMarked && (
              <button
                type="button"
                onClick={() => { setPoints([]); setDrawing(true); }}
                className="shine btn-lux-primary px-5 py-3 rounded-full text-sm flex items-center justify-center gap-2 min-h-[44px] shadow-lg"
                data-tooltip="מקבע את התצוגה הנוכחית ומאפשר סימון קודקודי פוליגון בלחיצות עכבר (נווטו קודם לאזור הרצוי)"
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">polyline</span>
                <span>התחל סימון פוליגון</span>
              </button>
            )}
            {drawing && (
              <>
                <button
                  type="button"
                  onClick={() => { setDrawing(false); setPoints([]); }}
                  className="shine bg-white text-on-surface-variant border border-outline-variant px-4 py-3 rounded-full text-sm min-h-[44px]"
                  data-tooltip="ביטול הסימון וחזרה לניווט חופשי במפה (Esc)"
                  data-tooltip-position="bottom"
                >
                  ביטול
                </button>
                <button
                  type="button"
                  onClick={() => setPoints(prev => prev.slice(0, -1))}
                  disabled={points.length === 0}
                  className="shine bg-white text-gold-dark border border-gold/50 w-11 h-11 rounded-full text-xl font-bold flex items-center justify-center min-h-[44px] disabled:opacity-40 leading-none"
                  aria-label="מחק את הקודקוד האחרון"
                  data-tooltip="מחיקת הקודקוד האחרון שסומן (Backspace)"
                  data-tooltip-position="bottom"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={handleConfirmArea}
                  disabled={points.length < 3}
                  className="shine bg-positive-green text-white px-5 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 min-h-[44px] shadow-lg disabled:opacity-40"
                  data-tooltip="סוגר את הפוליגון, מחשב שטח משוער ומרכז ב-ITM ושומר את האזור להזמנה"
                  data-tooltip-position="bottom"
                >
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">check_circle</span>
                  <span>סיים ואשר אזור</span>
                </button>
              </>
            )}
            {!drawing && areaMarked && (
              <button
                type="button"
                onClick={() => { setAreaMarked(false); setPoints([]); setDrawing(true); }}
                className="shine bg-positive-green text-white px-5 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 min-h-[44px] shadow-lg"
                data-tooltip="האזור נשמר — לחיצה מתחילה סימון חדש במקומו"
                data-tooltip-position="bottom"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">check_circle</span>
                <span>האזור נשמר — סמן מחדש</span>
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
