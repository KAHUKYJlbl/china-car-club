import { OfferType } from "../lib/types";
import classes from "./offer-delivery.module.sass";

type OfferDeliveryProps = {
  offer: OfferType;
};

export const OfferDelivery = ({ offer }: OfferDeliveryProps) => {
  return (
    <>
      <div className={classes.wrapper}>{offer.id}</div>
    </>
  );
};
