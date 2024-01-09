import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';

import { CurrencyServerType, CurrencyType } from '../../lib/types';

export const fetchCurrency = createAsyncThunk<
  CurrencyType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Currency/fetchCurrency',
  async (_arg, {extra: axios}) => {
    try {
      const { data } = await axios.get<CurrencyServerType[]>(
        ``,
        {
          baseURL: process.env.CURRENCY_URL,
        }
      );

      return {
        cny: data.find((currency) => currency.fromCurrencyId === 3)!.value,
        usd: data.find((currency) => currency.fromCurrencyId === 2)!.value,
      };
    } catch (err) {
      throw Error('Unable to fetch Currency');
    }
  },
);
