import React, { useContext, useState } from "react";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //x axis
  LinearScale, //y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

export default function HomePriceChart() {
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler
  );

  const [currentCoinData, setCurrentCoinData] = useState<[] | null>(null);

  const fetchData = async () => {
    console.log("fetching");
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily"
    );
    if (!response.ok) {
      throw new Error("ERROR FETCHING");
    }
    const coinData = await response.json();
    setCurrentCoinData(coinData?.prices);
  };

  const coinPrice = currentCoinData?.map((value) => value[1]);
  const labels = currentCoinData?.map((value) => new Date(value[0]).getDate());

  const minPrice = Math.min(...(coinPrice || []));
  const maxPrice = Math.max(...(coinPrice || []));

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Coin Prices",
        data: coinPrice,
        // backgroundColor: "black",
        backgroundColor: (context) => {
          const bgColor = [
            "rgba(255, 26, 104, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(0, 0, 0, 0.2)",
          ];

          console.log(context);
        },
        pointBorderColor: "red",
        borderColor: "blue",
        tension: 0.4,
        borderWidth: 1,
        pointRadius: 0,
        pointBorderWidth: 0,
        hitRadius: 10,
        hoverBorderWidth: 3,
        showLine: true,
        fill: {
          target: "origin",
          above: "black",
          below: "pink",
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      y: {
        // min: minPrice,
        // max: maxPrice,
        display: false,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <Line
        data={data}
        options={options}
        className="bg-chartBackground p-2 rounded-xl"
      />
      {currentCoinData !== null ? (
        false
      ) : (
        <button onClick={fetchData} className="bg-red-200 p-2 rounded-lg mt-10">
          FETCH DATA
        </button>
      )}
    </>
  );
}
