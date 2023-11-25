import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../app/provider/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
