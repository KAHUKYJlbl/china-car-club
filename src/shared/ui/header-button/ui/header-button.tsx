import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';

import classes from './header-button.module.sass';

type HeaderButtonProps = {
  label: string;
  text?: string;
  icon?: string;
  type?: 'dark' | 'light';
  labelCount?: number;
  onClick: () => void;
};

export const HeaderButton = ({text, icon, type = 'dark', labelCount, onClick, label}: HeaderButtonProps) => {
  const isMobile = useMediaQuery({ maxWidth: 960 });

  return (
    <button
      className={cn(
        {[classes.light]: type === 'light'},
        classes.wrapper
      )}
      onClick={onClick}
      aria-label={label}
    >
      {
        icon &&
        <svg
            width="24"
            height="24"
            aria-hidden="true"
          >
            <use style={{color: '#00000033'}} xlinkHref={`#${icon}`} />
        </svg>
      }

      {
        text && (!isMobile || !icon) &&
        <div className={classes.textWrapper} >
          {text}
        </div>
      }

      {
        !!labelCount &&
        <p className={classes.labelCount}>
          {labelCount}
        </p>
      }
    </button>
  );
};
