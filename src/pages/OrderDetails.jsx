import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { priceCalculator } from "@/constants/priceCalculator";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orders);
  const orderDetails = orders.find((order) => order.id === id);

  return (
    <section>
      <div className="bg-slate-50 w-fit px-3 py-1.5 border border-slate-900 text-slate-800 font-medium rounded-lg flex items-center justify-center text-xs active:scale-95 transition-all duration-300 ">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <KeyboardBackspaceIcon
            sx={{
              fontSize: {
                xs: "1.2rem",
                sm: "1.5rem",
              },
            }}
          />
        </button>
      </div>

      <div className="w-full max-w-7xl mx-auto p-6 border-2 border-slate-900 rounded-2xl mt-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] bg-white">
        <h1 className="font-black tracking-tight mb-8 text-slate-900 text-2xl sm:text-4xl">
          #Order Details
        </h1>

        <div className="border-b border-slate-200 pb-4">
          <div className="flex gap-2 sm:text-lg">
            <h3 className="uppercase text-slate-900 font-bold">Id </h3>
            <span className="text-slate-500 font-bold ">
              #{orderDetails.id}
            </span>
          </div>

          <div className="flex gap-2 sm:text-lg">
            <h3 className="text-slate-900 font-bold">Placed on: </h3>
            <span className="text-slate-500 font-bold ">
              {orderDetails.date}
            </span>
          </div>

          <div className="flex gap-2 sm:text-lg">
            <h3 className="text-slate-900 font-bold">Status: </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-green-700">
                Order Confirmed
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-2">
          <div className="sm:w-[60%] shrink-0 sm:px-2.5">
            <div className="mt-8 border-b border-slate-200 pb-4">
              <h2 className="font-black tracking-tight mb-4 text-slate-900 text-xl sm:text-2xl">
                Items
              </h2>

              {orderDetails.items.map((item) => {
                const { finalPrice } = priceCalculator(
                  item.price,
                  item.discountPercentage,
                );

                return (
                  <div
                    key={item.id}
                    className="mb-4 p-4 border-2 border-slate-200 rounded-2xl"
                  >
                    <div className="flex gap-4">
                      <div className="h-20 w-20 shrink-0 border-2 border-slate-200 rounded-xl">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full bg-slate-50 rounded-xl"
                        />
                      </div>

                      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end">
                        <div className="space-y-3">
                          <div className="space-y-0.5">
                            <h4 className="font-black leading-tight tracking-wide line-clamp-1 text-slate-900 sm:text-[16px]">
                              {item.title}
                            </h4>

                            <p className="font-bold text-slate-500 text-sm ">
                              ₹{finalPrice.toLocaleString("en-IN")}/Unit
                            </p>
                          </div>

                          <div className="bg-slate-900 text-white font-bold w-fit px-2 py-1 mt-2 rounded-sm tracking-wider text-xs sm:text-sm">
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>

                        <div className="leading-none text-left mt-3">
                          <p className="font-black uppercase text-slate-500 text-sm">
                            Sub Total
                          </p>
                          <span className="font-black text-lg">
                            ₹
                            {(finalPrice * item.quantity).toLocaleString(
                              "en-IN",
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sm:w-[40%] sm:h-fit sm:sticky sm:top-15 shrink-0 sm:px-2.5">
            <div className="mt-8 border-b border-slate-200 pb-4">
              <h2 className="font-black tracking-tight mb-4 text-slate-900 text-xl sm:text-2xl">
                Billing Details
              </h2>

              <div className="p-4 space-y-2 sm:space-y-1 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-slate-500 flex justify-between text-sm sm:text-[16px]">
                  <p className="">SubTotal</p>
                  <span className="text-slate-900">
                    ₹{orderDetails.pricing.grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="font-bold text-slate-500 flex justify-between text-sm sm:text-[16px]">
                  <p className="">
                    GST ({orderDetails.pricing.taxRate * 100}%)
                  </p>
                  <span className="text-slate-900">
                    ₹{orderDetails.pricing.taxAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="font-bold text-slate-500 flex justify-between text-sm sm:text-[16px]">
                  <p className="">Shipping</p>
                  <span className="text-slate-900">
                    {`${orderDetails.pricing.shippingCost === 0 ? "Free" : `₹${orderDetails.pricing.shippingCost}`}`}
                  </span>
                </div>

                <div className="font-black flex text-slate-900 justify-between border-t-2 border-slate-900 mt-2.5 pt-2.5 text-md sm:text-lg">
                  <p className="">Total Paid</p>
                  <span className="text-slate-900">
                    ₹{orderDetails.pricing.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-b border-slate-200 sm:border-none pb-4">
              <h2 className="font-black tracking-tight mb-5 text-slate-900 text-xl sm:text-2xl">
                Shipping Address
              </h2>

              <div className="p-4 space-y-2 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="font-black flex justify-between items-center mb-4 text-lg sm:text-xl">
                  {orderDetails.shippingAddress.name}
                  <span className="bg-slate-200 border border-slate-900 text-slate-900 px-2 py-1 rounded font-bold text-sm">
                    Home
                  </span>
                </p>

                <div className="sm:text-lg">
                  <p className="font-medium text-slate-900">
                    {orderDetails.shippingAddress.fullAddress}
                  </p>

                  <p className="font-medium text-slate-700 leading-relaxed">
                    {orderDetails.shippingAddress.city},{" "}
                    {orderDetails.shippingAddress.state} (
                    {orderDetails.shippingAddress.pincode})
                  </p>
                </div>

                <p className="font-bold text-slate-500 sm:text-lg">
                  Phone{" "}
                  <span className="text-slate-900 tracking-wider">
                    +91 {orderDetails.shippingAddress.phone}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className=" bg-red-500 text-white font-bold w-full py-3 sm:py-3.5 sm:text-2xl mt-5 rounded-lg text-xl">
          Cancle Order
        </button>
      </div>
    </section>
  );
}

export default OrderDetails;
