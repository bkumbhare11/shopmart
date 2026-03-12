import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { totalCalculator } from "@/constants/totalCalculator";
import { addOrder } from "@/features/orders/orderSlice";
import { clearCart } from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname }, replace: true });
    }
  }, [isLoggedIn, navigate]);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    fullAddress: "",
    city: "",
    state: "",
  });

  const [addressDetails, setAddressDetails] = useState(
    JSON.parse(localStorage.getItem("address")),
  );

  const [isEditMode, setIsEditMode] = useState(false);

  function saveAddress(e) {
    e.preventDefault();
    localStorage.setItem("address", JSON.stringify(address));
    setAddressDetails(address);
    setIsEditMode(false);

    console.log(isEditMode);
  }

  const { grandTotal, shippingCost, taxRate, taxAmount, totalAmount } =
    totalCalculator();

  function handleEdit() {
    setAddress(addressDetails);
    setIsEditMode(true);
  }

  function placeOrder() {
    const finalOrder = {
      id: `ORD-${Date.now().toString().slice(-4)}`,
      items: cartItems,
      shippingAddress: addressDetails,
      date: new Date().toLocaleDateString(),
      pricing: {
        grandTotal,
        totalAmount,
        taxRate,
        taxAmount,
        shippingCost,
      },
    };

    dispatch(addOrder(finalOrder));
    dispatch(clearCart());

    toast.success("Order Placed");
    navigate("/orders", { replace: true });
  }

  return (
    <section>
      <button
        className="bg-slate-50 mt-4 px-3 py-1.5 border border-slate-900 text-slate-800 font-medium rounded-lg flex items-center justify-center text-xs active:scale-95 transition-all duration-300 "
        onClick={() => navigate(-1)}
      >
        <KeyboardBackspaceIcon
          sx={{
            fontSize: {
              xs: "1.2rem",
            },
          }}
        />
      </button>

      <div className="flex flex-col gap-5 sm:flex-row max-w-7xl ">
        <div className="w-full max-w-xl mx-auto p-6 border-2 border-slate-900 rounded-2xl mt-5 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] bg-white">
          <h1 className="font-black text-2xl sm:text-3xl tracking-tighter mb-8 ">
            Delivery Address
          </h1>

          {isEditMode || !addressDetails ? (
            <form className="space-y-4" onSubmit={(e) => saveAddress(e)}>
              <div>
                <label
                  htmlFor="name"
                  className="block font-bold mb-1 ml-1 text-slate-700 sm:text-lg"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={address.name}
                  placeholder="name@example.com"
                  onChange={(e) =>
                    setAddress({ ...address, name: e.target.value })
                  }
                  className="w-full px-4 py-2 sm:py-3 sm:text-lg bg-slate-50 border-2 border-slate-900 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 ring-slate-500 transition-all"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <label
                    htmlFor="phone"
                    className=" block font-bold mb-1 ml-1 text-slate-700 sm:text-lg"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    maxLength="10"
                    minLength="10"
                    value={address.phone}
                    placeholder="9283457321"
                    onChange={(e) =>
                      setAddress({ ...address, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 sm:py-3 sm:text-lg bg-slate-50 border-2 border-slate-900 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 ring-slate-500 transition-all"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="pincode"
                    className=" block font-bold mb-1 ml-1 text-slate-800 sm:text-lg"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    required
                    maxLength="6"
                    placeholder="495683"
                    value={address.pincode}
                    onChange={(e) =>
                      setAddress({ ...address, pincode: e.target.value })
                    }
                    className="w-full px-4 py-2 sm:py-3 sm:text-lg bg-slate-50 border-2 border-slate-900 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 ring-slate-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className=" block font-bold mb-1 ml-1 text-slate-700"
                >
                  Address
                </label>
                <textarea
                  type="text"
                  id="address"
                  required
                  placeholder="House No, Building, Area"
                  value={address.fullAddress}
                  onChange={(e) =>
                    setAddress({ ...address, fullAddress: e.target.value })
                  }
                  className="w-full px-4 py-2 sm:py-3 sm:text-lg bg-slate-50 border-2 border-slate-900 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 ring-slate-500 transition-all"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center ">
                <div className="flex-1">
                  <label
                    htmlFor="city"
                    className=" block font-bold mb-1 ml-1 text-slate-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    placeholder="Mumbai, Dehli....."
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="w-full px-4 py-2 sm:py-3 sm:text-lg bg-slate-50 border-2 border-slate-900 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 ring-slate-500 transition-all"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="state"
                    className="block font-bold mb-1 ml-1 text-slate-700"
                  >
                    State
                  </label>
                  <div className="relative">
                    <select
                      id="state"
                      required
                      className="w-full px-4 py-2 sm:py-3 sm:text-lg bg-slate-50 border-2 border-slate-900 rounded-lg text-slate-900 appearance-none focus:outline-none focus:ring-2 ring-slate-500 transition-all cursor-pointer"
                      defaultValue={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        State
                      </option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-900">
                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-slate-900 text-white py-3.5 sm:py-4 sm:text-xl font-bold rounded-lg mt-6 transition-all active:scale-95 cursor-pointer">
                Save Address
              </button>
            </form>
          ) : (
            <div>
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold sm:text-xl">
                  {addressDetails.name}
                </h3>
                <p className="sm:text-lg">{addressDetails.fullAddress}</p>
                <p className="uppercase sm:text-lg">
                  {addressDetails.city}, {addressDetails.state}{" "}
                  {addressDetails.pincode}
                </p>
                <p className="mt-2 font-medium sm:text-lg">
                  {addressDetails.phone}
                </p>
              </div>

              <div className="mt-6 flex gap-1.5">
                <button
                  className="w-full bg-slate-900 text-white py-3 sm:py-3.5 sm:text-xl font-bold rounded-lg transition-all active:scale-95 cursor-pointer"
                  onClick={handleEdit}
                >
                  Edit
                </button>

                <button
                  className="w-full bg-red-600 text-white py-3 sm:py-3.5 sm:text-xl font-bold rounded-lg transition-all active:scale-95 cursor-pointer"
                  onClick={() => localStorage.removeItem("address")}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        {addressDetails && (
          <div className="w-full h-fit max-w-xl mx-auto p-6 border-2 border-slate-900 rounded-2xl mt-5 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] bg-white flex flex-col justify-between">
            <h1 className="font-black text-2xl sm:text-3xl tracking-tighter mb-8 ">
              Order Summary
            </h1>

            <div className="flex-flex-col justify-between ">
              <div>
                <div className="flex justify-between font-semibold">
                  <h3>GrandTotal</h3>
                  <p>₹{grandTotal.toLocaleString("en-IN")}</p>
                </div>

                <div className="flex justify-between font-semibold">
                  <h3>GST ({taxRate * 100}%)</h3>
                  <p>₹{taxAmount}</p>
                </div>

                <div className="flex justify-between mb-2 font-semibold">
                  <h3>Shipping</h3>
                  <p className={`${shippingCost === 0 ? "font-bold" : ""}`}>
                    {shippingCost === 0 ? "Free" : `₹${shippingCost}`}
                  </p>
                </div>

                <div className="flex justify-between pt-2 border-t-2 border-slate-900 font-black text-lg">
                  <h3>Total</h3>
                  <p>₹{totalAmount.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <div>
                <button
                  className="w-full bg-slate-900 text-white py-3.5  sm:text-xl font-bold rounded-lg mt-6 transition-all active:scale-95 cursor-pointer"
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Checkout;
