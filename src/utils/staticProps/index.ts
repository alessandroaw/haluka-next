import { GetStaticProps } from "next";

export const getStaticAdminProtectedProp: GetStaticProps = async (context) => {
  return {
    props: {
      protected: true,
      role: 1,
    },
  };
};

export const getStaticCashierProtectedProp: GetStaticProps = async (
  context
) => {
  return {
    props: {
      protected: true,
      role: 2,
    },
  };
};
