import React, { useContext } from "react";
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

export default function HomeVolumeChart({
  currentSelectedCoinData,
  durationFilteredCoinData,
}: {
  currentSelectedCoinData: any;
  durationFilteredCoinData: any;
}) {
  const { currencyFormat } = useContext(AppContext);

  const coinVolume = durationFilteredCoinData?.map(
    (value: number[]) => value[1]
  );
  const labels = durationFilteredCoinData?.map((value: number[]) =>
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
        {durationFilteredCoinData ? (
          <>
            <div className="text-accent">volume</div>
            <div className="text-accent font-extrabold text-2xl">
              {currencyFormat.format(
                currentSelectedCoinData?.market_data.total_volume?.usd
              )}
            </div>
            <Bar data={data} options={options} />
          </>
        ) : (
          <div>Loading...</div>
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
