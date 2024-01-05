import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function HomeVolumeChart() {
  const [currentCoinData, setCurrentCoinData] = useState<[] | null>(null);

  const fetchData = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily"
    );
    if (!response.ok) {
      throw new Error("ERROR FETCHING");
    }
    const coinData = await response.json();
    setCurrentCoinData(coinData.total_volumes);
  };

  const coinVolume = currentCoinData?.map((value) => value[1]);
  const labels = currentCoinData?.map((value) => new Date(value[0]).getDate());

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Coin Volume",
        data: coinVolume,
        backgroundColor: "black",
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      y: { display: false },
      x: { grid: { display: false } },
    },
  };

  return (
    <>
      {currentCoinData ? (
        <div className="w-full flex justify-center items-center">
          <Bar
            data={data}
            options={options}
            className="bg-chartBackground p-2 rounded-xl"
          />
        </div>
      ) : (
        <button onClick={fetchData} className="bg-red-200 p-2 rounded-lg mt-10">
          FETCH DATA
        </button>
      )}
    </>
  );
}
