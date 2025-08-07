import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tableData } from "@/mock-api/mock-db";
import { RootState } from "./store";

export const getTableData = createAsyncThunk(
  "getTableData",
  async (currency: string = "usd", thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const isFetchedYet = state.tableData.lastFetched === null;
    const moreThan5MinutesSinceLastFetch =
      state.tableData.lastFetched !== null &&
      Date.now() - state.tableData.lastFetched > 300000;
    const isDifferentCurrency = state.tableData.currentCurrency !== currency;

    if (isFetchedYet || moreThan5MinutesSinceLastFetch || isDifferentCurrency) {
      if (process.env.NODE_ENV === "development") {
        return { data: tableData, currency };
      } else {
        const endpoint = `/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
        const response = await fetch(
          `/api/cg?endpoint=${encodeURIComponent(endpoint)}`
        );
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        return { data, currency };
      }
    } else {
      return {
        data: state.tableData.data,
        currency: state.tableData.currentCurrency,
      };
    }
  }
);

interface TableDataState {
  isLoading: boolean;
  data: TableDataType[];
  error: boolean;
  lastFetched: number | null;
  currentCurrency: string | null;
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
  isLoading: true,
  data: [],
  error: false,
  lastFetched: null,
  currentCurrency: null,
};

export const tableDataSlice = createSlice({
  name: "tableData",
  initialState: initialState,
  reducers: {
    setCurrentCurrency: (state, action) => {
      state.currentCurrency = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getTableData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTableData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.currentCurrency = action.payload.currency;
      state.lastFetched = Date.now();
    });
    builder.addCase(getTableData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const { setCurrentCurrency } = tableDataSlice.actions;

export default tableDataSlice.reducer;
