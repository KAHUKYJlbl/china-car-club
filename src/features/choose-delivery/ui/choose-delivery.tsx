import { memo } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '../../../app/provider/router';
import { Dropdown } from '../../../shared/ui/dropdown';

import classes from './choose-delivery.module.sass';

type ChooseDeliveryProps = {
  modelId: number | null;
  specificationId: number | null;
}

export const ChooseDelivery = memo(
  ({ modelId, specificationId }: ChooseDeliveryProps): JSX.Element => {
    const navigate = useNavigate();

    const buttonClickHandler = () => {
      if (modelId && specificationId ) {
        navigate(queryString.stringifyUrl({
          url: AppRoute.Model,
          query: {
            model: modelId.toString(),
            spec: specificationId.toString(),
          }
        }))
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
          onClick={ buttonClickHandler }
        >
          Быстрый онлайн-расчет под ключ
        </button>

        <p className={classes.small}>
          Нажимая кнопку, даю согласие на обработку моих персональных данных в соответствии с политикой конфиденциальности
        </p>
      </div>
    )
  }
);
