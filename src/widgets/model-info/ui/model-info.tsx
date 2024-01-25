import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { AppRoute } from '../../../app/provider/router';
import { ChooseOptions } from '../../../features/choose-options';
import { SpecificationInfo } from '../../../features/choose-specification';
import {
  fetchSpecificationsInfo,
  getSpecificationsLoadingStatus
} from '../../../entities/specification';
import { Currency, fetchCurrency } from '../../../entities/currency';
import { fetchManufacturers, getManufacturersLoadingStatus } from '../../../entities/manufacturer';
import { fetchModel, getModelLoadingStatus, getSpecificationParams } from '../../../entities/model';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { Gallery } from '../../../shared/ui/gallery';

import { InfoBar } from './info-bar';
import { Prices } from './prices';
import { Techs } from './techs';
import { OrderButtons } from './order-buttons';
import classes from './model-info.module.sass';

export const ModelInfo = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ query: '(min-width: 1281px)' });
  const [ searchParams, setSearchParams ] = useSearchParams();

  const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
  const modelLoadingStatus = useAppSelector(getModelLoadingStatus);

  const [ isPrices, setIsPrices ] = useState(true);
  const [ currentSpecification, setCurrentSpecification ] = useState<number | null>( Number(searchParams.get('spec')) );
  const specificationParams = useAppSelector((state) => getSpecificationParams(state, currentSpecification));

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

  if (
    specificationsLoadingStatus.isLoading
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
          galleryId={{
            specificationId: currentSpecification,
            modelId: Number(searchParams.get('model')),
          }}
        />
      </div>

      {
        isDesktop &&
        <div className={classes.info}>
          <InfoBar />
        </div>
      }

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
          <Techs techs={specificationParams} />
        </div>
      }

      {
        isPrices &&
        <>
          <div className={classes.prices}>
            <Prices prices={specificationParams.price} />
          </div>

          <div className={classes.addOptions}>
            <ChooseOptions />
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
