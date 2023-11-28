export type FilterElementType = {
  elementId: number;
  name: string;
}

export type FilterId = 'price' | 'engine' | 'body' | 'transmission' | 'drive' | 'region';

export type FilterType = {
  name: string;
  elements: FilterElementType[];
}
