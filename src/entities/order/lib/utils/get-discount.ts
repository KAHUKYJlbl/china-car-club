import dayjs from "dayjs";
import plural from "plural-ru";
import { OfferType } from "../types";

export const getDiscount = (offer: OfferType) => {
  switch (offer.discount.statusId) {
    case 1:
      return {
        header: "Вы запросили скидку",
        subheader: "Скоро вернемся с решением менеджера",
      };
    case 2:
      return {
        header: "Скидка получена",
        subheader:
          plural(
            dayjs(offer.discount.expiredAt).diff(dayjs(), "day"),
            "Остался %d день",
            "Осталось %d дня",
            "Осталось %d дней",
          ) + plural(dayjs(offer.discount.expiredAt).diff(dayjs(), "hour") % 24, " %d час", " %d часа", " %d часов"),
      };
    case 3:
      return {
        header: "Скидка закончилась",
        subheader: "Свяжителсь с менеджером чтобы узнать о скидке",
      };
    default:
      return {
        header: "Менеджер не прислал скидку",
        subheader: "Свяжителсь с менеджером чтобы узнать о скидке",
      };
  }
};
