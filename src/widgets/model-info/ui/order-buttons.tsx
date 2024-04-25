import { memo } from 'react';

import { Currencies, getCurrentCurrency } from '../../../entities/currency';
import { getCurrentCity, getGeolocation, postOrder } from '../../../entities/user';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';

import classes from './order-buttons.module.sass';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { toast } from 'react-toastify';
import { Taxes } from '../lib/const';

type OrderButtonsProps = {
  specificationId: number | null;
  totalPrice: number;
  epts: boolean;
  currentTax: Taxes;
}

export const OrderButtons = memo(
  ({specificationId, totalPrice, epts, currentTax}: OrderButtonsProps): JSX.Element => {
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
        prices: {
          totalPrice: {
            currencyQuantity: totalPrice,
            currencyId: currentCurrency,
          },
          availabilityOfEpts: epts,
          priceTypeId: currentTax === Taxes.PERS ? 2 : 3,
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
