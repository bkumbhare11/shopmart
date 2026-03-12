export const BASE_URL = "https://dummyjson.com";

export const ENDPOINTS = {
  ALL_PRODUCTS: `${BASE_URL}/products?limit=0`,
  CATEGORIES: `${BASE_URL}/products/categories`,
  CATEGORY_DETAIL: (name) => `${BASE_URL}/products/category/${name}`,
  SINGLE_PRODUCT: (id) => `${BASE_URL}/products/${id}`,
};
