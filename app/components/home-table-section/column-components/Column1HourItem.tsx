import { formatPercentage } from "@/app/utils/numberFormatting";
import React from "react";

import IncreaseValueIcon from "../../market-data-nav/IncreaseValueIcon.svg";
import DecreaseValueIcon from "../../market-data-nav/DecreaseValueIcon.svg";

export default function Column1HourItem({ value }: { value: number }) {
  return (
    <div
      className={`${
        value > 0 ? "text-[#00F5E4]" : "text-[#FF0061]"
      } flex items-center p-4`}
    >
      {value > 0 ? <IncreaseValueIcon /> : <DecreaseValueIcon />}
      <div>{formatPercentage(Math.abs(value))}</div>
    </div>
  );
}
