import { AddItemType } from "../../../../entities/specification";

export const getCurrentItem = (activeItems: number[], items: AddItemType[]) => {
  return items.find((item) => activeItems.includes(item.id))
};
