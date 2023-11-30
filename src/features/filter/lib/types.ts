export type FilterElementType = {
  filterId?: FilterId;
  elementId: number;
  name: string;
}
export type FilterId = 'price' | 'engine' | 'body' | 'transmission' | 'drive' | 'region' | 'seats' | 'powerReserve' | 'acceleration' | 'date' | 'other';

export type FilterType = {
  name: string;
  elements: FilterElementType[];
}
