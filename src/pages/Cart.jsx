import React from "react";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  removeItem,
} from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Empty from "../components/Empty";
import CommonHeader from "@/components/CommonHeader";
import { priceCalculator } from "@/constants/priceCalculator";
import OrderSummary from "@/components/OrderSummary";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <section className="pb-80">
      <div className="flex flex-col gap-1.5 mb-2 py-3 ">
        <CommonHeader title="My Cart" count={cartItems.length} />

        {cartItems.length > 0 && (
          <div className="flex justify-end ">
            <button
              className="bg-white px-3 py-2 uppercase text-[10px] sm:text-[12px] font-bold text-slate-800 border border-slate-900 rounded-md active:scale-95 transition-all duration-300 cursor-pointer hover:bg-slate-900 hover:text-white"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => {
            let { finalPrice } = priceCalculator(
              item.price,
              item.discountPercentage,
            );

            const subTotal = finalPrice * item.quantity;

            return (
              <div
                key={item.id}
                className="p-4 sm:p-6 flex items-start gap-4 w-full max-w-5xl mx-auto border-2 border-slate-900 rounded-2xl mt-8 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] bg-white"
              >
                <Link
                  to={`/products/${item.id}`}
                  className="w-18 h-18 sm:w-24 sm:h-24 bg-slate-50 rounded-xl shrink-0 border border-slate-100 flex items-center justify-center"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </Link>

                <div className="flex flex-col flex-1 gap-3">
                  <div className="space-y-1">
                    <h2 className="font-black tracking-wide text-slate-900 text-sm sm:text-xl line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="font-semibold text-slate-800 text-xs sm:text-lg">
                      ₹{finalPrice.toLocaleString("en-IN")}/unit
                    </p>
                    <p className="text-xs text-slate-500 font-bold sm:text-sm">
                      {item.shippingInformation}
                    </p>

                    {item.quantity === 5 && (
                      <p className="text-red-500 font-bold text-xs sm:text-lg">
                        Order Limit Reached!!!
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex gap-2.5 items-center bg-slate-100 p-1 rounded-md border border-slate-200">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item))}
                        className="text-slate-700"
                      >
                        {item.quantity === 1 ? (
                          <DeleteIcon
                            sx={{
                              fontSize: {
                                xs: "1rem",
                                sm: "1.3rem",
                              },
                            }}
                          />
                        ) : (
                          <RemoveIcon
                            sx={{
                              fontSize: {
                                xs: "1rem",
                                sm: "1.3rem",
                              },
                            }}
                          />
                        )}
                      </button>
                      <span className="font-bold text-xs sm:text-sm w-4 text-center">
                        {item.quantity}
                      </span>

                      <button onClick={() => dispatch(increaseQuantity(item))}>
                        <AddIcon
                          sx={{
                            fontSize: {
                              xs: "1rem",
                              sm: "1.3rem",
                            },
                          }}
                        />
                      </button>
                    </div>

                    <button
                      className="text-slate-700 active:scale-90 p-1"
                      onClick={() => dispatch(removeItem(item))}
                    >
                      <DeleteIcon
                        sx={{
                          fontSize: {
                            xs: "1.2rem",
                            sm: "1.6rem",
                          },
                        }}
                      />
                    </button>
                  </div>

                  <p className="font-bold text-sm sm:text-lg text-slate-900">
                    Subtotal: ₹{subTotal.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            );
          })}

          <OrderSummary btnText="Checkout" />
        </>
      ) : (
        <Empty
          title="Your cart is empty"
          subTitle="Looks like you haven't added anything yet."
          btnText="Continue Shopping"
          icon={<ShoppingCartIcon sx={{ fontSize: { xs: "5rem" } }} />}
        />
      )}
    </section>
  );
}

export default Cart;
