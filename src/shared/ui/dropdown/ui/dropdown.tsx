import { useRef, useState } from 'react';

import classes from './dropdown.module.sass';
import useClickOutside from '../../../lib/hooks/use-click-outside';

type DropdownProps = {
  current: number | null;
  setCurrent: React.Dispatch<React.SetStateAction< number | null >>;
  placeholder: string;
  list?: {name: string, id: number, sublistLength?: number | null}[] | null;
  disabled?: boolean;
};

export const Dropdown = ({current, setCurrent, placeholder, list, disabled = false}: DropdownProps): JSX.Element => {
  const [ isOpen, setIsOpen ] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useClickOutside([listRef, fieldRef], () => setIsOpen(false));

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

  return (
    <>
      <div
        className={classes.wrapper}
        ref={fieldRef}
        style={disabled ? {color: "lightgrey"} : {}}
        onClick={disabled ? () => null : toggleOpen}>
        {
          (list && current)
          ? list.find((item) => item.id === current)?.name
          : disabled
            ? 'Загрузка ...'
            : placeholder
        }

        <svg
          className={classes.arrow}
          width="8"
          height="7"
          aria-hidden="true"
          style={isOpen ? {transform: 'rotate(180deg)', transitionDuration: '100ms'} : {transitionDuration: '100ms'}}
        >
          <use xlinkHref="#dropdown" />
        </svg>

        {isOpen && list &&
          <div className={classes.listWrapper} ref={listRef}>
            <ul className={classes.list}>
              {
                list.map((item) => (
                  <li
                    key={item.id}
                    className={classes.listItem}
                    onClick={(e) => handleItemClick(item.id, e)}
                  >
                    {item.name + ( item.sublistLength ? ` (${item.sublistLength})` : '' )}
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
