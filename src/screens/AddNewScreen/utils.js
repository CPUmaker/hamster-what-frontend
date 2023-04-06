const categories_map = {
  Food: 1,
  Transportation: 2,
  Shopping: 3,
  Entertainment: 4,
  Housing: 5,
  Utilities: 6,
  Other: 7,
  // "Electronics": 8,
  // "Travel": 9,
  // "House & Car": 10,
  // "Salary": 11,
  // "Others": 12,
};

const wallets_map = {
  "Checking account": 1,
  "Credit account": 2,
  Cash: 3,
  "Savings account": 4,
  Other: 5,
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export { categories_map, wallets_map, getKeyByValue };
