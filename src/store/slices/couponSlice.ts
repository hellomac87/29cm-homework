import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCoupons } from "data/coupons";
import { getProducts } from "data/productItems";
import type { AppDispatch, RootState } from "store";
import { CartItem } from "store/types/cart";
import { Coupon } from "store/types/coupon";

// Define a type for the slice state
interface Coupons {
  fetching: boolean;
  error: boolean;
  data: Coupon[];
}

// Define the initial state using that type
const initialState: Coupons = {
  fetching: false,
  error: false,
  data: [],
};

export const couponSlice = createSlice({
  name: "coupon",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fetching: (state, action: PayloadAction) => {
      state.fetching = true;
    },
    success: (state, action: PayloadAction<Coupon[]>) => {
      state.data = action.payload;
      state.fetching = false;
    },
    failure: (state, action) => {
      state.error = true;
      state.fetching = false;
    },
  },
});

export const { fetching, success, failure } = couponSlice.actions;

export const selectCoupon = (state: RootState) => state.cart;

export default couponSlice.reducer;

export const fetchCoupon = () => async (dispatch: AppDispatch) => {
  dispatch(couponSlice.actions.fetching());
  try {
    getCoupons().then((res) => {
      dispatch(couponSlice.actions.success(res));
    });
  } catch (e) {
    dispatch(couponSlice.actions.failure);
  }
};
