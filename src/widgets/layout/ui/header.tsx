import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';

import classes from './header.module.sass';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../app/provider/router';

export const Header = (): JSX.Element => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1281px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  return (
    <div className={classes.wrapper}>
      <div className={classes.logo}>
        <Link to={AppRoute.Main} >
          <svg
            width={ isDesktop ? "214" : ( isMobile ? "106" : "151" ) }
            height={ isDesktop ? "26" : ( isMobile ? "12" : "17" ) }
            aria-hidden="true"
          >
            <use xlinkHref="#logo" />
          </svg>
        </Link>
      </div>

      <div className={classes.navWrapper}>
        { !isMobile &&
          <div className={classes.navHeader}>
            <span>Экспертная компания,<br/></span> где есть офисы в Китае,<br/>России и в Киргизии
          </div>
        }

        <nav className={classes.nav}>
          {
            isDesktop
            ? <>
              {/* <div className={classes.navItem}>Журнал</div> */}
              <div className={classes.navItem}>Контакты</div>
              <div className={classes.navItem}>О компании</div>
            </>
            : <div className={cn(classes.navItem, classes.navPhone)}>
              <button>
                Меню
              </button>
            </div>

          }
          <div className={cn(classes.navItem, classes.navPhone)}>
            <a href='tel:+78002222878'>8-800-2222-878</a>
          </div>
        </nav>
      </div>
    </div>
  )
}
