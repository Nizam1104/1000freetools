import React from "react"

export default function MarkdownTableOfContentsGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Markdown TOC Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your Markdown document into the input field. The generator scans for headers (# through ######) and builds a table of contents automatically. Results update as you type.
          </p>
          <p>
            Choose your format: Bullet List creates indented bullet points, Numbered List uses sequential numbers, Inline Links places all links on one line separated by pipes. Each format suits different documentation styles.
          </p>
          <p>
            Anchor links are generated automatically from header text. Spaces become hyphens, special characters are removed. The preview shows how the TOC will render. Copy the generated TOC and paste it at the top of your document.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating README navigation</h3>
            <p className="text-sm text-muted-foreground">
              Your project README has grown to 500+ lines. Add a TOC so users can jump to Installation, Usage, API, or Examples sections quickly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing technical documentation</h3>
            <p className="text-sm text-muted-foreground">
              Long documentation needs navigation. Generate a TOC for your user guide, API reference, or tutorial series to improve findability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating GitHub wiki pages</h3>
            <p className="text-sm text-muted-foreground">
              GitHub wikis support Markdown with anchor links. A TOC makes multi-section wiki pages navigable without relying on browser outline features.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing blog posts in Markdown</h3>
            <p className="text-sm text-muted-foreground">
              Static site generators like Jekyll and Hugo use Markdown. Add a TOC to long-form blog posts for better reader experience and SEO.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating course materials</h3>
            <p className="text-sm text-muted-foreground">
              Your course notes span multiple topics. A TOC helps students navigate between lessons, exercises, and reference sections efficiently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Maintaining changelog files</h3>
            <p className="text-sm text-muted-foreground">
              Long changelogs benefit from version navigation. Generate a TOC linking to each version section for quick release note access.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Anchor links must match your platform.</strong>
              GitHub, GitLab, and BitBucket generate slightly different anchors. This tool uses GitHub-style anchors. Verify links work on your target platform.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters are stripped.</strong>
              "What's New?" becomes "whats-new". Question marks, exclamation points, and punctuation are removed from anchor IDs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Duplicate headers get same anchor.</strong>
              Two "Installation" headers both link to #installation. The second one won't scroll correctly. Make headers unique for reliable navigation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Inline format works for summaries.</strong>
              Inline links (Header1 | Header2 | Header3) are compact but less scannable. Use for short documents or summary sections.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Place your TOC after the title but before the introduction. Readers expect navigation at the top. Update the TOC whenever you add or rename sections.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work with GitHub Flavored Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. GitHub-style anchors are the default. Links work in GitHub READMEs, Issues, and Gists. GitLab and most other platforms use compatible formats.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I exclude certain headers from the TOC?</h3>
            <p className="text-sm text-muted-foreground">
              This tool includes all headers. To exclude some, manually edit the generated TOC. Some static site generators support TOC exclusion via comments.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What header levels are included?</h3>
            <p className="text-sm text-muted-foreground">
              All levels from h1 (#) through h6 (######) are included. Deep nesting (beyond h4) is rare but supported.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I update the TOC when I change headers?</h3>
            <p className="text-sm text-muted-foreground">
              Regenerate the TOC with the updated document. Replace the old TOC with the new one. Some editors have plugins that auto-update TOCs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I customize the anchor format?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses standard GitHub anchors. For custom formats, you'd need to modify the generated TOC manually or use a different tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does numbered list restart at each level?</h3>
            <p className="text-sm text-muted-foreground">
              No, numbering is sequential throughout (1, 2, 3...). For nested numbering (1, 1.1, 1.2), you'd need to edit manually after generation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Will the TOC work in PDF exports?</h3>
            <p className="text-sm text-muted-foreground">
              Markdown-to-PDF tools handle anchor links differently. Some preserve them, some don't. Test your specific export toolchain for PDF compatibility.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
