import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { AppRoute } from '../../../app/provider/router';
import { DROPDOWN_CITIES } from '../../../app/settings/cities';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { HeaderButton } from '../../../shared/ui/header-button';
import { DropdownHeader } from '../../../shared/ui/dropdown';
import { Currencies, getCurrencyName, getCurrentCurrency } from '../../../entities/currency';
import { setCurrentCurrency } from '../../../entities/currency/model/currency-slice';
import { getCurrentCity, HeaderUser, setCity } from '../../../entities/user';

import classes from './header.module.sass';

type NewHeaderProps = {};

export const Header = ({}: NewHeaderProps) => {
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ query: '(min-width: 961px)' });
  const city = useAppSelector(getCurrentCity);
  const currentCurrency = useAppSelector(getCurrentCurrency);

  const setCityHandler = (id: number) => {
    dispatch(setCity(id));
  }

  const toggleCurrency = () => {
    switch (currentCurrency) {
      case Currencies.RUB:
        dispatch(setCurrentCurrency(Currencies.USD));
        break;
      case Currencies.USD:
        dispatch(setCurrentCurrency(Currencies.CNY));
        break;
      case Currencies.CNY:
        dispatch(setCurrentCurrency(Currencies.RUB));
        break;
    };
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.links}>
        <p>
          <span className={classes.link}>Стать продавцом</span>
          <span> • </span>
          <span className={classes.link}>Покупать как компания</span>
        </p>

        <p>
          <span>Бесплатно по России: </span>
          <Link aria-label='позвонить нам' to='tel:+78007001895' className={classes.phone}>8 800 700 18 95</Link>
        </p>
      </div>

      <div className={classes.mainWrapper}>
        <div className={classes.menuWrapper}>
          <Link aria-label='на главную' to={AppRoute.Main} >
            <svg
              width={ isDesktop ? 220 : 148 }
              height={ isDesktop ? 36 : 24 }
              aria-hidden="true"
            >
              <use xlinkHref="#logo" />
            </svg>
          </Link>

          <HeaderButton
          label='menu'
            icon='menu'
            onClick={() => null}
          />

          {
            isDesktop &&
            <>
              <DropdownHeader
                currentElement={city}
                setCurrent={setCityHandler}
                list={DROPDOWN_CITIES}
                placeholder='Город доставки авто'
              />

              <HeaderButton
                label='валюта'
                text={getCurrencyName(currentCurrency)}
                onClick={toggleCurrency}
              />
            </>
          }
        </div>

        <HeaderUser />
      </div>

      {
        !isDesktop &&
        <div className={classes.mobileWrapper}>
          <DropdownHeader
            currentElement={city}
            setCurrent={setCityHandler}
            list={DROPDOWN_CITIES}
            placeholder='Город доставки авто'
          />

          <HeaderButton
            label='валюта'
            text={getCurrencyName(currentCurrency)}
            onClick={toggleCurrency}
          />
        </div>
      }

      {/* <div className={classes.breadcrumbs}></div> */}
    </div>
  );
};

