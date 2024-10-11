import { memo, useEffect } from "react";
import plural from "plural-ru";

import {
  fetchUsedSeries,
  fetchUsedSpecifications,
  getUsedCount,
  getUsedManuacturersList,
  getUsedManufacturersLoadingStatus,
  getUsedSeriesList,
  getUsedSeriesLoadingStatus,
  getUsedSpecificationsList,
  getUsedSpecificationsLoadingStatus,
  setCurrentPage,
} from "../../../entities/used";
import { Dropdown, DropdownBlocks } from "../../../shared/ui/dropdown";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";

import { FilterId } from "../../filter/lib/types";
import classes from "./choose-used-model.module.sass";

type ChooseUsedModelProps = {
  currentManufacturer: number | null;
  setCurrentManufacturer: React.Dispatch<React.SetStateAction<number | null>>;
  currentModel: number | null;
  setCurrentModel: React.Dispatch<React.SetStateAction<number | null>>;
  currentSpecification: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
  activeFilters: Partial<Record<FilterId, number[]>>;
};

export const ChooseUsedModel = memo(
  ({
    currentManufacturer,
    setCurrentManufacturer,
    currentModel,
    setCurrentModel,
    currentSpecification,
    setCurrentSpecification,
    activeFilters,
  }: ChooseUsedModelProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const carsCount = useAppSelector(getUsedCount);
    const manufacturersLoadingStatus = useAppSelector(getUsedManufacturersLoadingStatus);
    const seriesLoadingStatus = useAppSelector(getUsedSeriesLoadingStatus);
    const manufacturersList = useAppSelector(getUsedManuacturersList);
    const modelsList = useAppSelector(getUsedSeriesList);
    const specifications = useAppSelector(getUsedSpecificationsList);
    const specificationsLoadingStatus = useAppSelector(getUsedSpecificationsLoadingStatus);

    useEffect(() => {
      setCurrentModel(null);
      setCurrentSpecification(null);
      dispatch(setCurrentPage(1));

      if (currentManufacturer) {
        dispatch(
          fetchUsedSeries({
            manufacturerId: [currentManufacturer],
            filters: activeFilters,
          })
        );
      }
    }, [currentManufacturer]);

    useEffect(() => {
      setCurrentSpecification(null);

      if (currentModel && currentManufacturer) {
        dispatch(
          fetchUsedSpecifications({
            seriesIds: [currentModel],
            filters: activeFilters,
          })
        );
      }
    }, [currentModel]);

    return (
      <div className={classes.wrapper}>
        <div className={classes.count}>
          <p>
            {plural(carsCount.manufacturersCount, "%d марка", "%d марки", "%d марок")}
            &#32;•&#32;
            {plural(carsCount.seriesCount, "%d модель", "%d модели", "%d моделей")}
            &#32;•&#32;
            {plural(carsCount.adsCount, "%d предложение", "%d предложения", "%d предложений")}
          </p>
        </div>

        <div className={classes.controls}>
          <Dropdown
            currentElement={currentManufacturer}
            setCurrent={setCurrentManufacturer}
            placeholder={"Марка"}
            list={manufacturersList}
            extraListHeader={{
              basicListHeader: "Все марки",
              extraListHeader: "Популярные",
            }}
            disabled={manufacturersLoadingStatus.isLoading}
          />

          <Dropdown
            currentElement={currentModel}
            setCurrent={setCurrentModel}
            placeholder={"Модель"}
            list={modelsList}
            disabled={seriesLoadingStatus.isLoading}
          />

          <DropdownBlocks
            currentElement={currentSpecification}
            setCurrent={setCurrentSpecification}
            placeholder="Комплектация"
            list={specifications}
            disabled={specificationsLoadingStatus.isLoading}
          />
        </div>
      </div>
    );
  }
);
