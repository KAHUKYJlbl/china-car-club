import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { DropdownBlocks } from "../../../shared/ui/dropdown";
import priceFormat from "../../../shared/lib/utils/price-format";
import { Modal } from "../../../shared/ui/modal";
import {
  Currencies,
  getCurrency,
  getCurrencyExchange,
  getCurrencyLoadingStatus,
  getCurrencyName,
  getCurrentCurrency,
  setCurrentCurrency,
} from "../../../entities/currency";
import {
  fetchSpecifications,
  getCheapestSpecification,
  getSpecificationAddOptions,
  getSpecifications,
  getSpecificationsLoadingStatus,
} from "../../../entities/specification";
import { getAddedOptions, getAddedOptionsPrice, getCurrentColor, getCurrentColorPrice } from "../../../entities/order";
import { getShorts, getSpecificationParams } from "../../../entities/model";

import { FilterId } from "../../filter";
import { AboutPrice } from "./about-price";
import classes from "./choose-specification.module.sass";

type ChooseSpecificationProps = {
  isPromo: boolean;
  currentManufacturer: number | null;
  currentModel: number | null;
  currentSpecification: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
  activeFilters: Partial<Record<FilterId, number[]>>;
  colorsCallback: () => void;
  optionsCallback: () => void;
};

export const ChooseSpecification = memo(
  ({
    isPromo,
    currentManufacturer,
    currentModel,
    currentSpecification,
    setCurrentSpecification,
    activeFilters,
    colorsCallback,
    optionsCallback,
  }: ChooseSpecificationProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const [isAboutPrices, setIsAboutPrices] = useState(false);

    const specifications = useAppSelector(getSpecifications);
    const cheapest = useAppSelector(getCheapestSpecification);
    const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
    const currency = useAppSelector(getCurrency);
    const currentCurrency = useAppSelector(getCurrentCurrency);
    const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
    const shorts = useAppSelector((state) => getShorts(state, currentSpecification));
    const specificationParams = useAppSelector((state) => getSpecificationParams(state, currentSpecification));
    const addedOptions = useAppSelector(getAddedOptions);
    const currentColor = useAppSelector(getCurrentColor);
    const addOptions = useAppSelector(getSpecificationAddOptions);
    const addedOptionsPrice = useAppSelector(getAddedOptionsPrice);
    const addColorPrice = useAppSelector(getCurrentColorPrice);

    useEffect(() => {
      if (currentModel && currentManufacturer) {
        dispatch(
          fetchSpecifications({
            manufacturerId: currentManufacturer,
            modelId: currentModel,
            filters: activeFilters,
          })
        );
      }
    }, [currentModel]);

    useEffect(() => {
      if (specifications && specifications.length !== 0 && !isPromo) {
        setCurrentSpecification(cheapest?.id);
      }
    }, [cheapest?.id]);

    const toggleCurrency = () => {
      switch (currentCurrency) {
        case Currencies.RUB:
          dispatch(setCurrentCurrency(Currencies.USD));
          break;
        case Currencies.USD:
          dispatch(setCurrentCurrency(Currencies.CNY));
          break;
        case Currencies.CNY:
          dispatch(setCurrentCurrency(Currencies.RUB));
          break;
      }
    };

    if (specificationsLoadingStatus.isLoading || currencyLoadingStatus.isLoading || !currency) {
      return (
        <div className={cn(classes.wrapper, classes.center)}>
          <LoadingSpinner spinnerType="widget" />
        </div>
      );
    }

    return (
      <div className={cn(classes.wrapper, specificationParams && classes.light)}>
        {currentModel && shorts && specificationParams ? (
          <>
            <div className={classes.specification}>
              <DropdownBlocks
                currentElement={currentSpecification}
                setCurrent={setCurrentSpecification}
                placeholder="Комплектация"
                list={specifications}
                disabled={specificationsLoadingStatus.isLoading}
                isYear
              />

              <p>
                {Object.values(shorts)
                  .filter((value) => !!value)
                  .join(" • ")}
              </p>

              <Link
                className={classes.button}
                to={`https://spec.chinacar.club/compare.php?specid=${currentSpecification}`}
                target="_blank"
              >
                Сравнить комплектации
              </Link>
            </div>

            <div className={classes.optionsWrapper}>
              <div
                className={cn(classes.option, currentColor.ext && classes.active)}
                onClick={colorsCallback}
              >
                <div>
                  <span className={classes.big}>Цвет кузова и салона</span>
                  <span className={cn(classes.grey, classes.small)}>
                    {currentColor.ext ? "Выбрано: 2" : "Не выбрано"}
                  </span>
                </div>
                <p
                  className={classes.grey}
                  onClick={colorsCallback}
                >
                  Изменить
                </p>
              </div>

              <div
                className={cn(
                  classes.option,
                  addedOptions.length && classes.active,
                  !addOptions?.options.length && classes.disabled
                )}
                onClick={addOptions?.options.length ? optionsCallback : undefined}
              >
                <div>
                  <span className={classes.big}>Доп опции комплектации</span>
                  <span className={cn(classes.grey, classes.small)}>
                    {addedOptions.length ? `Выбрано: ${addedOptions.length}` : "Не выбрано"}
                  </span>
                </div>
                <p className={classes.grey}>Изменить</p>
              </div>
            </div>

            <div className={classes.price}>
              <p>
                <span className={cn(classes.bold)}>Цена в РФ без растаможивания</span>
                <span className={cn(classes.bold)}>
                  {priceFormat(
                    getCurrencyExchange(
                      specificationParams.price.priceInCityOfReceipt + addColorPrice + addedOptionsPrice,
                      currentCurrency,
                      currency
                    )
                  )}{" "}
                  {currentCurrency}
                </span>
              </p>

              <div>
                <button
                  aria-label="подробнее о налогах"
                  onClick={() => setIsAboutPrices(true)}
                >
                  О цене и оплате
                </button>

                <button
                  aria-label={getCurrencyName(currentCurrency)}
                  className={classes.buttonWhite}
                  onClick={toggleCurrency}
                >
                  {getCurrencyName(currentCurrency)}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className={cn(classes.xBig, classes.paragraph)}>
              ❶ Выберите марку и&nbsp;модель автомобиля&nbsp;—
              <span className={classes.grey}>покажем комплектации доступные для&nbsp;заказа из&nbsp;Китая</span>
            </p>
            <p className={classes.paragraph}>По&nbsp;прямому контракту и&nbsp;курсу продажи валюты</p>
          </>
        )}

        {isAboutPrices && (
          <Modal
            onClose={() => setIsAboutPrices(false)}
            button
            width
          >
            <AboutPrice />
          </Modal>
        )}
      </div>
    );
  }
);
