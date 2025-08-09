"use client";
import { AppContext } from "@/app/contexts/AppContext";
import React, { useContext, useEffect, useRef, useState } from "react";
//
import NavDarkmodeButtonSvg from "./NavDarkmodeButtonSvg.svg";
import NavLightmodeButtonSvg from "./NavLightmodeButtonSvg.svg";
//
import DarkNavSearchIcon from "./DarkNavSearchIcon.svg";
import LightNavSearchIcon from "./LightNavSearchIcon.svg";
//
import DarkNavHomeIcon from "./DarkNavHomeIcon.svg";
import LightNavHomeIcon from "./LightNavHomeIcon.svg";
import DarkNavHomeIconSelected from "./DarkNavHomeIconSelected.svg";
import LightNavHomeIconSelected from "./LightNavHomeIconSelected.svg";
//
import DarkPortfolioNavIcon from "./DarkPortfolioNavIcon.svg";
import DarkPortfolioNavIconSelected from "./DarkPortfolioNavIconSelected.svg";
import LightPortfolioNavIcon from "./LightPortfolioNavIcon.svg";
import LightPortfolioNavIconSelected from "./LightPortfolioNavIconSelected.svg";
//
import NavLogoSvg from "./NavLogoSvg.svg";
import SearchDropDown from "./SearchDropDown";
//
import DropDownArrowIconDarkDown from "./DropDownArrowIconDarkDown.svg";
import DropDownArrowIconDarkUp from "./DropDownArrowIconDarkUp.svg";
import DropDownArrowIconLightDown from "./DropDownArrowIconLightDown.svg";
import DropDownArrowIconLightUp from "./DropDownArrowIconLightUp.svg";

export default function NavBar() {
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

  const currentPageDarkMode =
    currentPage === "home" || currentPage === "converter" ? (
      <div className="text-white flex justify-center items-center cursor-pointer gap-0 md:gap-10">
        <div
          className="flex gap-1"
          onClick={() => {
            setIsViewingCoinPage(false);
            setCurrentPage("home");
          }}
        >
          <DarkNavHomeIconSelected />
          <div>Home</div>
        </div>
        <div
          className="flex gap-1"
          onClick={() => {
            setCurrentPage("portfolio");
            setIsViewingCoinPage(false);
          }}
        >
          <DarkPortfolioNavIcon />
          <div>Portfolio</div>
        </div>
      </div>
    ) : (
      <div className="text-themeTextColorThird flex justify-center items-center cursor-pointer gap-0 md:gap-10">
        <div
          className="flex gap-1"
          onClick={() => {
            setIsViewingCoinPage(false);
            setCurrentPage("home");
          }}
        >
          <DarkNavHomeIcon />
          <div className="text-themeTextColorThird">Home</div>
        </div>
        <div className="flex gap-1">
          <DarkPortfolioNavIconSelected />
          <div className="text-themeTextColorThird">Portfolio</div>
        </div>
      </div>
    );

  const currentPageLightMode =
    currentPage === "home" || currentPage === "converter" ? (
      <div className="flex justify-center items-center cursor-pointer gap-0 md:gap-10">
        <div
          className="flex gap-1"
          onClick={() => {
            setIsViewingCoinPage(false);
            setCurrentPage("home");
          }}
        >
          <LightNavHomeIconSelected />
          <div>Home</div>
        </div>
        <div
          className="flex gap-1"
          onClick={() => {
            setCurrentPage("portfolio");
            setIsViewingCoinPage(false);
          }}
        >
          <LightPortfolioNavIcon />
          <div>Portfolio</div>
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center cursor-pointer gap-0 md:gap-10">
        <div
          className="flex gap-1"
          onClick={() => {
            setIsViewingCoinPage(false);
            setCurrentPage("home");
          }}
        >
          <LightNavHomeIcon />
          <div>Home</div>
        </div>
        <div className="flex gap-1">
          <LightPortfolioNavIconSelected />
          <div>Portfolio</div>
        </div>
      </div>
    );

  return (
    <>
      <div className="w-screen h-[80px] bg-navBarColor z-20">
        <div className="max-w-[1440px] flex justify-between pl-10 pr-10 h-[80px] py-4 m-auto">
          <div
            className="flex text-xl justify-center items-center gap-2 cursor-pointer"
            onClick={() => {
              setIsViewingCoinPage(false);
              setCurrentPage("home");
            }}
          >
            <NavLogoSvg />
            <div className="text-themeTextColorSecondary font-bold">
              CryptoLive
            </div>
          </div>

          <div className="flex">
            {theme === "dark" ? currentPageDarkMode : currentPageLightMode}
          </div>

          <div className="flex gap-2">
            <SearchDropDown />
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
          </div>
        </div>
      </div>
    </>
  );
}
