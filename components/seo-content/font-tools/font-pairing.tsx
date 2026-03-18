import React from "react"

export default function FontPairingSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Finding Font Combinations That Work</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The font pairing tool helps you combine two or more fonts that complement each other. Good pairings create visual hierarchy—headings stand out from body text, buttons feel distinct from paragraphs, and quotes have their own personality.
          </p>
          <p>
            The tool shows preview text rendered in different font combinations. You can test heading/body pairs, see how weights interact, and compare multiple options side by side.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Common pairing strategies:</p>
            <ul className="text-sm space-y-1.5 ml-4 list-disc">
              <li><strong className="text-foreground">Serif + Sans-serif</strong> - Classic contrast. Serif headings feel authoritative, sans-serif body stays readable.</li>
              <li><strong className="text-foreground">Same family, different weights</strong> - Safe and cohesive. Bold for headings, regular for body.</li>
              <li><strong className="text-foreground">Display + Simple body</strong> - Decorative heading font paired with neutral body text.</li>
              <li><strong className="text-foreground">Monospace accents</strong> - Code snippets or technical details in monospace, prose in proportional fonts.</li>
            </ul>
          </div>
          <p>
            The preview shows real rendering with your actual content, not just "Lorem Ipsum". You can type your heading and body text to see exactly how the pairing works with your words.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Starting a new design project</h3>
            <p className="text-sm text-muted-foreground">
              Your blank Figma file needs typography. Test combinations quickly before committing to a direction. Find a pairing that matches the project's tone.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Redesigning an existing site</h3>
            <p className="text-sm text-muted-foreground">
              Your current site uses Arial for everything. Experiment with pairings that add personality while maintaining readability.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating a design system</h3>
            <p className="text-sm text-muted-foreground">
              Document approved font pairings for your team. Show examples of heading/body combinations so designers don't randomly mix fonts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Matching fonts to brand personality</h3>
            <p className="text-sm text-muted-foreground">
              A law firm needs serious, traditional pairings. A startup wants modern, energetic combinations. Test fonts that convey the right message.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Checking font licensing</h3>
            <p className="text-sm text-muted-foreground">
              Found a perfect pairing but one font costs $500 for web use? Test alternatives with similar characteristics that fit your budget.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing for performance</h3>
            <p className="text-sm text-muted-foreground">
              Each font file adds 50-200KB to page weight. Test pairings that use font families you're already loading, or system fonts that require no download.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Limit to 2-3 fonts maximum.</strong>
              More than three fonts creates visual chaos. One for headings, one for body, maybe an accent for special elements. That's it.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Contrast creates hierarchy.</strong>
              If heading and body fonts are too similar, the design feels muddy. Either use clearly different families or significantly different weights.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">X-height matters for pairing.</strong>
              Fonts with similar x-heights (the height of lowercase letters) tend to pair well. A 16px font with a tall x-height looks larger than 16px with a short x-height.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">System fonts are fast.</strong>
              San Francisco (Mac), Segoe UI (Windows), and Roboto (Android) load instantly. Pairing system fonts avoids web font download delays.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Test pairings at actual sizes. A combination that looks great at 72px/16px might fail at 24px/14px. Preview at your real production sizes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I pair two serif fonts?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but it's tricky. They need明显 different characteristics—one old-style (Garamond) and one modern (Bodoni), or very different weights. Usually safer to pair serif with sans-serif.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the safest font pairing?</h3>
            <p className="text-sm text-muted-foreground">
              Use different weights of the same family. Inter Bold for headings, Inter Regular for body. Guaranteed harmony, minimal download (same family), and professional results.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I know if fonts clash?</h3>
            <p className="text-sm text-muted-foreground">
              Clashing fonts compete for attention. If both fonts feel "loud" (decorative serifs + display fonts), they clash. Pair one distinctive font with one neutral font.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should body text be serif or sans-serif?</h3>
            <p className="text-sm text-muted-foreground">
              For screens, sans-serif is generally more readable at small sizes. For print, serif is traditional. But modern high-DPI screens handle serifs well—use what fits your brand.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do Google Fonts pair well together?</h3>
            <p className="text-sm text-muted-foreground">
              Google Fonts includes pairing suggestions on each font's page. Popular combinations: Roboto + Roboto Slab, Open Sans + Merriweather, Lato + Playfair Display.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many weights should I load?</h3>
            <p className="text-sm text-muted-foreground">
              Minimum: Regular (400) and Bold (700) for each font. Ideal: Add Medium (500) and Semibold (600) for more hierarchy options. Each weight adds to download size.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
