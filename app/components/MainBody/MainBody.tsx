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
import ThumbNavigation from "../navigation/nav-bar-mobile/ThumbNavigation";

export default function MainBody() {
  const { isViewingCoinPage, currentPage, screenWidth } =
    useContext(AppContext);

  const marketDataNav =
    screenWidth > 830 ? <MarketDataNav /> : <MarketDataNavMobile />;
  const navBar = screenWidth > 934 ? <NavBar /> : <NavBarMobile />;
  const coinsOrConverterSelector =
    screenWidth > 934 ? <CoinOrConverterSelector /> : null;
  const thumbNavigation = screenWidth > 934 ? null : <ThumbNavigation />;

  if (currentPage === "portfolio") {
    return (
      <>
        {marketDataNav}
        {navBar}
        <PortfolioMain />
        {thumbNavigation}
      </>
    );
  } else if (currentPage === "converter") {
    return (
      <>
        {marketDataNav}
        {navBar}
        {coinsOrConverterSelector}
        <ConverterPage />
        {thumbNavigation}
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
            {thumbNavigation}
          </>
        ) : (
          <>
            {marketDataNav}
            {navBar}
            {coinsOrConverterSelector}
            <ChartAndCarouselContainer />
            <HomeTableSection />
            {thumbNavigation}
          </>
        )}
      </>
    );
  }
}
