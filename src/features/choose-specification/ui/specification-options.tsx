import cn from "classnames";
import { useSearchParams } from "react-router-dom";

import {
  getSpecificationAddOptions,
  getSpecifications,
  getSpecificationsLoadingStatus,
} from "../../../entities/specification";
import {
  addOption,
  decreaseOptionsPrice,
  getAddedOptions,
  increaseOptionsPrice,
  removeOption,
} from "../../../entities/order";
import { getUsedShorts } from "../../../entities/used";
import { getName } from "../../../entities/manufacturer";
import { getShorts, SpecsType } from "../../../entities/model";
import { Currencies, getCurrency, getCurrencyExchange } from "../../../entities/currency";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { DropdownBlocks } from "../../../shared/ui/dropdown";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import priceFormat from "../../../shared/lib/utils/price-format";

import classes from "./specification-options.module.sass";

type SpecificationOptionsProps = {
  currentSpecification?: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
  techs?: SpecsType;
};

export const SpecificationOptions = ({
  currentSpecification,
  setCurrentSpecification,
  techs,
}: SpecificationOptionsProps) => {
  const dispatch = useAppDispatch();
  const [searchParams, _setSearchParams] = useSearchParams();
  const shorts = currentSpecification
    ? useAppSelector((state) => getShorts(state, currentSpecification))
    : useAppSelector(getUsedShorts);
  const specifications = useAppSelector(getSpecifications);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
  const addOptions = useAppSelector(getSpecificationAddOptions);
  const addedOptions = useAppSelector(getAddedOptions);
  const currency = useAppSelector(getCurrency);
  const name = useAppSelector((state) => getName(state, Number(searchParams.get("model"))));

  if (!addOptions || !currency || !name) {
    return (
      <div className={classes.wrapper}>
        <LoadingSpinner spinnerType="widget" />
      </div>
    );
  }

  const addItemHandler = (item: number) => {
    if (addedOptions.includes(item)) {
      dispatch(removeOption(item));
      dispatch(decreaseOptionsPrice(addOptions.options.find((option) => option.id === item)!.price));
      return;
    }
    dispatch(addOption(item));
    dispatch(increaseOptionsPrice(addOptions.options.find((option) => option.id === item)!.price));
  };

  return (
    <>
      <div className={classes.wrapper}>
        <h3 className={classes.header}>Дополнительные опции</h3>

        <p className={classes.model}>
          <span>Автомобиль:</span>
          <br />
          {name.manufacturer}
          <br />
          {name.model}
        </p>

        {currentSpecification && (
          <DropdownBlocks
            currentElement={currentSpecification}
            setCurrent={setCurrentSpecification}
            placeholder="Комплектация"
            list={specifications}
            disabled={specificationsLoadingStatus.isLoading}
          />
        )}

        {!!techs && (
          <div className={classes.modelSpec}>
            <div className={cn(classes.row, classes.grey)}>
              <p>Двигатель:</p>
              <p>{shorts?.engineType}</p>
            </div>

            <div className={cn(classes.row, classes.grey)}>
              <p>Количество мест:</p>
              <p>{techs.seats}</p>
            </div>

            <div className={cn(classes.row, classes.grey)}>
              <p>Передние колеса:</p>
              <p>{techs.frontWheel}</p>
            </div>

            <div className={cn(classes.row, classes.grey)}>
              <p>Задние колеса:</p>
              <p>{techs.rearWheel}</p>
            </div>
          </div>
        )}
      </div>

      <div className={classes.wrapper}>
        {!!addOptions.options.length ? (
          addOptions.options.map((option) => (
            <div
              className={classes.option}
              key={option.id}
            >
              <p className={classes.optionHeader}>{option.name.ru || option.name.ch}</p>
              <p className={classes.optionDescription}>{option.description}</p>
              <div className={classes.price}>
                <p>
                  {option.price
                    ? `${priceFormat(getCurrencyExchange(option.price, Currencies.CNY, currency))} ${
                        Currencies.CNY
                      } • ${priceFormat(getCurrencyExchange(option.price, Currencies.RUB, currency))} ${Currencies.RUB}`
                    : "Бесплатно"}
                </p>
                <button
                  className={cn(addedOptions.includes(option.id) && classes.added)}
                  onClick={() => addItemHandler(option.id)}
                >
                  {addedOptions.includes(option.id) ? "Удалить" : "Добавить"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={classes.empty}>
            Для выбранной комплектации
            <br />
            сейчас нет платных опций
          </p>
        )}
      </div>
    </>
  );
};
