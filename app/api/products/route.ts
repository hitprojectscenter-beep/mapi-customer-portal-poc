import { NextRequest, NextResponse } from "next/server";
import {
  dbConfigured, seedProductsIfEmpty, listProducts, listProductsAdmin, upsertProduct
} from "@/lib/db";
import { services as seed } from "@/lib/data";
import { sanitizeProduct } from "@/lib/productSchema";
import { verifyToken, SESSION_COOKIE } from "@/lib/cmsServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isAdmin = (req: NextRequest) => !!verifyToken(req.cookies.get(SESSION_COOKIE)?.value);

/**
 * GET /api/products
 *   public   → active products for the catalog (DB, or the code seed as fallback)
 *   admin    → ALL products incl. inactive (for the CMS management table)
 * The DB is seeded from the code list on first call.
 */
export async function GET(req: NextRequest) {
  if (!dbConfigured()) {
    // Demo mode (no DB): serve the code seed so the catalog always works.
    return NextResponse.json({ products: seed, source: "seed" });
  }
  try {
    await seedProductsIfEmpty(seed);
    const products = isAdmin(req) ? await listProductsAdmin() : await listProducts();
    return NextResponse.json({ products, source: "db" });
  } catch (e) {
    console.warn("[products GET]", (e as Error).message);
    return NextResponse.json({ products: seed, source: "seed-fallback" });
  }
}

/** POST /api/products — create/update a product (admin only). */
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 }); }
  const product = sanitizeProduct(body);
  if (!product) {
    return NextResponse.json({ ok: false, error: "invalid_product (slug + name required)" }, { status: 422 });
  }
  try {
    const saved = await upsertProduct(product, {
      active: (body as any)?.active !== false,
      sortOrder: typeof (body as any)?.sortOrder === "number" ? (body as any).sortOrder : undefined
    });
    return NextResponse.json({ ok: true, product: saved });
  } catch (e) {
    console.warn("[products POST]", (e as Error).message);
    return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  }
}
