import React from "react";
import { currencyFormat } from "@/app/utils/numberFormatting";
import { useDispatch, useSelector } from "react-redux";
import {
  getChartData,
  getCoinData,
  setCoinSelected,
} from "@/app/store/chartDataSlice";
import { AppDispatch, RootState } from "@/app/store/store";

export default function CarouselItem({
  id,
  image,
  symbol,
  current_price,
}: {
  id: string;
  image: string;
  symbol: string;
  current_price: number;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const coinSelected = useSelector(
    (state: RootState) => state.chartData.coinSelected
  );

  const selectedStyles =
    coinSelected === id
      ? "min-w-[287px] h-[78px] bg-accent flex justify-center items-center rounded-lg cursor-pointer p-4 mx-1"
      : "min-w-[287px] h-[78px] bg-primary flex justify-center items-center rounded-lg cursor-pointer p-4 mx-1";
  return (
    <div
      className={selectedStyles}
      onClick={() => {
        dispatch(setCoinSelected(id));
        dispatch(getCoinData());
        dispatch(getChartData());
      }}
    >
      <img src={image} alt="Coin Image" width={32} height={32} />
      <div className="flex flex-col flex-grow items-center justify-center">
        <div>
          <div className="flex gap-1">
            <div>{id.charAt(0).toUpperCase() + id.slice(1)}</div>
            <div>({symbol.toUpperCase()})</div>
          </div>
          <div className="text-xs">
            {currencyFormat.format(current_price)} USD
          </div>
        </div>
      </div>
    </div>
  );
}
