import { currencyFormat } from "@/app/utils/numberFormatting";
import React from "react";

export default function ColumnPriceItem({ price }: { price: number }) {
  return (
    <div className="p-4 text-themeTextColorThird font-medium">
      {currencyFormat.format(price)}
    </div>
  );
}
