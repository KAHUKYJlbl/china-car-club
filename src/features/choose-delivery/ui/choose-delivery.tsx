import { useState, memo } from "react";
import queryString from "query-string";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AppRoute } from "../../../app/provider/router";
import {
  fetchHash,
  postStatistics,
  getGeolocation,
  Login,
  getCurrentCity,
  getAuthStatus,
  postRefresh,
} from "../../../entities/user";
import { getAddedOptions, getAddedOptionsPrice, getCurrentColor, getCurrentColorPrice } from "../../../entities/order";
import { useUtm } from "../../../shared/lib/hooks/use-utm";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";

import classes from "./choose-delivery.module.sass";

type ChooseDeliveryProps = {
  modelId: number | null;
  specificationId: number | null;
};

export const ChooseDelivery = memo(({ modelId, specificationId }: ChooseDeliveryProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const utm = useUtm();

  const [isLogin, setIsLogin] = useState(false);

  const isAuth = useAppSelector(getAuthStatus);
  const geolocation = useAppSelector(getGeolocation);
  const city = useAppSelector(getCurrentCity);
  const options = useAppSelector(getAddedOptions);
  const optionsPrice = useAppSelector(getAddedOptionsPrice);
  const color = useAppSelector(getCurrentColor);
  const colorPrice = useAppSelector(getCurrentColorPrice);

  const loginHandler = () => {
    if (modelId && specificationId) {
      dispatch(
        postStatistics({
          specificationId: specificationId,
          customerLocation: geolocation,
          customerDelivery: {
            countryId: null,
            cityId: city,
          },
          utm,
        }),
      ).then(() => {
        dispatch(postRefresh());
      });

      navigate(
        queryString.stringifyUrl({
          url: AppRoute.Model,
          query: {
            model: modelId.toString(),
            spec: specificationId.toString(),
            int: color.int,
            ext: color.ext,
            colorPrice,
            options: options.join(","),
            optionsPrice,
          },
        }),
      );
    }
  };

  const calculateHandler = () => {
    if (modelId && specificationId) {
      if (isAuth) {
        loginHandler();
      } else {
        dispatch(fetchHash());
        setIsLogin(true);
      }
    } else {
      toast("Выберите комплектацию", { type: "warning" });
    }
  };

  return (
    <div className={classes.wrapper}>
      <p className={classes.big}>❷ Рассчитайте цену авто с&nbsp;растаможиванием</p>

      <p>Выберите условия поставки и&nbsp;запросите скидку у&nbsp;менеджера на&nbsp;заказ автомобиля</p>

      <button
        aria-label="рассчитать стоимость"
        className={classes.button}
        onClick={calculateHandler}
      >
        Быстрый онлайн-расчет под&nbsp;ключ
      </button>

      <p className={classes.small}>
        Нажимая кнопку, даю согласие на&nbsp;обработку моих&nbsp;персональных данных в&nbsp;соответствии&thinsp;
        <Link
          to={AppRoute.Policy}
          target="_blank"
        >
          с&nbsp;политикой&nbsp;конфиденциальности
        </Link>
      </p>

      {isLogin && (
        <Login
          onClose={() => setIsLogin(false)}
          onLogin={loginHandler}
        />
      )}
    </div>
  );
});
