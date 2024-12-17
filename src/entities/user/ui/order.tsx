import { memo, useState } from "react";
import dayjs from "dayjs";
// import plural from 'plural-ru';

import { Offer, OfferStateType } from "../../order";

import { MycarsOrderType } from "../lib/types";
import classes from "./order.module.sass";
import { Modal } from "../../../shared/ui/modal";

type OrderProps = {
  order: MycarsOrderType;
};

export const Order = memo(({ order }: OrderProps) => {
  const [isOffer, setIsOffer] = useState<OfferStateType | null>(null);

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

          {order.colors[0] && (
            <span>Цвет кузова: {order.colors[0].items[0].name.ru || order.colors[0].items[0].name.ru}</span>
          )}

          {order.colors[1] && (
            <span>Цвет салона: {order.colors[1].items[0].name.ru || order.colors[0].items[0].name.ru}</span>
          )}

          {order.addItems.length > 0 && <span>Доп. товары на автомобиль</span>}

          {order.hasAddOptions && <span>Доп. опции на автомобиль</span>}

          {!!order.warranty && <span>{order.warranty.name.ru || order.warranty.name.ch}</span>}
        </p>
      </div>

      <div className={classes.buttonWrapper}>
        <button onClick={() => setIsOffer("order")}>Заказ</button>

        <button onClick={() => setIsOffer("price")}>
          Цены
          {!!order.dealerOffersCount && <p className={classes.offersCount}>{order.dealerOffersCount}</p>}
        </button>

        <button onClick={() => setIsOffer(null)}>Доставка</button>
      </div>

      {isOffer && (
        <Modal
          onClose={() => setIsOffer(null)}
          width
          button
        >
          <Offer
            orderId={order.id}
            offerState={isOffer}
            setOfferState={setIsOffer}
          />
        </Modal>
      )}
    </div>
  );
});
