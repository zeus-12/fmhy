# Website for [FMHY](https://www.reddit.com/r/FREEMEDIAHECKYEAH/)

### Built using

- **Nextjs** For the frontend and serverless api routes
- **Typescript** For type safety
- **Tailwind CSS** For styling
- **Mantine UI** For components
- **Planetscale** As the database
- **Prisma** As the ORM
- **Cheerio** For parsing the HTMl
- **Plausible** For analytics

### Features:

- **Website**:
  - Detailed Wiki Page
  - Search
  - Guides page
  - Base64 page
- **Scraper**
  - Base 64, Wiki scrapers

Migrated frontend from [React version](https://github.com/zeus-12/fmhy-ui), and backend from [Express Version](https://github.com/zeus-12/fmhy-server), and the scraper from [Fmhy Scraper](https://github.com/zeus-12/fmhy-scraper)

### What needs to be fixed | Open issues

- reset scroll to zero upon changing wiki category: seems to be an open nextjs issue => try using the workarounds.
- add client-side search for wiki page => checkout nextra docs
- assign github-slugger-ids to each guide; also make the guides search filter-able by query params -> and add within search to spotlight
- toc seems to break at times
- hook the scrape script to vercel crons, and update the scraper scripts to only do table-drop if links are successfully fetched
- use stricter lint rules ,for eg: the dont use "!" to types rule
