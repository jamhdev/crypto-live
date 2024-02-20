import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { marketData } from "@/mock-api/mock-db";
export const getMarketData = createAsyncThunk("getMarketData", async () => {
  if (process.env.NODE_ENV === "development") {
    return marketData;
  } else {
    const proxyUrl = "https://corsproxy.io/?";
    const targetUrl = "https://api.coingecko.com/api/v3/global";
    const response = await fetch(proxyUrl + targetUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  }
});

interface MarketDataState {
  isLoading: boolean;
  data: GlobalMarketDataType;
  error: boolean;
}

interface GlobalMarketDataType {
  active_cryptocurrencies: number;
  markets: number;
  total_market_cap: {
    usd: number;
  };
  market_cap_change_percentage_24h_usd: number;
  market_cap_percentage: {
    btc: number;
    eth: number;
  };
}

const initialState: MarketDataState = {
  isLoading: false,
  data: {
    active_cryptocurrencies: 0,
    markets: 0,
    total_market_cap: {
      usd: 0,
    },
    market_cap_change_percentage_24h_usd: 0,
    market_cap_percentage: {
      btc: 0,
      eth: 0,
    },
  },
  error: false,
};

export const marketDataNavSlice = createSlice({
  name: "marketData",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMarketData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getMarketData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getMarketData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const {} = marketDataNavSlice.actions;

export default marketDataNavSlice.reducer;
