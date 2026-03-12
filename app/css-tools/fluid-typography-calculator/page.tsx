"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function FluidTypographyCalculatorPage() {
  const [minWidth, setMinWidth] = useState(320);
  const [maxWidth, setMaxWidth] = useState(1440);
  const [minFontSize, setMinFontSize] = useState(16);
  const [maxFontSize, setMaxFontSize] = useState(24);
  const [minLineHeight, setMinLineHeight] = useState(1.5);
  const [maxLineHeight, setMaxLineHeight] = useState(1.8);
  const [property, setProperty] = useState<"font-size" | "line-height" | "both">("both");

  const fluidCSS = useMemo(() => {
    const minFont = minFontSize;
    const maxFont = maxFontSize;
    const minVw = minWidth;
    const maxVw = maxWidth;

    const slope = (maxFont - minFont) / (maxVw - minVw);
    const yIntercept = minFont - slope * minVw;

    if (property === "font-size") {
      return `font-size: clamp(${minFont}px, ${slope.toFixed(4)}vw + ${yIntercept.toFixed(2)}px, ${maxFont}px);`;
    } else if (property === "line-height") {
      const lhSlope = (maxLineHeight - minLineHeight) / (maxVw - minVw);
      const lhIntercept = minLineHeight - lhSlope * minVw;
      return `line-height: clamp(${minLineHeight}, ${lhSlope.toFixed(4)}vw + ${lhIntercept.toFixed(2)}, ${maxLineHeight});`;
    } else {
      const lhSlope = (maxLineHeight - minLineHeight) / (maxVw - minVw);
      const lhIntercept = minLineHeight - lhSlope * minVw;
      return `/* Fluid Typography */
font-size: clamp(${minFont}px, ${slope.toFixed(4)}vw + ${yIntercept.toFixed(2)}px, ${maxFont}px);
line-height: clamp(${minLineHeight}, ${lhSlope.toFixed(4)}vw + ${lhIntercept.toFixed(2)}, ${maxLineHeight});`;
    }
  }, [minWidth, maxWidth, minFontSize, maxFontSize, minLineHeight, maxLineHeight, property]);

  const cssVariables = useMemo(() => {
    const minFont = minFontSize;
    const maxFont = maxFontSize;
    const minVw = minWidth;
    const maxVw = maxWidth;

    const slope = (maxFont - minFont) / (maxVw - minVw);
    const yIntercept = minFont - slope * minVw;
    const lhSlope = (maxLineHeight - minLineHeight) / (maxVw - minVw);
    const lhIntercept = minLineHeight - lhSlope * minVw;

    return `:root {
  /* Fluid Typography Scale */
  --fluid-font-size: clamp(${minFont}px, ${slope.toFixed(4)}vw + ${yIntercept.toFixed(2)}px, ${maxFont}px);
  --fluid-line-height: clamp(${minLineHeight}, ${lhSlope.toFixed(4)}vw + ${lhIntercept.toFixed(2)}, ${maxLineHeight});
  
  /* Configuration */
  --min-viewport: ${minWidth}px;
  --max-viewport: ${maxWidth}px;
  --min-font-size: ${minFontSize}px;
  --max-font-size: ${maxFontSize}px;
}`;
  }, [minWidth, maxWidth, minFontSize, maxFontSize, minLineHeight, maxLineHeight]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const previewSizes = [
    { label: "Mobile", width: 375 },
    { label: "Tablet", width: 768 },
    { label: "Desktop", width: 1024 },
    { label: "Large", width: 1440 },
  ];

  const calculateSizeAtViewport = (viewportWidth: number) => {
    const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
    const yIntercept = minFontSize - slope * minWidth;
    return Math.min(maxFontSize, Math.max(minFontSize, slope * viewportWidth + yIntercept));
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Fluid Typography Calculator</h1>
        <p className="text-muted-foreground">
          Generate responsive clamp()-based fluid typography that scales smoothly between viewport breakpoints.
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
                <Label>Minimum Viewport: {minWidth}px</Label>
                <Slider value={[minWidth]} onValueChange={([v]) => setMinWidth(v)} min={280} max={768} step={10} className="mt-2" />
              </div>
              <div>
                <Label>Maximum Viewport: {maxWidth}px</Label>
                <Slider value={[maxWidth]} onValueChange={([v]) => setMaxWidth(v)} min={1024} max={1920} step={10} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Font Size Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Minimum Font Size: {minFontSize}px</Label>
                <Slider value={[minFontSize]} onValueChange={([v]) => setMinFontSize(v)} min={12} max={20} step={1} className="mt-2" />
              </div>
              <div>
                <Label>Maximum Font Size: {maxFontSize}px</Label>
                <Slider value={[maxFontSize]} onValueChange={([v]) => setMaxFontSize(v)} min={18} max={32} step={1} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Line Height Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Minimum Line Height: {minLineHeight}</Label>
                <Slider value={[minLineHeight]} onValueChange={([v]) => setMinLineHeight(v)} min={1} max={2} step={0.1} className="mt-2" />
              </div>
              <div>
                <Label>Maximum Line Height: {maxLineHeight}</Label>
                <Slider value={[maxLineHeight]} onValueChange={([v]) => setMaxLineHeight(v)} min={1.2} max={2.5} step={0.1} className="mt-2" />
              </div>
              <div>
                <Label>Generate</Label>
                <Select value={property} onValueChange={(v) => setProperty(v as typeof property)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Font Size + Line Height</SelectItem>
                    <SelectItem value="font-size">Font Size Only</SelectItem>
                    <SelectItem value="line-height">Line Height Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview at Breakpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {previewSizes.map((size) => {
                  const calculatedSize = calculateSizeAtViewport(size.width);
                  return (
                    <div key={size.label} className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">{size.label}</p>
                      <p className="text-2xl font-bold">{calculatedSize.toFixed(1)}px</p>
                      <p className="text-xs text-muted-foreground">@{size.width}px viewport</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="p-6 bg-muted/50 rounded-lg"
                  style={{
                    fontSize: `${minFontSize}px`,
                    lineHeight: minLineHeight,
                  }}
                >
                  <p style={{ fontSize: `${calculateSizeAtViewport(375)}px`, lineHeight: minLineHeight + (maxLineHeight - minLineHeight) * 0.3 }}>
                    Mobile (375px): {calculateSizeAtViewport(375).toFixed(1)}px
                  </p>
                  <p className="mt-2" style={{ fontSize: `${calculateSizeAtViewport(768)}px`, lineHeight: minLineHeight + (maxLineHeight - minLineHeight) * 0.5 }}>
                    Tablet (768px): {calculateSizeAtViewport(768).toFixed(1)}px
                  </p>
                  <p className="mt-2" style={{ fontSize: `${calculateSizeAtViewport(1440)}px`, lineHeight: maxLineHeight }}>
                    Desktop (1440px): {calculateSizeAtViewport(1440).toFixed(1)}px
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>CSS Variables (Recommended)</Label>
                <div className="flex gap-2 mt-2">
                  <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                    {cssVariables}
                  </pre>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(cssVariables, "CSS Variables")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Direct Usage</Label>
                <div className="flex gap-2 mt-2">
                  <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                    {fluidCSS}
                  </pre>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(fluidCSS, "Fluid CSS")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Complete Example</Label>
                <div className="flex gap-2 mt-2">
                  <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                    {`body {
  ${fluidCSS.split("\n").map((l) => "  " + l).join("\n")}
}`}
                  </pre>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`body {\n  ${fluidCSS.split("\n").map((l) => "  " + l).join("\n")}\n}`, "Complete Example")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(cssVariables, "Fluid Typography CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS Variables
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Fluid Typography</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Fluid typography uses CSS <code>clamp()</code> to create font sizes that scale smoothly between
              viewport breakpoints. This eliminates the need for multiple media queries and provides a more
              natural reading experience across all devices.
            </p>
            <p>
              The <code>clamp(min, preferred, max)</code> function ensures your text never goes below a minimum
              size or above a maximum size, while scaling fluidly in between based on viewport width.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                The calculator uses linear interpolation to create a smooth scale:
              </p>
              <code className="block p-4 bg-muted rounded-lg text-sm font-mono">
                {"preferred = slope × viewport + y-intercept"}
                <br />
                {"slope = (maxFont - minFont) / (maxView - minView)"}
              </code>
              <p className="text-muted-foreground mt-4">
                This creates a linear relationship between viewport size and font size, ensuring smooth scaling
                across all screen sizes.
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accessibility First</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Always set reasonable minimum and maximum values. Text should never be too small to read
                or so large it breaks the layout.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Respect User Preferences</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Consider using relative units (rem) alongside clamp() to respect browser font size preferences
                and accessibility settings.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
