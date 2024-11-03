import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { AppRoute } from "../../../app/provider/router";
import { getTotal } from "../../../features/choose-options/lib/utils/get-total";
import { getPrices } from "../../../features/choose-options/lib/utils/get-prices";
import { PriceOptions, SpecificationColors, SpecificationOptions } from "../../../features/choose-specification";
import { SpecificationInfo } from "../../../features/choose-specification/ui/specification-info";
import {
  fetchSpecificationAddProducts,
  fetchSpecificationsImage,
  fetchSpecificationsInfo,
  getExtColors,
  getImagesByColor,
  getInitSlide,
  getIntColors,
  getSpecificationAddProductsLoadingStatus,
  getSpecificationImgLoadingStatus,
  getSpecificationsLoadingStatus,
} from "../../../entities/specification";
import { fetchCurrency, getCurrency, getCurrencyLoadingStatus, getCurrentCurrency } from "../../../entities/currency";
import { getManufacturerByModel, getManufacturersLoadingStatus } from "../../../entities/manufacturer";
import {
  getAddedOptionsPrice,
  getAddItemsPrice,
  getAdds,
  getCurrentColor,
  getCurrentColorPrice,
  getCurrentTax,
} from "../../../entities/order/index";
import { resetOrder, setCurrentColor } from "../../../entities/order/model/order-slice";
import { fetchModel, getModelLoadingStatus, getSpecificationParams } from "../../../entities/model";
import { Gallery } from "../../../entities/gallery/ui/gallery";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { Modal } from "../../../shared/ui/modal";

import { TaxesTypes } from "../lib/const";
import { PriceHistory } from "./price-history";
import { OrderButtons } from "./order-buttons";
import { Questions } from "./questions";
import { InfoBar } from "./info-bar";
import { Techs } from "./techs";
import { Taxes } from "./taxes";
import { Adds } from "./adds";
import classes from "./model-info.module.sass";
import { fetchSpecificationAddOptions } from "../../../entities/specification/model/api-actions/fetch-specification-add-options";
import { fetchSpecificationAddColors } from "../../../entities/specification/model/api-actions/fetch-specification-add-colors";

type ModelInfoProps = {
  setConfirmation: () => void;
};

export const ModelInfo = ({ setConfirmation }: ModelInfoProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
  const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
  const specificationImgLoadingStatus = useAppSelector(getSpecificationImgLoadingStatus);
  const modelLoadingStatus = useAppSelector(getModelLoadingStatus);
  const extColors = useAppSelector(getExtColors);
  const intColors = useAppSelector(getIntColors);
  const currency = useAppSelector(getCurrency);
  const currentCurrency = useAppSelector(getCurrentCurrency);
  const manufacturerId = useAppSelector((state) => getManufacturerByModel(state, Number(searchParams.get("model"))));
  const currentTax = useAppSelector(getCurrentTax);
  const options = useAppSelector(getAdds);
  const addItemsPrice = useAppSelector(getAddItemsPrice);
  const currentColor = useAppSelector(getCurrentColor);
  const specificationAddProductsLoadingStatus = useAppSelector(getSpecificationAddProductsLoadingStatus);
  const addedOptionsPrice = useAppSelector(getAddedOptionsPrice);
  const addColorPrice = useAppSelector(getCurrentColorPrice);

  // popups
  const [isTechs, setIsTechs] = useState(false);
  const [isAddProducts, setIsAddProducts] = useState(false);
  const [isTaxes, setIsTaxes] = useState(false);
  const [isPriceHistory, setIsPriceHistory] = useState(false);
  const [isQuestions, setIsQuestions] = useState(false);
  const [isColors, setIsColors] = useState(false);
  const [isAddOptions, setIsAddOptions] = useState(false);

  const [currentSpecification, setCurrentSpecification] = useState<number | null>(Number(searchParams.get("spec")));

  const specificationParams = useAppSelector((state) => getSpecificationParams(state, currentSpecification));
  const imgList = useAppSelector((state) => getImagesByColor(state, currentColor));
  const initSlide = useAppSelector((state) => getInitSlide(state, currentColor));

  useEffect(() => {
    if (specificationImgLoadingStatus.isSuccess) {
      dispatch(
        setCurrentColor({
          int: intColors ? intColors[0].color.id : null,
          ext: extColors ? extColors[0].color.id : null,
          isInteriorFirst: false,
        })
      );
    }
  }, [specificationImgLoadingStatus.isSuccess]);

  useEffect(() => {
    if (searchParams.get("model") && !modelLoadingStatus.isLoading) {
      dispatch(fetchModel(searchParams.get("model")!));
      dispatch(
        fetchSpecificationsInfo({
          modelId: Number(searchParams.get("model")),
          filters: {},
        })
      );
    }
  }, []);

  useEffect(() => {
    if (currentSpecification && !specificationAddProductsLoadingStatus.isLoading) {
      dispatch(resetOrder());
      dispatch(fetchSpecificationsImage(currentSpecification));
      dispatch(fetchSpecificationAddProducts(currentSpecification));
      dispatch(fetchSpecificationAddOptions(currentSpecification));
      dispatch(fetchSpecificationAddColors(currentSpecification));
    }
  }, [currentSpecification]);

  useEffect(() => {
    if (currencyLoadingStatus.isIdle) {
      dispatch(fetchCurrency());
    }
  }, []);

  useEffect(() => {
    if (currentSpecification) {
      setSearchParams({
        model: searchParams.get("model")!,
        spec: currentSpecification.toString(),
      });
    }
  }, [currentSpecification]);

  useEffect(() => {
    if (modelLoadingStatus.isFailed) {
      navigate(AppRoute.NotFound);
    }
  }, [modelLoadingStatus.isFailed]);

  if (
    specificationImgLoadingStatus.isLoading ||
    specificationsLoadingStatus.isLoading ||
    manufacturersLoadingStatus.isLoading ||
    modelLoadingStatus.isLoading ||
    !specificationParams ||
    !currency
  ) {
    return <LoadingSpinner spinnerType="page" />;
  }

  if (!searchParams.get("model") || !searchParams.get("spec")) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.gallery}>
        <Gallery
          galleryList={imgList}
          specificationId={currentSpecification}
          modelId={Number(searchParams.get("model"))}
          manufacturerId={manufacturerId}
          initSlide={initSlide}
        />
      </div>

      <div className={classes.specification}>
        <SpecificationInfo
          currentSpecification={currentSpecification}
          setCurrentSpecification={setCurrentSpecification}
        />
      </div>

      <div className={classes.info}>
        <InfoBar
          currentSpecification={currentSpecification}
          setIsTechs={setIsTechs}
          setIsPriceHistory={setIsPriceHistory}
        />
      </div>

      <div className={classes.pricesWrapper}>
        <div className={classes.prices}>
          <PriceOptions
            prices={specificationParams.price}
            setIsTaxes={setIsTaxes}
            colorsCallback={() => setIsColors(true)}
            optionsCallback={() => setIsAddOptions(true)}
            addProductsCallback={() => setIsAddProducts(true)}
            taxesCallback={() => setIsTaxes(true)}
          />
        </div>
      </div>

      <div className={classes.buttons}>
        <OrderButtons
          specificationId={currentSpecification}
          epts={options.epts}
          onOrder={() => setIsQuestions(true)}
          prices={{
            totalPrice: Number(
              getTotal({
                totalPrice: getPrices(currentTax, specificationParams.price) + addColorPrice + addedOptionsPrice,
                options,
                optionsPrices: {
                  epts: specificationParams.price.eptsSbktsUtil,
                  guarantee: 0,
                  options: addItemsPrice,
                },
                currency,
                currentCurrency,
              })
            ),
            minPrice: specificationParams.price.inChina,
            tax: specificationParams.price.tax,
            comission: specificationParams.price.commission,
            borderPrice: specificationParams.price.borderPrice,
            customsPrice:
              currentTax === TaxesTypes.PERS
                ? specificationParams.price.customsClearancePers.final
                : specificationParams.price.customsClearanceCorp.final,
          }}
        />
      </div>

      {isTechs && (
        <Modal
          onClose={() => setIsTechs(false)}
          button
        >
          <Techs
            currentSpecification={currentSpecification}
            setCurrentSpecification={setCurrentSpecification}
            techs={specificationParams}
          />
        </Modal>
      )}

      {isAddProducts && (
        <Modal
          onClose={() => setIsAddProducts(false)}
          button
        >
          <Adds
            currentSpecification={currentSpecification}
            setCurrentSpecification={setCurrentSpecification}
            techs={specificationParams}
          />
        </Modal>
      )}

      {isTaxes && (
        <Modal
          onClose={() => setIsTaxes(false)}
          button
        >
          <Taxes
            currentSpecification={currentSpecification}
            setCurrentSpecification={setCurrentSpecification}
            techs={specificationParams}
          />
        </Modal>
      )}

      {isPriceHistory && (
        <Modal
          onClose={() => setIsPriceHistory(false)}
          button
        >
          <PriceHistory
            currentSpecification={currentSpecification}
            setCurrentSpecification={setCurrentSpecification}
          />
        </Modal>
      )}

      {isQuestions && (
        <Modal onClose={() => null}>
          <Questions setConfirmation={setConfirmation} />
        </Modal>
      )}

      {isColors && (
        <Modal
          onClose={() => setIsColors(false)}
          button
          width
        >
          <SpecificationColors currentSpecification={currentSpecification} />
        </Modal>
      )}

      {isAddOptions && (
        <Modal
          onClose={() => setIsAddOptions(false)}
          width
        >
          <SpecificationOptions
            currentSpecification={currentSpecification}
            setCurrentSpecification={setCurrentSpecification}
            techs={specificationParams}
          />
        </Modal>
      )}
    </div>
  );
};
