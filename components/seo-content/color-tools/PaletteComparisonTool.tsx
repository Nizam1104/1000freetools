import React from "react";

export function PaletteComparisonToolSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What This Comparison Tool Does
        </h2>
        <p className="text-muted-foreground">
          Load two or more color palettes and view them side-by-side to evaluate which works best for your project. Each palette shows its colors, average luminance (overall lightness), and end-to-end contrast ratio — giving you objective data to inform your subjective design decisions.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How Palette Comparison Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool calculates two key metrics for each palette. Average luminance tells you if a palette is overall light or dark — useful for matching a mood or brand feel. End-to-end contrast measures the ratio between the lightest and darkest colors, indicating whether the palette has enough range for accessible text hierarchies.
        </p>
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-medium mb-2">Understanding the stats</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li><strong>Avg. Luminance:</strong> 0-100% scale. Below 50% = dark palette, above 50% = light palette</li>
            <li><strong>End-to-End Contrast:</strong> Ratio between lightest and darkest color. 4.5:1+ passes WCAG AA for normal text</li>
            <li><strong>WCAG Badge:</strong> ✓ AA means accessible for most text, △ AA Large means only accessible for large text (18pt+), ✗ means not accessible</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Real Comparison Scenarios
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Client Presentation Prep</h3>
            <p className="text-sm text-muted-foreground">
              A designer has three palette options for a client rebrand. They load all three, compare them side-by-side, and notice that Option 2 has significantly better contrast — making it the safest choice for accessibility without sacrificing style.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">A/B Testing Color Schemes</h3>
            <p className="text-sm text-muted-foreground">
              A product team is testing whether a warm or cool palette converts better. They load both palettes here first to ensure they're equally accessible — discovering that the warm palette needs adjustment because its end-to-end contrast is only 2.8:1.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Brand Merger Evaluation</h3>
            <p className="text-sm text-muted-foreground">
              Two companies are merging and need to evaluate if their brand palettes can coexist. Loading both reveals that Company A's palette is much darker (35% luminance vs 72%), which explains why their combined marketing materials feel unbalanced.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Design System Audit</h3>
            <p className="text-sm text-muted-foreground">
              Someone is reviewing their company's design system tokens. They load the primary, secondary, and neutral palettes to verify they all have sufficient contrast range. The neutral palette passes, but the secondary needs darker shades added.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Competitor Analysis</h3>
            <p className="text-sm text-muted-foreground">
              A startup extracts palettes from competitor websites and compares them to find gaps. They notice all competitors use cool blues, so they decide to differentiate with a warm orange palette that still maintains good contrast.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How to Use This Tool Effectively
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Paste colors from anywhere.</strong> The tool accepts hex codes in any format: comma-separated, space-separated, or even pasted directly from Figma, CSS variables, or design docs. It extracts all valid hex codes automatically.
          </p>
          <p>
            <strong>Use preset palettes for quick tests.</strong> The Ocean, Sunset, Forest, and Warm presets let you experiment with the tool before loading your own colors.
          </p>
          <p>
            <strong>Compare 2-4 palettes maximum.</strong> More than 4 becomes visually overwhelming. If you have more options, do elimination rounds — compare 4, pick 2, then compare those against the next batch.
          </p>
          <p>
            <strong>Look at both stats and gut feeling.</strong> The luminance and contrast numbers are helpful, but your design intuition matters too. A palette might have perfect stats but still feel wrong for your brand.
          </p>
          <p>
            <strong>Copy palettes to test elsewhere.</strong> Use the Copy button to grab a palette's colors, then paste them into other tools like the Contrast Checker or Dark Light Mode Preview for deeper analysis.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding WCAG Contrast Ratings
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2 text-green-600">✓ WCAG AA</h3>
            <p className="text-sm text-muted-foreground">
              Contrast ratio of 4.5:1 or higher. Passes requirements for normal text (under 18pt). Safe for body copy, labels, and UI text.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2 text-yellow-600">△ AA Large</h3>
            <p className="text-sm text-muted-foreground">
              Contrast between 3:1 and 4.5:1. Only passes for large text (18pt+ or 14pt+ bold). Use for headings, not body copy.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2 text-red-600">✗ Not Accessible</h3>
            <p className="text-sm text-muted-foreground">
              Below 3:1 contrast. Fails WCAG requirements for any text size. Only use for decorative elements, not readable content.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How many palettes can I compare at once?</h3>
            <p className="text-sm text-muted-foreground">
              The interface supports up to 4 palettes simultaneously. This is intentional — comparing more than 4 becomes cognitively overwhelming. If you have more options, do iterative comparisons in rounds.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I import palettes from Figma or Sketch?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the hex codes from your design tool and paste them into the text input. The tool extracts any valid hex codes from the pasted text, regardless of formatting. You can also paste CSS variables and it will pull out the color values.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why is the contrast rating based on end-to-end only?</h3>
            <p className="text-sm text-muted-foreground">
              End-to-end contrast (lightest vs darkest) gives you the maximum possible contrast in the palette. If this passes WCAG AA, you know you have at least one accessible text/background combination. For checking all possible pairs, use the Palette Contrast Viewer.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What does average luminance tell me?</h3>
            <p className="text-sm text-muted-foreground">
              It indicates the overall "weight" or mood of a palette. A palette with 80% average luminance feels light and airy. One at 25% feels dark and dramatic. Matching luminance across palettes helps maintain visual consistency.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I save my comparisons for later?</h3>
            <p className="text-sm text-muted-foreground">
              This tool doesn't have built-in save functionality. Copy the hex codes of palettes you want to keep, or bookmark the page after loading your colors if URL persistence is available. For palette management, use the Favorite Colors Manager.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I remove a palette from the comparison?</h3>
            <p className="text-sm text-muted-foreground">
              Click the trash icon on any palette card to remove it. You need at least 2 palettes for comparison — if you try to remove one when only 2 remain, you'll get a reminder to add a replacement first.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What if my pasted colors don't load?</h3>
            <p className="text-sm text-muted-foreground">
              Make sure you're using valid 6-digit hex codes (like #3b82f6). The tool also accepts 3-digit shorthand (like #3bf). Named colors like "blue" or RGB values like rgb(59, 130, 246) aren't currently supported — convert them to hex first.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Related Tools for Palette Evaluation
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use this Comparison Tool when</strong> you need to evaluate multiple complete palettes side-by-side with summary statistics.
          </p>
          <p>
            <strong>Use the Palette Contrast Viewer when</strong> you need to check contrast between every possible color pair within a single palette.
          </p>
          <p>
            <strong>Use the Contrast Checker when</strong> you need detailed WCAG analysis for a specific text/background combination.
          </p>
          <p>
            <strong>Use the Dark Light Mode Preview when</strong> you want to see how a palette performs in both light and dark UI themes.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PaletteComparisonToolSEO;
