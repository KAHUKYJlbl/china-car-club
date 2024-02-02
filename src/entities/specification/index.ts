export type { SpecificationType } from './lib/types';
export { fetchSpecifications } from './model/api-actions/fetch-specifications';
export { fetchSpecificationsInfo } from './model/api-actions/fetch-specification-info';
export { fetchSpecificationsImage } from './model/api-actions/fetch-specification-image';
export { specificationSlice } from './model/specification-slice';
export {
  getSpecifications,
  getSpecificationImg,
  getExtColors,
  getIntColors,
  getPrice,
  getCheapestSpecification,
  getSpecificationsLoadingStatus,
  getSpecificationImgLoadingStatus,
  getImagesByColor,
} from './model/specification-selectors';
