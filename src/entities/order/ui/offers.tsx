import { useEffect } from 'react';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

import { getOffers, getOffersLoadingStatus } from '../model/order-selectors';
import { fetchOffers } from '../model/api-actions/fetch-offers';
import { Offer } from './offer';
import classes from './offers.module.sass';

type OffersProps = {
  orderId: number;
};

export const Offers = ({ orderId }: OffersProps) => {
  const dispatch = useAppDispatch();

  const offersList = useAppSelector(getOffers);
  const offersLoadingStatus = useAppSelector(getOffersLoadingStatus);
  // const currency = useAppSelector(getCurrency);
  // const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);

  useEffect(() => {
    dispatch(fetchOffers(orderId))
  }, []);

  if (
    // ! currency
    offersLoadingStatus.isLoading
    // || currencyLoadingStatus.isIdle
    // || currencyLoadingStatus.isLoading
  ) {
    return (
      <div className={classes.wrapper} >
        <LoadingSpinner spinnerType='widget' />
      </div>
    )
  }

  return (
    <>
      {
        offersList.map(offer =>
          <Offer
            offer={offer}
            key={offer.id}
          />
        )
      }
      {
        offersList.map(offer =>
          <Offer
            offer={offer}
            key={offer.id}
          />
        )
      }
      {
        offersList.map(offer =>
          <Offer
            offer={offer}
            key={offer.id}
          />
        )
      }
    </>
  );
};
