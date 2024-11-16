import { memo } from "react";
import classes from "./done.module.sass";

type DoneProps = {
  onDone: () => void;
};

export const Done = memo(({ onDone }: DoneProps) => {
  return (
    <div className={classes.wrapper}>
      <div>
        <p className={classes.header}>Скидка запрошена</p>

        <p className={classes.subheader}>
          Передали запрос, проверяем, ожидайте предложения и&nbsp;следите за&nbsp;заказом
        </p>
      </div>

      <button
        aria-label="отлично"
        onClick={onDone}
      >
        Отлично!
      </button>
    </div>
  );
});
