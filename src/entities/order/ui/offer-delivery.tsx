import cn from "classnames";
import dayjs from "dayjs";

import { OfferType } from "../lib/types";
import classes from "./offer-delivery.module.sass";

dayjs.locale("ru");

type OfferDeliveryProps = {
  offer: OfferType;
};

export const OfferDelivery = ({ offer }: OfferDeliveryProps) => {
  return (
    <>
      <div className={classes.wrapper}>
        <p className={cn(classes.header, classes.divider)}>Покупка автомобиля под заказ</p>

        <p>Отслеживайте статус и срок доставки вашего автомобиля из Китая</p>

        <div className={cn(classes.date, offer.delivery.statusList[1].active && classes.active)}>
          <span>Ожидаемый срок доставки</span>

          <span>
            {dayjs(offer.delivery.firstDate).format("D MMM YYYY").toLowerCase()} —{" "}
            {dayjs(offer.delivery.lastDate).format("D MMM YYYY").toLowerCase()}
          </span>
        </div>

        <ul className={classes.statusList}>
          {offer.delivery.statusList.map((status) => (
            <div
              className={cn(classes.statusWrapper, status.active && classes.activeStatus)}
              key={status.name}
            >
              <p className={classes.statusHeader}>{status.name}</p>

              <p className={classes.statusText}>{status.description}</p>

              <div className={classes.point} />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
