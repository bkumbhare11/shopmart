import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/features/cart/cartSlice";
import toast from "react-hot-toast";
import { clearWishlist } from "@/features/wishlist/wishlistSlice";

function DropDown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.userData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  function handleLogout() {
    dispatch(clearCart());
    dispatch(clearWishlist());
    localStorage.removeItem("address");
    dispatch(logOut());
    toast.success("Logged out successfully. See you soon!");
  }

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {isOpen ? (
          <PersonIcon
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
              },
            }}
          />
        ) : (
          <PersonOutlineOutlinedIcon
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
              },
            }}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!isLoggedIn && (
          <DropdownMenuItem
            className="font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <PersonIcon className="text-slate-700" />
            Login
          </DropdownMenuItem>
        )}

        {isLoggedIn && (
          <>
            <DropdownMenuItem className="font-semibold cursor-pointer">
              <AccountCircleIcon className="text-slate-700" />
              Hello, {user.name.slice(0, 1).toUpperCase() + user.name.slice(1)}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-semibold cursor-pointer"
              onClick={() => navigate("/orders")}
            >
              <LocalMallIcon className="text-slate-700" />
              My Orders
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogoutIcon />
              <span className="font-bold cursor-pointer">Log Out</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
