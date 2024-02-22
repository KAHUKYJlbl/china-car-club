import { Modal } from '../../../shared/ui/modal';
import TelegramLoginButton from 'telegram-login-button';

import classes from './login.module.sass';
import { toast } from 'react-toastify';

type LoginProps = {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const Login = ({onClose, onLoginSuccess}: LoginProps): JSX.Element => {
  const smsHandler = () => {
    toast('Сервис SMS недоступен.', {type: 'warning'});
    toast('Попробуйте авторизацию через Telegram.', {type: 'warning'});
  }

  return (
    <Modal onClose={onClose}>
      <div className={classes.wrapper}>
        <form>
          <label className={classes.sms}>
            <span>Введите номер телефона:</span>

            <input type='tel' className={classes.input} />

            <button
              type='button'
              className={classes.button}
              onClick={smsHandler}
            >
              Получить SMS
            </button>
          </label>
        </form>

        <p>
          Или авторизуйтесь через Telegram
        </p>

        <div className={classes.telegram}>
          <TelegramLoginButton
            botName="test111_login_bot"
            cornerRadius={12}
            dataOnauth={onLoginSuccess}
          />
        </div>
      </div>
    </Modal>
  )
}
