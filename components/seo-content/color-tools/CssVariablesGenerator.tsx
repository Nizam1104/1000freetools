import React from "react";

export function CssVariablesGeneratorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What This Tool Generates
        </h2>
        <p className="text-muted-foreground">
          Paste a color palette and get CSS custom properties (variables) with RGB fallbacks. The output includes modern CSS syntax that works with CSS-in-JS, Tailwind integration, and HSL variants for dynamic theming.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Why Use CSS Variables for Colors
        </h2>
        <p className="text-muted-foreground mb-4">
          CSS custom properties let you define a color once and use it everywhere. Change the variable value, and every instance updates automatically. This is essential for:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Dark mode theming (swap variable values, not individual colors)</li>
          <li>Brand color updates (change one variable, update the entire site)</li>
          <li>Dynamic styling with JavaScript (modify variables at runtime)</li>
          <li>Consistent color usage across large codebases</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding the Output Format
        </h2>
        <p className="text-muted-foreground mb-4">
          The generator produces multiple formats for each color:
        </p>
        <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto mb-4">
          {`:root {
  /* Primary color with RGB fallback */
  --primary: #3B82F6;
  --primary-rgb: 59, 130, 246;
  
  /* HSL for dynamic adjustments */
  --primary-h: 217;
  --primary-s: 91%;
  --primary-l: 60%;
}`}
        </pre>
        <p className="text-muted-foreground">
          Use {`var(--primary)`} for the hex value, {`rgb(var(--primary-rgb))`} for RGB contexts, or {`hsl(var(--primary-h), var(--primary-s), var(--primary-l))`} for HSL.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Real Use Cases
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Dark Mode Implementation</h3>
            <p className="text-sm text-muted-foreground">
              Define light mode colors in {`:root`}, dark mode in {`[data-theme="dark"]`}. Toggle the data attribute and all colors update automatically.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Component Library Theming</h3>
            <p className="text-sm text-muted-foreground">
              Build components that use {`var(--primary)`} instead of hardcoded colors. Consumers theme your components by overriding the variables.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Brand Color Experiments</h3>
            <p className="text-sm text-muted-foreground">
              Hook up variables to a color picker. Designers can adjust brand colors in real-time and see the impact across the entire site.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Tailwind CSS Integration</h3>
            <p className="text-sm text-muted-foreground">
              Reference CSS variables in tailwind.config.js. Get the flexibility of variables with the utility-first workflow of Tailwind.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tailwind CSS Integration
        </h2>
        <p className="text-muted-foreground mb-3">
          The Tailwind export format integrates CSS variables directly into your config:
        </p>
        <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto mb-4">
          {`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary-h), var(--primary-s), var(--primary-l))',
      }
    }
  }
}`}
        </pre>
        <p className="text-muted-foreground">
          Now use {`bg-primary`}, {`text-primary`}, {`border-primary`} throughout your project.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Do CSS variables work in all browsers?</h3>
            <p className="text-sm text-muted-foreground">
              CSS custom properties are supported in all modern browsers (Chrome 49+, Firefox 31+, Safari 9.1+, Edge 15+). IE11 doesn't support them — use a PostCSS plugin for fallbacks if needed.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why include RGB values separately?</h3>
            <p className="text-sm text-muted-foreground">
              Some CSS properties need RGB format, like {`rgba()`} for transparency. Having {`--primary-rgb`} lets you write {`rgba(var(--primary-rgb), 0.5)`} without parsing the hex.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I nest CSS variables?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can reference one variable in another: {`--dark-primary: hsl(var(--primary-h), var(--primary-s), 30%);`} This creates a darker variant using the same hue and saturation.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I use variables in JavaScript?</h3>
            <p className="text-sm text-muted-foreground">
              Read with {`getComputedStyle(document.documentElement).getPropertyValue('--primary')`}. Write with {`document.documentElement.style.setProperty('--primary', '#newColor')`}.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between this and Palette Export Tool?</h3>
            <p className="text-sm text-muted-foreground">
              Palette Export Tool offers more format options (JSON, SCSS, etc.). This tool focuses specifically on CSS variables with RGB fallbacks and HSL breakdowns for advanced theming.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I scope variables to specific elements?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, define variables on any selector: {`.card { --card-bg: #fff; }`}. They'll only apply within that element and its children.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for CSS Variable Organization
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use consistent naming.</strong> Pick a convention (--primary, --brand-primary, --color-primary) and stick with it across your project.
          </p>
          <p>
            <strong>Group by purpose.</strong> Separate variables into categories: brand colors, UI colors, semantic colors (success, warning, error).
          </p>
          <p>
            <strong>Document your variables.</strong> Add comments explaining what each variable is for. Future you (and your teammates) will thank you.
          </p>
          <p>
            <strong>Start small.</strong> Don't create 100 variables on day one. Add variables as you identify repeated colors in your codebase.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CssVariablesGeneratorSEO;
