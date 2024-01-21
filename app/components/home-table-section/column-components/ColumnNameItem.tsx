import React from "react";

export default function ColumnNameItem({
  image,
  name,
  symbol = "loading",
}: {
  image: string;
  name: string;
  symbol: string;
}) {
  return (
    <>
      <div className="flex items-center gap-4 p-4">
        <img src={image} alt="Coin Image" width={32} height={32} />
        {name.charAt(0).toUpperCase()}
        {name.slice(1)}({symbol.toUpperCase()})
      </div>
    </>
  );
}
