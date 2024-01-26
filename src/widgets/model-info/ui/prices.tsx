import { memo } from 'react';
import cn from 'classnames';


import { PriceType } from '../../../entities/model/lib/types';
import { getCurrency, getCurrencyLoadingStatus } from '../../../entities/currency';
import priceFormat from '../../../shared/lib/utils/price-format';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

import { CLUB_FEE, GUARANTEE_FEE } from '../lib/const';
import { AddsType } from '../lib/types';
import classes from './prices.module.sass';

type PricesProps = {
  prices: PriceType;
  adds: Record<AddsType, boolean>
}

export const Prices = memo(
  ({ prices, adds }: PricesProps): JSX.Element => {
    const currency = useAppSelector(getCurrency);
    const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);

    if (currencyLoadingStatus.isLoading || !currency) {
      return <LoadingSpinner spinnerType='widget' />
    }


    return (
      <div className={classes.wrapper}>
        <div className={classes.divider}>
          <div className={classes.row}>
            <p>Стоимость автомобиля в Китае</p>
            <p>{priceFormat((prices.inChina * currency.cny).toFixed())} ₽</p>
          </div>

          <div className={classes.row}>
            <p>Налог на автомобиль в Китае</p>
            <p>{priceFormat((prices.tax * currency.cny).toFixed())} ₽</p>
          </div>

          <div className={classes.row}>
            <p>Цена под ключ на границе Китая</p>
            <p>{priceFormat((prices.withLogistics * currency.cny).toFixed())} ₽</p>
          </div>

          <div className={classes.row}>
            <p>Fix-комиссия Chinacar.club</p>
            <p>{priceFormat((CLUB_FEE * currency.usd).toFixed())} ₽</p>
          </div>
        </div>

        <div className={classes.divider}>
          <div className={classes.row}>
            <p>Доп. опции на автомобиль</p>
            <p>0 ₽</p>
          </div>

          <div className={classes.row}>
            <p>ЭПТС, СБКТС и утильсбор</p>

            <p>
              {
                adds.epts
                ? priceFormat((prices.eptsSbktsUtil * currency.cny).toFixed())
                : 0
              } ₽
            </p>
          </div>

          <div className={classes.row}>
            <p>Гарантия на автомобиль</p>

            <p>
              {
                adds.guarantee
                ? priceFormat((GUARANTEE_FEE * currency.usd).toFixed())
                : 0
              } ₽
            </p>
          </div>
        </div>

        <div className={cn(classes.row, classes.rowSingle)}>
          <p>Потенциальная скидка на поставку</p>
          <p>0 ₽</p>
        </div>
      </div>
    )
  }
);
