import { Switch } from "@mantine/core";
import { useEffect, useState } from "react";
import Base64Item from "@/components/Base64Item";
import { SERVER_URL } from "@/lib/config";

interface Base64LinksType {
  _id: string;
  title: string;
  hash: string;
}

const Base64 = () => {
  const [page, setPage] = useState(1);
  const [links, setLinks] = useState<null | Base64LinksType[]>(null);
  console.log(links);
  const [decodeAllLinks, setDecodeAllLinks] = useState(false);

  const toggleDecodeAllLinks = () => {
    setDecodeAllLinks(!decodeAllLinks);
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch(`${SERVER_URL}/api/hashed-links?page=${page}`);
      const data = await res.json();
      setLinks(data.data);
    };
    fetchLinks();
  }, []);

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
      {links ? (
        links?.map((link, index) => (
          <Base64Item
            key={index}
            title={link.title}
            hash={link.hash}
            showDecoded={decodeAllLinks}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Base64;
