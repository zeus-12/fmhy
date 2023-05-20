## wiki page

- "Update toc on scroll",
- "same h2 names =>SAME ID - eg: in edupiracy guides",
- "add base64, instead of scrape-store_to_db-fetch",
- redirect to diff page not working. eg:
  https://www.fmhy.ml/wiki/audiopiracyguide#audio_tools : solution do the same checks in h2renderer to h1. (or just use the same fn for both ) : similarly for h3 and h4

## wiki page bugs from migration

- fix seo and give better head-title for each page
- cant share search result
- fix layout on wiki page -> remove all calcs

## general

- auth? for guide-queue, and links queue

## points to remember

- guides, wiki is using getstaticprops: so remember to update the revalidate time as required
