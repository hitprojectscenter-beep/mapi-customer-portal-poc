"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

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
  /** Callback when area is "selected" (POC: manual button press) */
  onAreaSelected?: (area: { sqkm: number; lat: number; lng: number }) => void;
}

/**
 * GovMap iframe embed.
 *
 * For POC purposes we embed the public GovMap site. In production this will be
 * upgraded to the official GovMap JS SDK with a token, allowing programmatic
 * polygon retrieval, layer control, and feature info.
 *
 * Modes map to different layer presets that GovMap supports via URL params.
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
  const { t, lang } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [areaMarked, setAreaMarked] = useState(false);

  // Build GovMap URL with mode-specific layers
  const buildUrl = () => {
    const base = "https://www.govmap.gov.il/";
    const params = new URLSearchParams();

    // Mode-specific layer presets (GovMap layer codes)
    const modeLayers: Record<string, string> = {
      default: "",
      cadastre: "PARCEL_ALL,BUILDINGS",
      ortho: "OrthoPhotos2023,OrthoPhotos2022",
      marine: "MARINE_HIDRO,MARINE_TOPO",
      cors: "GNSS_STATIONS",
      topo: "TOPOGRAPHIC_BACKGROUND"
    };

    if (modeLayers[mode]) {
      params.set("lyrs", modeLayers[mode]);
    }

    // Center coordinates
    if (center) {
      // Convert WGS84 to ITM if needed (GovMap uses ITM by default)
      params.set("lon", String(center[0]));
      params.set("lat", String(center[1]));
    }
    params.set("lvl", String(zoom));

    const query = params.toString();
    return query ? `${base}?${query}` : base;
  };

  // Auto-detect load failure (iframe blocked, network error)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loaded) setError(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, [loaded]);

  // Listen for messages from GovMap (postMessage API - production-ready)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.govmap.gov.il") return;
      // In production: parse polygon/feature data from event.data
      // For POC: just log
      // console.log("GovMap event:", event.data);
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

  // Simulate area selection (POC; production reads polygon from GovMap)
  const handleConfirmArea = () => {
    const mockArea = {
      sqkm: parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
      lat: 32.0853,
      lng: 34.7818
    };
    setAreaMarked(true);
    onAreaSelected?.(mockArea);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-surface-container rounded-2xl overflow-hidden border border-secondary/30 shadow-md ${
        isFullscreen ? "fixed inset-0 z-[300] rounded-none" : ""
      }`}
      style={{ height: isFullscreen ? "100vh" : height }}
    >
      {title && !compact && (
        <div className="absolute top-3 right-3 left-3 z-20 flex items-center justify-between flex-row-reverse gap-2 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-md flex items-center gap-2 pointer-events-auto">
            <span className="material-symbols-outlined text-secondary text-[18px]">
              public
            </span>
            <span className="text-xs font-bold text-primary">{title}</span>
          </div>
          {showFullscreen && (
            <button
              type="button"
              onClick={toggleFullscreen}
              className="shine bg-white/95 backdrop-blur-sm rounded-full w-9 h-9 shadow-md flex items-center justify-center hover:bg-secondary hover:text-white transition-colors pointer-events-auto"
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
      )}

      {!loaded && !error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-on-surface-variant">טוען GovMap...</p>
            <p className="text-xs text-on-surface-variant mt-1 opacity-60">
              www.govmap.gov.il
            </p>
          </div>
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface-container p-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-alert-yellow/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px] text-alert-yellow">
                map
              </span>
            </div>
            <h3 className="font-bold text-primary mb-2">GovMap לא נטען</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              ייתכן שיש בעיית רשת או חסימה של iframes. ניתן לפתוח את GovMap בחלון חדש:
            </p>
            <a
              href={buildUrl()}
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
          ref={iframeRef}
          src={buildUrl()}
          title={title || "GovMap - מערכת המפות הציבורית"}
          className="w-full h-full border-0"
          loading="lazy"
          allow="geolocation; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}

      {/* Polygon drawing helper (POC simulation) */}
      {allowDraw && loaded && !error && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-3 max-w-sm pointer-events-auto">
            <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-1">
              📍 שלב 1
            </p>
            <p className="text-xs text-on-surface leading-relaxed">
              סמן את האזור הגאוגרפי שלך במפה למעלה (כלי הציור של GovMap).
              {areaMarked && (
                <span className="block mt-1 text-positive-green font-bold">
                  ✓ אזור נשמר
                </span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={handleConfirmArea}
            className={`shine pointer-events-auto px-5 py-3 rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2 min-h-[44px] shadow-lg ${
              areaMarked
                ? "bg-positive-green text-white"
                : "bg-secondary text-white hover:bg-primary"
            }`}
            data-tooltip="אשר את האזור שסומן ב-GovMap"
            data-tooltip-position="bottom"
          >
            {areaMarked ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>האזור נשמר</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">touch_app</span>
                <span>אשר אזור מסומן</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Attribution footer */}
      {loaded && !error && !compact && (
        <div className="absolute bottom-1 right-1 z-20 pointer-events-none">
          <a
            href="https://www.govmap.gov.il/"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto bg-white/80 backdrop-blur-sm text-[9px] font-bold text-primary px-2 py-0.5 rounded-tl-md hover:bg-white transition-colors"
          >
            powered by GovMap • gov.il
          </a>
        </div>
      )}
    </div>
  );
}
