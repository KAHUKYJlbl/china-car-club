import { memo, MouseEvent, useEffect, useRef, useState } from "react";

import useClickOutside from "../../../lib/hooks/use-click-outside";
import { useAppDispatch } from "../../../lib/hooks/use-app-dispatch";
import { setAutoLocation } from "../../../../entities/user";

import { DropdownExtraListType, DropdownListType } from "../lib/types";
import classes from "./dropdown-header.module.sass";

type DropdownProps = {
  currentElement: number | null;
  setCurrent: (id: number) => void;
  placeholder: string;
  list?: DropdownListType[] | null;
  extraListHeader?: DropdownExtraListType;
  disabled?: boolean;
};

export const DropdownHeader = memo(
  ({
    currentElement,
    setCurrent,
    list,
    extraListHeader,
    placeholder,
    disabled = false,
  }: DropdownProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const listRef = useRef<HTMLDivElement>(null);
    const fieldRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState("");
    const [currentFilter, setCurrentFilter] = useState("");

    useClickOutside([listRef, fieldRef], () => setIsOpen(false));

    useEffect(() => {
      setCurrentFilter("");
      setCurrentValue("");

      if (list && currentElement !== null) {
        setCurrentValue(list.find((item) => item.id === currentElement)?.name || "");
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
      if (list && Boolean(list.length)) {
        setIsOpen((current) => !current);
      }
    };

    const handleItemClick = (id: number, e: React.MouseEvent<HTMLLIElement>) => {
      e.stopPropagation();

      setCurrent(id);
      setIsOpen(false);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsOpen(true);
      setCurrentValue(e.target.value);
      setCurrentFilter(e.target.value);
    };

    const handleInputBlur = () => {
      if (list && currentElement) {
        setCurrentValue(list.find((item) => item.id === currentElement)?.name || "");
      }
    };

    const handleAutoLocation = (e: MouseEvent<HTMLDivElement>) => {
      console.log("location");
      e.stopPropagation();
      dispatch(setAutoLocation());
    };

    return (
      <>
        <div
          className={classes.wrapper}
          ref={fieldRef}
          onClick={disabled ? () => null : toggleOpen}
        >
          <div
            className={classes.location}
            onClick={handleAutoLocation}
          >
            <svg
              width="12"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#cabinet-pin" />
            </svg>
          </div>

          <div className={classes.currentWrapper}>
            <p className={classes.placeholder}>{placeholder}</p>

            <input
              type="text"
              name="search"
              autoComplete="off"
              className={classes.currentElement}
              placeholder={disabled ? "Загрузка..." : placeholder}
              disabled={disabled || !list}
              value={currentValue}
              onChange={(e) => handleInput(e)}
              onBlur={handleInputBlur}
            />
          </div>

          {isOpen && displayedList && (
            <div
              className={classes.listWrapper}
              ref={listRef}
            >
              {extraListHeader && extraList && extraList.length !== 0 && !currentFilter && (
                <>
                  <p className={classes.listHeader}>{extraListHeader.extraListHeader}</p>

                  <ul className={classes.list}>
                    {extraList.map((item) => (
                      <li
                        key={item.id}
                        className={classes.listItem}
                        onClick={(e) => handleItemClick(item.id, e)}
                      >
                        <span>{item.name}</span>
                        <span className={classes.listItemCount}>{item.sublistLength}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {extraListHeader && extraList && extraList.length !== 0 && !currentFilter && (
                <p className={classes.listHeader}>{extraListHeader.basicListHeader}</p>
              )}

              <ul className={classes.list}>
                {displayedList.length === 0 ? (
                  <li className={classes.listItem}>Ничего не найдено</li>
                ) : (
                  displayedList.map((item) => (
                    <li
                      key={item.id}
                      className={classes.listItem}
                      onClick={(e) => handleItemClick(item.id, e)}
                    >
                      <span>{item.name}</span>

                      <span className={classes.listItemCount}>{item.sublistLength}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }
);
