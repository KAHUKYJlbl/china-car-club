import { PriceType } from "../../../../entities/model";
import { TaxesTypes } from "../const";

export const getTaxes = (taxType: TaxesTypes, prices: PriceType) => {
  switch (taxType) {
    case TaxesTypes.PERS:
      return prices.customsClearancePers;
    case TaxesTypes.CORP:
      return prices.customsClearanceCorp;
    case TaxesTypes.SELL:
      return prices.customsClearanceResale;
    case TaxesTypes.VAT:
      return {
        ...prices.customsClearanceCorp,
        final: prices.customsClearanceCorp.final - prices.customsClearanceCorp.nds,
      };
  }
}
