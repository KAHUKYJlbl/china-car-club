export { modelSlice, setIdle, setPending } from './model/model-slice';
export { fetchModel } from './model/api-actions/fetch-model';
export { getSpecificationParams, getModelLoadingStatus, getModel } from './model/model-selectors';
export type { SpecsType, PriceType } from './lib/types';
