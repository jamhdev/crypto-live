import { AppContext } from "@/app/contexts/AppContext";
import React, { useContext } from "react";

export default function ColumnPriceItem({ price }: { price: number }) {
  const { currencyFormat } = useContext(AppContext);
  return (
    <div className="p-4 text-themeTextColorThird font-medium">
      {currencyFormat.format(price)}
    </div>
  );
}
