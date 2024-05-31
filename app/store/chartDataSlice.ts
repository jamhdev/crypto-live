import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  coinDataPrices,
  coinDataPrices1dHourly,
  coindData,
} from "@/mock-api/mock-db";
import { RootState } from "./store";

export const getChartData = createAsyncThunk(
  "getChartData",
  async (currency: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const isFetchedYet = state.chartData.lastFetchedChartData === null;
    const moreThan5MinutesSinceLastFetch =
      state.chartData.lastFetchedChartData !== null &&
      Date.now() - state.chartData.lastFetchedChartData > 300000;
    const isNewCoinSelected =
      state.chartData.coinSelected !== state.chartData.coinData.id;

    const isDifferentCurrency = state.chartData.currentCurrency !== currency;

    if (
      isFetchedYet ||
      moreThan5MinutesSinceLastFetch ||
      isNewCoinSelected ||
      isDifferentCurrency
    ) {
      const { coinSelected, durationSelector } = state.chartData;
      const { name, days, interval } = getFetchDetails(
        coinSelected,
        durationSelector
      );

      const proxyUrl = "https://corsproxy.io/?";
      const targetUrl = `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`;
      const response = await fetch(proxyUrl + targetUrl);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      return { data, currency };
    } else {
      return {
        data: state.chartData.chartData,
        currency: state.chartData.currentCurrency,
      };
    }
  }
);

export const getChartDataOnDurationChange = createAsyncThunk(
  "getChartDataOnDurationChange",
  async (currency: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const isNewDuration =
      state.chartData.durationSelector !== state.chartData.prevDurationSelector;

    if (isNewDuration) {
      const { coinSelected, durationSelector } = state.chartData;
      const { name, days, interval } = getFetchDetails(
        coinSelected,
        durationSelector
      );
      const proxyUrl = "https://corsproxy.io/?";
      const targetUrl = `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`;
      const response = await fetch(proxyUrl + targetUrl);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      return { data, currency };
    } else {
      return {
        data: state.chartData.chartData,
        currency: state.chartData.currentCurrency,
      };
    }
  }
);

export const getCoinData = createAsyncThunk(
  "getCoinData",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const isFetchedYet = state.chartData.lastFetchedChartData === null;
    const moreThan5MinutesSinceLastFetch =
      state.chartData.lastFetchedChartData !== null &&
      Date.now() - state.chartData.lastFetchedChartData > 300000;
    const isNewCoinSelected =
      state.chartData.coinSelected !== state.chartData.prevCoinSelected;

    if (isFetchedYet || moreThan5MinutesSinceLastFetch || isNewCoinSelected) {
      const coinSelected = state.chartData.coinSelected;
      const proxyUrl = "https://corsproxy.io/?";
      const targetUrl = `https://api.coingecko.com/api/v3/coins/${coinSelected}?x_cg_demo_api_key=CG-feKTBnbFHDQBTa8xeXnnvWpW`;
      const response = await fetch(proxyUrl + targetUrl);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      return data;
    } else {
      return state.chartData.coinData;
    }
  }
);

interface ChartDataState {
  isLoading: boolean;
  chartData: ChartData | { prices: []; total_volumes: []; market_caps: [] };
  coinData: CoinData | { id: string };
  error: boolean;
  lastFetchedCoinData: number | null;
  lastFetchedChartData: number | null;
  coinSelected: string;
  durationSelector: durationOption;
  prevCoinSelected: string;
  prevDurationSelector: durationOption;
  currentCurrency: string | null;
}

const initialState: ChartDataState = {
  isLoading: true,
  chartData: { prices: [], total_volumes: [], market_caps: [] },
  coinData: { id: "" },
  error: false,
  lastFetchedCoinData: null,
  lastFetchedChartData: null,
  coinSelected: "bitcoin",
  durationSelector: "1M",
  prevCoinSelected: "bitcoin",
  prevDurationSelector: "1M",
  currentCurrency: null,
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
  name: "chartData",
  initialState: initialState,
  reducers: {
    setCoinSelected: (state, action: PayloadAction<string>) => {
      state.prevCoinSelected = state.coinSelected;
      state.coinSelected = action.payload;
    },
    setDurationSelector: (state, action: PayloadAction<durationOption>) => {
      state.prevDurationSelector = state.durationSelector;
      state.durationSelector = action.payload;
    },
    setCurrentCurrency: (state, action: PayloadAction<string>) => {
      state.currentCurrency = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getChartData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChartData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chartData = action.payload.data;
      state.currentCurrency = action.payload.currency;
      state.lastFetchedChartData = Date.now();
    });
    builder.addCase(getChartData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(getChartDataOnDurationChange.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChartDataOnDurationChange.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chartData = action.payload.data;
      state.currentCurrency = action.payload.currency;
      state.lastFetchedChartData = Date.now();
    });
    builder.addCase(getChartDataOnDurationChange.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(getCoinData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCoinData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.coinData = action.payload;
      state.lastFetchedCoinData = Date.now();
    });
    builder.addCase(getCoinData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const { setDurationSelector, setCoinSelected, setCurrentCurrency } =
  homeChartDataSlice.actions;

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

const getFetchDetails = (
  coinSelected: string,
  durationSelector: durationOption
) => {
  let name;
  let days;
  let interval = "&interval=daily";
  switch (durationSelector) {
    case "1D":
      name = coinSelected;
      days = 1;
      interval = "";
      break;
    case "7D":
      name = coinSelected;
      days = 7;
      interval = "";
      break;
    case "14D":
      name = coinSelected;
      days = 14;
      interval = "";
      break;
    case "1M":
      name = coinSelected;
      days = 30;
      interval = "";
      break;
    case "1Y":
      name = coinSelected;
      days = 360;
      interval = "";
      break;
  }
  return { name, days, interval };
};
