import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      const newCart = [...state.items];
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex > -1) {
        newCart.splice(itemIndex, 1);
      } else {
        console.log(
          "You cannot remove the item that is not added in the cart!"
        );
      }
      state.items = newCart;
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, emptyCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartItemById = (state, id) =>
  state.cart.items.filter((item) => item.id === id);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => (total += item.price), 0);

export default cartSlice.reducer;
