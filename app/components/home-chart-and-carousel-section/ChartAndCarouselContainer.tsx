import React, { useEffect, useState } from "react";
import HomeCarouselSection from "./HomeCarouselSection";
import HomeChartSection from "./HomeChartSection";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { getChartData, getCoinData } from "@/app/store/chartDataSlice";

export default function ChartAndCarouselContainer() {
  const [chartDurationSelector, setChartDurationSelector] =
    useState<durationOption>("1M");
  const [coinSelected, setCoinSelected] = useState<string>("bitcoin");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCoinData(coinSelected));
  }, [dispatch, coinSelected]);

  useEffect(() => {
    const getFetchDetails = () => {
      let name;
      let currency;
      let days;
      let interval = "&interval=daily";
      switch (chartDurationSelector) {
        case "1D":
          name = coinSelected;
          currency = "usd";
          days = 1;
          interval = "";
          break;
        case "7D":
          name = coinSelected;
          currency = "usd";
          days = 7;
          interval = "";
          break;
        case "14D":
          name = coinSelected;
          currency = "usd";
          days = 14;
          interval = "";
          break;
        case "1M":
          name = coinSelected;
          currency = "usd";
          days = 30;
          interval = "";
          break;
        case "1Y":
          name = coinSelected;
          currency = "usd";
          days = 360;
          interval = "";
          break;
      }
      return { name, currency, days, interval };
    };
    dispatch(getChartData(getFetchDetails()));
  }, [chartDurationSelector, dispatch, coinSelected]);
  return (
    <>
      <HomeCarouselSection
        coinSelected={coinSelected}
        setCoinSelected={setCoinSelected}
      />
      <HomeChartSection
        chartDurationSelector={chartDurationSelector}
        setChartDurationSelector={setChartDurationSelector}
      />
    </>
  );
}
