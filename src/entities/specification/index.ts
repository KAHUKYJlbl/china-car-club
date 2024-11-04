export type { SpecificationType, ImgUrlType, AddItemType, PriceHistoryType } from "./lib/types";
export { fetchSpecifications } from "./model/api-actions/fetch-specifications";
export { fetchSpecificationAddProducts } from "./model/api-actions/fetch-specification-add-products";
export { fetchSpecificationAddOptions } from "./model/api-actions/fetch-specification-add-options";
export { fetchSpecificationAddColors } from "./model/api-actions/fetch-specification-add-colors";
export { fetchSpecificationsInfo } from "./model/api-actions/fetch-specification-info";
export { fetchSpecificationPriceHistory } from "./model/api-actions/fetch-specification-price-history";
export { fetchSpecificationsImage } from "./model/api-actions/fetch-specification-image";
export { specificationSlice, setSpecsIdle } from "./model/specification-slice";
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
  getSpecificationAddOptions,
  getSpecificationAddColors,
  getSpecificationAddProductsLoadingStatus,
  getSpecificationAddOptionsLoadingStatus,
  getSpecificationAddColorsLoadingStatus,
  getSpecificationPriceHistory,
  getSpecificationPriceHistoryLoadingStatus,
} from "./model/specification-selectors";
