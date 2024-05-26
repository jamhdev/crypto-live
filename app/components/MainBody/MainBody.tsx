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

export default function MainBody() {
  const { isViewingCoinPage } = useContext(AppContext);
  const { currentPage } = useContext(AppContext);

  if (currentPage === "portfolio") {
    return (
      <>
        <MarketDataNav />
        <NavBar />
        <PortfolioMain />
      </>
    );
  } else if (currentPage === "converter") {
    return (
      <>
        <MarketDataNav />
        <NavBar />
        <CoinOrConverterSelector />
        <ConverterPage />
      </>
    );
  } else if (currentPage === "home") {
    return (
      <>
        {isViewingCoinPage === true ? (
          <>
            <MarketDataNav />
            <NavBar />
            <CoinPage />
          </>
        ) : (
          <>
            <MarketDataNav />
            <NavBar />
            <CoinOrConverterSelector />
            <ChartAndCarouselContainer />
            <HomeTableSection />
          </>
        )}
      </>
    );
  }
}
