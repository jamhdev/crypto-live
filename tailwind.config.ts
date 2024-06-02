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
        chartBackgroundSecondary: "var(--color-chart-background-secondary)",
        themeTextColor: `var(--color-themeTextColor)`,
        themeTextColorSecondary: `var(--color-theme-text-color-secondary)`,
        themeTextColorThird: `var(--color-theme-text-color-third)`,
        highlightColor: `var(--color-highlight-color)`,
        greenMain: `var(--color-green-main)`,
        greenSecondary: `var(--color-green-secondary)`,
        redMain: `var(--color-red-main)`,
        navBarColor: `var(--color-nav-bar-color)`,
        coinsOrConverterBackgroundColor: `var(--color-coins-or-converter-background-color)`,
        chartDurationBackgroundColor: `var(--color-chart-duration-background-color)`,
        selectedGradient: `var(--color-selected-gradient)`,
      },
      fontSize: {},
      screens: { xs: "370px", xsm: "500px" },
    },
  },
  plugins: [],
};
export default config;
