import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancleOrder } from "@/features/orders/orderSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonHeader from "@/components/CommonHeader";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Empty from "@/components/Empty";

function Orders() {
  const orders = useSelector((state) => state.order.orders);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname }, replace: true });
    }
  }, [isLoggedIn]);

  return (
    <section>
      <div className="mt-5">
        <CommonHeader title="My Orders" count={orders.length} />
      </div>

      {orders.length > 0 ? (
        <div className="mt-10 flex flex-wrap justify-start gap-6">
          {orders.map((order) => {
            return (
              <div
                key={order.id}
                className="w-full max-w-2xl mx-auto shrink-0 p-6 border-2 border-slate-900 rounded-2xl mt-5 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] bg-white space-y-5"
              >
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="font-black uppercase text-slate-500 text-xs sm:text-sm">
                      Order ID
                    </h3>
                    <span className="font-black text-slate-900 text-lg">
                      #{order.id}
                    </span>
                  </div>

                  <div className="">
                    <h3 className="font-black uppercase text-right text-slate-500 text-xs sm:text-sm">
                      Placed On
                    </h3>
                    <span className="font-bold text-slate-900 text-lg">
                      {order.date}
                    </span>
                  </div>
                </div>

                <div className="h-28 overflow-y-auto border-2 rounded-lg border-slate-100 px-3 py-2">
                  {order.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="font-black flex justify-between"
                    >
                      <div className="flex gap-1">
                        <span>{index + 1}.</span>
                        <Link
                          to={`/products/${item.id}`}
                          className="line-clamp-1 tracking-wide"
                        >
                          {item.title}
                        </Link>
                      </div>
                      <span> (x{item.quantity})</span>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-300 border-2 border-slate-900 h-fit flex justify-between items-center p-3 rounded-sm">
                  <h3 className="font-black text-slate-900 uppercase tracking-wide text-sm">
                    Amount Paid
                  </h3>
                  <span className="font-black text-slate-900">
                    ₹{order.pricing.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm sm:text-sm font-bold uppercase tracking-wider text-green-700">
                    Order Confirmed
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/orders/${order.id}`}
                    className="w-full bg-slate-900 text-white sm:text-lg px-2 py-3 text-sm font-bold rounded-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                  >
                    View Details
                  </Link>

                  <button
                    className="w-full bg-red-600 text-white sm:text-lg px-2 py-3 font-bold rounded-lg transition-all active:scale-95 cursor-pointer"
                    onClick={() => dispatch(cancleOrder(order.id))}
                  >
                    Cancle
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Empty
          title="NO ORDERS YET! 📦"
          subTitle="Looks like you haven't discovered our awesome products yet. Let's change that!"
          icon={
            <ShoppingBagIcon
              sx={{
                fontSize: "4rem",
              }}
            />
          }
          btnText="Start Shopping Now"
        />
      )}
    </section>
  );
}

export default Orders;
