import { configureStore } from "@reduxjs/toolkit";
import products from "store/slices/productsSlice";
import cart from "store/slices/cartSlice";
import coupons from "store/slices/couponsSlice";

export const store = configureStore({
  reducer: {
    products,
    cart,
    coupons,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
