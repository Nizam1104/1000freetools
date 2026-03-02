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
    <div className="w-full max-w-6xl mx-auto">
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
          <h2 className="text-2xl font-semibold mb-4">Color Format Reference</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">HEX (Hexadecimal)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Six-digit hexadecimal representation of RGB values. Most common in web design and CSS.</p>
                <code className="block mt-2 bg-muted p-2 rounded">#RRGGBB</code>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">RGB (Red Green Blue)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Additive color model used by screens. Values range from 0-255 for each channel.</p>
                <code className="block mt-2 bg-muted p-2 rounded">rgb(255, 0, 0)</code>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">HSL (Hue Saturation Lightness)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>More intuitive than RGB. Hue is degrees (0-360), saturation and lightness are percentages.</p>
                <code className="block mt-2 bg-muted p-2 rounded">hsl(360, 100%, 50%)</code>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">OKLCH (Perceptual Color)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Modern color space designed for perceptual uniformity. Best for smooth color transitions.</p>
                <code className="block mt-2 bg-muted p-2 rounded">oklch(0.5, 0.2, 280)</code>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
