import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoadingSpinner } from '../shared/ui/loading-spinner';
import { Oops } from '../widgets/oops';
import { AppRouter } from './provider/router';
import { store } from './provider/store/ui/store';

export default function App(): JSX.Element {
  return (
    <ErrorBoundary fallback={<Oops type='error-boundary' />}>
      <Suspense fallback={<LoadingSpinner spinnerType='page' />}>
        <Provider store={store}>
          <HelmetProvider>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
            <RouterProvider router={AppRouter} />
          </HelmetProvider>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  );
}
