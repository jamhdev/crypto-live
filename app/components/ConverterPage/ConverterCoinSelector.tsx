import { RootState } from "@/app/store/store";
import { currencyFormat } from "@/app/utils/numberFormatting";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ConverterInputData } from "./ConverterPage";

export default function ConverterCoinSelector({
  coinData,
  setCoinData,
  otherCoinData,
  setOtherCoinData,
  converterChartDurationSelector,
}: {
  coinData: ConverterInputData;
  setCoinData: React.Dispatch<React.SetStateAction<ConverterInputData>>;
  otherCoinData: ConverterInputData;
  setOtherCoinData: React.Dispatch<React.SetStateAction<ConverterInputData>>;
  converterChartDurationSelector: durationOption;
}) {
  const [isCoinNameFocused, setIsCoinNameFocused] = useState<boolean>(false);
  const [isCoinAmountFocused, setIsCoinAmountFocused] =
    useState<boolean>(false);

  const initialFetch = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinData?.name}`
    );
    const data = await response.json();
    setCoinData((prev: ConverterInputData) => {
      return {
        ...prev,
        data: data,
        name: `${data?.id?.charAt(0)?.toUpperCase()}${data?.id?.slice(
          1
        )} (${data?.symbol?.toUpperCase()})`,
      };
    });
  };

  const chartDataFetch = async () => {
    const { name, currency, days, interval } = getFetchDetails(
      coinData?.fetchName,
      converterChartDurationSelector
    );
    const proxyUrl = "https://corsproxy.io/?";
    const targetUrl = `https://api.coingecko.com/api/v3/coins/${name.toLowerCase()}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`;
    const response = await fetch(proxyUrl + targetUrl);
    const data = await response.json();
    setCoinData((prev: ConverterInputData) => {
      return { ...prev, coinChartData: data };
    });
  };

  useEffect(() => {
    initialFetch();
  }, []);

  useEffect(() => {
    chartDataFetch();
  }, [converterChartDurationSelector]);

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;

    if (parseFloat(inputVal) < 0) {
      setCoinData((prev: ConverterInputData) => ({ ...prev, amount: 0 }));
      return;
    }

    const newAmount = inputVal;
    setCoinData((prev: ConverterInputData) => ({
      ...prev,
      amount: parseFloat(newAmount),
    }));

    if (coinData.data && otherCoinData.data) {
      const currentPrice = coinData.data.market_data.current_price.usd;
      const otherPrice = otherCoinData.data.market_data.current_price.usd;
      const newOtherAmount =
        (parseFloat(newAmount) * currentPrice) / otherPrice;

      setOtherCoinData((prev: ConverterInputData) => ({
        ...prev,
        amount: parseFloat(newOtherAmount.toString()),
      }));
    }
  };

  return coinData.data !== null ? (
    <div className="flex flex-col w-full">
      <div className="flex w-full mt-2 items-center justify-center">
        <img src={coinData.data?.image?.small} alt="coin image" />
        <div className="relative w-full">
          <div className="flex gap-2">
            <input
              autoComplete="off"
              type="text"
              name="coin-text-input"
              className="appearance-none bg-transparent w-full p-2"
              value={coinData.name}
              onChange={(e) => {
                setCoinData((prev: ConverterInputData) => {
                  return { ...prev, name: e.target.value };
                });
              }}
              onFocus={() => {
                setIsCoinNameFocused(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setIsCoinNameFocused(false);
                }, 400);
              }}
            />
          </div>
          {isCoinNameFocused === true ? (
            coinData.name.length > 0 ? (
              <CoinSearchSelector
                coinData={coinData}
                isCoinNameFocused={isCoinNameFocused}
                isCoinAmountFocused={isCoinAmountFocused}
                setCoinData={setCoinData}
              />
            ) : (
              false
            )
          ) : (
            false
          )}
        </div>
        <input
          type="number"
          step={1}
          name=""
          className="appearance-none bg-transparent p-2"
          value={coinData.amount}
          onChange={handleAmountInputChange}
          onFocus={() => {
            setIsCoinAmountFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsCoinAmountFocused(false);
            }, 400);
          }}
        />
      </div>
      <div className="w-full h-[.5px] bg-themeTextColor m-2"></div>
      <div className="flex mb-5">
        <div className="font-light opacity-75">
          1 {coinData?.data?.symbol?.toUpperCase()} ={" "}
        </div>
        <div>
          $
          {currencyFormat
            .format(coinData?.data.market_data?.current_price?.usd)
            .toString()}
        </div>
      </div>
    </div>
  ) : (
    false
  );
}

function CoinSearchSelector({
  coinData,
  isCoinNameFocused,
  isCoinAmountFocused,
  setCoinData,
}: {
  coinData: ConverterInputData;
  isCoinNameFocused: boolean;
  isCoinAmountFocused: boolean;
  setCoinData: React.Dispatch<React.SetStateAction<ConverterInputData>>;
}) {
  const data = useSelector((state: RootState) => state.coinList.data);
  const [currentSelectedDropdownItem, setCurrentSelectedDropdownItem] =
    useState(0);
  const filteredData = useMemo(() => {
    return coinData?.name.length > 0
      ? data
          .filter((value) =>
            value?.name.toLowerCase().includes(coinData?.name.toLowerCase())
          )
          .slice(0, 10)
      : [];
  }, [coinData.name, data, currentSelectedDropdownItem]);

  const updateDataFetch = async (updatedName: string) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${updatedName}`
      );
      if (!response.ok) {
        console.error("Failed to fetch data: ", response.status);
        return;
      }

      const data = await response.json();
      setCoinData((prev: ConverterInputData) => ({
        ...prev,
        data: data,
        name: `${data?.id?.charAt(0)?.toUpperCase()}${data?.id?.slice(
          1
        )} (${data?.symbol?.toUpperCase()})`,
      }));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (currentSelectedDropdownItem > filteredData.length) {
      setCurrentSelectedDropdownItem(0);
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        if (event.shiftKey) {
          if (currentSelectedDropdownItem > 0) {
            setCurrentSelectedDropdownItem((prev) => prev - 1);
          }
        } else {
          if (currentSelectedDropdownItem < filteredData.length - 1) {
            setCurrentSelectedDropdownItem((prev) => prev + 1);
          }
        }
      } else if (event.key === "ArrowDown") {
        setCurrentSelectedDropdownItem((prev) => {
          if (prev === 9) {
            return 9;
          } else if (prev === filteredData.length - 1) {
            return filteredData.length - 1;
          } else {
            return prev + 1;
          }
        });
      } else if (event.key === "ArrowUp") {
        setCurrentSelectedDropdownItem((prev) => {
          if (prev === 0) {
            return 0;
          } else {
            return prev - 1;
          }
        });
      } else if (event.key === "Enter") {
        const selectedCoin = filteredData[currentSelectedDropdownItem];
        updateDataFetch(selectedCoin.name.toLowerCase());
      }
    };

    if (isCoinAmountFocused || isCoinNameFocused) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCoinAmountFocused, isCoinNameFocused, currentSelectedDropdownItem]);

  const listItemStyles = (id: number) => {
    if (id === currentSelectedDropdownItem) {
      return "p-2 cursor-pointer bg-chartBackground border-2 border-accent";
    } else {
      return "p-2 cursor-pointer hover:bg-chartBackground hover:border-2 hover:border-accent";
    }
  };

  return (
    <div className="bg-backgroundSecondary absolute w-full top-10 border-t-[1px] border-gray-600 flex flex-col z-20 text-themeTextColor">
      {filteredData.map((value, index) => (
        <div
          tabIndex={0}
          className={listItemStyles(index)}
          key={value.id}
          onClick={() => {
            updateDataFetch(value.name.toLowerCase());
          }}
        >
          {value.name}
        </div>
      ))}
    </div>
  );
}

const getFetchDetails = (
  coinSelected: string,
  durationSelector: durationOption
) => {
  let name;
  let currency;
  let days;
  let interval = "&interval=daily";
  switch (durationSelector) {
    case "1D":
      name = coinSelected;
      currency = "usd";
      days = 1;
      interval = "";
      break;
    case "7D":
      name = coinSelected;
      currency = "usd";
      days = 7;
      interval = "";
      break;
    case "14D":
      name = coinSelected;
      currency = "usd";
      days = 14;
      interval = "";
      break;
    case "1M":
      name = coinSelected;
      currency = "usd";
      days = 30;
      interval = "";
      break;
    case "1Y":
      name = coinSelected;
      currency = "usd";
      days = 360;
      interval = "";
      break;
  }
  return { name, currency, days, interval };
};