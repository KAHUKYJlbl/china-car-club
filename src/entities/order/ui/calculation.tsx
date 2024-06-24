import classes from './calculation.module.sass';

type CalculationProps = {};

export const Calculation = ({}: CalculationProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <p className={classes.header}>
          <span>Быстрый расчет</span>

          <span className={classes.grey}>17 апр, в 22:09</span>
        </p>

        <img
          src='/images/noimage.jpg'
        />

        <p className={classes.model}>
          <p className={classes.bold}>
            Xiaomi<br/>SU7
          </p>

          <span>800km 4WD Max</span>

          <span className={classes.grey}>2024 поколение • 2024 выпуск</span>
        </p>

        <p className={classes.properties}>
          Внедорожник • Электрический двигатель • Автоматическая коробка • Полный привод • Запас хода 600+ км
        </p>

        <p className={classes.price}>
          <span>Цена в России с растаможкой</span>
          <span className={classes.bold}>000 000 000 ₽ — 000 000 000 ₽</span>
        </p>
      </div>

      <div className={classes.buttons}>
        <button>Перейти к расчету</button>

        <button className={classes.xbutton}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};
