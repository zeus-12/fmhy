import Link from "@/components/Link";

const GuideItem: React.FC<{ title: string; link: string }> = ({
  title,
  link,
}) => {
  return (
    <div className="guide-item my-2 rounded-xl px-4 py-2">
      <div>
        <div className="flex justify-between items-center pt-2">
          <Link className="inline" style={{ fontSize: "1.1rem" }} href={link}>
            {title}
            {/* {data.nsfw && <Badge color="red">NSFW</Badge>} */}
          </Link>
        </div>

        {/* <div className="flex items-center gap-2">
          {data.tags &&
            JSON.parse(data.tags).map((tag: string, index: number) => (
              <Badge key={index}>{tag}</Badge>
            ))}

          {data.credits && <p className="m-0">🙏 {data.credits}</p>}
        </div> */}
      </div>
    </div>
  );
};

export default GuideItem;
