import { Layout } from "../../../widgets/layout";
import { UsedList } from "../../../widgets/used-list";

const UsedListPage = () => {
  return (
    <Layout
      heading={{ heading: "", subheading: "" }}
      isCitySwitch
      isUsedSwitch
    >
      <UsedList />
    </Layout>
  );
};

export default UsedListPage;
