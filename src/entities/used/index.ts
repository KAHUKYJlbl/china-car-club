export { usedSlice, dropLists, setCurrentPage } from "./model/used-slice";
export { fetchUsedSpecifications } from "./model/api-actions/fetch-used-specifications";
export { fetchUsedManufacturers } from "./model/api-actions/fetch-used-manufacturers";
export { fetchUsedSeries } from "./model/api-actions/fetch-used-series";
export { fetchUsedAds } from "./model/api-actions/fetch-used-ads";
export { fetchAdById } from "./model/api-actions/fetch-ad-by-id";
export { UsedCard } from "./ui/used-card";
export {
  getUsedManufacturers,
  getUsedManuacturersList,
  getUsedManufacturersLoadingStatus,
  getUsedSeries,
  getUsedSeriesLoadingStatus,
  getUsedSeriesList,
  getUsedSpecifications,
  getUsedSpecificationsLoadingStatus,
  getUsedSpecificationsList,
  getUsedCount,
  getUsedAdsList,
  getUsedAdsLoadingStatus,
  getUsedAdsPagination,
  getCurrentAd,
  getCurrentAdLoadingStatus,
  getUsedShorts,
} from "./model/used-selectors";
