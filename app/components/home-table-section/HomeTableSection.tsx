"use client";
import { useContext, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { getTableData } from "@/app/store/tableDataSlice";
import LoadingCircleLine from "@/public/LoadingCircleLineSvg.svg";
import { AppContext } from "@/app/contexts/AppContext";

export default function HomeTableSection() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { currency, screenWidth } = useContext(AppContext);

  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.tableData
  );

  useEffect(() => {
    dispatch(getTableData(currency));
  }, [dispatch, currency]);

  const setColumns = () => {
    if (screenWidth < 600) {
      return [
        {
          accessorKey: "id",
          header: "Name",
          minWidth: 150,
          maxWidth: 300,
          size: 250,
          cell: (props: any) => {
            const { image, name, symbol, id } = props.row.original;
            return (
              <ColumnNameItem
                image={image}
                name={name}
                symbol={symbol}
                id={id}
              />
            );
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
      ];
    } else if (screenWidth < 800) {
      return [
        {
          accessorKey: "id",
          header: "Name",
          minWidth: 150,
          maxWidth: 300,
          size: 250,
          cell: (props: any) => {
            const { image, name, symbol, id } = props.row.original;
            return (
              <ColumnNameItem
                image={image}
                name={name}
                symbol={symbol}
                id={id}
              />
            );
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
      ];
    } else if (screenWidth < 1000) {
      return [
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
            const { image, name, symbol, id } = props.row.original;
            return (
              <ColumnNameItem
                image={image}
                name={name}
                symbol={symbol}
                id={id}
              />
            );
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
      ];
    } else if (screenWidth < 1200) {
      return [
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
            const { image, name, symbol, id } = props.row.original;
            return (
              <ColumnNameItem
                image={image}
                name={name}
                symbol={symbol}
                id={id}
              />
            );
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
    } else if (screenWidth < 1400) {
      return [
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
            const { image, name, symbol, id } = props.row.original;
            return (
              <ColumnNameItem
                image={image}
                name={name}
                symbol={symbol}
                id={id}
              />
            );
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
            const row = props.row.original;
            const prices = row.sparkline_in_7d.price;
            return (
              <Column24HourVolumeItem
                volume={volume}
                marketCap={marketCap}
                percentageBar24HVolume={percentageBar24HVolume}
                prices={prices}
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
    } else {
      return [
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
            const { image, name, symbol, id } = props.row.original;
            return (
              <ColumnNameItem
                image={image}
                name={name}
                symbol={symbol}
                id={id}
              />
            );
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
            const row = props.row.original;
            const prices = row.sparkline_in_7d.price;
            return (
              <Column24HourVolumeItem
                volume={volume}
                marketCap={marketCap}
                percentageBar24HVolume={percentageBar24HVolume}
                prices={prices}
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
            const row = props.row.original;
            const prices = row.sparkline_in_7d.price;
            return (
              <ColumnCirculatingSupplyItem
                circulatingSupply={circulatingSupply}
                totalSupply={totalSupply}
                percentageBarCirculatingSupply={percentageBarCirculatingSupply}
                prices={prices}
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
    }
  };
  const columns = setColumns();

  const table = useReactTable({
    data: data,
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

  if (isLoading)
    return (
      <div className="flex flex-col min-w-full p-10 relative mt-10">
        <div className="flex flex-col text-themeTextColor w-full items-center rounded-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <div
              key={headerGroup.id}
              className="flex p-3 pb-6 absolute top-0 left-10"
            >
              {headerGroup.headers.map((header) => (
                <div
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="px-1"
                >
                  <div className={`flex items-center text-themeTextColor`}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="flex justify-center items-center border-4 border-highlightColor w-full py-4 rounded-lg mb-2 h-[76px] mt-6">
            <LoadingCircleLine />
          </div>
          <div className="flex justify-center items-center border-4 border-highlightColor w-full py-4 rounded-lg mb-2 h-[76px]">
            <LoadingCircleLine />
          </div>
          <div className="flex justify-center items-center border-4 border-highlightColor w-full py-4 rounded-lg mb-2 h-[76px]">
            <LoadingCircleLine />
          </div>
          <div className="flex justify-center items-center border-4 border-highlightColor w-full py-4 rounded-lg mb-2 h-[76px]">
            <LoadingCircleLine />
          </div>
          <div className="flex justify-center items-center border-4 border-highlightColor w-full py-4 rounded-lg mb-2 h-[76px]">
            <LoadingCircleLine />
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col p-10 relative mt-10">
        <div className="flex justify-center items-center border-4 border-highlightColor w-full py-40 rounded-lg mb-2 h-[76px] mt-6">
          Error loading table data
        </div>
      </div>
    );

  return (
    <>
      <div
        className="text-themeTextColor p-10 xl:min-w-full"
        style={{ width: table.getTotalSize() }}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className="flex p-3 pb-6">
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
                      flex items-center text-themeTextColor`}
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
            className="flex bg-primary py-4 rounded-lg mb-2 items-center h-[76px]"
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
