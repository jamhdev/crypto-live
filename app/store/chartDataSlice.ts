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
    console.log(data);
    return data;
  }
);

export const getCoinData = createAsyncThunk("getCoinData", async () => {
  const proxyUrl = "https://corsproxy.io/?";
  const targetUrl = "https://api.coingecko.com/api/v3/coins/bitcoin";
  const response = await fetch(proxyUrl + targetUrl);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data;
});

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

const setDurationFilteredCoinDataPrices = (
  prices: [] | null,
  volumes: [] | null,
  durationSelector: durationOption
) => {
  switch (durationSelector) {
    case "1D":
      return {
        prices: prices,
        volumes: volumes,
      };

    case "7D":
      return {
        prices: prices?.filter((_, index: number) => index > 361 - 8),
        volumes: volumes?.filter((_, index: number) => index > 361 - 8),
      };
    case "14D":
      return {
        prices: prices?.filter((_, index: number) => index > 361 - 15),
        volumes: volumes?.filter((_, index: number) => index > 361 - 15),
      };
    case "1M":
      return {
        prices: prices?.filter((_, index: number) => index > 361 - 31),
        volumes: volumes?.filter((_, index: number) => index > 361 - 31),
      };
    case "1Y":
      return {
        prices: prices,
        volumes: volumes,
      };
    default:
      return {
        prices: prices?.filter((_, index: number) => index > 361 - 31),
        volumes: volumes?.filter((_, index: number) => index > 361 - 31),
      };
  }
};
