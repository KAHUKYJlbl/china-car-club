import { memo, useEffect } from 'react';
import cn from 'classnames';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { Dropdown } from '../../../shared/ui/dropdown';
import {
  fetchSpecifications,
  getSpecifications,
  getSpecificationsLoadingStatus
} from '../../../entities/specification';

import classes from './choose-specification.module.sass';
import { FilterId } from '../../filter';

type ChooseSpecificationProps = {
  currentManufacturer: number | null;
  currentModel: number | null;
  currentSpecification: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
  activeFilters: Partial< Record< FilterId, number[] > >;
};

export const ChooseSpecification = memo(
  ({ currentManufacturer, currentModel, currentSpecification, setCurrentSpecification, activeFilters }: ChooseSpecificationProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const specifications = useAppSelector(getSpecifications);
    const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);

    useEffect(() => {
      // setCurrentSpecification(null);

      if (currentModel && currentManufacturer) {
        dispatch(fetchSpecifications({
          manufacturerId: currentManufacturer,
          modelId: currentModel,
          filters: activeFilters,
        }));
      }
    }, [currentModel]);

    useEffect(() => {
      if (specifications && specifications.length !== 0) {
        setCurrentSpecification(specifications[0].id);
      }
    }, [specifications[0]]);

    return (
      <div className={classes.wrapper}>
        {
          currentModel
          ? <>
            <Dropdown
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
                      price
                        ? `${priceFormat( price.toString() )} ¥`
                        : 'Уточним цену'
                    }
                  </b>
                </p>

                <p className={classes.price}><b>0 000 000 ₽</b></p>

                <p className={cn(classes.price, classes.grey)}>
                  {
                    price
                      ? `${priceFormat( (price! * currency.cny).toFixed() )} ₽`
                      : 'Уточним цену'
                  }
                </p>

                <p className={cn(classes.price, classes.grey)}>
                  {
                    price
                      ? `${priceFormat( (price! * currency.cny / currency.usd).toFixed() )} $`
                      : 'Уточним цену'
                  }
                </p>


                <p className={cn(classes.small, classes.grey, classes.discount)}>Действующая скидка на автомобиль у дилера</p>
              </div>
            </div>
          </>
          : <p className={classes.big}>
            Выберите марку и модель автомобиля — <span className={classes.grey}>покажем цену в Китае на текущий день</span>
          </p>
        }

        <p className={classes.small}>
          По прямому контракту и курсу продажи валюты
        </p>
      </div>
    )
  }
);
