import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { AppRoute } from '../../../app/provider/router';
import { DROPDOWN_CITIES } from '../../../app/settings/cities';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { HeaderButton } from '../../../shared/ui/header-button/header-button';
import { DropdownHeader } from '../../../shared/ui/dropdown';
import { getCurrentCity, HeaderUser, setCity } from '../../../entities/user';

import classes from './new-header.module.sass';

type NewHeaderProps = {};

export const NewHeader = ({}: NewHeaderProps) => {
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ query: '(min-width: 961px)' });
  const city = useAppSelector(getCurrentCity);

  const setCityHandler = (id: number) => {
    dispatch(setCity(id));
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

        <HeaderButton icon='menu' />

        <DropdownHeader
          currentElement={city}
          setCurrent={setCityHandler}
          list={DROPDOWN_CITIES}
          placeholder='Город доставки авто'
        />

        <HeaderButton text='RUB' />
      </div>

      <HeaderUser />
    </div>
  );
};

