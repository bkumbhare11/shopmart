import React from "react";
import { useNavigate } from "react-router-dom";

function Empty({ title, subTitle, icon, btnText }) {
  const navigate = useNavigate();

  return (
    <section className="px-4">
      <div className="h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="mb-4 text-slate-700">{icon}</div>

        <h2 className="text-3xl sm:text-4xl tracking-tight uppercase font-black text-slate-900 mb-2">
          {title}
        </h2>

        <p className="text-slate-500 max-w-md mb-8 sm:text-lg">{subTitle}</p>

        {btnText === "Try Again" ? (
          <button
            className="max-w-xs w-full bg-slate-900  text-white py-3 rounded-md font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
            onClick={() => window.location.reload()}
          >
            {btnText}
          </button>
        ) : (
          <button
            className="w-full max-w-xs uppercase cursor-pointer bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
            onClick={() => navigate("/")}
          >
            {btnText}
          </button>
        )}
      </div>
    </section>
  );
}

export default Empty;
