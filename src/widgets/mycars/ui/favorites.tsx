import { useEffect } from 'react';
import dayjs from 'dayjs';

import { Favorite, fetchFavorites, getFavorites, getFavoritesLoadingStatus, getPagination, resetMycars } from '../../../entities/user';
import { fetchCurrency, getCurrency, getCurrencyLoadingStatus } from '../../../entities/currency';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

import classes from './favorites.module.sass';

type FavoritesProps = {
  currentSort: 'increase' | 'decrease';
};

export const Favorites = ({ currentSort }: FavoritesProps) => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(getFavorites);
  const favoritesLoadingStatus = useAppSelector(getFavoritesLoadingStatus);
  const pagination = useAppSelector(getPagination);
  const currency = useAppSelector(getCurrency);
  const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);

  useEffect(() => {
    dispatch(resetMycars());
    dispatch(fetchFavorites());
  }, []);

  useEffect(() => {
    if (currencyLoadingStatus.isIdle) {
      dispatch(fetchCurrency());
    }
  }, []);

  if (
    !currency
    || favoritesLoadingStatus.isIdle
    || ( favoritesLoadingStatus.isLoading && !favorites.length )
  ) {
    return <LoadingSpinner spinnerType='page' />
  }


  return (
    <>
      <ul className={classes.list}>
        {
          favorites
            .toSorted((a, b) =>
              currentSort === 'increase'
              ? dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
              : dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
            )
            .map((favorite) => (
              <Favorite
                currency={currency}
                favorite={favorite}
                key={favorite.id}
              />
            ))
        }
      </ul>

      {
        pagination.currentPage < pagination.lastPage &&
        <button
          className={classes.button}
          onClick={() => dispatch(fetchFavorites( pagination.currentPage + 1 ))}
        >
          {
            favoritesLoadingStatus.isLoading
            ? <LoadingSpinner spinnerType='button' />
            : 'Показать еще'
          }
        </button>
      }
  </>
  );
};
