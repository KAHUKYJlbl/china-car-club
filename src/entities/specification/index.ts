export type { SpecificationType } from './lib/types';
export { fetchSpecifications } from './model/api-actions/fetch-specifications';
export { fetchSpecificationsInfo } from './model/api-actions/fetch-specification-info';
export { specificationSlice } from './model/specification-slice';
export { getSpecifications, getCheapestSpecification, getSpecificationsLoadingStatus, getPrice } from './model/specification-selectors';
