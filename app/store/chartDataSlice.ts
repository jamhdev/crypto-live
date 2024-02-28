import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  coinDataPrices,
  coinDataPrices1dHourly,
  coindData,
} from "@/mock-api/mock-db";

export const getChartData = createAsyncThunk(
  "getChartData",
  async ({
    name,
    currency,
    days,
    interval,
  }: {
    name: string;
    currency: string;
    days: number;
    interval: string;
  }) => {
    const proxyUrl = "https://corsproxy.io/?";
    const targetUrl = `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`;
    const response = await fetch(proxyUrl + targetUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

export const getCoinData = createAsyncThunk(
  "getCoinData",
  async (name: string) => {
    const proxyUrl = "https://corsproxy.io/?";
    const targetUrl = `https://api.coingecko.com/api/v3/coins/${name}`;
    const response = await fetch(proxyUrl + targetUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  }
);

interface ChartDataState {
  isLoading: boolean;
  chartData: ChartData | { prices: []; total_volumes: []; market_caps: [] };
  coinData: CoinData | {};
  error: boolean;
}

const initialState: ChartDataState = {
  isLoading: false,
  chartData: { prices: [], total_volumes: [], market_caps: [] },
  coinData: {},
  error: false,
};

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  description: string;
  links: string;
  image: string;
}

interface ChartData {
  prices: Array<number[]>;
  market_caps: Array<number[]>;
  total_volumes: Array<number[]>;
}

export const homeChartDataSlice = createSlice({
  name: "tableData",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getChartData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChartData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chartData = action.payload;
    });
    builder.addCase(getChartData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(getCoinData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCoinData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.coinData = action.payload;
    });
    builder.addCase(getCoinData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const {} = homeChartDataSlice.actions;

export default homeChartDataSlice.reducer;

const filterDataByDuration = (data: any, duration: number): [] | null => {
  return data?.filter((_: any, index: number) => index > 361 - duration);
};

const setDurationFilteredCoinDataPrices = (
  prices: [] | null,
  volumes: [] | null,
  durationSelector: durationOption
) => {
  let duration = 0;

  switch (durationSelector) {
    case "1D":
      duration = 1;
      break;
    case "7D":
      duration = 8;
      break;
    case "14D":
      duration = 15;
      break;
    case "1M":
      duration = 31;
      break;
    case "1Y":
      duration = 365;
      break;
    default:
      duration = 31;
  }

  return {
    prices: filterDataByDuration(prices, duration),
    volumes: filterDataByDuration(volumes, duration),
  };
};
