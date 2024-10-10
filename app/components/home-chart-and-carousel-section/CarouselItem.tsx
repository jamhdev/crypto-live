import React, { useContext } from "react";
import { formatPercentage } from "@/app/utils/numberFormatting";
import { useDispatch, useSelector } from "react-redux";
import {
  getChartData,
  getCoinData,
  setCoinSelected,
} from "@/app/store/chartDataSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { AppContext } from "@/app/contexts/AppContext";
import IncreaseValueIcon from "../market-data-nav/IncreaseValueIcon.svg";
import IncreaseValueIconDarker from "../market-data-nav/IncreaseValueIconDarker.svg";
import DecreaseValueIcon from "../market-data-nav/DecreaseValueIcon.svg";

export default function CarouselItem({
  id,
  image,
  symbol,
  current_price,
  price_change_percentage_1h_in_currency,
}: {
  id: string;
  image: string;
  symbol: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const coinSelected = useSelector(
    (state: RootState) => state.chartData.coinSelected
  );

  const { theme, colors, currencyFormat, currency } = useContext(AppContext);

  const increaseColor =
    theme === "dark" ? colors.greenMain : colors.greenSecondary;

  const decreaseColor = colors.redMain;

  const selectedStyles =
    coinSelected === id
      ? "min-w-[215px] h-[78px] bg-highlightColor flex justify-center items-center rounded-lg cursor-pointer p-4 text-white"
      : "min-w-[215px] h-[78px] bg-primary flex justify-center items-center rounded-lg cursor-pointer p-4";
  return (
    <div
      className={
        coinSelected === id
          ? "bg-gradient-to-b from-selectedGradient to-transparent p-[1px] rounded-lg mx-1"
          : "mx-1"
      }
    >
      <div
        className={`${selectedStyles} select-none`}
        onClick={() => {
          dispatch(setCoinSelected(id));
          dispatch(getCoinData());
          dispatch(getChartData(currency));
        }}
      >
        <img src={image} alt="Coin Image" width={32} height={32} />
        <div className="flex flex-col flex-grow items-center justify-center">
          <div>
            <div className="flex gap-1 font-medium">
              <div>{id.charAt(0).toUpperCase() + id.slice(1)}</div>
              <div>({symbol.toUpperCase()})</div>
            </div>
            <div className="text-xs flex gap-1">
              <div>
                {currencyFormat.format(current_price)} {currency}
              </div>
              <div
                className="flex"
                style={
                  price_change_percentage_1h_in_currency > 0
                    ? { color: increaseColor }
                    : { color: decreaseColor }
                }
              >
                <div>
                  {price_change_percentage_1h_in_currency > 0 ? (
                    theme === "dark" ? (
                      <IncreaseValueIcon />
                    ) : (
                      <IncreaseValueIconDarker />
                    )
                  ) : (
                    <DecreaseValueIcon />
                  )}
                </div>
                <div>
                  {formatPercentage(
                    Math.abs(price_change_percentage_1h_in_currency)
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
