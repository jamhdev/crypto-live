import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tableData } from "@/mock-api/mock-db";
export const getTableData = createAsyncThunk("getTableData", async () => {
  if (process.env.NODE_ENV === "development") {
    return tableData;
  } else {
    const proxyUrl = "https://corsproxy.io/?";
    const targetUrl =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";
    const response = await fetch(proxyUrl + targetUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  }
});

interface TableDataState {
  isLoading: boolean;
  data: TableDataType[];
  error: boolean;
}

interface TableDataType {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: Roi | null;
  last_updated: string;
  sparkline_in_7d: SparklineIn7D;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

interface SparklineIn7D {
  price: number[];
}

interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

const initialState: TableDataState = {
  isLoading: false,
  data: [],
  error: false,
};

export const tableDataSlice = createSlice({
  name: "tableData",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTableData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTableData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getTableData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const {} = tableDataSlice.actions;

export default tableDataSlice.reducer;
