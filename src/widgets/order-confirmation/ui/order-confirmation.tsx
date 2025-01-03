import { memo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import cn from "classnames";

import { AppRoute } from "../../../app/provider/router";
import { DROPDOWN_CITIES } from "../../../app/settings/cities";
import { getPrices, getTotal } from "../../../features/choose-options";
import { getName } from "../../../entities/manufacturer";
import { getCurrentAd } from "../../../entities/used";
import { getCurrentCity } from "../../../entities/user";
import { getSpecificationParams } from "../../../entities/model";
import { getCurrentSiteMode, SiteModes } from "../../../entities/settings";
import { getCurrency, getCurrencyLoadingStatus, getCurrentCurrency } from "../../../entities/currency";
import {
  getAddedOptions,
  getAddedOptionsPrice,
  getAddItemsPrice,
  getAdds,
  getCurrentColor,
  getCurrentColorPrice,
  getCurrentOrder,
  getCurrentTax,
  getQuestions,
  postAnswers,
  postUsedAnswers,
} from "../../../entities/order";
import {
  getExtColors,
  getIntColors,
  getSpecificationAddColors,
  getSpecificationAddProducts,
  getSpecifications,
} from "../../../entities/specification";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { Modal } from "../../../shared/ui/modal";
import priceFormat from "../../../shared/lib/utils/price-format";

import { Done } from "./done";
import { Colors } from "./colors";
import { Delivery } from "./delivery";
import { Payment } from "./payment";
import { Supplier } from "./supplier";
import { OrderFormType } from "../lib/types";
import { TAX_NAMES, TAX_SUBNAMES } from "../lib/const";
import classes from "./order-confirmation.module.sass";

type OrderConfirmationProps = {
  cancelConfirmation: () => void;
};

export const OrderConfirmation = memo(({ cancelConfirmation }: OrderConfirmationProps) => {
  const extColors = useAppSelector(getExtColors);
  const intColors = useAppSelector(getIntColors);
  const questions = useAppSelector(getQuestions);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [fieldErrors, setFieldErrors] = useState({
    carSupplier: false,
    paymentType: false,
  });
  const methods = useForm<OrderFormType>({
    defaultValues: {
      firstName: "",
      comment: "",
      recommendOtherModels: true,
      withoutCalling: false,
      carSupplier: questions.carSupplier,
      paymentType: questions.paymentType,
      preferredDeliveryTime: {
        maxDays: "45",
        highPricedOption: true,
      },
      colors: {
        external: extColors ? extColors.map((color) => ({ id: color.color.id, value: false })) : [],
        interior: intColors ? intColors.map((color) => ({ id: color.color.id, value: false })) : [],
      },
    },
  });

  const specifications = useAppSelector(getSpecifications);
  const name = useAppSelector((state) => getName(state, Number(searchParams.get("model"))));
  const options = useAppSelector(getAdds);
  const city = useAppSelector(getCurrentCity);
  const adds = useAppSelector(getSpecificationAddProducts);
  // const addItems = useAppSelector(getAddItems);
  const addItemsPrice = useAppSelector(getAddItemsPrice);
  const currency = useAppSelector(getCurrency);
  const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
  const currentCurrency = useAppSelector(getCurrentCurrency);
  const currentTax = useAppSelector(getCurrentTax);
  const mode = useAppSelector(getCurrentSiteMode);
  const specificationName = specifications.find((spec) => spec.id === Number(searchParams.get("spec")))?.name || "";
  const specificationParams = useAppSelector((state) =>
    getSpecificationParams(state, Number(searchParams.get("spec"))),
  );
  const order = useAppSelector(getCurrentOrder);
  const adInfo = useAppSelector(getCurrentAd);
  const addColors = useAppSelector(getSpecificationAddColors);
  const currentColor = useAppSelector(getCurrentColor);
  const addColorPrice = useAppSelector(getCurrentColorPrice);
  const addedOptions = useAppSelector(getAddedOptions);
  const addedOptionsPrice = useAppSelector(getAddedOptionsPrice);

  // popups
  const [isSupplier, setIsSupplier] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isDelivery, setIsDelivery] = useState(false);
  const [isColors, setIsColors] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const isPaymentTypeEmpty = () => {
    return (
      !methods.watch("paymentType.1") &&
      !methods.watch("paymentType.7") &&
      !methods.watch("paymentType.4") &&
      !methods.watch("paymentType.5") &&
      !methods.watch("paymentType.6")
    );
  };

  if (!name || !order || !adds || !currency || currencyLoadingStatus.isLoading) {
    return (
      <div className={classes.wrapper}>
        <LoadingSpinner spinnerType="widget" />
      </div>
    );
  }

  const submitHandler: SubmitHandler<OrderFormType> = (data) => {
    if (!methods.watch("carSupplier")) {
      setFieldErrors((current) => ({ ...current, carSupplier: true }));
    }

    if (isPaymentTypeEmpty()) {
      setFieldErrors((current) => ({ ...current, paymentType: true }));
    }

    if (!methods.watch("carSupplier") || isPaymentTypeEmpty()) {
      return;
    }

    if (mode === SiteModes.New) {
      dispatch(
        postAnswers({
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
              external: currentColor.ext ? [currentColor.ext] : [],
              interior: currentColor.int ? [currentColor.int] : [],
            },
          },
        }),
      ).then(() => {
        setIsDone(true);
      });
    } else {
      dispatch(
        postUsedAnswers({
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
              external: data.colors.external.filter((color) => color.value).map((color) => color.id),
              interior: data.colors.interior.filter((color) => color.value).map((color) => color.id),
            },
          },
        }),
      ).then(() => {
        setIsDone(true);
      });
    }
  };

  const errorHandler: SubmitErrorHandler<OrderFormType> = () => {
    setFieldErrors({
      carSupplier: !methods.getFieldState("carSupplier").isTouched,
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
          <p>Запрос цен отправлен</p>

          <button
            aria-label="вернуться назад"
            onClick={() => {
              setSearchParams({
                model: searchParams.get("model")!,
                spec: searchParams.get("spec")!,
                int: currentColor.int?.toString()!,
                ext: currentColor.ext?.toString()!,
                colorPrice: addColorPrice.toString()!,
                options: addedOptions.join(","),
                optionsPrice: addedOptionsPrice.toString(),
              });
              cancelConfirmation();
            }}
          >
            Назад
          </button>
        </div>

        <div className={cn(classes.subwrapper, classes.data)}>
          <div className={classes.block}>
            <p className={classes.header}>❶ Проверьте данные</p>

            <p className={classes.model}>
              <span>{name.manufacturer}</span>
              <br />
              <span>{name.model}</span>
              <br />
              {specificationName}
            </p>
          </div>

          <div className={classes.block}>
            <p>
              Цена в РФ с растаможиванием:
              <br />
              <b>
                {`${priceFormat(
                  getTotal({
                    totalPrice:
                      getPrices(currentTax, specificationParams?.price || adInfo!.prices) +
                      addColorPrice +
                      addedOptionsPrice +
                      (specificationParams?.price.eptsSbktsUtil || 0),
                    options,
                    optionsPrices: {
                      epts: specificationParams?.price.eptsSbktsUtil || adInfo!.prices.eptsSbktsUtil,
                      guarantee: 0,
                      options: addItemsPrice,
                    },
                    currency,
                    currentCurrency,
                  }),
                )} ${currentCurrency}`}
              </b>
            </p>

            <div className={classes.listWrapper}>
              <span>Включает:</span>
              <ul>
                <li>{TAX_NAMES[currentTax]}</li>

                <li>{TAX_SUBNAMES[currentTax]}</li>

                {options.epts && <li>Получение ЭПТС и СБКТС</li>}

                {currentColor.ext && (
                  <li>
                    Цвет кузова:{" "}
                    {addColors?.groups[0].items.find((color) => color.id == currentColor.ext)?.name.ru ||
                      addColors?.groups[0].items.find((color) => color.id == currentColor.ext)?.name.ch}
                  </li>
                )}

                {currentColor.int && (
                  <li>
                    Цвет кузова:{" "}
                    {addColors?.groups[1].items.find((color) => color.id == currentColor.int)?.name.ru ||
                      addColors?.groups[1].items.find((color) => color.id == currentColor.int)?.name.ch}
                  </li>
                )}

                {options.options && (
                  <li>
                    Доп. товары на автомобиль
                    {/* <ul className={classes.nestedList}>
                      {adds.groups
                        .reduce<AddItemType[]>((acc, group) => {
                          return [...acc, ...group.items];
                        }, [])
                        .filter((item) => {
                          return addItems.includes(item.id);
                        })
                        .map((item) => (
                          <li key={item.id}>
                            <span>{item.fullName}</span>
                          </li>
                        ))}
                    </ul> */}
                  </li>
                )}

                {!!addedOptions.length && <li>Доп. опции на автомобиль</li>}

                {options.guarantee && <li>Гарантия на автомобиль</li>}
              </ul>
            </div>
          </div>

          <div className={classes.block}>
            <p>
              Город доставки авто
              <br />
              <b>{DROPDOWN_CITIES[city].name}</b>
            </p>
          </div>

          <div className={classes.block}>
            <label className={classes.checkboxLabel}>
              <div
                className={cn(
                  classes.checkbox,
                  methods.watch("preferredDeliveryTime.highPricedOption") && classes.checked,
                )}
              >
                {methods.watch("preferredDeliveryTime.highPricedOption") && (
                  <svg
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#v" />
                  </svg>
                )}

                <input
                  type="checkbox"
                  className="visually-hidden"
                  {...methods.register("preferredDeliveryTime.highPricedOption")}
                />
              </div>
              Могу рассмотреть варианты в&nbsp;России с&nbsp;ценой выше
            </label>

            <label className={classes.checkboxLabel}>
              <div className={cn(classes.checkbox, methods.watch("recommendOtherModels") && classes.checked)}>
                {methods.watch("recommendOtherModels") && (
                  <svg
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#v" />
                  </svg>
                )}

                <input
                  type="checkbox"
                  className="visually-hidden"
                  {...methods.register("recommendOtherModels")}
                />
              </div>
              Можно рекомендовать другие модели в&nbsp;этом&nbsp;же диапазоне
            </label>

            <label className={classes.checkboxLabel}>
              <div className={cn(classes.checkbox, methods.watch("withoutCalling") && classes.checked)}>
                {methods.watch("withoutCalling") && (
                  <svg
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#v" />
                  </svg>
                )}

                <input
                  type="checkbox"
                  className="visually-hidden"
                  {...methods.register("withoutCalling")}
                />
              </div>
              Без звонков, связь только через мессенджеры
            </label>
          </div>
        </div>

        <div className={cn(classes.subwrapper, classes.conditions)}>
          <div className={classes.block}>
            <p className={classes.header}>
              ❷ Укажите дополнительную информацию, чтобы получить предложения с&nbsp;максимальной выгодой
            </p>

            <button
              aria-label="готовность к заказу"
              type="button"
              className={cn(
                classes.conditionButton,
                methods.watch("carSupplier") && classes.filled,
                fieldErrors.carSupplier && classes.buttonError,
              )}
              onClick={() => setIsSupplier(true)}
            >
              Готовность к заказу
              {methods.watch("carSupplier") && (
                <svg
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              )}
            </button>

            <button
              aria-label="предпочтительные способы оплаты"
              type="button"
              className={cn(
                classes.conditionButton,
                !isPaymentTypeEmpty() && classes.filled,
                fieldErrors.paymentType && classes.buttonError,
              )}
              onClick={() => setIsPayment(true)}
            >
              Предпочтительные способы оплаты
              {!isPaymentTypeEmpty() && (
                <svg
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              )}
            </button>

            {/* <button
              aria-label="предпочтительный срок покупки"
              type="button"
              className={cn(
                classes.conditionButton,
                methods.getFieldState("preferredDeliveryTime.maxDays").isTouched && classes.filled
              )}
              onClick={() => setIsDelivery(true)}
            >
              Предпочтительный срок поставки
              {methods.getFieldState("preferredDeliveryTime.maxDays").isTouched && (
                <svg
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              )}
            </button>

            {!window.location.pathname.includes("used") && (
              <button
                aria-label="предпочтительные цвета машины"
                type="button"
                className={cn(
                  classes.conditionButton,
                  methods.watch("colors.external").some((color) => color.value) && classes.filled,
                  methods.watch("colors.interior").some((color) => color.value) && classes.filled
                )}
                onClick={() => setIsColors(false)}
                disabled
              >
                Предпочтительные цвета машины
                {(methods.watch("colors.external").some((color) => color.value) ||
                  methods.watch("colors.interior").some((color) => color.value)) && (
                  <svg
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#v" />
                  </svg>
                )}
              </button>
            )} */}
          </div>

          <div className={classes.block}>
            <input
              type="text"
              autoComplete="off"
              placeholder="Ваше имя"
              onInput={() => setFieldErrors((current) => ({ ...current, firstName: false }))}
              {...methods.register("firstName")}
            />

            <textarea
              placeholder="Комментарий к заказу"
              className={classes.textarea}
              {...methods.register("comment")}
            />
          </div>
        </div>

        <div className={cn(classes.subwrapper, classes.confirm)}>
          <button type="submit">Отправить</button>
        </div>

        {isSupplier && (
          <Modal onClose={() => setIsSupplier(false)}>
            <Supplier onClose={() => setIsSupplier(false)} />
          </Modal>
        )}

        {isPayment && (
          <Modal onClose={() => setIsPayment(false)}>
            <Payment onClose={() => setIsPayment(false)} />
          </Modal>
        )}

        {isDelivery && (
          <Modal onClose={() => setIsDelivery(false)}>
            <Delivery onClose={() => setIsDelivery(false)} />
          </Modal>
        )}

        {isColors && (
          <Modal onClose={() => setIsColors(false)}>
            <Colors onClose={() => setIsColors(false)} />
          </Modal>
        )}

        {isDone && (
          <Modal
            onClose={() => {
              navigate(`${AppRoute.MyCars}/${AppRoute.Orders}`);
            }}
          >
            <Done
              onDone={() => {
                navigate(`${mode === SiteModes.New ? "" : AppRoute.Used}${AppRoute.MyCars}/${AppRoute.Orders}`);
              }}
            />
          </Modal>
        )}
      </form>
    </FormProvider>
  );
});
