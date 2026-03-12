import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import toast from "react-hot-toast";

function WishListToggle({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  let isFavourite = wishlistItems.some((item) => item.id === product.id);

  function handleToggle() {
    if (isLoggedIn) {
      dispatch(toggleWishlist(product));
    } else {
      toast("Please login to continue with this action.", {
        icon: "🔒",
      });
    }
  }

  return (
    <>
      <button
        className={`${isFavourite ? "text-slate-700" : "text-slate-700"} absolute right-0 top-0 m-2 active:scale-95 transition-all `}
        onClick={(product) => handleToggle(product)}
      >
        {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
    </>
  );
}

export default WishListToggle;
