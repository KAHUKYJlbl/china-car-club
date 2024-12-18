import { OfferType } from "../lib/types";
import classes from "./offer-order.module.sass";

type OfferOrderProps = {
  offer: OfferType;
};

export const OfferOrder = ({ offer }: OfferOrderProps) => {
  return (
    <>
      <div className={classes.wrapper}>
        <p className={classes.header}>Основные характеристики</p>

        {offer.specification.parameters.bodyType.name && (
          <div className={classes.parameter}>
            <p>Кузов</p>
            <p>{offer.specification.parameters.bodyType.name}</p>
          </div>
        )}

        {offer.specification.parameters.transmissionType.name && (
          <div className={classes.parameter}>
            <p>Коробка</p>
            <p>{offer.specification.parameters.transmissionType.name}</p>
          </div>
        )}

        {offer.specification.parameters.power && (
          <div className={classes.parameter}>
            <p>Мощность двигателя</p>
            <p>{offer.specification.parameters.power} кВт ⋅ ч</p>
          </div>
        )}

        {offer.specification.parameters.torque && (
          <div className={classes.parameter}>
            <p>Крутящий момент</p>
            <p>{offer.specification.parameters.torque} Н ⋅ м</p>
          </div>
        )}

        {offer.specification.parameters.batteryCapacity && (
          <div className={classes.parameter}>
            <p>Батарея</p>
            <p>{offer.specification.parameters.batteryCapacity}</p>
          </div>
        )}
        {offer.specification.parameters.powerReserve && (
          <div className={classes.parameter}>
            <p>Запас хода на топливе</p>
            <p>{offer.specification.parameters.powerReserve} км</p>
          </div>
        )}

        {offer.specification.parameters.electricPowerReserve && (
          <div className={classes.parameter}>
            <p>Запас хода на батарее</p>
            <p>{offer.specification.parameters.electricPowerReserve} км</p>
          </div>
        )}

        {offer.specification.parameters.engineCount && (
          <div className={classes.parameter}>
            <p>Количество двигателей</p>
            <p>{offer.specification.parameters.engineCount}</p>
          </div>
        )}

        {offer.specification.parameters.seats && (
          <div className={classes.parameter}>
            <p>Количество мест</p>
            <p>{offer.specification.parameters.seats}</p>
          </div>
        )}

        {offer.specification.parameters.lengthWidthHeight && (
          <div className={classes.parameter}>
            <p>Длина * Ширина * Высота</p>
            <p>{offer.specification.parameters.lengthWidthHeight} мм</p>
          </div>
        )}

        {offer.specification.parameters.groundClearance && (
          <div className={classes.parameter}>
            <p>Клиренс</p>
            <p>{offer.specification.parameters.groundClearance}</p>
          </div>
        )}

        {offer.specification.parameters.wheelSize.front && (
          <div className={classes.parameter}>
            <p>Передние колеса</p>
            <p>{offer.specification.parameters.wheelSize.front}</p>
          </div>
        )}

        {offer.specification.parameters.wheelSize.rear && (
          <div className={classes.parameter}>
            <p>Задние колеса</p>
            <p>{offer.specification.parameters.wheelSize.rear}</p>
          </div>
        )}

        {offer.specification.parameters.engineCapacity && (
          <div className={classes.parameter}>
            <p>Объем двигателя</p>
            <p>{offer.specification.parameters.engineCapacity} см. куб</p>
          </div>
        )}
      </div>

      {false && (
        <div className={classes.wrapper}>
          <p className={classes.header}>Цвет кузова и салона</p>

          <p className={classes.colorType}>Цвет кузова</p>

          <div className={classes.color}>
            <div>
              <p className={classes.colorName}>{offer.colors[0].name}</p>

              <div className={classes.colorBox}>
                <div style={{ backgroundColor: `#${offer.colors[0].items[0].hexList[0]}` }}></div>
                <div
                  style={{
                    backgroundColor: offer.colors[0].items[0].hexList[1]
                      ? `#${offer.colors[0].items[0].hexList[1]}`
                      : `#${offer.colors[0].items[0].hexList[0]}`,
                  }}
                ></div>
              </div>
            </div>

            <img
              src={`${process.env.STATIC_URL || `${window.location.origin}/storage`}${offer.colors[0].items[0].imageUrl}`}
              alt="Car"
              width="60"
              height="60"
            />
          </div>

          <p className={classes.colorType}>Цвет салона</p>

          <div className={classes.color}>
            <div>
              <p className={classes.colorName}>{offer.colors[1].name}</p>

              <div className={classes.colorBox}>
                <div style={{ backgroundColor: `#${offer.colors[1].items[0].hexList[0]}` }}></div>
                <div
                  style={{
                    backgroundColor: offer.colors[1].items[0].hexList[1]
                      ? `#${offer.colors[1].items[0].hexList[1]}`
                      : `#${offer.colors[1].items[0].hexList[0]}`,
                  }}
                ></div>
              </div>
            </div>

            <img
              src={`${process.env.STATIC_URL || `${window.location.origin}/storage`}${offer.colors[1].items[0].imageUrl}`}
              alt="Car"
              width="60"
              height="60"
            />
          </div>
        </div>
      )}

      {offer.addOptions.length > 0 && (
        <div className={classes.wrapper}>
          <p className={classes.header}>Дополнительные опции</p>

          {offer.addOptions.map((option) => (
            <p key={option.id}>
              •&nbsp;{option.name.ru || option.name.ch} - {option.description.toLowerCase()}
            </p>
          ))}
        </div>
      )}

      {offer.addItems.length > 0 && (
        <div className={classes.wrapper}>
          <p className={classes.header}>Дополнительные товары</p>

          {offer.addItems.map((item) => (
            <p
              key={item.id}
              className={classes.listItem}
            >
              •&nbsp;{item.fullName}
            </p>
          ))}
        </div>
      )}
    </>
  );
};
