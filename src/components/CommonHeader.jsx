import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

function CommonHeader({ title, count }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="bg-white px-3 py-1.5 border border-slate-900 text-slate-800 font-medium rounded-lg flex items-center justify-center text-xs active:scale-95 transition-all duration-300 cursor-pointer hover:bg-slate-900 hover:text-white ">
          <button onClick={() => navigate(-1)} className="cursor-pointer">
            <KeyboardBackspaceIcon
              sx={{
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                },
              }}
            />
          </button>
        </div>

        <div className="flex items-end gap-1.5 ">
          <h2 className="text-sm sm:text-xl font-bold text-slate-800">
            {title}{" "}
            <span className="font-medium text-slate-500 text-xs sm:text-sm">
              ({count} items)
            </span>
          </h2>
        </div>
      </div>
    </>
  );
}

export default CommonHeader;
