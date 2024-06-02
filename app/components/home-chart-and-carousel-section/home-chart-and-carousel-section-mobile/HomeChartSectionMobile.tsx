"use client";
import ChartDurationSelector from "../ChartDurationSelector";
import LoadingCircleLine from "@/public/LoadingCircleLineSvg.svg";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import HomePriceChartMobile from "./HomePriceChartMobile";
import HomeVolumeChartMobile from "./HomeVolumeChartMobile";
import ChartDurationSelectorMobile from "./ChartDurationSelectorMobile";

export default function HomeChartSectionMobile() {
  const { chartData, coinData, isLoading, error } = useSelector(
    (state: RootState) => state.homeChartData
  );
  const [isPriceChart, setIsPriceChart] = useState<boolean>(true);

  if (isLoading)
    return (
      <div className="flex text-white justify-center items-center gap-10 bg-none w-full rounded-bl-md rounded-br-md relative p-10">
        <div className="bg-primary flex justify-center items-center pt-2 pb-2 pl-4 pr-4 rounded-xl h-[392px] w-full">
          <LoadingCircleLine />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex text-white justify-center items-center gap-10 bg-none w-full rounded-bl-md rounded-br-md relative p-10">
        <div className="bg-primary flex justify-center items-center pt-2 pb-2 pl-4 pr-4 rounded-xl h-[392px] w-full">
          <div className="text-themeTextColorThird text-2xl font-medium">
            Error loading chart data
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="p-10 w-full flex justify-center items-center">
        {isPriceChart ? (
          <div className="w-full">
            <HomePriceChartMobile
              setIsPriceChart={setIsPriceChart}
              currentSelectedCoinData={coinData}
              durationFilteredCoinData={chartData.prices}
            />
          </div>
        ) : (
          <div className="w-full">
            <HomeVolumeChartMobile
              setIsPriceChart={setIsPriceChart}
              currentSelectedCoinData={coinData}
              durationFilteredCoinData={chartData.total_volumes}
            />
          </div>
        )}
      </div>
      <ChartDurationSelectorMobile />
    </>
  );
}
