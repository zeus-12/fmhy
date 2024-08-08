import { NextSeo } from "next-seo";
import Image from "next/image";

const Error404 = () => {
  return (
    <>
      <NextSeo title="404" description="Page not found" />

      <div className="flex w-full items-center justify-center">
        <Image
          width={300}
          height={300}
          className="h-[90vh] w-auto"
          src="/assets/404.svg"
          alt="error 404"
        />
      </div>
    </>
  );
};

export default Error404;
