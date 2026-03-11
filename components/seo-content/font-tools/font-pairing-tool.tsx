import React from "react"

export default function FontPairingToolSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Pairing Tool Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select a heading font and a body font from curated combinations. Adjust sizes using sliders to see how they work together at different scales. Preview changes in real-time.
          </p>
          <p>
            Try quick pairing presets organized by style: Classic, Modern, Bold, Clean, Elegant, Friendly. Each preset combines fonts that designers have proven work well together.
          </p>
          <p>
            Copy the generated CSS code for immediate use in your projects. The code includes Google Fonts imports and CSS custom properties. Ready to paste into your stylesheet. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing website headers</h3>
            <p className="text-sm text-muted-foreground">
              Need fonts that work for navigation and content. Pair a distinctive heading font with readable body text. Professional results fast.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating brand guidelines</h3>
            <p className="text-sm text-muted-foreground">
              Document your font pairings for consistent branding. Export CSS for developers. Ensure visual consistency across materials.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building presentation decks</h3>
            <p className="text-sm text-muted-foreground">
              Slides need clear hierarchy. Pair fonts for titles and body text. Make your presentations visually cohesive.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning typography basics</h3>
            <p className="text-sm text-muted-foreground">
              Understand what makes fonts work together. Serif with sans-serif. Contrast in weight and style. Build typography intuition.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Quick client mockups</h3>
            <p className="text-sm text-muted-foreground">
              Show font options during discovery. Present multiple pairing directions. Get client feedback before committing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Blog and content sites</h3>
            <p className="text-sm text-muted-foreground">
              Readability matters for long-form content. Pair an engaging heading font with highly readable body text. Keep readers engaged.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Contrast creates hierarchy.</strong>
              Pair different font categories: serif with sans-serif. Or vary weights within a family. Contrast helps readers navigate content.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Limit your font choices.</strong>
              Two fonts are usually enough. Three maximum. More creates visual chaos. Restraint looks professional.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Consider your audience.</strong>
              Formal brands need different fonts than playful ones. Match typography to brand personality. Context matters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Test at different sizes.</strong>
              Fonts look different at 16px vs 48px. Adjust size sliders to see real-world appearance. Ensure readability at all sizes.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Start with a font you love, then find its pair. It's easier to find a complement than to choose two fonts simultaneously.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What makes a good font pair?</h3>
            <p className="text-sm text-muted-foreground">
              Contrast in style (serif/sans), weight (light/bold), or mood (formal/casual). Similar x-heights help harmony. Avoid fonts that are too similar.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use two serif fonts together?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, if they're different enough. Pair a traditional serif with a modern one. Ensure clear contrast in weight or style.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should heading font be larger?</h3>
            <p className="text-sm text-muted-foreground">
              Typically yes, 2-3x body size for main headings. Use the size sliders to find the right ratio. Hierarchy guides the eye.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Are Google Fonts free to use?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, Google Fonts are free for personal and commercial use. Open source licenses. Safe for client projects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many fonts should a website use?</h3>
            <p className="text-sm text-muted-foreground">
              Two is ideal. Three maximum. More slows page load and creates visual confusion. Restraint is a hallmark of good design.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use these fonts in print?</h3>
            <p className="text-sm text-muted-foreground">
              Google Fonts are primarily for web. For print, check individual licenses. Many allow print use, but verify for your project.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the CSS custom property approach?</h3>
            <p className="text-sm text-muted-foreground">
              CSS variables like --heading-font make changes easy. Update one variable, site-wide change. Modern, maintainable approach.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
