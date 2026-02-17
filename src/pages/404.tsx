import CategoriesSidebar from "@/components/wiki/categories-sidebar";
import { ChildResource } from "@/lib/constants";
import { NextSeo } from "next-seo";
import Image from "next/image";

const Error404 = () => {
  return (
    <>
      <NextSeo title="404" description="Page not found" />

      <CategoriesSidebar markdownCategory={{} as ChildResource} />

      <div className="flex flex-1 items-center justify-center">
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
