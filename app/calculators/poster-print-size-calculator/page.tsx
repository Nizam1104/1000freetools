"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PrintSizeResult {
  widthInches: number;
  heightInches: number;
  dpi: number;
  minPixels: { width: number; height: number; megapixels: number };
  recommendedPixels: { width: number; height: number; megapixels: number };
  printQuality: string;
  paperSize: string;
  aspectRatio: string;
  recommendations: string[];
}

const STANDARD_SIZES: Record<string, { width: number; height: number; name: string }> = {
  "4x6": { width: 6, height: 4, name: "4×6 (Photo)" },
  "5x7": { width: 7, height: 5, name: "5×7 (Photo)" },
  "8x10": { width: 10, height: 8, name: "8×10 (Portrait)" },
  "11x14": { width: 14, height: 11, name: "11×14" },
  "16x20": { width: 20, height: 16, name: "16×20" },
  "18x24": { width: 24, height: 18, name: "18×24 (Small Poster)" },
  "24x36": { width: 36, height: 24, name: "24×36 (Medium Poster)" },
  "27x40": { width: 40, height: 27, name: "27×40 (Movie Poster)" },
  "36x48": { width: 48, height: 36, name: "36×48 (Large Poster)" },
  "custom": { width: 0, height: 0, name: "Custom" },
};

export default function PosterPrintSizeCalculatorPage() {
  const [presetSize, setPresetSize] = useState<string>("24x36");
  const [customWidth, setCustomWidth] = useState<string>("24");
  const [customHeight, setCustomHeight] = useState<string>("36");
  const [dpi, setDpi] = useState<string>("300");
  const [result, setResult] = useState<PrintSizeResult | null>(null);

  const calculate = () => {
    let widthInches = 0;
    let heightInches = 0;

    if (presetSize !== "custom") {
      const size = STANDARD_SIZES[presetSize];
      widthInches = size.width;
      heightInches = size.height;
    } else {
      widthInches = parseFloat(customWidth) || 0;
      heightInches = parseFloat(customHeight) || 0;
    }

    const dpiNum = parseFloat(dpi) || 300;

    if (widthInches === 0 || heightInches === 0) return;

    // Calculate pixel requirements
    const minPixelsWidth = Math.round(widthInches * dpiNum);
    const minPixelsHeight = Math.round(heightInches * dpiNum);
    const minMegapixels = (minPixelsWidth * minPixelsHeight) / 1000000;

    // Recommended (higher quality)
    const recommendedDpi = Math.max(dpiNum, 300);
    const recommendedPixelsWidth = Math.round(widthInches * recommendedDpi);
    const recommendedPixelsHeight = Math.round(heightInches * recommendedDpi);
    const recommendedMegapixels = (recommendedPixelsWidth * recommendedPixelsHeight) / 1000000;

    // Determine print quality
    let printQuality = "";
    if (dpiNum >= 300) {
      printQuality = "Excellent - Professional quality";
    } else if (dpiNum >= 200) {
      printQuality = "Good - Standard print quality";
    } else if (dpiNum >= 150) {
      printQuality = "Acceptable - Large format viewing distance";
    } else {
      printQuality = "Low - May appear pixelated";
    }

    // Determine paper size name
    const paperSize = STANDARD_SIZES[presetSize]?.name || "Custom";

    // Aspect ratio
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const aspectGcd = gcd(Math.round(widthInches), Math.round(heightInches));
    const aspectRatio = `${Math.round(widthInches / aspectGcd)}:${Math.round(heightInches / aspectGcd)}`;

    // Recommendations
    const recommendations: string[] = [];

    if (dpiNum < 300) {
      recommendations.push("⚠️ Consider using 300 DPI for best quality prints.");
    } else {
      recommendations.push("✅ 300 DPI is ideal for professional prints.");
    }

    if (minMegapixels > 20) {
      recommendations.push("📷 You'll need a high-resolution camera or upscaled image.");
    } else if (minMegapixels > 8) {
      recommendations.push("📷 Most modern cameras/phones can handle this size.");
    } else {
      recommendations.push("📷 Any modern camera or smartphone will work.");
    }

    if (widthInches > 24 || heightInches > 36) {
      recommendations.push("🖼️ Large format printing - view from distance allows lower DPI.");
    }

    recommendations.push(`💡 File size estimate: ${(recommendedMegapixels * 3).toFixed(0)} MB uncompressed`);

    setResult({
      widthInches,
      heightInches,
      dpi: dpiNum,
      minPixels: {
        width: minPixelsWidth,
        height: minPixelsHeight,
        megapixels: parseFloat(minMegapixels.toFixed(1)),
      },
      recommendedPixels: {
        width: recommendedPixelsWidth,
        height: recommendedPixelsHeight,
        megapixels: parseFloat(recommendedMegapixels.toFixed(1)),
      },
      printQuality,
      paperSize,
      aspectRatio,
      recommendations,
    });
  };

  const reset = () => {
    setPresetSize("24x36");
    setDpi("300");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Poster Print Size Calculator – Find the Right Resolution for Any Print Size
          </h1>
          <p className="text-muted-foreground">
            Ensure crisp, high-quality poster prints with our Print Size Calculator.
            Enter your desired poster dimensions and print resolution (DPI) to calculate
            the minimum pixel dimensions needed for your artwork — avoiding blurry and
            pixelated prints.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preset-size">Preset Size</Label>
                <Select value={presetSize} onValueChange={setPresetSize}>
                  <SelectTrigger id="preset-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STANDARD_SIZES).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {presetSize === "custom" && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="custom-width">Width (inches)</Label>
                    <Input
                      id="custom-width"
                      type="number"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="custom-height">Height (inches)</Label>
                    <Input
                      id="custom-height"
                      type="number"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="dpi">Print Resolution (DPI)</Label>
                <Select value={dpi} onValueChange={setDpi}>
                  <SelectTrigger id="dpi">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="72">72 DPI (Screen/Preview)</SelectItem>
                    <SelectItem value="150">150 DPI (Draft/Large Format)</SelectItem>
                    <SelectItem value="200">200 DPI (Standard)</SelectItem>
                    <SelectItem value="300">300 DPI (Professional)</SelectItem>
                    <SelectItem value="600">600 DPI (Premium)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Print Requirements</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Paper Size</p>
                    <p className="text-2xl font-bold text-primary">{result.paperSize}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.widthInches}×{result.heightInches}&quot; ({result.aspectRatio})
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Minimum Pixels</p>
                      <p className="text-lg font-bold">{result.minPixels.width}×{result.minPixels.height}</p>
                      <p className="text-xs text-muted-foreground">{result.minPixels.megapixels} MP</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Recommended</p>
                      <p className="text-lg font-bold text-primary">{result.recommendedPixels.width}×{result.recommendedPixels.height}</p>
                      <p className="text-xs text-muted-foreground">{result.recommendedPixels.megapixels} MP</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Print Quality:</span>
                      <span className="font-semibold">{result.printQuality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Resolution:</span>
                      <span className="font-semibold">{result.dpi} DPI</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Select size and DPI to see pixel requirements</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                DPI Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>300 DPI:</strong> Standard for professional prints, magazines
                  </li>
                  <li>
                    <strong>200 DPI:</strong> Good for standard photo prints
                  </li>
                  <li>
                    <strong>150 DPI:</strong> Acceptable for large posters (viewed from distance)
                  </li>
                  <li>
                    <strong>72 DPI:</strong> Screen display only, not for printing
                  </li>
                </ul>
                <p>
                  <strong>Formula:</strong> Pixels = Inches × DPI
                </p>
                <p>
                  <strong>Tip:</strong> For large format prints (24&quot;+), viewing distance
                  allows lower DPI. A billboard may only need 10-20 DPI!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
