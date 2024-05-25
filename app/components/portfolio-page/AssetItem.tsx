import React from "react";
import { PersonalAssetData, CurrentCoinData } from "./PortfolioInterfaces";
import {
  currencyFormat,
  formatPercentage,
  percentageBarFormat,
  percentFormat,
} from "@/app/utils/numberFormatting";
import ArrowDownLargeRedIconSvg from "./ArrowDownLargeRedIconSvg.svg";
import ArrowDownSmallRedIconSvg from "./ArrowDownSmallRedIconSvg.svg";
import ArrowUpLargeGreenIconSvg from "./ArrowUpLargeGreenIconSvg.svg";
import ArrowUpSmallGreenIconSvg from "./ArrowUpSmallGreenIconSvg.svg";

export default function AssetItem({
  value,
  currentAssetData,
}: {
  value: PersonalAssetData;
  currentAssetData: { [key: string]: CurrentCoinData };
}) {
  const coinCurrentData = currentAssetData[value.coinData.id];
  const assetVisualGridItemStyles = `h-full w-full border-2 border-[#2D2D51] rounded-lg p-2`;
  const datePurchased = new Date(value.dataDate);
  const datePurchasedFormatted =
    "Purchased " +
    datePurchased.getDate() +
    "." +
    (datePurchased.getMonth() + 1) +
    "." +
    datePurchased.getFullYear();
  const coinNameFormatted =
    value.coinData.id.charAt(0).toUpperCase() +
    value.coinData.id.slice(1) +
    " (" +
    value.coinData.symbol.toUpperCase() +
    ")";

  const currentCoinPrice = coinCurrentData?.market_data?.current_price?.usd;
  const coinImage = value.coinData.image.small;
  const coin24HourChangePercentage =
    coinCurrentData?.market_data?.price_change_percentage_24h;

  const circulatingSupply = coinCurrentData?.market_data?.circulating_supply;
  const totalSupply = coinCurrentData?.market_data?.total_supply;
  const percentageCirculatingSupplyVsMaxSupply = `${
    (circulatingSupply / totalSupply) * 100
  }`;

  const volume = coinCurrentData?.market_data?.total_volume?.usd;
  const marketCap = coinCurrentData?.market_data?.market_cap?.usd;
  const marketCapVsVolumePercentage = `${
    (Number(volume) / Number(marketCap)) * 100
  }`;

  const originalAmountValue =
    value?.coinData?.market_data?.current_price?.usd * value.amount;
  const currentAmountValue =
    coinCurrentData?.market_data?.current_price?.usd * value.amount;

  const percentageDifferenceInValue =
    ((currentAmountValue - originalAmountValue) / originalAmountValue) * 100;

  const increasedValueColor = "#00f5e4";
  const decreasedValueColor = "#ff0061";

  return (
    <div className="text-themeTextColor w-full h-[216px] rounded-lg flex items-center bg-chartBackground">
      <div className="h-full w-[380px] bg-chartBackground rounded-bl-lg rounded-tl-lg flex flex-col p-4 gap-1">
        <div className="text-3xl flex gap-2 items-center mb-6">
          <img src={coinImage} alt="Coin Image" width={48} />
          {coinNameFormatted}
        </div>
        <div className="opacity-50 ml-2">Total Value</div>
        <div className="flex items-center ml-2">
          <div className="flex gap-2">
            <div className="text-3xl">
              {currencyFormat.format(currentAmountValue)}$
            </div>
            <div
              className="flex justify-center items-center gap-2"
              style={{
                color:
                  percentageDifferenceInValue > 0
                    ? increasedValueColor
                    : decreasedValueColor,
              }}
            >
              <div>
                {percentageDifferenceInValue > 0 ? (
                  <ArrowUpLargeGreenIconSvg />
                ) : (
                  <ArrowDownLargeRedIconSvg />
                )}
              </div>
              <div>{formatPercentage(percentageDifferenceInValue)}</div>
            </div>
          </div>
        </div>
        <div className="flex text-themeTextColor opacity-50 ml-2">
          <div>{datePurchasedFormatted}</div>
        </div>
      </div>
      <div className="h-full grid grid-rows-2 grid-cols-2 gap-4 flex-1 place-items-center px-4 py-4 bg-backgroundSecondary">
        <div className={assetVisualGridItemStyles}>
          <div className="flex flex-col text-themeTextColor justify-center">
            <div className=" text-2xl">
              ${currencyFormat.format(currentCoinPrice)}
            </div>
            <div className="opacity-50">Current price</div>
          </div>
        </div>
        <div className={assetVisualGridItemStyles}>
          <div className="flex flex-col text-themeTextColor justify-center">
            <div
              className=" text-2xl"
              style={{
                color:
                  coin24HourChangePercentage > 0
                    ? increasedValueColor
                    : decreasedValueColor,
              }}
            >
              <div className="flex gap-2 items-center">
                <div>
                  {coin24HourChangePercentage > 0 ? (
                    <ArrowUpSmallGreenIconSvg />
                  ) : (
                    <ArrowDownSmallRedIconSvg />
                  )}
                </div>
                <div>
                  {formatPercentage(Math.abs(coin24HourChangePercentage))}
                </div>
              </div>
            </div>
            <div className="opacity-50">24h%</div>
          </div>
        </div>
        <div className={assetVisualGridItemStyles}>
          <div className="flex flex-col text-themeTextColor justify-center">
            <div className="flex items-center gap-2">
              <div
                className=" text-2xl"
                style={{
                  color: increasedValueColor,
                }}
              >
                {formatPercentage(Number(marketCapVsVolumePercentage))}
              </div>
              <div className="bg-[rgb(0,0,0,0.25)] h-[6px] rounded-full flex flex-col w-full">
                <div
                  className={`h-full rounded-full`}
                  style={{
                    maxWidth: "100%",
                    width: formatPercentage(
                      Number(marketCapVsVolumePercentage)
                    ),
                    backgroundColor: increasedValueColor,
                  }}
                ></div>
              </div>
            </div>
            <div className="opacity-50">Market cap vs volume</div>
          </div>
        </div>
        <div className={assetVisualGridItemStyles}>
          <div className="flex flex-col text-themeTextColor justify-center">
            <div
              className=" text-2xl"
              style={{
                color: increasedValueColor,
              }}
            >
              {percentageBarFormat.format(
                Number(percentageCirculatingSupplyVsMaxSupply)
              )}
              %
            </div>
            <div className="opacity-50">Circ supply vs max supply</div>
          </div>
        </div>
      </div>
    </div>
  );
}
