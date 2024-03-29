import { configureStore } from "@reduxjs/toolkit";
import marketDataNavSlice from "./marketDataNavSlice";
import tableDataSlice from "./tableDataSlice";
import homeChartDataSlice from "./chartDataSlice";
import coinPageSlice from "./coinPageSlice";
import chartDataSlice from "./chartDataSlice";
import coinListSlice from "./coinListSlice";

export const store = configureStore({
  reducer: {
    marketData: marketDataNavSlice,
    tableData: tableDataSlice,
    homeChartData: homeChartDataSlice,
    coinPageData: coinPageSlice,
    chartData: chartDataSlice,
    coinList: coinListSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
