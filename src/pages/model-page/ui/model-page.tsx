import { useEffect, useState } from "react";

import { MAIN_HEADING, MAIN_SUBHEADING } from "../../../app/settings/headings";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { Layout } from "../../../widgets/layout";
import { ModelInfo, UsedModelInfo } from "../../../widgets/model-info";
import { OrderConfirmation } from "../../../widgets/order-confirmation";
import { resetOrder } from "../../../entities/order/model/order-slice";

const ModelPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [confirmationMode, setConfirmationMode] = useState(false);

  useEffect(() => {
    dispatch(resetOrder());
  }, []);

  return (
    <Layout
      heading={{
        heading: MAIN_HEADING,
        subheading: MAIN_SUBHEADING,
      }}
      isCitySwitch
    >
      {confirmationMode ? (
        <OrderConfirmation cancelConfirmation={() => setConfirmationMode(false)} />
      ) : window.location.pathname.includes("used") ? (
        <UsedModelInfo setConfirmation={() => setConfirmationMode(true)} />
      ) : (
        <ModelInfo setConfirmation={() => setConfirmationMode(true)} />
      )}
    </Layout>
  );
};

export default ModelPage;
