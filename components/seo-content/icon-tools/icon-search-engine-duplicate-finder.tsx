import React from "react"

export default function IconSearchEngineDuplicateFinderSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Icon Search & Duplicate Finder Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter keywords describing the icon you need. The search engine scans multiple icon libraries simultaneously, returning results from all sources in one unified list.
          </p>
          <p>
            The duplicate finder analyzes downloaded icon collections to identify identical or similar icons. It compares file hashes for exact matches and uses visual similarity for near-duplicates.
          </p>
          <p>
            Review search results with preview thumbnails. Click to download icons in your preferred format. For duplicates, choose which copies to keep or delete. Organize your icon library efficiently.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building a design system</h3>
            <p className="text-sm text-muted-foreground">
              Collecting icons for your component library? Search across sources to find consistent styles. Remove duplicates to keep the system clean and maintainable.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning up downloaded packs</h3>
            <p className="text-sm text-muted-foreground">
              Downloaded multiple free icon packs over time? Find duplicates across folders. Delete redundant copies and organize what remains.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing client deliverables</h3>
            <p className="text-sm text-muted-foreground">
              Client needs a specific icon set? Search to find the best matches. Ensure no duplicates in the final delivery package. Professional presentation matters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Merging team icon libraries</h3>
            <p className="text-sm text-muted-foreground">
              Team members have separate icon collections? Merge them and find duplicates. Create one shared library everyone can use.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auditing website assets</h3>
            <p className="text-sm text-muted-foreground">
              Website uses icons from various sources? Audit the asset folder. Find duplicate icons that increase page weight unnecessarily.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Finding icon alternatives</h3>
            <p className="text-sm text-muted-foreground">
              Need a specific icon but want options? Search shows variations from multiple libraries. Compare styles before committing to one.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Search uses keyword matching.</strong>
              Results depend on icon metadata and tags. Use specific terms like "settings gear" not just "settings". More specific keywords yield better results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Duplicate detection has two modes.</strong>
              Exact duplicates match file hashes perfectly. Similar duplicates use visual comparison. Review similar matches manually before deleting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different formats aren't duplicates.</strong>
              An SVG and PNG of the same icon aren't flagged as duplicates. They serve different purposes. Only identical formats are marked.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Check licenses before using.</strong>
              Search results include license information. Some icons require attribution. Others are commercial-use only. Verify before using in projects.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Before deleting duplicates, check which one has better metadata or higher resolution. Keep the highest quality version and delete the rest.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which icon libraries are searched?</h3>
            <p className="text-sm text-muted-foreground">
              Searches popular free libraries including FontAwesome, Material Icons, Feather Icons, Heroicons, and more. Results show the source for each icon.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I search by uploading an image?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses keyword search only. For visual similarity search, use dedicated reverse image search tools or icon finder extensions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How does duplicate detection work?</h3>
            <p className="text-sm text-muted-foreground">
              Exact duplicates use file hash comparison - identical files have identical hashes. Similar duplicates compare visual features using image analysis algorithms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I recover deleted icons?</h3>
            <p className="text-sm text-muted-foreground">
              This tool doesn't delete files directly - it identifies duplicates for you to handle. Always verify before deleting. Keep backups of important collections.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Search results include SVG, PNG, ICO, and webfont formats. Duplicate detection works with all common image formats including SVG, PNG, JPG, and ICO.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a limit on search results?</h3>
            <p className="text-sm text-muted-foreground">
              Results are paginated for performance. Load more results as needed. Very common terms like "arrow" may return hundreds of options.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I filter by license type?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, filter results by license: free for commercial use, attribution required, or premium only. This helps find icons matching your project needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
