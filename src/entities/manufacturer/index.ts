export type { ManufacturersType, CarsCountType } from './lib/types';
export { manufacturerSlice } from './model/manufacturer-slice';
export { fetchManufacturers } from './model/api-actions/fetch-manufacturers';
export {
  getCarsCount,
  getManufacturersLoadingStatus,
  getManuacturersList
} from './model/manufacturer-selectors';
