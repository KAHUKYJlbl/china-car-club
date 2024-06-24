import { MYCARS_HEADING } from "../../../app/settings/headings";
import { Layout } from "../../../widgets/layout"
import { Mycars } from "../../../widgets/mycars";

const MycarsPage = (): JSX.Element => (
    <Layout
      heading={{
        heading: MYCARS_HEADING,
        subheading: null,
      }}
      newHeader
    >
      <Mycars />
    </Layout>
);

export default MycarsPage;
