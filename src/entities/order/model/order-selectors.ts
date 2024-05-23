import { NameSpace, State } from '../../../app/provider/store';
import { AddsType, CurrentColorType, TaxesTypes } from '../../../widgets/model-info';

export const getCurrentTax = (state: State): TaxesTypes => state[NameSpace.Order].currentTax;

export const getAdds = (state: State): Record<AddsType, boolean> => state[NameSpace.Order].adds;

export const getAddItems = (state: State): number[] => state[NameSpace.Order].addItems;

export const getAddItemsPrice = (state: State): number => state[NameSpace.Order].addItemsPrice;

export const getCurrentColor = (state: State): CurrentColorType => state[NameSpace.Order].currentColor;
