import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { AppRoute } from '../../../app/provider/router';
import { DROPDOWN_CITIES } from '../../../app/settings/cities';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { HeaderButton } from '../../../shared/ui/header-button/header-button';
import { DropdownHeader } from '../../../shared/ui/dropdown';
import { Currencies, getCurrencyName, getCurrentCurrency } from '../../../entities/currency';
import { getCurrentCity, HeaderUser, setCity } from '../../../entities/user';

import classes from './new-header.module.sass';
import { setCurrentCurrency } from '../../../entities/currency/model/currency-slice';

type NewHeaderProps = {};

export const NewHeader = ({}: NewHeaderProps) => {
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
      <div className={classes.menuWrapper}>
        <Link to={AppRoute.Main} >
          <svg
            width={ isDesktop ? 220 : 148 }
            height={ isDesktop ? 36 : 24 }
            aria-hidden="true"
          >
            <use xlinkHref="#logo-new" />
          </svg>
        </Link>

        <HeaderButton icon='menu' onClick={() => null} />

        <DropdownHeader
          currentElement={city}
          setCurrent={setCityHandler}
          list={DROPDOWN_CITIES}
          placeholder='Город доставки авто'
        />

        <HeaderButton text={getCurrencyName(currentCurrency)} onClick={toggleCurrency} />
      </div>

      <HeaderUser />
    </div>
  );
};

