import React from "react";

export function HexToCmykConverterSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          HEX to CMYK for Print Design
        </h2>
        <p className="text-muted-foreground">
          You have a hex code from a web design or brand guideline, but the printer needs CMYK percentages. This tool converts directly from hex to cyan, magenta, yellow, and key (black) values ready for print production.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Conversion Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The hex code first converts to RGB (each pair of hex digits becomes a 0-255 value). Then RGB converts to CMYK using the standard formula: key is 1 minus the max RGB value, and CMY values derive from how much of each primary is missing.
        </p>
        <p className="text-muted-foreground">
          For #FF5733: RGB is (255, 87, 51). Max is 255, so K=0%. C=0% (full red present), M=66% (green missing), Y=80% (blue mostly missing).
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Who Needs This Conversion
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Brand Designers</h3>
            <p className="text-sm text-muted-foreground">
              You defined the brand colors in hex for the website. Now you need CMYK values for business cards, letterheads, and brochures. This tool bridges digital and print brand guidelines.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Marketing Teams</h3>
            <p className="text-sm text-muted-foreground">
              Your agency sent hex codes in the brand deck. The print vendor is asking for CMYK. Convert them yourself instead of going back to the agency.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Packaging Designers</h3>
            <p className="text-sm text-muted-foreground">
              Product packaging requires CMYK files. When clients provide hex codes from their website, you need accurate CMYK equivalents for production.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Small Business Owners</h3>
            <p className="text-sm text-muted-foreground">
              You have your logo as a hex code from your website builder. Now you're ordering flyers and the print shop needs CMYK values. This tool gives you the numbers to provide.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Important Limitations
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong>Some colors won't print accurately.</strong> Bright screen colors (especially blues and greens) often look duller in CMYK. This is physical, not a conversion error — ink can't reproduce all the colors that light can.
          </p>
          <p>
            <strong>Black values vary by use.</strong> For text, use K=100% only. For large black areas, use "rich black" (all four inks). This tool gives the mathematical conversion; adjust based on your print job.
          </p>
          <p>
            <strong>Paper affects results.</strong> The same CMYK values look different on glossy vs. matte, coated vs. uncoated stock. Professional printers can provide paper-specific guidance.
          </p>
          <p>
            <strong>Always request a proof.</strong> For critical colors, get a physical proof before full production. Screen previews can't show actual ink on paper.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why does my bright blue look purple in CMYK?</h3>
            <p className="text-sm text-muted-foreground">
              Vibrant blues are outside the CMYK gamut. The conversion finds the closest achievable match, which often shifts toward purple. Consider using a spot color (Pantone) for critical blues.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use these CMYK values in Photoshop?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, enter the percentages directly into Photoshop's CMYK color picker. Make sure your document is in CMYK color mode (Image → Mode → CMYK Color).
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the difference between this and Hex to RGB?</h3>
            <p className="text-sm text-muted-foreground">
              Hex to RGB converts for screen use (web, apps, digital displays). Hex to CMYK converts for print (brochures, packaging, physical materials). They serve different output mediums.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Do I need to round the percentages?</h3>
            <p className="text-sm text-muted-foreground">
              This tool rounds to whole percentages. Most print workflows accept whole numbers. For high-end work, you can use decimal percentages, but the difference is usually imperceptible.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What file format should I send to the printer?</h3>
            <p className="text-sm text-muted-foreground">
              PDF/X-1a or PDF/X-4 are standard for print. Embed the CMYK values in your design software, then export as PDF. Don't send just the CMYK numbers — send the actual print-ready file.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I convert CMYK back to hex?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, use our CMYK to Hex converter. But remember: colors that looked dull in CMYK will appear brighter when converted back, even though they can't actually display the original vibrancy.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Common Brand Color Conversions
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded border">
            <p className="font-mono">#FF0000 (red)</p>
            <p className="text-muted-foreground">C:0% M:100% Y:100% K:0%</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-mono">#00FF00 (green)</p>
            <p className="text-muted-foreground">C:100% M:0% Y:100% K:0%</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-mono">#0000FF (blue)</p>
            <p className="text-muted-foreground">C:100% M:100% Y:0% K:0%</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-mono">#FFFF00 (yellow)</p>
            <p className="text-muted-foreground">C:0% M:0% Y:100% K:0%</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-mono">#000000 (black)</p>
            <p className="text-muted-foreground">C:0% M:0% Y:0% K:100%</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-mono">#FFFFFF (white)</p>
            <p className="text-muted-foreground">C:0% M:0% Y:0% K:0%</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HexToCmykConverterSEO;
