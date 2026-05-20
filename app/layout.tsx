import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AISupportButton from "@/components/AISupportButton";

export const metadata: Metadata = {
  title: 'MAPI - המרכז למיפוי ישראל | פורטל לקוחות',
  description:
    'הפורטל הלאומי הרשמי למידע גיאוגרפי. הזמנת מפות, נתוני קדסטר, שירותי GNSS ותצלומי אוויר ישירות מהמרכז למיפוי ישראל.',
  keywords: ['מפ"י', "מיפוי", "קדסטר", "GIS", 'מפות', "אורתופוטו", "מודד", "גיאודזיה"],
  authors: [{ name: 'המרכז למיפוי ישראל' }],
  openGraph: {
    title: 'MAPI - פורטל לקוחות',
    description: "פורטל השירותים של המרכז למיפוי ישראל",
    locale: "he_IL",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;800&family=Heebo:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body selection:bg-secondary/30 antialiased">
        <Header />
        <main id="main-content" className="pt-20 min-h-screen">
          {children}
        </main>
        <Footer />
        <AISupportButton />
      </body>
    </html>
  );
}
