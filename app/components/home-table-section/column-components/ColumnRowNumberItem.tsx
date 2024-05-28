import React from "react";

export default function ColumnRowNumberItem({
  rowIndex,
}: {
  rowIndex: number;
}) {
  return (
    <>
      <div className="flex items-center gap-4 p-4 text-themeTextColor font-medium">
        {rowIndex}
      </div>
    </>
  );
}
