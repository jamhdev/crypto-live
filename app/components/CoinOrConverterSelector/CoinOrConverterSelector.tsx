import { AppContext } from "@/app/contexts/AppContext";
import React, { useContext } from "react";

export default function CoinOrConverterSelector() {
  const { currentPage, setCurrentPage, theme } = useContext(AppContext);

  const standardStyles =
    "flex-grow h-full rounded-lg flex justify-center items-center text-themeTextColor bg-coinsOrConverterBackgroundColor";

  const selectedStyles =
    "flex-grow h-full rounded-lg flex justify-center items-center text-themeTextColor bg-highlightColor text-white font-medium";

  return (
    <>
      <div className="flex p-10 pb-0 self-start m-auto md:m-0">
        <div className="w-[506px] h-[53px] bg-coinsOrConverterBackgroundColor rounded-lg flex justify-between items-center cursor-pointer">
          <div
            className={
              currentPage === "home"
                ? "bg-gradient-to-b from-selectedGradient to-transparent p-[1px] rounded-lg flex-grow h-full"
                : "flex-grow h-full"
            }
          >
            <div
              className={
                currentPage === "home" ? selectedStyles : standardStyles
              }
              onClick={() => {
                setCurrentPage("home");
              }}
            >
              Coins
            </div>
          </div>
          <div
            className={
              currentPage === "converter"
                ? "bg-gradient-to-b from-selectedGradient to-transparent p-[1px] rounded-lg flex-grow h-full"
                : "flex-grow h-full"
            }
          >
            <div
              className={
                currentPage === "converter" ? selectedStyles : standardStyles
              }
              onClick={() => {
                setCurrentPage("converter");
              }}
            >
              Converter
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
