import { useState } from 'react';

import { Layout } from '../../../widgets/layout'
import { ModelInfo } from '../../../widgets/model-info';
import { OrderConfirmation } from '../../../widgets/order-confirmation';

const ModelPage = (): JSX.Element => {
  const [ confirmationMode, setConfirmationMode ] = useState(false);
  return (
    <Layout>
      {
        confirmationMode
        ? <OrderConfirmation cancelConfirmation={() => setConfirmationMode(false)} />
        : <ModelInfo setConfirmation={() => setConfirmationMode(true)} />
      }
    </Layout>
  )
}

export default ModelPage;
