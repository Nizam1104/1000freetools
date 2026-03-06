import React from "react";

export function WebSafeColorPickerSEO() {
  return (
    <section className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          What Are Web-Safe Colors?
        </h2>
        <p className="text-muted-foreground">
          Web-safe colors are 216 specific colors that displayed consistently across all computers in the 1990s, when monitors could only show 256 colors. Each channel (red, green, blue) uses one of six values: 00, 33, 66, 99, CC, or FF in hex.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Do Web-Safe Colors Still Matter?
        </h2>
        <p className="text-muted-foreground mb-4">
          Modern displays show millions of colors, so the original technical limitation is gone. But web-safe colors remain useful for specific scenarios:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Ensuring consistency across different devices and browsers</li>
          <li>Working with legacy systems or email clients with limited color support</li>
          <li>Creating retro or pixel-art aesthetics intentionally</li>
          <li>Guaranteeing colors render correctly on low-quality displays</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          How the Picker Works
        </h2>
        <p className="text-muted-foreground mb-4">
          Browse all 216 web-safe colors organized by hue. Click any color to select it and see its hex, RGB, and HSL values. The tool also checks if any arbitrary color is web-safe and suggests the nearest web-safe alternative.
        </p>
        <p className="text-muted-foreground">
          A color is web-safe if each hex pair is one of: 00, 33, 66, 99, CC, FF. For example, #336699 is web-safe. #3B82F6 is not.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          When to Use Web-Safe Colors Today
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">HTML Email Templates</h3>
            <p className="text-sm text-muted-foreground">
              Some email clients (especially older Outlook versions) have limited color support. Web-safe colors guarantee consistent rendering across all email platforms.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Cross-Platform Applications</h3>
            <p className="text-sm text-muted-foreground">
              Apps that run on diverse hardware (from high-end monitors to cheap tablets) benefit from colors that render predictably everywhere.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Retro Design Aesthetics</h3>
            <p className="text-sm text-muted-foreground">
              Intentionally using web-safe colors creates a nostalgic 90s web look. Combined with pixel fonts and simple graphics, it's a deliberate style choice.
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-medium mb-2">Data Visualization</h3>
            <p className="text-sm text-muted-foreground">
              Charts and graphs with web-safe colors remain distinguishable even when viewed on low-quality displays or printed in black and white.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Finding the Nearest Web-Safe Color
        </h2>
        <p className="text-muted-foreground mb-3">
          When your color isn't web-safe, this tool finds the closest match by rounding each channel to the nearest web-safe value (00, 33, 66, 99, CC, or FF).
        </p>
        <p className="text-muted-foreground mb-4">
          For #3B82F6:
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
          <li>Red: 3B (59) rounds to 33 (51)</li>
          <li>Green: 82 (130) rounds to 99 (153)</li>
          <li>Blue: F6 (246) rounds to FF (255)</li>
          <li>Result: #3399FF</li>
        </ul>
        <p className="text-muted-foreground">
          The nearest web-safe color might look slightly different, but it's the closest possible match within the 216-color palette.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Why are there 216 colors instead of 256?</h3>
            <p className="text-sm text-muted-foreground">
              The full 256-color palette included 40 colors reserved for system use (window borders, scrollbars, etc.). The remaining 216 were available for web content.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Should I only use web-safe colors?</h3>
            <p className="text-sm text-muted-foreground">
              No, modern displays handle millions of colors. Use the full spectrum for most projects. Web-safe colors are a tool for specific edge cases, not a requirement.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I know if my color is web-safe?</h3>
            <p className="text-sm text-muted-foreground">
              Check if each hex pair is 00, 33, 66, 99, CC, or FF. This tool shows a "Web-Safe" badge for qualifying colors and warns when a color isn't web-safe.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What's the hex pattern for web-safe colors?</h3>
            <p className="text-sm text-muted-foreground">
              Web-safe hex codes use only these characters: 0, 3, 6, 9, C, F. Examples: #000000, #336699, #CCFF00, #FFFFFF. If you see any other digit, it's not web-safe.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I use web-safe colors for accessibility?</h3>
            <p className="text-sm text-muted-foreground">
              Web-safe doesn't mean accessible. You still need to check contrast ratios. Use our Contrast Checker to verify your web-safe color combinations meet WCAG standards.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How do I export web-safe palettes?</h3>
            <p className="text-sm text-muted-foreground">
              Use the Palette Export Tool to download your selected web-safe colors as CSS, JSON, or other formats. The hex codes will work in any project.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Web-Safe Color Reference
        </h2>
        <div className="grid grid-cols-6 gap-2 text-xs">
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: '#000000' }}></div>
            <code>#000000</code>
          </div>
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: '#333333' }}></div>
            <code>#333333</code>
          </div>
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: '#666666' }}></div>
            <code>#666666</code>
          </div>
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: '#999999' }}></div>
            <code>#999999</code>
          </div>
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: '#CCCCCC' }}></div>
            <code>#CCCCCC</code>
          </div>
          <div className="p-2 rounded border text-center">
            <div className="w-8 h-8 mx-auto mb-1" style={{ backgroundColor: '#FFFFFF' }}></div>
            <code>#FFFFFF</code>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          The 216 web-safe colors include all combinations of 00, 33, 66, 99, CC, FF for each RGB channel.
        </p>
      </div>
    </section>
  );
}

export default WebSafeColorPickerSEO;
