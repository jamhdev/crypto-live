"use client";
import { createContext, useEffect, useState } from "react";

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<themeOption>("dark");

  const toggleTheme = () => {
    setTheme((prev: themeOption) => {
      if (prev === "light") {
        return "dark";
      } else return "light";
    });
  };

  const colors = {
    background: theme === "dark" ? "#13121B" : "#F3F5F9",
    backgroundSecondary:
      theme === "dark" ? "#191925" : "rgba(204, 204, 254, 0.4)",
    primary: theme === "dark" ? "#191926" : "#FFF",
    accent:
      theme === "dark" ? "rgba(97, 97, 222, 0.50)" : "rgba(97, 97, 222, 0.50)",
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-background", colors.background);
    root.style.setProperty(
      "--color-background-secondary",
      colors.backgroundSecondary
    );
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-accent", colors.accent);
  }, [theme, colors]);

  return (
    <>
      <AppContext.Provider value={{ theme, setTheme, toggleTheme, colors }}>
        {children}
      </AppContext.Provider>
    </>
  );
}

export const AppContext = createContext<CreateContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
  colors: {
    background: "#13121B",
    primary: "#191926",
    accent: "rgba(97, 97, 222, 0.50)",
  },
});
