import { useState } from 'react';

import classes from './dropdown.module.sass';

type DropdownProps = {
  current?: string;
  placeholder: string;
  list: string[];
};

export const Dropdown = ({current, placeholder, list}: DropdownProps): JSX.Element => {
  const [ isOpen, setIsOpen ] = useState(false);

  console.log(list);
  console.log(isOpen);

  const toggleOpen = () => {
    setIsOpen((current) => !current);
  }

  return (
    <div className={classes.wrapper}>
      {current || placeholder}

      <svg className={classes.arrow} onClick={toggleOpen} width="8" height="7" aria-hidden="true">
        <use xlinkHref="#dropdown" />
      </svg>
    </div>
  )
}
