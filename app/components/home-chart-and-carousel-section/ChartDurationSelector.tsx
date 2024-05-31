"use client";
import { AppContext } from "@/app/contexts/AppContext";
import {
  getChartDataOnDurationChange,
  setDurationSelector,
} from "@/app/store/chartDataSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChartDurationSelector() {
  const { theme, currency } = useContext(AppContext);
  const dispatch = useDispatch<AppDispatch>();
  const chartDurationSelector = useSelector(
    (state: RootState) => state.chartData.durationSelector
  );

  const sortOptions: durationOption[] = ["1D", "7D", "14D", "1M", "1Y"];
  const defaultStyles =
    theme === "dark"
      ? "text-[#A7A7CC] px-4 py-2 rounded-lg cursor-pointer"
      : "px-4 py-2 rounded-lg cursor-pointer";
  const selectedStyles = `px-4 py-2 rounded-lg cursor-pointer bg-highlightColor font-medium text-themeTextColorThird`;

  return (
    <div className="flex justify-start px-10 self-start text-themeTextColor m-auto md:m-0">
      <div className="bg-chartDurationBackgroundColor flex gap-10 rounded-lg p-1">
        {sortOptions.map((value) => (
          <div
            key={value}
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
        ))}
      </div>
    </div>
  );
}
