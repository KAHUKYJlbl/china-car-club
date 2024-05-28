import { useState } from 'react';

import { Modal } from '../../../shared/ui/modal';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

import { getUser, getUserLoadingStatus } from '../model/user-selectors';
import { LoginModeType } from '../lib/types';

import { ConfirmTelegram } from './confirm-telegram';
import { ConfirmPhone } from './confirm-phone';
import { LoginPhone } from './login-phone';
import { LoginInit } from './login-init';
import classes from './login.module.sass';

type LoginProps = {
  onClose: () => void;
  onLogin: () => void;
}

export const Login = ({ onClose, onLogin }: LoginProps): JSX.Element => {
  const [ mode, setMode ] = useState<LoginModeType>('init');
  const [ phone, setPhone ] = useState('');

  const user = useAppSelector(getUser);
  const userLoadingStatus = useAppSelector(getUserLoadingStatus);

  if (userLoadingStatus.isLoading || !user) {
    return (
      <Modal onClose={onClose} button>
        <div className={classes.wrapperLoader}>
          <LoadingSpinner spinnerType='widget' />
        </div>
      </Modal>
    )
  }

  return (
    <Modal onClose={onClose} button>
      <div className={classes.wrapper}>
        {
          (mode === 'init') &&
          <LoginInit setMode={setMode} />
        }

        {
          (mode === 'phone') &&
          <LoginPhone
            setMode={setMode}
            setPhone={setPhone}
          />
        }

        {
          (mode === 'confirm-phone') &&
          <ConfirmPhone
            phone={phone}
            setMode={setMode}
            onClose={onClose}
            onLogin={onLogin}
          />
        }

        {
          (mode === 'confirm-telegram') &&
          <ConfirmTelegram
            setMode={setMode}
            onClose={onClose}
            onLogin={onLogin}
          />
        }
      </div>
    </Modal>
  )
}
