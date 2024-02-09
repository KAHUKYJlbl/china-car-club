export type { SpecificationType } from './lib/types';
export { fetchSpecifications } from './model/api-actions/fetch-specifications';
export { fetchSpecificationsInfo } from './model/api-actions/fetch-specification-info';
export { specificationSlice } from './model/specification-slice';
export { getSpecifications, getSpecificationsLoadingStatus } from './model/specification-selectors';
