import cn from 'classnames';

import classes from './header.module.sass';

export const Header = (): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.logo}>
        <svg width="214" height="26" aria-hidden="true">
          <use xlinkHref="#logo" />
        </svg>
      </div>

      <div className={classes.navWrapper}>
        <div className={classes.navHeader}>
          <span>Экспертная компания,</span><br/>где есть офисы в Китае, России и в<br/>Киргизии
        </div>

        <nav className={classes.nav}>
          <div className={classes.navItem}>Журнал</div>
          <div className={classes.navItem}>Контакты</div>
          <div className={classes.navItem}>О компании</div>
          <div className={cn(classes.navItem, classes.navPhone)}>
            <a href='tel:+78002222878'>8-800-2222-878</a>
          </div>
        </nav>
      </div>
    </div>
  )
}
