"use client";
import HomePriceChart from "./HomePriceChart";
import HomeVolumeChart from "./HomeVolumeChart";
import ChartDurationSelector from "./ChartDurationSelector";
import LoadingCircleLine from "@/public/LoadingCircleLineSvg.svg";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export default function HomeChartSection({
  chartDurationSelector,
  setChartDurationSelector,
}: {
  chartDurationSelector: any;
  setChartDurationSelector: any;
}) {
  const { chartData, coinData, isLoading, error } = useSelector(
    (state: RootState) => state.homeChartData
  );

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
