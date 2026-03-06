import React from "react";

export function RgbToHexConverterSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Why Convert RGB to HEX?
        </h2>
        <p className="text-muted-foreground">
          RGB values come from image editors, design software, and APIs. But CSS, HTML, and most web design tools expect hex codes. This converter translates rgb(255, 87, 51) into the more compact #FF5733 format that you can paste directly into stylesheets.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Math Works
        </h2>
        <p className="text-muted-foreground mb-4">
          Each RGB channel (0-255) converts to a two-digit hexadecimal number (00-FF). The conversion divides by 16 for the first digit and uses the remainder for the second digit.
        </p>
        <p className="text-muted-foreground">
          For rgb(255, 87, 51): Red 255 becomes FF, green 87 becomes 57, blue 51 becomes 33. Result: #FF5733.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When You Need HEX Instead of RGB
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">CSS and HTML Attributes</h3>
            <p className="text-sm text-muted-foreground">
              While CSS accepts both rgb() and hex, many teams standardize on hex for consistency. Design handoffs from Figma also default to hex codes.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">SVG Fill and Stroke</h3>
            <p className="text-sm text-muted-foreground">
              SVG attributes like fill and stroke commonly use hex: {`<path fill="#FF5733" />`}. More compact than {`fill="rgb(255, 87, 51)"`}.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Short Format Optimization</h3>
            <p className="text-sm text-muted-foreground">
              Colors like #FF5533 can shorten to #F53. This tool detects when short format is possible. Shorter code means smaller file sizes.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Third-Party Libraries</h3>
            <p className="text-sm text-muted-foreground">
              Many JavaScript color libraries and React component props expect hex strings. Converting from RGB lets you integrate smoothly.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding Short Hex Format
        </h2>
        <p className="text-muted-foreground mb-3">
          When each pair of hex digits is identical (like #AABBCC), you can use the short format (#ABC). This tool automatically detects and shows when short format is available.
        </p>
        <div className="space-y-2 text-muted-foreground">
          <p>• #FFFFFF → #FFF (white)</p>
          <p>• #000000 → #000 (black)</p>
          <p>• #AABBCC → #ABC (a gray-blue)</p>
          <p>• #FF5733 → cannot shorten (digits differ)</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Do I need to enter all three RGB values?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, all three values (red, green, blue) are required. Each must be between 0 and 255. Invalid values will show an error.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What happens if I enter a value over 255?</h3>
            <p className="text-sm text-muted-foreground">
              The tool will flag it as invalid. RGB values must be 0-255. Values outside this range don't represent valid colors in the RGB color space.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I convert with alpha/transparency?</h3>
            <p className="text-sm text-muted-foreground">
              This tool handles RGB to hex only. For RGBA with transparency, you'd need rgba(255, 87, 51, 0.5) which doesn't have a direct hex equivalent. Use hex with a separate opacity CSS property instead.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why is my hex code uppercase?</h3>
            <p className="text-sm text-muted-foreground">
              Hex codes are case-insensitive — #FF5733 and #ff5733 are identical. This tool outputs uppercase by convention, but you can manually lowercase it if your style guide prefers.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I convert hex back to RGB?</h3>
            <p className="text-sm text-muted-foreground">
              Use our Hex to RGB Converter tool. The conversion works both ways without any loss of information.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between #RGB and #RRGGBB?</h3>
            <p className="text-sm text-muted-foreground">
              #RGB is short format (3 digits), #RRGGBB is full format (6 digits). #F00 equals #FF0000 (pure red). Short format only works when each digit pair is identical.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Common RGB to HEX Conversions
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded border font-mono">rgb(0, 0, 0) → #000000</div>
          <div className="p-3 rounded border font-mono">rgb(255, 255, 255) → #FFFFFF</div>
          <div className="p-3 rounded border font-mono">rgb(255, 0, 0) → #FF0000</div>
          <div className="p-3 rounded border font-mono">rgb(0, 255, 0) → #00FF00</div>
          <div className="p-3 rounded border font-mono">rgb(0, 0, 255) → #0000FF</div>
          <div className="p-3 rounded border font-mono">rgb(255, 255, 0) → #FFFF00</div>
          <div className="p-3 rounded border font-mono">rgb(0, 255, 255) → #00FFFF</div>
          <div className="p-3 rounded border font-mono">rgb(255, 0, 255) → #FF00FF</div>
          <div className="p-3 rounded border font-mono">rgb(128, 128, 128) → #808080</div>
        </div>
      </div>
    </section>
  );
}

export default RgbToHexConverterSEO;
