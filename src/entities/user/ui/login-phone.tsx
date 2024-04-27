import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import cn from 'classnames';

import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { unmask } from '../../../shared/lib/utils/unmask';

import { postSms } from '../model/api-actons/post-sms';
import { getUser } from '../model/user-selectors';
import { LoginModeType, SmsFormType } from '../lib/types';
import classes from './login-phone.module.sass';

type LoginPhoneProps = {
  setMode: (mode: LoginModeType) => void;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
};

export const LoginPhone = ({ setMode, setPhone }: LoginPhoneProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const { register, handleSubmit, watch } = useForm<SmsFormType>();

  const getMask = () => {
    const phone = unmask(watch('msisdn'));
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
      })).then((data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          setMode('confirm-phone');
          setPhone(data.meta.arg.msisdn);
        } else {
          toast.error('Ошибка сервиса.');
        }
      });
    }
  };

  const onInitError = () => {
    toast.error('Необходимо ввести номер телефона.')
  }


  return (
    <div className={classes.wrapper}>
      <p className={classes.header}>
        Вход по номеру телефона
      </p>

      <div className={classes.main}>
        <form onSubmit={handleSubmit( onInitSubmit, onInitError )}>
          <label className={classes.phone}>
            <InputMask
              autoComplete="off"
              className={classes.input}
              mask={getMask()}
              maskChar=" "
              {...register("msisdn", { required: true })}
            />

            <button
              type='submit'
              className={cn(classes.button, classes.submit)}
            >
              Получить код в SMS
            </button>

            <span className={cn(classes.grey, classes.small)}>
              Продолжая авторизацию, вы&nbsp;соглашаетесь с&nbsp;политикой конфиденциальности,
              условиями сервиса и&nbsp;условиями продажи автомобилей
            </span>
          </label>
        </form>
      </div>

      <button
        className={classes.button}
        onClick={() => setMode('init')}
      >
        Изменить способ входа
      </button>
    </div>
  );
};
