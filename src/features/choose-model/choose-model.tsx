import { getCarsCount, getManufacturersLoadingStatus } from '../../entities/manufacturer';
import { useAppSelector } from '../../shared/lib/hooks/use-app-selector'
import { LoadingSpinner } from '../../shared/ui/loading-spinner';

export const ChooseModel = (): JSX.Element => {
  const carsCount = useAppSelector(getCarsCount);
  const loadingStatus = useAppSelector(getManufacturersLoadingStatus);

  if (loadingStatus.isLoading && !carsCount.manufacturersCount) {
    return <LoadingSpinner spinnerType='widget' />
  }

  return (
    <div>
      {carsCount.manufacturersCount} марок • {carsCount.seriesCount} моделей • {carsCount.specificationsCount} комплектаций
    </div>
  )
}
