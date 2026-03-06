import React from "react";

export function RgbToCmykConverterSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Why Convert RGB to CMYK?
        </h2>
        <p className="text-muted-foreground">
          RGB is for screens (phones, monitors, TVs). CMYK is for print (brochures, business cards, packaging). If you're sending a design to a professional printer, they'll ask for CMYK values. This converter translates screen colors to print-ready percentages.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Conversion Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The algorithm first normalizes RGB values to 0-1 range, then calculates the key (black) component as 1 minus the maximum RGB value. Cyan, magenta, and yellow are calculated based on how much of each primary color is missing.
        </p>
        <p className="text-muted-foreground">
          For rgb(255, 87, 51): The max is 255 (full red), so key is 0%. Cyan is 0% (no cyan needed for red), magenta is 66% (missing some green), yellow is 80% (missing most blue).
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When You Need CMYK Values
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Professional Printing</h3>
            <p className="text-sm text-muted-foreground">
              Print shops use CMYK presses. Sending RGB files means they'll convert automatically — and the results might not match what you saw on screen. Providing CMYK values gives you control.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Brand Guidelines</h3>
            <p className="text-sm text-muted-foreground">
              Brand style guides include both RGB (for digital) and CMYK (for print) values. This ensures the brand color looks consistent across all materials.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Packaging Design</h3>
            <p className="text-sm text-muted-foreground">
              Product packaging is almost always printed in CMYK. Converting early helps you catch colors that won't reproduce well before sending to production.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Large Format Printing</h3>
            <p className="text-sm text-muted-foreground">
              Banners, posters, and trade show graphics use CMYK. Converting your digital designs ensures the final print matches expectations.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          The RGB to CMYK Reality Check
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>CMYK has a smaller color gamut.</strong> Bright blues, vibrant greens, and neon colors that look great on screen often look duller in print. This isn't a conversion error — it's a physical limitation of ink on paper.
          </p>
          <p>
            <strong>Black isn't just black.</strong> CMYK uses "rich black" (a mix of all four inks) for deep blacks. Pure K (100% black, 0% CMY) can look gray or washed out on large areas.
          </p>
          <p>
            <strong>Paper matters.</strong> The same CMYK values look different on glossy vs. matte paper, and on white vs. off-white stock. Professional printers provide paper-specific profiles.
          </p>
          <p>
            <strong>This conversion is a starting point.</strong> For critical work, request a proof print and adjust based on actual results.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why do my colors look different after conversion?</h3>
            <p className="text-sm text-muted-foreground">
              RGB uses light (additive color), CMYK uses ink (subtractive color). Screens can produce colors that ink on paper physically cannot reproduce. Bright blues and greens are most affected.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's "rich black" and when should I use it?</h3>
            <p className="text-sm text-muted-foreground">
              Rich black mixes all four inks (like C:60 M:50 Y:50 K:100) for deeper blacks. Use it for large black areas. For small text, use K:100 only to avoid registration issues.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I convert CMYK back to RGB?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use our CMYK to RGB converter. But note that colors that looked dull in CMYK will "brighten" when converted back — they still can't display the original RGB vibrancy.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Do I need to worry about color profiles?</h3>
            <p className="text-sm text-muted-foreground">
              For professional work, yes. SWOP, FOGRA, and other profiles affect how CMYK values translate to actual ink. This tool uses a generic conversion. Ask your printer which profile they use.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What about spot colors (Pantone)?</h3>
            <p className="text-sm text-muted-foreground">
              This tool doesn't handle spot colors. Pantone and other spot color systems require separate conversion charts. CMYK is for four-color process printing only.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why is the K value sometimes called "key"?</h3>
            <p className="text-sm text-muted-foreground">
              "Key" refers to the key plate in printing — traditionally the black plate that aligns (keys) the other colors. K also avoids confusion with blue (B in RGB).
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Tips for Better Print Results
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Design in RGB first, convert late.</strong> Work in RGB while designing (wider gamut, better tool support), then convert to CMYK before sending to print.
          </p>
          <p>
            <strong>Check critical colors early.</strong> If your brand has a specific blue or green, convert it to CMYK at the start to see if it's achievable. Adjust expectations or consider spot colors if needed.
          </p>
          <p>
            <strong>Request a proof.</strong> For important jobs, always get a physical proof before full production. Screen previews (even CMYK previews) can't show actual ink on paper.
          </p>
          <p>
            <strong>Consider the paper.</strong> Uncoated paper absorbs more ink, making colors look duller. Glossy paper holds ink on the surface, preserving vibrancy.
          </p>
        </div>
      </div>
    </section>
  );
}

export default RgbToCmykConverterSEO;
