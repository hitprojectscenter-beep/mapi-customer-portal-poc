import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { services, categories } from "@/lib/data";

export default function HomePage() {
  const featuredServices = services.filter((s) => s.highlight).slice(0, 4);

  return (
    <>
      {/* Cinematic Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary -mt-20 pt-20"
        aria-label="באנר ראשי"
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80")'
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
          <div className="absolute inset-0 topo-pattern opacity-30" aria-hidden="true" />
        </div>

        {/* Data Vis Decorations */}
        <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-px h-32 bg-white/40" />
          <div className="absolute top-1/4 left-1/4 w-32 h-px bg-white/40" />
          <div className="absolute bottom-1/3 right-1/4 border border-white/20 rounded-full w-64 h-64" />
          <span className="absolute top-24 right-6 md:right-20 text-[10px] text-white/40 font-mono tracking-widest">
            COORD: 31.7683° N, 35.2137° E
          </span>
        </div>

        <div className="relative z-10 max-w-container-max-width mx-auto px-4 md:px-margin-desktop text-center py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 text-white/90 border border-white/10">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="text-xs font-bold tracking-wide">
              הפורטל הלאומי הרשמי למידע גיאוגרפי
            </span>
          </div>

          <h1 className="text-white font-extrabold text-4xl md:text-6xl lg:text-7xl xl:text-[88px] leading-[1.1] mb-10 max-w-5xl mx-auto">
            העתיד של המידע
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-secondary-container to-white">
              הגיאוגרפי בידיים שלך
            </span>
          </h1>

          {/* Glassmorphism Search Bar */}
          <form
            role="search"
            action="/catalog"
            method="get"
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="glass-effect p-2 rounded-2xl flex flex-row-reverse items-center shadow-2xl">
              <label htmlFor="hero-search" className="sr-only">חיפוש שירות</label>
              <input
                id="hero-search"
                name="q"
                type="search"
                placeholder='חיפוש מפות, תצלומי אוויר או שירותי קדסטר...'
                className="bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder:text-white/50 text-right flex-grow px-4 md:px-6 py-3 md:py-4 text-base md:text-lg w-full"
              />
              <button
                type="submit"
                className="bg-white text-primary px-4 md:px-8 py-3 md:py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary-container transition-all whitespace-nowrap"
              >
                <span className="hidden sm:inline">חיפוש</span>
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-4 md:gap-6">
            <Link
              href="/catalog"
              className="group bg-secondary text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold flex items-center gap-3 hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/20 w-full sm:w-auto justify-center"
            >
              התחל הזמנה
              <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
            </Link>
            <a
              href="https://govmap.gov.il"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white font-bold flex items-center gap-2 transition-all"
            >
              <span>למפה החופשית</span>
              <span className="material-symbols-outlined">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50" aria-hidden="true">
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 relative bg-surface" aria-labelledby="services-heading">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop">
          <div className="flex flex-col md:flex-row-reverse items-end justify-between mb-16 md:mb-24 gap-8">
            <div className="text-right max-w-2xl">
              <span className="text-secondary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">
                השירותים שלנו
              </span>
              <h2
                id="services-heading"
                className="text-primary text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
              >
                דיוק ללא פשרות,
                <br />
                בכל קנה מידה.
              </h2>
            </div>
            <p className="text-on-surface-variant text-base md:text-lg max-w-sm text-right leading-relaxed">
              גישה ישירה למאגרי המידע הממשלתיים המעודכנים ביותר עבור אנשי מקצוע ומוסדות.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Hero card 1 */}
            <Link
              href={`/catalog/${featuredServices[0]?.slug}`}
              className="md:col-span-7 group premium-card relative overflow-hidden bg-white rounded-3xl p-8 md:p-10 border border-outline-variant/50 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative z-10 flex flex-col h-full text-right items-end">
                <div className="card-icon w-20 h-20 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary mb-8 md:mb-10 transition-all duration-500">
                  <span className="material-symbols-outlined text-[48px]">
                    {featuredServices[0]?.icon}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-4">
                  {featuredServices[0]?.name}
                </h3>
                <p className="text-on-surface-variant text-base md:text-lg mb-8 max-w-md">
                  {featuredServices[0]?.shortDescription}
                </p>
                <div className="mt-auto flex flex-row-reverse items-center justify-between w-full">
                  <span className="text-xl md:text-2xl font-black text-secondary">
                    ₪{featuredServices[0]?.priceFrom.toLocaleString()} -{" "}
                    ₪{featuredServices[0]?.priceTo?.toLocaleString()}
                  </span>
                  <span
                    className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    <span className="material-symbols-outlined">shopping_cart</span>
                  </span>
                </div>
              </div>
              <div className="absolute -left-20 -bottom-20 w-80 h-80 border-[40px] border-secondary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </Link>

            {/* Vertical dark card */}
            <Link
              href={`/catalog/${featuredServices[1]?.slug}`}
              className="md:col-span-5 group premium-card bg-primary rounded-3xl p-8 md:p-10 text-white relative overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative z-10 flex flex-col h-full text-right items-end">
                <div className="card-icon w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 md:mb-10 transition-all">
                  <span className="material-symbols-outlined text-[40px]">
                    {featuredServices[1]?.icon}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
                  {featuredServices[1]?.name}
                </h3>
                <p className="text-white/70 text-base md:text-lg mb-8">
                  {featuredServices[1]?.shortDescription}
                </p>
                <div className="mt-auto w-full">
                  <div className="flex items-center justify-between flex-row-reverse mb-6">
                    <span className="text-lg md:text-xl font-bold">
                      מ-₪{featuredServices[1]?.priceFrom.toLocaleString()} לחודש
                    </span>
                    <span className="bg-secondary px-3 py-1 rounded text-xs uppercase font-bold tracking-widest">
                      מומלץ
                    </span>
                  </div>
                  <span className="block w-full py-4 rounded-xl border border-white/20 font-bold text-center group-hover:bg-white group-hover:text-primary transition-all">
                    לרכישת מנוי
                  </span>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10" aria-hidden="true">
                <span className="material-symbols-outlined text-[180px]">radar</span>
              </div>
            </Link>

            {/* Smaller cards */}
            {featuredServices.slice(2).map((service) => (
              <div key={service.slug} className="md:col-span-4">
                <ServiceCard service={service} />
              </div>
            ))}

            {/* Filler 4th smaller card */}
            <div className="md:col-span-4">
              <ServiceCard service={services.find((s) => s.slug === "gis-layers")!} />
            </div>
          </div>
        </div>
      </section>

      {/* Prestige Stats Section */}
      <section className="py-20 md:py-32 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 dot-pattern opacity-10" aria-hidden="true" />
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="text-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">
                הסטנדרט הלאומי
                <br />
                למצוינות גיאוגרפית
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-12 max-w-xl">
                מערכות מפ"י משרתות את המשק הישראלי בדיוק חסר תקדים, תוך שימוש בטכנולוגיות
                הלוויין והמיפוי המתקדמות ביותר בעולם.
              </p>
              <div className="grid grid-cols-2 gap-8 md:gap-10">
                <div>
                  <p className="text-4xl md:text-5xl font-black text-secondary-container mb-2">
                    2.4M
                  </p>
                  <p className="text-xs md:text-sm uppercase tracking-widest font-bold text-white/50">
                    שאילתות מידע בשנה
                  </p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-black text-secondary-container mb-2">
                    15K
                  </p>
                  <p className="text-xs md:text-sm uppercase tracking-widest font-bold text-white/50">
                    אנשי מקצוע רשומים
                  </p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-black text-secondary-container mb-2">
                    97%
                  </p>
                  <p className="text-xs md:text-sm uppercase tracking-widest font-bold text-white/50">
                    שביעות רצון לקוחות
                  </p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-black text-secondary-container mb-2">
                    24/7
                  </p>
                  <p className="text-xs md:text-sm uppercase tracking-widest font-bold text-white/50">
                    זמינות הפורטל
                  </p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="aspect-square bg-gradient-to-br from-secondary/20 to-transparent rounded-full flex items-center justify-center p-12 border border-white/5 animate-float">
                <div className="w-full h-full glass-effect rounded-3xl overflow-hidden shadow-2xl relative">
                  <div
                    className="w-full h-full bg-cover bg-center grayscale opacity-60 mix-blend-screen"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=900&q=80")'
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[100px] text-white/20">
                      explore
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-secondary text-white px-6 py-4 rounded-2xl shadow-xl">
                <p className="text-xs font-mono">LAT: 32.0621</p>
                <p className="text-xs font-mono">LON: 34.7748</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-20 md:py-32 bg-white" aria-labelledby="categories-heading">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop">
          <div className="text-center mb-16 md:mb-24">
            <h2 id="categories-heading" className="text-3xl md:text-4xl font-black text-primary mb-4">
              קטלוג הקטגוריות
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalog?category=${cat.id}`}
                className="group flex flex-col items-center p-6 md:p-10 bg-surface rounded-3xl hover:bg-primary transition-all duration-300"
              >
                <span className="material-symbols-outlined text-[32px] md:text-[40px] text-secondary mb-4 md:mb-6 group-hover:text-white transition-colors">
                  {cat.icon}
                </span>
                <span className="font-bold text-primary group-hover:text-white transition-colors text-sm md:text-base">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-surface-container relative">
        <div className="max-w-container-max-width mx-auto px-4 md:px-margin-desktop text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary mb-6">
            מוכן להתחיל?
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-10">
            הצטרף לאלפי המודדים, המהנדסים ואנשי המקצוע שכבר עובדים עם הפורטל הלאומי של מפ"י.
          </p>
          <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-4">
            <Link
              href="/login"
              className="bg-primary text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-secondary transition-colors shadow-xl"
            >
              <span>התחבר עם הזדהות לאומית</span>
              <span className="material-symbols-outlined">login</span>
            </Link>
            <Link
              href="/catalog"
              className="text-primary font-bold flex items-center gap-2 hover:text-secondary transition-colors"
            >
              <span>עיין בקטלוג ללא הזדהות</span>
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
