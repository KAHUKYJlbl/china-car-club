import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { getPromoGalleryLoadingStatus, fetchPromo } from "../../../entities/gallery";
import { Gallery } from "../../../entities/gallery/ui/gallery";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { Modal } from "../../../shared/ui/modal";
import {
  fetchSpecificationsImage,
  getDefaultImages,
  getSpecificationImgLoadingStatus,
  setSpecsIdle,
} from "../../../entities/specification";
import { fetchFiltered, getFiltersLoadingStatus, getManufacturersLoadingStatus } from "../../../entities/manufacturer";
import { setIdle } from "../../../entities/model";
import { ChooseModel } from "../../../features/choose-model";
import { ChooseDelivery } from "../../../features/choose-delivery";
import { Filter, FilterId } from "../../../features/filter";
import { ChooseSpecification } from "../../../features/choose-specification/ui/choose-specification";
import { SpecificationOptions, SpecificationColors } from "../../../features/choose-specification";

import classes from "./calculator.module.sass";

export const Calculator = (): JSX.Element => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const specificationImgLoadingStatus = useAppSelector(getSpecificationImgLoadingStatus);
  const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
  const filtersLoadingStatus = useAppSelector(getFiltersLoadingStatus);
  const galleryLoadingStatus = useAppSelector(getPromoGalleryLoadingStatus);

  const [activeFilters, setActiveFilters] = useState<Partial<Record<FilterId, number[]>>>({});
  const [currentManufacturer, setCurrentManufacturer] = useState<number | null>(null);
  const [currentModel, setCurrentModel] = useState<number | null>(null);
  const [currentSpecification, setCurrentSpecification] = useState<number | null>(null);
  const [promoMode, setPromoMode] = useState(false);
  const [filtersToFetch] = useDebounce(activeFilters, 650);

  // popups
  const [isColors, setIsColors] = useState(false);
  const [isAddOptions, setIsAddOptions] = useState(false);

  const imgList = useAppSelector(getDefaultImages);

  useEffect(() => {
    if (filtersLoadingStatus.isIdle && manufacturersLoadingStatus.isSuccess) {
      dispatch(fetchFiltered(filtersToFetch));
    }
  }, [filtersToFetch]);

  useEffect(() => {
    setSearchParams({
      manufacturer: currentManufacturer?.toString() || "",
      model: currentModel?.toString() || "",
      specification: currentSpecification?.toString() || "",
    });
  }, [currentManufacturer, currentModel, currentSpecification]);

  useEffect(() => {
    setCurrentSpecification(null);
    dispatch(setIdle());
    dispatch(setSpecsIdle());
  }, []);

  useEffect(() => {
    if (galleryLoadingStatus.isIdle) {
      dispatch(fetchPromo());
    }
  }, []);

  useEffect(() => {
    if (currentSpecification) {
      dispatch(fetchSpecificationsImage(currentSpecification));
    }
  }, [currentSpecification]);

  const handlePromo = (promoManufacturer: number, promoModel: number, promoSpecification: number) => {
    setPromoMode(true);
    setActiveFilters({});
    setCurrentManufacturer(promoManufacturer);
    setCurrentModel(promoModel);
    setCurrentSpecification(promoSpecification);
    setTimeout(() => setPromoMode(false), 2000);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.gallery}>
        {specificationImgLoadingStatus.isLoading ? (
          <LoadingSpinner spinnerType="widget" />
        ) : (
          <Gallery
            handlePromo={currentSpecification ? null : handlePromo}
            galleryList={imgList}
            specificationId={currentSpecification}
            modelId={currentModel}
            manufacturerId={currentManufacturer}
          />
        )}
      </div>

      <div className={classes.filter}>
        <Filter
          isNewFilters
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      </div>

      <div className={classes.model}>
        <ChooseModel
          isPromo={promoMode}
          currentManufacturer={currentManufacturer}
          setCurrentManufacturer={setCurrentManufacturer}
          currentModel={currentModel}
          setCurrentModel={setCurrentModel}
          setCurrentSpecification={setCurrentSpecification}
          activeFilters={activeFilters}
        />
      </div>

      <div className={classes.price}>
        <ChooseSpecification
          isPromo={promoMode}
          currentManufacturer={currentManufacturer}
          currentModel={currentModel}
          currentSpecification={currentSpecification}
          setCurrentSpecification={setCurrentSpecification}
          activeFilters={activeFilters}
          colorsCallback={() => setIsColors(true)}
          optionsCallback={() => setIsAddOptions(true)}
        />
      </div>

      <div className={classes.delivery}>
        <ChooseDelivery
          modelId={currentModel}
          specificationId={currentSpecification}
        />
      </div>

      {isColors && (
        <Modal onClose={() => setIsColors(false)}>
          <SpecificationColors
          // colors={colorList}
          />
        </Modal>
      )}

      {isAddOptions && (
        <Modal onClose={() => setIsAddOptions(false)}>
          <SpecificationOptions
            currentSpecification={currentSpecification}
            setCurrentSpecification={setCurrentSpecification}
          />
        </Modal>
      )}
    </div>
  );
};
