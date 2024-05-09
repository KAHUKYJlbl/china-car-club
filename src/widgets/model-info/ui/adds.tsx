import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import {
  AddItemType,
  getSpecificationAddProducts,
  getSpecificationAddProductsLoadingStatus,
  getSpecifications,
  getSpecificationsLoadingStatus
} from '../../../entities/specification';
import { Currencies, getCurrency, getCurrencyExchange } from '../../../entities/currency';
import { getName } from '../../../entities/manufacturer';
import { getShorts, SpecsType } from '../../../entities/model';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { DropdownBlocks } from '../../../shared/ui/dropdown';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

import { getCurrentItem } from '../lib/utils/get-current-item';
import classes from './adds.module.sass';
import { AddsType } from '../lib/types';

type AddsProps = {
  currentSpecification: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
  setAdds: React.Dispatch<React.SetStateAction<Record<AddsType, boolean>>>;
  addItems: number[];
  setAddItems: React.Dispatch<React.SetStateAction<number[]>>;
  setAddItemsPrice: React.Dispatch<React.SetStateAction<number>>;
  techs: SpecsType;
};

export const Adds = ({ currentSpecification, setCurrentSpecification, techs, setAddItems, addItems, setAddItemsPrice, setAdds }: AddsProps) => {
  const [ searchParams, _setSearchParams ] = useSearchParams();

  const name = useAppSelector((state) => getName(state, Number( searchParams.get('model') )));
  const adds = useAppSelector(getSpecificationAddProducts);
  const currency = useAppSelector(getCurrency);
  const shorts = useAppSelector((state) => getShorts(state, currentSpecification));
  const specifications = useAppSelector(getSpecifications);
  const addsLoadingStatus = useAppSelector(getSpecificationAddProductsLoadingStatus);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);

  const [ activeItems, setActiveItems] = useState(adds ? adds.groups.map((group) => group.items[0].id) : []);

  const addItemHandler = (items: AddItemType[]) => {
    if (addItems.includes(getCurrentItem(activeItems, items)!.id)) {
      setAddItems((current) => current.filter((item) => item !== getCurrentItem(activeItems, items)!.id));
      setAddItemsPrice((current) => {
        const updated = current - getCurrentItem(activeItems, items)!.price;
        if (!updated) {
          setAdds((current) => ({...current, options: false}))
        }
        return updated;
      });
      return;
    }
    setAddItems( (current) => [...current, getCurrentItem(activeItems, items)!.id] );
    setAddItemsPrice((current) => current + getCurrentItem(activeItems, items)!.price);
    setAdds((current) => ({...current, options: true}))
  };

  if (
    !adds
    || !currency
    || !name
    || !shorts
    || adds.specId !== currentSpecification
    || addsLoadingStatus.isLoading
  ) {
    return (
      <div className={classes.wrapper}>
        <LoadingSpinner spinnerType='widget' />
      </div>
    )
  }

  return (
    <>
      <div className={classes.wrapper}>
        <h3 className={classes.header}>
          Дополнительные товары
        </h3>

        <p className={classes.model}>
          <span>Автомобиль:</span><br/>
          {name.manufacturer}<br/>
          {name.model}<br/>
        </p>

        <DropdownBlocks
          currentElement={currentSpecification}
          setCurrent={setCurrentSpecification}
          placeholder='Комплектация'
          list={specifications}
          disabled={specificationsLoadingStatus.isLoading}
          isPrices
        />

        <div>
          <div className={cn(classes.row, classes.grey)}>
            <p>Двигатель:</p>
            <p>{shorts.engineType}</p>
          </div>

          <div className={cn(classes.row, classes.grey)}>
            <p>Количество мест:</p>
            <p>{techs.seats}</p>
          </div>

          <div className={cn(classes.row, classes.grey)}>
            <p>Передние колеса:</p>
            <p>{techs.frontWheel}</p>
          </div>

          <div className={cn(classes.row, classes.grey)}>
            <p>Задние колеса:</p>
            <p>{techs.rearWheel}</p>
          </div>
        </div>
      </div>

      {
        adds.groups.map((group, index) => (
          <div className={classes.wrapper} key={group.id}>
            <div className={classes.headerWrapper}>
              <p className={classes.groupHeader}>
                {group.name}
              </p>

              <p className={classes.groupDescription}>
                {group.description}
              </p>
            </div>

            {
              group.items.length > 1 &&
              <div className={classes.buttonWrapper}>
                {
                  group.items.map((item) => (
                    <button
                    key={item.id}
                      className={cn(
                        classes.secondary,
                        {[classes.current]: activeItems.includes(item.id)},
                      )}
                      onClick={() => setActiveItems((prev) => [...prev.slice(0, index), item.id, ...prev.slice(index + 1)])}
                    >
                      {item.name}
                    </button>
                  ))
                }
              </div>
            }

            {
              getCurrentItem(activeItems, group.items) && getCurrentItem(activeItems, group.items)!.description &&
              <div className={classes.descriptionWrapper}>
                {
                  <p>
                    <b>
                      {getCurrentItem(activeItems, group.items)!.description.slice(0, getCurrentItem(activeItems, group.items)!.description.indexOf(':') + 1)}
                    </b>

                    {getCurrentItem(activeItems, group.items)!.description.slice(getCurrentItem(activeItems, group.items)!.description.indexOf(':') + 1)}
                  </p>
                }
              </div>
            }

            <div className={classes.priceWrapper}>
              <p className={classes.price}>
                {
                  `
                    ${getCurrencyExchange(getCurrentItem(activeItems, group.items)!.price, Currencies.CNY, currency)}
                    ${Currencies.CNY} •
                    ${getCurrencyExchange(getCurrentItem(activeItems, group.items)!.price, Currencies.RUB, currency)}
                    ${Currencies.RUB}
                  `
                }
              </p>

              <button
                className={cn(
                  classes.priceButton,
                  {[classes.added]: addItems.includes(getCurrentItem(activeItems, group.items)!.id)}
                )}
                onClick={() => addItemHandler(group.items)}
              >
                {
                  addItems.includes(getCurrentItem(activeItems, group.items)!.id)
                  ? 'Удалить'
                  : 'Добавить'
                }
              </button>
            </div>
          </div>
        ))
      }
    </>
  );
};
