import { Switch } from "@mantine/core";
import { useState } from "react";
import Base64Item from "@/components/Base64Item";
import { useQuery } from "@tanstack/react-query";
import { devLog } from "@/lib/utils";

export interface Base64LinksType {
  id: string;
  title: string;
  hash: string;
}

const Base64 = () => {
  const [page, setPage] = useState(1);
  const [decodeAllLinks, setDecodeAllLinks] = useState(false);

  const toggleDecodeAllLinks = () => {
    setDecodeAllLinks(!decodeAllLinks);
  };

  const fetchBase64Links = async () => {
    try {
      const res = await fetch(`/api/base64`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      devLog(err);
    }
  };

  const {
    data: links,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["base64"],
    queryFn: fetchBase64Links,
  });

  return (
    <div
      className="
    sm:p-4 sm:px-8 md:px-12 lg:px-16 md:py-2 lg:py-4 xl:py-6 pt-0 flex-1 flex flex-col mx-auto w-[95vw] max-w-[80rem]
    "
    >
      <div className="flex justify-between items-center px-2">
        <p className="text-2xl sm:text-3xl font-semibold tracking-tighter">
          <span className="text-cyan-400">Base 64</span> links
        </p>
        <Switch
          label="Change all"
          checked={decodeAllLinks}
          onChange={toggleDecodeAllLinks}
        />
      </div>
      {isError && <p>Something went wrong!</p>}
      {isLoading && <p>Loading...</p>}

      {links &&
        links?.map((link: Base64LinksType) => (
          <Base64Item
            key={link.id}
            title={link.title}
            hash={link.hash}
            showDecoded={decodeAllLinks}
          />
        ))}
    </div>
  );
};
export default Base64;
