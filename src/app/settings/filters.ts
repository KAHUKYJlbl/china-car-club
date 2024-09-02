import { FilterId, FilterType } from "../../features/filter/lib/types";

export const FILTERS: Partial<Record<FilterId, FilterType>> = {
  price: {
    isNew: true,
    name: "Цена в России",
    elements: [
      {
        elementId: 2,
        name: "До 3 млн",
      },
      {
        elementId: 3,
        name: "3-5 млн",
      },
      {
        elementId: 4,
        name: "5-10 млн",
      },
      {
        elementId: 5,
        name: "10+ млн",
      },
    ],
  },
  mileage: {
    isNew: false,
    name: "Пробег",
    elements: [
      {
        elementId: 1,
        name: "до 10 тыс.",
      },
      {
        elementId: 2,
        name: "от 10 до 30 тыс",
      },
      {
        elementId: 3,
        name: "от 30 до 60 тыс",
      },
      {
        elementId: 4,
        name: "от 60 до 100 тыс",
      },
      {
        elementId: 5,
        name: "от 100 тыс",
      },
    ],
  },
  age: {
    isNew: false,
    name: "Возраст ТС",
    elements: [
      {
        elementId: 1,
        name: "до 1 года",
      },
      {
        elementId: 2,
        name: "1-3 года",
      },
      {
        elementId: 3,
        name: "3-5 лет",
      },
      {
        elementId: 4,
        name: "5-8 лет",
      },
      {
        elementId: 5,
        name: "8-10 лет",
      },
      {
        elementId: 6,
        name: "более 10 лет",
      },
    ],
  },
  engine: {
    isNew: true,
    name: "Двигатель",
    elements: [
      {
        elementId: 3,
        name: "Электро",
      },
      {
        elementId: 10,
        name: "Гибрид REV",
      },
      {
        elementId: 9,
        name: "Гибрид PHEV",
      },
      {
        elementId: 1,
        name: "Бензин",
      },
      {
        elementId: 2,
        name: "Дизель",
      },
      {
        elementId: 7,
        name: "Гибрид MHEV + бензин",
      },
      {
        elementId: 8,
        name: "Гибрид MHEV + дизель",
      },
      {
        elementId: 6,
        name: "Гибрид HEV",
      },
      {
        elementId: 5,
        name: "Гибрид на метаноле",
      },
      {
        elementId: 4,
        name: "Водород",
      },
    ],
  },
  body: {
    isNew: true,
    name: "Кузов",
    elements: [
      {
        elementId: 1,
        name: "Внедорожник",
      },
      {
        elementId: 6,
        name: "Седан",
      },
      {
        elementId: 9,
        name: "MPV",
      },
      {
        elementId: 5,
        name: "Пикап",
      },
      {
        elementId: 4,
        name: "Мини",
      },
      {
        elementId: 7,
        name: "Спортивный",
      },
      {
        elementId: 2,
        name: "Микроавтобус",
      },
      {
        elementId: 3,
        name: "Микрогрузовик",
      },
      {
        elementId: 8,
        name: "Фургон",
      },
    ],
  },
  transmission: {
    isNew: true,
    name: "Коробка",
    elements: [
      {
        elementId: 1,
        name: "Автоматическая",
      },
      {
        elementId: 2,
        name: "Роботизированная",
      },
      {
        elementId: 3,
        name: "Вариатор",
      },
      {
        elementId: 4,
        name: "Механическая",
      },
    ],
  },
  drive: {
    isNew: true,
    name: "Привод",
    elements: [
      {
        elementId: 3,
        name: "Полный",
      },
      {
        elementId: 1,
        name: "Передний",
      },
      {
        elementId: 2,
        name: "Задний",
      },
    ],
  },
  region: {
    isNew: true,
    name: "Страна",
    elements: [
      {
        elementId: 5,
        name: "Китай",
      },
      {
        elementId: 1,
        name: "Европа",
      },
      {
        elementId: 4,
        name: "Корея",
      },
      {
        elementId: 3,
        name: "Япония",
      },
      {
        elementId: 2,
        name: "Америка",
      },
    ],
  },
  other: {
    isNew: true,
    name: "Отличие",
    elements: [
      {
        filterId: "seats",
        elementId: 2,
        name: "Больше 5 мест",
      },
      {
        filterId: "powerReserve",
        elementId: 3,
        name: "Запас хода 600+ км",
      },
      {
        filterId: "acceleration",
        elementId: 4,
        name: "0-100 до 7 секунд",
      },
      {
        filterId: "date",
        elementId: 5,
        name: "Свежее поколение",
      },
      {
        filterId: "clearance",
        elementId: 6,
        name: "Клиренс 220+ мм",
      },
    ],
  },
};
