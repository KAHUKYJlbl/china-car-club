import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { SpecificationImageType } from '../../lib/types';
import { generatePath } from 'react-router-dom';


export const fetchSpecificationsImage = createAsyncThunk<
  SpecificationImageType,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Specifications/fetchSpecificationsImages',
  async ( specificationId, {extra: axios}) => {
    try {
      const { data } = await axios.get<SpecificationImageType>(
        generatePath(APIRoute.SpecImages, {id: specificationId.toString()})
      );

      return data;
    } catch (err) {
      throw Error('Unable to fetch Images');
    }
  },
);
