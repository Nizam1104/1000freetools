import React from "react";

export function PaletteSorterSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What the Palette Sorter Does
        </h2>
        <p className="text-muted-foreground">
          Organize any color palette by sorting colors along a specific attribute: hue (color wheel position), brightness (perceived lightness), saturation (color intensity), or lightness (HSL L value). Choose ascending or descending order to arrange colors logically.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How Color Sorting Works
        </h2>
        <p className="text-muted-foreground mb-4">
          Each color is converted to HSL (Hue, Saturation, Lightness) and RGB values. Depending on your sort choice, the tool extracts the relevant value and arranges colors from low to high (ascending) or high to low (descending). For brightness, it uses the standard luminance formula: 0.299R + 0.587G + 0.114B.
        </p>
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-medium mb-2">Sort attribute breakdown</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li><strong>Hue (0-360°):</strong> Arranges colors around the color wheel — reds, oranges, yellows, greens, blues, purples, back to reds</li>
            <li><strong>Brightness (0-255):</strong> Perceived lightness using human vision weights. Green contributes most, blue least.</li>
            <li><strong>Saturation (0-100%):</strong> From gray/muted to vivid/intense. Low saturation = pastel or gray, high = vibrant.</li>
            <li><strong>Lightness (0-100%):</strong> HSL lightness value. 0% = black, 100% = white, 50% = pure color.</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When Sorted Palettes Matter
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Design System Documentation</h3>
            <p className="text-sm text-muted-foreground">
              A team is documenting their color tokens. Instead of listing colors in random order, they sort by lightness — creating a clear progression from lightest to darkest. Documentation readers can quickly find the shade they need.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Style Guide Creation</h3>
            <p className="text-sm text-muted-foreground">
              Someone is building a brand style guide. They sort their palette by hue to show the full spectrum of brand colors in rainbow order. The sorted display looks professional and helps stakeholders understand the color system.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Data Visualization Legends</h3>
            <p className="text-sm text-muted-foreground">
              A data viz designer needs to arrange categorical colors in a legend. Sorting by hue ensures adjacent legend items have distinctly different colors, making the legend easier to scan.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Gradient Creation</h3>
            <p className="text-sm text-muted-foreground">
              Someone wants to create a smooth gradient from their palette. They sort by lightness, and the resulting order reveals the natural progression — perfect for creating gradient stops or sequential color scales.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Accessibility Audits</h3>
            <p className="text-sm text-muted-foreground">
              Sorting by brightness reveals which colors might be problematic. If multiple colors cluster at similar brightness values, they may not have enough contrast for distinguishable UI elements.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Palette Analysis</h3>
            <p className="text-sm text-muted-foreground">
              A designer wants to understand their palette's characteristics. Sorting by saturation shows whether they're working with mostly muted or vibrant colors. Sorting by hue reveals gaps in their color coverage.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Choosing the Right Sort Attribute
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Sort by Hue when...</h3>
            <p className="text-sm text-muted-foreground">
              You want rainbow order or need to group similar colors together. Great for showing color variety or organizing categorical palettes.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Sort by Brightness when...</h3>
            <p className="text-sm text-muted-foreground">
              You need colors arranged by perceived lightness. Best for creating visual hierarchies or ensuring readable text/background combinations.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Sort by Saturation when...</h3>
            <p className="text-sm text-muted-foreground">
              You want to separate muted/neutral colors from vibrant ones. Useful for identifying which colors are safe for backgrounds vs. accents.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Sort by Lightness when...</h3>
            <p className="text-sm text-muted-foreground">
              You need a clean light-to-dark progression. Ideal for creating shade scales, elevation systems, or sequential data visualization palettes.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding the Output
        </h2>
        <p className="text-muted-foreground mb-4">
          Each sorted color displays its full HSL values plus brightness. This lets you verify the sort order and understand why colors ended up where they did.
        </p>
        <div className="p-4 rounded-lg border bg-card">
          <h3 className="font-medium mb-2">Reading the color cards</h3>
          <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
            {`#3b82f6
H: 217°  S: 91%  L: 55%  B: 130`}
          </pre>
          <ul className="text-sm text-muted-foreground space-y-1 mt-2">
            <li><strong>H (Hue):</strong> Position on color wheel (0-360°)</li>
            <li><strong>S (Saturation):</strong> Color intensity (0-100%)</li>
            <li><strong>L (Lightness):</strong> HSL lightness (0-100%)</li>
            <li><strong>B (Brightness):</strong> Perceived luminance (0-255)</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Export Options
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">CSS Variables</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`:root {
  --color-1: #ef4444;
  --color-2: #f59e0b;
  --color-3: #22c55e;
}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Sorted colors as CSS custom properties. Drop into your stylesheet.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">JavaScript Array</h3>
            <pre className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto mt-2">
              {`["#ef4444", "#f59e0b", "#22c55e"]`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Ready to import into React, Vue, or any JS project.
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
            <h3 className="font-medium mb-2">Why do red and purple end up next to each other when sorting by hue?</h3>
            <p className="text-sm text-muted-foreground">
              Hue is circular — it wraps around at 360° back to 0°. Red is at 0°/360°, and purple/magenta is around 300-330°. In a circular sort, they're neighbors. The linear sort shows this as reds at the start and purples at the end.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between brightness and lightness?</h3>
            <p className="text-sm text-muted-foreground">
              Lightness is the L in HSL — a simple average of max and min RGB values. Brightness uses weighted coefficients (0.299R + 0.587G + 0.114B) that match human vision sensitivity. Brightness better represents how light/dark a color appears to humans.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I sort by multiple attributes?</h3>
            <p className="text-sm text-muted-foreground">
              This tool sorts by one attribute at a time. For multi-level sorting (like hue first, then lightness within each hue), you'd need to sort in passes or use a more advanced tool.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why did my sort order change when I switched from ascending to descending?</h3>
            <p className="text-sm text-muted-foreground">
              Ascending goes from low values to high (dark to light, unsaturated to saturated). Descending reverses this. Both are valid — choose based on whether you want to start with the "minimum" or "maximum" value.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I reset to the original order?</h3>
            <p className="text-sm text-muted-foreground">
              Click the Reset button to return to the original input order. Or reload your original colors — the tool doesn't modify your input, just displays a sorted version.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I save my sorted palette?</h3>
            <p className="text-sm text-muted-foreground">
              Use the Copy All button or export as CSS/JS. For persistent storage, use the Favorite Colors Manager or save the exported code in your project files.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What if two colors have the same sort value?</h3>
            <p className="text-sm text-muted-foreground">
              Colors with identical values for the sort attribute maintain their relative order from the input. This is called a "stable sort" — useful when you want predictable results.
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
            <strong>Use this Palette Sorter when</strong> you need to organize an existing palette by a specific color attribute for documentation, analysis, or visual clarity.
          </p>
          <p>
            <strong>Use the Color Scale Generator when</strong> you want to generate a new sorted scale from a single base color, not sort an existing multi-color palette.
          </p>
          <p>
            <strong>Use the Palette Duplicate Finder when</strong> you want to identify and remove similar colors before sorting your palette.
          </p>
          <p>
            <strong>Use the Gradient Palette Generator when</strong> you want to extract evenly-spaced colors from a gradient — the output is naturally sorted by the gradient progression.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PaletteSorterSEO;
