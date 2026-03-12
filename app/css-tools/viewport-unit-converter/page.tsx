"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function ViewportUnitConverterPage() {
  const [value, setValue] = useState(100);
  const [fromUnit, setFromUnit] = useState<"px" | "vw" | "vh" | "vmin" | "vmax" | "rem">("px");
  const [toUnit, setToUnit] = useState<"px" | "vw" | "vh" | "vmin" | "vmax" | "rem">("vw");
  const [viewportWidth, setViewportWidth] = useState(1440);
  const [viewportHeight, setViewportHeight] = useState(900);
  const [rootFontSize, setRootFontSize] = useState(16);

  const convertValue = () => {
    // First convert to px
    let pxValue: number;

    switch (fromUnit) {
      case "px":
        pxValue = value;
        break;
      case "vw":
        pxValue = (value / 100) * viewportWidth;
        break;
      case "vh":
        pxValue = (value / 100) * viewportHeight;
        break;
      case "vmin":
        pxValue = (value / 100) * Math.min(viewportWidth, viewportHeight);
        break;
      case "vmax":
        pxValue = (value / 100) * Math.max(viewportWidth, viewportHeight);
        break;
      case "rem":
        pxValue = value * rootFontSize;
        break;
    }

    // Then convert from px to target unit
    switch (toUnit) {
      case "px":
        return pxValue;
      case "vw":
        return (pxValue / viewportWidth) * 100;
      case "vh":
        return (pxValue / viewportHeight) * 100;
      case "vmin":
        return (pxValue / Math.min(viewportWidth, viewportHeight)) * 100;
      case "vmax":
        return (pxValue / Math.max(viewportWidth, viewportHeight)) * 100;
      case "rem":
        return pxValue / rootFontSize;
    }
  };

  const generateCSS = () => {
    const converted = convertValue();
    return `/* Original: ${value}${fromUnit} */
${toUnit === "rem" ? converted.toFixed(2) : converted.toFixed(1)}${toUnit}

/* Or use calc() for responsive values */
calc(${value}${fromUnit})`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const convertedValue = convertValue();
  const cssCode = generateCSS();

  const commonConversions = [
    { label: "Full Width", from: 100, fromUnit: "vw", to: "px" },
    { label: "Half Height", from: 50, fromUnit: "vh", to: "px" },
    { label: "1rem to px", from: 1, fromUnit: "rem", to: "px" },
    { label: "100px to rem", from: 100, fromUnit: "px", to: "rem" },
    { label: "100px to vw", from: 100, fromUnit: "px", to: "vw" },
    { label: "50vh to vmin", from: 50, fromUnit: "vh", to: "vmin" },
  ];

  const applyConversion = (conv: typeof commonConversions[0]) => {
    setValue(conv.from);
    setFromUnit(conv.fromUnit as typeof fromUnit);
    setToUnit(conv.to as typeof toUnit);
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Viewport Unit Converter</h1>
        <p className="text-muted-foreground">
          Convert between px, vw, vh, vmin, vmax, and rem units. Calculate responsive values based on viewport dimensions.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Viewport Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Viewport Width: {viewportWidth}px</Label>
                <Slider value={[viewportWidth]} onValueChange={([v]) => setViewportWidth(v)} min={320} max={2560} step={10} className="mt-2" />
              </div>
              <div>
                <Label>Viewport Height: {viewportHeight}px</Label>
                <Slider value={[viewportHeight]} onValueChange={([v]) => setViewportHeight(v)} min={400} max={1440} step={10} className="mt-2" />
              </div>
              <div>
                <Label>Root Font Size: {rootFontSize}px</Label>
                <Slider value={[rootFontSize]} onValueChange={([v]) => setRootFontSize(v)} min={12} max={24} step={1} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-2 items-end">
                <div className="col-span-2">
                  <Label>Value</Label>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                    className="mt-2"
                  />
                </div>
                <div className="col-span-3">
                  <Label>From Unit</Label>
                  <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as typeof fromUnit)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="px">px</SelectItem>
                      <SelectItem value="vw">vw</SelectItem>
                      <SelectItem value="vh">vh</SelectItem>
                      <SelectItem value="vmin">vmin</SelectItem>
                      <SelectItem value="vmax">vmax</SelectItem>
                      <SelectItem value="rem">rem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-2xl">↓</span>
              </div>
              <div className="grid grid-cols-5 gap-2 items-end">
                <div className="col-span-2">
                  <Label>Result</Label>
                  <Input
                    type="text"
                    value={toUnit === "rem" ? convertedValue.toFixed(2) : convertedValue.toFixed(1)}
                    readOnly
                    className="mt-2 font-mono"
                  />
                </div>
                <div className="col-span-3">
                  <Label>To Unit</Label>
                  <Select value={toUnit} onValueChange={(v) => setToUnit(v as typeof toUnit)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="px">px</SelectItem>
                      <SelectItem value="vw">vw</SelectItem>
                      <SelectItem value="vh">vh</SelectItem>
                      <SelectItem value="vmin">vmin</SelectItem>
                      <SelectItem value="vmax">vmax</SelectItem>
                      <SelectItem value="rem">rem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Conversions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {commonConversions.map((conv) => (
                <Button
                  key={conv.label}
                  variant="outline"
                  size="sm"
                  onClick={() => applyConversion(conv)}
                >
                  {conv.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Result Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 bg-muted/50 rounded-lg">
                <div className="text-4xl font-bold mb-2">
                  {toUnit === "rem" ? convertedValue.toFixed(2) : convertedValue.toFixed(1)}
                  <span className="text-lg text-muted-foreground ml-1">{toUnit}</span>
                </div>
                <div className="text-muted-foreground">
                  {value}{fromUnit} = {toUnit === "rem" ? convertedValue.toFixed(2) : convertedValue.toFixed(1)}{toUnit}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  at {viewportWidth}×{viewportHeight} viewport
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visual Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Original: {value}{fromUnit}</span>
                    <span>Converted: {toUnit === "rem" ? convertedValue.toFixed(2) : convertedValue.toFixed(1)}{toUnit}</span>
                  </div>
                  <div className="h-8 bg-muted rounded flex">
                    <div
                      className="bg-primary rounded-l h-full flex items-center justify-center text-white text-xs font-medium px-2"
                      style={{ width: `${Math.min(100, (value / (fromUnit === "vw" ? 100 : fromUnit === "vh" ? 100 : 1))) * 100 / viewportWidth * 100}%` }}
                    >
                      {value}{fromUnit}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="h-8 bg-muted rounded flex">
                    <div
                      className="bg-secondary rounded-l h-full flex items-center justify-center text-white text-xs font-medium px-2"
                      style={{ width: `${Math.min(100, convertedValue / (toUnit === "vw" ? 100 : toUnit === "vh" ? 100 : 1)) * 100}%` }}
                    >
                      {toUnit === "rem" ? convertedValue.toFixed(2) : convertedValue.toFixed(1)}{toUnit}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                  {cssCode}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(cssCode, "CSS Code")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(cssCode, "CSS Code")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Unit Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-muted rounded">
                <code>vw</code>
                <span className="text-muted-foreground">1% of viewport width</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <code>vh</code>
                <span className="text-muted-foreground">1% of viewport height</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <code>vmin</code>
                <span className="text-muted-foreground">1% of smaller dimension</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <code>vmax</code>
                <span className="text-muted-foreground">1% of larger dimension</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <code>rem</code>
                <span className="text-muted-foreground">Root element font size</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Viewport Units</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Viewport units are relative to the size of the browser window. They're essential for creating
              responsive designs that adapt to different screen sizes without media queries.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unit Definitions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">vw (Viewport Width)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                1vw = 1% of the viewport width. 100vw equals the full width of the browser window.
                Useful for full-width sections and responsive typography.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">vh (Viewport Height)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                1vh = 1% of the viewport height. 100vh equals the full height of the browser window.
                Great for hero sections and full-screen layouts.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">vmin & vmax</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                vmin is 1% of the smaller dimension (width or height). vmax is 1% of the larger.
                Useful for maintaining proportions on any screen orientation.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">rem (Root EM)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                1rem equals the root element's font size (typically 16px). Scales with user
                preferences and is accessible by default.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
