import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';
import { GalleryType } from '../lib/types';

export const getPromoGallery = (state: State): GalleryType[] => state[NameSpace.Gallery].promoGallery;

export const getPromoGalleryLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Gallery].promoGalleryLoadingStatus,
  (status) => ({
    isLoading: status === FetchStatus.Pending,
    isIdle: status === FetchStatus.Idle,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
