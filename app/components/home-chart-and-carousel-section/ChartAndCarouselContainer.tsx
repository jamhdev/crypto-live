import React, { useContext, useEffect } from "react";
import HomeCarouselSection from "./HomeCarouselSection";
import HomeChartSection from "./HomeChartSection";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { getChartData, getCoinData } from "@/app/store/chartDataSlice";
import { AppContext } from "@/app/contexts/AppContext";

export default function ChartAndCarouselContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { currency } = useContext(AppContext);

  useEffect(() => {
    dispatch(getCoinData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChartData(currency));
  }, [dispatch]);

  return (
    <>
      <HomeCarouselSection />
      <HomeChartSection />
    </>
  );
}
