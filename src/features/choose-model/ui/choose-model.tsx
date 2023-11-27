import { getCarsCount, getManuacturersList, getManufacturersLoadingStatus } from '../../../entities/manufacturer';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector'
import { Dropdown } from '../../../shared/ui/dropdown';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

import classes from './choose-model.module.sass';

export const ChooseModel = (): JSX.Element => {
  const carsCount = useAppSelector(getCarsCount);
  const loadingStatus = useAppSelector(getManufacturersLoadingStatus);
  const manufacturersList = useAppSelector(getManuacturersList);

  if (loadingStatus.isLoading || !carsCount.manufacturersCount || !manufacturersList) {
    return <LoadingSpinner spinnerType='widget' />
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.count}>
        {carsCount.manufacturersCount} марок • {carsCount.seriesCount} моделей • {carsCount.specificationsCount} комплектаций
      </div>

      <div className={classes.controls}>
        <Dropdown current={undefined} placeholder={'Марка'} list={manufacturersList} />

        <Dropdown current={undefined} placeholder={'Модель'} list={manufacturersList}  />
      </div>
    </div>
  )
}
