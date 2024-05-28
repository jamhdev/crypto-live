import React, { useContext } from "react";
import { formatPercentage } from "@/app/utils/numberFormatting";

import IncreaseValueIcon from "../../market-data-nav/IncreaseValueIcon.svg";
import IncreaseValueIconDarker from "../../market-data-nav/IncreaseValueIconDarker.svg";
import DecreaseValueIcon from "../../market-data-nav/DecreaseValueIcon.svg";
import { AppContext } from "@/app/contexts/AppContext";

export default function Column24HourItem({ value }: { value: number }) {
  const { theme, colors } = useContext(AppContext);

  const increaseColor =
    theme === "dark" ? colors.greenMain : colors.greenSecondary;
  const decreaseColor = colors.redMain;
  return (
    <div
      className="flex items-center p-4"
      style={
        value > 0
          ? {
              color: increaseColor,
            }
          : {
              color: decreaseColor,
            }
      }
    >
      {value > 0 ? (
        theme === "dark" ? (
          <IncreaseValueIcon />
        ) : (
          <IncreaseValueIconDarker />
        )
      ) : (
        <DecreaseValueIcon />
      )}
      <div>{formatPercentage(Math.abs(value))}</div>
    </div>
  );
}
