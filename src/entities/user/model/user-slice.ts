import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { DEFAULT_CITY } from '../../../app/settings/cities';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { postSms } from './api-actions/post-sms';
import { fetchCity } from './api-actions/fetch-city';
import { fetchHash } from './api-actions/fetch-hash';
import { postConfirm } from './api-actions/post-confirm';
import { fetchOrders } from './api-actions/fetch-orders';
import { postFavorite } from './api-actions/post-favorite';
import { deleteFavorite } from './api-actions/delete-favorite';
import { fetchFavorites } from './api-actions/fetch-favorites';
import { fetchCalculations } from './api-actions/fetch-calculations';
import { fetchFavoritesById } from './api-actions/fetch-favorites-by-id';
import { FavoriteByIdType, LocationType, MycarsCalculationType, MycarsFavoriteType, MycarsOrderType, UserType } from '../lib/types';



type InitialState = {
  user: UserType | null;
  isAuth: boolean;
  city: {
    id: number;
    manualMode: boolean;
  };
  geolocation: LocationType;
  userLoadingStatus: FetchStatus;
  mycarsOrders: MycarsOrderType[];
  mycarsOrdersLoadingStatus: FetchStatus;
  mycarsCalculations: MycarsCalculationType[];
  mycarsCalculationsLoadingStatus: FetchStatus;
  mycarsFavorites: MycarsFavoriteType[];
  mycarsFavoritesLoadingStatus: FetchStatus;
  mycarsPagination: {
    currentPage: number,
    lastPage: number,
  };
  mycarsFavoritesById: FavoriteByIdType[];
  mycarsFavoritesByIdLoadingStatus: FetchStatus;
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
  mycarsOrders: [],
  mycarsOrdersLoadingStatus: FetchStatus.Idle,
  mycarsCalculations: [],
  mycarsCalculationsLoadingStatus: FetchStatus.Idle,
  mycarsFavorites: [],
  mycarsFavoritesLoadingStatus: FetchStatus.Idle,
  mycarsPagination: {
    currentPage: 1,
    lastPage: 1,
  },
  mycarsFavoritesById: [],
  mycarsFavoritesByIdLoadingStatus: FetchStatus.Idle,
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
      state.city = {
        id: state.city.id,
        manualMode: false,
      };
    },
    resetMycars: (state) => {
      state.mycarsCalculations = [];
      state.mycarsCalculationsLoadingStatus = FetchStatus.Idle;
      state.mycarsOrders = [];
      state.mycarsOrdersLoadingStatus = FetchStatus.Idle;
      state.mycarsPagination = {
        currentPage: 1,
        lastPage: 1,
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
      })      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.mycarsOrders = state.mycarsOrders.concat(action.payload.data);
        state.mycarsPagination = action.payload.meta;
        state.mycarsOrdersLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.mycarsOrdersLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.mycarsOrdersLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchCalculations.fulfilled, (state, action) => {
        state.mycarsCalculations = state.mycarsCalculations.concat(action.payload.data);
        state.mycarsPagination = action.payload.meta;
        state.mycarsCalculationsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchCalculations.pending, (state) => {
        state.mycarsCalculationsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchCalculations.rejected, (state) => {
        state.mycarsCalculationsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.mycarsFavorites = action.payload.data
        state.mycarsPagination = action.payload.meta;
        state.mycarsFavoritesLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.mycarsFavoritesLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.mycarsFavoritesLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchFavoritesById.fulfilled, (state, action) => {
        state.mycarsFavoritesById = action.payload,
        state.mycarsFavoritesByIdLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchFavoritesById.pending, (state) => {
        state.mycarsFavoritesByIdLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchFavoritesById.rejected, (state) => {
        state.mycarsFavoritesByIdLoadingStatus = FetchStatus.Failed;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        state.mycarsFavoritesById = [...state.mycarsFavoritesById, action.payload],
        state.mycarsFavoritesByIdLoadingStatus = FetchStatus.Success;
      })
      .addCase(postFavorite.pending, (state) => {
        state.mycarsFavoritesByIdLoadingStatus = FetchStatus.Pending;
      })
      .addCase(postFavorite.rejected, (state) => {
        state.mycarsFavoritesByIdLoadingStatus = FetchStatus.Failed;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.mycarsFavoritesById = state.mycarsFavoritesById.filter((element) => element.id !== action.payload),
        state.mycarsFavoritesByIdLoadingStatus = FetchStatus.Success;
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.mycarsFavoritesByIdLoadingStatus = FetchStatus.Pending;
      })
      .addCase(deleteFavorite.rejected, (state) => {
        state.mycarsFavoritesByIdLoadingStatus = FetchStatus.Failed;
      });
  },
});

export const { logout, setGeolocation, setCity, setAutoLocation, login, resetMycars } = userSlice.actions;
