const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number, currency: string) {
  return currencyFormatter
    .format(amount)
    .replace("US$", currency === "USD" ? "$" : `${currency} `);
}
