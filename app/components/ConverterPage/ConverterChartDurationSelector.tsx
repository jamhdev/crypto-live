"use client";
import { AppContext } from "@/app/contexts/AppContext";
import React, { useContext } from "react";

export default function ConverterChartDurationSelector({
  converterChartDurationSelector,
  setConverterChartDurationSelector,
}: {
  converterChartDurationSelector: durationOption;
  setConverterChartDurationSelector: React.Dispatch<
    React.SetStateAction<durationOption>
  >;
}) {
  const { theme } = useContext(AppContext);
  const sortOptions: durationOption[] = ["1D", "7D", "14D", "1M", "1Y"];
  const defaultStyles =
    theme === "dark"
      ? "text-[#A7A7CC] px-4 py-2 rounded-lg cursor-pointer"
      : "px-4 py-2 rounded-lg cursor-pointer";
  const selectedStyles = `px-4 py-2 rounded-lg cursor-pointer bg-highlightColor shadow-[inset_0_0_5px_rgb(0,0,0,0.3)] font-medium text-themeTextColorThird`;
  return (
    <div className="flex justify-start self-end text-themeTextColor m-auto md:m-0 absolute top-0">
      <div className="bg-chartBackground flex gap-10 rounded-lg p-1 ">
        {sortOptions.map((value) => (
          <div
            key={value}
            className={
              converterChartDurationSelector === value
                ? selectedStyles
                : defaultStyles
            }
            onClick={() => {
              setConverterChartDurationSelector(value);
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}
