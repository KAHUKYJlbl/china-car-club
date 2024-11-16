import { createSelector } from "@reduxjs/toolkit";

import { NameSpace, State } from "../../../app/provider/store";
import { CurrentColorType } from "../../../widgets/model-info";
import { FetchStatus } from "../../../shared/api/fetch-status";

export const getSpecificationImg = (state: State) => state[NameSpace.Specification].specificationImg;

export const getRawSpecifications = (state: State) => state[NameSpace.Specification].specifications;

export const getSpecificationAddProducts = (state: State) => state[NameSpace.Specification].specificationAddProducts;

export const getSpecificationAddOptions = (state: State) => state[NameSpace.Specification].specificationAddOptions;

export const getSpecificationAddColors = (state: State) => state[NameSpace.Specification].specificationAddColors;

export const getSpecificationPriceHistory = (state: State) => state[NameSpace.Specification].specificationPriceHistory;

export const getExtColors = createSelector(getSpecificationImg, (images) =>
  images.external.length > 0 ? images.external : null
);

export const getIntColors = createSelector(getSpecificationImg, (images) => {
  return images.interior.length > 0 ? images.interior : null;
});

export const getDefaultImages = createSelector(getSpecificationImg, (images) => {
  if (images.external.length > 0) {
    return images.external[0].urls.map((url) => ({
      big: url.big ? url.big : url.original,
      original: url.original,
    }));
  }

  return images.official[0]?.urls.map((url) => ({
    big: url.big ? url.big : url.original,
    original: url.original,
  }));
});

export const getImagesByColor = createSelector(
  [getSpecificationImg, (_state: State, colorId: CurrentColorType) => colorId],
  (images, colorId) => {
    if (images.external.length > 0) {
      return images.external
        .find((image) => image.color?.id === colorId.ext)
        ?.urls.concat(
          images.interior.find((image) => image.color?.id === colorId.int)
            ? images.interior.find((image) => image.color?.id === colorId.int)!.urls
            : []
        );
    }

    return images.official[0]?.urls;
  }
);

export const getInitSlide = createSelector(
  [getSpecificationImg, (_state: State, colorId: CurrentColorType) => colorId],
  (images, colorId) => {
    if (images.external.length > 0 && colorId.isInteriorFirst) {
      return images.external.find((image) => image.color?.id === colorId.ext)?.urls.length;
    }
    return 0;
  }
);

export const getSpecifications = createSelector(getRawSpecifications, (specifications) =>
  specifications.map((specification) => ({
    name: specification.name.ru || specification.name.ch,
    id: specification.id,
    price: specification.priceWithLogisticsByCurrentDay?.price,
    year: specification.year,
    chinaPrice: specification.priceByCurrentDay.dealerPrice || specification.priceByCurrentDay.factoryPrice,
    rusPrice: specification.priceWithLogisticsByCurrentDay?.priceInCityOfReceipt,
  }))
);

export const getSpecificationName = createSelector(
  [getRawSpecifications, (_state: State, id: number | null) => id],
  (specifications, id) => {
    if (id) {
      const specification = specifications.find((spec) => spec.id === id);

      if (specification) {
        return specification.name.ru || specification.name.ch;
      }
    }

    return "";
  }
);

export const getPrice = createSelector(
  [getRawSpecifications, (_state: State, id: number | null) => id],
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
            : 0,
        };
      }
    }

    return null;
  }
);

export const getCheapestSpecification = createSelector(
  getRawSpecifications,
  (specifications) =>
    specifications.toSorted(
      (a, b) => b.year - a.year || a.priceWithLogisticsByCurrentDay?.price - b.priceWithLogisticsByCurrentDay?.price
    )[0]
);

export const getSpecificationsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Specification].specificationsLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getSpecificationImgLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Specification].specificationImgLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getSpecificationAddProductsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Specification].specificationAddProductsLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getSpecificationAddOptionsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Specification].specificationAddOptionsLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getSpecificationAddColorsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Specification].specificationAddColorsLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getSpecificationPriceHistoryLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Specification].specificationPriceHistoryLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
