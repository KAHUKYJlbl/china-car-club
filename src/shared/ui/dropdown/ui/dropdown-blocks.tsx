import { memo, useEffect, useRef, useState } from 'react';

import { getCurrency } from '../../../../entities/currency';

import useClickOutside from '../../../lib/hooks/use-click-outside';
import priceFormat from '../../../lib/utils/price-format';
import { useAppSelector } from '../../../lib/hooks/use-app-selector';

import { DropdownListType } from '../lib/types';
import classes from './dropdown-blocks.module.sass';

type DropdownProps = {
  currentElement: number | null;
  setCurrent: React.Dispatch<React.SetStateAction< number | null >>;
  placeholder: string;
  list?: DropdownListType[] | null;
  disabled?: boolean;
  isPrices?: boolean;
};

export const DropdownBlocks = memo(
  ({
    currentElement,
    setCurrent,
    list,
    placeholder,
    disabled = false,
    isPrices = false,
  }: DropdownProps): JSX.Element => {
    const listRef = useRef<HTMLDivElement>(null);
    const fieldRef = useRef<HTMLDivElement>(null);
    const currency = useAppSelector(getCurrency);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ currentValue, setCurrentValue ] = useState('');
    const [ currentFilter, setCurrentFilter ] = useState('');

    useClickOutside([listRef, fieldRef], () => setIsOpen(false));

    useEffect(() => {
      setCurrentFilter('');
      setCurrentValue('');

      if (list && currentElement) {
        setCurrentValue(list.find((item) => item.id === currentElement)?.name || '');
      }
    }, [currentElement, isOpen, disabled]);

    const displayedList = list
      ?.toSorted((a, b) => {
        if (a.price && b.price) {
          return a.price - b.price;
        };

        return 0;
      })
      .filter((element) => element.name.toLowerCase().includes(currentFilter.toLowerCase()));

    const toggleOpen = () => {
      if ( list && Boolean(list.length) ) {
        setIsOpen((current) => !current);
      }
    }

    const handleItemClick = (id: number, e: React.MouseEvent<HTMLLIElement>) => {
      e.stopPropagation();

      setCurrent(id);
      setIsOpen(false);
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsOpen(true);
      setCurrentValue(e.target.value);
      setCurrentFilter(e.target.value);
    }

    const handleInputBlur = () => {
      if (list && currentElement) {
        setCurrentValue(list.find((item) => item.id === currentElement)?.name || '');
      }
    }

    return (
      <div
        className={classes.wrapper}
        ref={fieldRef}
        onClick={disabled ? () => null : toggleOpen}
      >
        <input
          type="text"
          name="search"
          autoComplete="off"
          className={classes.currentElement}
          placeholder={disabled ? 'Загрузка...' : placeholder}
          disabled={disabled || !list}
          value={currentValue}
          onChange={(e) => handleInput(e)}
          onBlur={handleInputBlur}
        />

        <svg
          className={classes.arrow}
          width="8"
          height="7"
          aria-hidden="true"
          style={isOpen
            ? {transform: 'rotate(180deg)', transitionDuration: '100ms'}
            : !list || disabled
              ? {transitionDuration: '100ms', cursor: 'default'}
              : {transitionDuration: '100ms'}
          }
        >
          <use xlinkHref="#dropdown" />
        </svg>

        {
          isOpen && displayedList &&
          <div className={classes.listWrapper} ref={listRef}>
            {
              Array.from(new Set(list?.map((element) => element.year)))
                .toSorted((a, b) => (a && b) ? b - a : 0)
                .map((year) =>
                  <div key={year}>
                    <p className={classes.listHeader}>
                      {`${year} поколение • 2024 выпуск`}
                    </p>

                    <ul className={classes.list}>
                      {
                        displayedList.length === 0
                          ? <li className={classes.listItem}>Ничего не найдено</li>
                          : displayedList
                            .filter((item) => item.year === year)
                            .map((item) => (
                              <li
                                key={item.id}
                                className={classes.listItem}
                                onClick={(e) => handleItemClick(item.id, e)}
                              >
                                <p>
                                  <span>{item.name}</span>
                                  {
                                    item.price && item.chinaPrice &&
                                    <span className={classes.price}>
                                      {
                                        isPrices
                                          ? `Под ключ: ${priceFormat( (item.price * currency!.cny).toFixed() )} ₽`
                                          : `В Китае: ${priceFormat( (item.chinaPrice * currency!.cny).toFixed() )} ₽`
                                      }
                                    </span>
                                  }
                                </p>

                                <span className={classes.listItemCount}>{ item.sublistLength }</span>
                              </li>
                            ))
                      }
                    </ul>
                  </div>
              )
            }

          </div>
        }
      </div>
    )
  }
);
