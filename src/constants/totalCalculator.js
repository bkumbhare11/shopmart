import { useSelector } from "react-redux";
import { priceCalculator } from "./priceCalculator";

export function totalCalculator() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const grandTotal = cartItems.reduce((acc, item) => {
    const { finalPrice } = priceCalculator(item.price, item.discountPercentage);
    return acc + finalPrice * item.quantity;
  }, 0);

  let shippingCost = grandTotal > 500 ? 0 : 40;
  let taxRate = grandTotal >= 5000 ? 0.18 : 0.05;
  let taxAmount = Math.round(grandTotal * taxRate);
  let totalAmount =
    Math.round(grandTotal + grandTotal * taxRate) + shippingCost;

  return {
    grandTotal,
    taxAmount,
    taxRate,
    shippingCost,
    totalAmount,
  };
}
