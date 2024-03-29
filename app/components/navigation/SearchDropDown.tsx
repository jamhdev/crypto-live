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
  const { theme, toggleTheme, isViewingCoinPage, setIsViewingCoinPage } =
    useContext(AppContext);
  const [isfocused, setIsFocused] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const data = useSelector((state: RootState) => state.coinList.data);
  const [currentSelectedDropdownItem, setCurrentSelectedDropdownItem] =
    useState(0);

  const filteredData = useMemo(() => {
    return searchInputValue.length > 0
      ? data
          .filter((value) =>
            value.name.toLowerCase().includes(searchInputValue.toLowerCase())
          )
          .slice(0, 10)
      : [];
  }, [searchInputValue, data, currentSelectedDropdownItem]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCoinList());
  }, []);

  useEffect(() => {
    if (currentSelectedDropdownItem > filteredData.length) {
      setCurrentSelectedDropdownItem(0);
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
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
        dispatch(setSelectedCoinName(selectedCoin.name.toLowerCase()));
        setIsViewingCoinPage((prev) => !prev);
      }
    };

    if (isfocused) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isfocused, currentSelectedDropdownItem]);

  const listItemStyles = (id) => {
    if (id === currentSelectedDropdownItem) {
      return "p-2 cursor-pointer bg-chartBackground border-2 border-accent";
    } else {
      return "p-2 cursor-pointer";
    }
  };

  return (
    <>
      <div className="bg-backgroundSecondary rounded-lg p-2 flex justify-center items-center gap-1 relative rounded-br-none rounded-bl-none">
        {theme === "dark" ? <DarkNavSearchIcon /> : <LightNavSearchIcon />}
        <input
          value={searchInputValue}
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          className="bg-transparent min-w-[300px] text-themeTextColor"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsFocused(false);
            }, 400);
          }}
          onChange={(e) => {
            setSearchInputValue(e.target.value);
          }}
        />
        <div className="text-themeTextColor">{currentSelectedDropdownItem}</div>
        {isfocused === true ? (
          <>
            <div className="bg-backgroundSecondary absolute w-full top-10 border-t-[1px] border-gray-600 flex flex-col z-20 text-themeTextColor">
              {searchInputValue.length > 0
                ? filteredData.map((value, index) => (
                    <div
                      className={listItemStyles(index)}
                      key={value.id}
                      onClick={() => {
                        dispatch(setSelectedCoinName(value.name.toLowerCase()));
                        setIsViewingCoinPage((prev) => !prev);
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
