export { usedSlice, dropLists, setCurrentPage } from "./model/used-slice";
export { fetchUsedManufacturers } from "./model/api-actions/fetch-used-manufacturers";
export { fetchUsedSeries } from "./model/api-actions/fetch-used-series";
export { fetchUsedAds } from "./model/api-actions/fetch-used-ads";
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
} from "./model/used-selectors";
