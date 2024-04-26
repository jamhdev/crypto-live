"use client";
import React from "react";

export default function ConverterChartDurationSelector({
  converterChartDurationSelector,
  setConverterChartDurationSelector,
}: any) {
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

const sortOptions: durationOption[] = ["1D", "7D", "14D", "1M", "1Y"];
const defaultStyles = "px-4 py-2 rounded-lg cursor-pointer";
const selectedStyles = `${defaultStyles} bg-accent shadow-[inset_0_0_5px_rgb(0,0,0,0.3)]`;
