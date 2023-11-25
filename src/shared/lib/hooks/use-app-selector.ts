import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { State } from '../../../app/provider/store';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
