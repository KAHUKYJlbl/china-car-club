import { PriceHistoryType } from "../../../../entities/specification";

export const getPriceChanges = (prices: PriceHistoryType[]) => {
  if (prices.length) {
    return prices
      .toReversed()
      .reduce<PriceHistoryType[]>((acc, current) => {
        if (acc[acc.length - 1].factoryPrice === current.factoryPrice) {
          return acc;
        }
        return acc.concat(current);
      }, [prices[prices.length - 1]])
      .toReversed()
  }
  return [];
};
