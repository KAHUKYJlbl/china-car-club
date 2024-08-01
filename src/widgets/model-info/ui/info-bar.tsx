import { memo } from 'react';

import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { getShorts } from '../../../entities/model';

import classes from './info-bar.module.sass';

type InfoBarProps = {
  currentSpecification: number | null;
  setIsTechs: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPriceHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InfoBar = memo(
  ({ currentSpecification, setIsTechs, setIsPriceHistory } : InfoBarProps): JSX.Element => {
    const shorts = useAppSelector((state) => getShorts(state, currentSpecification));

    if (!shorts) {
      return <div>Loading ...</div>
    }

    return (
      <div className={classes.wrapper}>
        <p className={classes.specs}>
          {Object.values(shorts).join(' • ')}
        </p>

        <div className={classes.row}>
          <button
            aria-label='характеристики'
            className={classes.button}
            onClick={() => setIsTechs((current) => !current)}
          >
            Характеристики
          </button>

          <button
            aria-label='история цены'
            className={classes.button}
            onClick={() => setIsPriceHistory((current) => !current)}
          >
            История цены
          </button>

          <button
            aria-label='следить за скидками'
            className={classes.button}
          >
            Следить за скидками
          </button>
        </div>
      </div>
    )
  }
);
