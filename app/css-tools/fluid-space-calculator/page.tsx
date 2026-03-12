"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function FluidSpaceCalculatorPage() {
  const [minViewport, setMinViewport] = useState(320);
  const [maxViewport, setMaxViewport] = useState(1440);
  const [minSpace, setMinSpace] = useState(16);
  const [maxSpace, setMaxSpace] = useState(64);
  const [propertyName, setPropertyName] = useState("spacing");

  const generateFluidSpace = () => {
    const slope = (maxSpace - minSpace) / (maxViewport - minViewport);
    const yIntercept = minSpace - slope * minViewport;

    return `clamp(${minSpace}px, ${slope.toFixed(4)}vw + ${yIntercept.toFixed(2)}px, ${maxSpace}px)`;
  };

  const generateCSS = () => {
    const fluidValue = generateFluidSpace();

    return `:root {
  --${propertyName}: ${fluidValue};
}

/* Usage */
.element {
  padding: var(--${propertyName});
  margin: var(--${propertyName});
  gap: var(--${propertyName});
}`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const fluidValue = generateFluidSpace();
  const cssCode = generateCSS();

  const calculateSpaceAtViewport = (vw: number) => {
    const slope = (maxSpace - minSpace) / (maxViewport - minViewport);
    const yIntercept = minSpace - slope * minViewport;
    return Math.min(maxSpace, Math.max(minSpace, slope * vw + yIntercept));
  };

  const previewBreakpoints = [
    { label: "Mobile S", width: 320 },
    { label: "Mobile M", width: 375 },
    { label: "Mobile L", width: 414 },
    { label: "Tablet", width: 768 },
    { label: "Laptop", width: 1024 },
    { label: "Desktop", width: 1440 },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Fluid Space Calculator</h1>
        <p className="text-muted-foreground">
          Generate clamp()-based responsive spacing that scales smoothly between viewport breakpoints.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Viewport Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Minimum Viewport: {minViewport}px</Label>
                <Slider value={[minViewport]} onValueChange={([v]) => setMinViewport(v)} min={280} max={600} step={10} className="mt-2" />
              </div>
              <div>
                <Label>Maximum Viewport: {maxViewport}px</Label>
                <Slider value={[maxViewport]} onValueChange={([v]) => setMaxViewport(v)} min={1000} max={1920} step={10} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spacing Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Minimum Spacing: {minSpace}px</Label>
                <Slider value={[minSpace]} onValueChange={([v]) => setMinSpace(v)} min={4} max={48} step={2} className="mt-2" />
              </div>
              <div>
                <Label>Maximum Spacing: {maxSpace}px</Label>
                <Slider value={[maxSpace]} onValueChange={([v]) => setMaxSpace(v)} min={32} max={128} step={4} className="mt-2" />
              </div>
              <div>
                <Label>CSS Variable Name</Label>
                <Input value={propertyName} onChange={(e) => setPropertyName(e.target.value)} className="mt-2" placeholder="spacing" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Presets</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setMinSpace(16);
                  setMaxSpace(48);
                  setPropertyName("spacing-sm");
                }}
              >
                Small Spacing
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setMinSpace(24);
                  setMaxSpace(64);
                  setPropertyName("spacing-md");
                }}
              >
                Medium Spacing
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setMinSpace(32);
                  setMaxSpace(96);
                  setPropertyName("spacing-lg");
                }}
              >
                Large Spacing
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setMinSpace(48);
                  setMaxSpace(128);
                  setPropertyName("spacing-xl");
                }}
              >
                XL Spacing
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spacing at Breakpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {previewBreakpoints.map((bp) => {
                  const space = calculateSpaceAtViewport(bp.width);
                  return (
                    <div key={bp.label} className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">{bp.label}</p>
                      <p className="text-2xl font-bold">{space.toFixed(1)}px</p>
                      <p className="text-xs text-muted-foreground">@{bp.width}px</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visual Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previewBreakpoints.slice(0, 4).map((bp) => {
                  const space = calculateSpaceAtViewport(bp.width);
                  return (
                    <div key={bp.label} className="flex items-center gap-3">
                      <div className="w-20 text-sm text-muted-foreground">{bp.label}</div>
                      <div
                        className="h-8 bg-primary rounded"
                        style={{ width: `${space}px` }}
                      />
                      <div className="text-sm font-mono">{space.toFixed(1)}px</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                  {cssCode}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(cssCode, "Fluid Space CSS")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <Label>Direct Usage</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">
                    {`.element { padding: ${fluidValue}; }`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`.element { padding: ${fluidValue}; }`, "Direct CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(cssCode, "Fluid Space CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS Variables
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Formula</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="block p-4 bg-muted rounded-lg text-sm font-mono">
                {`clamp(${minSpace}px, mx + b, ${maxSpace}px)`}
                <br />
                {`where m = ${(maxSpace - minSpace) / (maxViewport - minViewport) > 0.01 ? ((maxSpace - minSpace) / (maxViewport - minViewport)).toFixed(4) : ((maxSpace - minSpace) / (maxViewport - minViewport)).toFixed(6)}`}
                <br />
                {`b = ${(minSpace - ((maxSpace - minSpace) / (maxViewport - minViewport)) * minViewport).toFixed(2)}`}
              </code>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Fluid Spacing</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Fluid spacing uses CSS <code>clamp()</code> to create spacing values that scale smoothly
              with the viewport. This eliminates the need for multiple media queries and provides
              consistent visual rhythm across all screen sizes.
            </p>
            <p>
              Unlike fixed spacing or breakpoint-based spacing, fluid spacing adjusts continuously,
              creating a more natural and polished responsive experience.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">When to Use Fluid Spacing</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">✅ Good For</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-1">
                  <li>• Section padding</li>
                  <li>• Container max-widths</li>
                  <li>• Grid gaps</li>
                  <li>• Component spacing</li>
                  <li>• Layout margins</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">⚠️ Use Carefully</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-1">
                  <li>• Border widths</li>
                  <li>• Icon sizes</li>
                  <li>• Border radius</li>
                  <li>• Small UI elements</li>
                  <li>• Text-related spacing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fewer Media Queries</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Replace multiple breakpoint-based rules with a single clamp() declaration.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Smooth Transitions</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                No jarring jumps between breakpoints—spacing changes gradually.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Design Tokens</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Define once as CSS variables and use consistently throughout.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
