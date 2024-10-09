import { FavoriteTypes } from "./const";

export const getFavoriteTypeHeader = (type: FavoriteTypes) => {
  switch (type) {
    case FavoriteTypes.Specification:
      return "Комплектация модели";
    case FavoriteTypes.Series:
      return "Модель авто";
    case FavoriteTypes.Ad:
      return "Объявление";
    default:
      return "";
  }
};
