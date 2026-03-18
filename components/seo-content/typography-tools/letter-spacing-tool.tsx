import React from "react"

export default function LetterSpacingToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Letter Spacing Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool adjusts letter spacing (tracking) for any text. Enter your text and adjust spacing to see how different values affect readability and appearance. Get CSS-ready letter-spacing values instantly.
          </p>
          <p>
            Letter spacing controls the space between all characters uniformly. Positive values add space; negative values bring letters closer. The tool shows real-time previews as you adjust.
          </p>
          <p>
            Export CSS with your chosen letter spacing. The tool generates values in em units for scalability. Preview how spacing affects different font sizes and weights.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Styling all-caps headings</h3>
            <p className="text-sm text-muted-foreground">
              Uppercase text often needs increased letter spacing for readability. Add 0.05-0.15em to all-caps headings for a refined, professional appearance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fitting text into tight spaces</h3>
            <p className="text-sm text-muted-foreground">
              Your heading almost fits but wraps awkwardly. Slightly negative letter spacing (-0.02em to -0.05em) can bring it onto one line without changing font size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating luxury brand aesthetics</h3>
            <p className="text-sm text-muted-foreground">
              High-end brands often use generous letter spacing. It conveys elegance and exclusivity. Test spacing values that match your brand's premium positioning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Improving legibility at small sizes</h3>
            <p className="text-sm text-muted-foreground">
              Small text can benefit from slight positive letter spacing. It prevents characters from visually merging, especially on lower-resolution screens.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing buttons and navigation</h3>
            <p className="text-sm text-muted-foreground">
              Button text and nav items often use increased letter spacing. It improves click targets and creates a more polished UI component appearance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing font-specific spacing issues</h3>
            <p className="text-sm text-muted-foreground">
              Some fonts have naturally tight or loose spacing. Adjust letter spacing to compensate and achieve consistent visual rhythm across different typefaces.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Use em units for letter spacing.</strong>
              Em units scale with font size automatically. 0.1em at 16px is 1.6px; at 32px it's 3.2px. This maintains proportional spacing across sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Negative spacing has limits.</strong>
              Too much negative letter spacing causes characters to overlap. Stay above -0.1em for readability. Test thoroughly at different sizes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different fonts need different spacing.</strong>
              Geometric sans-serifs often need more spacing than humanist fonts. Serif fonts vary widely. Always preview with your actual font choice.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Letter spacing affects line length.</strong>
              Increased spacing makes lines longer. This can cause unexpected text wrapping. Account for spacing when calculating line lengths.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For all-caps text, start with 0.1em letter spacing. For small caps, try 0.05em. For lowercase body text, usually leave at default (0).
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between tracking and kerning?</h3>
            <p className="text-sm text-muted-foreground">
              Tracking (letter-spacing) adjusts space uniformly across all characters. Kerning adjusts space between specific letter pairs. CSS doesn't support manual kerning.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use pixels for letter spacing?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but don't. Pixel values don't scale with font size. 2px spacing looks different at 16px vs 48px. Em units maintain proportional spacing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does letter spacing affect accessibility?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. WCAG recommends letter spacing of at least 0.12em for accessibility. Increased spacing helps users with dyslexia and low vision read more easily.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I adjust letter spacing for mobile?</h3>
            <p className="text-sm text-muted-foreground">
              Often yes. Mobile screens benefit from slightly increased letter spacing. It improves readability at arm's length and on lower-PPI displays.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about word spacing?</h3>
            <p className="text-sm text-muted-foreground">
              CSS has word-spacing property for adjusting space between words. It's less commonly used than letter-spacing but follows the same unit principles.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I animate letter spacing?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, letter-spacing is animatable. Hover effects that increase spacing create subtle emphasis. But animate sparingly—it can be distracting.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my spaced text look blurry?</h3>
            <p className="text-sm text-muted-foreground">
              Sub-pixel letter spacing can cause anti-aliasing artifacts. Try values that result in whole pixels, or accept that some blur is normal at certain sizes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
