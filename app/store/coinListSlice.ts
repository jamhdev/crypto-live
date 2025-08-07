import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const getCoinList = createAsyncThunk(
  "getCoinList",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const localStorageKey = "coinList";

    const storedCoinList = localStorage.getItem(localStorageKey);
    if (storedCoinList) {
      try {
        const parsedCoinList = JSON.parse(storedCoinList);
        return parsedCoinList;
      } catch (error) {
        console.error(error);
      }
    }

    const endpoint = "/coins/list";
    const response = await fetch(
      `/api/cg?endpoint=${encodeURIComponent(endpoint)}`
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem(localStorageKey, JSON.stringify(data));

    return data;
  }
);

export interface CoinList {
  id: string;
  symbol: string;
  name: string;
}

interface CoinListState {
  isLoading: boolean;
  data: CoinList[];
  error: boolean;
  lastFetched: number | null;
}

const initialState: CoinListState = {
  isLoading: false,
  data: [{ id: "", symbol: "", name: "" }],
  error: false,
  lastFetched: null,
};

export const coinList = createSlice({
  name: "coinList",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCoinList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCoinList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.lastFetched = Date.now();
    });
    builder.addCase(getCoinList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const {} = coinList.actions;

export default coinList.reducer;
