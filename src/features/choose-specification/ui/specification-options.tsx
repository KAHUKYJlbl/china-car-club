import { getSpecifications, getSpecificationsLoadingStatus } from "../../../entities/specification";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { DropdownBlocks } from "../../../shared/ui/dropdown";

import classes from "./specification-options.module.sass";

type SpecificationOptionsProps = {
  currentSpecification?: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
};

export const SpecificationOptions = ({ currentSpecification, setCurrentSpecification }: SpecificationOptionsProps) => {
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
