import React from "react";
import { useNavigate } from "react-router-dom";
import { totalCalculator } from "@/constants/totalCalculator";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function OrderSummary({ btnText }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { grandTotal, shippingCost, taxRate, taxAmount, totalAmount } =
    totalCalculator();
  const navigate = useNavigate();

  function checkout() {
    if (!isLoggedIn) {
      toast("Please login to continue with this action.", {
        icon: "🔒",
      });
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  }

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full sm:max-w-[85%] px-4 sm:px-10 py-4 rounded-tl-xl rounded-tr-xl bg-white space-y-1.5">
      <h2 className="text-slate-900 text-xl sm:text-2xl mb-3 font-black">
        Order Summary
      </h2>

      <div className="flex justify-between font-semibold">
        <h3>Items Total</h3>
        <span>₹{grandTotal.toLocaleString("en-IN")}</span>
      </div>

      <div className="flex justify-between font-semibold">
        <h3>GST ({taxRate * 100}%)</h3>
        <span>₹{taxAmount}</span>
      </div>

      <div className="flex justify-between font-semibold">
        <h3>Shipping</h3>
        <span className={`${shippingCost === 0 ? "font-bold" : ""}`}>
          {shippingCost === 0 ? "Free" : `₹${shippingCost}`}
        </span>
      </div>

      <div className="border-t border-slate-900 mt-2.5">
        <div className="flex justify-between mt-2 font-black text-xl">
          <h3>Total</h3>
          <span>₹{totalAmount.toLocaleString("en-In")}</span>
        </div>
      </div>

      <button
        className="bg-slate-900 text-white w-full mt-5 py-3 sm:py-4 sm:text-xl font-bold rounded-md active:scale-95 cursor-pointer"
        onClick={checkout}
      >
        {btnText}
      </button>
    </div>
  );
}

export default OrderSummary;
