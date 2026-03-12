"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function PxRemConverterPage() {
  const [pxValue, setPxValue] = useState(16);
  const [rootSize, setRootSize] = useState(16);
  const [conversionType, setConversionType] = useState<"px-to-rem" | "rem-to-px">("px-to-rem");

  const convertToRem = (px: number, root: number) => {
    return (px / root).toFixed(4);
  };

  const convertToPx = (rem: number, root: number) => {
    return (rem * root).toFixed(2);
  };

  const result = conversionType === "px-to-rem"
    ? convertToRem(pxValue, rootSize)
    : convertToPx(pxValue, rootSize);

  const unit = conversionType === "px-to-rem" ? "rem" : "px";

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const commonConversions = [
    { px: 8, rem: (8 / 16).toFixed(2) },
    { px: 10, rem: (10 / 16).toFixed(2) },
    { px: 12, rem: (12 / 16).toFixed(2) },
    { px: 14, rem: (14 / 16).toFixed(2) },
    { px: 16, rem: (16 / 16).toFixed(2) },
    { px: 18, rem: (18 / 16).toFixed(2) },
    { px: 20, rem: (20 / 16).toFixed(2) },
    { px: 24, rem: (24 / 16).toFixed(2) },
    { px: 32, rem: (32 / 16).toFixed(2) },
    { px: 48, rem: (48 / 16).toFixed(2) },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">PX to REM Converter</h1>
        <p className="text-muted-foreground">
          Convert between pixels and REM units for responsive web design with configurable root font size.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Conversion Type</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={conversionType === "px-to-rem" ? "default" : "outline"}
                    onClick={() => {
                      setConversionType("px-to-rem");
                      setPxValue(16);
                    }}
                    className="flex-1"
                  >
                    PX → REM
                  </Button>
                  <Button
                    variant={conversionType === "rem-to-px" ? "default" : "outline"}
                    onClick={() => {
                      setConversionType("rem-to-px");
                      setPxValue(1);
                    }}
                    className="flex-1"
                  >
                    REM → PX
                  </Button>
                </div>
              </div>

              <div>
                <Label>Root Font Size (html)</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="number"
                    value={rootSize}
                    onChange={(e) => setRootSize(parseFloat(e.target.value) || 16)}
                    className="w-24"
                  />
                  <span className="flex items-center">px</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Default is 16px (browser default)
                </p>
              </div>

              <div>
                <Label>
                  {conversionType === "px-to-rem" ? "Pixels" : "REM"}
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="number"
                    value={pxValue}
                    onChange={(e) => setPxValue(parseFloat(e.target.value) || 0)}
                    step={0.5}
                  />
                  <span className="flex items-center">
                    {conversionType === "px-to-rem" ? "px" : "rem"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {commonConversions.map((conv) => (
                  <div
                    key={conv.px}
                    className="flex justify-between p-2 bg-muted rounded"
                  >
                    <span className="font-mono">{conv.px}px</span>
                    <span className="font-mono">{conv.rem}rem</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-5xl font-bold font-mono mb-2">
                  {result}{unit}
                </div>
                <p className="text-muted-foreground">
                  {pxValue}{conversionType === "px-to-rem" ? "px" : "rem"} = {result}{unit}
                  {" "}(at {rootSize}px root)
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => copyToClipboard(`${result}${unit}`, "Value")}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Value
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => copyToClipboard(`font-size: ${result}${unit};`, "CSS")}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy CSS
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSS Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                  {`font-size: ${result}${unit};`}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(`font-size: ${result}${unit};`, "Font Size")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                  {`padding: ${result}${unit} ${(parseFloat(result) * 1.5).toFixed(2)}${unit};`}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(`padding: ${result}${unit} ${(parseFloat(result) * 1.5).toFixed(2)}${unit};`, "Padding")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Use REM?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Accessibility:</strong> REM units respect user font size preferences in browser settings.
              </p>
              <p>
                <strong>Scalability:</strong> Change root font size to scale entire design proportionally.
              </p>
              <p>
                <strong>Maintainability:</strong> Easier to manage consistent spacing and sizing across projects.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Use REM Units?</h2>
          <p className="text-muted-foreground mb-4">
            REM units are relative to the root font size (html element). This makes your entire
            design scalable - change one value and everything adjusts proportionally.
          </p>
          <p className="text-muted-foreground">
            More importantly, REM respects user preferences. If someone sets their browser to
            larger text, REM-based designs scale up. Pixel-based designs don't.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">The Conversion</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                The formula is simple: <code className="bg-muted px-1 rounded">rem = pixels / rootSize</code>.
                With the default 16px root, 24px becomes 1.5rem.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Common conversions (16px root)</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li><code className="bg-muted px-1">12px</code> → <code className="bg-muted px-1">0.75rem</code></li>
                    <li><code className="bg-muted px-1">14px</code> → <code className="bg-muted px-1">0.875rem</code></li>
                    <li><code className="bg-muted px-1">16px</code> → <code className="bg-muted px-1">1rem</code></li>
                    <li><code className="bg-muted px-1">18px</code> → <code className="bg-muted px-1">1.125rem</code></li>
                    <li><code className="bg-muted px-1">20px</code> → <code className="bg-muted px-1">1.25rem</code></li>
                    <li><code className="bg-muted px-1">24px</code> → <code className="bg-muted px-1">1.5rem</code></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">When to use REM</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✓ Font sizes</li>
                    <li>✓ Padding and margin</li>
                    <li>✓ Gap values</li>
                    <li>✓ Component dimensions</li>
                    <li>✗ Border radius (use px)</li>
                    <li>✗ Box shadow (use px)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Setting Your Root Size</h2>
          <p className="text-muted-foreground mb-4">
            Most browsers default to 16px, but you can set it explicitly for consistency:
          </p>
          <code className="block p-4 bg-muted rounded-lg text-sm font-mono">
            html {`{ font-size: 16px; }`}
          </code>
          <p className="text-muted-foreground mt-4">
            Some teams use 62.5% (10px) to make mental math easier - then 14px becomes 1.4rem
            instead of 0.875rem. This works but breaks native browser scaling.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">REM vs EM?</h3>
                <p className="text-sm text-muted-foreground">
                  EM is relative to the parent element's font size, which can compound unexpectedly.
                  REM is always relative to root. Use REM for consistency, EM when you specifically
                  want inheritance.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What about responsive design?</h3>
                <p className="text-sm text-muted-foreground">
                  REM scales automatically when you change the root size with media queries.
                  Combine with fluid typography techniques for fully responsive designs.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Do I need to convert everything?</h3>
                <p className="text-sm text-muted-foreground">
                  No. Use REM for user-facing sizes (fonts, spacing). Keep pixels for decorative
                  elements (borders, shadows, icons) where exact sizing matters.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
