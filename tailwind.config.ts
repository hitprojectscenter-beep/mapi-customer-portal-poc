import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#001d35",
        "primary-container": "#1f4e79",
        "primary-fixed": "#d1e4ff",
        "primary-fixed-dim": "#a0cafc",
        "on-primary": "#ffffff",
        "on-primary-container": "#95bff1",
        "on-primary-fixed": "#001d35",
        "on-primary-fixed-variant": "#184974",

        secondary: "#0b61a1",
        "secondary-container": "#7cbaff",
        "secondary-fixed": "#d1e4ff",
        "secondary-fixed-dim": "#9ecaff",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#004a7d",
        "on-secondary-fixed": "#001d36",
        "on-secondary-fixed-variant": "#00497c",

        /* Luxury palette: tertiary = muted royal purple (was slate) */
        tertiary: "#463f7a",
        "tertiary-container": "#5a5296",
        "tertiary-fixed": "#e7e3f6",
        "tertiary-fixed-dim": "#cbc4ea",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#d6d0f0",
        "on-tertiary-fixed": "#141034",
        "on-tertiary-fixed-variant": "#3e3768",

        /* Champagne gold accents — hairlines, labels, hover states */
        gold: "#b4924e",
        "gold-dark": "#8f7439",
        "gold-light": "#d9c79c",
        "gold-tint": "#faf6ec",
        ivory: "#faf8f4",

        surface: "#f8f9fb",
        "surface-bright": "#f8f9fb",
        "surface-dim": "#d8dadc",
        "surface-main": "#ffffff",
        "surface-variant": "#e0e3e5",
        "surface-tint": "#35618d",
        "surface-container": "#eceef0",
        "surface-container-low": "#f2f4f6",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "inverse-surface": "#2d3133",
        "inverse-on-surface": "#eff1f3",
        "inverse-primary": "#a0cafc",

        "on-surface": "#191c1e",
        "on-surface-variant": "#42474f",
        "on-background": "#191c1e",
        background: "#f8f9fb",
        outline: "#72777f",
        "outline-variant": "#c2c7d0",

        "text-primary": "#1a1a1a",
        "text-secondary": "#4a5568",

        "alert-yellow": "#bf8f00",
        "error-red": "#c00000",
        "positive-green": "#548235",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",

        glass: "rgba(255, 255, 255, 0.08)",
        "glass-dark": "rgba(0, 29, 53, 0.6)"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px"
      },
      spacing: {
        "container-max-width": "1440px",
        "margin-desktop": "48px",
        "margin-mobile": "16px",
        "gutter-desktop": "24px",
        "gutter-mobile": "16px",
        unit: "4px"
      },
      maxWidth: {
        "container-max-width": "1440px"
      },
      fontFamily: {
        body: ["Public Sans", "Heebo", "Assistant", "Arial", "sans-serif"]
      },
      fontSize: {
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "title-lg": ["18px", { lineHeight: "24px", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-down": "slide-down 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-in-left": "slide-in-left 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-in-right": "slide-in-right 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        "scale-in": "scale-in 0.25s cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};

export default config;
