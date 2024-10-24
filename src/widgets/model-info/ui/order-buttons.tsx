import { memo } from "react";

import { getAddItems, getCurrentTax, postOrder, postUsedOrder } from "../../../entities/order";
import { Currencies, getCurrentCurrency } from "../../../entities/currency";
import { getCurrentCity, getGeolocation } from "../../../entities/user";
import { getIsNew } from "../../../entities/settings";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";

import { TaxesTypes } from "../lib/const";
import classes from "./order-buttons.module.sass";

type OrderButtonsProps = {
  onOrder: () => void;
  specificationId: number | null;
  adId?: number;
  prices: {
    totalPrice: number;
    minPrice: number;
    tax: number;
    comission: number;
    borderPrice: number;
    customsPrice: number;
  };
  epts: boolean;
};

export const OrderButtons = memo(({ specificationId, epts, prices, onOrder, adId }: OrderButtonsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentTax = useAppSelector(getCurrentTax);
  const geolocation = useAppSelector(getGeolocation);
  const city = useAppSelector(getCurrentCity);
  const addItems = useAppSelector(getAddItems);
  const isNew = useAppSelector(getIsNew);
  const currentCurrency = Object.values(Currencies).indexOf(useAppSelector(getCurrentCurrency)) + 1;

  if (!specificationId) {
    return <LoadingSpinner spinnerType="widget" />;
  }

  const orderHandler = () => {
    if (isNew) {
      dispatch(
        postOrder({
          specificationId: specificationId,
          specificationAdId: adId,
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
        })
      );
    } else {
      dispatch(
        postUsedOrder({
          specificationId: specificationId,
          specificationAdId: adId,
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
        })
      );
    }

    onOrder();
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.mainButtons}>
        <button
          aria-label="заказать машину"
          onClick={orderHandler}
        >
          Узнать спеццены у менеджера
        </button>
      </div>

      <p className={classes.info}>Проверим и покажем все спеццены. Выберите лучшее предложение.</p>
    </div>
  );
});
