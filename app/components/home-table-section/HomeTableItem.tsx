"use client";
import React from "react";
import {
  currencyFormat,
  formatLargeNumber,
  formatPercentage,
} from "@/app/utils/numberFormatting";
//
import IncreaseValueIcon from "../market-data-nav/IncreaseValueIcon.svg";
import DecreaseValueIcon from "../market-data-nav/DecreaseValueIcon.svg";
import HomeTableItem7dGraph from "./HomeTableItem7dGraph";
//
export default function HomeTableItem({
  id,
  symbol,
  current_price,
  index,
  image,
  price_change_percentage_1h_in_currency,
  price_change_percentage_24h_in_currency,
  price_change_percentage_7d_in_currency,
  circulating_supply,
  total_supply,
  market_cap,
  total_volume,
  sparkline_in_7d,
}: CoinData) {
  const percentageBar24HVolume = `${(total_volume / market_cap) * 100}%`;
  const percentageBarCirculatingSupply = `${
    (circulating_supply / total_supply) * 100
  }%`;
  return (
    <>
      <div className="text-themeTextColor bg-primary flex rounded-lg gap-6 mb-1 justify-start items-center p-4">
        <div>{index + 1}</div>
        <div>
          <div className="flex justify-center items-center gap-2">
            <img src={`${image}`} alt="Coin Image" width={32} height={32} />
            <div>
              {id.charAt(0).toUpperCase()}
              {id.slice(1)}({symbol.toUpperCase()})
            </div>
          </div>
        </div>
        <div>{currencyFormat.format(current_price)}</div>
        <div
          className={`${
            price_change_percentage_1h_in_currency > 0
              ? "text-[#00F5E4]"
              : "text-[#FF0061]"
          } flex items-center`}
        >
          {price_change_percentage_1h_in_currency > 0 ? (
            <IncreaseValueIcon />
          ) : (
            <DecreaseValueIcon />
          )}
          <div>
            {formatPercentage(Math.abs(price_change_percentage_1h_in_currency))}
          </div>
        </div>
        <div
          className={`${
            price_change_percentage_24h_in_currency > 0
              ? "text-[#00F5E4]"
              : "text-[#FF0061]"
          } flex items-center`}
        >
          {price_change_percentage_24h_in_currency > 0 ? (
            <IncreaseValueIcon />
          ) : (
            <DecreaseValueIcon />
          )}
          <div>
            {formatPercentage(
              Math.abs(price_change_percentage_24h_in_currency)
            )}
          </div>
        </div>
        <div
          className={`${
            price_change_percentage_7d_in_currency > 0
              ? "text-[#00F5E4]"
              : "text-[#FF0061]"
          } flex items-center`}
        >
          {price_change_percentage_7d_in_currency > 0 ? (
            <IncreaseValueIcon />
          ) : (
            <DecreaseValueIcon />
          )}
          <div>
            {formatPercentage(Math.abs(price_change_percentage_7d_in_currency))}
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div>{formatLargeNumber(total_volume)}</div>
            <div>{formatLargeNumber(market_cap)}</div>
          </div>
          <div className="bg-[rgb(0,0,0,0.25)] w-[200px] h-[6px] rounded-full relative flex flex-col">
            <div
              className={`bg-[rgb(0,0,0,1)] h-full rounded-full absolute`}
              style={{ maxWidth: "100%", width: percentageBar24HVolume }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div>{formatLargeNumber(circulating_supply)}</div>
            <div>{formatLargeNumber(total_supply)}</div>
          </div>
          <div className="bg-[rgb(0,0,0,0.25)] w-[200px] h-[6px] rounded-full relative flex flex-col">
            <div
              className={`bg-[rgb(0,0,0,1)] h-full rounded-full absolute`}
              style={{
                maxWidth: "100%",
                width: percentageBarCirculatingSupply,
              }}
            ></div>
          </div>
        </div>
        <div>
          <HomeTableItem7dGraph prices={sparkline_in_7d?.price} />
        </div>
      </div>
    </>
  );
}
