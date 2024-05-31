"use client";
import { AppContext } from "@/app/contexts/AppContext";
import React, { useContext, useEffect } from "react";
import CoinPage from "../CoinPage/CoinPage";
import MarketDataNav from "../market-data-nav/MarketDataNav";
import NavBar from "../navigation/NavBar";
import CoinOrConverterSelector from "../CoinOrConverterSelector/CoinOrConverterSelector";
import ChartAndCarouselContainer from "../home-chart-and-carousel-section/ChartAndCarouselContainer";
import HomeTableSection from "../home-table-section/HomeTableSection";
import ConverterPage from "../ConverterPage/ConverterPage";
import PortfolioMain from "../portfolio-page/PortfolioMain";
import MarketDataNavMobile from "../market-data-nav/market-data-nav-mobile/MarketDataNavMobile";
import NavBarMobile from "../navigation/nav-bar-mobile/NavBarMobile";

export default function MainBody() {
  const { isViewingCoinPage, currentPage, screenWidth } =
    useContext(AppContext);

  const marketDataNav =
    screenWidth > 830 ? <MarketDataNav /> : <MarketDataNavMobile />;
  const navBar = screenWidth > 934 ? <NavBar /> : <NavBarMobile />;

  if (currentPage === "portfolio") {
    return (
      <>
        {marketDataNav}
        {navBar}
        <PortfolioMain />
      </>
    );
  } else if (currentPage === "converter") {
    return (
      <>
        {marketDataNav}
        {navBar}
        <CoinOrConverterSelector />
        <ConverterPage />
      </>
    );
  } else if (currentPage === "home") {
    return (
      <>
        {isViewingCoinPage === true ? (
          <>
            {marketDataNav}
            {navBar}
            <CoinPage />
          </>
        ) : (
          <>
            {marketDataNav}
            {navBar}
            <CoinOrConverterSelector />
            <ChartAndCarouselContainer />
            <HomeTableSection />
          </>
        )}
      </>
    );
  }
}
