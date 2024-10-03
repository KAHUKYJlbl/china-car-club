import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import plural from "plural-ru";

import { DROPDOWN_CITIES } from "../../../app/settings/cities";
import { AppRoute } from "../../../app/provider/router";
import { fetchManufacturers, getFullListCount, getManufacturersLoadingStatus } from "../../../entities/manufacturer";
import { getCurrentCity, NewHeaderUser, setCity } from "../../../entities/user";
import { ChooseSiteMode, getIsNew, getLogo, getPhone, getSettingsLoadingStatus } from "../../../entities/settings";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { DropdownHeader } from "../../../shared/ui/dropdown";

import classes from "./new-header.module.sass";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";

type NewHeaderProps = {
  isUsedSwitch?: boolean;
  isCitySwitch?: boolean;
};

export const NewHeader = ({ isUsedSwitch = false, isCitySwitch = false }: NewHeaderProps) => {
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ query: "(min-width: 961px)" });

  const city = useAppSelector(getCurrentCity);
  const carsCount = useAppSelector(getFullListCount);
  const phone = useAppSelector(getPhone);
  const logo = useAppSelector(getLogo);
  const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
  const settingsLoadingstatus = useAppSelector(getSettingsLoadingStatus);
  const isNew = useAppSelector(getIsNew);

  useEffect(() => {
    if (manufacturersLoadingStatus.isIdle) {
      dispatch(fetchManufacturers());
    }
  }, []);

  const setCityHandler = (id: number) => {
    dispatch(setCity(id));
  };

  if (settingsLoadingstatus.isIdle || settingsLoadingstatus.isLoading) {
    return <LoadingSpinner spinnerType="widget" />;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.links}>
        <p className={classes.count}>
          {plural(carsCount.manufacturersCount, "%d марка", "%d марки", "%d марок")}
          &#32;и {plural(carsCount.seriesCount, "%d модель", "%d модели", "%d моделей")}
          &#32;под заказ из Китая
        </p>

        <p>
          <span>Бесплатно по России: </span>
          <Link
            aria-label="позвонить нам"
            to={`tel:+${phone}`}
            className={classes.phone}
          >
            {`+${phone[0]} ${phone.substring(1, 4)} ${phone.substring(4, 7)} ${phone.substring(7, 9)} ${phone.substring(
              9
            )}`}
          </Link>
        </p>
      </div>

      <div className={classes.mainWrapper}>
        <div className={classes.logo}>
          <Link
            aria-label="на главную"
            to={isNew ? AppRoute.Main : AppRoute.Used}
          >
            <img
              src={`${process.env.STATIC_URL || `${window.location.origin}/storage`}${logo.storageUrl}`}
              width={isDesktop ? logo.width : (logo.width / 3) * 2}
              height={isDesktop ? 36 : 24}
              aria-hidden="true"
            ></img>
          </Link>

          {isDesktop && isUsedSwitch && <ChooseSiteMode />}

          {isDesktop && isCitySwitch && (
            <DropdownHeader
              currentElement={city}
              setCurrent={setCityHandler}
              list={DROPDOWN_CITIES}
              placeholder="Город доставки авто"
            />
          )}
        </div>

        <NewHeaderUser />
      </div>
    </div>
  );
};
