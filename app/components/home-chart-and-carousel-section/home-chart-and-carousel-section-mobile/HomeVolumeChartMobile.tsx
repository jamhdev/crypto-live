import React, { SetStateAction, useContext } from "react";
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

export default function HomeVolumeChartMobile({
  currentSelectedCoinData,
  durationFilteredCoinData,
  setIsPriceChart,
}: {
  currentSelectedCoinData: any;
  durationFilteredCoinData: any;
  setIsPriceChart: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { currencyFormat, theme, currency } = useContext(AppContext);

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
    <div
      className="p-4 rounded-xl flex flex-col"
      style={
        theme === "dark"
          ? { backgroundColor: "#1e1932" }
          : { backgroundColor: "white" }
      }
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-0 sm:gap-4">
          <div className="text-themeTextColorThird">volume</div>
          <div className="font-bold text-themeTextColorThird sm:text-xl">
            {currencyFormat.format(
              currentSelectedCoinData?.market_data?.total_volume[
                currency.toLowerCase()
              ]
            )}
          </div>
        </div>
        <button
          className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-b from-selectedGradient to-highlightColor p-[1px] rounded-full flex justify-center items-center transition-all right-0 z-10 top-0 hover:scale-110"
          onClick={() => {
            setIsPriceChart((prev) => !prev);
          }}
        >
          <div className="bg-highlightColor w-full h-full rounded-full flex justify-center items-center text-white text-center">
            &gt;
          </div>
        </button>
      </div>

      {durationFilteredCoinData ? (
        <>
          <Bar data={data} options={options} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

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
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
        color: "#8D8DB1",
        maxTicksLimit: 8,
        align: "inner" as const,
      },
      border: {
        display: true,
      },
      afterBuildTicks: function (axis: any) {
        const ticks = axis.ticks;
        if (ticks.length > 8) {
          const newTicks = [];
          const tickCount = 8;
          const step = Math.floor(ticks.length / (tickCount - 1));
          for (let i = 0; i < tickCount; i++) {
            const index = i === tickCount - 1 ? ticks.length - 1 : i * step;
            newTicks.push(ticks[index]);
          }
          axis.ticks = newTicks;
        }
      },
    },
    y: {
      display: false,
    },
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
  gradient.addColorStop(0.3, "rgba(190, 113, 250, 0.6)");
  gradient.addColorStop(1, "rgba(190, 113, 250, 1)");

  return gradient;
};
