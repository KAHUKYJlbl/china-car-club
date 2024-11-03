import { useNavigate } from "react-router-dom";
import cn from "classnames";

import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";

import { getCurrentSiteMode, getSiteModes } from "../model/settings-selectors";
import { setCurrentSiteMode } from "../model/settings-slice";

import classes from "./choose-site-mode.module.sass";
import { getBasepath } from "../lib/get-basepath";
import { SiteModeType } from "../lib/types";

type ChooseSiteModeProps = {};

export const ChooseSiteMode = ({}: ChooseSiteModeProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const siteModes = useAppSelector(getSiteModes);
  const currentSiteMode = useAppSelector(getCurrentSiteMode);

  const clickHandler = (mode: SiteModeType) => {
    if (currentSiteMode !== mode.id) {
      dispatch(setCurrentSiteMode(mode.id));
      navigate(getBasepath(mode.id));
    }
  };

  return (
    <>
      {siteModes.length > 1 && (
        <div className={classes.wrapper}>
          {siteModes.map((mode) => (
            <button
              key={mode.id}
              className={cn(mode.id === currentSiteMode && classes.active)}
              onClick={() => clickHandler(mode)}
            >
              {mode.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
