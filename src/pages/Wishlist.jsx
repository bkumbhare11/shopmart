import React from "react";
import CommonHeader from "@/components/CommonHeader";
import { useSelector, useDispatch } from "react-redux";
import Empty from "../components/Empty";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { removeFromWishlist } from "@/features/wishlist/wishlistSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { priceCalculator } from "@/constants/priceCalculator";
import { Link } from "react-router-dom";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  function moveToCart(item) {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item));
  }

  return (
    <section>
      <div className="py-3 mb-4">
        <CommonHeader title="My Wishlisht" count={wishlistItems.length} />
      </div>

      {wishlistItems.length > 0 ? (
        wishlistItems.map((item) => {
          let { finalPrice } = priceCalculator(
            item.price,
            item.discountPercentage,
          );

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

              <div className="flex flex-col gap-4 flex-1">
                <div className="space-y-1">
                  <h2 className="font-black tracking-wide text-slate-900 text-sm sm:text-xl line-clamp-1">
                    {item.title}
                  </h2>
                  <p className="text-slate-800 font-semibold sm:text-sm ">
                    {" "}
                    ₹{finalPrice.toLocaleString("en-IN")}
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm font-bold">
                    {item.shippingInformation}
                  </p>
                </div>

                <div className="flex justify-between items-center ">
                  <button
                    className="bg-slate-900 text-white font-bold px-3 py-1.5 rounded-md text-sm sm:text-[16px] active:scale-95"
                    onClick={() => moveToCart(item)}
                  >
                    Add to cart
                  </button>
                  <button
                    className="text-slate-700 active:scale-95 cursor-pointer"
                    onClick={() => dispatch(removeFromWishlist(item))}
                  >
                    <DeleteIcon
                      sx={{
                        fontSize: {
                          xs: "1.3rem",
                          sm: "1.6rem",
                        },
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Empty
          title="Your wishlist is empty"
          subTitle="Save items you love for later."
          btnText="Explore Products"
          icon={<FavoriteIcon sx={{ fontSize: { xs: "5rem" } }} />}
        />
      )}
    </section>
  );
}

export default Wishlist;
