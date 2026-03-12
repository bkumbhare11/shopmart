import React, { useEffect, useState } from "react";
import { logIn } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);

  function handleLogin(e) {
    e.preventDefault();

    const isInvalid = email.trim() === "" || password.trim() === "";
    if (isInvalid) {
      toast.error("Email and Password are required!");
    } else {
      let user = {
        name: email.split("@")[0],
        email,
        password,
      };

      dispatch(logIn(user));

      setEmail("");
      setPassword("");
      toast.success("Login successful!");
      const destination = location.state?.from || -1;
      navigate(destination, { replace: true });
    }
  }

  return (
    <section className="">
      <form
        onSubmit={(e) => handleLogin(e)}
        className="w-full max-w-lg mx-auto p-6 border-2 border-slate-900 rounded-2xl mt-30 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] bg-white"
      >
        <div className="mb-8 space-y-1.5">
          <h1 className="font-black text-4xl tracking-tighter text-center uppercase italic">
            ShopMart
          </h1>

          <p className="text-slate-500 text-center font-medium">
            Discover amazing products at the best prices. Login to explore and
            start shopping.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className=" block font-bold mb-1 ml-1 text-slate-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 ring-slate-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className=" block font-bold mb-1 ml-1 text-slate-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="••••••••"
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-900 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 ring-slate-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3.5 font-bold rounded-lg mt-6 uppercase cursor-pointer"
          >
            Login
          </button>

          <p className="text-center text-xs mt-6 text-slate-500 font-medium">
            Portfolio Project • No real signup required
          </p>
        </div>
      </form>
    </section>
  );
}

export default Login;
