export type { SpecificationType, ImgUrlType, AddItemType } from './lib/types';
export { fetchSpecifications } from './model/api-actions/fetch-specifications';
export { fetchSpecificationAddProducts } from './model/api-actions/fetch-specification-add-products';
export { fetchSpecificationsInfo } from './model/api-actions/fetch-specification-info';
export { fetchSpecificationsImage } from './model/api-actions/fetch-specification-image';
export { specificationSlice, setSpecsIdle } from './model/specification-slice';
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
  getDefaultImages,
  getInitSlide,
  getSpecificationName,
  getSpecificationAddProducts,
  getSpecificationAddProductsLoadingStatus,
} from './model/specification-selectors';
