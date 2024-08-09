import { memo } from "react";
import { useFormContext } from "react-hook-form";
import cn from "classnames";

import { OrderFormType } from "../lib/types";
import classes from "./payment.module.sass";

type PaymentProps = {
  onClose: () => void;
};

export const Payment = memo(({ onClose }: PaymentProps) => {
  const { register, watch } = useFormContext<OrderFormType>();

  return (
    <div className={classes.wrapper}>
      <div>
        <p className={classes.header}>Выберите предпочтительные способы оплаты заказа авто из&nbsp;Китая</p>

        <p className={classes.subheader}>
          Выбор способа оплаты влияет на&nbsp;цены, условия и&nbsp;количество предложений от&nbsp;партнёров
        </p>
      </div>

      <ul>
        <li>
          <label className={cn(watch("paymentType.1") && classes.checked)}>
            <div className={cn(classes.checkbox, watch("paymentType.1") && classes.checked)}>
              {watch("paymentType.1") && (
                <svg
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              )}

              <input
                type="checkbox"
                className="visually-hidden"
                {...register("paymentType.1")}
              />
            </div>

            <div>
              <p>100% предоплата по договору</p>

              <p className={classes.sublabel}>Больше предложений с лучшей ценой</p>
            </div>
          </label>
        </li>

        <li>
          <label className={cn(watch("paymentType.3") && classes.checked)}>
            <div className={cn(classes.checkbox, watch("paymentType.3") && classes.checked)}>
              {watch("paymentType.3") && (
                <svg
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              )}

              <input
                type="checkbox"
                className="visually-hidden"
                {...register("paymentType.3")}
              />
            </div>

            <div>
              <p>Покупка из наличия</p>

              <p className={classes.sublabel}>Оплата после доставки в РФ</p>
            </div>
          </label>
        </li>

        <li>
          <label className={cn(watch("paymentType.4") && classes.checked)}>
            <div className={cn(classes.checkbox, watch("paymentType.4") && classes.checked)}>
              {watch("paymentType.4") && (
                <svg
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              )}

              <input
                type="checkbox"
                className="visually-hidden"
                {...register("paymentType.4")}
              />
            </div>

            <div>
              <p>Покупка в кредит</p>

              <p className={classes.sublabel}>Оформляется после доставки в РФ</p>
            </div>
          </label>
        </li>

        <li>
          <label className={cn(watch("paymentType.6") && classes.checked)}>
            <div className={cn(classes.checkbox, watch("paymentType.6") && classes.checked)}>
              {watch("paymentType.6") && (
                <svg
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              )}

              <input
                type="checkbox"
                className="visually-hidden"
                {...register("paymentType.6")}
              />
            </div>

            <div>
              <p>Покупка в лизинг</p>

              <p className={classes.sublabel}>Оформляется после доставки в РФ</p>
            </div>
          </label>
        </li>

        <li>
          <label className={cn(watch("paymentType.5") && classes.checked)}>
            <div className={cn(classes.checkbox, watch("paymentType.5") && classes.checked)}>
              {watch("paymentType.5") && (
                <svg
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              )}

              <input
                type="checkbox"
                className="visually-hidden"
                {...register("paymentType.5")}
              />
            </div>

            <div>
              <p>Покупка в Trade-In</p>

              <p className={classes.sublabel}>Потребуется оценка вашего авто</p>
            </div>
          </label>
        </li>
      </ul>

      <button
        aria-label="сохранить"
        className={classes.saveButton}
        onClick={onClose}
      >
        Сохранить
      </button>
    </div>
  );
});
