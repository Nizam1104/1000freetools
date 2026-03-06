import React from "react";

export function ContrastCheckerSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Is Color Contrast and Why Does It Matter?
        </h2>
        <p className="text-muted-foreground">
          Color contrast measures how distinguishable two colors are from each other. High contrast means text stands out clearly against its background; low contrast makes it hard to read. For users with visual impairments, low vision, or color blindness, insufficient contrast can make content completely inaccessible.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding WCAG 2.1 Contrast Requirements
        </h2>
        <p className="text-muted-foreground mb-4">
          The Web Content Accessibility Guidelines (WCAG) define specific contrast ratio thresholds that determine whether text-background combinations are accessible:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Level AA (Minimum)</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 4.5:1 for normal text (under 18px or 14px bold)</li>
              <li>• 3:1 for large text (18px+ or 14px+ bold)</li>
              <li>• 3:1 for UI components and graphical objects</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Level AAA (Enhanced)</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 7:1 for normal text</li>
              <li>• 4.5:1 for large text</li>
              <li>• Recommended for critical content</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How Contrast Ratio Is Calculated
        </h2>
        <p className="text-muted-foreground mb-4">
          The contrast ratio formula compares the relative luminance of two colors. Luminance measures how bright a color appears to the human eye, accounting for the fact that we perceive green as brighter than blue:
        </p>
        <div className="p-4 rounded-lg bg-muted font-mono text-sm mb-4">
          Luminance = 0.2126 × R + 0.7152 × G + 0.0722 × B
        </div>
        <p className="text-muted-foreground">
          The contrast ratio is then calculated as (L1 + 0.05) / (L2 + 0.05), where L1 is the lighter color and L2 is the darker. Results range from 1:1 (identical colors) to 21:1 (black on white).
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Real-World Use Cases
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Pre-Launch Accessibility Audit</h3>
            <p className="text-sm text-muted-foreground">
              Before deploying a website, a developer tests all text-background combinations. Gray text (#6B7280) on white (#FFFFFF) scores 5.0:1 — it passes AA but fails AAA. They darken it to #4B5563 for a 7.2:1 ratio.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Design System Validation</h3>
            <p className="text-sm text-muted-foreground">
              A design team defines color tokens for their component library. They use this checker to verify that every text-color/background-color pair in their system meets at least AA standards before publishing.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Marketing Material Review</h3>
            <p className="text-sm text-muted-foreground">
              A marketing designer creates a brochure with light blue text on a dark blue background. The contrast checker shows 2.8:1 — failing even large text requirements. They adjust to a much lighter blue, achieving 5.1:1.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Dark Mode Testing</h3>
            <p className="text-sm text-muted-foreground">
              A developer implements dark mode and needs to ensure inverted colors remain accessible. Pure white (#FFFFFF) on pure black (#000000) scores 21:1 — too harsh. They switch to #E5E5E5 on #1A1A1A for a comfortable 12.6:1.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Common Contrast Mistakes to Avoid
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Light gray on white.</strong> It looks elegant in design mockups but fails accessibility. #D1D5DB on #FFFFFF scores only 1.6:1. Use #6B7280 or darker for body text.
          </p>
          <p>
            <strong>Red on green (or vice versa).</strong> Even if the luminance contrast is adequate, users with red-green color blindness may struggle to distinguish them. Always check the numeric ratio.
          </p>
          <p>
            <strong>Gradient backgrounds.</strong> Text that's readable at the top of a gradient might disappear at the bottom. Test against the lightest and darkest points of any gradient.
          </p>
          <p>
            <strong>Opacity overlays.</strong> Semi-transparent backgrounds can reduce contrast unexpectedly. Calculate the final composite color after blending with the background.
          </p>
          <p>
            <strong>Hover states.</strong> A button's hover color might have lower contrast than its default state. Test all interactive states, not just the resting appearance.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">What's the minimum contrast ratio for accessibility?</h3>
            <p className="text-sm text-muted-foreground">
              WCAG AA requires 4.5:1 for normal text and 3:1 for large text (18px+ or 14px+ bold). WCAG AAA requires 7:1 for normal text and 4.5:1 for large text. Aim for AA as a minimum, AAA for critical content.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Does this tool check color blindness accessibility?</h3>
            <p className="text-sm text-muted-foreground">
              This checker measures luminance contrast, which is the primary WCAG requirement. Color blindness affects hue perception, not luminance. However, avoid relying solely on color to convey information — use labels, patterns, or icons as backups.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why does my color combination pass AA but fail AAA?</h3>
            <p className="text-sm text-muted-foreground">
              AAA standards are stricter. A contrast ratio of 5.5:1 passes AA for normal text (requires 4.5:1) but fails AAA (requires 7:1). For most content, AA is legally sufficient. AAA is recommended for essential information like error messages or critical instructions.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I fix low contrast without changing my brand colors?</h3>
            <p className="text-sm text-muted-foreground">
              Keep your brand color for backgrounds and accents, but use a darker or lighter shade for text. For example, if your brand blue is #3B82F6, use #1E3A8A (much darker) for text on light backgrounds, or #DBEAFE (much lighter) for text on dark backgrounds.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What counts as "large text"?</h3>
            <p className="text-sm text-muted-foreground">
              WCAG defines large text as 18pt (24px) or larger, or 14pt (18.5px) or larger if bold. Headings typically qualify; body text usually doesn't. When in doubt, test against the stricter normal text requirements.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use this for non-web content?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the WCAG contrast formula applies to any digital or print content. PDFs, mobile apps, presentation slides, and even printed materials benefit from adequate contrast for readability.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How This Tool Compares
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>vs. WebAIM Contrast Checker:</strong> This tool provides the same WCAG compliance checking with a live preview that shows your actual colors in context, plus the ability to test different font sizes instantly.
          </p>
          <p>
            <strong>vs. Browser DevTools:</strong> Chrome and Firefox have built-in contrast checkers, but they only work on rendered elements. This tool lets you test color combinations before writing any code.
          </p>
          <p>
            <strong>vs. Design software plugins:</strong> Figma and Sketch plugins require you to have the design file open. This checker works anywhere — paste hex codes from a Slack message, email, or design spec.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContrastCheckerSEO;
