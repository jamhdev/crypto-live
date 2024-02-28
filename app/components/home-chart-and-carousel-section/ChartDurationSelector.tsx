"use client";
import React from "react";

export default function ChartDurationSelector({
  chartDurationSelector,
  setChartDurationSelector,
}: {
  chartDurationSelector: string;
  setChartDurationSelector: React.Dispatch<
    React.SetStateAction<durationOption>
  >;
}) {
  return (
    <div className="flex justify-start px-10 self-start text-themeTextColor m-auto md:m-0">
      <div className="bg-primary flex gap-10 rounded-lg p-1">
        {sortOptions.map((value) => (
          <div
            key={value}
            className={
              chartDurationSelector === value ? selectedStyles : defaultStyles
            }
            onClick={() => {
              setChartDurationSelector(value);
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

const sortOptions: durationOption[] = ["1D", "7D", "14D", "1M", "1Y"];
const defaultStyles = "px-4 py-2 rounded-lg cursor-pointer";
const selectedStyles = `${defaultStyles} bg-accent shadow-[inset_0_0_5px_rgb(0,0,0,0.3)]`;
