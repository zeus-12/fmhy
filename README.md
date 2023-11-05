# Website for [FMHY](https://www.reddit.com/r/FREEMEDIAHECKYEAH/)

## Built using

- **Nextjs** For the frontend and serverless api routes
- **Typescript** For type safety
- **Tailwind CSS** For styling
- **Mantine UI** For components
- **Planetscale** As the database
- **Prisma** As the ORM
- **Cheerio** For parsing the HTML (Old scraper)
- **Plausible** For analytics

## Features:

- **Website**:
  - Detailed Wiki Page
  - Search
  - Guides page
  - Base64 page
- **Scraper**
  - Base 64, Wiki scrapers

Migrated frontend from [React version](https://github.com/zeus-12/fmhy-ui), and backend from [Express Version](https://github.com/zeus-12/fmhy-server), and the scraper from [Fmhy Scraper](https://github.com/zeus-12/fmhy-scraper)

## What needs to be fixed | Open issues

### Common

- reset scroll to zero upon changing wiki category: seems to be an open nextjs issue => try using the workarounds.
- move dl-wiki script into a cron job
- add sitemap, all that good seo stuff
- use stricter lint rules ,for eg: the dont use "!" to types rule

### Design

- TYPOGRAPHY => spend some time on fixing the typography => look into shadcn-typography. better replace mantine w. shadcn. (toc drawer also needs a new design)
- stlye /base64 similar to /oldbase64

### Markdown related

- see if dom issues can be fixed eg: (Warning: Received `true` for a non-boolean attribute `inline`.), probably can be fixed w. some remark package.

### Search

- remove db search
- add a "copy item as markdown" button right next to each entry in search.
- on clicking the category of any items in search results, make sure to add the current searchq to the url history. that way when the user goes back, the previous results shows
- use react-virtualised, and remove limits for the search
- assign github-slugger-ids to each guide; also make the guides search filter-able by query params -> and add within search to spotlight
