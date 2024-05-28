"use client";
import { AppContext } from "@/app/contexts/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import DarkNavSearchIcon from "./DarkNavSearchIcon.svg";
import LightNavSearchIcon from "./LightNavSearchIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { getCoinList } from "@/app/store/coinListSlice";
import { setSelectedCoinName } from "@/app/store/coinPageSlice";

export default function SearchDropDown() {
  const {
    theme,
    currentPage,
    setCurrentPage,
    isViewingCoinPage,
    setIsViewingCoinPage,
  } = useContext(AppContext);
  const [isFocused, setIsFocused] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const data = useSelector((state: RootState) => state.coinList.data);
  const [currentSelectedDropdownItem, setCurrentSelectedDropdownItem] =
    useState(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCoinList());
  }, [dispatch]);

  const filteredData = useMemo(() => {
    return searchInputValue.length > 0
      ? data
          .filter((value) =>
            value.name.toLowerCase().includes(searchInputValue.toLowerCase())
          )
          .slice(0, 10)
      : [];
  }, [searchInputValue, data]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setCurrentSelectedDropdownItem((prev) =>
          prev < filteredData.length - 1 ? prev + 1 : prev
        );
      } else if (event.key === "ArrowUp") {
        setCurrentSelectedDropdownItem((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (event.key === "Enter") {
        const selectedCoin = filteredData[currentSelectedDropdownItem];
        if (selectedCoin) {
          handleSelectCoin(selectedCoin.name);
          setTimeout(() => {
            setIsFocused(false);
          }, 200);
        }
      }
    };

    if (isFocused) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, currentSelectedDropdownItem, filteredData]);

  const handleSelectCoin = (coinName: string) => {
    if (currentPage === "portfolio" || currentPage === "converter") {
      setCurrentPage("home");
    }
    dispatch(
      setSelectedCoinName(coinName.toLowerCase().replace(" ", "-").trim())
    );
    if (!isViewingCoinPage) {
      setIsViewingCoinPage(true);
    }
  };

  const listItemStyles = (id: number) => {
    if (id === currentSelectedDropdownItem) {
      return "p-2 cursor-pointer bg-chartBackground border-2 border-highlightColor";
    } else {
      return "p-2 cursor-pointer hover:bg-chartBackground hover:border-2 hover:border-highlightColor";
    }
  };

  return (
    <div className="bg-backgroundSecondary rounded-lg p-2 flex justify-center items-center gap-1 relative">
      {theme === "dark" ? <DarkNavSearchIcon /> : <LightNavSearchIcon />}
      <input
        value={searchInputValue}
        autoComplete="off"
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        className="bg-transparent min-w-[300px] text-themeTextColor outline-none"
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setTimeout(() => setIsFocused(false), 100);
        }}
        onChange={(e) => {
          setSearchInputValue(e.target.value);
        }}
      />
      {isFocused && searchInputValue.length > 0 && (
        <div className="bg-backgroundSecondary absolute w-full top-10 border-t-[1px] border-gray-600 flex flex-col z-20 text-themeTextColor">
          {filteredData.map((value, index) => (
            <div
              tabIndex={0}
              className={listItemStyles(index)}
              key={value.id}
              onClick={() => {
                handleSelectCoin(value.name);
                setTimeout(() => {
                  setIsFocused(false);
                }, 200);
              }}
            >
              {value.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
