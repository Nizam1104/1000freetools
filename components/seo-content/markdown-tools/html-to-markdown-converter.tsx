import React from "react"

export default function HtmlToMarkdownConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the HTML to Markdown Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your HTML code into the left input field. The converter processes it instantly, transforming HTML tags into their Markdown equivalents. Results appear in the right output field.
          </p>
          <p>
            Headers (h1-h6) become # through ######. Bold and italic tags become **text** and *text*. Links become [text](url). Images become ![alt](src). Lists, code blocks, blockquotes, and horizontal rules all convert properly.
          </p>
          <p>
            Script and style tags are removed since Markdown doesn't support them. HTML entities are decoded. Extra whitespace is cleaned up. The result is clean, readable Markdown ready for use in documentation or content management systems.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Migrating blog content</h3>
            <p className="text-sm text-muted-foreground">
              Moving from WordPress to a static site generator? Convert your HTML posts to Markdown for Jekyll, Hugo, or Gatsby. Preserves formatting while changing formats.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating documentation from web pages</h3>
            <p className="text-sm text-muted-foreground">
              Your docs are on a wiki but need to move to GitHub. Convert HTML pages to Markdown for version control and easier maintenance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cleaning up copied content</h3>
            <p className="text-sm text-muted-foreground">
              Copied formatted text from a website includes hidden HTML. Convert to Markdown to strip the cruft while keeping structure like links and emphasis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Preparing content for GitHub</h3>
            <p className="text-sm text-muted-foreground">
              Your README or wiki content is in HTML. Convert to Markdown for native GitHub support. Markdown renders better and is easier to edit.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Archiving web content</h3>
            <p className="text-sm text-muted-foreground">
              Saving web pages for reference? Markdown is more durable than HTML. Smaller files, simpler format, better long-term readability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting email HTML to text</h3>
            <p className="text-sm text-muted-foreground">
              HTML emails don't paste well into documentation. Convert to Markdown for clean inclusion in notes, tickets, or knowledge bases.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Complex layouts don't convert.</strong>
              Tables with rowspans, nested divs, and CSS layouts have no Markdown equivalent. The converter handles basic structures, not complex HTML.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Scripts and styles are removed.</strong>
              JavaScript and CSS don't exist in Markdown. They're stripped during conversion. Interactive content becomes static text.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Image alt text may be lost.</strong>
              Images without alt attributes convert to ![](url). Add alt text manually for accessibility. Good HTML includes alt text already.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Tables may need adjustment.</strong>
              HTML tables convert to Markdown tables, but complex tables (merged cells) don't translate. Simple tables work well.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> After conversion, review the Markdown for formatting issues. Check that links work, code blocks are properly fenced, and lists have correct indentation. Automated conversion is a starting point, not a final product.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this preserve formatting?</h3>
            <p className="text-sm text-muted-foreground">
              Basic formatting is preserved: headers, bold, italic, links, lists. Visual styling (colors, fonts, spacing) is lost since Markdown doesn't support it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert entire websites?</h3>
            <p className="text-sm text-muted-foreground">
              This tool converts one page at a time. For full sites, you'd need a crawler plus this converter. Consider tools like HTTrack for bulk conversion.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about HTML5 semantic tags?</h3>
            <p className="text-sm text-muted-foreground">
              Tags like article, section, nav, and footer are stripped. They're structural HTML, not content. Markdown has no equivalent concepts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does it handle encoded characters?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. HTML entities like {"&amp; &lt; &gt;"} are decoded to &amp; &lt; &gt;. Non-breaking spaces become regular spaces.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert Markdown back to HTML?</h3>
            <p className="text-sm text-muted-foreground">
              This tool only does HTML to Markdown. For the reverse, use a Markdown parser. Most static site generators do this automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about forms and inputs?</h3>
            <p className="text-sm text-muted-foreground">
              Forms don't convert to Markdown. They become plain text or are removed. Markdown is for documentation, not interactive content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is the output GitHub-compatible?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The Markdown follows standard conventions that GitHub, GitLab, and BitBucket all support. Tables, code blocks, and links work correctly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
