import cn from "classnames";

import { getShorts, SpecsType } from "../../../entities/model";
import { getSpecifications, getSpecificationsLoadingStatus } from "../../../entities/specification";
import { getUsedShorts } from "../../../entities/used";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { DropdownBlocks } from "../../../shared/ui/dropdown";

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
  const shorts = currentSpecification
    ? useAppSelector((state) => getShorts(state, currentSpecification))
    : useAppSelector(getUsedShorts);
  const specifications = useAppSelector(getSpecifications);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);

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
            isPrices
          />
        )}

        {!!techs && (
          <div>
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
        <div className={classes.option}>
          <p className={classes.optionHeader}>Автомобильный держатель для телефона</p>
          <p className={classes.optionDescription}>
            Автомобильный держатель для мобильного телефона $99, автомобильный держатель для мобильного телефона с
            беспроводной зарядкой
          </p>
          <div className={classes.price}>
            <p>149 ¥ • 2041 ₽</p>
            <button>Добавить</button>
          </div>
        </div>
      </div>
    </>
  );
};
