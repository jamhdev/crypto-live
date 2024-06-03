import React, { SetStateAction, useContext, useState } from "react";
import { PersonalAssetData, CurrentCoinData } from "../PortfolioInterfaces";
import { formatPercentage } from "@/app/utils/numberFormatting";
import ArrowDownLargeRedIconSvg from "../ArrowDownLargeRedIconSvg.svg";
import ArrowUpLargeGreenIconSvg from "../ArrowUpLargeGreenIconSvg.svg";
import ArrowUpLargeGreenIconSecondarySvg from "../ArrowUpLargeGreenIconSecondarySvg.svg";
import ArrowUpSmallGreenIconSvg from "../ArrowUpSmallGreenIconSvg.svg";
import ArrowDownSmallRedIconSvg from "../ArrowDownSmallRedIconSvg.svg";
import IncreaseValueIcon from "../../market-data-nav/IncreaseValueIcon.svg";
import IncreaseValueIconDarker from "../../market-data-nav/IncreaseValueIconDarker.svg";
import DecreaseValueIcon from "../../market-data-nav/DecreaseValueIcon.svg";
import { AppContext } from "@/app/contexts/AppContext";
import trashcan from "../trashcan.png";
import exitIcon from "../exitIcon.png";
import exitIconWhite from "../exitIconWhite.png";
import Image from "next/image";

export default function AssetItemMobile({
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
  const {
    theme,
    colors,
    currencyFormat,
    percentageBarFormat,
    percentFormat,
    currency,
  } = useContext(AppContext);
  const [deleteScreenVisible, setDeleteScreenVisible] = useState(false);
  const coinCurrentData = currentAssetData[value.coinData.id];
  const assetVisualGridItemStyles =
    theme === "dark"
      ? `h-full w-full border-2 border-[#2D2D51] rounded-lg p-2 flex items-center overflow-hidden`
      : `h-full w-full border-2 border-white rounded-lg p-2 flex items-center overflow-hidden`;
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

  const volume =
    coinCurrentData?.market_data?.total_volume[currency.toLowerCase()];
  const marketCap =
    coinCurrentData?.market_data?.market_cap[currency.toLowerCase()];
  const calculateMarketCapVsVolumePercentage = (
    volume: number,
    marketCap: number
  ) => {
    return (volume / marketCap) * 100;
  };

  const currentCoinPrice =
    coinCurrentData?.market_data?.current_price[currency.toLowerCase()];
  const coinImage = value.coinData.image.small;
  const coin24HourChangePercentage =
    coinCurrentData?.market_data?.price_change_percentage_24h;

  const originalAmountValue =
    value?.coinData?.market_data?.current_price[currency.toLowerCase()] *
    value.amount;
  const currentAmountValue =
    coinCurrentData?.market_data?.current_price[currency.toLowerCase()] *
    value.amount;

  const percentageDifferenceInValue =
    ((currentAmountValue - originalAmountValue) / originalAmountValue) * 100;

  const increasedValueColor =
    theme === "dark" ? colors.greenMain : colors.greenSecondary;
  const decreasedValueColor = colors.redMain;

  const circulatingSupply = coinCurrentData?.market_data?.circulating_supply;
  const totalSupply = coinCurrentData?.market_data?.total_supply;

  const deleteAssetSection = (
    <>
      {deleteScreenVisible === true ? (
        <div
          className={
            theme === "dark"
              ? "absolute w-full bg-chartBackground z-10 left-0 top-0 h-full overflow-hidden text-ellipsis flex flex-col justify-center items-center"
              : "absolute w-full bg-white z-10 left-0 top-0 h-full overflow-hidden text-ellipsis flex flex-col justify-center items-center"
          }
        >
          <div
            className={
              theme === "dark"
                ? "text-white text-lg flex justify-center items-center text-center w-3/4 m-auto mt-6 font-semibold"
                : "text-black text-lg flex justify-center items-center text-center w-3/4 m-auto mt-6 font-semibold"
            }
          >
            <div className="hidden sm:inline">
              Are you sure you want to PERMANETLY DELETE this asset?
            </div>
            <div className="hidden xs:inline sm:hidden">
              PERMANETLY DELETE this asset?
            </div>
            <div className="xs:hidden">DELETE this asset?</div>
          </div>
          <div
            className={
              theme === "dark"
                ? "bg-white rounded-2xl w-1/2 xs:w-40 p-2 m-auto flex justify-center items-center mt-1 text-black hover:scale-110 transition-all cursor-pointer font-bold whitespace-nowrap text-ellipsis overflow-hidden"
                : "bg-black rounded-2xl w-1/2 xs:w-40 p-2 m-auto flex justify-center items-center mt-1 text-white hover:scale-110 transition-all cursor-pointer font-bold whitespace-nowrap text-ellipsis overflow-hidden"
            }
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

      <div className="absolute bottom-3 right-3 z-10">
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
            src={theme === "dark" ? exitIconWhite : exitIcon}
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
    <div className="text-themeTextColorThird w-full h-[315px] rounded-lg flex flex-col items-center relative">
      <div className="h-full w-full bg-chartBackground flex flex-col p-4 gap-1 relative rounded-t-lg">
        {deleteAssetSection}
        <div className="flex gap-2 flex-col mb-3">
          <div className="flex justify-between items-center">
            <div className="font-bold text-[24px] whitespace-nowrap overflow-hidden text-ellipsis text-xl sm:text-1xl md:text-2xl">
              {formatCoinNameAndSymbol(
                value.coinData.id,
                value.coinData.symbol
              )}
            </div>
            <img
              src={coinImage}
              alt="Coin Image"
              className="w-[36px] sm:w-[46px]"
            />
          </div>
          <div className="flex text-themeTextColorThird opacity-50 text-sm sm:text-md md:text-lg">
            <div>Purchased {dateFormatted(datePurchased)}</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex gap-2">
            <div className="font-bold text-sm sm:text-1xl md:text-3xl">
              {currencyFormat.format(currentAmountValue)}
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
                  theme === "dark" ? (
                    <ArrowUpLargeGreenIconSvg />
                  ) : (
                    <ArrowUpLargeGreenIconSecondarySvg />
                  )
                ) : (
                  <ArrowDownLargeRedIconSvg />
                )}
              </div>
              <div>{formatPercentage(percentageDifferenceInValue)}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          theme === "dark"
            ? "w-full h-full grid grid-rows-2 grid-cols-2 gap-4 flex-1 place-items-center p-4 rounded-b-lg bg-backgroundSecondary"
            : "w-full h-full grid grid-rows-2 grid-cols-2 gap-4 flex-1 place-items-center p-4 rounded-b-lg bg-chartDurationBackgroundColor"
        }
      >
        <div className={assetVisualGridItemStyles}>
          <div className="flex flex-col text-themeTextColorThird justify-center">
            <div className="text-sm sm:text-base md:text-lg">
              {currencyFormat.format(currentCoinPrice)}
            </div>
            <div className="opacity-50 text-xs">Current price</div>
          </div>
        </div>
        <div className={assetVisualGridItemStyles}>
          <div className="flex flex-col text-themeTextColorThird justify-center">
            <div
              className="text-sm sm:text-base md:text-lg"
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
                  {formatPercentage(Math.abs(coin24HourChangePercentage))}
                </div>
              </div>
            </div>
            <div className="opacity-50 text-xs">24h%</div>
          </div>
        </div>
        <div className={assetVisualGridItemStyles}>
          <div className="flex flex-col text-themeTextColorThird justify-center">
            <div className="flex items-center gap-2">
              <div
                className="text-sm sm:text-base md:text-lg"
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
            <div className="opacity-50 text-xs">Market cap vs volume</div>
          </div>
        </div>
        <div className={assetVisualGridItemStyles}>
          <div className="flex flex-col text-themeTextColorThird justify-center">
            <div
              className="text-sm sm:text-base md:text-lg"
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
            <div className="opacity-50 text-xs">Circ supply vs max supply</div>
          </div>
        </div>
      </div>
    </div>
  );
}
