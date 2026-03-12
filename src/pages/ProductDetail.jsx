import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ENDPOINTS } from "@/constants/api";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RatingsCalculator from "@/constants/RatingsCalculator";
import { priceCalculator } from "@/constants/priceCalculator";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import WishListToggle from "@/constants/WishListToggle";
import { addToCart } from "@/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { DetailsSkeleton } from "@/components/Skeleton";
import { useNavigate } from "react-router-dom";
import Empty from "@/components/Empty";

function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true);
        let res = await axios.get(ENDPOINTS.SINGLE_PRODUCT(productId));
        let data = res.data;
        setProduct(data);
        setCurrentImage(data.images[0]);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [productId]);

  console.log(product);

  const { priceInINR, discount, finalPrice } = product
    ? priceCalculator(product.price, product.discountPercentage)
    : { priceInINR: 0, discount: 0, finalPrice: 0 };

  function buyNow(product) {
    dispatch(addToCart(product));
    navigate("/cart");
  }

  return (
    <section className="">
      <div className="bg-slate-50 w-fit px-3 py-1.5 border border-slate-900 text-slate-800 font-medium rounded-lg flex items-center justify-center text-xs active:scale-95 transition-all duration-300 ">
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
      {loading ? (
        <DetailsSkeleton />
      ) : error ? (
        <Empty
          title={error}
          subTitle="We couldn't load the data."
          btnText="Try Again"
          icon={
            <WarningIcon sx={{ fontSize: { xs: "3rem", color: "#EF4444" } }} />
          }
        />
      ) : (
        product && (
          <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 flex flex-col sm:flex-row sm:gap-2 border-2 border-slate-900 rounded-2xl mt-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] bg-white ">
            <div className="sm:w-[40%] shrink-0">
              <div className="w-full bg-slate-50 border border-slate-100 rounded-xl aspect-square flex items-center justify-center relative">
                <img
                  key={currentImage}
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full p-6 transition-all duration-300"
                />

                <WishListToggle product={product} />
              </div>

              {product.images.length > 1 && (
                <div className="w-full h-full flex gap-3 overflow-x-auto no-scrollbar mt-5">
                  {product.images.map((image, index) => (
                    <img
                      src={image}
                      key={index}
                      className={`w-25 h-25 shrink-0 border-2 p-2 rounded-lg ${currentImage === image ? "border-slate-900 " : "border-slate-200"}`}
                      onClick={() => setCurrentImage(image)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-6 sm:w-[60%] sm:px-6">
              <div className="space-y-2.5">
                <div>
                  <span className="text-sm sm:text-lg uppercase font-bold text-neutral-500">
                    {product.brand}
                  </span>

                  <h1 className="font-black tracking-wide text-lg sm:text-3xl">
                    {product.title}
                  </h1>
                </div>

                <div className="flex items-center justify-between">
                  <div className=" flex gap-1 items-center text-sm">
                    <RatingsCalculator rating={product.rating} />
                    <span className="font-bold text-slate-500">
                      ({product.rating})
                    </span>
                  </div>

                  {product.availabilityStatus === "In Stock" ? (
                    <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 text-sm rounded">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold bg-red-100 px-2 py-1 text-sm rounded">
                      Out of Stock
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex gap-1.5 items-end">
                    <span className="font-bold text-slate-900 text-2xl sm:text-[28px]">
                      ₹{finalPrice.toLocaleString("en-IN")}
                    </span>

                    <span className="text-slate-500 line-through text-lg">
                      {priceInINR.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="text-green-600 font-bold flex items-center gap-0.5 bg-green-100 px-2 py-1 rounded w-fit text-sm">
                    <ArrowDownwardIcon
                      sx={{
                        fontSize: {
                          xs: "1rem",
                          sm: "1.3rem",
                        },
                      }}
                    />
                    {discount}% OFF
                  </div>
                </div>
              </div>

              <div className="space-y-1 pb-5 border-b border-b-slate-200">
                <h3 className="font-bold text-lg sm:text-xl mb-2.5">
                  Delivery Options
                </h3>

                <p className="bg-slate-50 font-bold px-3 py-2 border border-slate-200 rounded-tl-md rounded-tr-md flex items-center gap-1.5 text-sm">
                  <span className="text-slate-500">
                    <LocalShippingIcon
                      sx={{
                        fontSize: {
                          xs: "1.3rem",
                        },
                      }}
                    />
                  </span>
                  {product.shippingInformation}
                </p>

                <p className="bg-slate-50 font-bold px-3 py-2 border border-slate-200  flex items-center gap-1.5 text-sm">
                  <span className="text-green-500">
                    <VerifiedUserIcon
                      sx={{
                        fontSize: {
                          xs: "1.3rem",
                        },
                      }}
                    />
                  </span>
                  {product.warrantyInformation}
                </p>

                <p className="bg-slate-50 font-bold px-3 py-2 border border-slate-200 rounded-bl-md rounded-br-md flex items-center gap-1.5 text-sm">
                  <span className="text-red-500">
                    <RotateLeftOutlinedIcon
                      sx={{
                        fontSize: {
                          xs: "1.3rem",
                        },
                      }}
                    />
                  </span>
                  {product.returnPolicy}
                </p>
              </div>

              <div className="pb-5 border-b border-b-slate-200">
                <h3 className="font-bold text-lg sm:text-xl mb-2">
                  About this item
                </h3>

                <p className="text-slate-500 leading-tight text-sm">
                  {product.description}
                </p>
              </div>

              <div className="space-y-2 pb-5 border-b border-b-slate-200">
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg sm:text-xl">
                    Ratings and reviews
                  </h3>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <p className="font-bold text-md">{product.rating}</p>
                      <span className="flex items-center">
                        <StarOutlinedIcon
                          sx={{
                            fontSize: {
                              xs: "1rem",
                            },
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 overflow-x-auto p-3">
                  {product.reviews.map((review, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-slate-50 rounded-xl p-3 flex flex-col justify-between h-32 w-70 shrink-0"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 bg-white w-fit px-1.5 py-1 rounded">
                            <p className="font-bold text-sm">{review.rating}</p>
                            <span className="flex items-center">
                              <StarOutlinedIcon
                                sx={{
                                  fontSize: {
                                    xs: "1rem",
                                  },
                                }}
                              />
                            </span>
                          </div>

                          <p>{review.comment}</p>
                        </div>

                        <div className="text-sm flex justify-between text-slate-500">
                          <p>{review.reviewerName}</p>

                          <p>{new Date(review.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  disabled={product.stock === 0}
                  className={`w-full bg-slate-900 text-white py-3.5 sm:text-xl font-bold rounded-lg mt-6 transition-all active:scale-95 ${product.stock === 0 ? "opacity-70  cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to cart
                </button>

                <button
                  onClick={() => buyNow(product)}
                  className={`w-full bg-yellow-300 py-3.5 sm:text-xl font-bold rounded-lg mt-6 transition-all active:scale-95  ${product.stock === 0 ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                  disabled={product.stock === 0}
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
}

export default ProductDetail;
