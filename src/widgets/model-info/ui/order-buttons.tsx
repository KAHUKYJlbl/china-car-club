import { memo } from 'react';

import { Currencies, getCurrentCurrency } from '../../../entities/currency';
import { getCurrentCity, getGeolocation, postOrder } from '../../../entities/user';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';

import classes from './order-buttons.module.sass';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { toast } from 'react-toastify';
import { TaxesTypes } from '../lib/const';

type OrderButtonsProps = {
  specificationId: number | null;
  addItems: number[];
  prices: {
    totalPrice: number;
    minPrice: number;
    tax: number;
    comission: number;
    borderPrice: number;
    customsPrice: number;
  }
  epts: boolean;
  currentTax: TaxesTypes;
}

export const OrderButtons = memo(
  ({specificationId, epts, currentTax, prices, addItems}: OrderButtonsProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const geolocation = useAppSelector(getGeolocation);
    const city = useAppSelector(getCurrentCity);
    const currentCurrency = Object.values(Currencies).indexOf(useAppSelector(getCurrentCurrency)) + 1;

    if (!specificationId) {
      return <LoadingSpinner spinnerType='widget' />
    }

    const orderHandler = () => {
      dispatch(postOrder({
        specificationId: specificationId,
        customerLocation: geolocation,
        customerDelivery: {
          countryId: null,
          cityId: city,
        },
        addItems: addItems,
        prices: {
          totalPrice: {
            currencyQuantity: prices.totalPrice,
            currencyId: currentCurrency,
          },
          availabilityOfEpts: epts,
          priceTypeId: currentTax === TaxesTypes.PERS || currentTax === TaxesTypes.SELL ? 2 : 3,
          minPrice: {
            currencyQuantity: prices.minPrice,
            currencyId: currentCurrency,
          },
          tax: {
            currencyQuantity: prices.tax,
            currencyId: currentCurrency,
          },
          comission: {
            currencyQuantity: prices.comission,
            currencyId: 2,
          },
          borderPrice: {
            currencyQuantity: prices.borderPrice,
            currencyId: currentCurrency,
          },
          customsPrice: {
            currencyQuantity: prices.customsPrice,
            currencyId: 1,
          },
        },
      }));

      toast('Заказ принят.', {type: 'success'});
    };

    return (
      <div className={classes.wrapper}>
        <div className={classes.mainButtons}>
          <button onClick={orderHandler}>
            Хочу спеццену дешевле
          </button>
        </div>

        <p className={classes.info}>
          Пришлём цену ниже или запросим цены у наших партнёров. Выберите лучшее предложение
        </p>
    </div>
    )
  }
);
