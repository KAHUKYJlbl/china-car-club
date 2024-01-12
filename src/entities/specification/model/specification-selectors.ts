import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

export const getRawSpecifications = (state: State) => state[NameSpace.Specification].specifications;

export const getSpecifications = createSelector(
  getRawSpecifications,
  (specifications) => specifications.map((specification) => ({
    name: specification.name.ru || specification.name.ch,
    id: specification.id
  }))
);

export const getPrice = createSelector(
  [
    getRawSpecifications,
    (_state: State, id: number | null) => id
  ],
  (specifications, id) => (
    id
      ? specifications.find((specification) => specification.id === id)?.priceWithLogisticsByCurrentDay.price
      : null
  )
)

export const getCheapestSpecification = createSelector(
  getRawSpecifications,
  (specifications) => (
    specifications.toSorted(
      (a, b) => a.priceWithLogisticsByCurrentDay.price - b.priceWithLogisticsByCurrentDay.price
    )[0]
  )
)

export const getSpecificationsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Specification].specificationsLoadingStatus,
  (status) => ({
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
