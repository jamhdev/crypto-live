"use client";
import { useEffect, useState } from "react";
import HomeTableItem from "./HomeTableItem";

export default function HomeTableSection() {
  const [allCoinsData, setAllCoinsData] = useState<CoinData[] | []>([]);

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

  const columns = [
    "#",
    "Name",
    "Price",
    "1h%",
    "24h%",
    "7d%",
    "24h volume / Market Cap",
    "Circulating / Total supply",
    "Last 7d",
  ];
  return (
    <div className="p-10 text-themeTextColor">
      <div className="flex">
        {columns.map((value) => {
          return <div key={value}>{value}</div>;
        })}
      </div>
      {allCoinsData
        ? allCoinsData.map((value, index) => (
            <HomeTableItem key={value.id} {...value} index={index} />
          ))
        : false}
    </div>
  );
}
