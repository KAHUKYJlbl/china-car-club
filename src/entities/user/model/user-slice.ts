import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { DEFAULT_CITY } from '../../../app/settings/cities';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { fetchHash } from './api-actons/fetch-hash';
import { postSms } from './api-actons/post-sms';
import { postConfirm } from './api-actons/post-confirm';
import { fetchCity } from './api-actons/fetch-city';
import { LocationType, UserType } from '../lib/types';


type InitialState = {
  user: UserType | null;
  isAuth: boolean;
  city: {
    id: number;
    manualMode: boolean;
  };
  geolocation: LocationType;
  userLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  user: null,
  isAuth: false,
  city: {
    id: DEFAULT_CITY,
    manualMode: false,
  },
  geolocation: {
    latitude: null,
    longitude: null,
  },
  userLoadingStatus: FetchStatus.Idle,
};

export const userSlice = createSlice({
  name: NameSpace.Specification,
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.isAuth = initialState.isAuth;
      state.userLoadingStatus = initialState.userLoadingStatus;
      state.city = initialState.city;
    },
    setGeolocation: (state, action: PayloadAction<LocationType>) => {
      state.geolocation = action.payload;
    },
    setCity: (state, action: PayloadAction<number>) => {
      state.city = {
        id: action.payload,
        manualMode: true,
      };
    },
    setAutoLocation: (state) => {
      console.log('auto');
      state.city = {
        id: state.city.id,
        manualMode: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHash.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchHash.pending, (state) => {
        state.userLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchHash.rejected, (state) => {
        state.userLoadingStatus = FetchStatus.Failed;
      })
      .addCase(postSms.fulfilled, (state) => {
        state.userLoadingStatus = FetchStatus.Success;
      })
      .addCase(postSms.pending, (state) => {
        state.userLoadingStatus = FetchStatus.Pending;
      })
      .addCase(postSms.rejected, (state) => {
        state.userLoadingStatus = FetchStatus.Failed;
      })
      .addCase(postConfirm.fulfilled, (state) => {
        state.isAuth = true;
        state.userLoadingStatus = FetchStatus.Success;
      })
      .addCase(postConfirm.pending, (state) => {
        state.userLoadingStatus = FetchStatus.Pending;
      })
      .addCase(postConfirm.rejected, (state) => {
        state.userLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        if (!state.city.manualMode) {
          state.city = {
            ...state.city,
            id: action.payload,
          };
        }
        state.userLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchCity.pending, (state) => {
        state.userLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchCity.rejected, (state) => {
        state.userLoadingStatus = FetchStatus.Failed;
      });

  },
});

export const { logout, setGeolocation, setCity, setAutoLocation, login } = userSlice.actions;
