import { MARKDOWN_RESOURCES } from "@/lib/constants";

const URL = "https://fmhy.vercel.app";
const PAGES = ["/search", "/feedback"];

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${PAGES.map((page) => {
       return `
        <url>
            <loc>${URL}${page}</loc>
        </url>
      `;
     }).join("")}
     ${MARKDOWN_RESOURCES.map((resource) => {
       if (resource.hasSubItems) {
         return resource.items
           .filter((item) => !item.useAbsoluteUrl)
           .map((item) => {
             return `
        <url>
            <loc>${URL}/${item.urlEnding}</loc>
        </url>
        `;
           })
           .join("");
       } else {
         const url = resource.urlEnding ? `${URL}/${resource.urlEnding}` : URL;
         return `
    <url>
        <loc>${url}</loc>
    </url>
    `;
       }
     }).join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: any }) {
  const sitemap = generateSiteMap();
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
