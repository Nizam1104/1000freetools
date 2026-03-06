import React from "react";

export function CssColorNameConverterSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Are CSS Named Colors?
        </h2>
        <p className="text-muted-foreground">
          CSS defines 140+ color names you can use directly in stylesheets: {`color: tomato;`}, {`background: steelblue;`}, {`border: coral;`}. These names are standardized in the CSS Color Module and work in all browsers without quotes or special syntax.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Why Use Color Names
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Readability:</strong> {`color: firebrick;`} is more descriptive than {`color: #B22222;`}. Team members immediately understand the color intent.
          </p>
          <p>
            <strong>Memorability:</strong> Easy to remember "goldenrod" is a yellow-gold color. Harder to recall that #DAA520 is the same thing.
          </p>
          <p>
            <strong>Less typing:</strong> "navy" is 4 characters vs "#000080" at 7 characters. Small savings add up in large stylesheets.
          </p>
          <p>
            <strong>No lookup needed:</strong> Once you know the names, you don't need to look up hex codes. "Just use coral" is faster than finding coral's hex value.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Converter Works
        </h2>
        <p className="text-muted-foreground mb-4">
          Enter a color name (like "tomato") and get its hex, RGB, and HSL equivalents. Or search by hex code to find if it matches a named color. The tool includes all 140+ CSS Color Module Level 4 names.
        </p>
        <p className="text-muted-foreground">
          Common names include: red, blue, green, yellow, orange, purple, pink, brown, gray/grey variants, and more specific names like coral, salmon, turquoise, lavender.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Named Color Categories
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Basic Colors (17)</h3>
            <p className="text-sm text-muted-foreground">
              The original HTML colors: black, white, red, green, blue, yellow, cyan, magenta, silver, gray, maroon, olive, lime, aqua, teal, navy, fuchsia.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Extended Colors (123+)</h3>
            <p className="text-sm text-muted-foreground">
              X11 color names adopted by CSS: aliceblue, darkblue, lightgreen, mediumorchid, papayawhip, rebeccapurple (added in CSS Color Level 4).
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When NOT to Use Color Names
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Precise brand colors:</strong> Your brand blue probably isn't exactly any named color. Use hex or RGB for brand accuracy.
          </p>
          <p>
            <strong>Accessibility-critical colors:</strong> Don't assume "red" is accessible. Check contrast ratios. Named colors vary widely in lightness.
          </p>
          <p>
            <strong>Consistent theming:</strong> Named colors are fixed values. For themeable designs, use CSS variables with hex values.
          </p>
          <p>
            <strong>Print design:</strong> Named colors are screen-defined. For print, you need CMYK values which names don't provide.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Are color names case-sensitive?</h3>
            <p className="text-sm text-muted-foreground">
              No, CSS color names are case-insensitive. {`Tomato`}, {`TOMATO`}, and {`tomato`} all work identically.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between gray and grey?</h3>
            <p className="text-sm text-muted-foreground">
              Both work and produce the same color (#808080). CSS accepts both spellings. "Gray" is more common in American English, "grey" in British English.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why is there a "rebeccapurple" color?</h3>
            <p className="text-sm text-muted-foreground">
              Added in 2014 to honor Rebecca Alison Meyer, daughter of CSS co-inventor Chris Coyier. It's #663399 — a specific purple she loved.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Do all browsers support all color names?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, all 140+ names are supported in all modern browsers. They're part of the CSS specification and have been stable for years.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use color names in JavaScript?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, any CSS color works in JavaScript: {`element.style.color = 'tomato';`}. The browser parses it the same way as in CSS.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the closest named color to my hex?</h3>
            <p className="text-sm text-muted-foreground">
              Enter your hex code in the search. The tool finds the nearest named color by comparing RGB values. Note that most hex codes won't match a named color exactly.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Popular CSS Color Names
        </h2>
        <div className="grid grid-cols-4 gap-3 text-sm">
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: 'tomato' }}></div>
            <code>tomato</code>
          </div>
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: 'coral' }}></div>
            <code>coral</code>
          </div>
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: 'steelblue' }}></div>
            <code>steelblue</code>
          </div>
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: 'goldenrod' }}></div>
            <code>goldenrod</code>
          </div>
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: 'turquoise' }}></div>
            <code>turquoise</code>
          </div>
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: 'lavender' }}></div>
            <code>lavender</code>
          </div>
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: 'crimson' }}></div>
            <code>crimson</code>
          </div>
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: 'rebeccapurple' }}></div>
            <code>rebeccapurple</code>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CssColorNameConverterSEO;
