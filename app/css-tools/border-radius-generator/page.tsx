"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, RotateCcw } from "lucide-react";

export default function BorderRadiusGeneratorPage() {
  const [uniform, setUniform] = useState(true);
  const [topLeft, setTopLeft] = useState(0);
  const [topRight, setTopRight] = useState(0);
  const [bottomRight, setBottomRight] = useState(0);
  const [bottomLeft, setBottomLeft] = useState(0);

  const generateBorderRadius = () => {
    if (uniform) {
      return `${topLeft}px`;
    }
    return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
  };

  const generateElliptical = () => {
    if (uniform) {
      return `${topLeft}px / ${topLeft}px`;
    }
    return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px / ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const reset = () => {
    setUniform(true);
    setTopLeft(0);
    setTopRight(0);
    setBottomRight(0);
    setBottomLeft(0);
  };

  const setAll = (value: number) => {
    setTopLeft(value);
    setTopRight(value);
    setBottomRight(value);
    setBottomLeft(value);
  };

  const borderRadiusCSS = generateBorderRadius();

  const presets = [
    { name: "Circle", value: 9999 },
    { name: "Round", value: 16 },
    { name: "Medium", value: 8 },
    { name: "Small", value: 4 },
    { name: "None", value: 0 },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Border Radius Generator</h1>
        <p className="text-muted-foreground">
          Create custom border-radius values with asymmetric rounded corners and live preview.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Corner Radius</CardTitle>
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-2">
                <Label>Uniform Corners</Label>
                <input
                  type="checkbox"
                  checked={uniform}
                  onChange={(e) => setUniform(e.target.checked)}
                  className="w-4 h-4"
                />
              </div>

              {uniform ? (
                <div>
                  <Label>All Corners: {topLeft}px</Label>
                  <Slider
                    value={[topLeft]}
                    onValueChange={([v]) => setAll(v)}
                    min={0}
                    max={100}
                    step={1}
                  />
                  <div className="flex gap-2 mt-4">
                    {presets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() => setAll(preset.value)}
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <Label>Top Left: {topLeft}px</Label>
                    <Slider
                      value={[topLeft]}
                      onValueChange={([v]) => setTopLeft(v)}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>
                  <div>
                    <Label>Top Right: {topRight}px</Label>
                    <Slider
                      value={[topRight]}
                      onValueChange={([v]) => setTopRight(v)}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>
                  <div>
                    <Label>Bottom Right: {bottomRight}px</Label>
                    <Slider
                      value={[bottomRight]}
                      onValueChange={([v]) => setBottomRight(v)}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>
                  <div>
                    <Label>Bottom Left: {bottomLeft}px</Label>
                    <Slider
                      value={[bottomLeft]}
                      onValueChange={([v]) => setBottomLeft(v)}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Values</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label>Top Left</Label>
                <Input
                  type="number"
                  value={topLeft}
                  onChange={(e) => setTopLeft(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Top Right</Label>
                <Input
                  type="number"
                  value={topRight}
                  onChange={(e) => setTopRight(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Bottom Right</Label>
                <Input
                  type="number"
                  value={bottomRight}
                  onChange={(e) => setBottomRight(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Bottom Left</Label>
                <Input
                  type="number"
                  value={bottomLeft}
                  onChange={(e) => setBottomLeft(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center p-8">
                <div
                  className="w-48 h-48 bg-primary transition-all duration-200"
                  style={{ borderRadius: borderRadiusCSS }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Border Radius</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                    border-radius: {borderRadiusCSS};
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`border-radius: ${borderRadiusCSS};`, "Border Radius")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Individual Properties</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                    {`border-top-left-radius: ${topLeft}px;
border-top-right-radius: ${topRight}px;
border-bottom-right-radius: ${bottomRight}px;
border-bottom-left-radius: ${bottomLeft}px;`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(
                      `border-top-left-radius: ${topLeft}px;\nborder-top-right-radius: ${topRight}px;\nborder-bottom-right-radius: ${bottomRight}px;\nborder-bottom-left-radius: ${bottomLeft}px;`,
                      "Individual Properties"
                    )}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Tailwind Class</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                    rounded-{topLeft}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`rounded-${topLeft}`, "Tailwind")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={() => copyToClipboard(`border-radius: ${borderRadiusCSS};`, "CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Border Radius</h2>
          <p className="text-muted-foreground mb-4">
            Border radius rounds element corners. You can use one value for all corners, or different
            values for each. The property accepts pixels, percentages, or even elliptical values for
            asymmetric curves.
          </p>
          <p className="text-muted-foreground">
            This generator lets you adjust each corner independently and see the result before
            copying the CSS. Toggle uniform mode when you want all corners the same.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Border Radius Syntax</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Single value (all corners)</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">border-radius: 8px;</code>
                <p className="text-sm text-muted-foreground">Applies 8px radius to all four corners.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Four values (clockwise from top-left)</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">border-radius: 10px 20px 10px 20px;</code>
                <p className="text-sm text-muted-foreground">Top-left, top-right, bottom-right, bottom-left.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Elliptical corners</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">border-radius: 10px / 20px;</code>
                <p className="text-sm text-muted-foreground">Different horizontal and vertical radii for oval corners.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What value makes a perfect circle?</h3>
                <p className="text-sm text-muted-foreground">
                  For a square element, use <code className="bg-muted px-1 rounded">border-radius: 50%</code> or
                  any value ≥ half the element's width. For rectangles, elliptical values create pill shapes.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Can I animate border radius?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, border-radius is animatable. Transitions work smoothly between different values.
                  Performance is good on modern browsers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why do my rounded corners look jagged?</h3>
                <p className="text-sm text-muted-foreground">
                  This is usually an anti-aliasing issue. Try adding a 1px transparent border or using
                  <code className="bg-muted px-1 rounded">outline: 1px solid transparent</code> to smooth edges.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
