import { formatLargeNumber } from "@/app/utils/numberFormatting";
import React from "react";

export default function ColumnCirculatingSupplyItem({
  circulatingSupply,
  totalSupply,
  percentageBarCirculatingSupply,
  prices,
}: {
  circulatingSupply: number;
  totalSupply: number;
  percentageBarCirculatingSupply: string;
  prices: number[];
}) {
  const firstPrice = prices[0];
  const secondPrice = prices[prices.length - 1];

  const increasedValueColor = "#00f5e4";
  const decreasedValueColor = "#ff0061";
  return (
    <div>
      <div className="flex justify-between w-[200px] p-4">
        <div>{formatLargeNumber(circulatingSupply)}</div>
        <div>{formatLargeNumber(totalSupply)}</div>
      </div>
      <div className="bg-[rgb(0,0,0,0.25)] w-[200px] h-[6px] rounded-full relative flex flex-col">
        <div
          className={`h-full rounded-full absolute`}
          style={{
            maxWidth: "100%",
            width: percentageBarCirculatingSupply,
            backgroundColor:
              firstPrice < secondPrice
                ? increasedValueColor
                : decreasedValueColor,
          }}
        ></div>
      </div>
    </div>
  );
}
