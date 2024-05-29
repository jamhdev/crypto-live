"use client";
import HomePriceChart from "./HomePriceChart";
import HomeVolumeChart from "./HomeVolumeChart";
import ChartDurationSelector from "./ChartDurationSelector";
import LoadingCircleLine from "@/public/LoadingCircleLineSvg.svg";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export default function HomeChartSection() {
  const { chartData, coinData, isLoading, error } = useSelector(
    (state: RootState) => state.homeChartData
  );

  if (isLoading)
    return (
      <div className="flex text-white justify-center items-center gap-10 bg-none w-full rounded-bl-md rounded-br-md relative p-10">
        <div className="bg-primary flex justify-center items-center pt-2 pb-2 pl-4 pr-4 rounded-xl basis-1/2 h-[392px]">
          <LoadingCircleLine />
        </div>
        <div className="bg-primary flex justify-center items-center pt-2 pb-2 pl-4 pr-4 rounded-xl basis-1/2 h-[392px]">
          <LoadingCircleLine />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex text-white justify-center items-center gap-10 bg-none w-full rounded-bl-md rounded-br-md relative p-10">
        <div className="bg-primary flex justify-center items-center pt-2 pb-2 pl-4 pr-4 rounded-xl basis-1/2 h-[392px]">
          <div className="text-themeTextColorThird text-2xl font-medium">
            Error loading chart data
          </div>
        </div>
        <div className="bg-primary flex justify-center items-center pt-2 pb-2 pl-4 pr-4 rounded-xl basis-1/2 h-[392px]">
          <div className="text-themeTextColorThird text-2xl font-medium">
            Error loading chart data
          </div>
        </div>
      </div>
    );

  return (
    <>
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
        <ChartDurationSelector />
      </>
    </>
  );
}
