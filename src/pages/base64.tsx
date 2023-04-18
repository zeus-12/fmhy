import { Switch } from "@mantine/core";
import { useEffect, useState } from "react";
import Base64Item from "@/components/Base64Item";
import { SERVER_URL } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";

interface Base64LinksType {
  _id: string;
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
    const res = await fetch(`${SERVER_URL}/api/hashed-links?page=${page}`);
    const data = await res.json();
    return data.data;
  };

  const {
    data: links,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["base64"],
    queryFn: fetchBase64Links,
  });

  return (
    <div className="px-6">
      <div className="flex justify-between">
        <p className="text-2xl sm:text-3xl font-semibold tracking-tighter">
          <span className="text-cyan-400">Base 64</span> Encoded links
        </p>
        <Switch
          label="Change all"
          checked={decodeAllLinks}
          onChange={toggleDecodeAllLinks}
        />
      </div>
      {error ? <p>Something went wrong!</p> : <></>}
      {isLoading ? <p>Loading...</p> : <></>}

      {links &&
        links?.map((link: Base64LinksType, index: number) => (
          <Base64Item
            key={index}
            title={link.title}
            hash={link.hash}
            showDecoded={decodeAllLinks}
          />
        ))}
    </div>
  );
};
export default Base64;
