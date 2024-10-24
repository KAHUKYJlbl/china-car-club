import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { DropdownBlocks } from "../../../shared/ui/dropdown";
import { getCurrency, getCurrencyLoadingStatus } from "../../../entities/currency";
import {
  fetchSpecifications,
  getCheapestSpecification,
  // getPrice,
  getSpecifications,
  getSpecificationsLoadingStatus,
} from "../../../entities/specification";

import { FilterId } from "../../filter";
import classes from "./choose-specification.module.sass";
// import priceFormat from "../../../shared/lib/utils/price-format";

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
    const specifications = useAppSelector(getSpecifications);
    const cheapest = useAppSelector(getCheapestSpecification);
    const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);

    // const priceData = useAppSelector((state) => getPrice(state, currentSpecification));
    const currency = useAppSelector(getCurrency);
    const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);

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

    if (specificationsLoadingStatus.isLoading || currencyLoadingStatus.isLoading || !currency) {
      return (
        <div className={cn(classes.wrapper, classes.center)}>
          <LoadingSpinner spinnerType="widget" />
        </div>
      );
    }

    return (
      <div className={classes.wrapper}>
        {currentModel ? (
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
                Внедорожник • Гибрид REV • Мощность 365 кВт / 496 л.с. • Двигатель 1.5 л • Полный привод •
                Автоматическая трансмиссия • Разгон 4,3 сек • 5 мест • Запас хода 230 км • Клиренс 120 мм
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
              <div className={cn(classes.option, classes.active)}>
                <div>
                  <span className={classes.big}>Цвет кузова и салона</span>
                  <span className={cn(classes.grey, classes.small)}>Выбрано: 1</span>
                </div>
                <p
                  className={classes.grey}
                  onClick={colorsCallback}
                >
                  Изменить
                </p>
              </div>

              <div className={classes.option}>
                <div>
                  <span className={classes.big}>Доп опции комплектации</span>
                  <span className={cn(classes.grey, classes.small)}>Не выбрано</span>
                </div>
                <p
                  className={classes.grey}
                  onClick={optionsCallback}
                >
                  Изменить
                </p>
              </div>
            </div>

            <div className={classes.price}>
              <p>
                <span className={cn(classes.big, classes.bold)}>
                  Цена под заказ в РФ
                  <br />в городе доставки
                </span>
                <span className={cn(classes.big, classes.bold)}>217 930 858 ₽</span>
              </p>
              <div>
                <button>О цене и оплате</button>
                <button>RUB</button>
              </div>
            </div>
          </>
        ) : (
          <p className={classes.xBig}>
            ❶ Выберите марку и&nbsp;модель автомобиля&nbsp;—{" "}
            <span className={classes.grey}>покажем цену в&nbsp;Китае на&nbsp;текущий день</span>
          </p>
        )}
      </div>
    );
  }
);
