import Head from "next/head";

export const HalukaTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Head>
      <title>Haluka | {title}</title>
    </Head>
  );
};
