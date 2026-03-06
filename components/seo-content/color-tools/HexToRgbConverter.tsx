import React from "react";

export function HexToRgbConverterSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Why Convert HEX to RGB?
        </h2>
        <p className="text-muted-foreground">
          HEX codes are compact and easy to read in CSS, but RGB values are more intuitive when you need to adjust individual color channels or work with APIs that expect numeric values. Some design tools, programming languages, and CSS functions like {`rgba()`} require RGB format specifically.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Conversion Works
        </h2>
        <p className="text-muted-foreground mb-4">
          A HEX color code is a 6-digit hexadecimal number where each pair represents the intensity of red, green, and blue on a scale from 00 to FF (0 to 255 in decimal). The conversion is straightforward:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Split the hex code into three pairs: RR, GG, BB</li>
          <li>Convert each pair from base-16 to base-10</li>
          <li>Result is rgb(R, G, B) where each value ranges from 0 to 255</li>
        </ol>
        <p className="text-muted-foreground mt-4">
          For example, #FF5733 becomes rgb(255, 87, 51). FF in hex equals 255 in decimal, 57 equals 87, and 33 equals 51.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When You'll Need This
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">CSS RGBA for Transparency</h3>
            <p className="text-sm text-muted-foreground">
              You have a brand color in hex (#3b82f6) but need to add opacity for an overlay. CSS {`rgba()`} requires RGB values: {`rgba(59, 130, 246, 0.5)`}.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Canvas and WebGL</h3>
            <p className="text-sm text-muted-foreground">
              HTML5 Canvas {`fillStyle`} and WebGL shaders expect RGB values as numbers, not hex strings. Converting lets you use your design system colors directly.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Image Processing Libraries</h3>
            <p className="text-sm text-muted-foreground">
              Libraries like Sharp (Node.js) or PIL (Python) often require RGB tuples for color manipulation operations like tinting or color replacement.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Color Interpolation</h3>
            <p className="text-sm text-muted-foreground">
              Animating between two colors requires numeric RGB values for smooth transitions. You can't interpolate hex strings directly.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding RGB Values
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Each channel ranges from 0 to 255.</strong> Zero means no contribution from that color; 255 means maximum intensity. rgb(0, 0, 0) is black; rgb(255, 255, 255) is white.
          </p>
          <p>
            <strong>Equal values create grays.</strong> rgb(128, 128, 128) is medium gray. When R, G, and B are equal, you get a shade of gray with no hue.
          </p>
          <p>
            <strong>Primary colors are pure.</strong> rgb(255, 0, 0) is pure red. rgb(0, 255, 0) is pure green. rgb(0, 0, 255) is pure blue.
          </p>
          <p>
            <strong>Secondary colors mix two channels.</strong> rgb(255, 255, 0) is yellow (red + green). rgb(0, 255, 255) is cyan (green + blue). rgb(255, 0, 255) is magenta (red + blue).
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Do I need to include the # symbol?</h3>
            <p className="text-sm text-muted-foreground">
              No, the converter accepts hex codes with or without the # prefix. Both FF5733 and #FF5733 work identically.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can this convert 3-digit hex codes like #FFF?</h3>
            <p className="text-sm text-muted-foreground">
              This tool expects 6-digit hex codes. A 3-digit code like #FFF is shorthand for #FFFFFF. Expand it to 6 digits before converting: #FFF becomes #FFFFFF, which converts to rgb(255, 255, 255).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the RGB value for pure white?</h3>
            <p className="text-sm text-muted-foreground">
              Pure white is rgb(255, 255, 255) — maximum intensity from all three color channels. In hex, that's #FFFFFF. Pure black is rgb(0, 0, 0) or #000000.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I add transparency to RGB values?</h3>
            <p className="text-sm text-muted-foreground">
              Use RGBA format: {`rgba(R, G, B, A)`} where A is alpha (opacity) from 0.0 (transparent) to 1.0 (opaque). For example, {`rgba(59, 130, 246, 0.5)`} is 50% opaque blue.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why are my RGB values different from what I expected?</h3>
            <p className="text-sm text-muted-foreground">
              Double-check your hex input. A common mistake is swapping digit pairs — #FF5733 is not the same as #57FF33. Each pair controls a different channel: RR is red, GG is green, BB is blue.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I convert RGB back to HEX?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use our RGB to Hex Converter tool. The conversion is reversible: divide each RGB value by 255, multiply by 16, and convert to hexadecimal.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          HEX vs. RGB: Which Should You Use?
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Use HEX when:</strong> writing CSS directly, sharing colors in design handoffs, or working with design tools like Figma that display hex by default. It's shorter and easier to recognize visually.
          </p>
          <p>
            <strong>Use RGB when:</strong> you need to adjust opacity with {`rgba()`}, work with canvas/WebGL APIs, perform color math (interpolation, blending), or interface with programming languages that expect numeric color values.
          </p>
          <p>
            <strong>Both represent the same colors.</strong> There's no quality difference — it's purely about which format is more convenient for your specific use case.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HexToRgbConverterSEO;
