import { Outlet } from "react-router-dom";

import { MYCARS_HEADING } from "../../../app/settings/headings";
import { Layout } from "../../../widgets/layout";

const MycarsPage = (): JSX.Element => (
  <Layout
    heading={{
      heading: MYCARS_HEADING,
      subheading: null,
    }}
    isUsedSwitch
  >
    <Outlet />
  </Layout>
);

export default MycarsPage;
