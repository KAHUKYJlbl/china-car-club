import { memo, useEffect } from "react";
import dayjs from "dayjs";

import {
  Favorite,
  fetchFavorites,
  getFavorites,
  getFavoritesLoadingStatus,
  getPagination,
  resetMycars,
} from "../../../entities/user";
import { getCurrency } from "../../../entities/currency";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";

import classes from "./favorites.module.sass";

type FavoritesProps = {
  currentSort: "increase" | "decrease";
};

export const Favorites = memo(({ currentSort }: FavoritesProps) => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(getFavorites);
  const favoritesLoadingStatus = useAppSelector(getFavoritesLoadingStatus);
  const pagination = useAppSelector(getPagination);
  const currency = useAppSelector(getCurrency);

  useEffect(() => {
    if (!favoritesLoadingStatus.isLoading) {
      dispatch(resetMycars());
      dispatch(fetchFavorites());
    }
  }, []);

  if (
    !currency ||
    favoritesLoadingStatus.isIdle ||
    favoritesLoadingStatus.isLoading ||
    (favoritesLoadingStatus.isLoading && !favorites.length)
  ) {
    return <LoadingSpinner spinnerType="page" />;
  }

  if (favorites.length === 0) {
    return <p className={classes.empty}>У Вас пока нет избранных автомобилей</p>;
  }

  return (
    <>
      <ul className={classes.list}>
        {favorites
          .filter((favorite) => favorite.type === 1)
          .toSorted((a, b) =>
            currentSort === "increase"
              ? dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
              : dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
          )
          .map((favorite) => (
            <Favorite
              currency={currency}
              favorite={favorite}
              key={favorite.id}
            />
          ))}
      </ul>

      {pagination.currentPage < pagination.lastPage && (
        <button
          aria-label="показать еще"
          className={classes.button}
          onClick={() => dispatch(fetchFavorites(pagination.currentPage + 1))}
        >
          {favoritesLoadingStatus.isLoading ? <LoadingSpinner spinnerType="button" /> : "Показать еще"}
        </button>
      )}
    </>
  );
});
