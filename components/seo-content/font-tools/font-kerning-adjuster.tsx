import React from "react"

export default function FontKerningAdjusterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Kerning Adjuster Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter your text and adjust the overall tracking (letter spacing) with the slider. See how spacing affects readability and appearance at different values.
          </p>
          <p>
            For fine-tuning, select specific letter pairs and adjust their kerning individually. Problem pairs like AV or To get special attention. Highlighted pairs show your adjustments.
          </p>
          <p>
            Copy the CSS code with your spacing settings. Or download as SVG for use in design tools. Perfect your typography for logos and headlines. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Logo design</h3>
            <p className="text-sm text-muted-foreground">
              Logos need perfect spacing. Adjust kerning for visual balance. Professional results without design software.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Headline typography</h3>
            <p className="text-sm text-muted-foreground">
              Large text shows spacing flaws. Tighten kerning for impact. Make headlines look professionally typeset.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fixing problem pairs</h3>
            <p className="text-sm text-muted-foreground">
              Some letter combinations look awkward. AV, WA, To need adjustment. Fix visual gaps manually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">All-caps text</h3>
            <p className="text-sm text-muted-foreground">
              All-caps often needs looser spacing. Adjust tracking for readability. Elegant uppercase typography.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning typography</h3>
            <p className="text-sm text-muted-foreground">
              Understand kerning vs tracking. See how spacing affects perception. Build typography skills hands-on.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Export for design tools</h3>
            <p className="text-sm text-muted-foreground">
              Download as SVG for Illustrator. Use kerned text in logos. Seamless workflow between tools.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Kerning vs tracking difference.</strong>
              Kerning adjusts specific pairs. Tracking adjusts all letters. Use tracking for overall feel, kerning for problem spots.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Optical vs metric kerning.</strong>
              Optical looks better but is subjective. Metric uses font's built-in spacing. Trust your eyes for important work.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Size affects spacing needs.</strong>
              Large text needs tighter kerning. Small text needs more space. Adjust at actual display size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Different fonts need different spacing.</strong>
              Condensed fonts need less tracking. Wide fonts need more. Each font has optimal spacing.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Step back from the screen when evaluating kerning. Distance reveals spacing issues. Squint your eyes to see overall texture.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a good tracking value?</h3>
            <p className="text-sm text-muted-foreground">
              0 is default. -1 to -2 for tight headlines. 1 to 5 for airy designs. All-caps often needs 2-5. Depends on font and size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Which letter pairs need kerning?</h3>
            <p className="text-sm text-muted-foreground">
              Diagonal letters: AV, WA, YA. Round letters: To, Yo, LT. Any pair with visual gaps. Trust your eyes.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should kerning be positive or negative?</h3>
            <p className="text-sm text-muted-foreground">
              Both are valid. Negative brings letters closer. Positive adds space. Adjust until it looks right visually.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for body text?</h3>
            <p className="text-sm text-muted-foreground">
              Tracking adjustments work for body text. Individual kerning is overkill for small text. Focus on headlines and logos.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save my settings?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the CSS code to save settings. Or download the SVG. Reapply settings manually for future projects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What units are used?</h3>
            <p className="text-sm text-muted-foreground">
              CSS uses pixels or ems. This tool uses pixels. Convert to ems by dividing by font size for scalable typography.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this tool free?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, completely free with no registration. Adjust kerning for as many projects as you need. No limitations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
