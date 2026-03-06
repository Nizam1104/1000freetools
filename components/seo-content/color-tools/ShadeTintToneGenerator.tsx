import React from "react";

export function ShadeTintToneGeneratorSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding Shades, Tints, and Tones
        </h2>
        <p className="text-muted-foreground">
          These three terms describe specific ways to modify a base color:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Shade:</strong> Adding black to darken the color</li>
          <li><strong>Tint:</strong> Adding white to lighten the color</li>
          <li><strong>Tone:</strong> Adding gray to desaturate the color</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          This tool generates all three variations from a single base color, giving you a full range of related colors to work with.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Generator Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The tool adjusts the HSL values of your base color:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Shades decrease lightness (darker)</li>
          <li>Tints increase lightness (lighter)</li>
          <li>Tones decrease saturation (more muted)</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          You choose how many variations to generate (3-10) and get a complete set of colors that all relate back to your base.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When to Use Each Variation
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Shades (Darker)</h3>
            <p className="text-sm text-muted-foreground">
              Use for text colors, borders, hover states, shadows, and depth. Darker shades of your brand color feel related but provide contrast.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Tints (Lighter)</h3>
            <p className="text-sm text-muted-foreground">
              Use for backgrounds, highlights, disabled states, and subtle accents. Light tints create visual hierarchy without introducing new hues.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Tones (Muted)</h3>
            <p className="text-sm text-muted-foreground">
              Use for secondary elements, backgrounds that don't compete with content, and creating sophisticated, less saturated palettes.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Real Use Cases
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Button State System</h3>
            <p className="text-sm text-muted-foreground">
              Base color for the default button. A tint for hover. A shade for pressed/active. A muted tone for disabled. All four states feel cohesive.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Card Component Hierarchy</h3>
            <p className="text-sm text-muted-foreground">
              Lightest tint for the card background. Base color for the header. Medium shade for the title. Darkest shade for body text.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Brand Color Expansion</h3>
            <p className="text-sm text-muted-foreground">
              A startup has one brand color. This tool generates 20+ related colors they can use across their website, app, and marketing materials.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Accessible Text Colors</h3>
            <p className="text-sm text-muted-foreground">
              Generate shades until you find one that passes WCAG contrast requirements against your background. No guessing needed.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Exporting Your Variations
        </h2>
        <p className="text-muted-foreground mb-3">
          The CSS export gives you organized custom properties:
        </p>
        <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto mb-4">
          {`:root {
  /* Base */
  --base: #3B82F6;
  
  /* Shades (darker) */
  --shade-1: #2563EB;
  --shade-2: #1D4ED8;
  
  /* Tints (lighter) */
  --tint-1: #60A5FA;
  --tint-2: #93C5FD;
  
  /* Tones (muted) */
  --tone-1: #6B93D6;
  --tone-2: #8FA8D8;
}`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How many variations should I generate?</h3>
            <p className="text-sm text-muted-foreground">
              5 is a good starting point — base, 2 shades, 2 tints. For comprehensive systems, generate 8-10 for more granular control.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why do some tones look muddy?</h3>
            <p className="text-sm text-muted-foreground">
              Heavily desaturated colors can look muddy, especially with certain hues. Try fewer tone variations or adjust the base color's saturation first.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use this for monochromatic palettes?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, shades and tints create a monochromatic palette. For a dedicated monochromatic generator with more control, use the Monochrome Palette Generator.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between this and Color Scale Generator?</h3>
            <p className="text-sm text-muted-foreground">
              This tool generates all three types (shade/tint/tone) separately. Color Scale Generator creates a single continuous scale with more customization options.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I use these in Tailwind?</h3>
            <p className="text-sm text-muted-foreground">
              Export as CSS variables and use with {`var(--shade-1)`} in your CSS. Or copy the hex values into your Tailwind config manually.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I adjust the step size between variations?</h3>
            <p className="text-sm text-muted-foreground">
              This tool uses fixed increments. For custom step sizes, use the Color Scale Generator which offers more granular control.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Better Color Variations
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Start with a mid-saturation base.</strong> Very saturated colors can become overwhelming when varied. Very desaturated colors don't have much room to mute further.
          </p>
          <p>
            <strong>Test combinations.</strong> Not every shade works with every tint. Mix and match to find the best pairs for your use case.
          </p>
          <p>
            <strong>Consider the context.</strong> A shade that looks good in isolation might not have enough contrast against your background. Always test in context.
          </p>
          <p>
            <strong>Use tones for backgrounds.</strong> Muted tones make excellent backgrounds because they don't compete with content. They provide color without visual noise.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ShadeTintToneGeneratorSEO;
