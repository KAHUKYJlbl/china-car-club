import { memo } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../../app/provider/router';

import classes from './order-buttons.module.sass';

export const OrderButtons = memo(
  (): JSX.Element => {
    return (
      <div className={classes.wrapper}>
        <div className={classes.mainButtons}>
          <button className={classes.round}>
            Уменьшить цену
          </button>

          <button>
            Оставить заявку
          </button>
        </div>

        <Link to={AppRoute.Main} >
          Выбрать другой автомобиль или страну
        </Link>
      </div>
    )
  }
);
