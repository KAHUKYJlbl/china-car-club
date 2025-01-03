import classes from "./about-price.module.sass";

type AboutPriceProps = {};

export const AboutPrice = ({}: AboutPriceProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.header}>О цене и оплате</p>

      <p>
        Конфигуратор рассчитывает онлайн:
        <br />— цену автомобиля в РФ без растаможивания
        <br />— справочную стоимость растаможивания
        <br />— полную цена авто в РФ с растаможиванием
      </p>

      <p>
        Цены считаются по актуальному курсу юаня и текущим ценам продажи автомобилей в Китае, которые обновляются каждый
        день по всем комплектациям доступным для заказа.
      </p>

      <p>
        <span>Цена в РФ без растаможивания</span>
        <br />
        Прописывается в договоре на день заключения. Оплачивается перед заказом. Возможно заказать автомобиль по данной
        цене, чтобы дальнейшее растаможивание провести самостоятельно. Что включает: стоимость автомобиля c налогом;
        платные опции, платные цвета кузова или салона, товары или услуги, если вы их выбирали; затраты на экспортное
        оформление, логистику, страхование перевозки.
      </p>
      <p>
        <span>Растаможивание и утильсбор</span>
        <br />
        Оплачивается после доставки автомобиля на таможенный терминал в России. Итоговая стоимость официального
        растаможивания зависит от курса евро в день её оплаты.
      </p>

      <p>
        <span>Цена в РФ с растаможиванием</span>
        <br />
        Считается как итоговая сумма из первых двух: Цены в РФ без растаможивания + Стоимости растаможивания и оплаты
        утильсбора, которые также включают получение ЭПТС и СБКТС
      </p>
      <p>
        <span>— Есть ли скидка на автомобиль?</span>
        <br />
        Да, в каждом отдельном заказе мы проверяем дополнительные скидки на автомобиль от поставщиков и дилеров в Китае.
        Оставляйте заявку и менеджер проверит для вас скидку
      </p>
    </div>
  );
};
