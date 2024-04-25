import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { DEFAULT_CITY, DROPDOWN_CITIES } from '../../../../app/settings/cities';

import { LocationType } from '../../lib/types';

export const fetchCity = createAsyncThunk<
  number,
  LocationType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'User/fetchCity',
  async ( location, {extra: axios}) => {
    try {
      const { data } = await axios.get<{city: string}>(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=ru`
      );
      return DROPDOWN_CITIES.find((city) => city.name === data.city)?.id || DEFAULT_CITY;
    } catch (err) {
      throw Error('Unable to fetch City');
    }
  },
);
