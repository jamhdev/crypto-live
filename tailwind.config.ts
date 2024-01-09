import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: `var(--color-background)`,
        backgroundSecondary: `var(--color-background-secondary)`,
        primary: `var(--color-primary)`,
        accent: `var(--color-accent)`,
        chartBackground: `var(--color-chart-background)`,
        themeTextColor: `var(--color-themeTextColor)`,
      },
    },
  },
  plugins: [],
};
export default config;
