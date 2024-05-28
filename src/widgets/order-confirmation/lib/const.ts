import { TaxesTypes } from "../../model-info";

export const TAX_NAMES = {
  [TaxesTypes.PERS]: 'Растаможивание на физлицо',
  [TaxesTypes.SELL]: 'Растаможивание на физлицо',
  [TaxesTypes.CORP]: 'Растаможивание на юрлицо',
  [TaxesTypes.VAT]: 'Растаможивание на юрлицо',
};

export const TAX_SUBNAMES = {
  [TaxesTypes.PERS]: 'Для личного пользования',
  [TaxesTypes.SELL]: 'На перепродажу',
  [TaxesTypes.CORP]: 'Без вычета НДС',
  [TaxesTypes.VAT]: 'С вычетом НДС',
};
