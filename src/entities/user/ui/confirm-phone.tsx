import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import { useTimer } from "react-timer-hook";
import dayjs from "dayjs";
import cn from "classnames";

import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { unmask } from "../../../shared/lib/utils/unmask";
import { getDealerName } from "../../settings";

import { ConfirmFormType, LoginModeType } from "../lib/types";
import { NEW_PIN_TIME } from "../lib/const";
import { postConfirm } from "../model/api-actions/post-confirm";
import { postSms } from "../model/api-actions/post-sms";
import { getUser } from "../model/user-selectors";
import classes from "./confirm-phone.module.sass";

type ConfirmPhoneProps = {
  phone: string;
  setMode: (mode: LoginModeType) => void;
  onClose: () => void;
  onLogin: () => void;
};

export const ConfirmPhone = ({ phone, setMode, onClose, onLogin }: ConfirmPhoneProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const timer = useTimer({ expiryTimestamp: dayjs().add(NEW_PIN_TIME, "s").toDate() });
  const dealer = useAppSelector(getDealerName);

  const { register, handleSubmit } = useForm<ConfirmFormType>();

  const onReinit = () => {
    if (user) {
      dispatch(
        postSms({
          msisdn: unmask(phone),
          provider: "sms",
          hash: user.hash,
        }),
      );
    }
  };

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

  const getFormat = (phone: string) => {
    if (phone.startsWith("7")) {
      return `+${phone.substring(0, 1)} (${phone.substring(1, 4)}) ${phone.substring(4, 7)} ${phone.substring(7, 9)} ${phone.substring(9, 11)}`;
    }
    if (phone.startsWith("374") || phone.startsWith("993")) {
      return `+${phone.substring(0, 3)} (${phone.substring(3, 5)}) ${phone.substring(5, 7)} ${phone.substring(7, 9)} ${phone.substring(9, 11)}`;
    }
    if (phone.startsWith("992") || phone.startsWith("996")) {
      return `+${phone.substring(0, 3)} (${phone.substring(3, 6)}) ${phone.substring(6, 8)} ${phone.substring(8, 10)} ${phone.substring(10, 12)}`;
    }
    if (
      phone.startsWith("375") ||
      phone.startsWith("380") ||
      phone.startsWith("994") ||
      phone.startsWith("995") ||
      phone.startsWith("998")
    ) {
      return `+${phone.substring(0, 3)} (${phone.substring(3, 5)}) ${phone.substring(5, 8)} ${phone.substring(8, 10)} ${phone.substring(10, 12)}`;
    }
    return "+999999999999999";
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <p className={classes.header}>
          {dealer.toLowerCase().includes("рольф") ? "Введите последние 4 цифры номера телефона" : "Введите код из SMS"}
        </p>

        <p className={classes.grey}>
          {dealer.toLowerCase().includes("рольф") ? "Сейчас вам поступит звонок на номер:" : "Код отправлен на номер:"}
          <br />
          {getFormat(phone)}
        </p>
      </div>

      <div className={classes.main}>
        <form onSubmit={handleSubmit(onConfirmSubmit, onConfirmError)}>
          <label className={classes.sms}>
            <InputMask
              autoComplete="off"
              className={classes.input}
              mask="99999"
              maskChar=" "
              {...register("pin", { required: true })}
            />

            <button
              aria-label="подтвердить вход"
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
              <span
                className={cn(classes.timer, classes.new)}
                onClick={onReinit}
              >
                Запросить новый код
              </span>
            )}
          </label>
        </form>
      </div>

      <button
        aria-label="изменить номер телефона"
        className={classes.button}
        onClick={() => setMode("phone")}
      >
        Изменить номер телефона
      </button>
    </div>
  );
};
