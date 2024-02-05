import { FilterId, FilterType } from '../../features/filter/lib/types';

export const FILTERS: Partial<Record<FilterId, FilterType>> = {
  price: {
    name: 'Цена в России',
    elements: [
      {
        elementId: 2,
        name: 'До 3 млн',
      },
      {
        elementId: 3,
        name: '3-5 млн',
      },
      {
        elementId: 4,
        name: '5-10 млн',
      },
      {
        elementId: 5,
        name: '10+ млн',
      },
    ],
  },
  engine: {
    name: 'Двигатель',
    elements: [
      {
        elementId: 1,
        name: 'Бензин',
      },
      {
        elementId: 2,
        name: 'Дизель',
      },
      {
        elementId: 3,
        name: 'Электро',
      },
      {
        elementId: 4,
        name: 'Водород',
      },
      {
        elementId: 5,
        name: 'Гибрид на метаноле',
      },
      {
        elementId: 6,
        name: 'Гибрид HEV',
      },
      {
        elementId: 7,
        name: 'Гибрид MHEV + бензин',
      },
      {
        elementId: 8,
        name: 'Гибрид MHEV + дизель',
      },
      {
        elementId: 9,
        name: 'Гибрид PHEV',
      },
      {
        elementId: 10,
        name: 'Гибрид REV',
      },
    ],
  },
  body: {
    name: 'Кузов',
    elements: [
      {
        elementId: 1,
        name: 'Внедорожник',
      },
      {
        elementId: 2,
        name: 'Микроавтобус',
      },
      {
        elementId: 3,
        name: 'Микрогрузовик',
      },
      {
        elementId: 4,
        name: 'Мини',
      },
      {
        elementId: 5,
        name: 'Пикап',
      },
      {
        elementId: 6,
        name: 'Седан',
      },
      {
        elementId: 7,
        name: 'Спортивный',
      },
      {
        elementId: 8,
        name: 'Фургон',
      },
      {
        elementId: 9,
        name: 'MPV',
      },
    ],
  },
  transmission: {
    name: 'Коробка',
    elements: [
      {
        elementId: 1,
        name: 'Автоматическая',
      },
      {
        elementId: 2,
        name: 'Робот',
      },
      {
        elementId: 3,
        name: 'Вариатор',
      },
      {
        elementId: 4,
        name: 'Механическая',
      },
    ],
  },
  drive: {
    name: 'Привод',
    elements: [
      {
        elementId: 1,
        name: 'Передний',
      },
      {
        elementId: 2,
        name: 'Задний',
      },
      {
        elementId: 3,
        name: 'Полный',
      },
    ],
  },
  region: {
    name: 'Страна',
    elements: [
      {
        elementId: 1,
        name: 'Европа',
      },
      {
        elementId: 2,
        name: 'Америка',
      },
      {
        elementId: 3,
        name: 'Япония',
      },
      {
        elementId: 4,
        name: 'Корея',
      },
      {
        elementId: 5,
        name: 'Китай',
      },
    ],
  },
  other: {
    name: 'Отличие',
    elements: [
      {
        filterId: 'seats',
        elementId: 2,
        name: 'Больше 5 мест',
      },
      {
        filterId: 'powerReserve',
        elementId: 3,
        name: 'Запас хода 600+ км',
      },
      {
        filterId: 'acceleration',
        elementId: 4,
        name: '0-100 до 7 секунд',
      },
      {
        filterId: 'date',
        elementId: 5,
        name: 'Свежее поколение',
      },
    ],
  },
};
