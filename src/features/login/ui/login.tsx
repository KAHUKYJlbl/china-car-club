import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from "react-hook-form";

import { Modal } from '../../../shared/ui/modal';
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

  const { register: registerInit, handleSubmit: handleSubmitInit } = useForm<SmsFormType>();
  const { register: registerConfirm, handleSubmit: handleSubmitConfirm } = useForm<ConfirmFormType>()


  const onInitSubmit: SubmitHandler<SmsFormType> = (data) => {
    if (user) {
      dispatch(fetchSms({
        ...data,
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
        ...data,
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

              <input
                type='text'
                className={classes.input}
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

              <input
                type='text'
                className={classes.input}
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
