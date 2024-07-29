import classes from './cabinet-button.module.sass';

type CabinetButtonProps = {
  icon: string;
  labelCount?: number;
  callback: () => void;
};

export const CabinetButton = ({ icon, callback, labelCount }: CabinetButtonProps) => {
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

      {
        !!labelCount &&
        <p className={classes.labelCount}>
          {labelCount}
        </p>
      }

  </div>
);
};
