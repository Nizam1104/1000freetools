import React from "react"

export default function FontSizeConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Size Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This tool converts font sizes between pixels (px), points (pt), em, rem, and percentages. Enter a value in any unit, set your base size, and see instant conversions to all other units.
          </p>
          <p>
            The converter uses standard relationships: 16px = 12pt = 1em = 1rem = 100% at default base size. Changing the base size recalculates all conversions, since em and rem are relative units.
          </p>
          <p>
            A visual preview shows how each converted size appears. Copy individual values or export a complete conversion table. Perfect for translating design specs between different CSS methodologies.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting design mockups to CSS</h3>
            <p className="text-sm text-muted-foreground">
              Your designer provides specs in pixels, but your team uses rem. Quickly convert all font sizes to maintain consistency while respecting user browser preferences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with legacy code</h3>
            <p className="text-sm text-muted-foreground">
              Older sites often use pixels or points. When modernizing, convert to rem for accessibility. This tool helps you translate without manually calculating each value.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating responsive typography</h3>
            <p className="text-sm text-muted-foreground">
              You need different base sizes for mobile and desktop. Convert your desktop rem values to pixels, then recalculate for mobile's smaller base size.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Matching print designs for web</h3>
            <p className="text-sm text-muted-foreground">
              Print uses points (pt). When adapting print materials for web, convert point sizes to pixels or rem to maintain visual consistency across media.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building component libraries</h3>
            <p className="text-sm text-muted-foreground">
              Your design system needs typography tokens in multiple units. Generate a complete size scale in px, rem, and em for maximum flexibility across projects.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging CSS inheritance issues</h3>
            <p className="text-sm text-muted-foreground">
              Nested em values compound unexpectedly. Convert to rem to see actual computed sizes, or calculate what em value you need for a specific pixel result.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Pixels are absolute, everything else is relative.</strong>
              16px is always 16px. But 1em depends on parent element size, and 1rem depends on root (html) font size. Know which you're using.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Browser default is usually 16px.</strong>
              Most browsers default to 16px root font size. But users can change this. Using rem respects their preference; px does not.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Points are for print, not screens.</strong>
              Points (pt) assume 96 DPI and are meant for print. On screens, 1pt ≈ 1.33px, but this varies by device pixel density.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Em compounds in nested elements.</strong>
              If parent is 1.2em and child is 1.5em, the child is actually 1.8 times the base (1.2 × 1.5). This can cause unexpected sizing.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Accessibility tip:</strong> Use rem for font sizes to respect user preferences. Never use px for font-size unless you have a specific reason and understand the accessibility impact.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use px, em, or rem?</h3>
            <p className="text-sm text-muted-foreground">
              Use rem for font sizes (respects user preferences). Use em for spacing relative to text size. Avoid px for fonts unless you need exact control and accept accessibility trade-offs.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What base size should I use?</h3>
            <p className="text-sm text-muted-foreground">
              Stick with 16px as your root font size. It's the browser default and expected by users. Changing it can break user font size preferences.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert pt to px accurately?</h3>
            <p className="text-sm text-muted-foreground">
              Standard conversion: 1pt = 1.333px (at 96 DPI). So 12pt = 16px. But remember, points are print units and don't translate perfectly to screens.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why use percentages for font size?</h3>
            <p className="text-sm text-muted-foreground">
              Percentages work like em—relative to parent. 100% = 1em. They're less common now but useful for fluid typography that scales with container width.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do these conversions work for all properties?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the unit relationships apply to any CSS property—padding, margin, width, etc. But this tool is optimized for font size workflows.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about viewport units (vw, vh)?</h3>
            <p className="text-sm text-muted-foreground">
              Viewport units scale with screen size, not font size. They're great for responsive headings but don't convert directly to px/rem without knowing viewport dimensions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I handle browser zoom?</h3>
            <p className="text-sm text-muted-foreground">
              Using rem automatically handles browser zoom. When users zoom, the root font size changes, and all rem values scale proportionally. No extra work needed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
