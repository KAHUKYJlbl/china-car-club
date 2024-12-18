import { memo } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";

import { AppRoute } from "../../../app/provider/router";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { DropdownBlocks } from "../../../shared/ui/dropdown";
import {
  getSpecificationImgLoadingStatus,
  getSpecifications,
  getSpecificationsLoadingStatus,
} from "../../../entities/specification";
import { SpecsType } from "../../../entities/model";
import { getName } from "../../../entities/manufacturer";
import { getCompareSpec } from "../../../entities/settings";

import { Statuses } from "../lib/const";
import getTechList from "../lib/utils/get-tech-list";
import classes from "./techs.module.sass";

type TechsProps = {
  techs: SpecsType;
  currentSpecification?: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
};

export const Techs = memo(({ techs, currentSpecification, setCurrentSpecification }: TechsProps): JSX.Element => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const specifications = useAppSelector(getSpecifications);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
  const specificationImgLoadingStatus = useAppSelector(getSpecificationImgLoadingStatus);
  const name = useAppSelector((state) => getName(state, Number(searchParams.get("model"))));
  const compareSpec = useAppSelector(getCompareSpec);

  const techsList = getTechList(techs);

  if (!techsList) {
    return <Navigate to={AppRoute.Main} />;
  }

  if (specificationImgLoadingStatus.isLoading || !name) {
    return (
      <div className={classes.wrapper}>
        <LoadingSpinner spinnerType="widget" />
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.block}>
        <h3 className={classes.header}>Характеристики</h3>

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
            isPrices
          />
        )}

        <div className={classes.row}>
          <p>Статус в Китае:</p>

          <p>{Statuses[techs.stateId]}</p>
        </div>
      </div>

      <div className={classes.block}>
        <ul className={classes.techsList}>
          {techsList.map((tech) => (
            <li
              className={classes.row}
              key={tech.name}
            >
              <p>{tech.name}</p>
              <p>{`${tech.value} ${tech.measure}`}</p>
            </li>
          ))}
        </ul>
      </div>

      <Link
        aria-label="Сравнить комплектации"
        className={classes.button}
        to={`${compareSpec}/compare.php?specid=${currentSpecification}`}
        target="_blank"
      >
        Сравнить комплектации
      </Link>

      {/* {extColors && extColors[0].color && (
        <div className={classes.block}>
          <p>Доступные цвета кузова</p>

          <ul className={classes.techsList}>
            {extColors.map((color) => (
              <li
                className={classes.row}
                key={color.color.id}
              >
                <div>{color.color.name.ru || color.color.name.ch}</div>

                <div className={classes.colors}>
                  <div
                    className={classes.color}
                    style={{ backgroundColor: `#${color.color.hexList[0]}` }}
                  />

                  <div
                    className={classes.color}
                    style={{ backgroundColor: `#${color.color.hexList[1] || color.color.hexList[0]}` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {intColors && intColors[0].color && (
        <div className={classes.block}>
          <p>Доступные цвета салона</p>

          <ul className={classes.techsList}>
            {intColors.map((color) => (
              <li
                className={classes.row}
                key={color.color.id}
              >
                <div>{color.color.name.ru || color.color.name.ch}</div>

                <div className={classes.colors}>
                  <div
                    className={classes.color}
                    style={{ backgroundColor: `#${color.color.hexList[0]}` }}
                  />

                  <div
                    className={classes.color}
                    style={{ backgroundColor: `#${color.color.hexList[1] || color.color.hexList[0]}` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
});
