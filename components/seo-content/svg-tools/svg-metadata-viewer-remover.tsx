import React from "react"

export default function SvgMetadataViewerRemoverSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How SVG Metadata Viewing and Removal Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            SVG files often contain hidden metadata - information about the creator, creation date, software used, and more. This tool parses your SVG and displays all metadata elements, then lets you strip them out for cleaner, smaller files.
          </p>
          <p>
            Metadata in SVG lives in several places: the <code>&lt;metadata&gt;</code> element (intended for RDF/XML data), comments (<code>&lt;!-- --&gt;</code>), and software-specific elements like <code>&lt;sodipodi:namedview&gt;</code> or <code>&lt;inkscape:...</code>. The viewer extracts and displays all of these.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Common metadata found in SVGs:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Creator/author name and contact information</li>
              <li>Creation and modification timestamps</li>
              <li>Software used (Adobe Illustrator, Inkscape, Figma export data)</li>
              <li>Document title, description, and keywords</li>
              <li>Copyright and license information</li>
              <li>Layer names and structure (from design software)</li>
              <li>Guides, grids, and editor settings</li>
            </ul>
          </div>
          <p>
            The remover strips selected metadata while preserving the visual content. You can choose what to keep (maybe copyright info) and what to delete (editor-specific junk). The cleaned SVG renders identically but with reduced file size.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reducing SVG file size for web</h3>
            <p className="text-sm text-muted-foreground">
              Design software exports SVGs bloated with editor metadata. An icon might be 5KB of paths and 15KB of Inkscape settings. Strip the metadata and cut file size by 70% - faster page loads.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Privacy before sharing client work</h3>
            <p className="text-sm text-muted-foreground">
              Your SVG contains your name, email, or internal project codes in metadata. Before sending to clients or publishing publicly, remove identifying information you don't want exposed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning up exported assets</h3>
            <p className="text-sm text-muted-foreground">
              Figma, Sketch, and Adobe exports include software-specific metadata. It's useless in production and adds bloat. Run exports through this tool as part of your asset pipeline.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auditing SVGs from third parties</h3>
            <p className="text-sm text-muted-foreground">
              Downloaded an SVG from a stock site? Check the metadata - it might reveal the original creator, license terms, or source URL. Useful for attribution requirements or verifying authenticity.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Removing editor-specific elements</h3>
            <p className="text-sm text-muted-foreground">
              Inkscape's <code>&lt;sodipodi:guides&gt;</code> or Illustrator's <code>&lt;ai:...</code> elements clutter your SVG. They don't affect rendering but make the file harder to read and edit manually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing SVGs for version control</h3>
            <p className="text-sm text-muted-foreground">
              Metadata changes on every save (timestamps, undo history). This creates noise in git diffs. Strip volatile metadata so commits only reflect actual design changes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some metadata is useful.</strong>
              Copyright notices, license info, and attribution data might be legally required to keep. Review before blindly removing everything. When in doubt, keep rights-related metadata.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Layer names might be lost.</strong>
              Design software stores layer names in metadata. If you plan to edit the SVG later in the same software, keeping layer info helps. For final production assets, layers don't matter.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Comments aren't always metadata.</strong>
              Some SVGs have comments with useful notes ("TODO: fix alignment", "Color approved by client"). The tool shows all comments - review before removing in case there's important context.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">ID attributes aren't metadata.</strong>
              Element IDs like <code>id="Layer_1"</code> are part of the SVG structure, not metadata. They're preserved unless you explicitly remove them. IDs are needed for CSS/JS targeting and internal references.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Keep a "master" version with all metadata for archival purposes. Create cleaned "production" versions for web use. You'll thank yourself when you need to find the original creator later.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will removing metadata break my SVG?</h3>
            <p className="text-sm text-muted-foreground">
              No, metadata is purely informational. Removing <code>&lt;metadata&gt;</code>, comments, and editor-specific elements doesn't affect rendering. The SVG looks identical but is smaller and cleaner.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How much size reduction can I expect?</h3>
            <p className="text-sm text-muted-foreground">
              Depends on the source. Simple icons from Figma might drop from 8KB to 3KB. Complex Illustrator exports with extensive metadata could shrink by 50-80%. The viewer shows exact sizes before and after.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I selectively remove only certain metadata?</h3>
            <p className="text-sm text-muted-foreground">
              Some tools offer granular control (remove timestamps but keep author). If this tool is all-or-nothing, do selective editing in a text editor - search for specific elements and delete manually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about XMP metadata?</h3>
            <p className="text-sm text-muted-foreground">
              XMP (Extensible Metadata Platform) is a standardized metadata format often embedded in SVGs. It's typically inside the <code>&lt;metadata&gt;</code> element as RDF/XML. The remover handles XMP along with other metadata.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this remove tracking pixels or external references?</h3>
            <p className="text-sm text-muted-foreground">
              No, this tool focuses on metadata elements. External references (like <code>&lt;image xlink:href="http://..."/&gt;</code>) or scripts are separate security concerns. Use an SVG sanitizer for those.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I recover removed metadata?</h3>
            <p className="text-sm text-muted-foreground">
              Not from the cleaned file - removal is permanent. Always keep the original if you might need the metadata later. Consider adding metadata removal to your build process, not your source files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is metadata removal enough for security?</h3>
            <p className="text-sm text-muted-foreground">
              For most cases, yes. But SVGs can also contain scripts, external resource references, or embedded HTML. For untrusted SVGs, use a dedicated SVG sanitizer that removes executable content.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
