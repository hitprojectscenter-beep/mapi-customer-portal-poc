/** @type {import('next').NextConfig} */

// Production security headers.
// CSP notes:
//  - 'unsafe-inline' script/style is required by Next.js inline runtime + Tailwind;
//    the strict upgrade path is nonce-based CSP via middleware.
//  - frame-src allows GovMap (embedded map) only; frame-ancestors 'none' blocks
//    clickjacking on our own pages.
//  - connect-src includes GA4 endpoints (analytics is env-gated).
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  // 'unsafe-eval' is needed only by the dev-mode HMR runtime;
  // accounts.google.com = Google Identity Services (CMS Workspace sign-in)
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://accounts.google.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://accounts.google.com",
  "frame-src https://www.govmap.gov.il https://govmap.gov.il https://accounts.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests"
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), payment=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" }
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // E2E isolation: another session may run `next dev` in this folder and
  // clobber .next while tests serve it. CI/E2E builds set NEXT_DIST_DIR.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" }
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders
      },
      {
        // API responses must never be cached by intermediaries
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
