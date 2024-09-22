import { MAIN_HEADING, MAIN_SUBHEADING } from "../../../app/settings/headings";
import { Calculator } from "../../../widgets/calculator";
import { Layout } from "../../../widgets/layout";

const CalcPage = (): JSX.Element => {
  return (
    <Layout
      heading={{
        heading: MAIN_HEADING,
        subheading: MAIN_SUBHEADING,
      }}
      isCitySwitch
      isUsedSwitch
    >
      <Calculator />
    </Layout>
  );
};

export default CalcPage;
