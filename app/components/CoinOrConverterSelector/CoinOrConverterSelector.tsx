import { AppContext } from "@/app/contexts/AppContext";
import React, { useContext } from "react";

const standardStyles =
  "flex-grow h-full rounded-lg flex justify-center items-center text-themeTextColor";

const selectedStyles =
  "flex-grow h-full rounded-lg flex justify-center items-center text-themeTextColor bg-accent shadow-[inset_0_0_5px_rgb(0,0,0,0.3)]";

export default function CoinOrConverterSelector() {
  const { coinsOrConverterSelector, setCoinsOrConverterSelector } =
    useContext(AppContext);

  return (
    <>
      <div className="flex p-10 self-start m-auto md:m-0">
        <div className="w-[506px] h-[53px] bg-backgroundSecondary rounded-lg flex justify-between items-center cursor-pointer">
          <div
            className={
              coinsOrConverterSelector === "coins"
                ? selectedStyles
                : standardStyles
            }
            onClick={() => {
              setCoinsOrConverterSelector("coins");
            }}
          >
            Coins
          </div>
          <div
            className={
              coinsOrConverterSelector === "converter"
                ? selectedStyles
                : standardStyles
            }
            onClick={() => {
              setCoinsOrConverterSelector("converter");
            }}
          >
            Converter
          </div>
        </div>
      </div>
    </>
  );
}
