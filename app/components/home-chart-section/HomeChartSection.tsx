import { useEffect, useState } from "react";
import HomePriceChart from "./HomePriceChart";
import HomeVolumeChart from "./HomeVolumeChart";
import ChartDurationSelector from "./ChartDurationSelector";
import {
  coinDataPrices,
  coinDataPrices1dHourly,
  coindData,
} from "@/mock-api/mock-db";

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
    if (process && process.env.NODE_ENV === "development") {
      const getData = () =>
        new Promise<any>((resolve, reject) => {
          if (!coindData) {
            return setTimeout(
              () => reject(new Error("Market data not found")),
              250
            );
          }
          setTimeout(() => {
            resolve(coindData);
          }, 250);
        });

      getData()
        .then((result) => {
          setCurrentSelectedCoinData(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
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
    }
  }, []);

  useEffect(() => {
    if (process && process.env.NODE_ENV === "development") {
      const getData = () =>
        new Promise<any>((resolve, reject) => {
          if (!coinDataPrices) {
            return setTimeout(
              () => reject(new Error("Market data not found")),
              250
            );
          }
          setTimeout(() => {
            if (chartDurationSelector === "1D") {
              resolve(coinDataPrices1dHourly);
            } else {
              resolve(coinDataPrices);
            }
          }, 250);
        });

      getData()
        .then((result) => {
          setCurrentCoinDataPrices(result?.prices);
          setCurrentCoinDataTotalVolumes(result?.total_volumes);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
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
            break;
          case "14D":
            name = "bitcoin";
            currency = "usd";
            days = 14;
            break;
          case "1M":
            name = "bitcoin";
            currency = "usd";
            days = 30;
            break;
          case "1Y":
            name = "bitcoin";
            currency = "usd";
            days = 360;
            break;
        }
        return { name, currency, days, interval };
      };
      const fetchDetails = getFetchDetails();
      const fetchData = async () => {
        const proxyUrl = "https://corsproxy.io/?";
        const targetUrl = `https://api.coingecko.com/api/v3/coins/${fetchDetails.name}/market_chart?vs_currency=${fetchDetails.currency}&days=${fetchDetails.days}${fetchDetails.interval}`;
        try {
          console.log("fetching");
          const response = await fetch(proxyUrl + targetUrl);
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
    }
  }, [chartDurationSelector]);

  let durationFilteredData;
  if (process && process.env.NODE_ENV === "development") {
    durationFilteredData = setDurationFilteredCoinDataPrices(
      currentCoinDataPrices,
      currentCoinDataTotalVolumes,
      chartDurationSelector
    );
  } else {
    durationFilteredData = {
      prices: currentCoinDataPrices,
      volumes: currentCoinDataTotalVolumes,
    };
  }

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

const setDurationFilteredCoinDataPrices = (
  prices: [] | null,
  volumes: [] | null,
  durationSelector: durationOption
) => {
  switch (durationSelector) {
    case "1D":
      return {
        prices: prices,
        volumes: volumes,
      };

    case "7D":
      return {
        prices: prices?.filter((_, index: number) => index > 361 - 8),
        volumes: volumes?.filter((_, index: number) => index > 361 - 8),
      };
    case "14D":
      return {
        prices: prices?.filter((_, index: number) => index > 361 - 15),
        volumes: volumes?.filter((_, index: number) => index > 361 - 15),
      };
    case "1M":
      return {
        prices: prices?.filter((_, index: number) => index > 361 - 31),
        volumes: volumes?.filter((_, index: number) => index > 361 - 31),
      };
    case "1Y":
      return {
        prices: prices,
        volumes: volumes,
      };
    default:
      return {
        prices: prices?.filter((_, index: number) => index > 361 - 31),
        volumes: volumes?.filter((_, index: number) => index > 361 - 31),
      };
  }
};
