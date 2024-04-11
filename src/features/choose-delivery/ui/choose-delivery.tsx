import { memo, useState } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoute } from '../../../app/provider/router';
import {
  fetchHash,
  postStatistics,
  getGeolocation,
  Login,
  getCurrentCity,
  getAuthStatus,
  postRefresh
} from '../../../entities/user';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';

import { useUtm } from '../lib/hooks/use-utm';
import classes from './choose-delivery.module.sass';

type ChooseDeliveryProps = {
  modelId: number | null;
  specificationId: number | null;
}

export const ChooseDelivery = memo(
  ({ modelId, specificationId }: ChooseDeliveryProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [ isLogin, setIsLogin ] = useState(false);
    const isAuth = useAppSelector(getAuthStatus);
    const geolocation = useAppSelector(getGeolocation);
    const city = useAppSelector(getCurrentCity);
    const utm = useUtm();

    const loginHandler = () => {
      if ( modelId && specificationId ) {
        dispatch(postStatistics({
          specificationId: specificationId,
          customerLocation: geolocation,
          customerDelivery: {
            countryId: null,
            cityId: city,
          },
          utm,
        }))
          .then(() => {
            dispatch(postRefresh());
          });


        navigate(queryString.stringifyUrl({
          url: AppRoute.Model,
          query: {
            model: modelId.toString(),
            spec: specificationId.toString(),
          }
        }))
      }
    }

    const calculateHandler = () => {
      if (modelId && specificationId) {
        if (isAuth) {
          loginHandler();
        } else {
          dispatch(fetchHash());
          setIsLogin(true);
        }
      } else {
        toast('Выберите комплектацию', {type: 'warning'});
      }
    }

    return (
      <div className={classes.wrapper}>
        <p>
          <span className={classes.big}>❷ Рассчитайте под ключ доставку из Китая</span>

          <br/>Сравните варианты растаможивания по каждой комплектации автомобиля. Запросите цены наших партнёров, чтобы выбрать лучшее предложение на рынке
        </p>

        <button
          className={classes.button}
          onClick={calculateHandler}
        >
          Быстрый онлайн-расчет под ключ
        </button>

        <p className={classes.small}>
          Нажимая кнопку, даю согласие на обработку моих персональных данных в соответствии с политикой конфиденциальности
        </p>

        {
          isLogin &&
          <Login
            onClose={() => setIsLogin(false)}
            onLogin={loginHandler}
          />
        }
      </div>
    )
  }
);
