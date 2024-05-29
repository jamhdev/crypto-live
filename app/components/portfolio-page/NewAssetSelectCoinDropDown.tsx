"use client";
import { AppContext } from "@/app/contexts/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { NewAssetModalData } from "./PortfolioInterfaces";
export default function NewAssetSelectCoinDropDown({
  newAssetModalData,
  setNewAssetModalData,
}: {
  newAssetModalData: NewAssetModalData;
  setNewAssetModalData: React.Dispatch<React.SetStateAction<NewAssetModalData>>;
}) {
  const [isfocused, setIsFocused] = useState(false);
  const data = useSelector((state: RootState) => state.coinList.data);
  const [currentSelectedDropdownItem, setCurrentSelectedDropdownItem] =
    useState(0);

  const filteredData = useMemo(() => {
    return newAssetModalData.coinName.length > 0
      ? data
          .filter((value) =>
            value.name
              .toLowerCase()
              .includes(newAssetModalData.coinName.toLowerCase())
          )
          .slice(0, 10)
      : [];
  }, [newAssetModalData.coinName, data, currentSelectedDropdownItem]);

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
        setNewAssetModalData((prev) => {
          return {
            ...prev,
            coinName: selectedCoin.id.replace(" ", "-").trim(),
          };
        });
        setIsFocused(false);
      }
    };

    if (isfocused) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isfocused, currentSelectedDropdownItem]);

  const listItemStyles = (id: number) => {
    if (id === currentSelectedDropdownItem) {
      return "p-2 cursor-pointer bg-highlightColor";
    } else {
      return "p-2 cursor-pointer bg-primary hover:bg-highlightColor";
    }
  };

  return (
    <>
      <div
        className={
          isfocused === true
            ? "rounded-lg rounded-br-none rounded-bl-none flex justify-center items-center gap-1 relative w-full bg-inherit"
            : "rounded-lg flex justify-center items-center gap-1 relative w-full bg-inherit"
        }
      >
        <input
          value={newAssetModalData.coinName}
          autoComplete="off"
          type="text"
          name="search"
          id="search"
          placeholder="Select Coin"
          className="bg-inherit w-full text-themeTextColor outline-none m-2"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsFocused(false);
            }, 200);
          }}
          onChange={(e) => {
            setNewAssetModalData((prev) => {
              return {
                ...prev,
                coinName: e.target.value.replace(" ", "-").trim(),
              };
            });
          }}
        />
        {isfocused === true ? (
          <>
            <div className="bg-backgroundSecondary absolute w-full top-10 flex flex-col z-20 text-themeTextColor">
              {newAssetModalData.coinName.length > 0
                ? filteredData.map((value, index) => (
                    <div
                      tabIndex={0}
                      className={listItemStyles(index)}
                      key={value.id}
                      onClick={() => {
                        setNewAssetModalData((prev) => {
                          setIsFocused(false);
                          return { ...prev, coinName: value.id };
                        });
                      }}
                    >
                      {value.name}
                    </div>
                  ))
                : false}
            </div>
          </>
        ) : (
          false
        )}
      </div>
    </>
  );
}
