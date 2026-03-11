import React from "react"

export default function FontColorContrastCheckerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the Font Color Contrast Checker Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Select your text color and background color using the color pickers or enter hex values. Set the font size and toggle bold if needed. The checker calculates the contrast ratio instantly.
          </p>
          <p>
            Results show the contrast ratio and WCAG compliance status for normal text, large text, and enhanced (AAA) standards. A live preview shows exactly how your combination looks.
          </p>
          <p>
            Copy the full accessibility report for documentation. Use the guidelines to understand requirements. Ensure your designs are accessible to everyone. All processing happens locally.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Website accessibility compliance</h3>
            <p className="text-sm text-muted-foreground">
              Meet WCAG requirements for your site. Check all text/background combinations. Avoid legal issues and improve UX.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Design system creation</h3>
            <p className="text-sm text-muted-foreground">
              Build accessible color palettes. Document compliant combinations. Ensure team consistency.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Mobile app development</h3>
            <p className="text-sm text-muted-foreground">
              Mobile screens have glare and varying conditions. Higher contrast needed. Test combinations before coding.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Print design verification</h3>
            <p className="text-sm text-muted-foreground">
              Print has different contrast needs. Check before sending to press. Avoid costly reprints.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Client education</h3>
            <p className="text-sm text-muted-foreground">
              Show clients why their color choices need adjustment. Data-driven design decisions. Professional guidance.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Learning accessibility</h3>
            <p className="text-sm text-muted-foreground">
              Understand contrast requirements hands-on. See how colors affect readability. Build accessibility intuition.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">WCAG has two levels.</strong>
              AA is minimum compliance (4.5:1 for normal text). AAA is enhanced (7:1). Aim for AA at minimum, AAA when possible.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Large text has lower requirements.</strong>
              18px+ or 14px+ bold needs only 3:1 for AA. Headlines have more flexibility. Body text needs higher contrast.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Color blindness affects perception.</strong>
              Red-green color blindness is common. Don't rely on color alone. Contrast helps everyone.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Context matters.</strong>
              Outdoor screens need more contrast. Low-light environments need less. Consider your use case.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> When in doubt, go higher contrast. 7:1+ works for everyone in all conditions. Black on white is 21:1 - the gold standard.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a good contrast ratio?</h3>
            <p className="text-sm text-muted-foreground">
              4.5:1 minimum for normal text (AA). 7:1 for enhanced (AAA). 3:1 for large text. Higher is always better.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does bold text need less contrast?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, 14px+ bold qualifies as "large text" with 3:1 requirement. Bold strokes are more visible at lower contrast.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about gray text?</h3>
            <p className="text-sm text-muted-foreground">
              Gray often fails contrast. Light gray on white is usually inaccessible. Use darker grays or reserve for decorative use only.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do images need alt text if contrast is good?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, contrast and alt text serve different purposes. Contrast helps low vision. Alt text helps screen readers. Both are needed.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about links?</h3>
            <p className="text-sm text-muted-foreground">
              Links need 3:1 contrast against surrounding text. Also need non-color indicators (underline). Don't rely on color alone.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is this legally required?</h3>
            <p className="text-sm text-muted-foreground">
              Many jurisdictions require WCAG compliance. ADA, AODA, EAA all reference WCAG. Check your local requirements.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I fail if ratio is high enough?</h3>
            <p className="text-sm text-muted-foreground">
              Ratio is necessary but not sufficient. Color combinations can still be problematic. Test with actual users when possible.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
