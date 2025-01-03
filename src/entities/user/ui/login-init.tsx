import cn from "classnames";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { getBotName, getDealerName } from "../../settings";

import { getUser, getUserLoadingStatus } from "../model/user-selectors";
import { LoginModeType } from "../lib/types";
import classes from "./login-init.module.sass";

type LoginInitProps = {
  setMode: (mode: LoginModeType) => void;
};

export const LoginInit = ({ setMode }: LoginInitProps) => {
  const user = useAppSelector(getUser);
  const userLoadingStatus = useAppSelector(getUserLoadingStatus);
  const dealerName = useAppSelector(getDealerName);
  const bot = useAppSelector(getBotName);

  if (userLoadingStatus.isLoading || !user) {
    return <LoadingSpinner spinnerType="widget" />;
  }

  return (
    <>
      <div className={classes.wrapper}>
        <div>
          <p className={classes.header}>{`Вход в ${dealerName}`}</p>

          <p>
            Чтобы мгновенно считать стоимость доставки и&nbsp;растаможки автомобилей из&nbsp;Китая, добавлять
            в&nbsp;Избранное, запрашивать скидки на&nbsp;автомобиль и&nbsp;выбирать лучшее предложение.
          </p>
        </div>

        <div className={classes.main}>
          <button
            aria-label="войти по номеру телефона"
            className={classes.button}
            onClick={() => setMode("phone")}
          >
            Войти по номеру телефона
          </button>

          <p className={classes.grey}>или</p>

          <Link
            aria-label="войти через телеграм"
            to={`tg://resolve?domain=${bot}&start=auth_hash_${user!.hash}`}
            className={cn(classes.button, classes.telegram)}
            onClick={() => setMode("confirm-telegram")}
          >
            <svg
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#telegram" />
            </svg>

            <p>Войти через Telegram</p>
          </Link>
        </div>

        <p className={cn(classes.grey, classes.small)}>
          Авторизуясь на&nbsp;сайте, я&nbsp;принимаю условия пользовательского соглашения и&nbsp;даю согласие
          на&nbsp;обработку персональных данных в&nbsp;соответствии с&nbsp;законодательством России
          и&nbsp;пользовательским соглашением.
        </p>
      </div>
    </>
  );
};
