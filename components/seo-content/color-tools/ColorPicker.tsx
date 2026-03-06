import React from "react";

export function ColorPickerSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Makes This Color Picker Different
        </h2>
        <p className="text-muted-foreground">
          This isn't just a hex code generator. You get a full saturation/lightness picker with a hue slider, plus instant conversion to RGB, HSL, and CMYK formats. The saved palette feature lets you store up to 12 colors while you work — useful when you're iterating on a design and don't want to lose previous versions.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Picker Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The main picker uses a 2D grid where horizontal position controls saturation (0-100%) and vertical position controls lightness (0-100%). The hue slider sets the base color on a 0-360 degree wheel. Behind the scenes, all values convert through HSL as the internal representation, then output to your format of choice.
        </p>
        <p className="text-muted-foreground">
          The color preview updates in real-time as you drag. Click anywhere on the grid to jump to that saturation/lightness combination, or drag to fine-tune.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When You'll Actually Use This
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Matching a Brand Color Exactly</h3>
            <p className="text-sm text-muted-foreground">
              A client says their brand is "a teal-ish blue, kind of vibrant." You open this picker, slide the hue to around 200°, crank up saturation, and land on #0EA5E9. They confirm — that's the one. You now have the exact hex, RGB for their print vendor, and CMYK for business cards.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Finding Variations of a Base Color</h3>
            <p className="text-sm text-muted-foreground">
              You have a primary button color but need a hover state. Save the base, then reduce lightness by 10% and save that too. Now you have two related colors that feel cohesive.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <p className="font-medium mb-2">Quick CMYK Conversion for Print</p>
            <p className="text-sm text-muted-foreground">
              Your designer sends a hex code, but the printer needs CMYK percentages. Paste the hex, grab the CMYK values, done. No need to open Photoshop or Illustrator.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Building a Personal Color Reference</h3>
            <p className="text-sm text-muted-foreground">
              You keep coming back to certain colors across projects. Save them to the palette, export as JSON, and you've got a personal color library you can import anywhere.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding the Four Color Formats
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>HEX (#3B82F6):</strong> Six-digit hexadecimal used in CSS and design tools. Compact and easy to recognize. The format Figma, Sketch, and most web developers use by default.
          </p>
          <p>
            <strong>RGB (rgb(59, 130, 246)):</strong> Red, Green, Blue values from 0-255. Required for canvas operations, image processing, and CSS rgba() transparency.
          </p>
          <p>
            <strong>HSL (hsl(217, 91%, 60%)):</strong> Hue (0-360°), Saturation (0-100%), Lightness (0-100%). More intuitive for humans — you can guess that hsl(200, 90%, 50%) is a vibrant blue without memorizing hex codes.
          </p>
          <p>
            <strong>CMYK (cmyk(76%, 47%, 0%, 4%)):</strong> Cyan, Magenta, Yellow, Key (black) percentages for print. Required by professional printers. Note that CMYK has a smaller color gamut than RGB — some bright screen colors can't be reproduced in print.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How do I pick a color from somewhere else on my screen?</h3>
            <p className="text-sm text-muted-foreground">
              This picker doesn't have an eyedropper tool. Use your OS color picker first (Windows: Win+Shift+C, Mac: use Digital Color Meter), get the hex code, then paste it here to convert to other formats.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why does the CMYK value look different from my RGB color?</h3>
            <p className="text-sm text-muted-foreground">
              CMYK is a subtractive color model for ink on paper, while RGB is additive for light on screens. Bright blues and greens often look duller in CMYK because printers can't reproduce the full RGB gamut. This is normal and expected.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I save more than 12 colors?</h3>
            <p className="text-sm text-muted-foreground">
              No, the palette is limited to 12 colors by design. If you need more, export your current palette as JSON, clear it, and start a new batch. Or use the Favorite Colors Manager tool for unlimited storage.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What does the "Quick Select" row do?</h3>
            <p className="text-sm text-muted-foreground">
              Those 20 preset colors let you jump to common hues quickly. Click one to load it, then fine-tune from there. Useful when you know you want "something in the red family" but don't have a specific hex in mind.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I get the exact same color in both light and dark mode?</h3>
            <p className="text-sm text-muted-foreground">
              Colors appear differently on light vs. dark backgrounds due to simultaneous contrast. If you need a color that looks consistent across themes, test it using the Dark & Light Mode Preview tool after picking it here.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Is there an alpha/transparency option?</h3>
            <p className="text-sm text-muted-foreground">
              This picker doesn't include alpha control. For colors with transparency, pick your base color here, then use the CSS rgba() or hsla() format manually. For example, if you pick #3B82F6, write it as rgba(59, 130, 246, 0.5) for 50% opacity.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Better Color Picking
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Start with hue, then adjust saturation and lightness.</strong> Get the base color family right first (red vs. blue vs. green), then fine-tune how vibrant and how light/dark it is.
          </p>
          <p>
            <strong>Save colors before you lose them.</strong> It's easy to accidentally drag the picker and lose a color you liked. Hit "Save to Palette" as soon as you land on something you might want later.
          </p>
          <p>
            <strong>Use the keyboard for precision.</strong> Click the hue slider to jump to a position, then use arrow keys on the saturation/lightness inputs for fine adjustments.
          </p>
          <p>
            <strong>Test in context.</strong> A color that looks great in isolation might clash with your existing palette. Copy the hex and paste it into your actual design to see how it works.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ColorPickerSEO;
