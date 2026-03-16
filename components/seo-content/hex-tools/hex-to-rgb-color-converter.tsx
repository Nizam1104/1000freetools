import * as React from "react"

export default function HexToRgbColorConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter a hex color code in the input field. The converter accepts formats with or without the "#" prefix, and handles both 3-digit shorthand (#RGB) and 6-digit full format (#RRGGBB).
          </p>
          <p>
            The hex value is split into red, green, and blue components. Each pair of hex digits (or single digit in shorthand) is converted to its decimal equivalent (0-255), giving you the RGB values.
          </p>
          <p>
            A live color preview shows the exact color represented by the hex code. Additional formats are provided including RGBA, HSL, and CSS-ready output. Copy any format with a single click.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Web Development</h3>
            <p className="text-sm text-muted-foreground">
              Convert hex colors to RGB for use in CSS rgba() functions or when transparency is needed.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Graphic Design</h3>
            <p className="text-sm text-muted-foreground">
              Translate hex colors from web mockups to RGB values for design software like Photoshop or Illustrator.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Programming</h3>
            <p className="text-sm text-muted-foreground">
              Convert hex colors to RGB tuples for use in Python, Java, or other languages that use separate channel values.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Color Matching</h3>
            <p className="text-sm text-muted-foreground">
              Find exact RGB values to match hex colors from brand guidelines or existing designs.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Data Visualization</h3>
            <p className="text-sm text-muted-foreground">
              Convert hex color palettes to RGB arrays for charting libraries and visualization tools.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">
              Learn how hex color codes map to RGB values and understand digital color representation.
            </p>
          </div>
        </div>
      </section>

      {/* What to Know Before Using */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Hex color structure:</strong> #RRGGBB where RR is red, GG is green, BB is blue. Each is 00-FF (0-255 in decimal).
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Shorthand notation:</strong> 3-digit hex (#RGB) expands to 6 digits by doubling each digit. #ABC becomes #AABBCC.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Alpha channel:</strong> Some hex codes include transparency as #RRGGBBAA. The alpha value (00-FF) controls opacity.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Case insensitive:</strong> Hex colors work with uppercase or lowercase letters. #FF0000 and #ff0000 are identical.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Color preview accuracy:</strong> The preview shows the color as rendered by your display. Actual appearance may vary based on monitor calibration.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is #FF0000 in RGB?</h3>
            <p className="text-sm text-muted-foreground">
              #FF0000 is RGB(255, 0, 0) - pure red. FF=255 for red channel, 00=0 for green and blue.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert hex to RGB manually?</h3>
            <p className="text-sm text-muted-foreground">
              Split #RRGGBB into pairs. Convert each pair from hex to decimal: RR→R, GG→G, BB→B. For #4A90D2: 4A=74, 90=144, D2=210.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What does #FFF mean?</h3>
            <p className="text-sm text-muted-foreground">
              #FFF is shorthand for #FFFFFF, which is pure white (RGB 255, 255, 255). Each digit doubles: F becomes FF.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I get RGBA from hex?</h3>
            <p className="text-sm text-muted-foreground">
              Standard hex doesn't include alpha. For RGBA, use #RRGGBBAA format or specify alpha separately. #FF000080 is red at 50% opacity.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the RGB for pure blue?</h3>
            <p className="text-sm text-muted-foreground">
              Pure blue is #0000FF in hex, RGB(0, 0, 255). Red and green channels are 0, blue is maximum (255).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I use this in CSS?</h3>
            <p className="text-sm text-muted-foreground">
              Use hex directly in CSS (color: #FF0000) or convert to RGB for rgba(): color: rgb(255, 0, 0) or color: rgba(255, 0, 0, 0.5) for transparency.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What color is #000000?</h3>
            <p className="text-sm text-muted-foreground">
              #000000 is pure black (RGB 0, 0, 0). All color channels at minimum value produce black in additive color mixing.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
