import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: JSON.parse(localStorage.getItem("wishlist")) || [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      let item = state.wishlistItems.find(
        (item) => item.id === action.payload.id,
      );

      if (item) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        state.wishlistItems.push(action.payload);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
    },

    removeFromWishlist: (state, action) => {
      let item = state.wishlistItems.find(
        (item) => item.id === action.payload.id,
      );

      if (item) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== action.payload.id,
        );
      }

      localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
    },

    clearWishlist: (state) => {
      state.wishlistItems = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
