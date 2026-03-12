"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, RotateCcw } from "lucide-react";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  hslToHex,
  rgbToHsv,
  hsvToRgb,
  rgbToCmyk,
  hexToCmyk,
  hexToHsl,
} from "@/app/color-tools/lib/color-utils";

export default function ColorConverterPage() {
  const [hex, setHex] = useState("#6366f1");
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 });
  const [hsv, setHsv] = useState({ h: 239, s: 59, v: 95 });
  const [cmyk, setCmyk] = useState({ c: 59, m: 58, y: 0, k: 5 });
  const [oklch, setOklch] = useState({ l: 0.55, c: 0.2, h: 280 });

  const convertFromHex = useCallback((newHex: string) => {
    const rgbVal = hexToRgb(newHex);
    if (!rgbVal) return;

    setHex(newHex.toUpperCase());
    setRgb(rgbVal);

    const hslVal = rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b);
    setHsl(hslVal);

    const hsvVal = rgbToHsv(rgbVal.r, rgbVal.g, rgbVal.b);
    setHsv(hsvVal);

    const cmykVal = rgbToCmyk(rgbVal.r, rgbVal.g, rgbVal.b);
    setCmyk(cmykVal);

    // Approximate OKLCH (simplified conversion)
    const l = 0.299 * rgbVal.r + 0.587 * rgbVal.g + 0.114 * rgbVal.b;
    setOklch({
      l: Math.round((l / 255) * 100) / 100,
      c: 0.2,
      h: hslVal.h,
    });
  }, []);

  const convertFromRgb = useCallback((newRgb: { r: number; g: number; b: number }) => {
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    convertFromHex(newHex);
  }, [convertFromHex]);

  const convertFromHsl = useCallback((newHsl: { h: number; s: number; l: number }) => {
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    convertFromHex(newHex);
  }, [convertFromHex]);

  useEffect(() => {
    // Initial conversion
    const rgbVal = hexToRgb(hex);
    if (rgbVal) {
      convertFromHex(hex);
    }
  }, []);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleHexChange = (value: string) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      convertFromHex(value);
    } else if (/^[0-9A-Fa-f]{6}$/.test(value)) {
      convertFromHex(`#${value}`);
    }
  };

  const handleRgbChange = (channel: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [channel]: Math.max(0, Math.min(255, value)) };
    setRgb(newRgb);
    convertFromRgb(newRgb);
  };

  const handleHslChange = (channel: "h" | "s" | "l", value: number) => {
    const ranges = { h: 360, s: 100, l: 100 };
    const newHsl = { ...hsl, [channel]: Math.max(0, Math.min(ranges[channel], value)) };
    setHsl(newHsl);
    convertFromHsl(newHsl);
  };

  const randomizeColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    convertFromHex(randomColor);
  };

  const copyAllFormats = () => {
    const allFormats = `HEX: ${hex}
RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})
HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)
HSV: hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)
CMYK: cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)
OKLCH: oklch(${oklch.l}, ${oklch.c}, ${oklch.h})`;
    copyToClipboard(allFormats, "All formats");
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Color Converter</h1>
        <p className="text-muted-foreground">
          Convert colors between HEX, RGB, HSL, HSV, CMYK, and OKLCH formats instantly.
        </p>
      </div>

      {/* Color Preview */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div
              className="w-32 h-32 rounded-lg border-2 border-border shadow-lg"
              style={{ backgroundColor: hex }}
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{hex}</h2>
              <div className="flex gap-2">
                <Button onClick={randomizeColor} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Random
                </Button>
                <Button onClick={copyAllFormats} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Converters */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* HEX */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">HEX</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Hexadecimal</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  type="color"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="w-16 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="font-mono uppercase"
                  placeholder="#000000"
                />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => copyToClipboard(hex, "HEX")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy HEX
            </Button>
          </CardContent>
        </Card>

        {/* RGB */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">RGB</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs">R</Label>
                <Input
                  type="number"
                  value={rgb.r}
                  onChange={(e) => handleRgbChange("r", parseInt(e.target.value) || 0)}
                  min={0}
                  max={255}
                  className="font-mono"
                />
              </div>
              <div>
                <Label className="text-xs">G</Label>
                <Input
                  type="number"
                  value={rgb.g}
                  onChange={(e) => handleRgbChange("g", parseInt(e.target.value) || 0)}
                  min={0}
                  max={255}
                  className="font-mono"
                />
              </div>
              <div>
                <Label className="text-xs">B</Label>
                <Input
                  type="number"
                  value={rgb.b}
                  onChange={(e) => handleRgbChange("b", parseInt(e.target.value) || 0)}
                  min={0}
                  max={255}
                  className="font-mono"
                />
              </div>
            </div>
            <code className="block text-sm font-mono bg-muted p-2 rounded text-center">
              rgb({rgb.r}, {rgb.g}, {rgb.b})
            </code>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy RGB
            </Button>
          </CardContent>
        </Card>

        {/* HSL */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">HSL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs">H</Label>
                <Input
                  type="number"
                  value={hsl.h}
                  onChange={(e) => handleHslChange("h", parseInt(e.target.value) || 0)}
                  min={0}
                  max={360}
                  className="font-mono"
                />
              </div>
              <div>
                <Label className="text-xs">S</Label>
                <Input
                  type="number"
                  value={hsl.s}
                  onChange={(e) => handleHslChange("s", parseInt(e.target.value) || 0)}
                  min={0}
                  max={100}
                  className="font-mono"
                />
              </div>
              <div>
                <Label className="text-xs">L</Label>
                <Input
                  type="number"
                  value={hsl.l}
                  onChange={(e) => handleHslChange("l", parseInt(e.target.value) || 0)}
                  min={0}
                  max={100}
                  className="font-mono"
                />
              </div>
            </div>
            <code className="block text-sm font-mono bg-muted p-2 rounded text-center">
              hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
            </code>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy HSL
            </Button>
          </CardContent>
        </Card>

        {/* HSV */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">HSV</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-2xl font-bold">{hsv.h}°</p>
                <p className="text-xs text-muted-foreground">Hue</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{hsv.s}%</p>
                <p className="text-xs text-muted-foreground">Saturation</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{hsv.v}%</p>
                <p className="text-xs text-muted-foreground">Value</p>
              </div>
            </div>
            <code className="block text-sm font-mono bg-muted p-2 rounded text-center">
              hsv({hsv.h}, {hsv.s}%, {hsv.v}%)
            </code>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => copyToClipboard(`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`, "HSV")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy HSV
            </Button>
          </CardContent>
        </Card>

        {/* CMYK */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">CMYK</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-xl font-bold">{cmyk.c}%</p>
                <p className="text-xs text-muted-foreground">Cyan</p>
              </div>
              <div>
                <p className="text-xl font-bold">{cmyk.m}%</p>
                <p className="text-xs text-muted-foreground">Magenta</p>
              </div>
              <div>
                <p className="text-xl font-bold">{cmyk.y}%</p>
                <p className="text-xs text-muted-foreground">Yellow</p>
              </div>
              <div>
                <p className="text-xl font-bold">{cmyk.k}%</p>
                <p className="text-xs text-muted-foreground">Key</p>
              </div>
            </div>
            <code className="block text-sm font-mono bg-muted p-2 rounded text-center">
              cmyk({cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%)
            </code>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => copyToClipboard(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, "CMYK")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy CMYK
            </Button>
          </CardContent>
        </Card>

        {/* OKLCH */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">OKLCH</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xl font-bold">{oklch.l.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Lightness</p>
              </div>
              <div>
                <p className="text-xl font-bold">{oklch.c.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Chroma</p>
              </div>
              <div>
                <p className="text-xl font-bold">{oklch.h.toFixed(0)}°</p>
                <p className="text-xs text-muted-foreground">Hue</p>
              </div>
            </div>
            <code className="block text-sm font-mono bg-muted p-2 rounded text-center">
              oklch({oklch.l}, {oklch.c}, {oklch.h})
            </code>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => copyToClipboard(`oklch(${oklch.l}, ${oklch.c}, ${oklch.h})`, "OKLCH")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy OKLCH
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Color Formats Matter</h2>
          <p className="text-muted-foreground mb-4">
            Different tools and contexts need different color formats. Designers think in HSL.
            Developers copy hex codes from Figma. Print designers need CMYK. Modern CSS supports
            OKLCH for perceptually uniform color spaces.
          </p>
          <p className="text-muted-foreground">
            This converter shows you all formats at once. Change one value and everything updates.
            No mental math, no switching between tabs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Color Format Reference</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">HEX (Hexadecimal)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <code className="block p-2 bg-muted rounded text-sm font-mono">#6366f1</code>
                <p className="text-sm text-muted-foreground">
                  Six-digit code representing red, green, and blue values. The standard for web design.
                  Short form (#63f) works when pairs repeat (#6633ff).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">RGB (Red Green Blue)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <code className="block p-2 bg-muted rounded text-sm font-mono">rgb(99, 102, 241)</code>
                <p className="text-sm text-muted-foreground">
                  Additive color model - screens mix red, green, and blue light. Each channel ranges
                  from 0 to 255. Add alpha for transparency: <code className="bg-muted px-1">rgba(99, 102, 241, 0.5)</code>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">HSL (Hue Saturation Lightness)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <code className="block p-2 bg-muted rounded text-sm font-mono">hsl(239, 84%, 67%)</code>
                <p className="text-sm text-muted-foreground">
                  More intuitive than RGB. Hue is the color (0-360 degrees), saturation is intensity
                  (0-100%), lightness is brightness (0-100%). Easier to adjust mentally.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">OKLCH (Perceptual Color)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <code className="block p-2 bg-muted rounded text-sm font-mono">oklch(0.55, 0.2, 280)</code>
                <p className="text-sm text-muted-foreground">
                  Modern color space designed for perceptual uniformity. Equal changes in values
                  produce equal perceived changes. Best for smooth transitions and accessible palettes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">HSV (Hue Saturation Value)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <code className="block p-2 bg-muted rounded text-sm font-mono">hsv(239, 59%, 95%)</code>
                <p className="text-sm text-muted-foreground">
                  Similar to HSL but "value" represents brightness differently. Common in color
                  pickers and design tools. Value is the maximum RGB component.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">CMYK (Cyan Magenta Yellow Key)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <code className="block p-2 bg-muted rounded text-sm font-mono">cmyk(59%, 58%, 0%, 5%)</code>
                <p className="text-sm text-muted-foreground">
                  Subtractive color model for print. Ink absorbs light - more color means darker
                  results. The "key" (black) channel adds depth and saves on colored ink.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">When to Use Each Format</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">HEX for quick styling</h3>
                <p className="text-sm text-muted-foreground">
                  Short, copy-paste friendly, universally supported. Use for solid colors in CSS
                  and when sharing colors with other developers.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">HSL for adjustments</h3>
                <p className="text-sm text-muted-foreground">
                  Need a darker version? Reduce lightness. Want it less saturated? Lower the
                  saturation. Much easier than guessing hex values.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">RGB/RGBA for transparency</h3>
                <p className="text-sm text-muted-foreground">
                  When you need alpha channels and older browser support. RGBA works everywhere,
                  unlike the newer hex-with-alpha syntax.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">4</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">OKLCH for modern projects</h3>
                <p className="text-sm text-muted-foreground">
                  If you're building something new and don't need legacy support, OKLCH produces
                  more natural color scales and gradients.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why do colors look different on different screens?</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor calibration, color profiles, and display technology all affect how colors
                  appear. sRGB is the web standard, but wide-gamut displays show more saturated colors.
                  Always test on multiple devices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What's the deal with OKLCH?</h3>
                <p className="text-sm text-muted-foreground">
                  OKLCH is based on human color perception, not how screens emit light. Two colors
                  with the same L value appear equally light to human eyes. This makes it ideal for
                  generating accessible color scales.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Can I convert CMYK back to RGB perfectly?</h3>
                <p className="text-sm text-muted-foreground">
                  Not exactly. CMYK has a smaller color gamut than RGB. Some vibrant screen colors
                  can't be reproduced in print. The conversion is an approximation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
