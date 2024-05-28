import classes from './done.module.sass';

type DoneProps = {
  onDone: () => void;
};

export const Done = ({ onDone }: DoneProps) => {
  return (
    <div className={classes.wrapper}>
      <div>
        <p className={classes.header}>
          Отправлено!
        </p>

        <p className={classes.subheader}>
          Передали запрос партнерам, ожидайте предложений и&nbsp;выбирайте лучшее
        </p>
      </div>

      <button onClick={onDone}>
        Отлично!
      </button>
    </div>
  );
};
