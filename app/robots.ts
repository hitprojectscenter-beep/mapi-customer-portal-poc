import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mapi-customer-portal-poc.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Back-office, APIs and personal areas are never indexed
        disallow: ["/cms", "/cms/", "/admin", "/admin/", "/api/", "/dashboard", "/orders", "/cart", "/wishlist"]
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}
