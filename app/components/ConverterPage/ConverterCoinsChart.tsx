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
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { AppContext } from "@/app/contexts/AppContext";
import { currencyFormat } from "@/app/utils/numberFormatting";

export default function ConverterCoinsChart({
  firstCoinData,
  secondCoinData,
  firstCoinChartData,
  secondCoinChartData,
}: {
  firstCoinData: any;
  secondCoinData: any;
  firstCoinChartData: any;
  secondCoinChartData: any;
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
  const { currencyFormat } = useContext(AppContext);

  const firstCoinPrice = firstCoinChartData?.prices?.map(
    (value: number[]) => value[1]
  );
  const labels = firstCoinChartData?.prices?.map((value: number[]) =>
    new Date(value[0]).toLocaleDateString(undefined, {
      month: "numeric",
      day: "numeric",
    })
  );

  const secondCoinPrice = secondCoinChartData?.prices?.map(
    (value: number[]) => value[1]
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: firstCoinData?.name,
        data: firstCoinPrice,
        backgroundColor: (context: any) => {
          if (!context.chart.chartArea) {
            return;
          }
          return createGradientBlue(context.chart.ctx, context.chart.chartArea);
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
        yAxisID: "y",
      },
      {
        label: secondCoinData?.name,
        data: secondCoinPrice,
        backgroundColor: (context: any) => {
          if (!context.chart.chartArea) {
            return;
          }
          return createGradientRed(context.chart.ctx, context.chart.chartArea);
        },
        pointBorderColor: "rgba(255, 99, 132)",
        borderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
        borderWidth: 1,
        pointRadius: 0,
        pointBorderWidth: 0,
        hitRadius: 20,
        hoverBorderWidth: 3,
        fill: "origin",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col w-full h-[300px] p-4 pb-10">
        {firstCoinChartData ? (
          <>
            <div className="flex gap-4">
              <div>
                <div className="text-accent">
                  {firstCoinData?.name}({firstCoinData?.symbol?.toUpperCase()})
                  and {secondCoinData?.name}(
                  {secondCoinData?.symbol?.toUpperCase()})
                </div>
              </div>
              <div>
                <div className="text-accent"></div>
              </div>
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
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      mode: "index" as const,
      intersect: false,
      callbacks: {
        label: function (tooltipItem: TooltipItem<"line">) {
          return `${tooltipItem.dataset.label}: ${currencyFormat.format(
            tooltipItem.parsed.y
          )}`;
        },
      },
    },
  },
  scales: {
    y: {
      display: false,
      beginAtZero: false,
    },
    y1: { display: false, beginAtZero: false },
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
};

const createGradientBlue = (ctx: any, chartArea: any) => {
  const gradientBlue = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  gradientBlue.addColorStop(0, "rgba(116, 116, 250, 0)");
  gradientBlue.addColorStop(0.5, "rgba(116, 116, 250, 0.5)");
  gradientBlue.addColorStop(1, "rgba(116, 116, 250, 1)");
  return gradientBlue;
};

const createGradientRed = (ctx: any, chartArea: any) => {
  const gradientRed = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  gradientRed.addColorStop(0, "rgba(255, 99, 132, 0)");
  gradientRed.addColorStop(0.5, "rgba(255, 99, 132, 0.5)");
  gradientRed.addColorStop(1, "rgba(255, 99, 132, 1)");
  return gradientRed;
};
