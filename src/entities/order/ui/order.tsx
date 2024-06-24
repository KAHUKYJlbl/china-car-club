import classes from './order.module.sass';

type OrderProps = {};

export const Order = ({}: OrderProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <p className={classes.header}>
          <span>Заявка</span>

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
          <span>Растаможивание на физлицо</span>
          <span>Для личного пользования</span>
          <span>Получение ЭПТС и СБКТС</span>
          <span>Доп. товары на автомобиль</span>
          <span>Гарантия на автомобиль</span>
        </p>
      </div>

      <button>1 предложение цены</button>
    </div>
  );
};
