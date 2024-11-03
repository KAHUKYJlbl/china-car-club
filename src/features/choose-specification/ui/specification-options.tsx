import cn from "classnames";

import {
  getSpecificationAddOptions,
  getSpecifications,
  getSpecificationsLoadingStatus,
} from "../../../entities/specification";
import { getUsedShorts } from "../../../entities/used";
import { getShorts, SpecsType } from "../../../entities/model";
import { Currencies, getCurrency, getCurrencyExchange } from "../../../entities/currency";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { DropdownBlocks } from "../../../shared/ui/dropdown";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import priceFormat from "../../../shared/lib/utils/price-format";

import classes from "./specification-options.module.sass";
import {
  addOption,
  decreaseOptionsPrice,
  getAddedOptions,
  increaseOptionsPrice,
  removeOption,
} from "../../../entities/order";

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
  const shorts = currentSpecification
    ? useAppSelector((state) => getShorts(state, currentSpecification))
    : useAppSelector(getUsedShorts);
  const specifications = useAppSelector(getSpecifications);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
  const addOptions = useAppSelector(getSpecificationAddOptions);
  const addedOptions = useAppSelector(getAddedOptions);
  const currency = useAppSelector(getCurrency);

  if (!addOptions || !currency) {
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
          Aito (Hima)
          <br />
          M5
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
        {addOptions.options.map((option) => (
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
        ))}
      </div>
    </>
  );
};
