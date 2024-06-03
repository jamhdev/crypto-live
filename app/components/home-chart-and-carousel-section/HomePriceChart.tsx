"use client";

import React, { useContext } from "react";
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
import { setAfterBuildTicks } from "./HomeChartSection";

export default function HomePriceChart({
  currentSelectedCoinData,
  durationFilteredCoinData,
}: {
  currentSelectedCoinData: any;
  durationFilteredCoinData: any;
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
    <>
      <div className="bg-chartBackground p-6 rounded-xl flex flex-col">
        {durationFilteredCoinData ? (
          <>
            <div className="text-themeTextColorSecondary">
              {currentSelectedCoinData?.name}(
              {currentSelectedCoinData?.symbol?.toUpperCase()})
            </div>
            <div className="font-bold text-themeTextColorThird text-2xl">
              {currencyFormat.format(
                currentSelectedCoinData?.market_data?.current_price[
                  currency.toLowerCase()
                ]
              )}
            </div>
            <Line data={data} options={options} />
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
      afterBuildTicks: setAfterBuildTicks,
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
