"use client";
import { AppContext } from "@/app/contexts/AppContext";
import React, { useContext } from "react";

export default function NavBar() {
  const { theme, toggleTheme } = useContext(AppContext);
  return (
    <>
      <div>NavBar</div>
      <div>{theme}</div>
      <button className="bg-red-200 p-2" onClick={toggleTheme}>
        change theme
      </button>
    </>
  );
}
