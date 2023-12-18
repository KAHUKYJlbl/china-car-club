import { useMediaQuery } from 'react-responsive';

import { ChooseOptions } from '../../../features/choose-options';
import { SpecificationInfo } from '../../../features/choose-specification';
import { Currency } from '../../../entities/currency';
import { Gallery } from '../../../shared/ui/gallery';

import { InfoBar } from './info-bar';
import { Prices } from './prices';
import { OrderButtons } from './order-buttons';
import classes from './model-info.module.sass';

export const ModelInfo = (): JSX.Element => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1281px)' });

  return (
    <div className={classes.wrapper}>
      <div className={classes.gallery}>
        <Gallery />
      </div>

      {
        isDesktop &&
        <div className={classes.info}>
          <InfoBar />
        </div>
      }

      <div className={classes.specification}>
        <SpecificationInfo />
      </div>

      <div className={classes.prices}>
        <Prices />
      </div>

      <div className={classes.addOptions}>
        <ChooseOptions />
      </div>

      <div className={classes.currency}>
        <Currency />
      </div>

      <div className={classes.buttons}>
        <OrderButtons />
      </div>
    </div>
  )
}
