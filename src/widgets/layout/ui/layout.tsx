import { PropsWithChildren, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import RussianNounsJS from "russian-nouns-js";

import { CITIES } from "../../../app/settings/cities";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { SvgSprite } from "../../../shared/ui/svg-sprite";
import { getName } from "../../../entities/manufacturer";
import { getCurrentCity } from "../../../entities/user";
import { fetchSettings, getIsNew, getPalette, getSettingsLoadingStatus } from "../../../entities/settings";

import { NewHeader } from "./new-header";
import classes from "./layout.module.sass";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { fetchCurrency, getCurrencyLoadingStatus } from "../../../entities/currency";

type LayoutProps = {
  title?: string;
  isMycars?: boolean;
  heading: {
    heading: string;
    subheading: string | null;
  };
};

export const Layout = ({ title, children, isMycars }: PropsWithChildren<LayoutProps>): JSX.Element => {
  const dispatch = useAppDispatch();
  const rne = new RussianNounsJS.Engine();

  const [searchParams, _setSearchParams] = useSearchParams();

  const city = useAppSelector(getCurrentCity);
  const isNew = useAppSelector(getIsNew);
  const palette = useAppSelector(getPalette);
  const name = useAppSelector((state) => getName(state, Number(searchParams.get("model"))));
  const settingsLoadingstatus = useAppSelector(getSettingsLoadingStatus);
  const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);

  useEffect(() => {
    if (settingsLoadingstatus.isIdle) {
      dispatch(fetchSettings());
    }
  }, []);

  useEffect(() => {
    if (currencyLoadingStatus.isIdle) {
      dispatch(fetchCurrency());
    }
  }, []);

  useEffect(() => {
    if (palette) {
      document.body.style.setProperty("--theme-accent", `#${palette.accent}`);
    }
  }, [settingsLoadingstatus.isSuccess]);

  if (settingsLoadingstatus.isLoading) {
    return <LoadingSpinner spinnerType="page" />;
  }

  return (
    <div
      className={classes.wrapper}
      id="layout"
    >
      <Helmet>
        <title>
          {title ||
            `Купить ${
              name
                ? `${name.manufacturer}\u00A0${name.model}`
                : `${isNew ? "новый автомобиль" : "автомобиль с пробегом"}`
            } из\u00A0Китая по\u00A0лучшей цене`}
        </title>
        <meta
          name="description"
          content="Заказать новый авто из Китая по выгодной цене. Быстрый онлайн расчёт под ключ. По цене завода и с пожизненной поддержкой запчастями."
        />
      </Helmet>

      <SvgSprite />

      <NewHeader isMycars={isMycars} />

      <div className={classes.headingWrapper}>
        <h1 className={classes.heading}>
          {`Купить ${
            name
              ? `${name.manufacturer}\u00A0${name.model}${isNew ? "" : " с пробегом"}`
              : `${isNew ? "новый автомобиль" : "автомобиль с пробегом"}`
          } из\u00A0Китая по\u00A0лучшей цене в\u00A0${rne.decline(
            { text: CITIES[city], gender: "женский" },
            "винительный"
          )}`}
        </h1>

        {/* {heading.subheading && <p className={classes.subheading}>{heading.subheading}</p>} */}
      </div>

      {children}
    </div>
  );
};
