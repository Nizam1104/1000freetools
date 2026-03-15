Now I have all the information. Let me create a comprehensive report by analyzing all fields
in PageData against what's actually being calculated:

    Report: PageData Fields Not Being Calculated/Updated

    After analyzing the entire codebase, here's a comprehensive list of `PageData` fields that
    are defined but NOT being calculated or updated properly:

    ---

    1. `linkDepthFromRoot` (Links section)
     - Defined in: types.ts:80
     - Current value: Always 0
     - Where hardcoded:
       - analysers/links.ts:146 - returns 0 with comment "Will be calculated post-crawl"
       - utils.ts:108 - in makeErrorPageData()
     - Issue: The findOrphanPages() function in siteAnalysis/orphanPages.ts already calculates
       this via BFS, but it's never called after the crawl completes to populate the field.

       1 is done
    ---

    2. `hasInterstitials` (Mobile section)
     - Defined in: types.ts:103
     - Current value: Always false
     - Where set: analysers/mobile.ts returns it from analyseMobile()
     - Issue: The detection logic in analyseMobile() uses getBoundingClientRect() and
       window.innerWidth, which don't work in a parsed DOM (no layout engine). This will always
       return false unless the page is rendered in a browser.

## 2 is done

    3. Fields in `ImageInfo` that are incomplete:


    ┌─────────────────────┬──────────────────────────────────────────────────────────────────┐
    │ Field               │ Issue                                                            │
    ├─────────────────────┼──────────────────────────────────────────────────────────────────┤
    │ width / height      │ Only reads from inline el.width which returns 0 in parsed DOM... │
    │ `hasDescriptiveF... │ Calculated but the pattern check is very basic                   │
    └─────────────────────┴──────────────────────────────────────────────────────────────────┘

## 3 is done

    4. Fields in `LinkInfo` that are incomplete:


    ┌────────────────┬────────────────────────────────────────────────────────────┐
    │ Field          │ Issue                                                      │
    ├────────────────┼────────────────────────────────────────────────────────────┤
    │ width / height │ Not applicable to links, but similar DOM limitations apply │
    └────────────────┴────────────────────────────────────────────────────────────┘

## 4 is done

    5. `inboundCount` (Not in PageData, but related)
     - Defined in: types.ts:220 (in OrphanPage)
     - Current value: Never populated on PageData objects
     - Issue: While referrers are tracked in CrawlState, the PageData.inboundCount field doesn't
       even exist. The OrphanPage interface has it, but it's not integrated back into PageData.

5 is done
---

    6. `urlKeywords` (URL section)
     - Defined in: analysers/urlAnalyser.ts:10 (in UrlAnalyserResult)
     - Issue: This is returned by analyseUrl() but NOT included in `PageData` interface at all!
       It's calculated but lost.

6 is done
---

    7. `viewportMeta` (Mobile section)
     - Defined in: types.ts:30
     - Current value: Being set correctly from analyseMobile(), but analyseMetaTags() also
       returns a viewportMeta that's being overwritten/ignored.

    ---

    8. `insecureResourceCount` (Security section)
     - Defined in: analysers/security.ts:12 (in SecurityResult)
     - Issue: Returned by analyseSecurity() but NOT included in `PageData` interface. The data is
        calculated but discarded.

    ---

    9. `urlKeywords` (Missing from PageData entirely)
     - Defined in: UrlAnalyserResult interface
     - Issue: The analyseUrl() function extracts keywords from URL segments but this field is not
        in `PageData`, so it's lost when results are merged.

    ---

    10. `schemaRaw` (Technical section)
     - Defined in: types.ts:93
     - Current value: Being populated correctly from analyseTechnical()
     - Note: This one IS being calculated, just noting it for completeness.

    ---

    Summary Table


    ┌────────────────┬─────────┬────────────┬───────────────────┬─────────────────────────────┐
    │ Field          │ Section │ Current... │ Should Be         │ Root Cause                  │
    ├────────────────┼─────────┼────────────┼───────────────────┼─────────────────────────────┤
    │ `linkDepthF... │ Links   │ Always 0   │ Calculated dep... │ findOrphanPages() never ... │
    │ `hasInterst... │ Mobile  │ Always ... │ Detect popups/... │ Requires runtime DOM, no... │
    │ `ImageInfo.... │ Images  │ Usually 0  │ Actual dimensions │ Requires layout engine      │
    │ inboundCount   │ (Orp... │ N/A for... │ Count of inter... │ Not integrated into Page... │
    │ urlKeywords    │ URL     │ Lost       │ Array of keywords │ Not in PageData interface   │
    │ `insecureRe... │ Secu... │ Lost       │ Count of insec... │ Not in PageData interface   │
    └────────────────┴─────────┴────────────┴───────────────────┴─────────────────────────────┘


    ---

    Key Architectural Issues

     1. Post-crawl analysis not integrated: The siteAnalysis/ module has functions to calculate
        depth, PageRank, etc., but these are never called after runCrawl() completes.

     2. Parsed DOM limitations: Several checks (hasInterstitials, image dimensions, tap target
        sizes) require a rendered DOM with layout, but the code uses DOMParser which doesn't
        layout the page.

     3. Interface mismatches: Some analyser results (urlKeywords, insecureResourceCount) aren't
        included in PageData, so the data is calculated then discarded.

     4. No inbound link count on PageData: While CrawlState.referrers tracks this during crawl,
        individual PageData objects don't have an inboundCount field.
