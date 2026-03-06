import React from "react";

export function HslToHexConverterSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Why Convert HSL to HEX?
        </h2>
        <p className="text-muted-foreground">
          HSL is intuitive for humans — you know hsl(217, 91%, 60%) is a vibrant medium blue. But design tools, older CSS codebases, and many third-party libraries expect hex codes. This converter translates HSL values into the compact #3B82F6 format.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Conversion Works
        </h2>
        <p className="text-muted-foreground mb-4">
          The algorithm first converts HSL to RGB using the standard formula (which involves calculating intermediate values based on saturation and lightness). Then each RGB channel (0-255) converts to a two-digit hex number.
        </p>
        <p className="text-muted-foreground">
          For hsl(217, 91%, 60%): The conversion produces RGB(59, 130, 246), which becomes #3B82F6 in hex.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When You Need HEX Instead of HSL
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Design Tool Compatibility</h3>
            <p className="text-sm text-muted-foreground">
              Figma, Sketch, and Adobe XD display colors as hex by default. Converting from HSL lets you input exact values into these tools.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Legacy CSS Codebases</h3>
            <p className="text-sm text-muted-foreground">
              Older projects standardize on hex codes. When adding new colors defined in HSL, convert them to maintain consistency with existing code.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">JavaScript Color Libraries</h3>
            <p className="text-sm text-muted-foreground">
              Many npm packages expect hex strings as input. Converting from HSL lets you use these libraries with colors you've defined in HSL format.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Short Format Optimization</h3>
            <p className="text-sm text-muted-foreground">
              When HSL values produce colors like #AABBCC, you can use the short form #ABC. This tool detects when short format is possible for smaller file sizes.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Understanding Short Hex Format
        </h2>
        <p className="text-muted-foreground mb-3">
          When each pair of hex digits is identical, you can use three-digit format. This tool automatically detects and displays when short format is available.
        </p>
        <div className="space-y-2 text-muted-foreground">
          <p>• hsl(0, 0%, 100%) → #FFFFFF → #FFF</p>
          <p>• hsl(0, 0%, 0%) → #000000 → #000</p>
          <p>• hsl(0, 0%, 73%) → #BBBBBB → #BBB</p>
          <p>• hsl(217, 91%, 60%) → #3B82F6 → cannot shorten</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Do I need to include the % symbols?</h3>
            <p className="text-sm text-muted-foreground">
              No, just enter the numbers. Enter "217, 91, 60" or "hsl(217, 91%, 60%)" — the converter parses both formats.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What if my hue is over 360?</h3>
            <p className="text-sm text-muted-foreground">
              Hue values wrap around. 360° equals 0°, 370° equals 10°, etc. The converter handles this automatically using modulo arithmetic.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I convert colors with 0% saturation?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, fully desaturated colors are grays. The hue value doesn't matter when saturation is 0%. hsl(0, 0%, 50%) and hsl(180, 0%, 50%) both produce #808080.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I convert hex back to HSL?</h3>
            <p className="text-sm text-muted-foreground">
              Use our Hex to HSL Converter tool. The conversion is fully reversible with no loss of precision.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Why is my hex code uppercase?</h3>
            <p className="text-sm text-muted-foreground">
              Hex codes are case-insensitive. #3B82F6 and #3b82f6 are identical. This tool outputs uppercase by convention, but you can lowercase it if needed.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use decimal values in HSL?</h3>
            <p className="text-sm text-muted-foreground">
              CSS accepts decimals like hsl(217.5, 91.3%, 60.2%). This tool rounds to whole numbers for simplicity. For more precision, convert manually or use a calculator.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Common HSL to HEX Conversions
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded border">
            <p className="font-mono">hsl(0, 100%, 50%)</p>
            <p className="text-muted-foreground">→ #FF0000 (red)</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-mono">hsl(120, 100%, 50%)</p>
            <p className="text-muted-foreground">→ #00FF00 (green)</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-mono">hsl(240, 100%, 50%)</p>
            <p className="text-muted-foreground">→ #0000FF (blue)</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-mono">hsl(60, 100%, 50%)</p>
            <p className="text-muted-foreground">→ #FFFF00 (yellow)</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-mono">hsl(180, 100%, 50%)</p>
            <p className="text-muted-foreground">→ #00FFFF (cyan)</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-mono">hsl(300, 100%, 50%)</p>
            <p className="text-muted-foreground">→ #FF00FF (magenta)</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-mono">hsl(0, 0%, 0%)</p>
            <p className="text-muted-foreground">→ #000000 (black)</p>
          </div>
          <div className="p-3 rounded border">
            <p className="font-mono">hsl(0, 0%, 100%)</p>
            <p className="text-muted-foreground">→ #FFFFFF (white)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HslToHexConverterSEO;
