import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

export const getSpecifications = createSelector(
  (state: State) => state[NameSpace.Specification].specifications,
  (specifications) => specifications.map((specification) => ({
    name: specification.name.ru || specification.name.ch,
    id: specification.id
  }))
);

export const getSpecificationsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Manufacturer].manufacturersLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
