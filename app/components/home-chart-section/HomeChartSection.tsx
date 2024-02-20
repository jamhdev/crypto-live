"use client";
import { useEffect, useState } from "react";
import HomePriceChart from "./HomePriceChart";
import HomeVolumeChart from "./HomeVolumeChart";
import ChartDurationSelector from "./ChartDurationSelector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { getChartData, getCoinData } from "@/app/store/chartDataSlice";
import LoadingCircleLine from "@/public/LoadingCircleLineSvg.svg";

export default function HomeChartSection() {
  const [chartDurationSelector, setChartDurationSelector] =
    useState<durationOption>("1M");

  const { chartData, coinData, isLoading, error } = useSelector(
    (state: RootState) => state.homeChartData
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCoinData());
  }, [dispatch]);

  useEffect(() => {
    const getFetchDetails = () => {
      let name;
      let currency;
      let days;
      let interval = "&interval=daily";
      switch (chartDurationSelector) {
        case "1D":
          name = "bitcoin";
          currency = "usd";
          days = 1;
          interval = "";
          break;
        case "7D":
          name = "bitcoin";
          currency = "usd";
          days = 7;
          interval = "";
          break;
        case "14D":
          name = "bitcoin";
          currency = "usd";
          days = 14;
          interval = "";
          break;
        case "1M":
          name = "bitcoin";
          currency = "usd";
          days = 30;
          interval = "";
          break;
        case "1Y":
          name = "bitcoin";
          currency = "usd";
          days = 360;
          interval = "";
          break;
      }
      return { name, currency, days, interval };
    };
    dispatch(getChartData(getFetchDetails()));
  }, [chartDurationSelector, dispatch]);

  if (isLoading)
    return (
      <div className="flex text-white justify-center items-center gap-10 bg-accent w-full p-4 rounded-bl-md rounded-br-md relative">
        <LoadingCircleLine />
      </div>
    );
  if (error)
    return (
      <div className="flex text-white justify-center items-center gap-10 bg-accent w-full p-4 rounded-bl-md rounded-br-md relative">
        <div>Error loading Chart data</div>
      </div>
    );

  return (
    <>
      <div className="p-10 w-full flex justify-center items-center gap-4">
        <div className="w-1/2">
          <HomePriceChart
            currentSelectedCoinData={coinData}
            durationFilteredCoinData={chartData.prices}
          />
        </div>

        <div className="w-1/2">
          <HomeVolumeChart
            currentSelectedCoinData={coinData}
            durationFilteredCoinData={chartData.total_volumes}
          />
        </div>
      </div>
      <ChartDurationSelector
        chartDurationSelector={chartDurationSelector}
        setChartDurationSelector={setChartDurationSelector}
      />
    </>
  );
}
