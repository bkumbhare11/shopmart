export function priceCalculator(price, discountPercentage) {
  const rate = 84;
  const total = rate * price;
  const priceInINR = Math.round(total);
  const discount = Math.round(discountPercentage);
  const finalPrice = Math.round(priceInINR - (priceInINR * discount) / 100);

  return {
    priceInINR,
    discount,
    finalPrice,
  };
}
