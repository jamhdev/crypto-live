import React, { SetStateAction, useContext, useState } from "react";
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
import { AppContext } from "@/app/contexts/AppContext";
import trashcan from "./trashcan.png";
import exitIcon from "./exitIcon.png";
import Image from "next/image";

export default function AssetItem({
  value,
  currentAssetData,
  handleDeleteAssetConfirm,
  personalAssetData,
}: {
  value: PersonalAssetData;
  currentAssetData: { [key: string]: CurrentCoinData };
  handleDeleteAssetConfirm: (
    id: string,
    coinName: string,
    personalAssetData: PersonalAssetData[]
  ) => void;
  personalAssetData: PersonalAssetData[];
}) {
  const { theme, colors } = useContext(AppContext);
  const [deleteScreenVisible, setDeleteScreenVisible] = useState(false);
  const coinCurrentData = currentAssetData[value.coinData.id];
  const assetVisualGridItemStyles =
    theme === "dark"
      ? `h-full w-full border-2 border-[#2D2D51] rounded-lg p-2 min-w-[218px]`
      : `h-full w-full border-2 border-white rounded-lg p-2 min-w-[218px]`;
  const datePurchased = new Date(value.dataDate);

  const dateFormatted = (date: Date) => {
    return (
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
  };

  const formatCoinNameAndSymbol = (coin: string, symbol: string) => {
    return (
      coin.charAt(0).toUpperCase() +
      coin.slice(1) +
      " (" +
      symbol.toUpperCase() +
      ")"
    );
  };

  const calculatePercentageCirculatingSupplyVsMaxSupply = (
    circulatingSupply: number,
    totalSupply: number
  ) => {
    return (circulatingSupply / totalSupply) * 100;
  };

  const volume = coinCurrentData?.market_data?.total_volume?.usd;
  const marketCap = coinCurrentData?.market_data?.market_cap?.usd;
  const calculateMarketCapVsVolumePercentage = (
    volume: number,
    marketCap: number
  ) => {
    return (volume / marketCap) * 100;
  };

  const currentCoinPrice = coinCurrentData?.market_data?.current_price?.usd;
  const coinImage = value.coinData.image.small;
  const coin24HourChangePercentage =
    coinCurrentData?.market_data?.price_change_percentage_24h;

  const originalAmountValue =
    value?.coinData?.market_data?.current_price?.usd * value.amount;
  const currentAmountValue =
    coinCurrentData?.market_data?.current_price?.usd * value.amount;

  const percentageDifferenceInValue =
    ((currentAmountValue - originalAmountValue) / originalAmountValue) * 100;

  const increasedValueColor = colors.greenMain;
  const decreasedValueColor = colors.redMain;

  const circulatingSupply = coinCurrentData?.market_data?.circulating_supply;
  const totalSupply = coinCurrentData?.market_data?.total_supply;

  const deleteAssetSection = (
    <>
      {deleteScreenVisible === true ? (
        <div className="absolute w-[380px] h-[216px] rounded-tl-lg rounded-bl-lg bg-gray-300 z-10">
          <div className="text-black text-lg flex justify-center items-center text-center w-3/4 m-auto mt-6 font-semibold">
            Are you sure you want to PERMANETLY DELETE this asset?
          </div>
          <div
            className="bg-black rounded-2xl w-40 p-2 m-auto flex justify-center items-center mt-5 text-white hover:scale-110 transition-all cursor-pointer"
            onClick={() =>
              handleDeleteAssetConfirm(
                value.id,
                value.coinData.id,
                personalAssetData
              )
            }
          >
            DELETE
          </div>
        </div>
      ) : null}

      <div className="absolute top-3 left-[351px] z-10">
        {deleteScreenVisible === false ? (
          <Image
            src={trashcan}
            width={20}
            height={20}
            alt="trashcan"
            className="cursor-pointer hover:scale-125 transition-all"
            onClick={() => setDeleteScreenVisible((prev) => !prev)}
          />
        ) : (
          <Image
            src={exitIcon}
            width={20}
            height={20}
            alt="trashcan"
            className="cursor-pointer hover:scale-125 transition-all"
            onClick={() => setDeleteScreenVisible((prev) => !prev)}
          />
        )}
      </div>
    </>
  );

  return (
    <div className="text-themeTextColorThird w-full h-[216px] rounded-lg flex items-center min-w-[840px] relative">
      {deleteAssetSection}
      <div className="h-full w-[380px] bg-chartBackground rounded-bl-lg rounded-tl-lg flex flex-col p-4 gap-1 relative">
        <div className="text-3xl flex gap-2 items-center mb-6">
          <img src={coinImage} alt="Coin Image" width={48} />
          <div className="font-bold text-[24px]">
            {formatCoinNameAndSymbol(value.coinData.id, value.coinData.symbol)}
          </div>
        </div>
        <div className="ml-2">Total Value</div>
        <div className="flex items-center ml-2">
          <div className="flex gap-2">
            <div className="text-[28px] font-bold">
              ${currencyFormat.format(currentAmountValue)} USD
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
        <div className="flex text-themeTextColorThird opacity-50 ml-2">
          <div>Purchased {dateFormatted(datePurchased)}</div>
        </div>
      </div>
      <div
        className={
          theme === "dark"
            ? "h-full grid grid-rows-2 grid-cols-2 gap-4 flex-1 place-items-center px-4 py-4 bg-backgroundSecondary"
            : "h-full grid grid-rows-2 grid-cols-2 gap-4 flex-1 place-items-center px-4 py-4 bg-chartDurationBackgroundColor"
        }
      >
        <div className={assetVisualGridItemStyles}>
          <div className="flex flex-col text-themeTextColorThird justify-center">
            <div className=" text-2xl">
              ${currencyFormat.format(currentCoinPrice)}
            </div>
            <div className="opacity-50">Current price</div>
          </div>
        </div>
        <div className={assetVisualGridItemStyles}>
          <div className="flex flex-col text-themeTextColorThird justify-center">
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
          <div className="flex flex-col text-themeTextColorThird justify-center">
            <div className="flex items-center gap-2">
              <div
                className=" text-2xl"
                style={{
                  color: increasedValueColor,
                }}
              >
                {formatPercentage(
                  calculateMarketCapVsVolumePercentage(volume, marketCap)
                )}
              </div>
              <div className="bg-[rgb(0,0,0,0.25)] h-[6px] rounded-full flex flex-col w-full">
                <div
                  className={`h-full rounded-full`}
                  style={{
                    maxWidth: "100%",
                    width: formatPercentage(
                      calculateMarketCapVsVolumePercentage(volume, marketCap)
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
          <div className="flex flex-col text-themeTextColorThird justify-center">
            <div
              className=" text-2xl"
              style={{
                color: increasedValueColor,
              }}
            >
              {percentageBarFormat.format(
                calculatePercentageCirculatingSupplyVsMaxSupply(
                  circulatingSupply,
                  totalSupply
                )
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
