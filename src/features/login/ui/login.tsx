import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from "react-hook-form";
import InputMask from 'react-input-mask';

import { Modal } from '../../../shared/ui/modal';
import { unmask } from '../../../shared/lib/utils/unmask';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { fetchSms } from '../../../entities/user/model/api-actons/fetch-sms';
import { fetchConfirm } from '../../../entities/user/model/api-actons/fetch-confirm';
import { ConfirmFormType } from '../../../entities/user/lib/types';
import { SmsFormType, getUser, getUserLoadingStatus } from '../../../entities/user';

import classes from './login.module.sass';

type LoginProps = {
  onClose: () => void;
  onLogin: () => void;
}

export const Login = ({ onClose, onLogin }: LoginProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState <'init' | 'confirm'> ('init');

  const user = useAppSelector(getUser);
  const userLoadingStatus = useAppSelector(getUserLoadingStatus);

  const { register: registerInit, handleSubmit: handleSubmitInit, watch: watchInit } = useForm<SmsFormType>();
  const { register: registerConfirm, handleSubmit: handleSubmitConfirm } = useForm<ConfirmFormType>()

  const getMask = () => {
    const phone = unmask(watchInit('msisdn'));
    if (phone.startsWith('7')) return '+9 (999) 999-99-99';
    if (phone.startsWith('374') || phone.startsWith('993')) return '+999 (99) 99-99-99';
    if (phone.startsWith('992') || phone.startsWith('996')) return '+999 (999) 99-99-99';
    if (phone.startsWith('375') || phone.startsWith('380') || phone.startsWith('994') || phone.startsWith('995') || phone.startsWith('998')) return '+999 (99) 999-99-99';
    toast.error('We could not provide message to your country');
    return '+999999999999999'
  }

  const onInitSubmit: SubmitHandler<SmsFormType> = (data) => {
    if (user) {
      dispatch(fetchSms({
        msisdn: unmask(data.msisdn),
        provider: 'sms',
        hash: user.hash,
      }))
        .then((data) => {
          if (data.meta.requestStatus === 'fulfilled') {
            setMode('confirm');
          } else {
            toast.warning('Ошибка сервиса.');
          }
      });
    }
  };

  const onInitError = () => {
    toast.warning('Необходимо ввести номер телефона.')
  }

  const onConfirmSubmit: SubmitHandler<ConfirmFormType> = (data) => {
    if (user) {
      dispatch(fetchConfirm({
        pin: unmask(data.pin),
        hash: user.hash,
      }))
        .then((data) => {
          if (data.meta.requestStatus === 'fulfilled') {
            onClose();
            onLogin();
          } else {
            toast.warning('Ошибка сервиса.');
          }
      });
    }
  }

  const onConfirmError = () => {
    toast.warning('Необходимо ввести pin.')
  }

  if (userLoadingStatus.isLoading || !user) {
    return (
      <Modal onClose={onClose}>
        <LoadingSpinner spinnerType='widget' />
      </Modal>
    )
  }

  return (
    <Modal onClose={onClose}>
      {
        (mode === 'init') &&
        <div className={classes.wrapper}>
          <form onSubmit={handleSubmitInit( onInitSubmit, onInitError )}>
            <label className={classes.sms}>
              <span>Введите номер телефона:</span>

              <InputMask
                className={classes.input}
                mask={getMask()}
                maskChar=" "
                {...registerInit("msisdn", { required: true })}
              />

              <button
                type='submit'
                className={classes.button}
              >
                Получить SMS
              </button>
            </label>
          </form>

          <p>
            Или авторизуйтесь через Telegram
          </p>

          <Link
            to={`tg://resolve?domain=test_ccc_main_bot&start=auth_hash_${user.hash}`}
            className={classes.telegram}
            onClick={() => setMode('confirm')}
          >
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#telegram" />
            </svg>

            Log in with Telegram
          </Link>
        </div>
      }

      {
        (mode === 'confirm') &&
        <div className={classes.wrapper}>
          <form onSubmit={handleSubmitConfirm( onConfirmSubmit, onConfirmError )}>
            <label className={classes.sms}>
              <span>Введите код из сообщения:</span>

              <InputMask
                className={classes.input}
                mask="99999"
                maskChar=" "
                {...registerConfirm("pin", { required: true })}
              />


              <button
                type='submit'
                className={classes.button}
              >
                Подтвердить код
              </button>
            </label>
          </form>

          <p className={classes.return} onClick={() => setMode('init')}>
            Выбрать другой способ авторизации
          </p>
        </div>
      }

    </Modal>
  )
}
