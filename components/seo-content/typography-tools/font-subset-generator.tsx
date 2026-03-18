import React from "react"

export default function FontSubsetGeneratorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Subset Generator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool creates font subsets—smaller font files containing only the characters you need. Upload a font file, enter the text you'll display, and download an optimized subset font.
          </p>
          <p>
            Full font files include thousands of characters for multiple languages. But your site might only need basic Latin. Subsetting removes unused characters, dramatically reducing file size and improving page load times.
          </p>
          <p>
            The generator analyzes your content to identify required characters. It creates a new font file with just those glyphs. Keep the original font for fallback, use the subset for primary loading.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing web font performance</h3>
            <p className="text-sm text-muted-foreground">
              Your custom font is 500KB and slowing down your site. Subset it to include only characters in your content. File sizes often drop 70-90%.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating fonts for specific languages</h3>
            <p className="text-sm text-muted-foreground">
              Your site is English-only but the font includes Cyrillic, Greek, and Vietnamese. Subset to Latin-only for faster loading in your target market.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building logo or heading fonts</h3>
            <p className="text-sm text-muted-foreground">
              Your logo uses specific letters. Create a subset font with just those characters for consistent rendering across devices without loading a full font.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Reducing mobile data usage</h3>
            <p className="text-sm text-muted-foreground">
              Mobile users pay for data. Smaller font files mean faster loads and less data consumption. Subsetting is a mobile-first optimization technique.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Meeting performance budgets</h3>
            <p className="text-sm text-muted-foreground">
              Your team has a 100KB font budget. Subsetting lets you use premium fonts while staying under budget. Combine with font-display: swap for best results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating icon font subsets</h3>
            <p className="text-sm text-muted-foreground">
              Icon fonts like Font Awesome include hundreds of icons. Subset to only the icons you use. Reduces icon font from 100KB+ to just a few KB.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Check font licensing before subsetting.</strong>
              Some font licenses prohibit modification or subsetting. Review your font's EULA. Most Google Fonts allow subsetting; many commercial fonts don't.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Include all characters you might need.</strong>
              Subset based on all current and planned content. Missing characters fall back to system fonts, creating visual inconsistency.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Don't forget special characters.</strong>
              Include punctuation, currency symbols, and special characters your content uses. Smart quotes, em dashes, and © symbols are commonly missed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Keep the original font as fallback.</strong>
              Load your subset font first, then the full font as fallback. This ensures missing characters still render correctly.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For dynamic content (user comments, CMS content), include a broader character set. Subset aggressively only for static sites with known content.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How much can subsetting reduce file size?</h3>
            <p className="text-sm text-muted-foreground">
              Typical reductions: 70-90%. A 500KB font with full Unicode might drop to 30-50KB for Latin-only. The more characters removed, the bigger the savings.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What font formats are supported?</h3>
            <p className="text-sm text-muted-foreground">
              Upload TTF or OTF. Download WOFF2 (best compression, modern browsers) or WOFF (wider support). WOFF2 is recommended for modern web projects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I subset Google Fonts?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Google Fonts allows subsetting. But Google Fonts API already serves optimized subsets based on requested character sets. Manual subsetting is for self-hosted fonts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are unicode ranges?</h3>
            <p className="text-sm text-muted-foreground">
              Unicode ranges define character sets (Latin, Cyrillic, Greek, etc.). You can subset by range or by specific characters. Ranges are easier; specific characters are more efficient.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does subsetting affect font quality?</h3>
            <p className="text-sm text-muted-foreground">
              No, subsetting removes characters, not quality. The remaining glyphs are identical to the original font. Visual quality is unchanged for included characters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle user-generated content?</h3>
            <p className="text-sm text-muted-foreground">
              For UGC, include a broader character set. Subset to full Latin Extended at minimum. Consider loading additional fonts for non-Latin scripts if needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I automate subsetting in my build process?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, tools like fonttools (Python), glyphhanger, and webpack font loaders can automate subsetting. Integrate into CI/CD for automatic optimization.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
