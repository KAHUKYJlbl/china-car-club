import { useEffect, useRef, useState } from 'react';

import useClickOutside from '../../../lib/hooks/use-click-outside';

import { DropdownExtraListType, DropdownListType } from '../lib/types';
import classes from './dropdown.module.sass';

type DropdownProps = {
  currentElement: number | null;
  setCurrent: React.Dispatch<React.SetStateAction< number | null >>;
  placeholder: string;
  list?: DropdownListType[] | null;
  extraListHeader?: DropdownExtraListType
  disabled?: boolean;
};

export const Dropdown = ({
  currentElement,
  setCurrent,
  list,
  extraListHeader,
  placeholder,
  disabled = false,
}: DropdownProps): JSX.Element => {
  const listRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
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
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    })
    .filter((element) => element.name.toLowerCase().includes(currentFilter.toLowerCase()));

  const extraList = displayedList?.filter((element) => element.isHighlight);

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
    <>
      <div
        className={classes.wrapper}
        ref={fieldRef}
        onClick={disabled ? () => null : toggleOpen}
      >
        <input
          type="text"
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
              extraListHeader && extraList && extraList.length !== 0 && !currentFilter &&
              <>
                <p className={classes.listHeader}>{extraListHeader.extraListHeader}</p>

                <ul className={classes.list}>
                  {
                    extraList.map((item) => (
                      <li
                        key={item.id}
                        className={classes.listItem}
                        onClick={(e) => handleItemClick(item.id, e)}
                      >
                        <span>{item.name}</span>
                        <span className={classes.listItemCount}>{ item.sublistLength }</span>
                      </li>
                    ))
                  }
                </ul>
              </>
            }

            {
              extraListHeader && extraList && extraList.length !== 0 && !currentFilter &&
              <p className={classes.listHeader}>
                {extraListHeader.basicListHeader}
              </p>
            }

            <ul className={classes.list}>
              {
                displayedList.length === 0
                  ? <li className={classes.listItem}>Ничего не найдено</li>
                  : displayedList.map((item) => (
                    <li
                      key={item.id}
                      className={classes.listItem}
                      onClick={(e) => handleItemClick(item.id, e)}
                    >
                      <span>{item.name}</span>

                      <span className={classes.listItemCount}>{ item.sublistLength }</span>
                    </li>
                  ))
              }
            </ul>
          </div>
        }
      </div>

    </>
  )
}
