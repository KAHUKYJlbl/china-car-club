import { memo, useState } from "react";
import dayjs from "dayjs";
// import plural from 'plural-ru';

import { Modal } from "../../../shared/ui/modal";
import { Offers } from "../../order";

import { MycarsOrderType } from "../lib/types";
import classes from "./order.module.sass";

type OrderProps = {
  order: MycarsOrderType;
};

export const Order = memo(({ order }: OrderProps) => {
  const [isOffers, setIsOffers] = useState(false);

  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <p className={classes.header}>
          <span>Заявка</span>

          <span className={classes.grey}>{dayjs(order.createdAt).locale("ru").format("D MMM, в H:mm")}</span>
        </p>

        <img
          src={`${process.env.STATIC_URL || `${window.location.origin}/storage`}/specification/${
            order.specification.id
          }.jpg`}
        />

        <p className={classes.model}>
          <span className={classes.bold}>
            {order.specification.series.manufacturer.name.ru || order.specification.series.manufacturer.name.ch}
            <br />
            {order.specification.series.name.ru || order.specification.series.name.ch}
          </span>

          <span>{order.specification.name.ru || order.specification.name.ch}</span>

          <span className={classes.grey}>{order.specification.year} поколение • 2024 выпуск</span>
        </p>

        <p className={classes.properties}>
          <span>Растаможивание на {order.priceTypeId === 2 ? "физлицо" : "юрлицо"}</span>

          <span>{order.priceTypeId === 2 ? "Для личного пользования" : "Без вычета НДС"}</span>

          {order.availabilityOfEpts && <span>Получение ЭПТС и СБКТС</span>}

          {/* {order.addItems.map((item) => (
            <span key={item}>{item}</span>
          ))} */}

          {order.addItems.length > 0 && <span>Доп. товары на автомобиль</span>}
        </p>
      </div>

      <button
      // onClick={() => setIsOffers(true)}
      >
        {/* {plural(order.dealerOffersCount, '%d предложение', '%d предложения', '%d предложений')} цены */}
        {"Предложения цены (скоро)"}
      </button>

      {isOffers && (
        <Modal onClose={() => setIsOffers(false)}>
          <Offers orderId={order.id} />
        </Modal>
      )}
    </div>
  );
});
