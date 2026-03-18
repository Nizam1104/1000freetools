import React from "react"

export default function IconMetadataEditorOptimizerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Icon Metadata Editor Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your icon files - PNG, SVG, or ICO formats supported. The tool reads existing metadata including title, description, keywords, and copyright information.
          </p>
          <p>
            Edit metadata fields directly in the interface. Add or modify titles, descriptions, tags, author information, and license details. For SVG files, edit embedded metadata elements.
          </p>
          <p>
            Optimize file size by removing unnecessary metadata or compressing images. Preview changes before saving. Download optimized icons with clean, complete metadata for better organization and SEO.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Organizing icon libraries</h3>
            <p className="text-sm text-muted-foreground">
              Large icon collections become unmanageable without metadata. Add descriptive titles and tags. Search and filter icons quickly later.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing icons for sale</h3>
            <p className="text-sm text-muted-foreground">
              Selling icons on marketplaces? Proper metadata improves discoverability. Add keywords, categories, and descriptions buyers search for.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Documenting design systems</h3>
            <p className="text-sm text-muted-foreground">
              Design system icons need documentation. Embed usage guidelines in metadata. Include version numbers and deprecation notices.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Managing client deliverables</h3>
            <p className="text-sm text-muted-foreground">
              Client projects need organized assets. Add project names, usage rights, and contact info to metadata. Professional delivery includes proper documentation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing website icons</h3>
            <p className="text-sm text-muted-foreground">
              Search engines can read image metadata. Add alt text and descriptions to icon files. Improves image search visibility and accessibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning up downloaded icons</h3>
            <p className="text-sm text-muted-foreground">
              Downloaded icons often have messy metadata. Remove unwanted watermarks or credits. Add your own organization tags for internal use.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different formats store metadata differently.</strong>
              PNG uses tEXt chunks. SVG embeds metadata in XML. ICO has limited metadata support. Format affects what metadata can be stored.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Some metadata is automatic.</strong>
              Creation date and software info may be auto-added. You can remove or keep these. Consider privacy when sharing files publicly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Keywords improve searchability.</strong>
              Add relevant keywords for each icon. Think about how you'll search later. Include synonyms and related terms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Optimization can reduce file size.</strong>
              Removing unnecessary metadata shrinks files. Compression reduces size further. Balance between useful metadata and file size.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Create a metadata template for consistent icon sets. Use the same author, license, and project fields across all icons. Consistency makes large collections manageable.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What metadata fields are available?</h3>
            <p className="text-sm text-muted-foreground">
              Title, description, keywords/tags, author/creator, copyright, license, source URL, and creation date. SVG supports custom fields too.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does optimization affect quality?</h3>
            <p className="text-sm text-muted-foreground">
              Metadata removal doesn't affect image quality. Lossless compression preserves quality. Lossy compression reduces quality for smaller files - you control the setting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I edit multiple files at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool edits one file at a time. For batch metadata editing, use desktop tools like ExifTool or dedicated batch editors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will metadata survive web upload?</h3>
            <p className="text-sm text-muted-foreground">
              Some platforms strip metadata on upload. Social media often removes it. For websites you control, metadata is preserved in the file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is EXIF data supported?</h3>
            <p className="text-sm text-muted-foreground">
              EXIF is primarily for photos. Icons typically use XMP or simple text metadata. This tool focuses on icon-relevant metadata fields.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add custom fields?</h3>
            <p className="text-sm text-muted-foreground">
              SVG files support custom metadata elements. PNG and ICO have limited custom field support. SVG offers the most flexibility for custom data.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I view existing metadata?</h3>
            <p className="text-sm text-muted-foreground">
              Upload the file and the tool displays all existing metadata. Review before editing. See what information is already embedded in the file.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
