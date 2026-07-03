// API Projects — inspired by OS Data Hub "API Projects" concept.
// Users organize API keys into named projects with quotas + activity.

import type { TKey } from "./i18n";

export interface ApiKey {
  id: string;
  keyMasked: string;          // e.g., "mpk_prod_****...af92"
  createdAt: string;          // ISO date
  lastUsedAt: string | null;
  scopes: string[];           // e.g., ["maps:read", "cors:read"]
}

export interface UsageMetric {
  metric: TKey;
  current: number;
  quota: number | null;
  unit: string;
  trendPct: number;           // vs last period
}

export interface ApiProject {
  id: string;
  name: string;
  description: string;
  plan: "OPEN" | "PREMIUM" | "PUBLIC";
  environment: "production" | "staging" | "development";
  createdAt: string;
  keys: ApiKey[];
  usage: {
    apiCallsMonthly: number;
    mapsDownloaded: number;
    dataVolumeGB: number;
    estimatedCostILS: number;
  };
  active: boolean;
}

// Mock projects for demo dashboard
export const mockApiProjects: ApiProject[] = [
  {
    id: "prj-001",
    name: "אפליקציית ניווט חוצה-ישראל",
    description: "אפליקציית מובייל לטיולים לתיירים ומטיילים",
    plan: "PREMIUM",
    environment: "production",
    createdAt: "2026-01-15",
    keys: [
      { id: "k1", keyMasked: "mpk_prod_****...af92", createdAt: "2026-01-15", lastUsedAt: "2026-07-02", scopes: ["maps:read", "gis:read"] },
      { id: "k2", keyMasked: "mpk_prod_****...cd44", createdAt: "2026-03-10", lastUsedAt: "2026-07-02", scopes: ["maps:read"] }
    ],
    usage: {
      apiCallsMonthly: 42580,
      mapsDownloaded: 287,
      dataVolumeGB: 12.4,
      estimatedCostILS: 640
    },
    active: true
  },
  {
    id: "prj-002",
    name: "מערכת GIS עירונית",
    description: "פורטל שירותי GIS לרשות תל-אביב-יפו",
    plan: "PUBLIC",
    environment: "production",
    createdAt: "2025-11-01",
    keys: [
      { id: "k3", keyMasked: "mpk_pub_****...9e2c", createdAt: "2025-11-01", lastUsedAt: "2026-07-02", scopes: ["maps:read", "cors:read", "gis:read", "orthophoto:read"] }
    ],
    usage: {
      apiCallsMonthly: 158920,
      mapsDownloaded: 1240,
      dataVolumeGB: 45.8,
      estimatedCostILS: 0
    },
    active: true
  },
  {
    id: "prj-003",
    name: "תוסף GIS למשרד הנדסה",
    description: "אינטגרציה עם ArcGIS Desktop למשרד הנדסה פרטי",
    plan: "PREMIUM",
    environment: "development",
    createdAt: "2026-06-20",
    keys: [
      { id: "k4", keyMasked: "mpk_dev_****...7f11", createdAt: "2026-06-20", lastUsedAt: "2026-07-01", scopes: ["gis:read", "cors:read"] }
    ],
    usage: {
      apiCallsMonthly: 3420,
      mapsDownloaded: 22,
      dataVolumeGB: 0.9,
      estimatedCostILS: 68
    },
    active: true
  },
  {
    id: "prj-004",
    name: "עמוד נחיתה חינם",
    description: "מפה בסיסית לאתר עמותה — במסלול Open",
    plan: "OPEN",
    environment: "production",
    createdAt: "2026-04-05",
    keys: [
      { id: "k5", keyMasked: "mpk_open_****...12a8", createdAt: "2026-04-05", lastUsedAt: "2026-06-28", scopes: ["maps:read"] }
    ],
    usage: {
      apiCallsMonthly: 856,
      mapsDownloaded: 8,
      dataVolumeGB: 0.1,
      estimatedCostILS: 0
    },
    active: true
  }
];

// KPI summary (aggregated)
export function getPortfolioSummary(projects: ApiProject[] = mockApiProjects) {
  return {
    totalProjects: projects.length,
    activeKeys: projects.reduce((s, p) => s + p.keys.length, 0),
    totalCalls: projects.reduce((s, p) => s + p.usage.apiCallsMonthly, 0),
    totalMaps: projects.reduce((s, p) => s + p.usage.mapsDownloaded, 0),
    totalDataGB: Math.round(projects.reduce((s, p) => s + p.usage.dataVolumeGB, 0) * 10) / 10,
    totalCostILS: projects.reduce((s, p) => s + p.usage.estimatedCostILS, 0)
  };
}

// Daily usage series — for chart
export function getDailyUsageSeries(days = 30) {
  const series: Array<{ date: string; calls: number; maps: number }> = [];
  const now = new Date(2026, 6, 3);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    // Deterministic pseudo-random pattern (weekends lower)
    const dow = d.getDay();
    const base = dow === 5 || dow === 6 ? 3000 : 8500;
    const noise = ((i * 13 + 7) % 40) - 20;
    series.push({
      date: d.toISOString().slice(0, 10),
      calls: Math.max(0, base + noise * 100),
      maps: Math.max(0, Math.round((base + noise * 100) / 250))
    });
  }
  return series;
}
