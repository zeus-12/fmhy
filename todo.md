## wiki page

- try adding loading when staticprops is loading, since im using isr(if not, switch to it => should bring down build time)
- add search for wiki page => checkout nextra docs
- add drawer for new tableofcontents, delete old tableofcontents file. also make it autoscrollable with content
- migrate search to nextapi router

## wiki page bugs from migration

- fix layout on wiki page -> remove all calcs --> top priority
- refreshing a search result page should fetch reftch results as well
- fix seo and give better head-title for each page

## general

- auth? for guide-queue, and links queue
- create new fn to only console.log on dev
- make guides fitered by query params -> and add it to spotlight
