import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import { AppRoute } from "../../../app/provider/router";
import { getTotal } from "../../../features/choose-options/lib/utils/get-total";
import { getPrices } from "../../../features/choose-options/lib/utils/get-prices";
import { ChooseOptions } from "../../../features/choose-options/ui/choose-options";
import {
  fetchSpecificationAddProducts,
  getImagesByColor,
  getInitSlide,
  getSpecificationAddProductsLoadingStatus,
} from "../../../entities/specification";
import {
  Currency,
  fetchCurrency,
  getCurrency,
  getCurrencyLoadingStatus,
  getCurrentCurrency,
} from "../../../entities/currency";
import { Gallery } from "../../../entities/gallery/ui/gallery";
import { getManufacturerByModel } from "../../../entities/manufacturer";
import { getAddItemsPrice, getAdds, getCurrentColor, getCurrentTax } from "../../../entities/order/index";
import { fetchAdById, getCurrentAd, getCurrentAdLoadingStatus } from "../../../entities/used";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { Modal } from "../../../shared/ui/modal";

import { TaxesTypes } from "../lib/const";
import { UsedSpecificationInfo } from "./used-specification-info";
import { PriceHistory } from "./price-history";
import { OrderButtons } from "./order-buttons";
import { Questions } from "./questions";
import { InfoBar } from "./info-bar";
import { Prices } from "./prices";
// import { Techs } from "./techs";
// import { Taxes } from "./taxes";
// import { Adds } from "./adds";
import classes from "./model-info.module.sass";

type ModelInfoProps = {
  setConfirmation: () => void;
};

export const UsedModelInfo = ({ setConfirmation }: ModelInfoProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [searchParams, _setSearchParams] = useSearchParams();

  const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
  const adInfo = useAppSelector(getCurrentAd);
  const adLoadingStatus = useAppSelector(getCurrentAdLoadingStatus);
  // const extColors = useAppSelector(getExtColors);
  // const intColors = useAppSelector(getIntColors);
  const currency = useAppSelector(getCurrency);
  const currentCurrency = useAppSelector(getCurrentCurrency);
  const manufacturerId = useAppSelector((state) => getManufacturerByModel(state, Number(searchParams.get("model"))));
  const currentTax = useAppSelector(getCurrentTax);
  const options = useAppSelector(getAdds);
  const addItemsPrice = useAppSelector(getAddItemsPrice);
  const currentColor = useAppSelector(getCurrentColor);
  const specificationAddProductsLoadingStatus = useAppSelector(getSpecificationAddProductsLoadingStatus);

  // popups
  const [_isTechs, setIsTechs] = useState(false);
  const [_isAddProducts, setIsAddProducts] = useState(false);
  const [_isTaxes, setIsTaxes] = useState(false);
  const [isPriceHistory, setIsPriceHistory] = useState(false);
  const [isQuestions, setIsQuestions] = useState(false);

  const [currentSpecification, setCurrentSpecification] = useState<number | null>(Number(searchParams.get("spec")));

  const imgList = useAppSelector((state) => getImagesByColor(state, currentColor));
  const initSlide = useAppSelector((state) => getInitSlide(state, currentColor));

  useEffect(() => {
    if (searchParams.get("ad") && !adLoadingStatus.isLoading) {
      // Ad Image
      // dispatch(fetchSpecificationsImage(currentSpecification));
      dispatch(fetchAdById(searchParams.get("ad")!));
    }
  }, []);

  useEffect(() => {
    if (currentSpecification && !specificationAddProductsLoadingStatus.isLoading) {
      dispatch(fetchSpecificationAddProducts(currentSpecification));
    }
  }, [currentSpecification]);

  useEffect(() => {
    if (currencyLoadingStatus.isIdle) {
      dispatch(fetchCurrency());
    }
  }, []);

  if (
    adLoadingStatus.isLoading ||
    // specificationsLoadingStatus.isLoading ||
    // manufacturersLoadingStatus.isLoading ||
    // modelLoadingStatus.isLoading ||
    !adInfo ||
    !currency
  ) {
    return <LoadingSpinner spinnerType="page" />;
  }

  if (!searchParams.get("ad")) {
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
        <UsedSpecificationInfo
          info={{
            manufacturer: adInfo.manufacturer.name.ru || adInfo.manufacturer.name.ch,
            model: adInfo.series.name.ru || adInfo.series.name.ch,
            specification: adInfo.specification.name.ru || adInfo.specification.name.ch,
            year: adInfo.specification.year,
            ownersCount: adInfo.ownersCount,
            mileage: adInfo.mileage,
            ageDate: adInfo.ageDate,
          }}
        />
      </div>

      <div className={classes.info}>
        <InfoBar
          setIsTechs={setIsTechs}
          setIsPriceHistory={setIsPriceHistory}
        />
      </div>

      <div className={classes.pricesWrapper}>
        <div className={classes.prices}>
          <Prices
            prices={adInfo.prices}
            setIsTaxes={setIsTaxes}
          />
        </div>

        <div className={classes.addOptions}>
          <ChooseOptions
            prices={adInfo.prices}
            setIsAddProducts={setIsAddProducts}
          />
        </div>
      </div>

      <div className={classes.currency}>
        <Currency />
      </div>

      <div className={classes.buttons}>
        <OrderButtons
          used
          specificationId={currentSpecification}
          epts={options.epts}
          onOrder={() => setIsQuestions(true)}
          prices={{
            totalPrice: Number(
              getTotal({
                totalPrice: getPrices(currentTax, adInfo.prices),
                options,
                optionsPrices: {
                  epts: adInfo.prices.eptsSbktsUtil,
                  guarantee: 0,
                  options: addItemsPrice,
                },
                currency,
                currentCurrency,
              })
            ),
            minPrice: adInfo.prices.inChina,
            tax: adInfo.prices.tax,
            comission: adInfo.prices.commission,
            borderPrice: adInfo.prices.borderPrice,
            customsPrice:
              currentTax === TaxesTypes.PERS
                ? adInfo.prices.customsClearancePers.final
                : adInfo.prices.customsClearanceCorp.final,
          }}
        />
      </div>

      {/* {isTechs && (
        <Modal
          onClose={() => setIsTechs(false)}
          button
        >
          <Techs
            currentSpecification={currentSpecification}
            setCurrentSpecification={setCurrentSpecification}
            techs={adInfo}
          />
        </Modal>
      )} */}

      {/* {isAddProducts && (
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
      )} */}

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
    </div>
  );
};
