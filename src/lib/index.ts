export const formatCurrency = (value: number | string) => {
  let numericValue: number;

  if (typeof value === "number") {
    numericValue = value;
  } else {
    numericValue = Number(value);
    if (isNaN(numericValue)) return value;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numericValue);
};
