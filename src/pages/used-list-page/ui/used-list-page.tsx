import { Layout } from "../../../widgets/layout";
import { UsedList } from "../../../widgets/used-list";

const UsedListPage = () => {
  return (
    <Layout
      isCitySwitch
      isUsedSwitch
    >
      <UsedList />
    </Layout>
  );
};

export default UsedListPage;
