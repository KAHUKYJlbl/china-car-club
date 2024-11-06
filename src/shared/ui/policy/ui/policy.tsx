import { useEffect } from "react";

import { useAppSelector } from "../../../lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../lib/hooks/use-app-dispatch";
import { fetchSettings, getPolicy, getSettingsLoadingStatus } from "../../../../entities/settings";
import { LoadingSpinner } from "../../loading-spinner";

type PolicyProps = {};

export const Policy = ({}: PolicyProps) => {
  const dispatch = useAppDispatch();

  const policyUrl = useAppSelector(getPolicy);
  const settingsLoadingstatus = useAppSelector(getSettingsLoadingStatus);

  useEffect(() => {
    if (settingsLoadingstatus.isIdle) {
      dispatch(fetchSettings());
    }
  }, []);

  useEffect(() => {
    if (settingsLoadingstatus.isSuccess) {
      window.open(
        `${process.env.STATIC_URL || `${window.location.origin}/storage`}${policyUrl}`,
        "_self",
        "noreferrer"
      );
    }
  }, [settingsLoadingstatus.isSuccess]);

  return (settingsLoadingstatus.isIdle || settingsLoadingstatus.isLoading) && <LoadingSpinner spinnerType="page" />;
};
