import React from "react";

function Footer() {
  return (
    <footer className="w-full py-8 mt-20 border-t-4 border-slate-900 bg-white">
      <div className="max-w-[90%]  mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="font-black text-2xl tracking-tighter uppercase">
            ShopMart
          </h2>
          <p className="text-sm font-bold text-slate-500">
            Your One-Stop Shop for Everything.
          </p>
        </div>

        <div className="flex gap-6 font-bold text-sm uppercase">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>

        <div className="text-slate-500 font-bold text-xs">
          © 2026 ShopMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
