import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import dayjs from "dayjs";

import {
  dropLists,
  fetchUsedAds,
  fetchUsedManufacturers,
  fetchUsedSeries,
  fetchUsedSpecifications,
  getUsedAdsList,
  getUsedAdsLoadingStatus,
  getUsedAdsPagination,
  getUsedManufacturersLoadingStatus,
  getUsedSeriesLoadingStatus,
  getUsedSpecificationsLoadingStatus,
  setCurrentPage,
  UsedCard,
} from "../../../entities/used";
import { getCurrency } from "../../../entities/currency";
import { Filter, FilterId } from "../../../features/filter";
import { ChooseUsedModel } from "../../../features/choose-used-model";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { Pagination } from "../../../shared/ui/pagination";

import classes from "./used-list.module.sass";

type UsedListProps = {};

export const UsedList = ({}: UsedListProps) => {
  const dispatch = useAppDispatch();
  const [_searchParams, setSearchParams] = useSearchParams();

  const [activeFilters, setActiveFilters] = useState<Partial<Record<FilterId, number[]>>>({});
  const [currentManufacturer, setCurrentManufacturer] = useState<number | null>(null);
  const [currentModel, setCurrentModel] = useState<number | null>(null);
  const [currentSpecification, setCurrentSpecification] = useState<number | null>(null);
  const [filtersToFetch] = useDebounce(activeFilters, 650);
  const manufacturersLoadingStatus = useAppSelector(getUsedManufacturersLoadingStatus);
  const seriesLoadingStatus = useAppSelector(getUsedSeriesLoadingStatus);
  const specificationsLoadingStatus = useAppSelector(getUsedSpecificationsLoadingStatus);
  const adsLoadingStatus = useAppSelector(getUsedAdsLoadingStatus);
  const adsList = useAppSelector(getUsedAdsList);
  const currency = useAppSelector(getCurrency);
  const pagination = useAppSelector(getUsedAdsPagination);

  const paginationHandler = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    dispatch(dropLists());
    dispatch(setCurrentPage(1));

    dispatch(fetchUsedManufacturers(filtersToFetch));

    if (currentManufacturer) {
      dispatch(
        fetchUsedSeries({
          manufacturerId: [currentManufacturer],
          filters: activeFilters,
        })
      );
    }

    if (currentModel) {
      dispatch(
        fetchUsedSpecifications({
          seriesIds: [currentModel],
          filters: activeFilters,
        })
      );
    }
  }, [filtersToFetch]);

  useEffect(() => {
    if (!adsLoadingStatus.isLoading && manufacturersLoadingStatus.isSuccess) {
      dispatch(
        fetchUsedAds({
          manufacturerIds: currentManufacturer ? [currentManufacturer] : [],
          seriesIds: currentModel ? [currentModel] : [],
          specificationIds: currentSpecification ? [currentSpecification] : [],
          filters: filtersToFetch,
          currentPage: pagination.currentPage,
        })
      );
    }
  }, [
    seriesLoadingStatus.isSuccess,
    specificationsLoadingStatus.isSuccess,
    currentSpecification,
    filtersToFetch,
    pagination.currentPage,
  ]);

  useEffect(() => {
    setSearchParams({
      manufacturer: currentManufacturer?.toString() || "",
      model: currentModel?.toString() || "",
      specification: currentSpecification?.toString() || "",
    });
  }, [currentManufacturer, currentModel, currentSpecification]);

  if (!currency || manufacturersLoadingStatus.isIdle) {
    return <LoadingSpinner spinnerType="page" />;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.filter}>
        <Filter
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      </div>

      <div className={classes.sort}>
        <svg
          className={classes.grey}
          width={12}
          height={14}
          aria-hidden="true"
        >
          <use xlinkHref="#sort" />
        </svg>

        <p className={classes.grey}>Сортировка:</p>

        <p>Сначала новые объявления</p>
      </div>

      <div className={classes.model}>
        <ChooseUsedModel
          currentManufacturer={currentManufacturer}
          setCurrentManufacturer={setCurrentManufacturer}
          currentModel={currentModel}
          setCurrentModel={setCurrentModel}
          currentSpecification={currentSpecification}
          setCurrentSpecification={setCurrentSpecification}
          activeFilters={activeFilters}
        />
      </div>

      {adsList.length === 0 ? (
        <p className={classes.empty}>Ничего не найдено</p>
      ) : (
        <div className={classes.listWrapper}>
          {adsLoadingStatus.isLoading ? (
            <LoadingSpinner spinnerType="page" />
          ) : (
            <>
              <ul className={classes.list}>
                {adsList
                  .toSorted(
                    (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
                    // currentSort === "increase"
                    //   ? dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
                    //   : dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
                  )
                  .map((ads) => (
                    <UsedCard
                      ads={ads}
                      currency={currency}
                      key={ads.id}
                    />
                  ))}
              </ul>

              <Pagination
                currentPage={pagination.currentPage}
                pagesCount={pagination.lastPage}
                setCurrentPage={paginationHandler}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
