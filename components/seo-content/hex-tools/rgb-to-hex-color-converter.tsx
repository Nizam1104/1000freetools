import * as React from "react"

export default function RgbToHexColorConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="prose prose-sm text-muted-foreground">
          <p>
            Enter RGB color values as three numbers (0-255) for red, green, and blue channels. Use individual input fields or paste values in common formats like "255, 128, 64" or "rgb(255, 128, 64)".
          </p>
          <p>
            Each decimal value is converted to its 2-digit hexadecimal equivalent. Values less than 16 are padded with a leading zero to maintain the proper 2-digit format for each channel.
          </p>
          <p>
            A live color preview displays the exact color represented by the RGB values. The hex output is provided with and without the "#" prefix, plus CSS-ready formats. Copy any format with a single click.
          </p>
        </div>
      </section>

      {/* When You'd Actually Use This */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">When You'd Actually Use This</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Web Design</h3>
            <p className="text-sm text-muted-foreground">
              Convert RGB values from design tools to hex codes for use in CSS and HTML styling.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Photo Editing</h3>
            <p className="text-sm text-muted-foreground">
              Translate colors from Photoshop or GIMP (which show RGB) to hex for web implementation.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Brand Guidelines</h3>
            <p className="text-sm text-muted-foreground">
              Convert official brand colors from RGB specifications to hex for digital style guides.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Programming</h3>
            <p className="text-sm text-muted-foreground">
              Convert RGB tuples from code or APIs to hex strings for storage or transmission.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Color Matching</h3>
            <p className="text-sm text-muted-foreground">
              Find hex equivalents for RGB colors picked from images or screen captures.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/30">
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">
              Learn how RGB values map to hex color codes and understand digital color representation.
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
              <strong className="text-foreground">RGB range:</strong> Each channel ranges from 0-255 (8 bits). 0 means no color, 255 means full intensity of that channel.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Hex format:</strong> RGB converts to #RRGGBB. Each channel becomes 2 hex digits: 0-15 becomes 00-0F, 16-255 becomes 10-FF.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Additive mixing:</strong> RGB is additive color. Red + Green = Yellow, all three at max = White, all at zero = Black.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Alpha channel:</strong> Standard RGB doesn't include transparency. For RGBA, add a fourth value (0-255 or 0-1) for opacity.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            <p className="text-sm">
              <strong className="text-foreground">Color accuracy:</strong> The preview shows colors as your display renders them. Calibration affects actual appearance.
            </p>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What is RGB(255, 0, 0) in hex?</h3>
            <p className="text-sm text-muted-foreground">
              RGB(255, 0, 0) is #FF0000 - pure red. 255=FF, 0=00, so red=FF, green=00, blue=00.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I convert RGB to hex manually?</h3>
            <p className="text-sm text-muted-foreground">
              Divide each value by 16 for the first digit, use remainder for second. 200÷16=12(C) R8, so 200=C8. Or use a calculator for speed.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What RGB makes white?</h3>
            <p className="text-sm text-muted-foreground">
              Pure white is RGB(255, 255, 255) or #FFFFFF. All channels at maximum intensity produce white in additive color.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">How do I include transparency?</h3>
            <p className="text-sm text-muted-foreground">
              Standard hex doesn't support alpha. Use 8-digit hex #RRGGBBAA or CSS rgba(). For 50% opacity: rgba(255,0,0,0.5) or #FF000080.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What color is RGB(0, 0, 0)?</h3>
            <p className="text-sm text-muted-foreground">
              RGB(0, 0, 0) is pure black (#000000). No light from any channel produces black in additive color mixing.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I convert from CSS rgb() format?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Paste "rgb(255, 128, 64)" directly. The converter parses CSS color formats and extracts the RGB values automatically.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What's the hex for gray?</h3>
            <p className="text-sm text-muted-foreground">
              Gray has equal RGB values. Medium gray is RGB(128, 128, 128) = #808080. Light gray might be #CCCCCC, dark gray #333333.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
