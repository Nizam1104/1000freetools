export default function MarkdownTableGeneratorSeo() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="text-muted-foreground">
            This Markdown table generator provides a visual, spreadsheet-like editor for creating
            perfectly formatted Markdown tables. Instead of manually typing pipes and dashes,
            you edit cells directly and the tool generates the correct syntax.
          </p>
          <p className="text-muted-foreground">
            The table generation process:
          </p>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li><strong className="text-foreground">Build your table:</strong> Add rows and columns, enter content in each cell using the visual editor.</li>
            <li><strong className="text-foreground">Set alignment:</strong> Choose left, center, or right alignment for each column independently.</li>
            <li><strong className="text-foreground">Generate syntax:</strong> The tool creates the header row, alignment separator, and data rows with proper pipe formatting.</li>
            <li><strong className="text-foreground">Copy and use:</strong> Copy the generated Markdown and paste it into your README, documentation, or content.</li>
          </ol>
          <p className="text-muted-foreground">
            The alignment separator uses colons to indicate alignment: |---| (left), |:---:| (center),
            |---:| (right). This tool handles all the formatting details automatically.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">When You'd Actually Use This</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Writing README Documentation",
              description: "Create comparison tables, feature matrices, or configuration options for your project README files."
            },
            {
              title: "Technical Documentation",
              description: "Document API parameters, return values, or configuration options in clean, readable tables."
            },
            {
              title: "Blog Posts and Articles",
              description: "Include data tables in Markdown-based blog posts on platforms like Dev.to, Hashnode, or GitHub Pages."
            },
            {
              title: "Converting Spreadsheet Data",
              description: "Paste data from Excel or Google Sheets and quickly convert it to Markdown table format."
            },
            {
              title: "Creating Comparison Charts",
              description: "Build product comparisons, pricing tables, or feature comparison matrices for documentation."
            },
            {
              title: "GitHub Issues and PRs",
              description: "Format data clearly in GitHub issues, pull requests, and discussions using proper Markdown tables."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">What to Know Before Using</h2>
        <div className="space-y-3">
          {[
            {
              caveat: "Markdown tables have limitations",
              explanation: "No cell merging, no nested tables, limited styling. For complex tables, consider HTML or images instead."
            },
            {
              caveat: "Pipe characters in content need escaping",
              explanation: "If your cell content contains |, escape it with \\| or the table formatting will break."
            },
            {
              caveat: "Long content makes wide tables",
              explanation: "Markdown tables don't wrap automatically in all renderers. Keep cell content concise or use line breaks."
            },
            {
              caveat: "Not all Markdown flavors support tables",
              explanation: "GitHub Flavored Markdown (GFM) supports tables. Standard Markdown doesn't. Most modern platforms use GFM."
            },
            {
              caveat: "Alignment support varies by renderer",
              explanation: "Some Markdown renderers ignore alignment hints. GitHub renders them correctly; others may not."
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-muted/30 p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.caveat}</h3>
              <p className="text-sm text-muted-foreground">{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "How do I center-align a column?",
              answer: "Use colons on both sides of the dashes in the separator row: |:---:|. Left alignment is |---|, right is |---:|."
            },
            {
              question: "Can I include links or formatting in table cells?",
              answer: "Yes! Markdown inside tables works normally. Use [text](url) for links, **bold**, *italic*, and `code` formatting."
            },
            {
              question: "What's the minimum table structure?",
              answer: "You need a header row, a separator row (with dashes), and at least one data row. The separator defines alignment."
            },
            {
              question: "How do I create a table without a header?",
              answer: "You can't - Markdown tables require headers. Use an empty header or use HTML tables if you need headerless tables."
            },
            {
              question: "Can I convert CSV to Markdown table?",
              answer: "Yes! Paste CSV data directly into cells, or use tools that import CSV. This editor lets you paste and adjust manually."
            },
            {
              question: "Why aren't my table columns aligning in the raw Markdown?",
              answer: "Column alignment in the raw text (with spaces) is just for readability. Only the separator row affects actual rendering alignment."
            },
            {
              question: "How do I include a line break in a cell?",
              answer: "Use HTML <br> tag inside the cell. Standard Markdown doesn't support line breaks within table cells."
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-semibold text-foreground">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
