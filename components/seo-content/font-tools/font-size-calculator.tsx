import React from "react"

export default function FontSizeCalculatorSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Size Calculator Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a base font size in pixels. The calculator instantly converts to all common units: points, ems, rems, percentages, and viewport units.
          </p>
          <p>
            Set your screen width for accurate viewport unit calculations. Results update as you type. No need to manually calculate conversions.
          </p>
          <p>
            Copy the complete CSS snippet with all unit options. Use the unit reference to understand when each unit is appropriate. All calculations happen locally in your browser.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Responsive web design</h3>
            <p className="text-sm text-muted-foreground">
              Convert between px, em, rem for responsive typography. Ensure consistent sizing across breakpoints. Mobile-friendly fonts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Print stylesheet creation</h3>
            <p className="text-sm text-muted-foreground">
              Web pixels don't translate to print. Convert to points for print CSS. Accurate printed output.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Accessibility compliance</h3>
            <p className="text-sm text-muted-foreground">
              Use relative units for user scaling. Convert fixed px to em or rem. Meet WCAG requirements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with designers</h3>
            <p className="text-sm text-muted-foreground">
              Designers think in pixels. Developers need flexible units. Bridge the communication gap with conversions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning CSS units</h3>
            <p className="text-sm text-muted-foreground">
              Understand how units relate. See that 16px = 1rem = 100%. Build intuition for CSS typography.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating type scales</h3>
            <p className="text-sm text-muted-foreground">
              Calculate harmonious font sizes. Convert base size to heading sizes. Consistent typographic hierarchy.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">16px is browser default.</strong>
              Most browsers default to 16px. This makes 1rem = 16px. Base your calculations on this standard.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Ems compound in nested elements.</strong>
              Child elements multiply parent's em value. Can cause unexpected sizes. Rems avoid this issue.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Rems are root-relative.</strong>
              Always relative to html font-size. Predictable sizing. Preferred for accessible, scalable typography.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Points are for print.</strong>
              1pt = 1/72 inch. Use for print stylesheets. Not recommended for screen display.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For modern web development, use rem for most sizing. It's accessible, predictable, and works well with browser zoom. Reserve px for borders and shadows.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the difference between em and rem?</h3>
            <p className="text-sm text-muted-foreground">
              Em is relative to parent element. Rem is relative to root (html). Rems are more predictable for font sizing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">When should I use viewport units?</h3>
            <p className="text-sm text-muted-foreground">
              VW/VH for responsive headlines. Text that scales with screen. Use carefully - can get too small on mobile.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I convert pt to px?</h3>
            <p className="text-sm text-muted-foreground">
              Multiply points by 1.333 for pixels at 96 DPI. 12pt ≈ 16px. This calculator does it automatically.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about percentage units?</h3>
            <p className="text-sm text-muted-foreground">
              Percent is relative to parent. 100% = parent size. 150% = 1.5x parent. Similar to ems but different syntax.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Should I use fluid typography?</h3>
            <p className="text-sm text-muted-foreground">
              Fluid type (clamp, vw) scales smoothly. Great for headlines. Combine with min/max for accessibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I set root font size?</h3>
            <p className="text-sm text-muted-foreground">
              Set html {"{ font-size: 100% }"} for browser default. Or 62.5% to make 1rem = 10px. Choose your preference.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this calculator accurate?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, uses standard conversion formulas. Browser defaults assumed. Results match CSS specifications.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
