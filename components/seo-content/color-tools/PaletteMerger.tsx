import React from "react";

export function PaletteMergerSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What the Palette Merger Does
        </h2>
        <p className="text-muted-foreground">
          Combine two or more color palettes into a single unified set. Add palettes by pasting hex codes or loading presets, then merge them with optional duplicate removal. The merged result shows all colors in a preview bar plus individual swatches with export options.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How Merging Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool concatenates all colors from all input palettes in order. If duplicate removal is enabled, it checks each new color against already-merged colors using HSL distance. Colors within your similarity threshold are skipped, keeping only the first occurrence.
        </p>
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-medium mb-2">Duplicate removal settings</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li><strong>Very Strict (5%):</strong> Only removes near-identical colors (off by 1-2 RGB values)</li>
            <li><strong>Strict (10%):</strong> Removes colors that are very similar but not obviously so</li>
            <li><strong>Moderate (15%):</strong> Good balance for consolidating design tokens</li>
            <li><strong>Loose (20%):</strong> Aggressive consolidation — removes colors that are visibly similar</li>
            <li><strong>Very Loose (30%):</strong> Maximum consolidation — keeps only distinctly different colors</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Real Merge Scenarios
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Combining Brand and UI Palettes</h3>
            <p className="text-sm text-muted-foreground">
              A company has brand colors (logo, marketing) and separate UI colors (buttons, states). They merge both to create a master palette for their design system. With duplicate removal on, they discover their "primary blue" exists in both palettes with slightly different values — time to standardize.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Consolidating Team Contributions</h3>
            <p className="text-sm text-muted-foreground">
              Four designers each created color palettes for different features. Merging them reveals 23 total colors, but with 15% similarity threshold, only 14 are unique. The team agrees on the 14-color consolidated set for their shared library.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Migrating from Multiple Projects</h3>
            <p className="text-sm text-muted-foreground">
              Someone is consolidating three old projects into one codebase. Each has its own color variables. They extract all colors, merge them here, and discover significant overlap. The new unified palette is half the size of the three combined.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Building a Comprehensive Token Set</h3>
            <p className="text-sm text-muted-foreground">
              A design team merges their primary, secondary, neutral, semantic (success/warning/error), and brand palettes into one master reference. The merged preview shows all 32 colors in sequence, helping them spot gaps or redundancies.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Vendor Color Harmonization</h3>
            <p className="text-sm text-muted-foreground">
              A company works with multiple agencies, each using slightly different color values. They merge all agency palettes, identify the variations, and publish an official consolidated palette that everyone must use going forward.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Clean Merges
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Name your palettes before merging.</strong> It's easier to track which colors came from where if you label them "Brand," "UI," "Marketing," etc. The tool shows palette names in the preview.
          </p>
          <p>
            <strong>Start with duplicate removal ON.</strong> Unless you specifically want all colors (including duplicates), enable removal. You can always see what was removed and adjust the threshold.
          </p>
          <p>
            <strong>Review the merged preview bar.</strong> The horizontal color strip shows all merged colors in sequence. If you see adjacent colors that look identical, your threshold might be too loose.
          </p>
          <p>
            <strong>Use presets to test the workflow.</strong> The Ocean, Sunset, Forest, and Warm presets let you experiment with merging before loading your actual palettes.
          </p>
          <p>
            <strong>Export before making decisions.</strong> Download the merged palette as JSON or CSS, then review it in your actual design tool or codebase. Sometimes context reveals issues the preview doesn't show.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Export Formats
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Comma-Separated List</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`#0077b6, #00b4d8, #90e0ef, #ff6b6b, #feca57`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Simple format for pasting into other tools, docs, or chat messages.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">CSS Variables</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`:root {
  --color-1: #0077b6;
  --color-2: #00b4d8;
  --color-3: #90e0ef;
}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Ready to drop into your global CSS. Reference as {`var(--color-1)`}.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Individual Color Data</h3>
            <p className="text-sm text-muted-foreground">
              Each merged color shows its hex value and lightness percentage. This helps you understand the distribution — whether your merged palette is heavy on darks, lights, or balanced.
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
            <h3 className="font-medium mb-2">How many palettes can I merge?</h3>
            <p className="text-sm text-muted-foreground">
              There's no hard limit — add as many as you need. However, merging more than 5-6 palettes often produces unwieldy results. Consider merging in stages: combine related palettes first, then merge the results.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What order do merged colors appear in?</h3>
            <p className="text-sm text-muted-foreground">
              Colors appear in the order you added the palettes, with each palette's colors in their original order. If you need a different arrangement, use the Palette Sorter after merging.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I undo a merge?</h3>
            <p className="text-sm text-muted-foreground">
              The tool doesn't have undo functionality, but you can keep your original palettes in the list and re-merge with different settings. Or just reload the page and start fresh.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why did duplicate removal skip some colors that look similar?</h3>
            <p className="text-sm text-muted-foreground">
              The similarity calculation uses HSL distance with weighted components. Two colors might look similar but have different hue values that push them over the threshold. Try increasing the threshold percentage for more aggressive deduplication.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I edit colors after merging?</h3>
            <p className="text-sm text-muted-foreground">
              The merged result is read-only in this tool. Copy the merged colors and paste them into another tool (like the Color Palette Generator) if you need to modify individual values.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I save my merged palette?</h3>
            <p className="text-sm text-muted-foreground">
              Use the Copy All button to grab the hex list, or download as CSS/JSON. For long-term palette management, use the Favorite Colors Manager or Palette Export Tool.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What happens if I merge palettes with the same colors?</h3>
            <p className="text-sm text-muted-foreground">
              With duplicate removal ON, each unique color appears only once. With it OFF, you'll see every occurrence — so if three palettes contain #3b82f6, you'll get it three times in the merge.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When to Use This vs. Other Tools
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use this Palette Merger when</strong> you need to combine multiple distinct palettes into one set with optional deduplication.
          </p>
          <p>
            <strong>Use the Palette Duplicate Finder when</strong> you have one large palette and want to find/remove internal duplicates without merging separate sources.
          </p>
          <p>
            <strong>Use the Palette Comparison Tool when</strong> you want to evaluate palettes side-by-side before deciding whether to merge them.
          </p>
          <p>
            <strong>Use the Palette Sorter when</strong> you want to reorganize merged colors by hue, lightness, or saturation after combining them.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PaletteMergerSEO;
