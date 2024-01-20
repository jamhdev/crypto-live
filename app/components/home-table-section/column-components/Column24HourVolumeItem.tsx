import { formatLargeNumber } from "@/app/utils/numberFormatting";
import React from "react";

export default function Column24HourVolumeItem({
  volume,
  marketCap,
  percentageBar24HVolume,
}: {
  volume: number;
  marketCap: number;
  percentageBar24HVolume: string;
}) {
  return (
    <div>
      <div className="flex justify-between w-[200px] p-4">
        <div>{formatLargeNumber(volume)}</div>
        <div>{formatLargeNumber(marketCap)}</div>
      </div>
      <div className="bg-[rgb(0,0,0,0.25)] w-[200px] h-[6px] rounded-full relative flex flex-col">
        <div
          className={`bg-[rgb(125,125,125)] h-full rounded-full absolute`}
          style={{ maxWidth: "100%", width: percentageBar24HVolume }}
        ></div>
      </div>
    </div>
  );
}
