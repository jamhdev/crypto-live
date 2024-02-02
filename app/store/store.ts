import { configureStore } from "@reduxjs/toolkit";
import testSlice from "./testSlice";
import marketDataNavSlice from "./marketDataNavSlice";

export const store = configureStore({
  reducer: {
    counter: testSlice,
    marketData: marketDataNavSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
