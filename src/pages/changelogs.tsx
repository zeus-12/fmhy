import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getTableOfContents } from "@/lib/toc";
import WikiTableOfContents from "@/components/wiki/toc";
import { useState } from "react";
import { PanelRightOpen } from "lucide-react";

const Changelogs = ({ data, toc }: { data: string; toc: any }) => {
  const [isTocOpen, setIsTocOpen] = useState(false);

  return (
    <>
      <div className="px-1 sm:px-4 md:px-8 lg:px-14 xl:px-20 overflow-scroll hideScrollbar flex-1 2xl:max-w-7xl">
        <MarkdownRenderer category="changelogs" starredLinks={false}>
          {data}
        </MarkdownRenderer>
      </div>
      {toc?.items && toc?.items.length > 0 && (
        // temp fix
        <PanelRightOpen
          className="h-6 w-6 md:hidden text-gray-400 absolute right-4 hover:cursor-pointer"
          onClick={() => setIsTocOpen(true)}
        />
      )}
      <WikiTableOfContents toc={toc} open={isTocOpen} setOpen={setIsTocOpen} />
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/updates.json"
  );
  const data = (await res.json())?.data?.content_md;

  if (!data) {
    return {
      notFound: true,
    };
  }

  const toc = await getTableOfContents(data);
  return {
    props: {
      data,
      toc,
    },
  };
}

export default Changelogs;
