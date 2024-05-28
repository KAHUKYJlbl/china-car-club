import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames';

import { DROPDOWN_CITIES } from '../../../app/settings/cities';
import { getPrices, getTotal } from '../../../features/choose-options';
import { getName } from '../../../entities/manufacturer';
import { getCurrentCity } from '../../../entities/user';
import { getSpecificationParams } from '../../../entities/model';
import { getAddItems, getAddItemsPrice, getAdds, getCurrentOrder, getCurrentTax, postAnswers } from '../../../entities/order';
import { getCurrency, getCurrencyLoadingStatus, getCurrentCurrency } from '../../../entities/currency';
import { AddItemType, getExtColors, getIntColors, getSpecificationAddProducts, getSpecifications } from '../../../entities/specification';
import { Modal } from '../../../shared/ui/modal';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import priceFormat from '../../../shared/lib/utils/price-format';

import { Done } from './done';
import { Colors } from './colors';
import { Delivery } from './delivery';
import { Payment } from './payment';
import { Supplier } from './supplier';
import { OrderFormType } from '../lib/types';
import { TAX_NAMES, TAX_SUBNAMES } from '../lib/const';
import classes from './order-confirmation.module.sass';
import { AppRoute } from '../../../app/provider/router';

type OrderConfirmationProps = {
  cancelConfirmation: () => void;
};

export const OrderConfirmation = ({ cancelConfirmation }:OrderConfirmationProps ) => {
  const extColors = useAppSelector(getExtColors);
  const intColors = useAppSelector(getIntColors);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ searchParams, _setSearchParams ] = useSearchParams();
  const [ fieldErrors, setFieldErrors ] = useState({
    firstName: false,
    carSupplier: false,
    paymentType: false,
  });
  const methods = useForm<OrderFormType>({
    defaultValues: {
      firstName: '',
      comment: '',
      recommendOtherModels: true,
      withoutCalling: false,
      carSupplier: undefined,
      paymentType: {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false,
      },
      preferredDeliveryTime: {
        maxDays: null,
        highPricedOption: true,
      },
      colors: {
        external: extColors ? extColors.map((color) => ({id: color.color.id, value: false})) : [],
        interior: intColors ? intColors.map((color) => ({id: color.color.id, value: false})) : [],
      }
    },
  });

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
  const order = useAppSelector(getCurrentOrder);

  // popups
  const [ isSupplier, setIsSupplier ] = useState(false);
  const [ isPayment, setIsPayment ] = useState(false);
  const [ isDelivery, setIsDelivery ] = useState(false);
  const [ isColors, setIsColors ] = useState(false);
  const [ isDone, setIsDone ] = useState(false);

  const isPaymentTypeEmpty = () => {
    return (
      !methods.watch('paymentType.1')
      && !methods.watch('paymentType.2')
      && !methods.watch('paymentType.3')
      && !methods.watch('paymentType.4')
      && !methods.watch('paymentType.5')
      && !methods.watch('paymentType.6')
    )
  };

  if (
    !name
    || !order
    || !adds
    || !currency
    || !specificationParams
    || currencyLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='widget' />
  }

  const submitHandler: SubmitHandler<OrderFormType> = (data) => {
    if (!methods.getFieldState('carSupplier').isTouched) {
      setFieldErrors((current) => ({...current, carSupplier: true}));
    };

    if (isPaymentTypeEmpty()) {
      setFieldErrors((current) => ({...current, paymentType: true}));
    };

    if (!methods.getFieldState('carSupplier').isTouched || isPaymentTypeEmpty()) {
      return;
    }

    dispatch(postAnswers({
      statisticsEventId: order,
      data: {
        firstName: data.firstName,
        comment: data.comment,
        recommendOtherModels: data.recommendOtherModels,
        withoutCalling: data.withoutCalling,
        carSupplier: [+data.carSupplier!],
        paymentType: Object.entries(data.paymentType)
          .filter((payment) => payment[1])
          .map((payment) => +payment[0]),
        preferredDeliveryTime: {
          maxDays: Number(data.preferredDeliveryTime.maxDays),
          highPricedOption: data.preferredDeliveryTime.highPricedOption,
        },
        colors: {
          external: data.colors.external
            .filter((color) => color.value)
            .map((color) => color.id),
          interior: data.colors.interior
          .filter((color) => color.value)
          .map((color) => color.id),
        }
      },
    }))
    .then(() => {
      setIsDone(true);
    });
  };

  const errorHandler: SubmitErrorHandler<OrderFormType> = (errors) => {
    setFieldErrors({
      firstName: !!errors.firstName,
      carSupplier: !methods.getFieldState('carSupplier').isTouched,
      paymentType: isPaymentTypeEmpty(),
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitHandler, errorHandler)}
        className={classes.wrapper}
      >
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
              <div
                className={cn(
                  classes.checkbox,
                  methods.watch('recommendOtherModels') && classes.checked
                )}
              >
                {
                  methods.watch('recommendOtherModels') &&
                  <svg
                    width='16'
                    height='16'
                    aria-hidden="true"
                  >
                    <use xlinkHref="#v" />
                  </svg>
                }

                <input
                  type='checkbox'
                  className='visually-hidden'
                  {...methods.register('recommendOtherModels')}
                />
              </div>

              Можно рекомендовать другие модели в&nbsp;этом&nbsp;же диапазоне
            </label>

            <label className={classes.checkboxLabel}>
              <div
                className={cn(
                  classes.checkbox,
                  methods.watch('withoutCalling') && classes.checked
                )}
              >
                {
                  methods.watch('withoutCalling') &&
                  <svg
                    width='16'
                    height='16'
                    aria-hidden="true"
                  >
                    <use xlinkHref="#v" />
                  </svg>
                }

                <input
                  type='checkbox'
                  className='visually-hidden'
                  {...methods.register('withoutCalling')}
                  />
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
              type='button'
              className={cn(
                classes.conditionButton,
                methods.watch('carSupplier') && classes.filled,
                fieldErrors.carSupplier && classes.buttonError
              )}
              onClick={() => setIsSupplier(true)}
            >
              Готовность к заказу

              {
                methods.watch('carSupplier') &&
                <svg
                  width='16'
                  height='16'
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              }
            </button>

            <button
              type='button'
              className={cn(
                classes.conditionButton,
                !isPaymentTypeEmpty() && classes.filled,
                fieldErrors.paymentType && classes.buttonError,
              )}
              onClick={() => setIsPayment(true)}
            >
              Предпочтительные способы оплаты

              {
                !isPaymentTypeEmpty() &&
                <svg
                  width='16'
                  height='16'
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              }
            </button>

            <button
              type='button'
              className={cn(
                classes.conditionButton,
                methods.watch('preferredDeliveryTime.maxDays') && classes.filled
              )}
              onClick={() => setIsDelivery(true)}
            >
              Предпочтительный срок поставки

              {
                methods.watch('preferredDeliveryTime.maxDays') &&
                <svg
                  width='16'
                  height='16'
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              }
            </button>

            <button
              type='button'
              className={cn(
                classes.conditionButton,
                methods.watch('colors.external').some((color) => color.value) && classes.filled,
                methods.watch('colors.interior').some((color) => color.value) && classes.filled,
              )}
              onClick={() => setIsColors(true)}
              disabled={!extColors || extColors.length === 0}
            >
              Предпочтительные цвета машины

              {
                (methods.watch('colors.external').some((color) => color.value)
                || methods.watch('colors.interior').some((color) => color.value)) &&
                <svg
                  width='16'
                  height='16'
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              }
            </button>
          </div>

          <div className={classes.block}>
            <input
              type='text'
              autoComplete='off'
              placeholder='Ваше имя'
              onInput={() => setFieldErrors((current) => ({...current, firstName: false}))}
              className={cn(fieldErrors.firstName && classes.error)}
              {...methods.register("firstName", {required: true})}
            />

            <textarea
              placeholder='Комментарий к заказу'
              className={classes.textarea}
              {...methods.register("comment")}
            />
          </div>
        </div>

        <div className={cn(classes.subwrapper, classes.confirm)}>
          <button type='submit'>
            Отправить предпочтения
          </button>
        </div>

        {
          isSupplier &&
          <Modal onClose={() => setIsSupplier(false)} >
            <Supplier onClose={() => setIsSupplier(false)} />
          </Modal>
        }

        {
          isPayment &&
          <Modal onClose={() => setIsPayment(false)} >
            <Payment onClose={() => setIsPayment(false)} />
          </Modal>
        }

        {
          isDelivery &&
          <Modal onClose={() => setIsDelivery(false)} >
            <Delivery onClose={() => setIsDelivery(false)} />
          </Modal>
        }

        {
          isColors &&
          <Modal onClose={() => setIsColors(false)} >
            <Colors onClose={() => setIsColors(false)} />
          </Modal>
        }

        {
          isDone &&
          <Modal
            onClose={() => {navigate(AppRoute.Main)}}
          >
            <Done onDone={() => {navigate(AppRoute.Main)}} />
          </Modal>
        }
      </form>
    </FormProvider>
  );
};
