import { SORT_DIRECTION, SORT_TYPE, SortItemType } from "../../../features/sort";

export const USED_SORT: SortItemType[] = [
  {
    name: "Сначала свежие предложнния",
    id: `${SORT_DIRECTION.Ascend}_${SORT_TYPE.Date}`,
  },
  {
    name: "По возрастанию цены",
    id: `${SORT_DIRECTION.Descend}_${SORT_TYPE.Price}`,
  },
  {
    name: "По убыванию цены",
    id: `${SORT_DIRECTION.Ascend}_${SORT_TYPE.Price}`,
  },
  {
    name: "Сначала мин. пробег",
    id: `${SORT_DIRECTION.Descend}_${SORT_TYPE.Mileage}`,
  },
  {
    name: "Сначала мин. возраст авто",
    id: `${SORT_DIRECTION.Ascend}_${SORT_TYPE.Age}`,
  },
];
