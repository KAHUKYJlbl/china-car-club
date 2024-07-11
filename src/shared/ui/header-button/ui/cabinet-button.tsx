import classes from './cabinet-button.module.sass';

type CabinetButtonProps = {
  icon: string;
};

export const CabinetButton = ({ icon }: CabinetButtonProps) => {
  return (
    <div
    className={classes.wrapper}
    onClick={() => null}
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
