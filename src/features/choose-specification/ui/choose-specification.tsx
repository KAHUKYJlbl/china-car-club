import { memo, useEffect } from 'react';
import cn from 'classnames';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { DropdownBlocks } from '../../../shared/ui/dropdown';
import { getCurrency, getCurrencyLoadingStatus } from '../../../entities/currency';
import {
  fetchSpecifications,
  getCheapestSpecification,
  getPrice,
  getSpecifications,
  getSpecificationsLoadingStatus
} from '../../../entities/specification';

import { FilterId } from '../../filter';
import classes from './choose-specification.module.sass';
import priceFormat from '../../../shared/lib/utils/price-format';

type ChooseSpecificationProps = {
  isPromo: boolean;
  currentManufacturer: number | null;
  currentModel: number | null;
  currentSpecification: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
  activeFilters: Partial< Record< FilterId, number[] > >;
};

export const ChooseSpecification = memo(
  ({
    isPromo,
    currentManufacturer,
    currentModel,
    currentSpecification,
    setCurrentSpecification,
    activeFilters
  }: ChooseSpecificationProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const specifications = useAppSelector(getSpecifications);
    const cheapest = useAppSelector(getCheapestSpecification);
    const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);

    const priceData = useAppSelector((state) => getPrice(state, currentSpecification));
    const currency = useAppSelector(getCurrency);
    const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);

    useEffect(() => {
      if (currentModel && currentManufacturer) {
        dispatch(fetchSpecifications({
          manufacturerId: currentManufacturer,
          modelId: currentModel,
          filters: activeFilters,
        }));
      }
    }, [currentModel]);

    useEffect(() => {
      if (specifications && specifications.length !== 0 && !isPromo) {
        setCurrentSpecification(cheapest?.id);
      }
    }, [cheapest?.id]);

    if (specificationsLoadingStatus.isLoading || currencyLoadingStatus.isLoading || !currency) {
      return (
        <div className={classes.wrapper}>
          <LoadingSpinner spinnerType='widget' />
        </div>
      )
    }

    return (
      <div className={classes.wrapper}>
        {
          currentModel
          ? <>
            <DropdownBlocks
              currentElement={currentSpecification}
              setCurrent={setCurrentSpecification}
              placeholder='Комплектация'
              list={specifications}
              disabled={specificationsLoadingStatus.isLoading}
            />

            <p className={classes.header}>
              <b>Цена в Китае на сегодня</b> за выбранную комплектацию нового автомобиля
            </p>

            <div className={classes.priceWrapper}>
              <div className={classes.priceList}>
                <p className={classes.price}>
                  <b>
                    {
                      priceData
                        ? `${priceFormat( priceData.price.toFixed() )} ¥`
                        : '0'
                    }
                  </b>
                </p>

                <p className={cn(classes.discountPrice, classes.price)}>
                  <b>
                    {
                      priceData
                        ? `${priceFormat( priceData.discount.toFixed() )} ¥`
                        : '0'
                    }
                  </b>
                </p>

                <p className={cn(classes.price, classes.grey)}>
                  {
                    priceData
                      ? `${priceFormat( (priceData.price * currency.cny).toFixed() )} ₽`
                      : '0'
                  }
                </p>

                <p className={cn(classes.price, classes.grey)}>
                  {
                    priceData
                      ? `${priceFormat( (priceData.price * currency.cny / currency.usd).toFixed() )} $`
                      : '0'
                  }
                </p>

                <p className={cn(classes.small, classes.grey, classes.discount)}>
                  Действующая скидка на автомобиль у дилера
                </p>
              </div>
            </div>
          </>
          : <p className={classes.big}>
            ❶ Выберите марку и модель автомобиля — <span className={classes.grey}>покажем цену в Китае на текущий день</span>
          </p>
        }

        <p className={classes.contract}>
          По прямому контракту и курсу продажи валюты
        </p>
      </div>
    )
  }
);
