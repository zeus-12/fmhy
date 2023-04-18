import { useEffect, useState } from "react";

interface Base64ItemProps {
  title: string;
  hash: string;
  showDecoded: boolean;
}

const Base64Item: React.FC<Base64ItemProps> = ({
  title,
  hash,
  showDecoded,
}) => {
  const [showHashed, setShowHashed] = useState(!showDecoded);

  useEffect(() => {
    setShowHashed(!showDecoded);
  }, [showDecoded]);

  const getLinksFromHash = () => {
    try {
      const decoded = atob(hash);
      return decoded.split("\n");
    } catch (err) {
      throw new Error("Invalid base64 string");
    }
  };

  return (
    <div
      className="py-2 px-2 group"
      onMouseEnter={() => (!showDecoded ? setShowHashed(false) : () => {})}
      onMouseLeave={() => (!showDecoded ? setShowHashed(true) : () => {})}
    >
      <div className="flex gap-2 transition-all group-hover:animate-bounce">
        <p className="font-semibold text-lg">{title}</p>
      </div>

      {!showHashed ? (
        getLinksFromHash().map((link, index) => (
          <a
            key={index}
            className="break-words text-blue-300 block"
            target="_blank"
            rel="noreferrer"
            href={link}
          >
            <span className="pr-1">⭐️</span>
            {link}
          </a>
        ))
      ) : (
        <p className="break-words text-blue-300">{hash}</p>
      )}
    </div>
  );
};
export default Base64Item;
