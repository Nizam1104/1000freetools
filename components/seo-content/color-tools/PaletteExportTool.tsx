import React from "react";

export function PaletteExportToolSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What This Tool Exports
        </h2>
        <p className="text-muted-foreground">
          You paste or enter a color palette (2-20 colors), and this tool converts it into ready-to-use code for your specific tech stack. Choose from CSS, SCSS, JSON, Tailwind, plain text, SwiftUI, or Android XML formats.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Supported Export Formats
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">CSS Variables</h3>
            <pre className="text-xs font-mono bg-muted p-2 rounded mt-2">
              {`--color-1: #3B82F6;
--color-2: #10B981;`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Use with {`var(--color-1)`} in any CSS property.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">SCSS Variables</h3>
            <pre className="text-xs font-mono bg-muted p-2 rounded mt-2">
              {`$color-1: #3B82F6;
$color-2: #10B981;`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Import into Sass/SCSS projects.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">JSON</h3>
            <pre className="text-xs font-mono bg-muted p-2 rounded mt-2">
              {`{"color1": "#3B82F6",
"color2": "#10B981"}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Import into JavaScript or design tools.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Tailwind Config</h3>
            <pre className="text-xs font-mono bg-muted p-2 rounded mt-2">
              {`colors: {
  brand1: '#3B82F6',
  brand2: '#10B981',
}`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              Extend Tailwind's theme.colors.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">SwiftUI</h3>
            <pre className="text-xs font-mono bg-muted p-2 rounded mt-2">
              {`Color(hex: "3B82F6")
Color(hex: "10B981")`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              iOS app color definitions.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Android XML</h3>
            <pre className="text-xs font-mono bg-muted p-2 rounded mt-2">
              {`<color name="color1">#3B82F6</color>
<color name="color2">#10B981</color>`}
            </pre>
            <p className="text-sm text-muted-foreground mt-2">
              colors.xml for Android apps.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How to Import Palettes
        </h2>
        <p className="text-muted-foreground mb-4">
          Paste colors in any common format. The tool recognizes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Comma-separated hex codes: {`#3B82F6, #10B981, #F59E0B`}</li>
          <li>CSS variables: {`--primary: #3B82F6; --secondary: #10B981;`}</li>
          <li>SCSS variables: {`$primary: #3B82F6; $secondary: #10B981;`}</li>
          <li>JSON arrays: {`["#3B82F6", "#10B981"]`}</li>
          <li>Figma clipboard format (paste directly from Figma)</li>
          <li>CSS gradient definitions: {`linear-gradient(#3B82F6, #10B981)`}</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Real Use Cases
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Design Handoff to Development</h3>
            <p className="text-sm text-muted-foreground">
              A designer exports a palette from Figma, pastes it here, and generates CSS variables. The developer copies the output directly into the project's global stylesheet.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Cross-Platform Brand Consistency</h3>
            <p className="text-sm text-muted-foreground">
              A brand team generates exports for web (CSS), iOS (SwiftUI), and Android (XML) from the same palette. All platforms use identical brand colors.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Tailwind Project Setup</h3>
            <p className="text-sm text-muted-foreground">
              A developer extracts colors from a design, pastes them here, and exports as Tailwind config. They merge it into tailwind.config.js and start using custom colors immediately.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Design System Documentation</h3>
            <p className="text-sm text-muted-foreground">
              A team documents their color palette as JSON for their design system docs site. The same JSON powers both the documentation and the actual implementation.
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
            <h3 className="font-medium mb-2">How many colors can I export?</h3>
            <p className="text-sm text-muted-foreground">
              There's no hard limit, but 5-15 colors is typical for a palette. Very large palettes (50+ colors) might be unwieldy in code.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I name my colors?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses generic names (color-1, color-2). For custom names, use the Favorite Colors Manager or add names manually after exporting.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Does this work with RGBA/HSLA colors?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, the tool preserves alpha channels in formats that support them (CSS, SCSS). JSON exports include the full color string.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I use the Tailwind export?</h3>
            <p className="text-sm text-muted-foreground">
              Copy the output and paste it into the {`theme.extend.colors`} section of your tailwind.config.js. Then use classes like {`bg-brand-1`} or {`text-brand-2`}.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I export palettes from other tools?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, paste palettes from Figma, Coolors, Adobe Color, or any source. As long as the colors are in a recognizable format, this tool can convert them.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What if I need to edit colors after exporting?</h3>
            <p className="text-sm text-muted-foreground">
              Re-paste your edited palette and export again. For ongoing management, use the Favorite Colors Manager or Color History Tool to store palettes between sessions.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Clean Exports
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Remove unused colors first.</strong> A palette with 20 colors might have 5 you don't actually use. Trim before exporting to keep code clean.
          </p>
          <p>
            <strong>Group related colors.</strong> Put all primary shades together, all neutrals together. The export order matches your input order.
          </p>
          <p>
            <strong>Use consistent naming in your source.</strong> If pasting from CSS variables, use consistent prefixes (--brand-, --ui-) for easier refactoring later.
          </p>
          <p>
            <strong>Save your exports.</strong> Copy the output to a file immediately. It's easy to lose generated code if you navigate away.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PaletteExportToolSEO;
