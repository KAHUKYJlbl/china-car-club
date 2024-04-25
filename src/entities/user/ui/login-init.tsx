import cn from 'classnames';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

import { getUser, getUserLoadingStatus } from '../model/user-selectors';
import { LoginModeType } from '../lib/types';
import classes from './login-init.module.sass';

type LoginInitProps = {
  setMode: (mode: LoginModeType) => void;
};

export const LoginInit = ({setMode}: LoginInitProps) => {
  const user = useAppSelector(getUser);
  const userLoadingStatus = useAppSelector(getUserLoadingStatus);

  if (userLoadingStatus.isLoading || !user) {
    return <LoadingSpinner spinnerType='widget' />
  }

  return (
    <>
      <div className={classes.wrapper}>
        <p className={classes.header}>
          Вход в Chinacar.club
        </p>

        <p>
          Чтобы мгновенно считать стоимость доставки и&nbsp;растаможки автомобилей из&nbsp;Китая,
          добавлять в&nbsp;Избранное, запрашивать цены поставщиков рынка и&nbsp;выбирать лучшее предложение.
        </p>

        <button
          className={classes.button}
          onClick={() => setMode('phone')}
        >
          Войти по номеру телефона
        </button>

        <p className={classes.grey}>
          или
        </p>

        <Link
          to={`tg://resolve?domain=ID_ChinaCarClub_bot&start=auth_hash_${user.hash}`}
          className={cn(classes.button, classes.telegram)}
          onClick={() => setMode('confirm-telegram')}
        >
          <svg width="18" height="18" aria-hidden="true">
            <use xlinkHref="#telegram" />
          </svg>

          <p>
            Войти через Telegram
          </p>
        </Link>

        <p className={cn(classes.grey, classes.small)}>
          Авторизуясь на&nbsp;сайте, я&nbsp;принимаю условия пользовательского соглашения
          и&nbsp;даю согласие на&nbsp;обработку персональных данных в&nbsp;соответствии
          с&nbsp;законодательством России и&nbsp;пользовательским соглашением.
        </p>
      </div>

      <div className={cn(classes.wrapper, classes.secondary)}>
        <button className={classes.button}>
          Вход для дилеров и поставщиков
        </button>

        <p className={cn(classes.grey, classes.small)}>
          Для размещения своих предложений дилерам и поставщикам необходимо пройти регистрацию.
        </p>
      </div>
    </>
  );
};
