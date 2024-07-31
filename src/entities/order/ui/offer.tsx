import { useState } from 'react';
import { Link } from 'react-router-dom';
import humps from 'humps';
import cn from 'classnames';

import priceFormat from '../../../shared/lib/utils/price-format';

import { getContactProvider, getContactUrl, getUrlTarget } from '../lib/utils/get-contacts';
import { getPriorityContact } from '../lib/utils/get-priority-contact';
import { OfferType } from '../lib/types';
import classes from './offer.module.sass';

type OfferProps = {
  offer: OfferType;
};

export const Offer = ({ offer }: OfferProps) => {
  const [ isAddContacts, setIsAddContacts ] = useState(false);

  return (
    <div className={classes.wrapper}>
      <p className={classes.header}>
        <span>{offer.dealer.name}</span>

        <span>
          { priceFormat( offer.price.toString() ) } ₽
          {/* {
            priceFormat(
              getCurrencyExchange(
                offer.price,
                Currencies.RUB,
                currency
              )
            )
          } ₽ */}
        </span>
      </p>

      <p className={classes.comment}>
        {offer.comment}
      </p>

      <div className={classes.contacts}>
        <Link
          to={
            getContactUrl(getPriorityContact(offer.dealer.contacts, true).typeId)
              .concat(
                getPriorityContact(offer.dealer.contacts, true).contact.startsWith('@')
                ? getPriorityContact(offer.dealer.contacts, true).contact.slice(1)
                : getPriorityContact(offer.dealer.contacts, true).contact
              )
          }
          target={getUrlTarget(getPriorityContact(offer.dealer.contacts, true).typeId)}
          className={cn(
            classes.contactButton,
            classes[getContactProvider(getPriorityContact(offer.dealer.contacts, true).typeId)]
          )}
        >
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref={`#${getContactProvider(getPriorityContact(offer.dealer.contacts, true).typeId)}`} />
          </svg>

          <span>
            {
              getPriorityContact(offer.dealer.contacts, true).typeId === 1
              ? 'Позвонить'
              : `Написать в ${humps.pascalize(getContactProvider(getPriorityContact(offer.dealer.contacts, true).typeId))}`
            }
          </span>
        </Link>

        {
          isAddContacts
          ? getPriorityContact(offer.dealer.contacts, false).map((contact) => (
            <Link
              to={
                getContactUrl(contact.typeId)
                  .concat(
                    contact.contact.startsWith('@')
                    ? contact.contact.slice(1)
                    : contact.contact
                  )
              }
              target={getUrlTarget(contact.typeId)}
              className={cn(
                classes.contactButton,
                classes[getContactProvider(contact.typeId)]
              )}
            >
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref={`#${getContactProvider(contact.typeId)}`} />
              </svg>

              <span>
                {
                  contact.typeId === 1
                  ? 'Позвонить'
                  : `Написать в ${humps.pascalize(getContactProvider(contact.typeId))}`
                }
              </span>
            </Link>
          ))
          : <button
            onClick={() => setIsAddContacts(true)}
            className={classes.addButton}
          >
            Дополнительные контакты
          </button>
        }
      </div>
    </div>
  );
};
