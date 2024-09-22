import { memo } from "react";
import { Link } from "react-router-dom";
import plural from "plural-ru";
import dayjs from "dayjs";

import { AppRoute } from "../../../app/provider/router";

import classes from "./used-specification-info.module.sass";

type SpecificationInfoProps = {
  info: {
    manufacturer: string;
    model: string;
    specification: string;
    year: number;
    ownersCount: number;
    mileage: number;
    ageDate: string;
  };
};

export const UsedSpecificationInfo = memo(({ info }: SpecificationInfoProps): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.top}>
        <h2 className={classes.header}>
          {info.manufacturer}
          <br />
          {info.model}
        </h2>

        <Link
          aria-label="вернуться назад"
          to={AppRoute.Used}
        >
          Назад
        </Link>
      </div>

      <div className={classes.bottom}>
        <p className={classes.label}>{info.specification}</p>
        <p className={classes.label}>
          {info.year} поколение •{" "}
          {info.ownersCount
            ? plural(info.ownersCount, "%d владелец", "%d владельца", "%d владельцев")
            : "На учет не вставал"}
        </p>
      </div>

      <p className={classes.bottom}>
        Пробег {info.mileage} км • Возраст{" "}
        {`${
          dayjs().diff(dayjs(info.ageDate), "years") === 0
            ? ""
            : plural(dayjs().diff(dayjs(info.ageDate), "years"), "%d год", "%d года", "%d лет")
        } ${(dayjs().diff(dayjs(info.ageDate), "M") % 12) + 1} мес`}
      </p>
    </div>
  );
});
