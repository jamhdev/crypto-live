import React, { useContext, useEffect, useState } from "react";

import VerticalSwitchDarkIcon from "./VerticalSwitchDarkIcon.svg";
import VerticalSwitchLightIcon from "./VerticalSwitchLightIcon.svg";
import { AppContext } from "@/app/contexts/AppContext";
import ConverterCoinSelector from "./ConverterCoinSelector";
import ConverterCoinsChart from "./ConverterCoinsChart";
import ConverterChartDurationSelector from "./ConverterChartDurationSelector";

export default function ConverterPage() {
  const { theme } = useContext(AppContext);
  const switchIcon =
    theme === "dark" ? <VerticalSwitchDarkIcon /> : <VerticalSwitchLightIcon />;
  const [firstCoinData, setFirstCoinData] = useState<any>({
    name: "bitcoin",
    fetchName: "bitcoin",
    amount: 1,
    data: null,
    isSecondCoin: false,
    coinChartData: null,
  });
  const [secondCoinData, setSecondCoinData] = useState<any>({
    name: "ethereum",
    fetchName: "ethereum",
    amount: 1,
    data: null,
    isSecondCoin: true,
    coinChartData: null,
  });
  const [converterChartDurationSelector, setConverterChartDurationSelector] =
    useState<durationOption>("7D");

  const onSwitchButtonClick = () => {
    setFirstCoinData((prev: any) => {
      const newFirst = { ...secondCoinData, isSecondCoin: false };
      setSecondCoinData({ ...prev, isSecondCoin: true });
      return newFirst;
    });
  };

  useEffect(() => {
    if (
      firstCoinData.data?.market_data?.current_price &&
      secondCoinData.data?.market_data?.current_price
    ) {
      const firstPrice = firstCoinData.data.market_data.current_price.usd;
      const secondPrice = secondCoinData.data.market_data.current_price.usd;
      const newOtherAmount = (firstCoinData.amount * firstPrice) / secondPrice;
      setSecondCoinData((prev: ConverterInputData) => ({
        ...prev,
        amount: newOtherAmount,
      }));
    }
  }, [firstCoinData.amount, firstCoinData.data, secondCoinData.data]);

  return (
    <div className="text-themeTextColorSecondary w-full flex flex-col justify-center items-center mt-10 mb-40">
      <div className="flex w-full justify-center items-center relative flex-col md:flex-row">
        <div className="basis-1/2 bg-chartBackground rounded-2xl text-themeTextColorSecondary flex flex-col items-center p-4 gap-4 w-full">
          <div className="w-full opacity-50 text-sm">You sell</div>
          <ConverterCoinSelector
            coinData={firstCoinData}
            otherCoinData={secondCoinData}
            setOtherCoinData={setSecondCoinData}
            setCoinData={setFirstCoinData}
            converterChartDurationSelector={converterChartDurationSelector}
          />
        </div>
        <div className="w-[15px] h-[15px]"></div>
        <div className="min-w-[46px] min-h-[46px] max-w-[46px] max-h-[46px] bg-background rounded-full flex justify-center items-center absolute"></div>
        <div
          className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] bg-themeTextColorSecondary rounded-full flex justify-center items-center absolute cursor-pointer transition-all hover:scale-110 z-10"
          onClick={onSwitchButtonClick}
        >
          {switchIcon}
        </div>
        <div
          className="basis-1/2 rounded-2xl text-themeTextColorSecondary flex flex-col items-center p-4 gap-4 w-full"
          style={
            theme === "dark"
              ? { backgroundColor: "#1e1932" }
              : { backgroundColor: "white" }
          }
        >
          <div className="w-full opacity-50 text-sm">You buy</div>
          <ConverterCoinSelector
            coinData={secondCoinData}
            otherCoinData={firstCoinData}
            setOtherCoinData={setFirstCoinData}
            setCoinData={setSecondCoinData}
            converterChartDurationSelector={converterChartDurationSelector}
          />
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-10  bg-chartBackground rounded-lg relative">
        <div className="hidden lg:block">
          <ConverterChartDurationSelector
            converterChartDurationSelector={converterChartDurationSelector}
            setConverterChartDurationSelector={
              setConverterChartDurationSelector
            }
          />
        </div>
        <ConverterCoinsChart
          firstCoinData={firstCoinData.data}
          secondCoinData={secondCoinData.data}
          firstCoinChartData={firstCoinData.coinChartData}
          secondCoinChartData={secondCoinData.coinChartData}
        />
      </div>
    </div>
  );
}

export interface ConverterInputData {
  name: string;
  fetchName: string;
  amount: number;
  data: ConverterCoinData | null;
  isSecondCoin: boolean;
  coinChartData: any | null;
}

export interface ConverterCoinData {
  id: string;
  symbol: string;
  name: string;
  image: Image;
  country_origin: string;
  genesis_date: Date;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: MarketData;
}

export interface Image {
  thumb: string;
  small: string;
  large: string;
}

export interface MarketData {
  current_price: { [key: string]: number };
}

export interface ConverterCoinChartData {
  prices: Array<number[]>;
  market_caps: Array<number[]>;
  total_volumes: Array<number[]>;
}
