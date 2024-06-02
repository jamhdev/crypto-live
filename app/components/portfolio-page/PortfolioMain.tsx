import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "../custom-hooks/useLocalStorage";
import NewAssetModal from "./new-asset-modal/NewAssetModal";
import AssetItem from "./AssetItem";
import {
  CurrentCoinData,
  NewAssetModalData,
  PersonalAssetData,
} from "./PortfolioInterfaces";
import { AppContext } from "@/app/contexts/AppContext";
import AssetItemMobile from "./portfolio-page-mobile/AssetItemMobile";

export default function PortfolioMain() {
  const [addingAsset, setAddingAsset] = useState<boolean>(false);
  const { screenWidth } = useContext(AppContext);
  const [personalAssetData, setPersonalAssetData] = useLocalStorage(
    "personalAssetData",
    []
  );
  const [currentAssetData, setCurrentAssetData] = useLocalStorage(
    "currentAssetData",
    {}
  );
  const [newAssetModalData, setNewAssetModalData] = useState<NewAssetModalData>(
    {
      coinName: "",
      purchasedAmount: 1,
      purchasedDate: new Date(),
    }
  );

  const handleDeleteAssetConfirm = (
    id: string,
    coinName: string,
    personalAssetData: PersonalAssetData[]
  ) => {
    let amountWithSameCoinName = 0;
    personalAssetData.forEach((value) => {
      if (value.coinData.id === coinName) amountWithSameCoinName++;
    });

    setPersonalAssetData((prev: PersonalAssetData[]) => {
      return prev.filter((value) => value.id !== id);
    });

    if (amountWithSameCoinName < 2) {
      setCurrentAssetData((prev: { [key: string]: CurrentCoinData }) => {
        const newObject = { ...prev };
        delete newObject[coinName];
        return newObject;
      });
    }
  };

  const fetchNewCurrentCoinData = async (name: string) => {
    const proxyUrl = "https://corsproxy.io/?";
    const fetchUrl = `https://api.coingecko.com/api/v3/coins/${name.toLowerCase()}`;
    try {
      const response = await fetch(proxyUrl + fetchUrl);
      if (response.ok) {
        const json = await response.json();
        return json;
      } else {
        console.error(`Failed to fetch data for ${name}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching data for ${name}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const updateCurrentAssetData = async () => {
      const newCurrentAssetData = { ...currentAssetData };
      for (const value of personalAssetData) {
        const coinName = value.coinData.id;
        if (!(coinName in newCurrentAssetData)) {
          const coinData = await fetchNewCurrentCoinData(coinName);
          if (coinData) {
            coinData.date_fetched = new Date().toISOString();
            newCurrentAssetData[coinName] = coinData;
          }
        }
      }
      setCurrentAssetData(newCurrentAssetData);
    };

    if (personalAssetData.length > 0) {
      updateCurrentAssetData();
    }
  }, [personalAssetData]);

  useEffect(() => {
    const reUpdateCurrentAssetData = async (coinName: string) => {
      const newCurrentAssetData = { ...currentAssetData };
      const coinData = await fetchNewCurrentCoinData(coinName);
      if (coinData) {
        coinData.date_fetched = new Date().toISOString();
        newCurrentAssetData[coinName] = coinData;
        setCurrentAssetData(newCurrentAssetData);
      }
    };

    const assetDataArray = Object.values(currentAssetData) as CurrentCoinData[];
    assetDataArray.forEach((value) => {
      const oldDate = new Date(value.date_fetched);
      const currentDate = new Date();
      if (
        oldDate.getDate() < currentDate.getDate() &&
        oldDate.getMonth() === currentDate.getMonth()
      ) {
        reUpdateCurrentAssetData(value.id);
      }
    });
  }, [currentAssetData]);

  const emptyPortfolioVisual = (
    <div className="text-themeTextColor w-full border-accent border-2 rounded-lg h-[216px] mt-10 flex justify-center items-center">
      <div className="opacity-50">Assets here</div>
    </div>
  );

  return (
    <div className="text-themeTextColor w-full px-10 py-10 flex items-center flex-col">
      {addingAsset && (
        <NewAssetModal
          setAddingAsset={setAddingAsset}
          newAssetModalData={newAssetModalData}
          setNewAssetModalData={setNewAssetModalData}
          personalAssetData={personalAssetData}
          setPersonalAssetData={setPersonalAssetData}
        />
      )}
      <div className="flex justify-between items-center w-full">
        <div className="text-3xl">Portfolio</div>
        <div className="bg-gradient-to-b from-selectedGradient to-transparent p-[1px] rounded-lg hover:scale-105 transition-all hidden xsm:block">
          <div
            className="bg-highlightColor w-[244px] h-[45px] rounded-lg justify-center items-center cursor-pointer font-bold flex"
            onClick={() => {
              setAddingAsset((prev) => !prev);
            }}
          >
            Add Asset
          </div>
        </div>
        <div className="fixed bottom-24 right-4 bg-gradient-to-b from-selectedGradient to-transparent p-[1px] rounded-full xsm:hidden hover:scale-105 transition-all">
          <div
            className="bg-highlightColor w-[45px] h-[45px] rounded-full flex justify-center items-center cursor-pointer font-bold"
            onClick={() => {
              setAddingAsset((prev) => !prev);
            }}
          >
            +
          </div>
        </div>
      </div>
      {personalAssetData.length < 1 ? emptyPortfolioVisual : null}
      <div className="my-10"></div>
      <div className="w-full flex flex-col gap-2">
        {personalAssetData.map((value: PersonalAssetData) => (
          <div>
            {screenWidth > 980 ? (
              <AssetItem
                key={value.id}
                value={value}
                currentAssetData={currentAssetData}
                personalAssetData={personalAssetData}
                handleDeleteAssetConfirm={handleDeleteAssetConfirm}
              />
            ) : (
              <AssetItemMobile
                key={value.id}
                value={value}
                currentAssetData={currentAssetData}
                personalAssetData={personalAssetData}
                handleDeleteAssetConfirm={handleDeleteAssetConfirm}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
