import { memo, useEffect } from "react";
import plural from "plural-ru";

import {
  fetchManufacturersWithSpectsCount,
  getCarsCount,
  getManuacturersList,
  getManufacturersLoadingStatus,
  getModelsList,
  getSpecsLoadingStatus,
} from "../../../entities/manufacturer";
import {
  fetchSpecifications,
  getCheapestSpecification,
  getSpecifications,
  getSpecificationsLoadingStatus,
} from "../../../entities/specification";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { Dropdown, DropdownBlocks } from "../../../shared/ui/dropdown";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";

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

    const carsCount = useAppSelector(getCarsCount);
    const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
    const specsLoadingStatus = useAppSelector(getSpecsLoadingStatus);
    const manufacturersList = useAppSelector(getManuacturersList);
    const modelsList = useAppSelector((state) => getModelsList(state, currentManufacturer));
    const specifications = useAppSelector(getSpecifications);
    const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
    const cheapest = useAppSelector(getCheapestSpecification);

    useEffect(() => {
      setCurrentModel(null);
      setCurrentSpecification(null);

      if (currentManufacturer) {
        dispatch(
          fetchManufacturersWithSpectsCount({
            manufacturerId: currentManufacturer,
            filters: activeFilters,
          })
        );
      }
    }, [currentManufacturer]);

    useEffect(() => {
      if (currentModel && currentManufacturer) {
        dispatch(
          fetchSpecifications({
            manufacturerId: currentManufacturer,
            modelId: currentModel,
            filters: activeFilters,
          })
        );
      }
    }, [currentModel]);

    useEffect(() => {
      if (specifications && specifications.length !== 0) {
        setCurrentSpecification(cheapest?.id);
      }
    }, [cheapest?.id]);

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
            {plural(carsCount.specificationsCount, "%d комплектация", "%d комплектации", "%d комплектаций")}
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
