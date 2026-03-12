import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DataLoader from "./components/DataLoader";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/cart";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <>
      <DataLoader />
      <Navbar />
      <main className="w-[95%] sm:w-full sm:max-w-[85%] px-4 mx-auto my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/Orders/:id" element={<OrderDetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
