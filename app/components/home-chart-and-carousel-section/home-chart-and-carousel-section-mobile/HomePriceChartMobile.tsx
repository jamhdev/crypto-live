"use client";

import React, { SetStateAction, useContext } from "react";
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
import { AppContext } from "@/app/contexts/AppContext";

export default function HomePriceChartMobile({
  currentSelectedCoinData,
  durationFilteredCoinData,
  setIsPriceChart,
}: {
  currentSelectedCoinData: any;
  durationFilteredCoinData: any;
  setIsPriceChart: React.Dispatch<SetStateAction<boolean>>;
}) {
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler
  );
  const { currencyFormat, theme, currency } = useContext(AppContext);

  const coinPrice = durationFilteredCoinData?.map(
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
        pointRadius: 0,
        pointBorderWidth: 0,
        hitRadius: 20,
        hoverBorderWidth: 3,
        fill: "origin",
      },
    ],
  };

  return (
    <div className="bg-chartBackground p-4 rounded-xl flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-0 sm:gap-4">
          <div className="text-themeTextColorSecondary">
            {currentSelectedCoinData?.name}(
            {currentSelectedCoinData?.symbol?.toUpperCase()})
          </div>
          <div className="font-bold text-themeTextColorThird sm:text-xl">
            {currencyFormat.format(
              currentSelectedCoinData?.market_data?.current_price[
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
          <Line data={data} options={options} />
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
  const gradientBg = ctx.createLinearGradient(
    0,
    chartArea.top,
    0,
    chartArea.bottom
  );
  gradientBg.addColorStop(0, "rgba(116, 116, 250, 1)");
  gradientBg.addColorStop(0.5, "rgba(116, 116, 250, 0.6)");
  gradientBg.addColorStop(1, "rgba(116, 116, 250, 0)");
  return gradientBg;
};
