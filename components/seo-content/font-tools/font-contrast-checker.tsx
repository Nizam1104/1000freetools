import React from "react"

export default function FontContrastCheckerSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Checking Font Contrast for Accessibility</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The font contrast checker calculates the contrast ratio between text and background colors. It uses the WCAG 2.1 formula based on relative luminance—measuring how much light the foreground and background colors emit.
          </p>
          <p>
            The tool converts hex, RGB, or HSL colors to relative luminance values, then applies the contrast ratio formula: <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">(L1 + 0.05) / (L2 + 0.05)</code> where L1 is the lighter color and L2 is the darker.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">WCAG contrast requirements:</p>
            <ul className="text-sm space-y-1.5 ml-4 list-disc">
              <li><strong className="text-foreground">AA (normal text)</strong> - 4.5:1 minimum contrast ratio</li>
              <li><strong className="text-foreground">AA (large text)</strong> - 3:1 minimum (18pt+ or 14pt bold)</li>
              <li><strong className="text-foreground">AAA (normal text)</strong> - 7:1 minimum contrast ratio</li>
              <li><strong className="text-foreground">AAA (large text)</strong> - 4.5:1 minimum</li>
            </ul>
          </div>
          <p>
            The checker shows pass/fail for each WCAG level and suggests adjustments if your colors don't meet requirements. It also previews how your actual text looks with the selected colors at different sizes.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Meeting accessibility compliance</h3>
            <p className="text-sm text-muted-foreground">
              Your client requires WCAG AA compliance. Check all text/background combinations to ensure they meet the 4.5:1 ratio before launch.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Designing for low vision users</h3>
            <p className="text-sm text-muted-foreground">
              Your audience includes older adults or people with visual impairments. High contrast ensures they can read your content without strain.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing dark mode colors</h3>
            <p className="text-sm text-muted-foreground">
              Your dark mode uses gray text on dark backgrounds. Verify the contrast is sufficient—dark modes often fail WCAG because designers pick colors that look good but don't meet ratios.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating accessible buttons</h3>
            <p className="text-sm text-muted-foreground">
              Button text needs to stand out from the button background. Check contrast for primary, secondary, and disabled states.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Validating brand colors</h3>
            <p className="text-sm text-muted-foreground">
              Your brand uses light gray (#CCCCCC) for secondary text. The checker reveals it only achieves 2.5:1 on white—failing WCAG. Time to pick a darker gray.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Testing gradient backgrounds</h3>
            <p className="text-sm text-muted-foreground">
              Text over gradients can have varying contrast. Check the worst-case point (where text color is closest to background) to ensure readability everywhere.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Large text has lower requirements.</strong>
              Text 18pt (24px) or larger, or 14pt (18.5px) bold, qualifies as "large text" with a 3:1 requirement instead of 4.5:1.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Contrast isn't everything.</strong>
              WCAG also requires that text can't be replaced by images (with rare exceptions). And color alone shouldn't convey information—use icons or labels too.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Anti-aliased text affects contrast.</strong>
              Font smoothing blends edges with the background, effectively reducing contrast at small sizes. The checker calculates theoretical contrast; real-world readability may vary.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Transparent overlays need special handling.</strong>
              If text sits on a semi-transparent overlay above an image, the effective background color depends on what's underneath. Check the composite color.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> Aim for 7:1+ contrast when possible. It future-proofs your design for AAA compliance and helps users in bright sunlight or with aging eyes.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the formula for contrast ratio?</h3>
            <p className="text-sm text-muted-foreground">
              <code className="font-mono text-xs">(L1 + 0.05) / (L2 + 0.05)</code> where L1 is relative luminance of the lighter color and L2 is the darker. Luminance is calculated from linearized RGB values with weights: 0.2126×R + 0.7152×G + 0.0722×B.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Does this work for colored text on colored backgrounds?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. The formula works for any color combination—white on black, yellow on blue, red on green. It's based on luminance, not just lightness.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why does my green text fail but gray passes?</h3>
            <p className="text-sm text-muted-foreground">
              Green has lower luminance contribution (the eye is less sensitive to green light) than you'd expect. A green that looks bright may have lower luminance than a gray of similar perceived brightness.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Do images with text need contrast checking?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, if the text is part of the image. However, WCAG generally discourages text in images—use real text with CSS styling instead for better accessibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about text shadows?</h3>
            <p className="text-sm text-muted-foreground">
              Text shadows can improve or hurt contrast. A dark shadow behind light text on a dark background creates a buffer. But shadows shouldn't be relied upon—check contrast without them.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is there a tool to auto-fix low contrast?</h3>
            <p className="text-sm text-muted-foreground">
              Some design tools (Figma plugins, Stark) can suggest higher-contrast alternatives. This checker shows pass/fail—you'll need to manually adjust colors to improve contrast.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
