import React, { useContext, useEffect } from "react";
import HomeCarouselSection from "./HomeCarouselSection";
import HomeChartSection from "./HomeChartSection";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { getChartData, getCoinData } from "@/app/store/chartDataSlice";
import { AppContext } from "@/app/contexts/AppContext";
import HomeCarouselSectionMobile from "./home-chart-and-carousel-section-mobile/HomeCarouselSectionMobile";
import HomeChartSectionMobile from "./home-chart-and-carousel-section-mobile/HomeChartSectionMobile";

export default function ChartAndCarouselContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { currency, screenWidth } = useContext(AppContext);

  useEffect(() => {
    dispatch(getCoinData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChartData(currency));
  }, [dispatch]);

  const carouselSection =
    screenWidth > 934 ? <HomeCarouselSection /> : <HomeCarouselSectionMobile />;
  const chartSection =
    screenWidth > 934 ? <HomeChartSection /> : <HomeChartSectionMobile />;

  return (
    <>
      {carouselSection}
      {chartSection}
    </>
  );
}
