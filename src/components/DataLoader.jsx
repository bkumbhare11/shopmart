import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setProducts,
  setCategories,
  setError,
  setLoading,
} from "@/features/products/productsSlice";
import { useSearchParams } from "react-router-dom";
import { ENDPOINTS } from "@/constants/api";

function DataLoader() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const category = searchParams.get("category");

  useEffect(() => {
    async function fetchProducts() {
      let url = "";
      try {
        dispatch(setLoading());
        if (category) {
          url = ENDPOINTS.CATEGORY_DETAIL(category);
        } else {
          url = ENDPOINTS.ALL_PRODUCTS;
        }

        const [productRes, categoryRes] = await Promise.all([
          axios.get(url),
          axios.get(ENDPOINTS.CATEGORIES),
        ]);

        dispatch(setCategories(categoryRes.data));
        dispatch(setProducts(productRes.data.products));
      } catch (err) {
        let message = "Something went wrong";

        if (err.message === "Network Error") {
          message = "Unable to connect to server. Check your internet.";
        } else if (err.response?.status === 500) {
          message = "Server error. Please try again later.";
        } else if (err.response?.status === 404) {
          message = "Data not found.";
        }

        dispatch(setError(message));
      }
    }

    fetchProducts();
  }, [category]);

  return null;
}

export default DataLoader;
