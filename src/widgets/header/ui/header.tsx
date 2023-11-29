import { useMediaQuery } from 'react-responsive';

import classes from './header.module.sass';

export const Header = (): JSX.Element => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>
        Новый автомобиль из Китая в Россию {!isMobile && <br/>}по цене завода, {isMobile && <br/>}без посредников
      </h1>

      <p className={classes.subheader}>
        Безопасная растаможка и пожизненная поддержка по запчастям
      </p>
    </div>
  )
}
