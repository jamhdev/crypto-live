import React, { useContext, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AppContext } from "@/app/contexts/AppContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function HomeVolumeChart({ currentSelectedCoinData }: any) {
  const [currentCoinData, setCurrentCoinData] = useState<[] | null>(null);
  const { currencyFormat } = useContext(AppContext);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily"
      );
      if (!response.ok) {
        throw new Error("ERROR FETCHING");
      }
      const coinData = await response.json();
      setCurrentCoinData(coinData.total_volumes);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const coinVolume = currentCoinData?.map((value) => value[1]);
  const labels = currentCoinData?.map((value) =>
    new Date(value[0]).toLocaleDateString(undefined, {
      month: "numeric",
      day: "numeric",
    })
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Coin Volume",
        data: coinVolume,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }
          return createGradient(ctx, chartArea);
        },
      },
    ],
  };

  return (
    <>
      <div className="bg-chartBackground pt-2 pb-2 pl-4 pr-4 rounded-xl flex flex-col">
        {currentCoinData ? (
          <>
            <div className="text-accent">volume</div>
            <div className="text-accent font-extrabold text-2xl">
              {currencyFormat.format(
                currentSelectedCoinData.market_data.total_volume.usd
              )}
            </div>
            <Bar data={data} options={options} />
          </>
        ) : (
          <button
            onClick={fetchData}
            className="bg-red-200 p-2 rounded-lg mt-10"
          >
            FETCH VOLUME DATA
          </button>
        )}
      </div>
    </>
  );
}

const options = {
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    y: { display: false },
    x: { grid: { display: false } },
  },
};

// Function to create gradient
const createGradient = (ctx: any, chartArea: any) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );

  gradient.addColorStop(0, "rgba(190, 113, 250, 0)");
  gradient.addColorStop(0.3, "rgba(190, 113, 250, 0.5)");
  gradient.addColorStop(1, "rgba(190, 113, 250, 1)");

  return gradient;
};
