"use client";
import { AppContext } from "@/app/contexts/AppContext";
import { CoinPageData, getCoinPageData } from "@/app/store/coinPageSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HyperlinkIcon from "./HyperlinkIcon.svg";
import CirclePlusIcon from "./CirclePlusIcon.svg";
import {
  formatPercentage,
  formatLargeNumber,
  plainCurrencyFormat,
} from "@/app/utils/numberFormatting";
import IncreaseValueIcon from "../market-data-nav/IncreaseValueIcon.svg";
import DecreaseValueIcon from "../market-data-nav/DecreaseValueIcon.svg";
import IncreaseValueIconDarker from "../market-data-nav/IncreaseValueIconDarker.svg";
import ArrowDownLargeRedIconSvg from "../portfolio-page/ArrowDownLargeRedIconSvg.svg";
import ArrowUpLargeGreenIconSvg from "../portfolio-page/ArrowUpLargeGreenIconSvg.svg";
import ArrowUpLargeGreenIconSecondarySvg from "../portfolio-page/ArrowUpLargeGreenIconSecondarySvg.svg";
import useLocalStorage from "../custom-hooks/useLocalStorage";
import { PersonalAssetData } from "../portfolio-page/PortfolioInterfaces";
import { CoinData } from "../../store/chartDataSlice";
import { coindData } from "@/mock-api/mock-db";

export default function CoinPage() {
  const {
    isViewingCoinPage,
    setIsViewingCoinPage,
    theme,
    colors,
    currencyFormat,
    currency,
  } = useContext(AppContext);
  const { coinData, isLoading, error } = useSelector(
    (state: RootState) => state.coinPageData
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCoinPageData());
  }, []);

  const [personalAssetData] = useLocalStorage("personalAssetData", []);
  const [currentAssetData] = useLocalStorage("currentAssetData", {});
  const increaseColor =
    theme === "dark" ? colors.greenMain : colors.greenSecondary;
  const decreaseColor = colors.redMain;
  const circlePlusIcon = (
    <div className="bg-highlightColor rounded-full min-w-[24px] min-h-[24px] w-[24px] h-[24px] flex items-center justify-center shadow-[0px_0px_10px_1px_rgb(107,106,222,0.5)]">
      <CirclePlusIcon />
    </div>
  );

  const profitSectionCaluclation = () => {
    const value = personalAssetData.filter(
      (val: PersonalAssetData) => coinData.id === val.coinData.id
    );
    const coinCurrentData = currentAssetData[coinData.id];

    let finalAmount = 0;

    const accumalativeCoinsValue = personalAssetData
      .filter(
        (val: PersonalAssetData) => val.coinData.id === value[0]?.coinData?.id
      )
      .reduce((acc: number, val: PersonalAssetData) => {
        console.log("ITERATION");
        console.log(acc);
        const amount = val.amount;
        finalAmount += amount;
        const coinPrice =
          val.coinData.market_data.current_price[currency.toLowerCase()];
        return acc + amount * coinPrice;
      }, 0);
    const currentAmountValue =
      coinCurrentData?.market_data?.current_price[currency.toLowerCase()];

    const amountLostOrGained =
      currentAmountValue * finalAmount - accumalativeCoinsValue;

    const portfolioCoinNamesArray = personalAssetData.map(
      (val: PersonalAssetData) => {
        return val.coinData.id;
      }
    );
    return (
      <>
        {portfolioCoinNamesArray.includes(coinData.id) && (
          <div className="text-xl flex gap-2 items-center">
            <div className="text-sm xsm:text-base md:text-lg">Profit:</div>
            <div
              className="font-medium text-lg sm:text-2xl flex items-center"
              style={
                amountLostOrGained > 0
                  ? { color: increaseColor }
                  : { color: decreaseColor }
              }
            >
              {amountLostOrGained > 0 ? (
                theme === "dark" ? (
                  <IncreaseValueIcon />
                ) : (
                  <IncreaseValueIconDarker />
                )
              ) : (
                <DecreaseValueIcon />
              )}
              {currencyFormat.format(Math.abs(amountLostOrGained))}
            </div>
          </div>
        )}
      </>
    );
  };

  if (isLoading) {
    return (
      <>
        <button
          onClick={() => setIsViewingCoinPage((prev) => !prev)}
          className="p-6 bg-highlightColor text-themeTextColorThird font-bold max-w-[250px] m-auto rounded-lg"
        >
          Back Home
        </button>
        <div className="text-themeTextColor w-full text-center">Loading...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="text-themeTextColor w-full text-center p-20">
          <div className="flex flex-col gap-2 bg-chartBackground max-w-xl m-auto p-20 rounded-lg">
            <div className="text-5xl font-bold">OOPS!</div>
            <div className="text-2xl">There is no data for this coin.</div>
          </div>
        </div>
      </>
    );
  }

  function isCoinPageData(
    data: CoinPageData | { id: string }
  ): data is CoinPageData {
    return (data as CoinPageData).market_data !== undefined;
  }

  if (isCoinPageData(coinData)) {
    const circulatingSupply = coinData?.market_data?.circulating_supply;
    const totalSupply = coinData?.market_data?.total_supply;
    const percentageBarCirculatingSupply = `${
      (circulatingSupply / totalSupply) * 100
    }%`;

    return (
      <div className="text-themeTextColor w-full">
        <button
          onClick={() => setIsViewingCoinPage((prev) => !prev)}
          className="p-4 m-4 ml-0 bg-highlightColor text-themeTextColorThird font-medium rounded-lg"
        >
          Back
        </button>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col p-6 gap-6 bg-chartBackground rounded-lg">
              <div className="hidden lg:flex gap-4 justify-start items-center">
                <img
                  src={coinData?.image?.large}
                  alt={`${coinData?.name} logo`}
                  width={64}
                  height={64}
                />
                <div>
                  <div className="text-2xl font-medium">
                    {coinData?.name} (
                    {coinData?.symbol ? coinData.symbol.toUpperCase() : ""})
                  </div>
                  <div className="cursor-pointer flex gap-2">
                    {coinData?.links?.homepage}
                    <HyperlinkIcon />
                  </div>
                </div>
              </div>
              {/* MOBILE */}
              <div className="lg:hidden flex flex-col gap-2 md:gap-4 justify-start items-center">
                <div className="flex gap-2">
                  <div className="text-lg md:text-2xl font-medium flex justify-center items-center">
                    {coinData?.name} (
                    {coinData?.symbol ? coinData.symbol.toUpperCase() : ""})
                  </div>
                  <img
                    src={coinData?.image?.large}
                    alt={`${coinData?.name} logo`}
                    className="w-10 h-10 md:w-[64px] md:h-[64px]"
                  />
                </div>
                <div>
                  <div className="cursor-pointer flex gap-2">
                    {coinData?.links?.homepage}
                    <HyperlinkIcon />
                  </div>
                </div>
              </div>
              {/* MOBILE */}
              <div className="text-lg xsm:text-2xl md:text-4xl font-semibold flex gap-2 xsm:gap-4 justify-start items-center">
                <div>
                  {currencyFormat.format(
                    coinData?.market_data?.current_price[currency.toLowerCase()]
                  )}
                </div>
                <div className="flex gap-1 justify-center items-center">
                  {coinData?.market_data?.price_change_percentage_24h > 0 ? (
                    theme === "dark" ? (
                      <IncreaseValueIcon />
                    ) : (
                      <IncreaseValueIconDarker />
                    )
                  ) : (
                    <DecreaseValueIcon />
                  )}
                  <div
                    style={
                      coinData?.market_data?.price_change_percentage_24h > 0
                        ? { color: increaseColor }
                        : { color: decreaseColor }
                    }
                  >
                    {formatPercentage(
                      Math.abs(
                        coinData?.market_data?.price_change_percentage_24h
                      )
                    )}
                  </div>
                </div>
              </div>
              {profitSectionCaluclation()}
              <div className="w-full h-[1px] bg-themeTextColor"></div>
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-1 text-xs xsm:text-base">
                  {theme === "dark" ? (
                    <ArrowUpLargeGreenIconSvg />
                  ) : (
                    <ArrowUpLargeGreenIconSecondarySvg />
                  )}
                  All Time High <span className="hidden md:inline">-</span>{" "}
                  <div className="hidden md:flex">
                    {new Date(
                      coinData?.market_data?.ath_date[currency.toLowerCase()]
                    ).toDateString()}
                  </div>
                </div>
                <div className="text-lg xsm:text-2xl">
                  {currencyFormat.format(
                    coinData?.market_data?.ath[currency.toLowerCase()]
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-1 text-xs xsm:text-base">
                  <ArrowDownLargeRedIconSvg />
                  All Time Low <span className="hidden md:inline">-</span>{" "}
                  <div className="hidden md:flex">
                    {new Date(
                      coinData?.market_data?.atl_date[currency.toLowerCase()]
                    ).toDateString()}
                  </div>
                </div>
                <div className="text-lg xsm:text-2xl">
                  {currencyFormat.format(
                    coinData?.market_data?.atl[currency.toLowerCase()]
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center p-4 gap-4 text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: coinData?.description?.en || "",
                }}
              ></div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-themeTextColor mt-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
            <div className="bg-chartBackground rounded-lg flex flex-col gap-8 items-start justify-start p-8 overflow-hidden">
              <div className="flex gap-2 justify-center items-center">
                {circlePlusIcon}
                <div>
                  Total Volume:{" "}
                  {currencyFormat.format(
                    coinData?.market_data?.total_volume[currency.toLowerCase()]
                  )}
                </div>
              </div>
            </div>
            <div className="bg-chartBackground rounded-lg flex flex-col gap-8 items-start justify-start p-8 overflow-hidden">
              <div className="flex gap-2 justify-center items-center">
                {circlePlusIcon}
                <div className="flex gap-2">
                  Max Supply:{" "}
                  {coinData?.market_data?.max_supply ? (
                    <div>
                      {plainCurrencyFormat.format(
                        coinData?.market_data?.max_supply
                      )}
                    </div>
                  ) : (
                    <div>&#8734;</div>
                  )}{" "}
                  {coinData?.symbol ? coinData.symbol.toUpperCase() : ""}
                </div>
              </div>

              <div className="flex gap-2 justify-center items-center">
                {circlePlusIcon}
                Circulating Supply:{" "}
                {plainCurrencyFormat.format(
                  coinData?.market_data?.circulating_supply
                )}{" "}
                {coinData?.symbol ? coinData.symbol.toUpperCase() : ""}
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <div>
                    {formatLargeNumber(
                      coinData?.market_data?.circulating_supply
                    )}
                  </div>
                  <div>
                    {formatLargeNumber(coinData?.market_data?.total_supply)}
                  </div>
                </div>
                <div className="bg-[rgb(248,210,166)] w-full h-[6px] rounded-full relative flex flex-col">
                  <div
                    className={`h-full rounded-full absolute bg-[#d4770c]`}
                    style={{
                      maxWidth: "100%",
                      width: percentageBarCirculatingSupply,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="bg-chartBackground rounded-lg flex flex-col gap-8 items-start justify-start p-8 overflow-hidden">
              <div className="flex gap-2 justify-center items-center">
                {circlePlusIcon}
                <div>
                  Market Cap:{" "}
                  {currencyFormat.format(
                    coinData?.market_data?.market_cap[currency.toLowerCase()]
                  )}
                </div>
              </div>
              <div className="flex gap-2 justify-center items-center">
                {circlePlusIcon}
                Fully Diluted Valuation:{" "}
                {currencyFormat.format(
                  coinData?.market_data?.fully_diluted_valuation[
                    currency.toLowerCase()
                  ]
                )}
              </div>
            </div>
            <div className="bg-chartBackground rounded-lg flex flex-wrap gap-[4px] items-start justify-center p-8">
              {coinData?.links?.blockchain_site.map((link) => {
                if (link.length < 1) {
                  return false;
                }
                return (
                  <div
                    key={crypto.randomUUID()}
                    className=" border-2 p-2 border-highlightColor rounded-lg max-w-[300px]"
                  >
                    <a href={link} target="_blank" className="flex gap-2">
                      <div className="truncate max-w-[254px]">{link}</div>
                      <HyperlinkIcon />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
          {/* ------------------------------------------------------------- */}
          {/* <div>Volume 24h: {}</div> */}
          {/* <div>Volume/Market: {coinData?.}</div> */}
          {/* ------------------------------------------------------------- */}

          {/* ------------------------------------------------------------- */}

          {/* ------------------------------------------------------------- */}
        </div>
      </div>
    );
  }
}
