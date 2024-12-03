import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import { AppRoute } from "../../../app/provider/router";
import { getTotal } from "../../../features/choose-options/lib/utils/get-total";
import { getPrices } from "../../../features/choose-options/lib/utils/get-prices";
import { PriceOptions } from "../../../features/choose-specification";
import {
  fetchSpecificationAddProducts,
  getSpecificationAddProductsLoadingStatus,
} from "../../../entities/specification";
import { fetchCurrency, getCurrency, getCurrencyLoadingStatus, getCurrentCurrency } from "../../../entities/currency";
import { UsedGallery } from "../../../entities/gallery";
import { getAddItemsPrice, getAdds, getCurrentTax } from "../../../entities/order/index";
import {
  fetchAdById,
  fetchAdImages,
  getAdImages,
  getAdImagesLoadingStatus,
  getCurrentAd,
  getCurrentAdLoadingStatus,
} from "../../../entities/used";
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
import { Techs } from "./techs";
import { Taxes } from "./taxes";
import { Adds } from "./adds";
import classes from "./model-info.module.sass";

type ModelInfoProps = {
  setConfirmation: () => void;
};

export const UsedModelInfo = ({ setConfirmation }: ModelInfoProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [searchParams, _setSearchParams] = useSearchParams();
  const [_isColors, setIsColors] = useState(false);

  const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
  const adInfo = useAppSelector(getCurrentAd);
  const adLoadingStatus = useAppSelector(getCurrentAdLoadingStatus);
  const adImages = useAppSelector(getAdImages);
  const adImagesLoadingStatus = useAppSelector(getAdImagesLoadingStatus);
  const currency = useAppSelector(getCurrency);
  const currentCurrency = useAppSelector(getCurrentCurrency);
  const currentTax = useAppSelector(getCurrentTax);
  const options = useAppSelector(getAdds);
  const addItemsPrice = useAppSelector(getAddItemsPrice);
  const specificationAddProductsLoadingStatus = useAppSelector(getSpecificationAddProductsLoadingStatus);

  // popups
  const [isTechs, setIsTechs] = useState(false);
  const [isAddProducts, setIsAddProducts] = useState(false);
  const [isTaxes, setIsTaxes] = useState(false);
  const [isPriceHistory, setIsPriceHistory] = useState(false);
  const [isQuestions, setIsQuestions] = useState(false);

  const [currentSpecification, setCurrentSpecification] = useState<number | null>(Number(searchParams.get("spec")));

  useEffect(() => {
    if (searchParams.get("ad") && !adLoadingStatus.isLoading) {
      dispatch(fetchAdImages(searchParams.get("ad")!));
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

  if (adLoadingStatus.isLoading || adImagesLoadingStatus.isLoading || !adInfo || !currency) {
    return <LoadingSpinner spinnerType="page" />;
  }

  if (!searchParams.get("ad")) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.gallery}>
        <UsedGallery
          galleryList={adImages}
          specificationId={currentSpecification}
          modelId={Number(searchParams.get("model"))}
          manufacturerId={adInfo.manufacturer.id}
          adsId={Number(searchParams.get("ad")!)}
          initSlide={0}
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
          <PriceOptions
            prices={adInfo.prices}
            setIsTaxes={setIsTaxes}
            colorsCallback={() => setIsColors(true)}
            addProductsCallback={() => setIsAddProducts(true)}
            addWarrantyCallback={() => null}
            taxesCallback={() => setIsTaxes(true)}
          />
        </div>
      </div>

      <div className={classes.buttons}>
        <OrderButtons
          adId={adInfo.id}
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
              }),
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

      {isTechs && (
        <Modal
          onClose={() => setIsTechs(false)}
          button
        >
          <Techs
            setCurrentSpecification={setCurrentSpecification}
            techs={{
              id: adInfo.specification.id,
              stateId: 1,
              name: adInfo.specification.name.ru || adInfo.specification.name.ch,
              year: adInfo.specification.year,
              engineType: adInfo.specification.parameters.engineType.id,
              bodyType: adInfo.specification.parameters.bodyType.name,
              driveType: adInfo.specification.parameters.driveType.name,
              transmissionType: adInfo.specification.parameters.transmissionType.name,
              power: adInfo.specification.parameters.power,
              torque: adInfo.specification.parameters.torque,
              batteryCapacity: adInfo.specification.parameters.batteryCapacity,
              powerReserve: adInfo.specification.parameters.powerReserve,
              electricPowerReserve: adInfo.specification.parameters.electricPowerReserve,
              engineCount: Number(adInfo.specification.parameters.engineCount),
              seats: adInfo.specification.parameters.seats[0].toString(),
              lengthWidthHeight: adInfo.specification.parameters.lengthWidthHeight,
              groundClearance: adInfo.specification.parameters.groundClearance,
              curbWeight: adInfo.specification.parameters.curbWeight,
              acceleration: adInfo.specification.parameters.acceleration,
              engineCapacity: adInfo.specification.parameters.engineCapacity,
              totalFuelConsumption: adInfo.specification.parameters.totalFuelConsumption,
              frontWheel: adInfo.specification.parameters.wheelSize.front,
              rearWheel: adInfo.specification.parameters.wheelSize.rear,
              colors: {
                external: [],
                interior: [],
              },
              price: adInfo.prices,
            }}
          />
        </Modal>
      )}

      {isAddProducts && (
        <Modal
          onClose={() => setIsAddProducts(false)}
          button
        >
          <Adds
            setCurrentSpecification={setCurrentSpecification}
            techs={{
              id: adInfo.specification.id,
              stateId: 1,
              name: adInfo.specification.name.ru || adInfo.specification.name.ch,
              year: adInfo.specification.year,
              engineType: adInfo.specification.parameters.engineType.id,
              bodyType: adInfo.specification.parameters.bodyType.name,
              driveType: adInfo.specification.parameters.driveType.name,
              transmissionType: adInfo.specification.parameters.transmissionType.name,
              power: adInfo.specification.parameters.power,
              torque: adInfo.specification.parameters.torque,
              batteryCapacity: adInfo.specification.parameters.batteryCapacity,
              powerReserve: adInfo.specification.parameters.powerReserve,
              electricPowerReserve: adInfo.specification.parameters.electricPowerReserve,
              engineCount: Number(adInfo.specification.parameters.engineCount),
              seats: adInfo.specification.parameters.seats[0].toString(),
              lengthWidthHeight: adInfo.specification.parameters.lengthWidthHeight,
              groundClearance: adInfo.specification.parameters.groundClearance,
              curbWeight: adInfo.specification.parameters.curbWeight,
              acceleration: adInfo.specification.parameters.acceleration,
              engineCapacity: adInfo.specification.parameters.engineCapacity,
              totalFuelConsumption: adInfo.specification.parameters.totalFuelConsumption,
              frontWheel: adInfo.specification.parameters.wheelSize.front,
              rearWheel: adInfo.specification.parameters.wheelSize.rear,
              colors: {
                external: [],
                interior: [],
              },
              price: adInfo.prices,
            }}
          />
        </Modal>
      )}

      {isTaxes && (
        <Modal
          onClose={() => setIsTaxes(false)}
          button
        >
          <Taxes
            setCurrentSpecification={setCurrentSpecification}
            techs={{
              id: adInfo.specification.id,
              stateId: 1,
              name: adInfo.specification.name.ru || adInfo.specification.name.ch,
              year: adInfo.specification.year,
              engineType: adInfo.specification.parameters.engineType.id,
              bodyType: adInfo.specification.parameters.bodyType.name,
              driveType: adInfo.specification.parameters.driveType.name,
              transmissionType: adInfo.specification.parameters.transmissionType.name,
              power: adInfo.specification.parameters.power,
              torque: adInfo.specification.parameters.torque,
              batteryCapacity: adInfo.specification.parameters.batteryCapacity,
              powerReserve: adInfo.specification.parameters.powerReserve,
              electricPowerReserve: adInfo.specification.parameters.electricPowerReserve,
              engineCount: Number(adInfo.specification.parameters.engineCount),
              seats: adInfo.specification.parameters.seats[0].toString(),
              lengthWidthHeight: adInfo.specification.parameters.lengthWidthHeight,
              groundClearance: adInfo.specification.parameters.groundClearance,
              curbWeight: adInfo.specification.parameters.curbWeight,
              acceleration: adInfo.specification.parameters.acceleration,
              engineCapacity: adInfo.specification.parameters.engineCapacity,
              totalFuelConsumption: adInfo.specification.parameters.totalFuelConsumption,
              frontWheel: adInfo.specification.parameters.wheelSize.front,
              rearWheel: adInfo.specification.parameters.wheelSize.rear,
              colors: {
                external: [],
                interior: [],
              },
              price: adInfo.prices,
            }}
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
    </div>
  );
};
