import { memo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

import { AppRoute } from "../../../app/provider/router";
import { getCurrentSiteMode, SiteModes } from "../../../entities/settings";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";

import { Calculations } from "./calculations";
import { Orders } from "./orders";
import { Favorites } from "./favorites";
import classes from "./mycars.module.sass";

type MycarsProps = {
  folder: "orders" | "favorites" | "calculations";
};

export const Mycars = memo(({ folder }: MycarsProps) => {
  const navigate = useNavigate();
  const mode = useAppSelector(getCurrentSiteMode);
  const isDesktop = useMediaQuery({ query: "(min-width: 721px)" });

  const [currentSort, setCurrentSort] = useState<"increase" | "decrease">("decrease");

  return (
    <div className={classes.wrapper}>
      <div className={classes.bar}>
        <div className={classes.buttonWrapper}>
          <button
            aria-label="заявки"
            className={cn(classes.button, { [classes.buttonActive]: folder === "orders" })}
            onClick={() =>
              navigate(`${mode === SiteModes.New ? "" : AppRoute.Used}${AppRoute.MyCars}/${AppRoute.Orders}`)
            }
          >
            Заявки
          </button>

          <button
            aria-label="расчеты"
            className={cn(classes.button, { [classes.buttonActive]: folder === "calculations" })}
            onClick={() =>
              navigate(`${mode === SiteModes.New ? "" : AppRoute.Used}${AppRoute.MyCars}/${AppRoute.Calculations}`)
            }
          >
            Расчеты
          </button>

          <button
            aria-label="избранное"
            className={cn(classes.button, { [classes.buttonActive]: folder === "favorites" })}
            onClick={() =>
              navigate(`${mode === SiteModes.New ? "" : AppRoute.Used}${AppRoute.MyCars}/${AppRoute.Favorites}`)
            }
          >
            Избранное
          </button>
        </div>

        <button
          aria-label="сортировка"
          className={cn(classes.button, classes.sortButton)}
          onClick={() => setCurrentSort((current) => (current === "increase" ? "decrease" : "increase"))}
        >
          <svg
            width={12}
            height={14}
            aria-hidden="true"
          >
            <use xlinkHref="#sort" />
          </svg>

          {isDesktop && <span>Сортировка</span>}
        </button>
      </div>

      {folder === "orders" && <Orders currentSort={currentSort} />}

      {folder === "calculations" && <Calculations currentSort={currentSort} />}

      {folder === "favorites" && <Favorites currentSort={currentSort} />}
    </div>
  );
});
