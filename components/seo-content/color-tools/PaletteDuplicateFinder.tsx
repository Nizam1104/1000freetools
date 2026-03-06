import React from "react";

export function PaletteDuplicateFinderSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What This Duplicate Finder Detects
        </h2>
        <p className="text-muted-foreground">
          This tool finds both exact duplicate colors (same hex code appearing multiple times) and near-duplicates (colors so similar they're visually indistinguishable). Set a similarity threshold to catch colors within 5%, 10%, or 20% of each other in HSL color space.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How Duplicate Detection Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool converts each color to HSL (Hue, Saturation, Lightness), then calculates the distance between every pair. Colors within your threshold are grouped together. The first color in each group is kept; the rest are marked as duplicates.
        </p>
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-medium mb-2">Understanding the threshold</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li><strong>0-3% (Exact match):</strong> Only catches identical hex codes like #3b82f6 appearing twice</li>
            <li><strong>4-8% (Very similar):</strong> Catches near-identicals like #3b82f6 and #3c83f7 — colors that differ by 1-2 RGB values</li>
            <li><strong>9-20% (Similar):</strong> Catches colors that look similar but aren't identical — useful for consolidating design system tokens</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When You Need to Find Duplicate Colors
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Merging Design System Tokens</h3>
            <p className="text-sm text-muted-foreground">
              Two teams have been maintaining separate color token files. When merged, the combined palette has 47 colors — but this tool reveals only 32 are unique. The duplicates were created independently but represent the same visual intent.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Cleaning Up Figma Libraries</h3>
            <p className="text-sm text-muted-foreground">
              A designer's Figma file has accumulated colors over months of work. They export all colors, run them through this tool, and discover 8 near-identical grays that can be consolidated into 3. Their color styles become much cleaner.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Auditing Client Brand Assets</h3>
            <p className="text-sm text-muted-foreground">
              A client sends over their "official" brand colors collected from various vendors. The audit reveals 4 slightly different versions of their brand blue — each vendor used slightly different values. They pick one official value and update everyone.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Preparing Palettes for Export</h3>
            <p className="text-sm text-muted-foreground">
              Before exporting a palette to share with teammates, someone runs a duplicate check. They catch 3 accidental duplicates from copy-paste errors. The exported palette is cleaner and more professional.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Reducing CSS Bundle Size</h3>
            <p className="text-sm text-muted-foreground">
              A developer notices their CSS has dozens of color values. They extract all unique colors, find near-duplicates, and consolidate. Their CSS custom properties drop from 50 colors to 28 — smaller bundle, easier maintenance.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How to Use the Duplicate Finder
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Paste your color list.</strong> Any format works: comma-separated, space-separated, one per line, or even pasted from CSS/JSON. The tool extracts all valid hex codes.
          </p>
          <p>
            <strong>Start with a strict threshold.</strong> Begin at 5% to catch only obvious duplicates. If you want more aggressive consolidation, increase to 10-15%.
          </p>
          <p>
            <strong>Review each duplicate group.</strong> The tool shows which color will be kept (first in the group) and which will be removed. You can manually adjust before applying changes.
          </p>
          <p>
            <strong>Use the distance metric.</strong> Each group shows the maximum distance between colors. A group with 2.3% max distance contains very similar colors. A group at 18% has more noticeable variation.
          </p>
          <p>
            <strong>Copy or remove with one click.</strong> Either copy the deduplicated list to your clipboard, or let the tool remove duplicates and show you the cleaned result directly.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding Color Distance
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool calculates distance in HSL space, weighting hue differences more heavily than saturation or lightness. This matches human perception — we notice hue shifts more readily than slight changes in brightness.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Hue (50% weight)</h3>
            <p className="text-sm text-muted-foreground">
              The actual color (red, blue, green, etc.). A 10° hue shift is more noticeable than a 10% lightness shift.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Saturation (25% weight)</h3>
            <p className="text-sm text-muted-foreground">
              How vivid vs. muted the color is. Differences matter less than hue but still affect perceived similarity.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Lightness (25% weight)</h3>
            <p className="text-sm text-muted-foreground">
              How light or dark. Two colors with same hue but different lightness can still look related (like shade variations).
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
            <h3 className="font-medium mb-2">What counts as an exact duplicate?</h3>
            <p className="text-sm text-muted-foreground">
              Exact duplicates have identical hex codes — #3b82f6 and #3b82f6. The tool also normalizes formats, so #3B82F6 (uppercase) and #3b82f6 (lowercase) are treated as identical.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why are these colors grouped as duplicates when they look different?</h3>
            <p className="text-sm text-muted-foreground">
              If your threshold is set high (15-20%), colors with noticeable differences may be grouped. Lower the threshold to 5-8% for stricter matching. The "max distance" shown for each group tells you how different the grouped colors actually are.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I choose which duplicate to keep?</h3>
            <p className="text-sm text-muted-foreground">
              The tool keeps the first color in each group (by order of appearance). To keep a different one, rearrange your input so the desired color appears first in its group, then re-run the detection.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Does this work with color names or RGB values?</h3>
            <p className="text-sm text-muted-foreground">
              Currently, only hex codes are supported. For named colors (like "navy") or RGB values, convert them to hex first using the Color Picker or one of the format converter tools.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I handle alpha/transparency?</h3>
            <p className="text-sm text-muted-foreground">
              This tool doesn't currently process alpha channels. Colors with transparency like #3b82f680 are treated as opaque #3b82f6. For full RGBA duplicate detection, you'd need a more advanced tool.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's a reasonable threshold for design systems?</h3>
            <p className="text-sm text-muted-foreground">
              For consolidating design tokens, 8-12% usually works well. This catches colors that are similar enough to be intentional variations but different enough to potentially be accidental duplicates. Start at 10% and adjust based on results.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I merge colors from multiple palettes?</h3>
            <p className="text-sm text-muted-foreground">
              Yes — paste all colors from all palettes into the input. The tool doesn't care about original palette boundaries; it just finds duplicates across the entire set. For more control, use the Palette Merger tool.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Related Palette Management Tools
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use this Duplicate Finder when</strong> you need to identify and remove redundant colors from a single palette or merged color list.
          </p>
          <p>
            <strong>Use the Palette Merger when</strong> you want to combine multiple palettes with optional duplicate removal during the merge process.
          </p>
          <p>
            <strong>Use the Palette Sorter when</strong> you want to organize colors by hue, lightness, or saturation after cleaning up duplicates.
          </p>
          <p>
            <strong>Use the Palette Comparison Tool when</strong> you want to compare multiple palettes side-by-side before deciding which to use or merge.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PaletteDuplicateFinderSEO;
