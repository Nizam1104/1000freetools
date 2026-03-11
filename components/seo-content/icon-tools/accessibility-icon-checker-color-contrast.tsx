import React from "react"

export default function AccessibilityIconCheckerColorContrastSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Accessibility Icon Checker Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select your icon color and background color using the color pickers. Enter hex codes directly if you have specific brand colors to test. The tool shows a live preview of your icon on the background.
          </p>
          <p>
            Set the icon size since WCAG requirements vary by size. Icons under 24px need higher contrast than larger icons. The checker accounts for this in its analysis.
          </p>
          <p>
            Click Check Accessibility to calculate the contrast ratio. Results show whether you pass WCAG AA (3:1 minimum) and AAA (4.5:1 enhanced) guidelines. Recommendations suggest improvements if your icon fails. Copy the report for documentation or share with your team.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Auditing existing interfaces</h3>
            <p className="text-sm text-muted-foreground">
              Reviewing your app for accessibility? Check all icon buttons and status indicators. Find low-contrast icons that need adjustment before users report issues.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing new UI components</h3>
            <p className="text-sm text-muted-foreground">
              Creating a new button style? Test icon contrast before implementation. Catch accessibility issues in design phase, not after development.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Meeting compliance requirements</h3>
            <p className="text-sm text-muted-foreground">
              Client requires WCAG compliance? Document icon contrast ratios. The generated report provides evidence for accessibility audits and legal requirements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing dark mode designs</h3>
            <p className="text-sm text-muted-foreground">
              Icons that work on light backgrounds may fail on dark. Test both modes. Dark backgrounds often need lighter icons to maintain sufficient contrast.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating accessible data visualizations</h3>
            <p className="text-sm text-muted-foreground">
              Chart icons and legend markers need contrast. Test each color combination. Users with low vision must distinguish all data series clearly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Training design teams</h3>
            <p className="text-sm text-muted-foreground">
              Teaching designers about accessibility? Use this tool for hands-on learning. Show how small color changes dramatically affect accessibility scores.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">WCAG has different requirements for icons.</strong>
              Icons need 3:1 contrast ratio (AA). Text needs 4.5:1 for normal, 3:1 for large text. Icons are treated differently than text elements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Size matters for accessibility.</strong>
              Icons smaller than 24px need higher contrast. Larger icons are easier to see with lower contrast. Always specify icon size when testing.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Color blindness affects perception.</strong>
              This tool checks luminance contrast, not color blindness simulation. Red/green colorblind users may still struggle even with good contrast ratios.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Contrast isn't the only accessibility factor.</strong>
              Also consider icon clarity, size, and labels. An accessible icon is high-contrast, large enough, and has text labels or aria-labels.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Aim for 4.5:1 even for icons. AA minimum (3:1) is legally compliant but AAA (4.5:1) provides better experience for users with moderate vision loss.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What is the minimum contrast ratio for icons?</h3>
            <p className="text-sm text-muted-foreground">
              WCAG AA requires 3:1 for icons and UI components. WCAG AAA requires 4.5:1. Aim for AAA when possible for better accessibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my icon fail but text passes?</h3>
            <p className="text-sm text-muted-foreground">
              Icons often have thinner lines than text strokes. A 1px icon line needs more contrast than 16px text. Consider thicker icon strokes for better visibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How can I improve failing contrast?</h3>
            <p className="text-sm text-muted-foreground">
              Darken the icon color or lighten the background. Even small adjustments (10-15% luminance change) can push you over the threshold.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this check for color blindness?</h3>
            <p className="text-sm text-muted-foreground">
              No. This checks luminance contrast only. Use additional tools to simulate color blindness. Never rely on color alone to convey information.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What if I can't change the colors?</h3>
            <p className="text-sm text-muted-foreground">
              Add a text label alongside the icon. Labels provide redundancy. Users who can't see the icon clearly can read the text instead.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this tool WCAG certified?</h3>
            <p className="text-sm text-muted-foreground">
              This tool follows WCAG 2.1 contrast calculation formulas. For official certification, use accredited accessibility audit services.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do gradients affect contrast checking?</h3>
            <p className="text-sm text-muted-foreground">
              Test the lowest contrast point in the gradient. If any part of the icon fails, the whole icon fails. Use solid colors for critical icons.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
