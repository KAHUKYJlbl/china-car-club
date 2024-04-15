export type FilterId = 'price' | 'engine' | 'body' | 'transmission' | 'drive' | 'region' | 'seats' | 'powerReserve' | 'acceleration' | 'date' | 'other' | 'clearance';

export type FilterElementType = {
  filterId?: FilterId;
  elementId: number;
  name: string;
}

export type FilterType = {
  name: string;
  elements: FilterElementType[];
}
