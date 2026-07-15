import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import NewsTicker from "@/components/NewsTicker";
import UtilityBar from "@/components/UtilityBar";
import MiniCartDrawer from "@/components/MiniCartDrawer";
import ScrollHintBubble from "@/components/ScrollHintBubble";
import MonitoringInit from "@/components/MonitoringInit";
import Analytics from "@/components/Analytics";
import { LanguageProvider } from "@/lib/LanguageContext";
import { CartProvider } from "@/lib/CartContext";
import { WishlistProvider } from "@/lib/WishlistContext";

const FALLBACK_SITE_URL = "https://mapi-customer-portal-poc.vercel.app";

// Env values set via CLI pipes can carry stray whitespace/CR — sanitize,
// and never let a malformed value break the build.
function siteUrl(): URL {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  try {
    return new URL(raw || FALLBACK_SITE_URL);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: 'מפ"י - המרכז למיפוי ישראל | פורטל לקוחות',
  description:
    'הפורטל הלאומי הרשמי למידע גיאוגרפי. הזמנת מפות, נתוני קדסטר, שירותי GNSS ותצלומי אוויר ישירות מהמרכז למיפוי ישראל.',
  keywords: ['מפ"י', "מיפוי", "קדסטר", "GIS", 'מפות', "אורתופוטו", "מודד", "גיאודזיה"],
  authors: [{ name: 'המרכז למיפוי ישראל' }],
  other: {
    "color-scheme": "light only"
  },
  openGraph: {
    title: 'מפ"י - פורטל לקוחות',
    description: "פורטל השירותים של המרכז למיפוי ישראל",
    locale: "he_IL",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#001d35",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Force LIGHT color scheme on all devices */}
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="theme-color" content="#001d35" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=Heebo:wght@200;300;400;500;600;700;800&family=Assistant:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body selection:bg-secondary/30 antialiased">
        <Analytics />
        <LanguageProvider>
          <MonitoringInit />
          <WishlistProvider>
            <CartProvider>
              <NewsTicker />
              <UtilityBar />
              <Header />
              <main
                id="main-content"
                className="min-h-screen"
                style={{ paddingTop: "calc(168px + var(--safe-top))" }}
              >
                {children}
              </main>
              <Footer />
              <AIAssistant />
              <MiniCartDrawer />
              <ScrollHintBubble />
            </CartProvider>
          </WishlistProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
