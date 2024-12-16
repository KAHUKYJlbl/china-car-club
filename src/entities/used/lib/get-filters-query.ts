import { FilterId } from "../../../features/filter/lib/types";

export const getFiltersQuery = (filters: Partial<Record<FilterId, number[]>>) =>
  Object.keys(filters)
    .toSorted()
    .map((filterId) =>
      filters[filterId as FilterId]
        ? filters[filterId as FilterId]
            ?.toSorted((a, b) => a - b)
            .map((elementId) => `filter[${filterId}][]=${elementId}`)
            .join("&")
        : "",
    )
    .filter((filterQuery) => !!filterQuery)
    .join("&");
