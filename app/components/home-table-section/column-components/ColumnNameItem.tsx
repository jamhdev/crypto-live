import { AppContext } from "@/app/contexts/AppContext";
import { setSelectedCoinName } from "@/app/store/coinPageSlice";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";

export default function ColumnNameItem({
  image,
  name,
  symbol = "loading",
  id,
}: {
  image: string;
  name: string;
  symbol: string;
  id: string;
}) {
  const dispatch = useDispatch();
  const { isViewingCoinPage, setIsViewingCoinPage } = useContext(AppContext);
  return (
    <>
      <div
        className="flex items-center gap-4 p-4 cursor-pointer text-themeTextColorThird font-medium"
        onClick={() => {
          dispatch(setSelectedCoinName(id));
          setIsViewingCoinPage((prev) => !prev);
        }}
      >
        <img src={image} alt="Coin Image" width={32} height={32} />
        {name.charAt(0).toUpperCase()}
        {name.slice(1)}({symbol.toUpperCase()})
      </div>
    </>
  );
}
