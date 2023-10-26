# Website for [FMHY](https://www.reddit.com/r/FREEMEDIAHECKYEAH/)

### Built using

- **Nextjs** For the frontend and serverless api routes
- **Typescript** For type safety
- **Tailwind CSS** For styling
- **Mantine UI** For components
- **Planetscale** As the database
- **Prisma** As the ORM
- **Cheerio** For parsing the HTML (Old scraper)
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
- move dl-wiki script into a cron job
- look into IntersectionObserver fn inside toc.tsx => seems to be causing some issues
- assign github-slugger-ids to each guide; also make the guides search filter-able by query params -> and add within search to spotlight
- use stricter lint rules ,for eg: the dont use "!" to types rule
- TYPOGRAPHY => spend some time on fixing the typography => look into shadcn-typography
- use react-virtualised, and remove limits for the search
- see if dom issues can be fixed eg: (Warning: Received `true` for a non-boolean attribute `inline`.), probably some remark issue
- highlight the searched word in /lsearch
- on clicking the wiki link in /lsearch => upon redirecting to that page, highlight the searched word
- add sitemap, all that good seo stuff
- toc stops working once u click on any of the toc links
