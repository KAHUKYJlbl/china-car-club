export type FilterId =
  | "price"
  | "engine"
  | "body"
  | "transmission"
  | "drive"
  | "region"
  | "seats"
  | "powerReserve"
  | "acceleration"
  | "date"
  | "other"
  | "clearance"
  | "mileage"
  | "age";

export type FilterElementType = {
  filterId?: FilterId;
  elementId: number;
  name: string;
};

export type FilterType = {
  isNew: boolean;
  name: string;
  elements: FilterElementType[];
};
