"use client";
import { useEffect, useState } from "react";
import AmountOfCoinsIcon from "./AmountOfCoinsIcon.svg";
import ExchangeMarketsIcon from "./ExchangeMarketsIcon.svg";
//
import BitcoinIcon from "./BitcoinIcon.svg";
import EthereumIcon from "./EthereumIcon.svg";
//
import IncreaseValueIcon from "./IncreaseValueIcon.svg";
import DecreaseValueIcon from "./DecreaseValueIcon.svg";
//
import {
  marketCapCurrencyFormat,
  percentFormat,
  marketCapPercentageFormat,
  percentageBarFormat,
} from "@/app/utils/numberFormatting";
//
import { marketData } from "../../../mock-api/mock-db";

export default function MarketDataNav() {
  const [globalMarketData, setGlobalMarketData] =
    useState<GlobalMarketDataType>();

  useEffect(() => {
    if (process && process.env.NODE_ENV === "development") {
      const getData = () =>
        new Promise<GlobalMarketDataType>((resolve, reject) => {
          if (!marketData) {
            return setTimeout(
              () => reject(new Error("Market data not found")),
              250
            );
          }
          setTimeout(() => {
            resolve(marketData);
          }, 250);
        });

      getData()
        .then((result) => {
          setGlobalMarketData(result);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/global"
          );
          const json = await response.json();
          if (!response.ok) {
            throw new Error("Error Fetching");
          }
          setGlobalMarketData(json.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }
  }, []);

  const numberToDivideMarketCapBy = () => {
    if (globalMarketData) {
      return globalMarketData?.total_market_cap?.usd > 9_999_999_999
        ? 1_000_000_000_000
        : 1_000_000_000;
    }
    return 1_000_000_000_000;
  };

  const billionOrTrillionSymbol = () => {
    if (globalMarketData) {
      return globalMarketData?.total_market_cap?.usd > 9_999_999_999
        ? "T"
        : "B";
    }
    return "T";
  };

  const valueChanged = () => {
    if (globalMarketData) {
      return globalMarketData?.market_cap_change_percentage_24h_usd > 0 ? (
        <div className="flex justify-center items-center text-xs">
          <span>
            {percentFormat.format(
              globalMarketData?.market_cap_change_percentage_24h_usd
            )}
          </span>
          <IncreaseValueIcon />
        </div>
      ) : (
        <div className="flex justify-center items-center text-xs">
          <span>
            {percentFormat.format(
              globalMarketData?.market_cap_change_percentage_24h_usd
            )}
          </span>
          <DecreaseValueIcon />
        </div>
      );
    }
  };

  const percentageBarBtc = `${
    globalMarketData
      ? percentageBarFormat.format(globalMarketData?.market_cap_percentage.btc)
      : "..."
  }%`;

  const percentageBarEth = `${
    globalMarketData
      ? percentageBarFormat.format(globalMarketData?.market_cap_percentage.eth)
      : "..."
  }%`;

  function isDevOrProd() {
    return process && process.env.NODE_ENV === "development" ? (
      <div className="absolute top-0 left-0 text-primary text-xs">DEV</div>
    ) : (
      <div className="absolute top-0 left-0 text-primary text-xs">PROD</div>
    );
  }

  return (
    <>
      <div className="flex text-white justify-center items-center gap-10 bg-accent w-full p-4 rounded-bl-md rounded-br-md relative">
        {isDevOrProd()}
        <div className="flex justify-center items-center gap-2">
          <AmountOfCoinsIcon />
          <span>Coins</span>
          <span>
            {globalMarketData
              ? globalMarketData.active_cryptocurrencies
              : "..."}
          </span>
          Next
        </div>
        <div className="flex justify-center items-center gap-2">
          <ExchangeMarketsIcon />
          <span>Exchange</span>
          {globalMarketData ? globalMarketData.markets : "..."}
        </div>
        <div className="flex justify-center items-center gap-2">
          {valueChanged()}
          {globalMarketData
            ? marketCapCurrencyFormat.format(
                globalMarketData.total_market_cap.usd /
                  numberToDivideMarketCapBy()
              )
            : "..."}
          {billionOrTrillionSymbol()}
        </div>
        <div className="flex justify-center items-center gap-2 text-sm">
          <BitcoinIcon />
          <span>
            {globalMarketData
              ? marketCapPercentageFormat.format(
                  globalMarketData?.market_cap_percentage.btc
                )
              : "..."}
            %
          </span>
          <div className="bg-[rgb(255,255,255,0.4)] w-[53px] h-[6px] rounded-full relative">
            <div
              className={`bg-[#f7931a] h-full rounded-full`}
              style={{ width: percentageBarBtc }}
            ></div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 text-sm">
          <EthereumIcon />
          {globalMarketData
            ? marketCapPercentageFormat.format(
                globalMarketData?.market_cap_percentage.eth
              )
            : "..."}
          %
          <div className="bg-[rgb(255,255,255,0.4)] w-[53px] h-[6px] rounded-full relative">
            <div
              className={`bg-[#5a7ff2] h-full rounded-full`}
              style={{ width: percentageBarEth }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}