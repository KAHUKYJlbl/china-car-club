import { memo, useState } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '../../../app/provider/router';
import { Dropdown } from '../../../shared/ui/dropdown';

import classes from './choose-delivery.module.sass';
import { Login } from '../../login';
import { toast } from 'react-toastify';

type ChooseDeliveryProps = {
  modelId: number | null;
  specificationId: number | null;
}

export const ChooseDelivery = memo(
  ({ modelId, specificationId }: ChooseDeliveryProps): JSX.Element => {
    const navigate = useNavigate();
    const [ isLogin, setIsLogin ] = useState(false);

    const loginHandler = () => {
      if ( modelId && specificationId ) {
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
        setIsLogin(true)
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
            onLoginSuccess={loginHandler}
          />
        }
      </div>
    )
  }
);
