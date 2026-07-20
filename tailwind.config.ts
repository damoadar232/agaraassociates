import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          hover: "hsl(var(--surface-hover))",
        },
        heading: "hsl(var(--heading))",
        body: "hsl(var(--body))",
        divider: "hsl(var(--divider))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        gold: {
          DEFAULT: "hsl(var(--gold))",
          foreground: "hsl(var(--gold-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        agara: {
          cream: "#F7F4EF",
          charcoal: "#222222",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["var(--font-elms)", "var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif-display)", "Cormorant Garamond", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 40px -18px rgba(0,0,0,0.12), 0 6px 18px -10px rgba(0,0,0,0.08)",
        "card-hover": "0 20px 52px -20px rgba(0,0,0,0.14), 0 10px 30px -18px rgba(0,0,0,0.08)",
        glass: "0 24px 60px rgba(0,0,0,0.12)",
        "glass-sm": "0 12px 30px rgba(0,0,0,0.08)",
        "glass-dark": "0 18px 48px rgba(0,0,0,0.18)",
        "agara-soft": "0 12px 36px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
