import { Watch } from 'react-loader-spinner';
import classes from './loading-spinner.module.sass';

const spinnerTypes = {
  page: {
    height: '160',
    width: '160',
    color: '#7E7E7E',
    wrapperStyle: {
      height: '75vh',
    },
  },
  widget: {
    height: '80',
    width: '80',
    color: '#7E7E7E',
    wrapperStyle: {
      height: '100%'
    },
  },
  button: {
    height: '24',
    width: '24',
    color: '#1D1D1F',
    wrapperStyle: {
      height: '100%'
    },
  }
};

type LoadingSpinnerProps = {
  spinnerType: keyof typeof spinnerTypes;
}

export function LoadingSpinner ({spinnerType}: LoadingSpinnerProps): JSX.Element {
  return (
    <Watch
      height={spinnerTypes[spinnerType].height}
      width={spinnerTypes[spinnerType].width}
      radius="48"
      color={spinnerTypes[spinnerType].color}
      ariaLabel="watch-loading"
      wrapperStyle={spinnerTypes[spinnerType].wrapperStyle}
      wrapperClass={classes.container}
      visible
    />
  );
}
