import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "data/productItems";
import type { AppDispatch, RootState } from "store";
import { CartItem } from "store/types/cart";

// Define a type for the slice state
interface CartState {
  fetching: boolean;
  error: boolean;
  data: CartItem[];
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
    success: (state, action: PayloadAction<CartItem[]>) => {
      state.data = action.payload;
      state.fetching = false;
    },
    failure: (state, action) => {
      state.error = true;
      state.fetching = false;
    },
    increaseAmountByItemNo: (state, action: PayloadAction<number>) => {
      const index = state.data.findIndex(
        (product) => product.item_no === action.payload
      );
      state.data[index].amount += 1;
    },
    decreaseAmountByItemNo: (state, action: PayloadAction<number>) => {
      const index = state.data.findIndex(
        (product) => product.item_no === action.payload
      );
      if (state.data[index].amount - 1 === 0) return;
      state.data[index].amount -= 1;
    },
  },
});

export const { fetching, success, failure } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;

export const fetchCart = () => async (dispatch: AppDispatch) => {
  dispatch(cartSlice.actions.fetching());
  try {
    getProducts().then((res) => {
      const data = res.map((product) => {
        return {
          ...product,
          amount: 1,
        };
      });
      dispatch(cartSlice.actions.success(data));
    });
  } catch (e) {
    dispatch(cartSlice.actions.failure);
  }
};
