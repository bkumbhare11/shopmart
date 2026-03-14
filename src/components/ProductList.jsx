import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { addToCart } from "@/features/cart/cartSlice";
import { useSearchParams } from "react-router-dom";
import { priceCalculator } from "@/constants/priceCalculator";
import RatingsCalculator from "@/constants/RatingsCalculator";
import WishListToggle from "@/constants/WishListToggle";
import Empty from "@/components/Empty";
import WarningIcon from "@mui/icons-material/Warning";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { CardSkeleton } from "./Skeleton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const { products, status, error } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  function addProduct(product) {
    dispatch(addToCart(product));
  }

  let sortBy = searchParams.get("sort") || "";
  let displayProducts = [...products];

  if (sortBy === "price-low") {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    displayProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "ratings") {
    displayProducts.sort((a, b) => b.rating - a.rating);
  }

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <section className="flex flex-wrap gap-7 mt-5">
      {status !== "failed" && status !== "loading" && (
        <button
          className="fixed bottom-0 right-0 z-50 m-4 p-2 h-10 w-10 rounded-full bg-black text-white opacity-50 hover:opacity-100 cursor-pointer"
          onClick={scrollTop}
        >
          <ArrowUpwardIcon />
        </button>
      )}

      {status === "failed" ? (
        <Empty
          title={error}
          subTitle="We couldn't load the data."
          btnText="Try Again"
          icon={
            <WarningIcon sx={{ fontSize: { xs: "3rem", color: "#EF4444" } }} />
          }
        />
      ) : status === "loading" ? (
        <CardSkeleton />
      ) : (
        displayProducts.map((product) => {
          let { priceInINR, discount, finalPrice } = priceCalculator(
            product.price,
            product.discountPercentage,
          );

          let itemInCart = cartItems.find((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="w-full max-w-sm mx-auto  p-6 border-2 border-slate-900 rounded-2xl mt-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] bg-white flex flex-col"
            >
              <div className="h-48 w-full bg-slate-50 rounded-xl mb-3 relative">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="border-blue-300 w-full h-full object-contain "
                />

                <WishListToggle product={product} />
              </div>

              <div className="flex flex-col gap-1">
                <Link
                  to={`/products/${product.id}`}
                  className="font-bold text-slate-900 sm:text-lg truncate cursor-pointer"
                >
                  {product.title}
                </Link>

                <RatingsCalculator rating={product.rating} />

                <div className=" flex gap-2 mt-2 items-baseline">
                  <p className="text-slate-900 text-2xl sm:text-3xl font-bold">
                    ₹{finalPrice.toLocaleString("en-IN")}
                  </p>
                  <p className="line-through text-slate-400 text-sm sm:text-lg">
                    {" "}
                    ₹{priceInINR}
                  </p>
                </div>

                <div className="text-slate-800 text-sm sm:text-md font-semibold mb-2 bg-slate-50 w-fit px-2 py-1 rounded ">
                  Save {discount}%
                </div>

                <div className="text-slate-500 text-xs sm:text-sm space-y-1 mt-auto">
                  <p className="flex items-center gap-1">
                    <LocalShippingIcon
                      sx={{
                        fontSize: {
                          xs: "1.3rem",
                          sm: "1.7rem",
                        },
                      }}
                    />
                    {product.shippingInformation}
                  </p>

                  <p>{product.warrantyInformation}</p>
                </div>

                {itemInCart ? (
                  <button
                    className="bg-yellow-300 sm:text-lg  text-slate-900 py-3 font-black mt-4 rounded-md active:scale-95 transition-all cursor-pointer"
                    onClick={() => navigate("/cart")}
                  >
                    Go To Cart
                  </button>
                ) : (
                  <button
                    className={`bg-slate-900 text-white sm:text-lg py-3 font-black mt-4 rounded-md active:scale-95 transition-all ${product.stock === 0 ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={() => addProduct(product)}
                    disabled={product.stock === 0}
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}

export default ProductList;
