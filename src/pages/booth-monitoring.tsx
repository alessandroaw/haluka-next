import { GetStaticProps } from "next";
import { BoothMonitoringPage } from "src/modules/boothMonitoring/boothMonitoringPage";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      protected: true,
    },
  };
};

export default BoothMonitoringPage;
