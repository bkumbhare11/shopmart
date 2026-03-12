import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      let existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        if (existingItem.quantity < 5) {
          existingItem.quantity += 1;
        } else {
          console.log("Limit Reached");
        }
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    increaseQuantity: (state, action) => {
      let item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item && item.quantity < 5) {
        item.quantity++;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    decreaseQuantity: (state, action) => {
      let item = state.cartItems.find((item) => item.id === action.payload.id);

      if (item) {
        if (item.quantity === 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id,
          );
        } else {
          item.quantity--;
        }
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeItem: (state, action) => {
      let item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id,
        );
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  removeItem,
} = cartSlice.actions;
export default cartSlice.reducer;
