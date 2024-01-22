import { useEffect, useState } from "react";
import HomePriceChart from "./HomePriceChart";
import HomeVolumeChart from "./HomeVolumeChart";
import ChartDurationSelector from "./ChartDurationSelector";

export default function HomeChartSection() {
  const [currentSelectedCoinData, setCurrentSelectedCoinData] = useState(null);
  const [chartDurationSelector, setChartDurationSelector] =
    useState<durationOption>("1M");
  const [currentCoinDataPrices, setCurrentCoinDataPrices] = useState<[] | null>(
    null
  );
  const [currentCoinDataTotalVolumes, setCurrentCoinDataTotalVolumes] =
    useState<[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin"
        );
        if (!response.ok) {
          throw new Error("ERROR FETCHING");
        }
        const data = await response.json();
        setCurrentSelectedCoinData(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching");
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily`
        );
        if (!response.ok) {
          throw new Error("ERROR FETCHING");
        }
        const coinData = await response.json();
        setCurrentCoinDataPrices(coinData?.prices);
        setCurrentCoinDataTotalVolumes(coinData?.total_volumes);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchData();
  }, []);

  const setDurationFilteredCoinDataPrices = () => {
    switch (chartDurationSelector) {
      case "1D":
        return {
          prices: currentCoinDataPrices?.filter((_, index) => index < 2),
          volumes: currentCoinDataTotalVolumes?.filter((_, index) => index < 1),
        };

      case "7D":
        return {
          prices: currentCoinDataPrices?.filter((_, index) => index < 7),
          volumes: currentCoinDataTotalVolumes?.filter((_, index) => index < 7),
        };
      case "14D":
        return {
          prices: currentCoinDataPrices?.filter((_, index) => index < 14),
          volumes: currentCoinDataTotalVolumes?.filter(
            (_, index) => index < 14
          ),
        };
      case "1M":
        return {
          prices: currentCoinDataPrices?.filter((_, index) => index < 30),
          volumes: currentCoinDataTotalVolumes?.filter(
            (_, index) => index < 30
          ),
        };
      case "1Y":
        return {
          prices: currentCoinDataPrices,
          volumes: currentCoinDataTotalVolumes,
        };
      default:
        return {
          prices: currentCoinDataPrices?.filter((_, index) => index < 30),
          volumes: currentCoinDataTotalVolumes?.filter(
            (_, index) => index < 30
          ),
        };
    }
  };

  const durationFilteredData = setDurationFilteredCoinDataPrices();

  return (
    <>
      <div className="p-10 w-full flex justify-center items-center gap-4">
        <div className="w-1/2">
          <HomePriceChart
            currentSelectedCoinData={currentSelectedCoinData}
            durationFilteredCoinData={durationFilteredData.prices}
          />
        </div>

        <div className="w-1/2">
          <HomeVolumeChart
            currentSelectedCoinData={currentSelectedCoinData}
            durationFilteredCoinData={durationFilteredData.volumes}
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
