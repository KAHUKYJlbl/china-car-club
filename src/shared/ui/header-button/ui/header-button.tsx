import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';

import classes from './header-button.module.sass';

type HeaderButtonProps = {
  text?: string;
  icon?: string;
  type?: 'dark' | 'light';
  onClick: () => void;
};

export const HeaderButton = ({text, icon, type = 'dark', onClick}: HeaderButtonProps) => {
  const isMobile = useMediaQuery({ maxWidth: 960 });

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
            <use style={{color: '#00000033'}} xlinkHref={`#${icon}`} />
        </svg>
      }

      {
        text && (!isMobile || !icon) &&
        <div className={classes.textWrapper} >
          {text}
        </div>
      }
    </div>
  );
};
