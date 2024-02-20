"use client";
import { useEffect } from "react";
import AmountOfCoinsIcon from "./AmountOfCoinsIcon.svg";
import ExchangeMarketsIcon from "./ExchangeMarketsIcon.svg";
import BitcoinIcon from "./BitcoinIcon.svg";
import EthereumIcon from "./EthereumIcon.svg";
import IncreaseValueIcon from "./IncreaseValueIcon.svg";
import DecreaseValueIcon from "./DecreaseValueIcon.svg";
import {
  marketCapCurrencyFormat,
  percentFormat,
  marketCapPercentageFormat,
  percentageBarFormat,
} from "@/app/utils/numberFormatting";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { getMarketData } from "@/app/store/marketDataNavSlice";
import LoadingCircleLine from "@/public/LoadingCircleLineSvg.svg";

export default function MarketDataNav() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.marketData
  );

  useEffect(() => {
    dispatch(getMarketData());
  }, [dispatch]);

  const numberToDivideMarketCapBy = () => {
    if (data) {
      return data?.total_market_cap?.usd > 9_999_999_999
        ? 1_000_000_000_000
        : 1_000_000_000;
    }
    return 1_000_000_000_000;
  };

  const billionOrTrillionSymbol = () => {
    if (data) {
      return data?.total_market_cap?.usd > 9_999_999_999 ? "T" : "B";
    }
    return "T";
  };

  const valueChanged = () => {
    if (data) {
      return data?.market_cap_change_percentage_24h_usd > 0 ? (
        <div className="flex justify-center items-center text-xs">
          <span>
            {percentFormat.format(data?.market_cap_change_percentage_24h_usd)}
          </span>
          <IncreaseValueIcon />
        </div>
      ) : (
        <div className="flex justify-center items-center text-xs">
          <span>
            {percentFormat.format(data?.market_cap_change_percentage_24h_usd)}
          </span>
          <DecreaseValueIcon />
        </div>
      );
    }
  };

  const percentageBarBtc = `${
    data ? percentageBarFormat.format(data?.market_cap_percentage?.btc) : "..."
  }%`;

  const percentageBarEth = `${
    data ? percentageBarFormat.format(data?.market_cap_percentage?.eth) : "..."
  }%`;

  function isDevOrProd() {
    return process && process.env.NODE_ENV === "development" ? (
      <div className="absolute top-0 left-0 text-primary text-xs">DEV</div>
    ) : (
      <div className="absolute top-0 left-0 text-primary text-xs">PROD</div>
    );
  }

  if (isLoading)
    return (
      <div className="flex text-white justify-center items-center gap-10 bg-accent w-full p-4 rounded-bl-md rounded-br-md relative">
        <LoadingCircleLine />
      </div>
    );
  if (error)
    return (
      <div className="flex text-white justify-center items-center gap-10 bg-accent w-full p-4 rounded-bl-md rounded-br-md relative">
        <div>Error loading market data</div>
      </div>
    );

  return (
    <>
      <div className="flex text-white justify-center items-center gap-10 bg-accent w-full p-4 rounded-bl-md rounded-br-md relative">
        {isDevOrProd()}
        <div className="flex justify-center items-center gap-2">
          <AmountOfCoinsIcon />
          <span>Coins</span>
          <span>{data ? data?.active_cryptocurrencies : "..."}</span>
          Next
        </div>
        <div className="flex justify-center items-center gap-2">
          <ExchangeMarketsIcon />
          <span>Exchange</span>
          {data ? data?.markets : "..."}
        </div>
        <div className="flex justify-center items-center gap-2">
          {valueChanged()}
          {data
            ? marketCapCurrencyFormat.format(
                data?.total_market_cap?.usd / numberToDivideMarketCapBy()
              )
            : "..."}
          {billionOrTrillionSymbol()}
        </div>
        <div className="flex justify-center items-center gap-2 text-sm">
          <BitcoinIcon />
          <span>
            {data
              ? marketCapPercentageFormat.format(
                  data?.market_cap_percentage?.btc
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
          {data
            ? marketCapPercentageFormat.format(data?.market_cap_percentage?.eth)
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
