import { memo } from 'react';

import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { getShorts } from '../../../entities/model';

import classes from './info-bar.module.sass';

type InfoBarProps = {
  currentSpecification: number | null;
}

export const InfoBar = memo(
  ({currentSpecification} : InfoBarProps): JSX.Element => {
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
          <button className={classes.button}>
            История цены
          </button>

          <button className={classes.button}>
            Следить за скидками
          </button>
        </div>
      </div>
    )
  }
);
