import { AppContext } from "@/app/contexts/AppContext";
import { formatLargeNumber } from "@/app/utils/numberFormatting";
import React, { useContext } from "react";
import ColoredDot from "../ColoredDot";

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
  const { theme, colors } = useContext(AppContext);
  const increaseColor =
    theme === "dark" ? colors.greenMain : colors.greenSecondary;
  const decreaseColor = colors.redMain;

  const firstPrice = prices[0];
  const secondPrice = prices[prices.length - 1];

  const firstDot =
    firstPrice < secondPrice ? (
      <ColoredDot
        color={theme === "dark" ? colors.greenMain : colors.greenSecondary}
      />
    ) : (
      <ColoredDot color={colors.redMain} />
    );

  const secondDot =
    firstPrice < secondPrice ? (
      <ColoredDot color={"#afe5e5"} />
    ) : (
      <ColoredDot color={"#fbbad1"} />
    );

  return (
    <div>
      <div
        className="flex justify-between w-[200px] "
        style={{
          color: firstPrice < secondPrice ? increaseColor : decreaseColor,
        }}
      >
        <div className="flex gap-1 justify-center items-center">
          <div>{firstDot}</div>
          <div>${formatLargeNumber(circulatingSupply)}</div>
        </div>
        <div className="text-themeTextColorThird flex gap-1 justify-center items-center">
          <div>{secondDot}</div>
          <div>${formatLargeNumber(totalSupply)}</div>
        </div>
      </div>
      <div
        className="w-[200px] h-[6px] rounded-full relative flex flex-col"
        style={
          theme === "dark"
            ? {
                backgroundColor:
                  firstPrice < secondPrice
                    ? "rgb(175, 229, 229,0.5)"
                    : "rgb(138, 106, 124,0.7)",
              }
            : {
                backgroundColor:
                  firstPrice < secondPrice ? "#AFE5E5" : "#FBBAD1",
              }
        }
      >
        <div
          className={`h-full rounded-full absolute`}
          style={{
            maxWidth: "100%",
            width: percentageBarCirculatingSupply,
            backgroundColor:
              firstPrice < secondPrice ? increaseColor : decreaseColor,
          }}
        ></div>
      </div>
    </div>
  );
}
