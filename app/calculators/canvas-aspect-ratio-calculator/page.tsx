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

interface AspectRatioResult {
  width: number;
  height: number;
  aspectRatio: string;
  ratioDecimal: number;
  commonFormats: Array<{ name: string; ratio: string; match: boolean }>;
  resizedDimensions: Array<{ dimension: string; width: number; height: number }>;
  recommendations: string[];
}

export default function CanvasAspectRatioCalculatorPage() {
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [targetDimension, setTargetDimension] = useState<string>("");
  const [lockTo, setLockTo] = useState<string>("width");
  const [result, setResult] = useState<AspectRatioResult | null>(null);

  const calculate = () => {
    const widthNum = parseFloat(width) || 0;
    const heightNum = parseFloat(height) || 0;
    const targetNum = parseFloat(targetDimension) || 0;

    if (widthNum === 0 || heightNum === 0) return;

    // Calculate aspect ratio (simplified)
    const gcd = (a: number, b: number): number => {
      return b === 0 ? a : gcd(b, a % b);
    };
    const divisor = gcd(Math.round(widthNum * 100), Math.round(heightNum * 100));
    const ratioWidth = Math.round((widthNum * 100) / divisor);
    const ratioHeight = Math.round((heightNum * 100) / divisor);
    const aspectRatio = `${ratioWidth}:${ratioHeight}`;
    const ratioDecimal = widthNum / heightNum;

    // Common format matching
    const commonFormats = [
      { name: "1:1 (Square)", ratio: "1:1", match: Math.abs(ratioDecimal - 1) < 0.05 },
      { name: "4:3 (Standard)", ratio: "4:3", match: Math.abs(ratioDecimal - 1.333) < 0.05 },
      { name: "3:2 (Photo)", ratio: "3:2", match: Math.abs(ratioDecimal - 1.5) < 0.05 },
      { name: "16:9 (Widescreen)", ratio: "16:9", match: Math.abs(ratioDecimal - 1.778) < 0.05 },
      { name: "16:10 (Laptop)", ratio: "16:10", match: Math.abs(ratioDecimal - 1.6) < 0.05 },
      { name: "21:9 (Ultrawide)", ratio: "21:9", match: Math.abs(ratioDecimal - 2.333) < 0.05 },
      { name: "2:3 (Portrait)", ratio: "2:3", match: Math.abs(ratioDecimal - 0.667) < 0.05 },
      { name: "9:16 (Story)", ratio: "9:16", match: Math.abs(ratioDecimal - 0.563) < 0.05 },
    ];

    // Calculate resized dimensions
    const resizedDimensions: Array<{ dimension: string; width: number; height: number }> = [];
    
    if (targetNum > 0) {
      if (lockTo === "width") {
        resizedDimensions.push({
          dimension: `Width: ${targetNum}`,
          width: targetNum,
          height: parseFloat((targetNum / ratioDecimal).toFixed(1)),
        });
      } else {
        resizedDimensions.push({
          dimension: `Height: ${targetNum}`,
          width: parseFloat((targetNum * ratioDecimal).toFixed(1)),
          height: targetNum,
        });
      }
    }

    // Add common preset sizes
    const presets = [
      { name: "HD (1280×720)", w: 1280, h: 720 },
      { name: "Full HD (1920×1080)", w: 1920, h: 1080 },
      { name: "2K (2560×1440)", w: 2560, h: 1440 },
      { name: "4K (3840×2160)", w: 3840, h: 2160 },
      { name: "Instagram Square (1080×1080)", w: 1080, h: 1080 },
      { name: "Instagram Portrait (1080×1350)", w: 1080, h: 1350 },
    ];

    presets.forEach((preset) => {
      const presetRatio = preset.w / preset.h;
      if (Math.abs(presetRatio - ratioDecimal) < 0.05) {
        resizedDimensions.push({
          dimension: preset.name,
          width: preset.w,
          height: preset.h,
        });
      }
    });

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📐 Aspect Ratio: ${aspectRatio} (${ratioDecimal.toFixed(3)})`);

    if (ratioDecimal >= 1.7 && ratioDecimal <= 1.8) {
      recommendations.push("📺 16:9 format - ideal for video and presentations");
    } else if (ratioDecimal >= 1.3 && ratioDecimal <= 1.35) {
      recommendations.push("📷 4:3 format - classic photo and tablet format");
    } else if (Math.abs(ratioDecimal - 1) < 0.1) {
      recommendations.push("🔲 Square format - ideal for social media");
    } else if (ratioDecimal > 2) {
      recommendations.push("🎬 Ultrawide format - cinematic look");
    }

    recommendations.push("🔒 Maintain aspect ratio when resizing to avoid distortion");
    recommendations.push("📏 Use even numbers for pixel dimensions");

    setResult({
      width: widthNum,
      height: heightNum,
      aspectRatio,
      ratioDecimal,
      commonFormats,
      resizedDimensions,
      recommendations,
    });
  };

  const reset = () => {
    setWidth("");
    setHeight("");
    setTargetDimension("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Canvas Aspect Ratio Calculator – Resize Canvas While Keeping Proportions
          </h1>
          <p className="text-muted-foreground">
            Resize your canvas perfectly with our Aspect Ratio Calculator. Lock your
            width-to-height ratio and enter a new dimension to instantly see the correct
            corresponding size — ideal for graphic designers, video editors, and photographers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="1920"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="1080"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="text-sm font-medium">Resize Calculator</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="space-y-1">
                    <Label htmlFor="target" className="text-xs">Target Value</Label>
                    <Input
                      id="target"
                      type="number"
                      value={targetDimension}
                      onChange={(e) => setTargetDimension(e.target.value)}
                      placeholder="1280"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lock" className="text-xs">Lock To</Label>
                    <Select value={lockTo} onValueChange={setLockTo}>
                      <SelectTrigger id="lock">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="width">Width</SelectItem>
                        <SelectItem value="height">Height</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={calculate} className="w-full">
                      Calculate
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate Ratio
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Aspect Ratio Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Aspect Ratio</p>
                    <p className="text-4xl font-bold text-primary">{result.aspectRatio}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.ratioDecimal.toFixed(3)} : 1
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Common Format Match</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.commonFormats.map((format, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-full text-sm ${
                            format.match
                              ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                              : "bg-muted/50 text-muted-foreground"
                          }`}
                        >
                          {format.ratio} {format.name.split(" ")[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {result.resizedDimensions.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Resized Dimensions</h4>
                      <div className="space-y-1">
                        {result.resizedDimensions.map((dim, i) => (
                          <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                            <span>{dim.dimension}</span>
                            <span className="font-mono">{dim.width} × {dim.height}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter dimensions and click Calculate to see aspect ratio</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Common Aspect Ratios
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">1:1</span> - Square (Instagram)
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">4:3</span> - Standard TV, Tablets
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">3:2</span> - DSLR Photos
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">16:9</span> - Widescreen, YouTube
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">16:10</span> - Laptops
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">21:9</span> - Ultrawide Monitor
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">9:16</span> - Stories, TikTok
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <span className="font-medium">2:3</span> - Portrait Photos
                  </div>
                </div>
                <p>
                  <strong>Tip:</strong> Always maintain aspect ratio when resizing to
                  avoid stretching or squashing your content. Crop instead of stretch
                  when changing aspect ratios.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
