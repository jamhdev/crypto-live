import React, { useContext } from "react";
import OverviewLightIcon from "./OverviewLightIcon.svg";
import PortfolioLightIcon from "./PortfolioLightIcon.svg";
import ConverterLightIcon from "./ConverterLightIcon.svg";
import OverviewDarkIcon from "./OverviewDarkIcon.svg";
import PortfolioDarkIcon from "./PortfolioDarkIcon.svg";
import ConverterDarkIcon from "./ConverterDarkIcon.svg";
import { AppContext } from "@/app/contexts/AppContext";

export default function ThumbNavigation() {
  const { theme, currentPage, setCurrentPage } = useContext(AppContext);
  const overViewIcon =
    theme === "dark" ? <OverviewLightIcon /> : <OverviewDarkIcon />;
  const converterIcon =
    theme === "dark" ? <PortfolioLightIcon /> : <PortfolioDarkIcon />;
  const portfolioIcon =
    theme === "dark" ? <ConverterLightIcon /> : <ConverterDarkIcon />;
  return (
    <>
      <div className="fixed bottom-0 w-full h-[81px] bg-chartBackground flex justify-center items-center gap-2 sm:gap-4 md:gap-6 text-themeTextColor border-t-[1px] border-highlightColor">
        <div
          onClick={() => {
            setCurrentPage("home");
          }}
          className={
            currentPage === "home"
              ? "w-[106px] flex justify-center items-center flex-col rounded-lg p-2 text-[10px] font-medium sm:text-sm md:text-base bg-highlightColor cursor-pointer"
              : "w-[106px] flex justify-center items-center flex-col rounded-lg p-2 text-[10px] font-medium sm:text-sm md:text-base cursor-pointer"
          }
        >
          {overViewIcon}
          <div>Overview</div>
        </div>
        <div
          onClick={() => {
            setCurrentPage("converter");
          }}
          className={
            currentPage === "converter"
              ? "w-[106px] flex justify-center items-center flex-col rounded-lg p-2 text-[10px] font-medium sm:text-sm md:text-base bg-highlightColor cursor-pointer"
              : "w-[106px] flex justify-center items-center flex-col rounded-lg p-2 text-[10px] font-medium sm:text-sm md:text-base cursor-pointer"
          }
        >
          {converterIcon}
          <div>Converter</div>
        </div>
        <div
          onClick={() => {
            setCurrentPage("portfolio");
          }}
          className={
            currentPage === "portfolio"
              ? "w-[106px] flex justify-center items-center flex-col rounded-lg p-2 text-[10px] font-medium sm:text-sm md:text-base bg-highlightColor cursor-pointer"
              : "w-[106px] flex justify-center items-center flex-col rounded-lg p-2 text-[10px] font-medium sm:text-sm md:text-base cursor-pointer"
          }
        >
          {portfolioIcon}
          <div>Portfolio</div>
        </div>
      </div>
    </>
  );
}
