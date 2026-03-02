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

interface LineHeightResult {
  fontSize: number;
  measure: number;
  lineHeightUnitless: number;
  lineHeightPx: number;
  lineHeightEm: number;
  lineHeightPercent: number;
  leadingPx: number;
  category: string;
  recommendations: string[];
}

export default function LineHeightCalculatorPage() {
  const [fontSize, setFontSize] = useState<string>("16");
  const [measure, setMeasure] = useState<string>("65");
  const [contentType, setContentType] = useState<string>("body");
  const [result, setResult] = useState<LineHeightResult | null>(null);

  const calculate = () => {
    const fontSizeNum = parseFloat(fontSize) || 16;
    const measureNum = parseFloat(measure) || 65;

    // Calculate optimal line-height based on measure (line length)
    // Longer measure needs more line-height for readability
    let lineHeightUnitless = 1.5; // Default

    if (contentType === "body") {
      // Body text: 1.5-1.6 for optimal readability
      if (measureNum < 45) {
        lineHeightUnitless = 1.4;
      } else if (measureNum < 60) {
        lineHeightUnitless = 1.5;
      } else if (measureNum < 80) {
        lineHeightUnitless = 1.6;
      } else {
        lineHeightUnitless = 1.7;
      }
    } else if (contentType === "heading") {
      // Headings: tighter line-height
      if (fontSizeNum > 48) {
        lineHeightUnitless = 1.1;
      } else if (fontSizeNum > 32) {
        lineHeightUnitless = 1.2;
      } else if (fontSizeNum > 24) {
        lineHeightUnitless = 1.3;
      } else {
        lineHeightUnitless = 1.4;
      }
    } else if (contentType === "dense") {
      // Dense text (code, data): more space
      lineHeightUnitless = 1.7;
    } else if (contentType === "loose") {
      // Loose/airy design
      lineHeightUnitless = 1.8;
    }

    // Calculate values in different units
    const lineHeightPx = fontSizeNum * lineHeightUnitless;
    const lineHeightEm = lineHeightUnitless; // Same as unitless for em
    const lineHeightPercent = lineHeightUnitless * 100;

    // Leading (space between lines)
    const leadingPx = lineHeightPx - fontSizeNum;

    // Category
    let category = "";
    if (lineHeightUnitless < 1.3) {
      category = "Tight - Suitable for large headings";
    } else if (lineHeightUnitless < 1.5) {
      category = "Normal - Standard body text";
    } else if (lineHeightUnitless < 1.7) {
      category = "Relaxed - Improved readability";
    } else {
      category = "Loose - Editorial/airy design";
    }

    // Recommendations
    const recommendations: string[] = [];

    if (measureNum < 45) {
      recommendations.push("📏 Short line length - good for mobile.");
    } else if (measureNum <= 75) {
      recommendations.push("✅ Optimal line length for readability (45-75 characters).");
    } else {
      recommendations.push("⚠️ Long line length - consider increasing line-height or reducing width.");
    }

    if (contentType === "body") {
      recommendations.push("📖 For body text, 1.5-1.6 is the sweet spot for most fonts.");
    } else if (contentType === "heading") {
      recommendations.push("📰 Headings need tighter line-height due to larger size.");
    }

    recommendations.push(`💡 CSS: line-height: ${lineHeightUnitless}; or ${lineHeightEm}em`);

    setResult({
      fontSize: fontSizeNum,
      measure: measureNum,
      lineHeightUnitless: parseFloat(lineHeightUnitless.toFixed(2)),
      lineHeightPx: parseFloat(lineHeightPx.toFixed(1)),
      lineHeightEm: parseFloat(lineHeightEm.toFixed(2)),
      lineHeightPercent: parseFloat(lineHeightPercent.toFixed(0)),
      leadingPx: parseFloat(leadingPx.toFixed(1)),
      category,
      recommendations,
    });
  };

  const reset = () => {
    setFontSize("16");
    setMeasure("65");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Line-Height Calculator – Find the Optimal Line Spacing for Your Typography
          </h1>
          <p className="text-muted-foreground">
            Improve readability with perfectly calculated line spacing using our Line-Height Calculator.
            Enter your font size and column width to get recommended line-height values in px, em,
            or unitless — following best practices for body text and headings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size (px)</Label>
                <Input
                  id="font-size"
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  placeholder="16"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="measure">Measure (Characters per Line)</Label>
                <Input
                  id="measure"
                  type="number"
                  value={measure}
                  onChange={(e) => setMeasure(e.target.value)}
                  placeholder="65"
                />
                <p className="text-xs text-muted-foreground">
                  Optimal: 45-75 characters per line
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger id="content-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="body">Body Text</SelectItem>
                    <SelectItem value="heading">Heading</SelectItem>
                    <SelectItem value="dense">Dense (Code/Data)</SelectItem>
                    <SelectItem value="loose">Loose/Airy</SelectItem>
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
              <h3 className="text-lg font-semibold mb-4">Line-Height Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Recommended Line-Height</p>
                    <p className="text-4xl font-bold text-primary">{result.lineHeightUnitless}</p>
                    <p className="text-sm text-muted-foreground mt-1">{result.category}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Pixels</p>
                      <p className="text-lg font-bold">{result.lineHeightPx}px</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">EM</p>
                      <p className="text-lg font-bold">{result.lineHeightEm}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Percent</p>
                      <p className="text-lg font-bold">{result.lineHeightPercent}%</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Font Size:</span>
                      <span className="font-semibold">{result.fontSize}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Leading (Line Spacing):</span>
                      <span className="font-semibold">{result.leadingPx}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Measure:</span>
                      <span className="font-semibold">{result.measure} characters</span>
                    </div>
                  </div>

                  {/* Visual preview */}
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                    <p
                      className="text-gray-700 dark:text-gray-300"
                      style={{
                        fontSize: `${Math.min(result.fontSize, 18)}px`,
                        lineHeight: result.lineHeightUnitless,
                      }}
                    >
                      The quick brown fox jumps over the lazy dog. Good typography
                      requires careful attention to line spacing for optimal readability.
                    </p>
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
                  <p>Enter font size and click Calculate to see recommendations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Line-Height Best Practices
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Body text:</strong> 1.5-1.6 for optimal readability
                  </li>
                  <li>
                    <strong>Headings:</strong> 1.1-1.4 (tighter for larger sizes)
                  </li>
                  <li>
                    <strong>Measure:</strong> 45-75 characters per line is ideal
                  </li>
                  <li>
                    <strong>Unitless values:</strong> Use unitless (1.5) instead of px
                    for scalable, accessible typography
                  </li>
                  <li>
                    <strong>Leading:</strong> Space between lines = line-height - font-size
                  </li>
                </ul>
                <p>
                  <strong>CSS Tip:</strong> Always use unitless line-height values
                  (e.g., 1.5) instead of pixels or ems for better inheritance and
                  scalability across different font sizes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
