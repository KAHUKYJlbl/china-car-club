import { memo, useState } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

import { AppRoute } from '../../../app/provider/router';
import { fetchHash, postStatistics, getGeolocation, Login, getCurrentCity } from '../../../entities/user';
import { Dropdown } from '../../../shared/ui/dropdown';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { AUTH_TOKEN_KEY_NAME } from '../../../shared/api/token';

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
    const [ cookies ] = useCookies([AUTH_TOKEN_KEY_NAME]);
    const [ isLogin, setIsLogin ] = useState(false);
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
        }));

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
        if ( cookies[AUTH_TOKEN_KEY_NAME] ) {
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
          <span className={classes.bold}>
            Рассчитайте цену под заказ из Китая
          </span>

          <br/>и сравните условия «под ключ» по каждой комплектации автомобиля
        </p>

        <div className={classes.controls}>
          <Dropdown
            currentElement={null}
            setCurrent={() => null}
            placeholder='Страна получения авто'
            list={[{ name:'Россия', id: 1 }]}
          />
          <Dropdown
            currentElement={null}
            setCurrent={() => null}
            placeholder='Город получения авто'
            list={[{ name:'Москва', id: 1 }]}
          />
        </div>

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
