import { memo, useEffect } from "react";
import plural from "plural-ru";

import { getManufacturersLoadingStatus, getSpecsLoadingStatus } from "../../../entities/manufacturer";
import {
  fetchUsedSeries,
  getUsedCount,
  getUsedManuacturersList,
  getUsedSeriesList,
  getUsedSpecificationsList,
  getUsedSpecificationsLoadingStatus,
} from "../../../entities/used";
import { Dropdown } from "../../../shared/ui/dropdown";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";

import { FilterId } from "../../filter/lib/types";
import classes from "./choose-used-model.module.sass";
import { fetchUsedSpecifications } from "../../../entities/used/model/api-actions/fetch-used-specifications";

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
    const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
    const specsLoadingStatus = useAppSelector(getSpecsLoadingStatus);
    const manufacturersList = useAppSelector(getUsedManuacturersList);
    const modelsList = useAppSelector(getUsedSeriesList);
    const specifications = useAppSelector(getUsedSpecificationsList);
    const specificationsLoadingStatus = useAppSelector(getUsedSpecificationsLoadingStatus);

    useEffect(() => {
      setCurrentModel(null);
      setCurrentSpecification(null);

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

    useEffect(() => {
      setCurrentManufacturer(null);
    }, [carsCount.manufacturersCount, carsCount.seriesCount, carsCount.specificationsCount]);

    if (manufacturersLoadingStatus.isLoading || !manufacturersList) {
      return <LoadingSpinner spinnerType="widget" />;
    }

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
          />

          <Dropdown
            currentElement={currentModel}
            setCurrent={setCurrentModel}
            placeholder={"Модель"}
            list={modelsList}
            disabled={specsLoadingStatus.isLoading}
          />

          <Dropdown
            currentElement={currentSpecification}
            setCurrent={setCurrentSpecification}
            placeholder={"Комплектация"}
            list={specifications}
            disabled={specificationsLoadingStatus.isLoading}
          />
        </div>
      </div>
    );
  }
);
