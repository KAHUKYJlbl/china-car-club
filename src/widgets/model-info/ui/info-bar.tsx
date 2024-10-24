import { memo } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { getShorts } from "../../../entities/model";
import { getUsedShorts } from "../../../entities/used";

import classes from "./info-bar.module.sass";

type InfoBarProps = {
  currentSpecification?: number | null;
  setIsTechs: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPriceHistory: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InfoBar = memo(({ currentSpecification, setIsTechs, setIsPriceHistory }: InfoBarProps): JSX.Element => {
  const shorts = currentSpecification
    ? useAppSelector((state) => getShorts(state, currentSpecification))
    : useAppSelector(getUsedShorts);

  if (!shorts) {
    return <div>Loading ...</div>;
  }

  return (
    <div className={classes.wrapper}>
      <p className={classes.specs}>
        {Object.values(shorts)
          .filter((value) => !!value)
          .join(" • ")}
      </p>

      <div className={classes.row}>
        <button
          aria-label="характеристики"
          className={classes.button}
          onClick={() => setIsTechs((current) => !current)}
        >
          Характеристики
        </button>

        <Link
          aria-label="Сравнить комплектации"
          className={classes.button}
          to={`https://spec.chinacar.club/compare.php?specid=${currentSpecification}`}
          target="_blank"
        >
          Сравнить комплектации
        </Link>

        {!window.location.pathname.includes("used") && (
          <button
            aria-label="история цены"
            className={classes.button}
            onClick={() => setIsPriceHistory((current) => !current)}
          >
            История цены
          </button>
        )}

        <button
          aria-label="следить за скидками"
          className={classes.button}
        >
          Следить за скидками
        </button>
      </div>
    </div>
  );
});
