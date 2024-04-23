import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from "react-hook-form";
import InputMask from 'react-input-mask';

import { Modal } from '../../../shared/ui/modal';
import { unmask } from '../../../shared/lib/utils/unmask';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';

import { postSms } from '../model/api-actons/post-sms';
import { postConfirm } from '../model/api-actons/post-confirm';
import { getUser, getUserLoadingStatus } from '../model/user-selectors';
import { ConfirmFormType, LoginModeType, SmsFormType } from '../lib/types';

// import { LoginPhone } from './login-phone';
import { LoginInit } from './login-init';
import classes from './login.module.sass';

type LoginProps = {
  onClose: () => void;
  onLogin: () => void;
}

export const Login = ({ onClose, onLogin }: LoginProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [ mode, setMode ] = useState<LoginModeType>('init');

  const user = useAppSelector(getUser);
  const userLoadingStatus = useAppSelector(getUserLoadingStatus);

  const { register: registerInit, handleSubmit: handleSubmitInit, watch: watchInit } = useForm<SmsFormType>();
  const { register: registerConfirm, handleSubmit: handleSubmitConfirm } = useForm<ConfirmFormType>()

  const getMask = () => {
    const phone = unmask(watchInit('msisdn'));
    if (phone.startsWith('7')) {
      toast.dismiss();
      return '+9 (999) 999-99-99';
    }
    if (phone.startsWith('374') || phone.startsWith('993')) {
      toast.dismiss();
      return '+999 (99) 99-99-99';
    }
    if (phone.startsWith('992') || phone.startsWith('996')) {
      toast.dismiss();
      return '+999 (999) 99-99-99';
    }
    if (phone.startsWith('375') || phone.startsWith('380') || phone.startsWith('994') || phone.startsWith('995') || phone.startsWith('998')) {
      toast.dismiss();
      return '+999 (99) 999-99-99';
    }
    if (phone !== '') {
      toast.error('Мы не можем отправить сообщение в вашу страну', {toastId: 'phoneError'});
    }
    return '+999999999999999';
  }

  const onInitSubmit: SubmitHandler<SmsFormType> = (data) => {
    if (user) {
      dispatch(postSms({
        msisdn: unmask(data.msisdn),
        provider: 'sms',
        hash: user.hash,
      }))
        .then((data) => {
          if (data.meta.requestStatus === 'fulfilled') {
            setMode('confirm-phone');
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
      dispatch(postConfirm({
        pin: unmask(data.pin),
        hash: user.hash,
      })).then((data) => {
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
      <div className={classes.wrapper}>
        {
          (mode === 'init') &&
          <LoginInit setMode={setMode} />
        }

        {/* {
          (mode === 'phone') &&
          <LoginPhone />
        } */}
      </div>

      {/* {
        (mode === 'init') &&
        <div className={classes.wrapper}>
          <form onSubmit={handleSubmitInit( onInitSubmit, onInitError )}>
            <label className={classes.sms}>
              <span>Введите номер телефона:</span>

              <InputMask
                autoComplete="off"
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
            to={`tg://resolve?domain=ID_ChinaCarClub_bot&start=auth_hash_${user.hash}`}
            className={classes.telegram}
            onClick={() => setMode('confirm')}
          >
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#telegram" />
            </svg>

            Log in with Telegram
          </Link>
        </div>
      } */}

      {
        (mode === 'confirm-phone') &&
        <div className={classes.wrapper}>
          <form onSubmit={handleSubmitConfirm( onConfirmSubmit, onConfirmError )}>
            <label className={classes.sms}>
              <span>Введите код из сообщения:</span>

              <InputMask
                autoComplete="off"
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
