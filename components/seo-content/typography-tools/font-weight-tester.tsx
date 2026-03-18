import React from "react"

export default function FontWeightTesterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Weight Tester Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool previews text in different font weights to help you choose the right weight for your design. Select a font and see your text rendered from thin (100) to black (900) weights.
          </p>
          <p>
            Font weight controls the thickness of character strokes. Standard weights include 400 (normal/regular) and 700 (bold). Variable fonts offer any weight in between. The tester shows all available weights side by side.
          </p>
          <p>
            Compare how different weights affect readability, hierarchy, and visual impact. Export CSS with your chosen weights. Test how weights render at different sizes and on different backgrounds.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building a typography hierarchy</h3>
            <p className="text-sm text-muted-foreground">
              Your design needs clear visual hierarchy. Test different weight combinations—bold headings (700), subheadings (600), body (400), captions (300).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Choosing weights for variable fonts</h3>
            <p className="text-sm text-muted-foreground">
              Variable fonts offer continuous weight ranges. Test which specific weights work best for your use cases before committing to CSS custom properties.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Ensuring text readability</h3>
            <p className="text-sm text-muted-foreground">
              Light weights can be hard to read on screens. Test weights at your actual sizes to ensure body text remains legible across devices and lighting conditions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating button and link states</h3>
            <p className="text-sm text-muted-foreground">
              Hover states often change font weight. Test normal (400) to bold (700) transitions to find the right emphasis without jarring visual shifts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing for dark mode</h3>
            <p className="text-sm text-muted-foreground">
              Text appears thinner on dark backgrounds due to optical illusions. You may need heavier weights for dark mode to maintain visual consistency.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Optimizing font file loading</h3>
            <p className="text-sm text-muted-foreground">
              Each weight is a separate font file. Test which weights you actually need. Often 400, 600, and 700 cover most use cases without loading unnecessary files.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Not all fonts have all weights.</strong>
              Many fonts offer only 400 and 700. Premium fonts may have 8+ weights. Check available weights before designing around specific values.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Weights render differently on screens.</strong>
              A weight that looks perfect on your Retina display may look too light on a standard monitor. Test on multiple devices.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser font smoothing affects weights.</strong>
              Different browsers and OSes apply anti-aliasing differently. Safari, Chrome, and Firefox may show the same weight slightly differently.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Variable fonts change weight rules.</strong>
              Variable fonts let you use any weight value (like 537). But stick to increments of 100 for compatibility with non-variable font fallbacks.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For body text, never go below 400 on screens. Light weights (300, 100) look elegant in print but strain eyes on backlit displays.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What font weight is best for body text?</h3>
            <p className="text-sm text-muted-foreground">
              400 (normal) works for most body text. For better readability, try 400-500. Older audiences or accessibility-focused designs may benefit from 500.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How bold should headings be?</h3>
            <p className="text-sm text-muted-foreground">
              600-700 works well for headings. Large display headings can go bolder (800-900). Ensure enough contrast with body text weight for clear hierarchy.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a variable font?</h3>
            <p className="text-sm text-muted-foreground">
              Variable fonts contain multiple weights (and sometimes other axes) in one file. You can use any weight value within the font's range. More efficient than loading multiple files.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does bold text look different in different browsers?</h3>
            <p className="text-sm text-muted-foreground">
              Browsers apply different font rendering and anti-aliasing. Also, if a true bold weight isn't available, browsers artificially bold text, which looks inconsistent.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I use font weight for emphasis instead of italics?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, semibold (600) is a modern alternative to italics for emphasis. It's more subtle and works better in some typefaces. Test both approaches.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I load multiple font weights?</h3>
            <p className="text-sm text-muted-foreground">
              For Google Fonts, add weights to the URL: "Inter:wght@400;600;700". For self-hosted fonts, include @font-face declarations for each weight file.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does font weight affect page speed?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, each weight is a separate font file (typically 20-100KB). Loading 5 weights adds up. Only load weights you actually use in your design.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
