import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DropDown from "./DropDown";

function Navbar() {
  const location = useLocation();
  const cartCount = useSelector((state) => state.cart.cartItems);
  const wishlistCount = useSelector((state) => state.wishlist.wishlistItems);

  let isCart = location.pathname === "/cart";
  let isWishlist = location.pathname === "/wishlist";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex flex-col gap-2 border-b-2 border-slate-900 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="flex justify-between w-full max-w-[90%] mx-auto py-4">
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter text-slate-900 sm:hidden"
          >
            SM
          </Link>

          <Link
            to="/"
            className="text-3xl font-black uppercase tracking-tighter text-slate-900 hidden sm:block"
          >
            ShopMart
          </Link>

          <div className="flex gap-5 items-center">
            <div className="relative p-0.5">
              <Link
                to="/wishlist"
                className="text-slate-700 cursor-pointer transition-all active:scale-90"
              >
                {isWishlist ? (
                  <FavoriteIcon
                    sx={{
                      fontSize: {
                        xs: "1.5rem",
                        sm: "2rem",
                      },
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{
                      fontSize: {
                        xs: "1.5rem",
                        sm: "2rem",
                      },
                    }}
                  />
                )}
              </Link>

              {!isWishlist && wishlistCount.length > 0 && (
                <p className=" bg-slate-800 text-[9px] text-white h-4 w-4 rounded-full  absolute -top-1.5 -right-2 ring-2 ring-white flex justify-center items-center">
                  {wishlistCount.length}
                </p>
              )}
            </div>

            <div className="relative">
              <Link
                to="/cart"
                className="text-slate-700 cursor-pointer transition-all active:scale-90"
              >
                {isCart ? (
                  <ShoppingCartIcon
                    sx={{
                      fontSize: {
                        xs: "1.5rem",
                        sm: "2rem",
                      },
                    }}
                  />
                ) : (
                  <ShoppingCartOutlinedIcon
                    sx={{
                      fontSize: {
                        xs: "1.5rem",
                        sm: "2rem",
                      },
                    }}
                  />
                )}
              </Link>

              {!isCart && cartCount.length > 0 && (
                <p className=" bg-slate-800 text-[9px] text-white h-4 w-4 rounded-full  absolute -top-1.5 -right-2 ring-2 ring-white flex justify-center items-center">
                  {cartCount.length}
                </p>
              )}
            </div>

            <DropDown />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
