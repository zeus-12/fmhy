import { GetServerSidePropsContext } from "next";

const WikiHome = () => {
  return <></>;
};
export default WikiHome;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  context.res.writeHead(302, { Location: "/wiki/home" });
  context.res.end();

  return {};
};
