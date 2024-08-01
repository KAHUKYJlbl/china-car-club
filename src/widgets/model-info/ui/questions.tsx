import { memo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import cn from 'classnames';

import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { getCurrentOrder, getQuestionsLoadingStatus, postAnswers, setQuestions } from '../../../entities/order';
import { getExtColors, getIntColors } from '../../../entities/specification';
import { OrderFormType } from '../../order-confirmation';

import classes from './questions.module.sass';

type QuestionsProps = {
  setConfirmation: () => void
};

export const Questions = memo(
  ({setConfirmation}: QuestionsProps) => {
    const extColors = useAppSelector(getExtColors);
    const intColors = useAppSelector(getIntColors);
    const questionsLoadingStatus = useAppSelector(getQuestionsLoadingStatus);

    const dispatch = useAppDispatch();
    const [ _fieldErrors, setFieldErrors ] = useState({
      carSupplier: false,
      paymentType: false,
    });
    const { register, watch, handleSubmit } = useForm<OrderFormType>({
      defaultValues: {
        firstName: '',
        comment: '',
        recommendOtherModels: true,
        withoutCalling: false,
        carSupplier: undefined,
        paymentType: {
          '1': false,
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

    const order = useAppSelector(getCurrentOrder);

    const isPaymentTypeEmpty = () => {
      return (
        !watch('paymentType.1')
        && !watch('paymentType.3')
        && !watch('paymentType.4')
        && !watch('paymentType.5')
        && !watch('paymentType.6')
      )
    };

    if ( !order ) {
      return (
        <div className={classes.wrapper}>
          <LoadingSpinner spinnerType='widget' />
        </div>
      )
    };

    const submitHandler: SubmitHandler<OrderFormType> = (data) => {
      if (!watch('carSupplier')) {
        setFieldErrors((current) => ({...current, carSupplier: true}));
      };

      if (isPaymentTypeEmpty()) {
        setFieldErrors((current) => ({...current, paymentType: true}));
      };

      if (!watch('carSupplier') || isPaymentTypeEmpty()) {
        toast.dismiss();
        toast.error('Необходимо ответить на вопросы');
        return;
      }

      toast.dismiss();
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
        dispatch(setQuestions({
          carSupplier: data.carSupplier ? data.carSupplier : '',
          paymentType: data.paymentType,
        }));

        setConfirmation();
      });
    };

    return (
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={classes.wrapper}>
          <p className={classes.header}>
            Ответьте на 2 вопроса
            <span> — чтобы получить несколько предложений по&nbsp;цене и&nbsp;условиям</span>
          </p>
        </div>

        <div className={classes.wrapper}>
          <p className={classes.header}>
            Вы готовы заказывать авто из&nbsp;Китая или ещё думаете?
          </p>

          <ul className={classes.radio}>
            <li>
              <label className={cn(watch('carSupplier') === '1' && classes.checked)}>
                <div className={cn(watch('carSupplier') === '1' && classes.checked)}>
                  {
                    watch('carSupplier') === '1' &&
                    <svg
                      width='20'
                      height='20'
                      aria-hidden="true"
                    >
                      <use xlinkHref="#checked" />
                    </svg>
                  }

                  <input
                    type='radio'
                    className='visually-hidden'
                    value='1'
                    {...register('carSupplier')}
                  />
                </div>

                Знаю какую машину хочу, выбираю поставщика
              </label>
            </li>

            <li>
              <label className={cn(watch('carSupplier') === '2' && classes.checked)}>
                <div className={cn(watch('carSupplier') === '2' && classes.checked)}>
                  {
                    watch('carSupplier') === '2' &&
                    <svg
                      width='20'
                      height='20'
                      aria-hidden="true"
                    >
                      <use xlinkHref="#checked" />
                    </svg>
                  }

                  <input
                    type='radio'
                    className='visually-hidden'
                    value='2'
                    {...register('carSupplier')}
                  />
                </div>

                Ещё думаю, нужна помощь с&nbsp;выбором машины
              </label>
            </li>

            <li>
              <label className={cn(watch('carSupplier') === '3' && classes.checked)}>
                <div className={cn(watch('carSupplier') === '3' && classes.checked)}>
                  {
                    watch('carSupplier') === '3' &&
                    <svg
                      width='20'
                      height='20'
                      aria-hidden="true"
                    >
                      <use xlinkHref="#checked" />
                    </svg>
                  }

                  <input
                    type='radio'
                    className='visually-hidden'
                    value='3'
                    {...register('carSupplier')}
                  />
                </div>

                Ещё думаю, посмотрю предложения и&nbsp;решу
              </label>
            </li>

            <li>
              <label className={cn(watch('carSupplier') === '4' && classes.checked)}>
                <div className={cn(watch('carSupplier') === '4' && classes.checked)}>
                  {
                    watch('carSupplier') === '4' &&
                    <svg
                      width='20'
                      height='20'
                      aria-hidden="true"
                    >
                      <use xlinkHref="#checked" />
                    </svg>
                  }

                  <input
                    type='radio'
                    className='visually-hidden'
                    value='4'
                    {...register('carSupplier')}
                  />
                </div>

                Сейчас не&nbsp;ищу поставщика, но&nbsp;прицениваюсь на&nbsp;будущее
              </label>
            </li>

            <li>
              <label className={cn(watch('carSupplier') === '5' && classes.checked)}>
                <div className={cn(watch('carSupplier') === '5' && classes.checked)}>
                  {
                    watch('carSupplier') === '5' &&
                    <svg
                      width='20'
                      height='20'
                      aria-hidden="true"
                    >
                      <use xlinkHref="#checked" />
                    </svg>
                  }

                  <input
                    type='radio'
                    className='visually-hidden'
                    value='5'
                    {...register('carSupplier')}
                  />
                </div>

                Просто смотрю, покупать не&nbsp;планирую
              </label>
            </li>

            <li>
              <label className={cn(watch('carSupplier') === '6' && classes.checked)}>
                <div className={cn(watch('carSupplier') === '6' && classes.checked)}>
                  {
                    watch('carSupplier') === '6' &&
                    <svg
                      width='20'
                      height='20'
                      aria-hidden="true"
                    >
                      <use xlinkHref="#checked" />
                    </svg>
                  }

                  <input
                    type='radio'
                    className='visually-hidden'
                    value='6'
                    {...register('carSupplier')}
                  />
                </div>

                Я перепродаю машины, хочу сравнить цены
              </label>
            </li>
          </ul>
        </div>

        <div className={classes.wrapper}>
          <p className={classes.header}>
            Какие способы оплаты заказа вам подходят?
          </p>

          <ul className={classes.checkboxes}>
            <li>
              <label className={cn(watch('paymentType.1') && classes.checked)}>
                <div className={cn(
                  classes.checkbox,
                  watch('paymentType.1') && classes.checked
                )}>
                  {
                    watch('paymentType.1') &&
                    <svg
                      width='20'
                      height='20'
                      aria-hidden="true"
                    >
                      <use xlinkHref="#v" />
                    </svg>
                  }

                  <input
                    type='checkbox'
                    className='visually-hidden'
                    {...register('paymentType.1')}
                  />
                </div>

                <div>
                  <p>
                    100% предоплата по договору
                  </p>

                  <p className={classes.sublabel}>
                    Больше предложений с лучшей ценой
                  </p>
                </div>
              </label>
            </li>

            <li>
              <label className={cn(watch('paymentType.3') && classes.checked)}>
                <div className={cn(
                  classes.checkbox,
                  watch('paymentType.3') && classes.checked
                )}>
                  {
                    watch('paymentType.3') &&
                    <svg
                      width='20'
                      height='20'
                      aria-hidden="true"
                    >
                      <use xlinkHref="#v" />
                    </svg>
                  }

                  <input
                    type='checkbox'
                    className='visually-hidden'
                    {...register('paymentType.3')}
                  />
                </div>

                <div>
                  <p>
                    30-50% предоплата по договору
                  </p>

                  <p className={classes.sublabel}>
                    Остальное после доставки в РФ
                  </p>
                </div>
              </label>
            </li>

            <li>
              <label className={cn(watch('paymentType.4') && classes.checked)}>
                <div className={cn(
                  classes.checkbox,
                  watch('paymentType.4') && classes.checked
                )}>
                  {
                    watch('paymentType.4') &&
                    <svg
                      width='20'
                      height='20'
                      aria-hidden="true"
                    >
                      <use xlinkHref="#v" />
                    </svg>
                  }

                  <input
                    type='checkbox'
                    className='visually-hidden'
                    {...register('paymentType.4')}
                  />
                </div>

                <div>
                  <p>
                    Покупка в кредит
                  </p>

                  <p className={classes.sublabel}>
                    Оформляется после доставки в РФ
                  </p>
                </div>
              </label>
            </li>

            <li>
              <label className={cn(watch('paymentType.6') && classes.checked)}>
                <div className={cn(
                  classes.checkbox,
                  watch('paymentType.6') && classes.checked
                )}>
                  {
                    watch('paymentType.6') &&
                    <svg
                      width='20'
                      height='20'
                      aria-hidden="true"
                    >
                      <use xlinkHref="#v" />
                    </svg>
                  }

                  <input
                    type='checkbox'
                    className='visually-hidden'
                    {...register('paymentType.6')}
                  />
                </div>

                <div>
                  <p>
                    Покупка в лизинг
                  </p>

                  <p className={classes.sublabel}>
                    Оформляется после доставки в РФ
                  </p>
                </div>
              </label>
            </li>

            <li>
              <label className={cn(watch('paymentType.5') && classes.checked)}>
                <div className={cn(
                  classes.checkbox,
                  watch('paymentType.5') && classes.checked
                )}>
                  {
                    watch('paymentType.5') &&
                    <svg
                      width='20'
                      height='20'
                      aria-hidden="true"
                    >
                      <use xlinkHref="#v" />
                    </svg>
                  }

                  <input
                    type='checkbox'
                    className='visually-hidden'
                    {...register('paymentType.5')}
                  />
                </div>

                <div>
                  <p>
                    Покупка в Trade-In
                  </p>

                  <p className={classes.sublabel}>
                    Потребуется оценка вашего авто
                  </p>
                </div>
              </label>
            </li>
          </ul>

          <button
            type='submit'
            className={classes.saveButton}
          >
            {
              questionsLoadingStatus.isLoading
              ? <LoadingSpinner spinnerType='button' />
              : 'Сохранить'
            }
          </button>
        </div>
      </form>
    );
  }
);
