import { PriceHistoryType } from "../../../../entities/specification";

import { PriceTypes } from "../const";

export const getPriceChanges = (prices: PriceHistoryType[], currentPrice: PriceTypes) => {
  if (prices.length) {
    return prices
      .toReversed()
      .reduce<PriceHistoryType[]>((acc, current) => {
        if (
          acc[acc.length - 1][currentPrice === PriceTypes.Factory ? 'factoryPrice' : 'dealerPrice']
          ===
          current[currentPrice === PriceTypes.Factory ? 'factoryPrice' : 'dealerPrice']
        ) {
          return acc;
        }
        return acc.concat(current);
      }, [prices[prices.length - 1]])
      .filter((price) => price[currentPrice === PriceTypes.Factory ? 'factoryPrice' : 'dealerPrice'] !== 0)
      .toReversed()
  }
  return [];
};
