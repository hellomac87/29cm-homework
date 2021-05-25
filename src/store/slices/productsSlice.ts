import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "data/productItems";
import type { AppDispatch, RootState } from "store";
import { Product } from "store/types/products";

// Define a type for the slice state
interface ProductsState {
  fetching: boolean;
  error: boolean;
  data: Product[];
  per_page: number;
  sort: "asc" | "desc"; // 'asc': 오름차운 | 'desc' : 내림차순
}

// Define the initial state using that type
const initialState: ProductsState = {
  fetching: false,
  error: false,
  data: [],
  per_page: 5,
  sort: "desc",
};

export const productsSlice = createSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fetching: (state, action: PayloadAction) => {
      state.fetching = true;
    },
    success: (state, action: PayloadAction<Product[]>) => {
      state.data = [...action.payload].sort((a, b) => b.score - a.score);
      state.fetching = false;
    },
    failure: (state, action) => {
      state.error = true;
      state.fetching = false;
    },
  },
});

export const { fetching, success, failure } = productsSlice.actions;

export const selectCharactors = (state: RootState) => state.products;

export default productsSlice.reducer;

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  dispatch(productsSlice.actions.fetching());
  try {
    getProducts().then((res) => {
      dispatch(productsSlice.actions.success(res));
    });
  } catch (e) {
    dispatch(productsSlice.actions.failure);
  }
};
