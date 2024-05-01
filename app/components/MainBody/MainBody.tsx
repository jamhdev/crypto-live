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

export default function MainBody() {
  const { isViewingCoinPage, setIsViewingCoinPage, coinsOrConverterSelector } =
    useContext(AppContext);

  if (coinsOrConverterSelector === "converter") {
    return (
      <>
        <MarketDataNav />
        <NavBar />
        <CoinOrConverterSelector />
        <ConverterPage />
      </>
    );
  }

  return (
    <>
      {isViewingCoinPage === true ? (
        <>
          s
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
