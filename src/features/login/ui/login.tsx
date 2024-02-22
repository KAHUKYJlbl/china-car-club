import { Modal } from '../../../shared/ui/modal';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';

import classes from './login.module.sass';

type LoginProps = {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const Login = ({onClose, onLoginSuccess}: LoginProps): JSX.Element => {
  console.log(onLoginSuccess);

  return (
    <Modal onClose={onClose}>
      <div className={classes.wrapper}>
        <form>
          <label>
            Номер телефона:
            <input type='tel' />
          </label>
        </form>

        <TelegramLoginButton botName="test111_login_bot" dataOnauth={(user: TelegramUser) => console.log(user)} />
      </div>
    </Modal>
  )
}
