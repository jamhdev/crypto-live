import { formatLargeNumber } from "@/app/utils/numberFormatting";
import React from "react";

export default function ColumnCirculatingSupplyItem({
  circulatingSupply,
  totalSupply,
  percentageBarCirculatingSupply,
}: {
  circulatingSupply: number;
  totalSupply: number;
  percentageBarCirculatingSupply: string;
}) {
  return (
    <div>
      <div className="flex justify-between w-[200px] p-4">
        <div>{formatLargeNumber(circulatingSupply)}</div>
        <div>{formatLargeNumber(totalSupply)}</div>
      </div>
      <div className="bg-[rgb(0,0,0,0.25)] w-[200px] h-[6px] rounded-full relative flex flex-col">
        <div
          className={`bg-[rgb(125,125,125)] h-full rounded-full absolute`}
          style={{
            maxWidth: "100%",
            width: percentageBarCirculatingSupply,
          }}
        ></div>
      </div>
    </div>
  );
}
