import React, { useContext } from "react";
import OverviewLightIcon from "./OverviewLightIcon.svg";
import PortfolioLightIcon from "./PortfolioLightIcon.svg";
import ConverterLightIcon from "./ConverterLightIcon.svg";
import OverviewDarkIcon from "./OverviewDarkIcon.svg";
import PortfolioDarkIcon from "./PortfolioDarkIcon.svg";
import ConverterDarkIcon from "./ConverterDarkIcon.svg";
import { AppContext } from "@/app/contexts/AppContext";

export default function ThumbNavigation() {
  const { theme, currentPage, setCurrentPage, setIsViewingCoinPage } =
    useContext(AppContext);
  const overViewIcon =
    theme === "dark" ? <OverviewLightIcon /> : <OverviewDarkIcon />;
  const converterIcon =
    theme === "dark" ? <PortfolioLightIcon /> : <PortfolioDarkIcon />;
  const portfolioIcon =
    theme === "dark" ? <ConverterLightIcon /> : <ConverterDarkIcon />;
  const selectedGradient = "#7878FA";

  return (
    <>
      <div className="fixed bottom-0 w-full h-[81px] bg-chartBackground flex justify-center items-center gap-2 sm:gap-4 md:gap-6 text-themeTextColor border-t-[1px] border-highlightColor z-10">
        <div
          className={
            currentPage === "home"
              ? "bg-gradient-to-b from-selectedGradient to-transparent p-[1px] rounded-lg"
              : ""
          }
        >
          <div
            onClick={() => {
              setIsViewingCoinPage(false);
              setCurrentPage("home");
            }}
            className={
              currentPage === "home"
                ? "w-[106px] flex justify-center items-center flex-col rounded-lg p-2 text-[10px] font-medium sm:text-sm md:text-base bg-highlightColor cursor-pointer border-gradient"
                : "w-[106px] flex justify-center items-center flex-col rounded-lg p-2 text-[10px] font-medium sm:text-sm md:text-base cursor-pointer"
            }
          >
            {overViewIcon}
            <div>Overview</div>
          </div>
        </div>
        <div
          className={
            currentPage === "converter"
              ? "bg-gradient-to-b from-selectedGradient to-transparent p-[1px] rounded-lg"
              : ""
          }
        >
          <div
            onClick={() => {
              setCurrentPage("converter");
              setIsViewingCoinPage(false);
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
        </div>
        <div
          className={
            currentPage === "portfolio"
              ? "bg-gradient-to-b from-selectedGradient to-transparent p-[1px] rounded-lg"
              : ""
          }
        >
          <div
            onClick={() => {
              setCurrentPage("portfolio");
              setIsViewingCoinPage(false);
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
      </div>
    </>
  );
}
