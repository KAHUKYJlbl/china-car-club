import { useState } from "react";

import { Layout } from "../../../widgets/layout";
import { ModelInfo, UsedModelInfo } from "../../../widgets/model-info";
import { OrderConfirmation } from "../../../widgets/order-confirmation";

const ModelPage = (): JSX.Element => {
  const [confirmationMode, setConfirmationMode] = useState(false);

  return (
    <Layout isCitySwitch>
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
