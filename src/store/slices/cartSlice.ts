import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "data/productItems";
import type { AppDispatch, RootState } from "store";
import { Product } from "store/types/products";

// Define a type for the slice state
interface CartState {
  fetching: boolean;
  error: boolean;
  data: Product[];
}

// Define the initial state using that type
const initialState: CartState = {
  fetching: false,
  error: false,
  data: [],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fetching: (state, action: PayloadAction) => {
      state.fetching = true;
    },
    success: (state, action: PayloadAction<Product[]>) => {
      state.data = [];
      state.fetching = false;
    },
    failure: (state, action) => {
      state.error = true;
      state.fetching = false;
    },
  },
});

export const { fetching, success, failure } = cartSlice.actions;

export const selectCart = (state: RootState) => state.products;

export default cartSlice.reducer;

export const fetchCart = () => async (dispatch: AppDispatch) => {
  dispatch(cartSlice.actions.fetching());
  try {
    getProducts().then((res) => {
      dispatch(cartSlice.actions.success(res));
    });
  } catch (e) {
    dispatch(cartSlice.actions.failure);
  }
};
