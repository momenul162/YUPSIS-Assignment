const UNIT_MG = {
  tons: 1000000000,
  kilograms: 1000000,
  grams: 1000,
  milligrams: 1,
};

function toMilligrams(stock) {
  return (
    (stock.tons || 0) * UNIT_MG.tons +
    (stock.kilograms || 0) * UNIT_MG.kilograms +
    (stock.grams || 0) * UNIT_MG.grams +
    (stock.milligrams || 0) * UNIT_MG.milligrams
  );
}

function fromMilligrams(totalMg) {
  const tons = Math.floor(totalMg / UNIT_MG.tons);
  totalMg %= UNIT_MG.tons;
  const kilograms = Math.floor(totalMg / UNIT_MG.kilograms);
  totalMg %= UNIT_MG.kilograms;
  const grams = Math.floor(totalMg / UNIT_MG.grams);
  totalMg %= UNIT_MG.grams;
  const milligrams = totalMg;
  return { tons, kilograms, grams, milligrams };
}

function updateStock(current, change, operation) {
  let currentMg = toMilligrams(current);
  let changeMg = toMilligrams(change);

  if (operation === "purchase") {
    currentMg += changeMg;
  } else if (operation === "sell") {
    currentMg -= changeMg;
    if (currentMg < 0) currentMg = 0;
  } else {
    throw new Error("Invalid operation");
  }

  return fromMilligrams(currentMg);
}

// Example usage:
const initialStock = { tons: 1, kilograms: 0, grams: 0, milligrams: 0 };

const afterSale = updateStock(
  initialStock,
  { tons: 0, kilograms: 1, grams: 1, milligrams: 0 },
  "sell"
);

console.log("After sale:", afterSale);

const afterPurchase = updateStock(
  afterSale,
  { tons: 1, kilograms: 0, grams: 30, milligrams: 0 },
  "purchase"
);

console.log("After purchase:", afterPurchase);
