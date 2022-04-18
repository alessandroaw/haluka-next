import { GetStaticProps } from "next";
import { CallHistoryAdminPage } from "src/modules/callHistory/callHistoryAdminPage";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      protected: true,
    },
  };
};

export default CallHistoryAdminPage;
