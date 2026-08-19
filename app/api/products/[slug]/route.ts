import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, getProductBySlug, upsertProduct, deleteProduct } from "@/lib/db";
import { services as seed } from "@/lib/data";
import { sanitizeProduct } from "@/lib/productSchema";
import { verifyToken, SESSION_COOKIE } from "@/lib/cmsServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isAdmin = (req: NextRequest) => !!verifyToken(req.cookies.get(SESSION_COOKIE)?.value);

/** GET a single product (public) — DB first, code seed as fallback. */
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  if (dbConfigured()) {
    try {
      const p = await getProductBySlug(slug);
      if (p) return NextResponse.json({ product: p, source: "db" });
    } catch (e) {
      console.warn("[product GET]", (e as Error).message);
    }
  }
  const fallback = seed.find(s => s.slug === slug);
  return fallback
    ? NextResponse.json({ product: fallback, source: "seed" })
    : NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
}

/** PUT — update the product at this slug (admin only). */
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbConfigured()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 }); }
  const product = sanitizeProduct(body, params.slug);
  if (!product) return NextResponse.json({ ok: false, error: "invalid_product" }, { status: 422 });

  try {
    const saved = await upsertProduct(product, {
      active: (body as any)?.active !== false,
      sortOrder: typeof (body as any)?.sortOrder === "number" ? (body as any).sortOrder : undefined
    });
    return NextResponse.json({ ok: true, product: saved });
  } catch (e) {
    console.warn("[product PUT]", (e as Error).message);
    return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  }
}

/** DELETE the product at this slug (admin only). */
export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!dbConfigured()) return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  try {
    const removed = await deleteProduct(params.slug);
    return NextResponse.json({ ok: removed });
  } catch (e) {
    console.warn("[product DELETE]", (e as Error).message);
    return NextResponse.json({ ok: false, error: "delete_failed" }, { status: 500 });
  }
}
