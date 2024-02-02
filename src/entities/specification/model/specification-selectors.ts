import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

export const getSpecificationImg = (state: State) => state[NameSpace.Specification].specificationImg;

export const getExtColors = createSelector(
  getSpecificationImg,
  (images) => (images.external.length > 0
    ? images.external
    : null
  )
);

export const getIntColors = createSelector(
  getSpecificationImg,
  (images) => (images.interior.length > 0
    ? images.interior
    : null
  )
);

export const getImagesByColor = createSelector(
  [
    getSpecificationImg,
    (_state: State, colorId: {int: number | null, ext: number | null}) => colorId,
  ],
  (images, colorId) => (
    images.external.find((image) => image.color.id === colorId.ext)
      ?.urls
        .map((url) => url.big ? url.big : url.original)
      .concat(
        images.external.find((image) => image.color.id === colorId.ext)
        ? images.interior.find((image) => image.color.id === colorId.int)!
          .urls.map((url) => url.big ? url.big : url.original)
        : []
      )
  )
);

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

export const getSpecificationImgLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Specification].specificationImgLoadingStatus,
  (status) => ({
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
