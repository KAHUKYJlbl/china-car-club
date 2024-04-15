import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { CurrentColorType } from '../../../widgets/model-info';
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

export const getDefaultImages = createSelector(
  getSpecificationImg,
  (images) => {
    if (images.external.length > 0) {
      return images.external[0].urls.map((url) => ({
        big: url.big ? url.big : url.original,
        original: url.original,
      }))
    }

    return images.official[0]?.urls.map((url) => ({
      big: url.big ? url.big : url.original,
      original: url.original,
    }))
  }
);

export const getImagesByColor = createSelector(
  [
    getSpecificationImg,
    (_state: State, colorId: CurrentColorType) => colorId,
  ],
  (images, colorId) => {
    if (images.external.length > 0) {
      return images.external.find((image) => image.color?.id === colorId.ext)
        ?.urls
        .concat(
          images.interior.find((image) => image.color?.id === colorId.int)
          ? images.interior.find((image) => image.color?.id === colorId.int)!.urls
          : []
        )
    }

    return images.official[0]?.urls;
  }
);

export const getInitSlide = createSelector(
  [
    getSpecificationImg,
    (_state: State, colorId: CurrentColorType) => colorId,
  ],
  (images, colorId) => {
    if (images.external.length > 0 && colorId.isInteriorFirst) {
      return images.external.find((image) => image.color?.id === colorId.ext)?.urls.length
    }
    return 0;
  }
);

export const getRawSpecifications = (state: State) => state[NameSpace.Specification].specifications;

export const getSpecifications = createSelector(
  getRawSpecifications,
  (specifications) => specifications.map((specification) => ({
    name: specification.name.ru || specification.name.ch,
    id: specification.id,
    price: specification.priceWithLogisticsByCurrentDay?.price,
    year: specification.year,
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
          price: specification.priceByCurrentDay.dealerPrice
            ? specification.priceByCurrentDay.dealerPrice
            : specification.priceByCurrentDay.factoryPrice,
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
      (a, b) => a.priceWithLogisticsByCurrentDay?.price - b.priceWithLogisticsByCurrentDay?.price
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
