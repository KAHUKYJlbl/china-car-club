export { modelSlice, setIdle, setPending } from './model/model-slice';
export { fetchModel } from './model/api-actions/fetch-model';
export { getSpecificationParams, getModelLoadingStatus, getModel, getShorts } from './model/model-selectors';
export type { SpecsType, PriceType, ParamsType, PriceApiType, SeriesApiType, ParametrApiType } from './lib/types';
