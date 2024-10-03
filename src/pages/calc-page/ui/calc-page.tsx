import { Calculator } from "../../../widgets/calculator";
import { Layout } from "../../../widgets/layout";

const CalcPage = (): JSX.Element => {
  return (
    <Layout
      isCitySwitch
      isUsedSwitch
    >
      <Calculator />
    </Layout>
  );
};

export default CalcPage;
