import { useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { OfferStateType } from "../lib/types";

import { OfferPrice } from "./offer-price";
import { OfferOrder } from "./offer-order";
import { OfferDelivery } from "./offer-delivery";
import { fetchOffer } from "../model/api-actions/fetch-offer";
import { getOffer, getOfferLoadingStatus } from "../model/order-selectors";
import classes from "./offer.module.sass";

type OffersProps = {
  orderId: number;
  offerState: OfferStateType;
  setOfferState: React.Dispatch<React.SetStateAction<OfferStateType | null>>;
};

export const Offer = ({ orderId, offerState, setOfferState }: OffersProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffer(orderId.toString()));
  }, []);

  const offer = useAppSelector(getOffer);
  const offerLoadingStatus = useAppSelector(getOfferLoadingStatus);

  if (!offer || offerLoadingStatus.isLoading) {
    return (
      <div className={classes.wrapper}>
        <LoadingSpinner spinnerType="widget" />
      </div>
    );
  }

  return (
    <>
      <div className={classes.wrapper}>
        <p className={classes.header}>
          {offer.manufacturer.name.ru || offer.manufacturer.name.ch}
          <br />
          {offer.series.name.ru || offer.series.name.ch}
        </p>

        <p>
          <span className={classes.grey}>Комплектация</span>
          <span className={classes.header}>
            {[
              `Двигатель ${offer.specification.parameters.engineType.name}`,
              offer.specification.parameters.transmissionType.name,
              offer.specification.parameters.driveType.name,
              `${offer.specification.parameters.powerReserve || offer.specification.parameters.electricPowerReserve} км`,
              `${offer.specification.parameters.seats.join(", ")} мест`,
            ]
              .filter((value) => !!value)
              .join(" • ")}
          </span>
          <span>{offer.specification.name.ru || offer.specification.name.ch}</span>
        </p>

        <div>
          <button
            onClick={() => setOfferState("order")}
            className={cn(offerState === "order" && classes.current)}
          >
            Заказ
          </button>

          <button
            onClick={() => setOfferState("price")}
            className={cn(offerState === "price" && classes.current)}
          >
            Цена
          </button>

          <button
            // onClick={() => setOfferState("delivery")}
            className={cn(offerState === "delivery" && classes.current)}
          >
            Доставка
          </button>
        </div>
      </div>

      {offer.manager && (
        <div className={cn(classes.wrapper, classes.manager)}>
          <div className={classes.name}>
            <span className={classes.grey}>Персональный менежер:</span>
            <span>{offer.manager.name}</span>
          </div>

          <div className={classes.buttons}>
            <Link to={`tel:${offer.manager.contacts[0].contact} target="_self"`}>
              {`+${offer.manager.contacts[0].contact[1]} ${offer.manager.contacts[0].contact.substring(2, 5)} ${offer.manager.contacts[0].contact.substring(5, 8)} ${offer.manager.contacts[0].contact.substring(8, 10)} ${offer.manager.contacts[0].contact.substring(10)}`}
            </Link>

            <Link
              to={`https://wa.me/${offer.manager.contacts[0].contact.slice(1)}`}
              target="_blank"
            >
              Написать в WhatsApp
            </Link>
          </div>
        </div>
      )}

      {offerState === "order" && <OfferOrder offer={offer} />}

      {offerState === "price" && <OfferPrice offer={offer} />}

      {offerState === "delivery" && <OfferDelivery offer={offer} />}
    </>
  );
};
