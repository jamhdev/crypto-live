import { useEffect, useState } from "react";
import HomePriceChart from "./HomePriceChart";
import HomeVolumeChart from "./HomeVolumeChart";

export default function HomeChartSection() {
  const [currentSelectedCoinData, setCurrentSelectedCoinData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin"
      );
      if (!response.ok) {
        throw new Error("ERROR FETCHING");
      }
      const data = await response.json();
      setCurrentSelectedCoinData(data);
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="pt-4 w-full flex justify-center items-center flex-col">
        <div className="w-full flex pr-10 pl-10 justify-center items-center">
          <div className="m-4 w-1/2">
            <HomePriceChart currentSelectedCoinData={currentSelectedCoinData} />
          </div>

          <div className="m-4 w-1/2">
            <HomeVolumeChart
              currentSelectedCoinData={currentSelectedCoinData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
