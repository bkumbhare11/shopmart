import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: JSON.parse(localStorage.getItem("orders")) || [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    cancleOrder: (state, action) => {
      let orderId = action.payload;
      state.orders = state.orders.filter((order) => order.id !== orderId);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { addOrder, cancleOrder } = orderSlice.actions;
export default orderSlice.reducer;
