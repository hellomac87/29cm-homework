import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "store";
import { getCoupons } from "data/coupons";
import { Coupon } from "store/types/coupon";

// Define a type for the slice state
interface CouponsState {
  fetching: boolean;
  error: boolean;
  data: Coupon[];
}

// Define the initial state using that type
const initialState: CouponsState = {
  fetching: false,
  error: false,
  data: [],
};

export const couponsSlice = createSlice({
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

export const { fetching, success, failure } = couponsSlice.actions;

export const selectCoupon = (state: RootState) => state.cart;

export default couponsSlice.reducer;

export const fetchCoupons = () => async (dispatch: AppDispatch) => {
  dispatch(couponsSlice.actions.fetching());
  try {
    getCoupons().then((res) => {
      dispatch(couponsSlice.actions.success(res));
    });
  } catch (e) {
    dispatch(couponsSlice.actions.failure);
  }
};
