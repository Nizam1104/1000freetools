import React from "react"

export default function WordCloudGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Paste your text content into the input area. The tool analyzes word frequency, counting how often each word appears. More frequent words appear larger in the cloud.
          </p>
          <p>
            Customize the appearance with color schemes (vibrant, ocean, forest, sunset, monochrome, rainbow), fonts, and word rotation. Choose a shape - rectangle, circle, or diamond - to constrain the layout.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Processing steps:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Text is converted to lowercase</li>
              <li>Punctuation is removed</li>
              <li>Stop words (the, a, and) are filtered</li>
              <li>Word frequencies are counted</li>
              <li>Words are sized and positioned</li>
              <li>Cloud is rendered with colors</li>
            </ol>
          </div>
          <p>
            The word cloud generates instantly. A frequency table shows exact counts and percentages. Download as PNG for presentations or reports.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Survey response analysis</h3>
            <p className="text-sm text-muted-foreground">
              Analyze open-ended survey responses. Common themes appear as large words. Quickly identify what respondents care about most without reading every response.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Content strategy planning</h3>
            <p className="text-sm text-muted-foreground">
              Analyze your blog posts or social media. See which topics dominate your content. Identify gaps where you should create more content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Customer feedback summarization</h3>
            <p className="text-sm text-muted-foreground">
              Process product reviews or support tickets. Frequent words reveal common issues or praise. Share with product teams for prioritization.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Speech and presentation analysis</h3>
            <p className="text-sm text-muted-foreground">
              Analyze political speeches, CEO addresses, or presentations. Compare word clouds from different speakers. Identify rhetorical patterns and emphasis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Literary text exploration</h3>
            <p className="text-sm text-muted-foreground">
              Students analyze novels or poems. Word clouds reveal themes and motifs. Compare clouds from different chapters to track narrative evolution.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Brand perception tracking</h3>
            <p className="text-sm text-muted-foreground">
              Analyze social media mentions of your brand. Track how word clouds change over time or after campaigns. Monitor brand sentiment shifts.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Stop words affect results significantly.</strong>
              Common words like "the", "and", "is" dominate without filtering. Enable stop word removal for meaningful clouds. Customize the list for your domain.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Word clouds don't show context.</strong>
              "Great" and "not great" both count as "great". Word clouds lose sentiment and context. Use for frequency, not sentiment analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Text length affects variety.</strong>
              Short texts produce sparse clouds with few words. Longer texts (500+ words) generate richer, more informative clouds.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Layout is approximate.</strong>
              Word placement algorithms try to fit words efficiently. Results vary slightly each generation. The frequency sizing is consistent though.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For comparative analysis, create word clouds from different time periods or groups. Place them side by side to spot shifts in language and emphasis.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many words should I include?</h3>
            <p className="text-sm text-muted-foreground">
              30-50 words shows good variety without clutter. 100+ words becomes dense. Adjust based on your purpose - overview vs detailed analysis.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I exclude specific words?</h3>
            <p className="text-sm text-muted-foreground">
              The tool excludes common stop words automatically. For domain-specific exclusions, edit your text before pasting or use find/replace.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What file formats can I import?</h3>
            <p className="text-sm text-muted-foreground">
              Upload .txt files directly. For PDFs or Word docs, copy the text and paste. The tool processes plain text content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why are some words rotated?</h3>
            <p className="text-sm text-muted-foreground">
              Rotation helps fit more words efficiently. Choose "None" for horizontal-only, "Some" for occasional rotation, or "Many" for varied orientations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use custom colors?</h3>
            <p className="text-sm text-muted-foreground">
              Select from preset color schemes. For custom colors, use the monochrome scheme and edit the SVG after download, or use a design tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How accurate is the frequency count?</h3>
            <p className="text-sm text-muted-foreground">
              Exact for the processed text. Words are counted after lowercasing and punctuation removal. The frequency table shows precise counts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I embed word clouds on websites?</h3>
            <p className="text-sm text-muted-foreground">
              Download as PNG for static images. For interactive clouds, you'd need JavaScript libraries like wordcloud2.js. This tool generates static images.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
