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
  (specifications, id) => {
    if (id) {
      const specification = specifications.find((spec) => spec.id === id);

      if (specification) {
        return {
          price: specification.priceByCurrentDay.factoryPrice,
          discount: specification.priceByCurrentDay.dealerPrice
            ? specification.priceByCurrentDay.factoryPrice - specification.priceByCurrentDay.dealerPrice
            : 0
        }
      }
    }

    return null;
  }
  //   id
  //     ?
  //       {
  //           price: specifications.find((specification) => specification.id === id)?.priceByCurrentDay.factoryPrice,
  //           discount: specifications.find((specification) => specification.id === id)?.priceByCurrentDay.factoryPrice,
  //       }
  //     : null
  // )
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
