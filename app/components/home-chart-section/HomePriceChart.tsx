import React, { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
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

  // Function to create gradient
  const createGradient = (ctx: any, chartArea: any) => {
    const gradientBg = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradientBg.addColorStop(0, "rgba(116, 116, 250, 1)");
    gradientBg.addColorStop(0.5, "rgba(116, 116, 250, 0.5)");
    gradientBg.addColorStop(1, "rgba(116, 116, 250, 0)");
    return gradientBg;
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Coin Prices",
        data: coinPrice,
        backgroundColor: (context: any) => {
          if (!context.chart.chartArea) {
            return;
          }
          return createGradient(context.chart.ctx, context.chart.chartArea);
        },
        pointBorderColor: "rgba(116, 116, 250)",
        borderColor: "rgba(116, 116, 250)",
        pointBackgroundColor: "rgba(116, 116, 250, 0.5)",
        tension: 0.4,
        borderWidth: 1,
        pointRadius: 2,
        pointBorderWidth: 0,
        hitRadius: 10,
        hoverBorderWidth: 3,
        fill: "origin",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
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
      <div className="bg-chartBackground p-4 rounded-xl flex flex-col">
        {currentCoinData ? (
          <>
            <div className="text-accent">Bitcoin(BTC)</div>
            <Line data={data} options={options} />
          </>
        ) : (
          <button
            onClick={fetchData}
            className="bg-red-200 p-2 rounded-lg mt-10"
          >
            FETCH PRICE DATA
          </button>
        )}
      </div>
    </>
  );
}
