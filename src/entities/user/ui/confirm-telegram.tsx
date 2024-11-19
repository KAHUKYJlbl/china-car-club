import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import { useTimer } from "react-timer-hook";
import dayjs from "dayjs";
import cn from "classnames";

import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { unmask } from "../../../shared/lib/utils/unmask";
import { getBotName } from "../../settings";

import { ConfirmFormType, LoginModeType } from "../lib/types";
import { NEW_PIN_TIME } from "../lib/const";
import { postConfirm } from "../model/api-actions/post-confirm";
import { getUser } from "../model/user-selectors";
import classes from "./confirm-telegram.module.sass";

type ConfirmPhoneProps = {
  onClose: () => void;
  onLogin: () => void;
  setMode: (mode: LoginModeType) => void;
};

export const ConfirmTelegram = ({ onClose, onLogin, setMode }: ConfirmPhoneProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const bot = useAppSelector(getBotName);
  const timer = useTimer({ expiryTimestamp: dayjs().add(NEW_PIN_TIME, "s").toDate() });

  const { register: registerConfirm, handleSubmit: handleSubmitConfirm } = useForm<ConfirmFormType>();

  const onConfirmSubmit: SubmitHandler<ConfirmFormType> = (data) => {
    if (user) {
      dispatch(
        postConfirm({
          pin: unmask(data.pin),
          hash: user.hash,
        }),
      ).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          onClose();
          onLogin();
        } else {
          toast.error("Ошибка сервиса.");
        }
      });
    }
  };

  const onConfirmError = () => {
    toast.error("Необходимо ввести pin.");
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <p className={classes.header}>Введите код из бота в Telegram</p>

        <p className={classes.grey}>
          Откройте в Telegram бот
          <br />
          <Link
            aria-label="написать нам"
            to={`tg://resolve?domain=${bot}`}
            className={classes.timer}
          >
            @{bot}
          </Link>
          , нажмите
          <br />
          «Начать/Start» и получите код.
        </p>
      </div>

      <div className={classes.main}>
        <form onSubmit={handleSubmitConfirm(onConfirmSubmit, onConfirmError)}>
          <label className={classes.sms}>
            <InputMask
              autoComplete="off"
              className={classes.input}
              mask="99999"
              maskChar=" "
              {...registerConfirm("pin", { required: true })}
            />

            <button
              aria-label="войти"
              type="submit"
              className={cn(classes.button, classes.submit)}
            >
              Подтвердить вход
            </button>

            {timer.isRunning ? (
              <span className={cn(classes.small, classes.grey)}>
                Новый код можно запросить через
                <span className={classes.timer}> {timer.seconds} сек</span>
              </span>
            ) : (
              <Link
                aria-label="запросить новый код"
                to={`tg://resolve?domain=${process.env.TELEGRAM_BOT}&start=auth_hash_${user!.hash}`}
                className={cn(classes.small, classes.timer, classes.new)}
                onClick={() => timer.restart(dayjs().add(NEW_PIN_TIME, "s").toDate())}
              >
                Запросить новый код
              </Link>
            )}
          </label>
        </form>
      </div>

      <button
        aria-label="изменить способ входа"
        className={classes.button}
        onClick={() => setMode("init")}
      >
        Изменить способ входа
      </button>
    </div>
  );
};
