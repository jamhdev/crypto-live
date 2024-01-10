export const marketCapCurrencyFormat = new Intl.NumberFormat(undefined, {
  currency: "usd",
  maximumSignificantDigits: 3,
});

export const percentFormat = new Intl.NumberFormat(undefined, {
  style: "percent",
});

export const marketCapPercentageFormat = new Intl.NumberFormat(undefined, {
  maximumSignificantDigits: 3,
});

export const percentageBarFormat = new Intl.NumberFormat(undefined, {
  maximumSignificantDigits: 3,
});
