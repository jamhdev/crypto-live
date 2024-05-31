"use client";
import { AppContext } from "@/app/contexts/AppContext";
import React, { useContext, useEffect, useRef, useState } from "react";
//
import NavDarkmodeButtonSvg from "../NavDarkmodeButtonSvg.svg";
import NavLightmodeButtonSvg from "../NavLightmodeButtonSvg.svg";
//
import NavLogoSvg from "../NavLogoSvg.svg";
//
import DropDownArrowIconDarkDown from "../DropDownArrowIconDarkDown.svg";
import DropDownArrowIconDarkUp from "../DropDownArrowIconDarkUp.svg";
import DropDownArrowIconLightDown from "../DropDownArrowIconLightDown.svg";
import DropDownArrowIconLightUp from "../DropDownArrowIconLightUp.svg";
import SearchDropDownMobile from "./SearchDropDownMobile";

export default function NavBarMobile() {
  const {
    theme,
    toggleTheme,
    currentPage,
    setCurrentPage,
    setIsViewingCoinPage,
    currencyCodes,
    currency,
    setCurrency,
  } = useContext(AppContext);

  const [dropDownArrow, setDropDownArrow] = useState(false);
  const currencySelectionRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        currencySelectionRef.current !== null &&
        !currencySelectionRef.current.contains(e.target as Node)
      ) {
        setDropDownArrow(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const dropDownArrowIcon =
    theme === "dark" ? (
      <DropDownArrowIconLightDown />
    ) : (
      <DropDownArrowIconDarkDown />
    );

  const activeDropDownArrowIcon =
    theme === "dark" ? (
      <DropDownArrowIconLightUp />
    ) : (
      <DropDownArrowIconDarkUp />
    );

  const currentDropDownArrow =
    dropDownArrow === false ? dropDownArrowIcon : activeDropDownArrowIcon;

  return (
    <>
      <div className="w-screen h-[80px] bg-navBarColor z-20">
        <div className="max-w-[1440px] flex justify-between pl-10 pr-10 h-[80px] py-4 m-auto">
          <div
            className={
              isFocused
                ? "text-xl justify-center items-center gap-2 cursor-pointer hidden sm:flex"
                : "flex text-xl justify-center items-center gap-2 cursor-pointer"
            }
            onClick={() => {
              setIsViewingCoinPage(false);
              setCurrentPage("home");
            }}
          >
            <NavLogoSvg />
            <div className="text-themeTextColorSecondary font-bold hidden md:block">
              Logoipsm
            </div>
          </div>

          <div className={isFocused ? "flex gap-2 w-full" : "flex gap-2"}>
            <SearchDropDownMobile
              isFocused={isFocused}
              setIsFocused={setIsFocused}
            />
            {!isFocused && (
              <>
                <div
                  ref={currencySelectionRef}
                  className={
                    dropDownArrow === false
                      ? "flex justify-center items-center bg-backgroundSecondary rounded-lg w-[104px] text-themeTextColor relative cursor-pointer gap-2"
                      : "flex justify-center items-center bg-highlightColor rounded-lg rounded-bl-none rounded-br-none w-[104px] text-themeTextColor relative cursor-pointer gap-2"
                  }
                  onClick={() => {
                    setDropDownArrow((prev) => !prev);
                  }}
                >
                  <div>{currency.toUpperCase()}</div>
                  <div>{currentDropDownArrow}</div>
                  {dropDownArrow && (
                    <>
                      <div
                        className="top-[48px] w-[104px] bg-highlightColor absolute z-10 cursor-pointer rounded-b-lg"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        {currencyCodes.map((code, arr) => (
                          <div
                            key={code}
                            className="text-center text-themeTextColor font-medium p-[2px] hover:bg-chartBackground"
                            onClick={() => {
                              setCurrency(code.toUpperCase());
                            }}
                          >
                            {code.toUpperCase()}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <button
                  className="p-2 bg-backgroundSecondary w-[48px] rounded-lg flex justify-center items-center"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? (
                    <NavDarkmodeButtonSvg />
                  ) : (
                    <NavLightmodeButtonSvg />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
