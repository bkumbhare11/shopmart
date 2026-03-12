import React from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarHalfIcon from "@mui/icons-material/StarHalf";

function RatingsCalculator({ rating }) {
  let fullstar = Math.floor(rating);
  let decimal = Number((rating - fullstar).toFixed(2));

  let halfStar = decimal >= 0.5;
  let emptyStar = 5 - fullstar - (halfStar ? 1 : 0);

  return (
    <>
      <div>
        {[...Array(fullstar)].map((_, i) => (
          <span key={i} className="text-slate-700 ">
            <StarOutlinedIcon sx={{ fontSize: { xs: "1.3rem" } }} />
          </span>
        ))}

        {halfStar && (
          <StarHalfIcon
            className="text-slate-700 "
            sx={{ fontSize: { xs: "1.3rem" } }}
          />
        )}

        {[...Array(emptyStar)].map((_, i) => (
          <span key={i} className="text-slate-500">
            <StarBorderOutlinedIcon sx={{ fontSize: { xs: "1.3rem" } }} />
          </span>
        ))}
      </div>
    </>
  );
}

export default RatingsCalculator;
