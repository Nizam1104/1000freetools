import React from "react"

export default function MarkdownLinkGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool generates proper Markdown link syntax from your URL and
            link text. Instead of manually typing <code className="font-mono bg-background px-1.5 py-0.5 rounded">[link text](https://example.com)</code>,
            you enter the components and the tool creates correctly formatted
            link code.
          </p>
          <p>
            The generator supports multiple link types: inline links,
            reference-style links, and URL-only links. It can also validate
            URLs to catch typos before you publish your Markdown.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Link types supported:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Inline: <code className="font-mono bg-background px-1.5 py-0.5 rounded">[text](url)</code> - Most common format</li>
              <li>Reference: <code className="font-mono bg-background px-1.5 py-0.5 rounded">[text][ref]</code> with <code className="font-mono bg-background px-1.5 py-0.5 rounded">[ref]: url</code> - Cleaner for repeated links</li>
              <li>Autolink: <code className="font-mono bg-background px-1.5 py-0.5 rounded">&lt;https://example.com&gt;</code> - Shows full URL</li>
              <li>Email: <code className="font-mono bg-background px-1.5 py-0.5 rounded">&lt;email@example.com&gt;</code> - Creates mailto links</li>
            </ul>
          </div>
          <p>
            Enter your URL and link text, choose the link type, and copy the
            generated syntax. Some tools also validate URLs and let you test
            links before using them.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Adding citations to documentation</h3>
            <p className="text-sm text-muted-foreground">
              A technical writer adds references to external docs. They use
              this generator to create properly formatted links with
              descriptive text, ensuring all citations follow consistent
              formatting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating resource lists with many links</h3>
            <p className="text-sm text-muted-foreground">
              Someone compiles a list of resources with URLs. The generator
              speeds up link creation, especially for reference-style links
              where the same URL appears multiple times.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building README files with badges and links</h3>
            <p className="text-sm text-muted-foreground">
              A developer adds badges and links to their GitHub README. They
              generate link syntax for each badge and external resource,
              ensuring proper formatting without manual typing errors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Writing blog posts with source links</h3>
            <p className="text-sm text-muted-foreground">
              A blogger references multiple sources in their posts. They use
              the generator to create consistent link formatting throughout,
              making it easy to update URLs later if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating navigation in Markdown docs</h3>
            <p className="text-sm text-muted-foreground">
              Someone builds a documentation site in Markdown. They generate
              links for the navigation structure, including internal links to
              other Markdown files and external resource links.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating links before publishing</h3>
            <p className="text-sm text-muted-foreground">
              A content creator checks URLs before adding them to docs. The
              generator's URL validation catches typos and broken links before
              they're published, preventing 404 errors.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Link text should be descriptive.</strong>
              Avoid "click here" as link text. Describe what the link leads to.
              Good link text improves accessibility and helps readers
              understand where they'll go without clicking.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Reference links are cleaner for repeated URLs.</strong>
              When the same URL appears multiple times, reference-style links
              keep your Markdown readable. Define the URL once at the bottom,
              reference it throughout.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">URL validation isn't foolproof.</strong>
              Validation checks URL format, not whether the link works. A
              properly formatted URL can still lead to a 404. Test important
              links manually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters in URLs need encoding.</strong>
              URLs with spaces or special characters should be percent-encoded.
              Most modern tools handle this, but be aware if links don't work
              as expected.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For long documents with many links, use
              reference-style links. They make your Markdown source more
              readable and make URL updates easier (change once at the bottom).
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between inline and reference links?</h3>
            <p className="text-sm text-muted-foreground">
              Inline links include the URL directly: <code className="font-mono bg-background px-1.5 py-0.5 rounded">[text](url)</code>.
              Reference links use an ID: <code className="font-mono bg-background px-1.5 py-0.5 rounded">[text][id]</code> with <code className="font-mono bg-background px-1.5 py-0.5 rounded">[id]: url</code> defined
              elsewhere. Reference style is cleaner for repeated URLs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I link to sections within the same document?</h3>
            <p className="text-sm text-muted-foreground">
              Use anchor links: <code className="font-mono bg-background px-1.5 py-0.5 rounded">[link text](#section-id)</code>. Section IDs are
              usually the heading text lowercased with spaces replaced by
              hyphens. GitHub auto-generates these IDs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add titles to links?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Add a title in quotes: <code className="font-mono bg-background px-1.5 py-0.5 rounded">[text](url "Hover title")</code>. The
              title appears on hover in some renderers. It's optional and
              rarely used in practice.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do email links work automatically?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Email autolinks (<code className="font-mono bg-background px-1.5 py-0.5 rounded">&lt;email@example.com&gt;</code>) create
              mailto: links that open the user's email client. You can also use
              regular link syntax: <code className="font-mono bg-background px-1.5 py-0.5 rounded">[Email me](mailto:email@example.com)</code>.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I open links in a new tab?</h3>
            <p className="text-sm text-muted-foreground">
              Standard Markdown doesn't support this. You need HTML:{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">&lt;a href="url" target="_blank"&gt;text&lt;/a&gt;</code>. Some
              Markdown processors add extensions for this, but HTML is most
              compatible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I validate multiple links at once?</h3>
            <p className="text-sm text-muted-foreground">
              This tool validates one link at a time. For checking all links
              in a document, use link checker tools like markdown-link-check
              that scan entire files and report broken links.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about relative links?</h3>
            <p className="text-sm text-muted-foreground">
              Relative links work the same as absolute URLs:{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">[text](./path/to/file.md)</code>. They're relative to the
              current file's location. Great for linking within a project or
              documentation set.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I create links with images?</h3>
            <p className="text-sm text-muted-foreground">
              Wrap image syntax in a link:{" "}
              <code className="font-mono bg-background px-1.5 py-0.5 rounded">[![alt](image-url)](link-url)</code>. This creates a
              clickable image. Common for banners, badges, or linked logos.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
