import React from "react"

export default function MarkdownCheatSheetGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool creates a custom Markdown syntax reference sheet based on
            the elements you select. Instead of a generic cheat sheet, you
            choose which syntax elements to include, making it relevant to your
            specific needs.
          </p>
          <p>
            The generator compiles selected elements with their syntax,
            examples, and rendered output into a clean, printable reference
            document. You can download it as PDF or text for offline use or
            team distribution.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Available syntax elements:</p>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Headers (H1-H6)</li>
              <li>Emphasis (bold, italic, strikethrough)</li>
              <li>Lists (bullet, numbered, task lists)</li>
              <li>Links and images</li>
              <li>Code (inline and blocks)</li>
              <li>Tables, blockquotes, horizontal rules</li>
            </ul>
          </div>
          <p>
            Select the elements you need, preview your custom cheat sheet, and
            download. Perfect for learning Markdown or creating team reference
            guides tailored to your workflow.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When you'd actually use this</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Onboarding new team members</h3>
            <p className="text-sm text-muted-foreground">
              A team lead creates a custom cheat sheet for new hires showing
              only the Markdown their team uses. New members get a focused
              reference instead of overwhelming comprehensive docs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning Markdown basics</h3>
            <p className="text-sm text-muted-foreground">
              Someone new to Markdown generates a cheat sheet with just the
              fundamentals. They keep it open while writing, gradually
              memorizing syntax through regular reference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating documentation standards</h3>
            <p className="text-sm text-muted-foreground">
              A tech writer creates a cheat sheet showing approved Markdown
              patterns for their team. This ensures everyone uses consistent
              formatting across all documentation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quick reference while writing</h3>
            <p className="text-sm text-muted-foreground">
              A blogger keeps a custom cheat sheet open while writing posts.
              They included only elements they regularly use, making it a
              quick, uncluttered reference for common syntax.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Teaching Markdown in workshops</h3>
            <p className="text-sm text-muted-foreground">
              An instructor generates cheat sheets for workshop participants.
              They customize it to cover only what's taught in the session,
              giving students a focused takeaway reference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Refreshing memory after a break</h3>
            <p className="text-sm text-muted-foreground">
              Someone returns to Markdown writing after months away. They
              generate a cheat sheet to quickly refresh their memory on syntax
              before diving back into documentation work.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to know before using it</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different platforms support different features.</strong>
              GitHub Flavored Markdown supports more features than basic
              Markdown. Customize your cheat sheet to match the platform where
              you'll use Markdown most.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Examples show both syntax and output.</strong>
              Good cheat sheets show the raw syntax and how it renders. This
              helps you understand what each element looks like in the final
              output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Keep it concise for quick reference.</strong>
              A cheat sheet should be scannable, not comprehensive. Include
              only what you need regularly. Rare syntax can be looked up when
              needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">PDF format is best for printing.</strong>
              If you want a physical reference, download as PDF for clean
              printing. Text format is better for digital use or further
              customization.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Laminate a printed cheat sheet or keep
              it in a page protector at your desk. Physical references are
              faster to glance at than switching windows to digital docs.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I add custom examples to the cheat sheet?</h3>
            <p className="text-sm text-muted-foreground">
              This tool provides standard examples. For custom examples
              relevant to your work, download the cheat sheet and edit it, or
              create your own from scratch using the generated one as a
              template.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this cover GitHub Flavored Markdown?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, GFM elements like tables, task lists, and strikethrough are
              available options. Select them when generating your cheat sheet
              if you use GitHub or compatible platforms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I share the cheat sheet with my team?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. Download and share the PDF or text file with your
              team. It's a great way to standardize Markdown usage across a
              group and ensure everyone has the same reference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I update the cheat sheet later?</h3>
            <p className="text-sm text-muted-foreground">
              Regenerate it with updated selections. If you need to add elements
              or change examples, run the generator again with your new
              requirements and download the updated version.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a size limit for the PDF?</h3>
            <p className="text-sm text-muted-foreground">
              The PDF size depends on how many elements you include. A focused
              cheat sheet with common elements fits on 1-2 pages. Comprehensive
              sheets may be longer.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use this for other Markdown variants?</h3>
            <p className="text-sm text-muted-foreground">
              This tool covers standard Markdown and GFM. For platform-specific
              variants (like Jira or Slack), you'd need a specialized cheat
              sheet or add notes about differences manually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the best format for digital use?</h3>
            <p className="text-sm text-muted-foreground">
              PDF works well digitally too - it's searchable and maintains
              formatting. Text format is editable and works in any text editor.
              Choose based on whether you need to modify it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I include advanced syntax?</h3>
            <p className="text-sm text-muted-foreground">
              Only if you use it regularly. Advanced syntax like HTML in
              Markdown or complex table formatting clutters cheat sheets.
              Include basics you use daily; look up advanced features when
              needed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
