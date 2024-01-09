export type CurrencyType = {
  cny: number;
  usd: number;
};

export type CurrencyServerType = {
  value: number;
  fromCurrencyId: number;
  toCurrencyId: number;
}
