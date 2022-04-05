import { GetStaticProps } from "next";
import { CallHistoryPage } from "src/modules/callHistory/callHistoryPage";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      protected: true,
    },
  };
};

export default CallHistoryPage;
