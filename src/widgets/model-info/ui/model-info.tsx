import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { AppRoute } from '../../../app/provider/router';
import { ChooseOptions } from '../../../features/choose-options';
import { SpecificationInfo } from '../../../features/choose-specification';
import {
  fetchSpecificationsImage,
  fetchSpecificationsInfo,
  getExtColors,
  getImagesByColor,
  getInitSlide,
  getIntColors,
  getSpecificationImgLoadingStatus,
  getSpecificationsLoadingStatus
} from '../../../entities/specification';
import { Currency, fetchCurrency } from '../../../entities/currency';
import { fetchManufacturers, getManufacturersLoadingStatus } from '../../../entities/manufacturer';
import { fetchModel, getModelLoadingStatus, getSpecificationParams } from '../../../entities/model';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { Gallery } from '../../../shared/ui/gallery';

import { AddsType, CurrentColorType } from '../lib/types';
import { InfoBar } from './info-bar';
import { Prices } from './prices';
import { Techs } from './techs';
import { OrderButtons } from './order-buttons';
import classes from './model-info.module.sass';

export const ModelInfo = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ searchParams, setSearchParams ] = useSearchParams();

  const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
  const specificationImgLoadingStatus = useAppSelector(getSpecificationImgLoadingStatus);
  const modelLoadingStatus = useAppSelector(getModelLoadingStatus);
  const extColors = useAppSelector(getExtColors);
  const intColors = useAppSelector(getIntColors);

  const [ isPrices, setIsPrices ] = useState(true);
  const [ adds, setAdds ] = useState<Record<AddsType, boolean>>({epts: false, guarantee: false, options: false});
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
      dispatch(fetchCurrency());
    }
  }, []);

  useEffect(() => {
    if (currentSpecification) {
      dispatch( fetchSpecificationsImage(currentSpecification) );
    }
  }, [currentSpecification]);

  useEffect(() => {
    if (manufacturersLoadingStatus.isIdle) {
      dispatch(fetchManufacturers());
    }
  }, [manufacturersLoadingStatus.isIdle]);

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
          initSlide={initSlide}
        />
      </div>

      <div className={classes.info}>
        <InfoBar currentSpecification={currentSpecification} />
      </div>

      <div className={classes.specification}>
        <SpecificationInfo
          isPrices={isPrices}
          setIsPrices={setIsPrices}
          currentSpecification={currentSpecification}
          setCurrentSpecification={setCurrentSpecification}
        />
      </div>

      {
        !isPrices &&
        <div className={classes.techs}>
          <Techs techs={specificationParams} setColor={setCurrentColor} />
        </div>
      }

      {
        isPrices &&
        <>
          <div className={classes.prices}>
            <Prices prices={specificationParams.price} adds={adds} />
          </div>

          <div className={classes.addOptions}>
            <ChooseOptions
              prices={specificationParams.price}
              options={adds}
              optionsHandler={toggleAdds}
            />
          </div>

          <div className={classes.currency}>
            <Currency />
          </div>

          <div className={classes.buttons}>
            <OrderButtons />
          </div>
        </>
      }
    </div>
  )
}
