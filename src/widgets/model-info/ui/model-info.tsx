import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

import { ChooseOptions } from '../../../features/choose-options';
import { SpecificationInfo } from '../../../features/choose-specification';
import { Currency } from '../../../entities/currency';
import { fetchSpecificationsInfo, getSpecifications, getSpecificationsLoadingStatus } from '../../../entities/specification';
import { Gallery } from '../../../shared/ui/gallery';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

import { InfoBar } from './info-bar';
import { Prices } from './prices';
import { Techs } from './techs';
import { OrderButtons } from './order-buttons';
import classes from './model-info.module.sass';

export const ModelInfo = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { modelId } = useParams();
  const isDesktop = useMediaQuery({ query: '(min-width: 1281px)' });
  const [ currentSpecification, setCurrentSpecification ] = useState<number | null>(null);
  const specifications = useAppSelector(getSpecifications);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
  const [ isPrices, setIsPrices ] = useState(true);

  useEffect(() => {

    if (modelId) {
      dispatch(fetchSpecificationsInfo({
        modelId: +modelId,
        filters: {},
      }));
    }
  }, [modelId]);

  useEffect(() => {
    if (specificationsLoadingStatus.isSuccess) {
      setCurrentSpecification(specifications[0].id);
    }
  }, [specificationsLoadingStatus]);

  if (specificationsLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='page' />
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.gallery}>
        <Gallery specificationId={currentSpecification} />
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
        isPrices
        ? <div className={classes.prices}>
          <Prices />
        </div>
        : <div className={classes.prices}>
          <Techs />
        </div>
      }

      <div className={classes.addOptions}>
        <ChooseOptions />
      </div>

      <div className={classes.currency}>
        <Currency />
      </div>

      <div className={classes.buttons}>
        <OrderButtons />
      </div>
    </div>
  )
}
