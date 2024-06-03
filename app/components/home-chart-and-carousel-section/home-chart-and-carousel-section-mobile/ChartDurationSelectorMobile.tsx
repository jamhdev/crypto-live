"use client";
import { AppContext } from "@/app/contexts/AppContext";
import {
  getChartDataOnDurationChange,
  setDurationSelector,
} from "@/app/store/chartDataSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChartDurationSelectorMobile() {
  const { theme, currency } = useContext(AppContext);
  const dispatch = useDispatch<AppDispatch>();
  const chartDurationSelector = useSelector(
    (state: RootState) => state.chartData.durationSelector
  );

  const sortOptions: durationOption[] = ["1D", "7D", "14D", "1M", "1Y"];
  const defaultStyles =
    theme === "dark"
      ? "text-[#A7A7CC] px-2 py-1 rounded-lg cursor-pointer"
      : "px-2 py-1 rounded-lg cursor-pointer";
  const selectedStyles = `px-2 py-1 rounded-lg cursor-pointer bg-highlightColor font-medium text-themeTextColorThird`;

  return (
    <div className="flex text-themeTextColor">
      <div className="bg-chartDurationBackgroundColor flex gap-4 sm:gap-10 rounded-lg p-1 m-auto md:m-0">
        {sortOptions.map((value) => (
          <div
            key={value}
            className={
              chartDurationSelector === value
                ? "bg-gradient-to-b from-selectedGradient to-transparent p-[1px] rounded-lg"
                : ""
            }
          >
            <div
              className={
                chartDurationSelector === value ? selectedStyles : defaultStyles
              }
              onClick={() => {
                dispatch(setDurationSelector(value));
                dispatch(getChartDataOnDurationChange(currency));
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
