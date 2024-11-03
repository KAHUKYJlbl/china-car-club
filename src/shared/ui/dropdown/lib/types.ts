export type DropdownListType = {
  name: string;
  id: number;
  isHighlight?: boolean;
  sublistLength?: number | null;
  price?: number;
  chinaPrice?: number;
  year?: number;
  rusPrice?: number;
};

export type DropdownExtraListType = {
  extraListHeader: string;
  basicListHeader: string;
};
