import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   cart: [],
  cart: [
    {
      cheese_id: 50,
      name: 'Manchego',
      quantity: 2,
      price: 9,
      totalPrice: 18,
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (item) => item.cheese_id !== action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.cheese_id === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.price;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.cheese_id === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.price;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
