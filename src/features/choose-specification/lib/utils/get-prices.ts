import { PriceType } from "../../../../entities/model";
import { TaxesTypes } from "../../../../widgets/model-info";

export const getPrices = (taxType: TaxesTypes, prices: PriceType) => {
  switch (taxType) {
    case TaxesTypes.PERS:
      return prices.withLogisticsPers;
    case TaxesTypes.CORP:
      return prices.withLogisticsCorp;
    case TaxesTypes.SELL:
      return prices.withLogisticsResale;
    case TaxesTypes.VAT:
      return prices.withLogisticsCorp - prices.customsClearanceCorp.nds;
  }
}
