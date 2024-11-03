import classes from "./about-price.module.sass";

type AboutPriceProps = {};

export const AboutPrice = ({}: AboutPriceProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.header}>О цене и оплате</p>

      <p>
        <span>Цена в РФ без растаможивания</span>
        <br />
        Прописывается в договоре на день заключения. Оплачивается перед заказом. Включает в себя:
        <br />— стоимость автомобиля с налогом (если он требуется)
        <br />— экспортные, логистические затраты, страхование перевозки
        <br />— платные опции, цвета кузова или салона, товары и услуги (если вы их выбирали)
      </p>

      <p>Вы можете заказать автомобиль по данной цене, чтобы дальнейшее растаможивание провести самостоятельно</p>

      <p>
        <span>Растаможивание и утильсбор</span>
        <br />
        Стоимость растаможивания зависит от&nbsp;курса в&nbsp;день её оплаты. Оплачивается после доставки автомобиля
        на&nbsp;таможенный терминал в&nbsp;России
      </p>

      <p>
        <span>Цена в РФ с растаможиванием</span>
        <br />
        Это сумма цены в РФ без растаможивания и&nbsp;стоимости официального растаможивания, оплаты утильсбора,
        получения ЭПТС и СБКТС
      </p>
    </div>
  );
};
