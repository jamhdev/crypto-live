"use client";
import { AppContext } from "@/app/contexts/AppContext";
import { CoinPageData, getCoinPageData } from "@/app/store/coinPageSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HyperlinkIcon from "./HyperlinkIcon.svg";
import CirclePlusIcon from "./CirclePlusIcon.svg";
import {
  currencyFormat,
  formatPercentage,
  formatLargeNumber,
} from "@/app/utils/numberFormatting";
import IncreaseValueIcon from "../market-data-nav/IncreaseValueIcon.svg";
import DecreaseValueIcon from "../market-data-nav/DecreaseValueIcon.svg";

export default function CoinPage() {
  const { isViewingCoinPage, setIsViewingCoinPage } = useContext(AppContext);
  const { coinData, isLoading, error } = useSelector(
    (state: RootState) => state.coinPageData
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCoinPageData());
  }, []);

  const circlePlusIcon = (
    <div className="bg-accent rounded-full min-w-[24px] min-h-[24px] flex items-center justify-center shadow-[0px_0px_10px_1px_rgb(107,106,222,0.5)]">
      <CirclePlusIcon />
    </div>
  );

  console.log("coin data: ", coinData);
  if (isLoading) {
    return (
      <>
        <button
          onClick={() => setIsViewingCoinPage((prev) => !prev)}
          className="p-4 m-4 bg-accent"
        >
          EXIT
        </button>
        <div className="text-themeTextColor w-full text-center">Loading...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <button
          onClick={() => setIsViewingCoinPage((prev) => !prev)}
          className="p-4 m-4 bg-accent"
        >
          EXIT
        </button>
        <div className="text-themeTextColor w-full text-center">
          Error fetching coin page data
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
      <div className="text-themeTextColor w-full px-10">
        <button
          onClick={() => setIsViewingCoinPage((prev) => !prev)}
          className="p-4 m-4 bg-accent"
        >
          EXIT
        </button>
        <div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col p-6 gap-6 bg-chartBackground rounded-lg">
              <div className="flex gap-4 justify-start items-center">
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
              <div className="text-4xl font-semibold flex gap-4 justify-start items-center">
                <div>
                  $
                  {currencyFormat.format(
                    coinData?.market_data?.current_price?.usd
                  )}
                </div>
                <div className="text-xl flex gap-1 justify-center items-center">
                  {coinData?.market_data?.current_price?.usd > 0 ? (
                    <IncreaseValueIcon />
                  ) : (
                    <DecreaseValueIcon />
                  )}
                  {formatPercentage(
                    coinData?.market_data?.price_change_percentage_24h
                  )}
                </div>
              </div>
              <div>Profit: N/A</div>
              <div className="w-full h-[1px] bg-themeTextColor"></div>
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-1">
                  <IncreaseValueIcon />
                  All Time High -{" "}
                  <div>
                    {new Date(
                      coinData?.market_data?.ath_date?.usd
                    ).toDateString()}
                  </div>
                </div>
                <div className="text-2xl">
                  ${currencyFormat.format(coinData?.market_data?.ath?.usd)}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-1">
                  <DecreaseValueIcon />
                  All Time Low -{" "}
                  {new Date(
                    coinData?.market_data?.atl_date?.usd
                  ).toDateString()}
                </div>
                <div className="text-2xl">
                  ${currencyFormat.format(coinData?.market_data?.atl?.usd)}
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

          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-chartBackground rounded-lg flex flex-col gap-8 items-start justify-start p-4">
              <div className="flex gap-2">
                {circlePlusIcon}
                <div>
                  Total Volume: $
                  {currencyFormat.format(
                    coinData?.market_data?.total_volume?.usd
                  )}
                </div>
              </div>
            </div>
            <div className="bg-chartBackground rounded-lg flex flex-col gap-8 items-start justify-start p-4">
              <div className="flex gap-2">
                {circlePlusIcon}
                <div className="flex gap-2">
                  Max Supply:{" "}
                  {coinData?.market_data?.max_supply ? (
                    <div>{coinData?.market_data?.max_supply}</div>
                  ) : (
                    <div>&#8734;</div>
                  )}{" "}
                  {coinData?.symbol ? coinData.symbol.toUpperCase() : ""}
                </div>
              </div>

              <div className="flex gap-2">
                {circlePlusIcon}
                Circulating Supply:{" "}
                {currencyFormat.format(
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
            <div className="bg-chartBackground rounded-lg flex flex-col gap-8 items-start justify-start p-4">
              <div className="flex gap-2">
                {circlePlusIcon}
                <div>
                  Market Cap: $
                  {currencyFormat.format(
                    coinData?.market_data?.market_cap?.usd
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {circlePlusIcon}
                Fully Diluted Valuation: $
                {currencyFormat.format(
                  coinData?.market_data?.fully_diluted_valuation?.usd
                )}
              </div>
            </div>
            <div className="bg-chartBackground rounded-lg flex flex-wrap gap-[2px] items-start justify-center p-4">
              {coinData?.links?.blockchain_site.map((link) => {
                if (link.length < 1) {
                  return false;
                }
                return (
                  <div
                    key={crypto.randomUUID()}
                    className=" border-2 p-2 border-accent rounded-lg max-w-[300px]"
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
