import { useEffect } from "react";
import { useForm } from "react-hook-form";
import cn from "classnames";

import { CurrentColorType } from "../../../widgets/model-info";
import priceFormat from "../../../shared/lib/utils/price-format";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { getSpecificationAddColors } from "../../../entities/specification";
import { getCurrentColor, setAddColorPrice, setCurrentColor } from "../../../entities/order";
import { Currencies, getCurrency, getCurrencyExchange } from "../../../entities/currency";

import classes from "./specification-colors.module.sass";

type SpecificationColorsProps = {
  currentSpecification?: number | null;
};

export const SpecificationColors = ({}: SpecificationColorsProps) => {
  const dispatch = useAppDispatch();
  const addColors = useAppSelector(getSpecificationAddColors);
  const currentColor = useAppSelector(getCurrentColor);
  const currency = useAppSelector(getCurrency);

  const { register, watch } = useForm<CurrentColorType>({
    defaultValues: {
      int: currentColor.int || null,
      ext: currentColor.ext || null,
      isInteriorFirst: false,
    },
  });

  if (!addColors || !currency) {
    return (
      <div className={classes.wrapper}>
        <LoadingSpinner spinnerType="widget" />
      </div>
    );
  }

  useEffect(() => {
    dispatch(setCurrentColor({ int: Number(watch("int")), ext: Number(watch("ext")), isInteriorFirst: false }));
    dispatch(
      setAddColorPrice(
        (addColors.groups[0].items.find((color) => color.id == watch("ext"))?.price || 0) +
          (addColors.groups[1].items.find((color) => color.id == watch("int"))?.price || 0)
      )
    );
  }, [watch("int"), watch("ext")]);

  return (
    <>
      <div className={classes.wrapper}>
        <h3 className={cn(classes.header, classes.bold)}>
          Выберите предпочтительные
          <br />
          цвета кузова и салона
        </h3>

        <p>Показаны только те цвета, которые доступны для вашего автомобиля и комплектации</p>
      </div>

      <div className={classes.wrapper}>
        <p className={classes.header}>Доступные цвета кузова:</p>
        <ul className={classes.radio}>
          {addColors.groups[0].items.map((color) => (
            <li key={color.id}>
              <label className={cn(watch("ext") == color.id && classes.checked)}>
                <div className={cn(classes.checkbox, watch("ext") == color.id && classes.checked)}>
                  {watch("ext") == color.id && (
                    <svg
                      width="20"
                      height="20"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#checked" />
                    </svg>
                  )}

                  <input
                    type="radio"
                    className="visually-hidden"
                    value={color.id}
                    {...register("ext")}
                  />
                </div>

                <div className={classes.colorInfo}>
                  <p className={classes.colorName}>{color.name.ru || color.name.ch}</p>
                  <div className={classes.color}>
                    <div style={{ backgroundColor: `#${color.hexList[0]}` }}></div>
                    <div
                      style={{ backgroundColor: color.hexList[1] ? `#${color.hexList[1]}` : `#${color.hexList[0]}` }}
                    ></div>
                  </div>
                  <p className={classes.colorPrice}>
                    {color.price
                      ? `${priceFormat(getCurrencyExchange(color.price, Currencies.CNY, currency))} ${
                          Currencies.CNY
                        } • ${priceFormat(getCurrencyExchange(color.price, Currencies.RUB, currency))} ${
                          Currencies.RUB
                        }`
                      : "Бесплатно"}
                  </p>
                </div>

                <img
                  src={`${process.env.STATIC_URL || `${window.location.origin}/storage`}${color.imageUrl}`}
                  alt="Car"
                  width="60"
                  height="60"
                />
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className={classes.wrapper}>
        <p className={classes.subheader}>Доступные цвета салона:</p>
        <ul className={classes.radio}>
          {addColors.groups[1].items.map((color) => (
            <li key={color.id}>
              <label className={cn(watch("int") == color.id && classes.checked)}>
                <div className={cn(classes.checkbox, watch("int") == color.id && classes.checked)}>
                  {watch("int") == color.id && (
                    <svg
                      width="20"
                      height="20"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#checked" />
                    </svg>
                  )}

                  <input
                    type="radio"
                    className="visually-hidden"
                    value={color.id}
                    {...register("int")}
                  />
                </div>

                <div className={classes.colorInfo}>
                  <p className={classes.colorName}>{color.name.ru || color.name.ch}</p>
                  <div className={classes.color}>
                    <div style={{ backgroundColor: `#${color.hexList[0]}` }}></div>
                    <div
                      style={{ backgroundColor: color.hexList[1] ? `#${color.hexList[1]}` : `#${color.hexList[0]}` }}
                    ></div>
                  </div>
                  <p className={classes.colorPrice}>
                    {color.price
                      ? `${priceFormat(getCurrencyExchange(color.price, Currencies.CNY, currency))} ${
                          Currencies.CNY
                        } • ${priceFormat(getCurrencyExchange(color.price, Currencies.RUB, currency))} ${
                          Currencies.RUB
                        }`
                      : "Бесплатно"}
                  </p>
                </div>

                <img
                  src={`${process.env.STATIC_URL || `${window.location.origin}/storage`}${color.imageUrl}`}
                  alt="Car"
                  width="60"
                  height="60"
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
