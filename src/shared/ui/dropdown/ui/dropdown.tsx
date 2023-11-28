import { useState } from 'react';

import classes from './dropdown.module.sass';

type DropdownProps = {
  current: number | null;
  setCurrent: React.Dispatch<React.SetStateAction< number | null >>;
  placeholder: string;
  list?: {name: string, id: number}[] | null;
};

export const Dropdown = ({current, setCurrent, placeholder, list}: DropdownProps): JSX.Element => {
  const [ isOpen, setIsOpen ] = useState(false);

  console.log(list);
  console.log(isOpen);

  const toggleOpen = () => {
    setIsOpen((current) => !current);
  }

  const handleItemClick = (id: number) => {
    setCurrent(id);
    setIsOpen(false);
  }

  return (
    <>
      <div className={classes.wrapper}>
        {
          (list && current)
          ? list.find((item) => item.id === current)?.name
          : placeholder
        }

        <svg className={classes.arrow} onClick={toggleOpen} width="8" height="7" aria-hidden="true">
          <use xlinkHref="#dropdown" />
        </svg>

        {isOpen && list &&
          <div className={classes.listWrapper}>
            <ul className={classes.list}>
              {
                list.map((item) => (
                  <li
                    key={item.id}
                    className={classes.listItem}
                    onClick={() => handleItemClick(item.id)}
                  >
                    {item.name}
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
