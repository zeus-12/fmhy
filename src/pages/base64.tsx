import { Switch } from "@mantine/core";
import { useState } from "react";
import Base64Item from "@/components/Base64Item";
import { SERVER_URL } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";

interface Base64LinksType {
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
      console.log(err);
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
