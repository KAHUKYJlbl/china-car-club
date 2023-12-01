export type { ManufacturersType, CarsCountType } from './lib/types';
export { getFiltersQuery } from './lib/get-filters-query';
export { manufacturerSlice } from './model/manufacturer-slice';
export { fetchManufacturers } from './model/api-actions/fetch-manufacturers';
export { fetchFiltered } from './model/api-actions/fetch-filtered';
export { fetchManufacturersWithSpectsCount } from './model/api-actions/fetch-specs';
export {
  getCarsCount,
  getManufacturers,
  getManufacturersLoadingStatus,
  getSpecsLoadingStatus,
  getManuacturersList,
  getModelsList,
} from './model/manufacturer-selectors';
