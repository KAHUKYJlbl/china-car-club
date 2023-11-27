import classes from './choose-specification.module.sass';

export const ChooseSpecification = (): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      <p>
        Выберите марку и модель автомобиля — <span className={classes.grey}>покажем цену в Китае на текущий день</span>
      </p>

      <p className={classes.small}>
        По прямому контракту и курсу продажи валюты
      </p>
    </div>
  )
}
