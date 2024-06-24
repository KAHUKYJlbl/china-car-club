export type { ManufacturersType, CarsCountType } from './lib/types';
export { getFiltersQuery } from './lib/get-filters-query';
export { manufacturerSlice } from './model/manufacturer-slice';
export { fetchManufacturers } from './model/api-actions/fetch-manufacturers';
export { fetchFiltered } from './model/api-actions/fetch-filtered';
export { fetchManufacturersWithSpectsCount } from './model/api-actions/fetch-specs';
export {
  getName,
  getManufacturerByModel,
  getCarsCount,
  getManufacturers,
  getManufacturersLoadingStatus,
  getSpecsLoadingStatus,
  getManuacturersList,
  getModelsList,
  getFullListCount,
} from './model/manufacturer-selectors';
