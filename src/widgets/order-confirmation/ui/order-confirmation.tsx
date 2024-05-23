import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { DROPDOWN_CITIES } from '../../../app/settings/cities';
import { getPrices, getTotal } from '../../../features/choose-options';
import { getName } from '../../../entities/manufacturer';
import { getCurrentCity } from '../../../entities/user';
import { getSpecificationParams } from '../../../entities/model';
import { getAddItems, getAddItemsPrice, getAdds, getCurrentTax } from '../../../entities/order';
import { getCurrency, getCurrencyLoadingStatus, getCurrentCurrency } from '../../../entities/currency';
import { AddItemType, getSpecificationAddProducts, getSpecifications } from '../../../entities/specification';
import { Modal } from '../../../shared/ui/modal';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import priceFormat from '../../../shared/lib/utils/price-format';

import { Colors } from './colors';
import { Delivery } from './delivery';
import { Payment } from './payment';
import { Supplier } from './supplier';
import { TAX_NAMES, TAX_SUBNAMES } from '../lib/const';
import classes from './order-confirmation.module.sass';

type OrderConfirmationProps = {
  cancelConfirmation: () => void;
};

export const OrderConfirmation = ({ cancelConfirmation }:OrderConfirmationProps ) => {
  const [ searchParams, _setSearchParams ] = useSearchParams();

  const specifications = useAppSelector(getSpecifications);
  const name = useAppSelector((state) => getName(state, Number( searchParams.get('model') )));
  const options = useAppSelector(getAdds);
  const city = useAppSelector(getCurrentCity);
  const adds = useAppSelector(getSpecificationAddProducts);
  const addItems = useAppSelector(getAddItems);
  const addItemsPrice = useAppSelector(getAddItemsPrice);
  const currency = useAppSelector(getCurrency);
  const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
  const currentCurrency = useAppSelector(getCurrentCurrency);
  const currentTax = useAppSelector(getCurrentTax);
  const specificationName = specifications.find((spec) => spec.id === Number(searchParams.get('spec')))?.name || '';
  const specificationParams = useAppSelector((state) => getSpecificationParams(state, Number(searchParams.get('spec'))));

  // popups
  const [ isSupplier, setIsSupplier ] = useState(false);
  const [ isPayment, setIsPayment ] = useState(false);
  const [ isDelivery, setIsDelivery ] = useState(false);
  const [ isColors, setIsColors ] = useState(false);

  if (
    !name
    || !adds
    || !currency
    || !specificationParams
    || currencyLoadingStatus.isLoading) {
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
            Быстрый расчет цены:<br/>
            <b>
              {
                `${priceFormat(
                  getTotal({
                    totalPrice: getPrices(currentTax, specificationParams.price),
                    options,
                    optionsPrices: {
                      epts: specificationParams.price.eptsSbktsUtil,
                      guarantee: 0,
                      options: addItemsPrice,
                    },
                    currency,
                    currentCurrency,
                  })
                )} ${currentCurrency}`
              }
            </b>
          </p>

          <div className={classes.listWrapper}>
            <span>Включает:</span>
            <ul>
              <li>
                {
                  TAX_NAMES[currentTax]
                }
              </li>

              <li>
                {
                  TAX_SUBNAMES[currentTax]
                }
              </li>

              {
                options.epts &&
                <li>
                  Получение ЭПТС и СБКТС
                </li>
              }

              {
                options.options &&
                <li>
                  Доп. товары на автомобиль
                  <ul className={classes.nestedList}>
                    {
                      adds.groups
                        .reduce<AddItemType[]>((acc, group) => {
                          return [...acc, ...group.items];
                        }, [])
                        .filter((item) => {
                          return addItems.includes(item.id)
                        })
                        .map((item) => (
                          <li key={item.id}>
                            <span>{item.fullName}</span>
                          </li>
                        ))
                    }
                  </ul>
                </li>
              }

              {
                options.guarantee &&
                <li>
                  Гарантия на автомобиль
                </li>
              }
            </ul>
          </div>
        </div>

        <div className={classes.block}>
          <p>
            Город доставки авто<br/>
            <b>
              {
                DROPDOWN_CITIES[city].name
              }
            </b>
          </p>
        </div>

        <div className={classes.block}>
          <label className={classes.checkboxLabel}>
            <div className={classes.checkbox}>
              <input type='checkbox' className='visually-hidden' />
            </div>

            Можно рекомендовать другие модели в&nbsp;этом&nbsp;же диапазоне
          </label>

          <label className={classes.checkboxLabel}>
            <div className={cn(classes.checkbox, classes.checked)}>
              <svg
                width='16'
                height='16'
                aria-hidden="true"
              >
                <use xlinkHref="#v" />
              </svg>

              <input type='checkbox' className='visually-hidden' />
            </div>

            Без звонков, связь только через мессенджеры
          </label>
        </div>
      </div>

      <div className={cn(classes.subwrapper, classes.conditions)}>
        <div className={classes.block}>
          <p className={classes.header}>
            ❷ Укажите предпочтительные условия поставки автомобиля, чтобы получить предложения с&nbsp;максимальной выгодой
          </p>

          <button
            className={cn(classes.conditionButton, classes.filled)}
            onClick={() => setIsSupplier(true)}
          >
            Готовность к заказу

            <svg
              width='16'
              height='16'
              aria-hidden="true"
            >
              <use xlinkHref="#v" />
            </svg>
          </button>

          <button
            className={classes.conditionButton}
            onClick={() => setIsPayment(true)}
          >
            Предпочтительные способы оплаты
          </button>

          <button
            className={classes.conditionButton}
            onClick={() => setIsDelivery(true)}
          >
            Предпочтительный срок поставки
          </button>

          <button
            className={classes.conditionButton}
            onClick={() => setIsColors(true)}
          >
            Предпочтительные цвета машины
          </button>
        </div>

        <div className={classes.block}>
          <input type='text' placeholder='Ваше имя' />

          <textarea placeholder='Комментарий к заказу' className={classes.textarea} />
        </div>
      </div>

      <div className={cn(classes.subwrapper, classes.confirm)}>
        <button>
          Отправить предпочтения
        </button>
      </div>

      {
        isSupplier &&
        <Modal onClose={() => setIsSupplier(false)}>
          <Supplier
          />
        </Modal>
      }

      {
        isPayment &&
        <Modal onClose={() => setIsPayment(false)}>
          <Payment
          />
        </Modal>
      }

      {
        isDelivery &&
        <Modal onClose={() => setIsDelivery(false)}>
          <Delivery
          />
        </Modal>
      }

      {
        isColors &&
        <Modal onClose={() => setIsColors(false)}>
          <Colors
          />
        </Modal>
      }
    </div>
  );
};
