import cn from 'classnames';

import classes from './header-button.module.sass';

type HeaderButtonProps = {
  text?: string;
  icon?: string;
  type?: 'dark' | 'light';
  onClick: () => void;
};

export const HeaderButton = ({text, icon, type = 'dark', onClick}: HeaderButtonProps) => {
  return (
    <div
      className={cn(
        {[classes.light]: type === 'light'},
        classes.wrapper
      )}
      onClick={onClick}
    >
      {
        icon &&
        <svg
            width="24"
            height="24"
            aria-hidden="true"
          >
            <use xlinkHref={`#${icon}`} />
        </svg>
      }

      {
        text &&
        <div className={classes.textWrapper} >
          {text}
        </div>
      }
    </div>
  );
};
