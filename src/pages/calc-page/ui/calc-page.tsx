import { Calculator } from '../../../widgets/calculator';
import { Header } from '../../../widgets/header';
import { Layout } from '../../../widgets/layout'

const CalcPage = (): JSX.Element => {
  return (
    <Layout>
      <Header />

      <Calculator />
    </Layout>
  )
}

export default CalcPage;
