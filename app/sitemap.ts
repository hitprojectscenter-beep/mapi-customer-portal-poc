import type { MetadataRoute } from "next";
import { services, customerTypeLabels } from "@/lib/data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mapi-customer-portal-poc.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/catalog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/plans`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/bundles`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/api-hub`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/segments`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.3 }
  ];

  const productPages: MetadataRoute.Sitemap = services.map(s => ({
    url: `${BASE_URL}/catalog/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8
  }));

  const segmentPages: MetadataRoute.Sitemap = Object.keys(customerTypeLabels).map(type => ({
    url: `${BASE_URL}/segments/${type}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6
  }));

  return [...staticPages, ...productPages, ...segmentPages];
}
