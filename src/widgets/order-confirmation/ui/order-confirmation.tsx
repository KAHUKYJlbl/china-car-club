import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getSpecifications } from '../../../entities/specification';
import { getName } from '../../../entities/manufacturer';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';

import classes from './order-confirmation.module.sass';

type OrderConfirmationProps = {
  cancelConfirmation: () => void;
};

export const OrderConfirmation = ({ cancelConfirmation }:OrderConfirmationProps ) => {
  const [ searchParams, _setSearchParams ] = useSearchParams();

  const specifications = useAppSelector(getSpecifications);
  const name = useAppSelector((state) => getName(state, Number( searchParams.get('model') )));
  const specificationName = specifications.find((spec) => spec.id === Number(searchParams.get('spec')))?.name || '';

  if (!name) {
    return <LoadingSpinner spinnerType='widget' />
  }

  return (
    <div className={classes.wrapper}>
      <div className={cn(classes.subwrapper, classes.bar)}>
        <p>
          Запрос цен отправлен
        </p>

        <button onClick={cancelConfirmation}>
          Назад
        </button>
      </div>

      <div className={cn(classes.subwrapper, classes.data)}>
        <div className={classes.block}>
          <p className={classes.header}>
            ❶ Проверьте данные
          </p>

          <p className={classes.model}>
            <span>{name.manufacturer}</span>
            <br/><span>{name.model}</span>
            <br/>{specificationName}
          </p>
        </div>

        <div className={classes.block}>
          <p>
            Быстрый расчет цены
            {/* {
              getTotal({
                totalPrice: currentTax === TaxesTypes.PERS
                  ? specificationParams.price.withLogisticsPers
                  : specificationParams.price.withLogisticsCorp,
                options: adds,
                optionsPrices: {
                  epts: specificationParams.price.eptsSbktsUtil,
                  guarantee: 0,
                  options: addItemsPrice,
                },
                currency,
                currentCurrency,
              })
            } */}
          </p>
        </div>

        <div className={classes.block}>
          <p>
            Город поставки авто
          </p>
        </div>

        <div className={classes.block}>
          Можно рекомендовать другие модели
        </div>
      </
      div>

      <div className={cn(classes.subwrapper, classes.conditions)}>
        <p className={classes.header}>
          ❷ Укажите предпочтительные условия поставки автомобиля, чтобы получить предложения с максимальной выгодой
        </p>
      </div>

      <div className={cn(classes.subwrapper, classes.confirm)}>
        <button>
          Отправить предпочтения
        </button>
      </div>
    </div>
  );
};
