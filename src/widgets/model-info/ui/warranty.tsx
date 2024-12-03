import { getDealerName } from "../../../entities/settings";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";

import classes from "./warranty.module.sass";

export const Warranty = () => {
  const dealerName = useAppSelector(getDealerName);

  return (
    <>
      <div className={classes.wrapper}>
        <p className={classes.header}>Гарантия {dealerName}</p>

        <p className={classes.subheader}>На покупку автомобиля под заказ</p>
      </div>

      <div className={classes.wrapper}>
        {dealerName.toLowerCase().includes("рольф") && (
          <div className={classes.block}>
            <p className={classes.blockHeader}>Гарантия 2 года на автомобиль</p>

            <p className={classes.blockText}>
              На новый автомобиль установлен гарантийный срок 24&nbsp;месяца (2&nbsp;года) с&nbsp;момента передачи
              нового автомобиля первому владельцу или до&nbsp;достижения автомобилем пробега&nbsp;100&nbsp;000 км,
              в&nbsp;зависимости от&nbsp;того, что&nbsp;наступит ранее.
            </p>

            <div className={classes.bottomWrapper}>
              <p>0 ₽</p>

              <button>Включена</button>
            </div>
          </div>
        )}

        <div className={classes.block}>
          <p className={classes.blockHeader}>Гарантия поставки автомобиля</p>

          <p className={classes.blockText}>
            Отвечаем за&nbsp;срок поставки автомобиля по&nbsp;договору, за&nbsp;соответствие комплектации,
            за&nbsp;целостность автомобиля до&nbsp;момента передачи. Гарантируем, что&nbsp;автомобиль не&nbsp;заложен,
            не&nbsp;находится под&nbsp;арестом, не&nbsp;имеет каких-либо обременений и/или ограничений; Автомобиль
            выпущен в&nbsp;свободно е обращение на&nbsp;территории Российской Федерации или ЕАЭС. При&nbsp;нарушении
            возвращаем деньги, оплаченные по&nbsp;инвойсу продавцу автомобиля.
          </p>

          <div className={classes.bottomWrapper}>
            <p>0 ₽</p>

            <button>Включена</button>
          </div>
        </div>
      </div>
    </>
  );
};
