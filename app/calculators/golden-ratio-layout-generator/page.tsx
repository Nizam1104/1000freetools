"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PHI = 1.618033988749895;

interface GoldenRatioResult {
  width: number;
  height: number;
  goldenWidth: number;
  goldenHeight: number;
  thirds: Array<{ x: number; y: number }>;
  goldenSpiral: Array<{ x: number; y: number; width: number; height: number }>;
  fibonacciSequence: number[];
  colorPalette: string[];
  typographyScale: number[];
}

export default function GoldenRatioLayoutGeneratorPage() {
  const [width, setWidth] = useState<string>("1920");
  const [height, setHeight] = useState<string>("1080");
  const [result, setResult] = useState<GoldenRatioResult | null>(null);

  const calculate = () => {
    const widthNum = parseFloat(width) || 1920;
    const heightNum = parseFloat(height) || 1080;

    // Calculate golden ratio divisions
    const goldenWidth = widthNum / PHI;
    const goldenHeight = heightNum / PHI;

    // Rule of thirds intersections (approximate golden ratio)
    const thirds = [
      { x: Math.round(widthNum * 0.382), y: Math.round(heightNum * 0.382) },
      { x: Math.round(widthNum * 0.618), y: Math.round(heightNum * 0.382) },
      { x: Math.round(widthNum * 0.382), y: Math.round(heightNum * 0.618) },
      { x: Math.round(widthNum * 0.618), y: Math.round(heightNum * 0.618) },
    ];

    // Golden spiral rectangles
    const goldenSpiral = [];
    let currentWidth = widthNum;
    let currentHeight = heightNum;
    let x = 0;
    let y = 0;

    for (let i = 0; i < 6; i++) {
      if (i % 2 === 0) {
        const squareSize = Math.min(currentWidth, currentHeight);
        goldenSpiral.push({ x, y, width: squareSize, height: squareSize });
        currentWidth -= squareSize;
        x += squareSize;
      } else {
        const squareSize = Math.min(currentWidth, currentHeight);
        goldenSpiral.push({ x, y, width: squareSize, height: squareSize });
        currentHeight -= squareSize;
        y += squareSize;
      }
    }

    // Fibonacci sequence
    const fibonacci = [1, 1];
    for (let i = 2; i < 12; i++) {
      fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
    }

    // Golden ratio color palette (harmonious spacing)
    const colorPalette = [
      "#000000",
      "#616161",
      "#9E9E9E",
      "#BDBDBD",
      "#E0E0E0",
      "#FFFFFF",
    ];

    // Typography scale based on golden ratio
    const baseSize = 16;
    const typographyScale = [];
    for (let i = -2; i <= 5; i++) {
      typographyScale.push(Math.round(baseSize * Math.pow(PHI, i)));
    }

    setResult({
      width: widthNum,
      height: heightNum,
      goldenWidth: Math.round(goldenWidth),
      goldenHeight: Math.round(goldenHeight),
      thirds,
      goldenSpiral,
      fibonacciSequence: fibonacci,
      colorPalette,
      typographyScale,
    });
  };

  const reset = () => {
    setWidth("1920");
    setHeight("1080");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Golden Ratio Layout Generator – Design Perfectly Proportioned Layouts
          </h1>
          <p className="text-muted-foreground">
            Create visually harmonious designs with our Golden Ratio Layout Generator.
            Enter your canvas dimensions to generate golden ratio subdivisions, rectangles,
            and spiral guides — the mathematical foundation of beautiful graphic design
            and architecture.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="width">Width (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="1920"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="height">Height (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="1080"
                  />
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Common Formats:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => { setWidth("1920"); setHeight("1080"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    Full HD (1920×1080)
                  </button>
                  <button
                    onClick={() => { setWidth("3840"); setHeight("2160"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    4K (3840×2160)
                  </button>
                  <button
                    onClick={() => { setWidth("1080"); setHeight("1080"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    Instagram (1080×1080)
                  </button>
                  <button
                    onClick={() => { setWidth("1080"); setHeight("1920"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    Story (1080×1920)
                  </button>
                </div>
              </div>

              <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-sm text-center">
                  <strong>φ (Phi)</strong> = {PHI.toFixed(6)}
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Generate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Golden Ratio Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Golden Width</p>
                      <p className="text-xl font-bold text-primary">{result.goldenWidth}px</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Golden Height</p>
                      <p className="text-xl font-bold text-primary">{result.goldenHeight}px</p>
                    </div>
                  </div>

                  {/* Visual representation */}
                  <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border">
                    {/* Golden ratio division lines */}
                    <div
                      className="absolute top-0 bottom-0 w-px bg-primary/50"
                      style={{ left: `${(result.goldenWidth / result.width) * 100}%` }}
                    />
                    <div
                      className="absolute left-0 right-0 h-px bg-primary/50"
                      style={{ top: `${(result.goldenHeight / result.height) * 100}%` }}
                    />
                    {/* Rule of thirds points */}
                    {result.thirds.map((point, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${(point.x / result.width) * 100}%`, top: `${(point.y / result.height) * 100}%` }}
                      />
                    ))}
                    <p className="absolute bottom-1 right-2 text-xs text-muted-foreground">
                      {result.width}×{result.height}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Focal Points (Golden Sections)</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {result.thirds.map((point, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-muted-foreground">Point {i + 1}:</span>
                          <span className="font-mono">({point.x}, {point.y})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Fibonacci Sequence</h4>
                    <div className="flex flex-wrap gap-1">
                      {result.fibonacciSequence.map((num, i) => (
                        <span key={i} className="px-2 py-1 bg-primary/20 rounded text-sm font-mono">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Typography Scale (base: 16px)</h4>
                    <div className="space-y-1">
                      {result.typographyScale.map((size, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            {i === 2 ? "Base" : i > 2 ? `H${6 - i}` : "Small"}
                          </span>
                          <span className="font-mono">{size}px</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter dimensions and click Generate to see golden ratio guides</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding the Golden Ratio
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  The Golden Ratio (φ = 1.618...) appears throughout nature, art, and
                  architecture. It creates naturally pleasing proportions:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Golden Rectangle:</strong> Ratio of length to width = φ
                  </li>
                  <li>
                    <strong>Golden Spiral:</strong> Logarithmic spiral based on φ
                  </li>
                  <li>
                    <strong>Fibonacci:</strong> Each number is sum of previous two; ratio approaches φ
                  </li>
                  <li>
                    <strong>Rule of Thirds:</strong> Approximation of golden sections
                  </li>
                </ul>
                <p>
                  <strong>Applications:</strong> Logo design, web layouts, photography
                  composition, architecture, product design, and fine art.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
