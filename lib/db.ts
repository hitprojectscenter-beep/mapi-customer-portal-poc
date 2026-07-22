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
        CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_orders_created ON orders (created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_payments_tx ON payments (tx_id);
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

/** Recent rows for admin surfaces (newest first) */
export async function listRecent(table: "leads" | "orders", limit = 50): Promise<Record<string, unknown>[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT * FROM ${table} ORDER BY created_at DESC LIMIT $1`,
    [Math.min(Math.max(limit, 1), 200)]
  );
  return rows;
}
