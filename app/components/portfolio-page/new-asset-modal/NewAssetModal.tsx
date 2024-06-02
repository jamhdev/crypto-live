import React, { SetStateAction, useContext, useEffect, useRef } from "react";
import DownArrowIconLight from "./DownArrowIconLight.svg";
import DownArrowIconDark from "./DownArrowIconDark.svg";
import ExitIconLight from "./ExitIconLight.svg";
import ExitIconDark from "./ExitIconDark.svg";
import { AppContext } from "@/app/contexts/AppContext";
import NewAssetSelectCoinDropDown from "../NewAssetSelectCoinDropDown";
import { NewAssetModalData } from "../PortfolioInterfaces";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NewAssetModal({
  setAddingAsset,
  newAssetModalData,
  setNewAssetModalData,
  personalAssetData,
  setPersonalAssetData,
}: {
  setAddingAsset: React.Dispatch<React.SetStateAction<boolean>>;
  newAssetModalData: NewAssetModalData;
  setNewAssetModalData: React.Dispatch<React.SetStateAction<NewAssetModalData>>;
  personalAssetData: any;
  setPersonalAssetData: React.Dispatch<SetStateAction<any>>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(AppContext);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        modalRef.current !== null &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setAddingAsset(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleSaveAndContinue = async (
    date: Date,
    name: string,
    amount: number
  ) => {
    const dateString = `${date?.getDate()}-${
      date?.getMonth() + 1
    }-${date?.getFullYear()}`;
    const proxyUrl = "https://corsproxy.io/?";
    const fetchUrl = `https://api.coingecko.com/api/v3/coins/${name.toLowerCase()}/history?date=${dateString}`;
    const response = await fetch(proxyUrl + fetchUrl);
    const json = await response.json();
    if (response.ok) {
      setPersonalAssetData((prev: any) => {
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            amount: amount,
            dataDate: date,
            coinData: json,
          },
        ];
      });
    } else {
      throw Error("Error setting asset. Please try again later.");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAssetModalData((prev) => {
      return {
        ...prev,
        purchasedAmount: Number(e.target.value),
      };
    });
  };

  const handleDateChange = (date: Date) => {
    setNewAssetModalData((prev) => ({
      ...prev,
      purchasedDate: date,
    }));
  };

  const handleAddingAsset = () => {
    handleSaveAndContinue(
      newAssetModalData.purchasedDate as Date,
      newAssetModalData.coinName,
      newAssetModalData.purchasedAmount as number
    );
    setAddingAsset(false);
  };

  const oneYearAgo = new Date();
  oneYearAgo.setDate(new Date().getDate() - 365);

  return (
    <>
      <div className="fixed inset-0 w-screen h-screen flex justify-center items-center z-50">
        <div className="w-full h-full backdrop-blur-[4px] z-10"></div>
        <div
          className="fixed flex flex-col p-10 w-full sm:w-[500px] md:w-[600px] lg:w-[886px] bg-background z-50 rounded-lg border-2 border-primary"
          ref={modalRef}
        >
          <div className="flex justify-between mb-10">
            <div className="text-xl">Select Coins</div>
            <div
              className="hover:scale-105 transition-all cursor-pointer"
              onClick={() => {
                setAddingAsset(false);
              }}
            >
              {theme === "light" ? <ExitIconDark /> : <ExitIconLight />}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-1/3 h-[178px] flex-col gap-2 justify-center items-center bg-chartBackground mr-6 rounded-lg hidden lg:flex">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png"
                alt="Example coin image"
                width={64}
                className="opacity-50"
              />
              <div className="font-semibold text-2xl">Bitcoin (BTC)</div>
            </div>
            <div className="w-2/3 flex-grow flex flex-col gap-2">
              <div className="bg-primary rounded-lg flex gap-2">
                <NewAssetSelectCoinDropDown
                  newAssetModalData={newAssetModalData}
                  setNewAssetModalData={setNewAssetModalData}
                />
              </div>
              <div className="bg-primary rounded-lg p-2 flex gap-2 ">
                <input
                  type="number"
                  className="h-full w-full bg-inherit outline-none"
                  placeholder="Purchased amount"
                  value={newAssetModalData.purchasedAmount as number}
                  onChange={handleAmountChange}
                />
              </div>
              <div className="bg-primary rounded-lg p-2 flex gap-2">
                <DatePicker
                  className="bg-inherit text-themeTextColor outline-none w-full"
                  selected={newAssetModalData.purchasedDate}
                  onChange={handleDateChange}
                  maxDate={new Date()}
                  minDate={oneYearAgo}
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <div
                  className="bg-gradient-to-b from-transparent to-transparent p-[1px] rounded-lg w-1/2 hover:scale-105 transition-all hover:from-selectedGradient"
                  onClick={() => {
                    setAddingAsset(false);
                  }}
                >
                  <div className="flex justify-center items-center bg-primary rounded-lg p-2 hover:bg-highlightColor cursor-pointer text-sm">
                    Cancel
                  </div>
                </div>
                <div
                  className="bg-gradient-to-b from-transparent to-transparent p-[1px] rounded-lg w-1/2 hover:scale-105 transition-all hover:from-selectedGradient"
                  onClick={handleAddingAsset}
                >
                  <div className="flex justify-center items-center bg-primary rounded-lg p-2 hover:bg-highlightColor cursor-pointer text-sm">
                    <div className="sm:hidden">Save</div>
                    <div className="hidden sm:inline">Save and Continue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
