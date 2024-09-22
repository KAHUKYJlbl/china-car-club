import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";

import { getIsNew } from "../model/settings-selectors";
import { setNew, setUsed } from "../model/settings-slice";

import classes from "./choose-new.module.sass";

type ChooseNewProps = {};

export const ChooseNew = ({}: ChooseNewProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isNew = useAppSelector(getIsNew);

  useEffect(() => {
    if (window.location.pathname.includes("used")) {
      dispatch(setUsed());
      return;
    }
    dispatch(setNew());
  }, []);

  return (
    <div className={classes.wrapper}>
      <button
        className={cn(isNew && classes.active)}
        onClick={() => {
          dispatch(setNew());
          navigate(window.location.pathname.slice(5) || "/");
        }}
      >
        Новые авто
      </button>

      <button
        className={cn(!isNew && classes.active)}
        onClick={() => {
          dispatch(setUsed());
          navigate(`/used${window.location.pathname}`);
        }}
      >
        Авто с пробегом
      </button>
    </div>
  );
};
