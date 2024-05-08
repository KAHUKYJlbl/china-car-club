import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { AppRoute } from '../../../app/provider/router';
import { ChooseOptions, getTotal } from '../../../features/choose-options';
import { SpecificationInfo } from '../../../features/choose-specification';
import {
  fetchSpecificationAddProducts,
  fetchSpecificationsImage,
  fetchSpecificationsInfo,
  getExtColors,
  getImagesByColor,
  getInitSlide,
  getIntColors,
  getSpecificationImgLoadingStatus,
  getSpecificationsLoadingStatus
} from '../../../entities/specification';
import {
  Currency,
  fetchCurrency,
  getCurrency,
  getCurrencyLoadingStatus,
  getCurrentCurrency
} from '../../../entities/currency';
import { Gallery } from '../../../entities/gallery';
import { fetchManufacturers, getManufacturerByModel, getManufacturersLoadingStatus } from '../../../entities/manufacturer';
import { fetchModel, getModelLoadingStatus, getSpecificationParams } from '../../../entities/model';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { Modal } from '../../../shared/ui/modal';

import { AddsType, CurrentColorType } from '../lib/types';
import { TaxesTypes } from '../lib/const';
import { OrderButtons } from './order-buttons';
import { InfoBar } from './info-bar';
import { Prices } from './prices';
import { Techs } from './techs';
import { Taxes } from './taxes';
import { Adds } from './adds';
import classes from './model-info.module.sass';

export const ModelInfo = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ searchParams, setSearchParams ] = useSearchParams();

  const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
  const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
  const specificationImgLoadingStatus = useAppSelector(getSpecificationImgLoadingStatus);
  const modelLoadingStatus = useAppSelector(getModelLoadingStatus);
  const extColors = useAppSelector(getExtColors);
  const intColors = useAppSelector(getIntColors);
  const currency = useAppSelector(getCurrency);
  const currentCurrency = useAppSelector(getCurrentCurrency);
  const manufacturerId = useAppSelector((state) => getManufacturerByModel( state, Number( searchParams.get('model') ) ));

  const [ isTechs, setIsTechs ] = useState(false);
  const [ isAddProducts, setIsAddProducts ] = useState(false);
  const [ isTaxes, setIsTaxes ] = useState(false);
  const [ currentTax, setCurrentTax ] = useState(TaxesTypes.PERS);
  const [ adds, setAdds ] = useState<Record<AddsType, boolean>>({epts: false, guarantee: false, options: false});
  const [ addItems, setAddItems ] = useState<number[]>([]);
  const [ addItemsPrice, setAddItemsPrice ] = useState(0);
  const [ currentColor, setCurrentColor ] = useState<CurrentColorType>({
    int: intColors ? intColors[0].color.id : null,
    ext: extColors ? extColors[0].color?.id : null,
    isInteriorFirst: false,
  });
  const [ currentSpecification, setCurrentSpecification ] = useState<number | null>( Number(searchParams.get('spec')) );

  const specificationParams = useAppSelector((state) => getSpecificationParams(state, currentSpecification));
  const imgList = useAppSelector((state) => getImagesByColor(state, currentColor));
  const initSlide = useAppSelector((state) => getInitSlide(state, currentColor));

  useEffect(() => {
    if (specificationImgLoadingStatus.isSuccess) {
      setCurrentColor({
        int: intColors ? intColors[0].color.id : null,
        ext: extColors ? extColors[0].color?.id : null,
        isInteriorFirst: false,
      });
    }
  }, [specificationImgLoadingStatus.isSuccess]);

  useEffect(() => {
    if (searchParams.get('model')) {
      dispatch(fetchModel(searchParams.get('model')!));
      dispatch(fetchSpecificationsInfo({
        modelId: Number(searchParams.get('model')),
        filters: {},
      }));
    }
  }, []);

  useEffect(() => {
    if (currentSpecification) {
      dispatch( fetchSpecificationsImage(currentSpecification) );
      dispatch( fetchSpecificationAddProducts(currentSpecification) );
    }
  }, [currentSpecification]);

  useEffect(() => {
    if (manufacturersLoadingStatus.isIdle) {
      dispatch(fetchManufacturers());
    }
  }, [manufacturersLoadingStatus.isIdle]);

  useEffect(() => {
    if (currencyLoadingStatus.isIdle) {
      dispatch(fetchCurrency());
    }
  }, [currencyLoadingStatus.isIdle]);

  useEffect(() => {
    if (currentSpecification) {
      setSearchParams({
        model: searchParams.get('model')!,
        spec: currentSpecification.toString(),
      });
    }
  }, [currentSpecification]);

  useEffect(() => {
    if ( modelLoadingStatus.isFailed ) {
      navigate(AppRoute.NotFound);
    }
  }, [modelLoadingStatus.isFailed]);

  const toggleAdds = (add: AddsType) => {
    setAdds((current) => ({
      ...current,
      [add]: !current[add]
    }));
  };

  if (
    specificationImgLoadingStatus.isLoading
    || specificationsLoadingStatus.isLoading
    || manufacturersLoadingStatus.isLoading
    || modelLoadingStatus.isLoading
    || !specificationParams
    || !currency
  ) {
    return <LoadingSpinner spinnerType='page' />
  }

  if (!searchParams.get('model') || !searchParams.get('spec') ) {
    return <Navigate to={AppRoute.NotFound} />
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.gallery}>
        <Gallery
          galleryList={imgList}
          specificationId={currentSpecification}
          modelId={Number(searchParams.get('model'))}
          manufacturerId={manufacturerId}
          initSlide={initSlide}
        />
      </div>

      <div className={classes.info}>
        <InfoBar
          currentSpecification={currentSpecification}
          setIsTechs={setIsTechs}
        />
      </div>

      <div className={classes.specification}>
        <SpecificationInfo
          currentSpecification={currentSpecification}
          setCurrentSpecification={setCurrentSpecification}
        />
      </div>

      <div className={classes.pricesWrapper}>
        <div className={classes.prices}>
          <Prices
            prices={specificationParams.price}
            adds={adds}
            addItemsPrice={addItemsPrice}
            currentTax={currentTax}
            setCurrentTax={setCurrentTax}
            setIsTaxes={setIsTaxes}
          />
        </div>

        <div className={classes.addOptions}>
          <ChooseOptions
            addItemsPrice={addItemsPrice}
            prices={specificationParams.price}
            options={adds}
            optionsHandler={toggleAdds}
            currentTax={currentTax}
            setIsAddProducts={setIsAddProducts}
            />
        </div>
      </div>

      <div className={classes.currency}>
        <Currency />
      </div>

      <div className={classes.buttons}>
        <OrderButtons
          specificationId={currentSpecification}
          epts={adds.epts}
          currentTax={currentTax}
          addItems={addItems}
          prices={{
            totalPrice: Number(
              getTotal({
                totalPrice: currentTax === TaxesTypes.PERS
                  ? specificationParams.price.withLogisticsPers
                  : specificationParams.price.withLogisticsCorp,
                options: adds,
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
            customsPrice: currentTax === TaxesTypes.PERS
              ? specificationParams.price.customsClearancePers.final
              : specificationParams.price.customsClearanceCorp.final,
          }}
        />
      </div>

      {
        isTechs &&
        <Modal onClose={() => setIsTechs(false)}>
          <Techs
            currentSpecification={currentSpecification}
            setCurrentSpecification={setCurrentSpecification}
            techs={specificationParams}
          />
        </Modal>
      }

      {
        isAddProducts &&
        <Modal onClose={() => setIsAddProducts(false)}>
          <Adds
            currentSpecification={currentSpecification}
            setCurrentSpecification={setCurrentSpecification}
            techs={specificationParams}
            setAdds={setAdds}
            addItems={addItems}
            setAddItems={setAddItems}
            setAddItemsPrice={setAddItemsPrice}
          />
        </Modal>
      }

      {
        isTaxes &&
        <Modal onClose={() => setIsTaxes(false)}>
          <Taxes
            currentTax={currentTax}
            setCurrentTax={setCurrentTax}
            currentSpecification={currentSpecification}
            setCurrentSpecification={setCurrentSpecification}
            techs={specificationParams}
          />
        </Modal>
      }
    </div>
  )
}
