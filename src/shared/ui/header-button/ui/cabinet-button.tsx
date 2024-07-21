import classes from './cabinet-button.module.sass';

type CabinetButtonProps = {
  icon: string;
  callback: () => void;
};

export const CabinetButton = ({ icon, callback }: CabinetButtonProps) => {
  return (
    <div
    className={classes.wrapper}
    onClick={callback}
  >
      <svg
          width="16"
          height="16"
          aria-hidden="true"
        >
          <use xlinkHref={`#${icon}`} />
      </svg>
  </div>
);
};
