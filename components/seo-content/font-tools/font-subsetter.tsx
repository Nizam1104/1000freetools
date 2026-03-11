import React from "react"

export default function FontSubsetterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Subsetter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Upload your font file (TTF, OTF, WOFF, WOFF2). Select the character set you need: Latin, Latin Extended, Cyrillic, Greek, or enter custom characters.
          </p>
          <p>
            Enter sample text to verify all needed characters are included. The tool calculates potential file size reduction. Subsets can be 70% smaller than full fonts.
          </p>
          <p>
            Download the subset information and CSS code. Note: actual font subsetting requires server-side tools. This tool helps plan your subset strategy. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website performance optimization</h3>
            <p className="text-sm text-muted-foreground">
              Large fonts slow page loads. Subset to needed characters only. Faster sites rank better and convert more.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Mobile-first design</h3>
            <p className="text-sm text-muted-foreground">
              Mobile users have limited bandwidth. Every KB matters. Subset fonts for mobile performance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Multi-language sites</h3>
            <p className="text-sm text-muted-foreground">
              Different languages need different characters. Subset per language. Serve only what each user needs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Icon font optimization</h3>
            <p className="text-sm text-muted-foreground">
              Icon fonts contain hundreds of glyphs. Subset to only used icons. Dramatic size reduction.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Custom font projects</h3>
            <p className="text-sm text-muted-foreground">
              Creating a font for specific use? Plan the character set. Include only what's needed. Efficient distribution.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning font optimization</h3>
            <p className="text-sm text-muted-foreground">
              Understand Unicode ranges. See how character sets affect size. Build web font optimization skills.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">This tool plans, doesn't subset.</strong>
              Actual subsetting requires font editing software. This helps you plan which characters to include. Strategy tool.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Latin is usually enough.</strong>
              English and Western European sites need only Latin. Don't include Cyrillic if you don't need it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Future content matters.</strong>
              Include characters you might need later. Adding characters later requires new font files. Plan ahead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Special characters count.</strong>
              Currency symbols, math operators, punctuation. Check your content for special characters. Include them in subset.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For actual subsetting, use tools like fonttools (Python), glyphhanger, or online services like Transfonter. This tool helps you plan the character set.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How much size reduction can I expect?</h3>
            <p className="text-sm text-muted-foreground">
              Latin-only subsets are often 30-50% smaller. Icon fonts can reduce 80%+. Depends on original font's character coverage.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's Latin Extended?</h3>
            <p className="text-sm text-muted-foreground">
              Additional characters for European languages. Accented letters, special symbols. Include if you support multiple languages.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I subset Google Fonts?</h3>
            <p className="text-sm text-muted-foreground">
              Google Fonts already offers subsetting. Use the text parameter in URLs. Specify characters you need.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about variable fonts?</h3>
            <p className="text-sm text-muted-foreground">
              Variable fonts are already optimized. Subsetting is complex. Consider if the size savings justify the effort.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do I need to subset for desktop?</h3>
            <p className="text-sm text-muted-foreground">
              Desktop has more bandwidth, but optimization still helps. Faster loads benefit everyone. Good practice universally.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I subset emoji fonts?</h3>
            <p className="text-sm text-muted-foreground">
              Technically yes, but emoji fonts are system-provided. Usually not included in web fonts. Use system emoji instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this tool free?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free. Plan subsets for as many fonts as you need. No registration or limitations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
