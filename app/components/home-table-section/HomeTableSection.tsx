"use client";
import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import HomeTableItem7dGraph from "./HomeTableItem7dGraph";
import ColumnRowNumberItem from "./column-components/ColumnRowNumberItem";
import ColumnNameItem from "./column-components/ColumnNameItem";
import ColumnPriceItem from "./column-components/ColumnPriceItem";
import Column1HourItem from "./column-components/Column1HourItem";
import Column24HourItem from "./column-components/Column24HourItem";
import Column7DayItem from "./column-components/Column7DayItem";
import Column24HourVolumeItem from "./column-components/Column24HourVolumeItem";
import ColumnCirculatingSupplyItem from "./column-components/ColumnCirculatingSupplyItem";

import IncreaseValueIcon from "../market-data-nav/IncreaseValueIcon.svg";
import DecreaseValueIcon from "../market-data-nav/DecreaseValueIcon.svg";

export default function HomeTableSection() {
  const [allCoinsData, setAllCoinsData] = useState<CoinData[] | []>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = [
    {
      header: "#",
      minWidth: 30,
      maxWidth: 100,
      size: 50,
      cell: (props: any) => {
        return <ColumnRowNumberItem rowIndex={props.row.index + 1} />;
      },
    },
    {
      accessorKey: "id",
      header: "Name",
      minWidth: 150,
      maxWidth: 300,
      size: 250,
      cell: (props: any) => {
        const { image, name, symbol } = props.row.original;
        return <ColumnNameItem image={image} name={name} symbol={symbol} />;
      },
    },
    {
      accessorKey: "current_price",
      header: "Price",
      minWidth: 150,
      maxWidth: 300,
      size: 120,
      cell: (props: any) => {
        return <ColumnPriceItem price={props.getValue()} />;
      },
    },
    {
      accessorKey: "price_change_percentage_1h_in_currency",
      header: "1h",
      minWidth: 150,
      maxWidth: 300,
      size: 120,
      cell: (props: any) => <Column1HourItem value={props.getValue()} />,
    },
    {
      accessorKey: "price_change_percentage_24h_in_currency",
      header: "24h",
      minWidth: 150,
      maxWidth: 300,
      size: 120,
      cell: (props: any) => <Column24HourItem value={props.getValue()} />,
    },
    {
      accessorKey: "price_change_percentage_7d_in_currency",
      header: "7d",
      minWidth: 150,
      maxWidth: 300,
      size: 120,
      cell: (props: any) => <Column7DayItem value={props.getValue()} />,
    },
    {
      header: "24h Volume / Cap",
      minWidth: 150,
      maxWidth: 400,
      size: 230,
      cell: (props: any) => {
        const volume = props.row.original.total_volume;
        const marketCap = props.row.original.market_cap;
        const percentageBar24HVolume = `${(volume / marketCap) * 100}%`;
        return (
          <Column24HourVolumeItem
            volume={volume}
            marketCap={marketCap}
            percentageBar24HVolume={percentageBar24HVolume}
          />
        );
      },
    },
    {
      header: "Ciruculating / Supply",
      minWidth: 150,
      maxWidth: 400,
      size: 230,
      cell: (props: any) => {
        const circulatingSupply = props.row.original.circulating_supply;
        const totalSupply = props.row.original.total_supply;
        const percentageBarCirculatingSupply = `${
          (circulatingSupply / totalSupply) * 100
        }%`;
        return (
          <ColumnCirculatingSupplyItem
            circulatingSupply={circulatingSupply}
            totalSupply={totalSupply}
            percentageBarCirculatingSupply={percentageBarCirculatingSupply}
          />
        );
      },
    },
    {
      header: "Last 7d",
      minWidth: 150,
      maxWidth: 400,
      size: 150,
      cell: (props: any) => {
        const row = props.row.original;
        const prices = row.sparkline_in_7d.price;
        return <HomeTableItem7dGraph prices={prices} />;
      },
    },
  ];

  const table = useReactTable({
    data: allCoinsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
        );
        if (!response.ok) {
          throw new Error("Error fetching table data");
        }
        const json = await response.json();
        setAllCoinsData(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!allCoinsData || allCoinsData.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div
        className="text-themeTextColor min-w-full p-10"
        style={{ width: table.getTotalSize() }}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className="flex py-4">
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                style={{ width: header.getSize() }}
                className="px-1"
              >
                <div
                  onClick={header.column.getToggleSortingHandler()}
                  className={`
                    ${
                      header.column.getCanSort()
                        ? "cursor-pointer"
                        : "cursor-default"
                    }
                      flex justify-center items-center border-b-4 border-t-4 border-primary py-4 rounded-lg`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() ? (
                    header.column.getIsSorted() === "desc" ? (
                      <IncreaseValueIcon />
                    ) : (
                      <DecreaseValueIcon />
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
        {table.getRowModel().rows.map((row, index) => (
          <div
            key={row.id}
            className="flex bg-primary py-4 rounded-lg mb-2 items-center"
          >
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id} style={{ width: cell.column.getSize() }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
