import { useParams } from 'react-router-dom';

import classes from './specification-info.module.sass';

export const SpecificationInfo = (): JSX.Element => {
  const { modelId } = useParams();

  return (
    <div className={classes.class}>
      div
    </div>
  )
}
