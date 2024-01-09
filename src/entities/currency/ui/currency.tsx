import { memo, useEffect } from 'react';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

import 'dayjs/locale/ru'
dayjs.extend(updateLocale);
dayjs.updateLocale('ru', {
  monthsShort: [
    "янв", "фев", "мар", "апр", "май", "июнь",
    "июль", "авг", "сент", "окт", "ноя", "дек"
  ]
})

import { getCurrency, getCurrencyLoadingStatus } from '../model/currency-selectors';
import { fetchCurrency } from '../model/api-actions/fetch-currency';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';

import classes from './currency.module.sass';

export const Currency = memo(
  (): JSX.Element => {
    const dispatch = useAppDispatch();
    const currency = useAppSelector(getCurrency);
    const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);

    useEffect(() => {
      dispatch(fetchCurrency());
    }, []);

    if (currencyLoadingStatus.isLoading || !currency) {
      return <div className={classes.wrapper}><p>Загрузка ...</p></div>
    }

    return (
      <div className={classes.wrapper}>
        <p>
          CNY = {currency.cny.toFixed(2)}₽
          <span>•</span>
          USD = {currency.usd.toFixed(2)}₽
        </p>

        <p>{dayjs().locale('ru').format('D MMM YYYY').toLowerCase()}</p>
      </div>
    )
  }
);
