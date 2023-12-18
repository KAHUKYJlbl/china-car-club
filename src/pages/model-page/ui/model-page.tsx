import { Header } from '../../../widgets/header'
import { Layout } from '../../../widgets/layout'
import { ModelInfo } from '../../../widgets/model-info';

const ModelPage = (): JSX.Element => {
  return (
    <Layout>
      <Header />

      <ModelInfo />
    </Layout>
  )
}

export default ModelPage;
