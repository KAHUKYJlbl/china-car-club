import { SpecificationInfo } from '../../../features/choose-specification';
import { Currency } from '../../../entities/currency';
import { Gallery } from '../../../shared/ui/gallery';

import { InfoBar } from './info-bar';
import { Prices } from './prices';
import classes from './model-info.module.sass';

export const ModelInfo = (): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.gallery}>
        <Gallery />
      </div>

      <div className={classes.info}>
        <InfoBar />
      </div>

      <div className={classes.specification}>
        <SpecificationInfo />
      </div>

      <div className={classes.prices}>
        <Prices />
      </div>

      {/* <div className={classes.addOptions}>
        <AddOptions />
      </div> */}

      <div className={classes.currency}>
        <Currency />
      </div>

      {/* <div className={classes.buttons}>
        <OrderButtons />
      </div> */}
    </div>
  )
}
