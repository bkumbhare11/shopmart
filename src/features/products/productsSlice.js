import { createSlice } from "@reduxjs/toolkit";

export const productslice = createSlice({
  name: "product",
  initialState: {
    products: [],
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.status = "success";
      state.products = action.payload;
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setLoading: (state) => {
      state.status = "loading";
    },

    setError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError, setCategories } =
  productslice.actions;
export default productslice.reducer;
