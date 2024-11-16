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
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { Dropdown } from "../../../shared/ui/dropdown";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";

import { FilterId } from "../../filter/lib/types";
import classes from "./choose-model.module.sass";
import { fetchModel } from "../../../entities/model";

type ChooseModelProps = {
  isPromo: boolean;
  currentManufacturer: number | null;
  setCurrentManufacturer: React.Dispatch<React.SetStateAction<number | null>>;
  currentModel: number | null;
  setCurrentModel: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
  activeFilters: Partial<Record<FilterId, number[]>>;
};

export const ChooseModel = memo(
  ({
    isPromo,
    currentManufacturer,
    setCurrentManufacturer,
    currentModel,
    setCurrentModel,
    setCurrentSpecification,
    activeFilters,
  }: ChooseModelProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const carsCount = useAppSelector(getCarsCount);
    const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
    const specsLoadingStatus = useAppSelector(getSpecsLoadingStatus);
    const manufacturersList = useAppSelector(getManuacturersList);
    const modelsList = useAppSelector((state) => getModelsList(state, currentManufacturer));

    useEffect(() => {
      if (!isPromo) {
        setCurrentModel(null);
        setCurrentSpecification(null);
      }

      if (currentManufacturer) {
        dispatch(
          fetchManufacturersWithSpectsCount({
            manufacturerId: currentManufacturer,
            filters: activeFilters,
          }),
        );
      }
    }, [currentManufacturer]);

    useEffect(() => {
      if (currentModel) {
        dispatch(fetchModel(currentModel.toString()));
      }
    }, [currentModel]);

    useEffect(() => {
      if (!isPromo) {
        setCurrentManufacturer(null);
      }
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
        </div>
      </div>
    );
  },
);
