import cn from "classnames";

import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";

import { getIsNew } from "../model/settings-selectors";
import { setNew, setUsed } from "../model/settings-slice";

import classes from "./choose-new.module.sass";

type ChooseNewProps = {};

export const ChooseNew = ({}: ChooseNewProps) => {
  const dispatch = useAppDispatch();
  const isNew = useAppSelector(getIsNew);

  return (
    <div className={classes.wrapper}>
      <button
        className={cn(isNew && classes.active)}
        onClick={() => dispatch(setNew())}
      >
        Новые авто
      </button>

      <button
        className={cn(!isNew && classes.active)}
        onClick={() => dispatch(setUsed())}
      >
        Авто с пробегом
      </button>
    </div>
  );
};
