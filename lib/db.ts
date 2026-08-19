// PostgreSQL data layer (server-only) — the portal's professional database.
//
// One env var activates it: DATABASE_URL (Vercel Postgres / Neon / Supabase /
// self-hosted — any standard Postgres connection string). Storage priority in
// the intake APIs: Postgres first, Google Sheets as secondary mirror, demo
// mode (no-op) when neither is configured.
//
// Schema is created on first use (CREATE TABLE IF NOT EXISTS) — POC-grade
// migration; production upgrades to a migration tool (Prisma/Drizzle).

import { Pool } from "pg";
import type { Service } from "./data";

function connectionString(): string {
  return (process.env.DATABASE_URL || process.env.POSTGRES_URL || "").trim();
}

export function dbConfigured(): boolean {
  return connectionString().length > 0;
}

// Module-scope pool survives across serverless invocations of a warm instance
let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: connectionString(),
      max: 3,
      idleTimeoutMillis: 30_000,
      // Managed Postgres (Neon/Vercel/Supabase) requires TLS; local dev doesn't
      ssl: /localhost|127\.0\.0\.1/.test(connectionString()) ? undefined : { rejectUnauthorized: false }
    });
  }
  return pool;
}

async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await getPool().query(`
        CREATE TABLE IF NOT EXISTS leads (
          id            BIGSERIAL PRIMARY KEY,
          lead_id       TEXT,
          first_name    TEXT NOT NULL,
          last_name     TEXT NOT NULL,
          email         TEXT,
          phone         TEXT,
          organization  TEXT,
          family_label  TEXT,
          interest      TEXT,
          source_label  TEXT,
          score         INTEGER DEFAULT 0,
          band          TEXT,
          assignee      TEXT,
          queue         TEXT,
          estimated_value NUMERIC DEFAULT 0,
          campaign      TEXT,
          created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS orders (
          id            BIGSERIAL PRIMARY KEY,
          order_id      TEXT,
          service_name  TEXT NOT NULL,
          slug          TEXT NOT NULL,
          total         NUMERIC DEFAULT 0,
          route_details TEXT,
          delivery      TEXT,
          customer_name TEXT,
          email         TEXT,
          phone         TEXT,
          status        TEXT NOT NULL DEFAULT 'התקבלה',
          created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS payments (
          id            BIGSERIAL PRIMARY KEY,
          tx_id         TEXT UNIQUE NOT NULL,
          reference_id  TEXT NOT NULL,
          order_id      TEXT,
          service_name  TEXT NOT NULL,
          slug          TEXT,
          amount        NUMERIC NOT NULL DEFAULT 0,
          status        TEXT NOT NULL DEFAULT 'pending',
          created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
          paid_at       TIMESTAMPTZ
        );
        CREATE TABLE IF NOT EXISTS feedback (
          id          BIGSERIAL PRIMARY KEY,
          kind        TEXT NOT NULL DEFAULT 'survey',
          rating      INTEGER,
          message     TEXT,
          page_url    TEXT,
          email       TEXT,
          created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS products (
          id            BIGSERIAL PRIMARY KEY,
          slug          TEXT UNIQUE NOT NULL,
          name          TEXT NOT NULL,
          category      TEXT NOT NULL,
          category_label TEXT,
          short_description TEXT,
          description   TEXT,
          icon          TEXT DEFAULT 'map',
          price_from    NUMERIC DEFAULT 0,
          price_to      NUMERIC,
          price_unit    TEXT DEFAULT '₪',
          delivery_days TEXT,
          customer_types JSONB DEFAULT '[]',
          highlight     BOOLEAN DEFAULT false,
          in_scope      BOOLEAN DEFAULT true,
          external_href TEXT,
          external_url  TEXT,
          gov_form_url  TEXT,
          features      JSONB DEFAULT '[]',
          price_table   JSONB DEFAULT '[]',
          faq           JSONB DEFAULT '[]',
          active        BOOLEAN NOT NULL DEFAULT true,
          sort_order    INTEGER NOT NULL DEFAULT 0,
          created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_orders_created ON orders (created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_payments_tx ON payments (tx_id);
        CREATE INDEX IF NOT EXISTS idx_feedback_created ON feedback (created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_products_sort ON products (active, sort_order, id);
      `);
    })().catch(err => {
      schemaReady = null; // allow retry on next call
      throw err;
    });
  }
  return schemaReady;
}

export interface DbLead {
  leadId: string; firstName: string; lastName: string; email: string; phone: string;
  organization: string; familyLabel: string; interest: string; sourceLabel: string;
  score: number; band: string; assignee: string; queue: string;
  estimatedValue: number; campaign: string;
}

export async function insertLead(l: DbLead): Promise<void> {
  await ensureSchema();
  await getPool().query(
    `INSERT INTO leads (lead_id, first_name, last_name, email, phone, organization,
       family_label, interest, source_label, score, band, assignee, queue, estimated_value, campaign)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
    [l.leadId, l.firstName, l.lastName, l.email, l.phone, l.organization,
     l.familyLabel, l.interest, l.sourceLabel, l.score, l.band, l.assignee, l.queue,
     l.estimatedValue, l.campaign]
  );
}

export interface DbOrder {
  orderId: string; serviceName: string; slug: string; total: number;
  routeDetails: string; delivery: string; customerName: string; email: string; phone: string;
}

export async function insertOrder(o: DbOrder): Promise<void> {
  await ensureSchema();
  await getPool().query(
    `INSERT INTO orders (order_id, service_name, slug, total, route_details, delivery,
       customer_name, email, phone)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [o.orderId, o.serviceName, o.slug, o.total, o.routeDetails, o.delivery,
     o.customerName, o.email, o.phone]
  );
}

export interface DbPayment {
  txId: string; referenceId: string; orderId: string;
  serviceName: string; slug: string; amount: number;
}

export async function createPayment(p: DbPayment): Promise<void> {
  await ensureSchema();
  await getPool().query(
    `INSERT INTO payments (tx_id, reference_id, order_id, service_name, slug, amount)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [p.txId, p.referenceId, p.orderId, p.serviceName, p.slug, p.amount]
  );
}

export async function getPayment(txId: string): Promise<Record<string, unknown> | null> {
  await ensureSchema();
  const { rows } = await getPool().query(`SELECT * FROM payments WHERE tx_id = $1`, [txId]);
  return rows[0] || null;
}

/** Webhook handler core: settle the payment + mark the order paid */
export async function settlePayment(txId: string, status: "success" | "failed" | "cancelled"): Promise<Record<string, unknown> | null> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `UPDATE payments SET status = $2, paid_at = CASE WHEN $2 = 'success' THEN now() ELSE paid_at END
     WHERE tx_id = $1 RETURNING *`,
    [txId, status]
  );
  const payment = rows[0] || null;
  if (payment && status === "success" && payment.order_id) {
    await getPool().query(`UPDATE orders SET status = 'שולמה' WHERE order_id = $1`, [payment.order_id]);
  }
  return payment;
}

export interface DbFeedback {
  kind: "survey" | "error";
  rating: number | null;
  message: string;
  pageUrl: string;
  email: string;
}

export async function insertFeedback(f: DbFeedback): Promise<void> {
  await ensureSchema();
  await getPool().query(
    `INSERT INTO feedback (kind, rating, message, page_url, email) VALUES ($1,$2,$3,$4,$5)`,
    [f.kind, f.rating, f.message, f.pageUrl, f.email]
  );
}

/** Recent rows for admin surfaces (newest first) */
export async function listRecent(table: "leads" | "orders", limit = 50): Promise<Record<string, unknown>[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT * FROM ${table} ORDER BY created_at DESC LIMIT $1`,
    [Math.min(Math.max(limit, 1), 200)]
  );
  return rows;
}

// ---------------------------------------------------------------------------
// Products / services catalog — the admin-managed product database.
// The DB is the source of truth for the catalog; lib/data.ts `services` is the
// seed (first-run population) and the client-side offline fallback.
// ---------------------------------------------------------------------------

/* eslint-disable */
function rowToProduct(r: any): Service {
  return {
    slug: r.slug,
    name: r.name,
    category: r.category,
    categoryLabel: r.category_label || "",
    shortDescription: r.short_description || "",
    description: r.description || "",
    icon: r.icon || "map",
    priceFrom: Number(r.price_from) || 0,
    priceTo: r.price_to == null ? undefined : Number(r.price_to),
    priceUnit: r.price_unit || "₪",
    deliveryDays: r.delivery_days || "",
    customerTypes: Array.isArray(r.customer_types) ? r.customer_types : [],
    highlight: !!r.highlight,
    inScope: r.in_scope !== false,
    externalHref: r.external_href || undefined,
    externalUrl: r.external_url || undefined,
    govFormUrl: r.gov_form_url || undefined,
    features: Array.isArray(r.features) ? r.features : [],
    priceTable: Array.isArray(r.price_table) ? r.price_table : [],
    faq: Array.isArray(r.faq) ? r.faq : []
  };
}

/** Params for INSERT/UPDATE (order matches the SQL below). */
function productParams(p: Service, sortOrder: number, active = true): any[] {
  return [
    p.slug, p.name, p.category, p.categoryLabel ?? "", p.shortDescription ?? "",
    p.description ?? "", p.icon ?? "map", p.priceFrom ?? 0,
    p.priceTo ?? null, p.priceUnit ?? "₪", p.deliveryDays ?? "",
    JSON.stringify(p.customerTypes ?? []), p.highlight ?? false, p.inScope !== false,
    p.externalHref ?? null, p.externalUrl ?? null, p.govFormUrl ?? null,
    JSON.stringify(p.features ?? []), JSON.stringify(p.priceTable ?? []),
    JSON.stringify(p.faq ?? []), active, sortOrder
  ];
}

const UPSERT_SQL = `
  INSERT INTO products (slug, name, category, category_label, short_description, description,
    icon, price_from, price_to, price_unit, delivery_days, customer_types, highlight, in_scope,
    external_href, external_url, gov_form_url, features, price_table, faq, active, sort_order, updated_at)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13,$14,$15,$16,$17,$18::jsonb,$19::jsonb,$20::jsonb,$21,$22, now())
  ON CONFLICT (slug) DO UPDATE SET
    name=EXCLUDED.name, category=EXCLUDED.category, category_label=EXCLUDED.category_label,
    short_description=EXCLUDED.short_description, description=EXCLUDED.description, icon=EXCLUDED.icon,
    price_from=EXCLUDED.price_from, price_to=EXCLUDED.price_to, price_unit=EXCLUDED.price_unit,
    delivery_days=EXCLUDED.delivery_days, customer_types=EXCLUDED.customer_types,
    highlight=EXCLUDED.highlight, in_scope=EXCLUDED.in_scope, external_href=EXCLUDED.external_href,
    external_url=EXCLUDED.external_url, gov_form_url=EXCLUDED.gov_form_url, features=EXCLUDED.features,
    price_table=EXCLUDED.price_table, faq=EXCLUDED.faq, active=EXCLUDED.active,
    sort_order=EXCLUDED.sort_order, updated_at=now()`;

/** How many products exist (used to decide whether to seed). */
export async function countProducts(): Promise<number> {
  await ensureSchema();
  const { rows } = await getPool().query(`SELECT COUNT(*)::int AS n FROM products`);
  return rows[0]?.n ?? 0;
}

/** Populate the table from the code seed on first run (no-op if already seeded). */
export async function seedProductsIfEmpty(seed: Service[]): Promise<boolean> {
  await ensureSchema();
  if ((await countProducts()) > 0) return false;
  for (let i = 0; i < seed.length; i++) {
    await getPool().query(UPSERT_SQL, productParams(seed[i], i));
  }
  return true;
}

/** All active products, in display order. */
export async function listProducts(): Promise<Service[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT * FROM products WHERE active = true ORDER BY sort_order ASC, id ASC`
  );
  return rows.map(rowToProduct);
}

/** Every product incl. inactive — for the admin management table. */
export async function listProductsAdmin(): Promise<(Service & { active: boolean; sortOrder: number })[]> {
  await ensureSchema();
  const { rows } = await getPool().query(`SELECT * FROM products ORDER BY sort_order ASC, id ASC`);
  return rows.map(r => ({ ...rowToProduct(r), active: r.active !== false, sortOrder: r.sort_order ?? 0 }));
}

export async function getProductBySlug(slug: string): Promise<Service | null> {
  await ensureSchema();
  const { rows } = await getPool().query(`SELECT * FROM products WHERE slug = $1`, [slug]);
  return rows[0] ? rowToProduct(rows[0]) : null;
}

/** Create or update a product (upsert on slug). */
export async function upsertProduct(p: Service, opts?: { sortOrder?: number; active?: boolean }): Promise<Service> {
  await ensureSchema();
  const sort = opts?.sortOrder ?? (await countProducts());
  const { rows } = await getPool().query(
    `${UPSERT_SQL} RETURNING *`,
    productParams(p, sort, opts?.active ?? true)
  );
  return rowToProduct(rows[0]);
}

export async function deleteProduct(slug: string): Promise<boolean> {
  await ensureSchema();
  const res = await getPool().query(`DELETE FROM products WHERE slug = $1`, [slug]);
  return (res.rowCount ?? 0) > 0;
}
/* eslint-enable */
