import React from "react";

export function PaletteContrastViewerSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What the Contrast Matrix Shows
        </h2>
        <p className="text-muted-foreground">
          This tool builds a grid showing the contrast ratio between every possible pair of colors in your palette. Instead of testing combinations one at a time, you see the entire accessibility landscape at once — making it easy to spot which color pairs work for text and which don't.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How to Read the Contrast Matrix
        </h2>
        <p className="text-muted-foreground mb-4">
          Each cell in the grid represents the contrast ratio between two colors. The row color and column color intersect at a cell showing their ratio. Color-coded badges indicate WCAG compliance: green for AAA, blue for AA, yellow for Fair (large text only), red for Poor.
        </p>
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-medium mb-2">The diagonal tells you something important</h3>
          <p className="text-sm text-muted-foreground">
            Cells along the diagonal (where a color meets itself) always show 1:1 contrast — because any color against itself has zero contrast. Use the off-diagonal cells to find usable combinations.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Who Needs a Contrast Matrix
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Design System Builders</h3>
            <p className="text-sm text-muted-foreground">
              A design team is documenting their color tokens. They load all 12 brand colors into the matrix and discover that 3 of their "neutral" grays don't have enough contrast against white backgrounds. They adjust the values before publishing the system.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Accessibility Auditors</h3>
            <p className="text-sm text-muted-foreground">
              Someone is reviewing a website for WCAG compliance. They extract the site's color palette, load it here, and immediately see which text/background combinations fail. The matrix becomes their audit checklist.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Data Visualization Designers</h3>
            <p className="text-sm text-muted-foreground">
              A designer is creating a chart with color-coded categories. They need each category label to be readable against its background color. The matrix shows which category colors can safely contain white text and which need black.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Component Library Authors</h3>
            <p className="text-muted-foreground text-sm">
              Someone is building a React component library with themeable colors. They use the matrix to verify that every combination their users might choose still meets accessibility standards — preventing support tickets down the road.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Design Handoff Documentation</h3>
            <p className="text-sm text-muted-foreground">
              A designer includes the contrast matrix in their handoff docs so developers know which color combinations are safe. Instead of guessing or filing bugs, devs can reference the matrix directly.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding WCAG Contrast Levels
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">AAA (7:1 or higher)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              The gold standard for accessibility. Passes WCAG AAA requirements for all text sizes. Use for critical content, small text, or when designing for users with vision impairments.
            </p>
            <p className="text-xs text-muted-foreground">
              Example: Pure black (#000000) on pure white (#FFFFFF) = 21:1
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">AA (4.5:1 or higher)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Minimum standard for normal text under 18pt. Required for most professional websites and apps under legal accessibility requirements.
            </p>
            <p className="text-xs text-muted-foreground">
              Example: Dark gray (#333333) on white = 12.6:1
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Fair (3:1 to 4.5:1)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Only passes for large text (18pt+ or 14pt+ bold). Acceptable for headings, buttons, and UI elements — not body copy.
            </p>
            <p className="text-xs text-muted-foreground">
              Example: Medium gray (#666666) on white = 5.7:1
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Poor (below 3:1)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Fails WCAG for any text use. Only use these color pairs for decorative elements, dividers, or non-text UI components.
            </p>
            <p className="text-xs text-muted-foreground">
              Example: Light gray (#CCCCCC) on white = 1.6:1
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Using the Contrast Matrix
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Start with your full palette.</strong> Load all the colors you plan to use — backgrounds, text, accents, states. The matrix is most useful when you see every possible interaction.
          </p>
          <p>
            <strong>Look for the green cells.</strong> These are your safe text/background combinations. If a color row has no green cells, that color probably shouldn't be used as a text color at all.
          </p>
          <p>
            <strong>Watch out for adjacent lightness values.</strong> Colors that are close in lightness (like two medium grays) often fail contrast checks. The matrix makes these problem pairs obvious.
          </p>
          <p>
            <strong>Use the color previews.</strong> The preview section at the bottom shows how each color looks with sample text and buttons. This helps you visualize real-world usage beyond just the numbers.
          </p>
          <p>
            <strong>Iterate as you adjust.</strong> If a color fails, tweak it and re-add it to the palette. Watch how the entire row and column update — one change can fix multiple contrast issues.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How many colors can I test at once?</h3>
            <p className="text-sm text-muted-foreground">
              There's no hard limit, but the matrix grows quadratically — 5 colors = 25 cells, 10 colors = 100 cells. For usability, stick to 6-8 colors max. If you have more, test in logical groups (neutrals together, accents together).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why do some cells show the same ratio?</h3>
            <p className="text-sm text-muted-foreground">
              The matrix is symmetric — the contrast between color A and B is the same as B and A. So cells mirror across the diagonal. This isn't a bug; it helps you see patterns more easily.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I test more than just hex colors?</h3>
            <p className="text-sm text-muted-foreground">
              This tool currently accepts hex codes only. For RGB, HSL, or named colors, convert them to hex first using the Color Picker or one of the color format converter tools.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Does this guarantee my design is accessible?</h3>
            <p className="text-sm text-muted-foreground">
              No — this checks color contrast only. Accessibility also involves focus indicators, keyboard navigation, screen reader support, and more. But contrast is a critical piece, and this tool ensures you get that part right.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What if I need to test opacity combinations?</h3>
            <p className="text-sm text-muted-foreground">
              This tool tests solid colors only. For semi-transparent overlays, calculate the resulting color first (there are online calculators for this), then test that resulting color in the matrix.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I share my contrast matrix with my team?</h3>
            <p className="text-sm text-muted-foreground">
              Take a screenshot of the matrix, or copy the color list and have teammates load it themselves. For documentation, consider exporting your palette as CSS variables and including the matrix image alongside.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why is the contrast calculation important?</h3>
            <p className="text-sm text-muted-foreground">
              The contrast ratio formula accounts for human perception of brightness differences. It's not just about lightness — the formula weights green higher than red, and red higher than blue, matching how human eyes actually perceive luminance.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When to Use This vs. Other Contrast Tools
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use this Contrast Viewer when</strong> you need to check all possible color pair combinations within a palette at once — ideal for comprehensive accessibility audits.
          </p>
          <p>
            <strong>Use the Contrast Checker when</strong> you have one specific text/background pair to test and need detailed results with suggestions.
          </p>
          <p>
            <strong>Use the Text Color Suggestion Tool when</strong> you have a background color and need recommendations for accessible text colors.
          </p>
          <p>
            <strong>Use the Palette Comparison Tool when</strong> you want to compare overall palette statistics (average luminance, end-to-end contrast) rather than individual color pairs.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PaletteContrastViewerSEO;
