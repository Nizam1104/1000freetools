import React from "react"

export default function JavascriptColorConverterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How the JavaScript Color Converter Works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter any color format: HEX (#3B82F6), RGB (rgb(59, 130, 246)), HSL (hsl(217, 91%, 60%)), or named colors (blue). The converter parses your input and displays all equivalent formats.
          </p>
          <p>
            A live preview shows the color. Adjustments happen instantly as you type. The tool handles short HEX codes (#FFF), alpha channels, and all CSS named colors.
          </p>
          <p>
            Copy any format with one click. Generated JavaScript code snippets show how to use the color in your projects. All conversions use standard color mathematics.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Converting design specs</h3>
            <p className="text-sm text-muted-foreground">
              Designer gave you HEX, but your CSS uses RGB. Convert instantly without manual calculation. Match design files to code accurately.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating color variants</h3>
            <p className="text-sm text-muted-foreground">
              Need a lighter or darker shade? Convert to HSL, adjust lightness, convert back. Systematic color variation without guesswork.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Working with Canvas or WebGL</h3>
            <p className="text-sm text-muted-foreground">
              Graphics APIs need RGB values 0-255 or 0-1. Convert from design colors to code values. Essential for custom visualizations.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Debugging color issues</h3>
            <p className="text-sm text-muted-foreground">
              Color looks wrong? Verify the actual values. Compare expected vs actual. Find where color conversion went wrong in your pipeline.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Building color pickers</h3>
            <p className="text-sm text-muted-foreground">
              Understand how color formats relate. See how HSL sliders affect RGB values. Learn the math behind color manipulation.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Creating theme systems</h3>
            <p className="text-sm text-muted-foreground">
              Generate color constants for your theme. Export as JavaScript objects. Consistent color values across your entire application.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">HEX and RGB are equivalent representations.</strong>
              Same color, different notation. HEX is base-16 shorthand for RGB values. #FF0000 equals rgb(255, 0, 0).
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">HSL is more intuitive for adjustments.</strong>
              Hue is the color, saturation is intensity, lightness is brightness. Easier to create variations than RGB.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Alpha channels add transparency.</strong>
              RGBA and HSLA include opacity (0-1 or 0%-100%). Not all contexts support alpha. Check browser compatibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Named colors are limited.</strong>
              CSS defines 140 named colors. Most colors don't have names. Use HEX, RGB, or HSL for precise control.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For production, use CSS custom properties (variables) for colors. They're dynamic and themeable. Convert once, use everywhere.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I darken a color?</h3>
            <p className="text-sm text-muted-foreground">
              Convert to HSL, reduce the lightness percentage, convert back. Reducing L from 50% to 40% darkens noticeably.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the integer format?</h3>
            <p className="text-sm text-muted-foreground">
              RGB packed into a single number: {"(R << 16) | (G << 8) | B"}. Used in some graphics APIs and older systems.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I convert CMYK colors?</h3>
            <p className="text-sm text-muted-foreground">
              Not directly. CMYK is for print. Convert CMYK to RGB first using a separate tool, then use this for other formats.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Why do colors look different on screens?</h3>
            <p className="text-sm text-muted-foreground">
              Monitor calibration, color profiles, and ambient light affect appearance. The values are correct; display varies.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What about CSS color functions?</h3>
            <p className="text-sm text-muted-foreground">
              Modern CSS has color-mix(), oklch(), and more. This tool covers the widely-supported formats. New formats may need separate converters.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I check color contrast?</h3>
            <p className="text-sm text-muted-foreground">
              Use a contrast checker tool. This converter shows formats but doesn't calculate WCAG compliance ratios.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Can I save color palettes?</h3>
            <p className="text-sm text-muted-foreground">
              This tool converts individual colors. For palettes, copy multiple conversions or use a dedicated palette tool.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
