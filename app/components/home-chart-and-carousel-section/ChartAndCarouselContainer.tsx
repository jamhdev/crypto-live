import React, { useEffect } from "react";
import HomeCarouselSection from "./HomeCarouselSection";
import HomeChartSection from "./HomeChartSection";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { getChartData, getCoinData } from "@/app/store/chartDataSlice";

export default function ChartAndCarouselContainer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCoinData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChartData());
  }, [dispatch]);

  return (
    <>
      <HomeCarouselSection />
      <HomeChartSection />
    </>
  );
}
