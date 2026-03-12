"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function CssPatternGeneratorPage() {
  const [patternType, setPatternType] = useState<"stripes" | "dots" | "checkerboard" | "grid" | "waves">("stripes");
  const [baseColor, setBaseColor] = useState("#ffffff");
  const [patternColor, setPatternColor] = useState("#6366f1");
  const [size, setSize] = useState(20);
  const [stripeAngle, setStripeAngle] = useState(45);
  const [stripeWidth, setStripeWidth] = useState(50);
  const [dotRadius, setDotRadius] = useState(4);
  const [gridGap, setGridGap] = useState(2);
  const [waveAmplitude, setWaveAmplitude] = useState(10);
  const [waveFrequency, setWaveFrequency] = useState(2);

  const generatePatternCSS = () => {
    switch (patternType) {
      case "stripes":
        return `background-color: ${baseColor};
background-image: repeating-linear-gradient(
  ${stripeAngle}deg,
  ${patternColor} 0px,
  ${patternColor} ${size * (stripeWidth / 100)}px,
  ${baseColor} ${size * (stripeWidth / 100)}px,
  ${baseColor} ${size}px
);`;

      case "dots":
        return `background-color: ${baseColor};
background-image: radial-gradient(
  ${patternColor} ${dotRadius}px,
  transparent ${dotRadius}px
);
background-size: ${size}px ${size}px;`;

      case "checkerboard":
        return `background-color: ${baseColor};
background-image: 
  linear-gradient(45deg, ${patternColor} 25%, transparent 25%),
  linear-gradient(-45deg, ${patternColor} 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, ${patternColor} 75%),
  linear-gradient(-45deg, transparent 75%, ${patternColor} 75%);
background-size: ${size}px ${size}px;
background-position: 0 0, 0 ${size / 2}px, ${size / 2}px -${size / 2}px, -${size / 2}px 0px;`;

      case "grid":
        return `background-color: ${baseColor};
background-image: 
  linear-gradient(${patternColor} ${gridGap}px, transparent ${gridGap}px),
  linear-gradient(90deg, ${patternColor} ${gridGap}px, transparent ${gridGap}px);
background-size: ${size}px ${size}px;`;

      case "waves":
        return `background-color: ${baseColor};
background-image: repeating-radial-gradient(
  circle at 0 50%,
  ${patternColor},
  transparent ${waveAmplitude}px
);
background-size: ${size * waveFrequency}px ${size * 2}px;`;

      default:
        return "";
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const patternCSS = generatePatternCSS();

  const getPatternStyles = () => {
    const base: React.CSSProperties = {
      width: "100%",
      height: "200px",
      backgroundColor: baseColor,
    };

    switch (patternType) {
      case "stripes":
        base.backgroundImage = `repeating-linear-gradient(
  ${stripeAngle}deg,
  ${patternColor} 0px,
  ${patternColor} ${size * (stripeWidth / 100)}px,
  ${baseColor} ${size * (stripeWidth / 100)}px,
  ${baseColor} ${size}px
)`;
        break;
      case "dots":
        base.backgroundImage = `radial-gradient(${patternColor} ${dotRadius}px, transparent ${dotRadius}px)`;
        base.backgroundSize = `${size}px ${size}px`;
        break;
      case "checkerboard":
        base.backgroundImage = `
  linear-gradient(45deg, ${patternColor} 25%, transparent 25%),
  linear-gradient(-45deg, ${patternColor} 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, ${patternColor} 75%),
  linear-gradient(-45deg, transparent 75%, ${patternColor} 75%)
`;
        base.backgroundSize = `${size}px ${size}px`;
        base.backgroundPosition = `0 0, 0 ${size / 2}px, ${size / 2}px -${size / 2}px, -${size / 2}px 0px`;
        break;
      case "grid":
        base.backgroundImage = `
  linear-gradient(${patternColor} ${gridGap}px, transparent ${gridGap}px),
  linear-gradient(90deg, ${patternColor} ${gridGap}px, transparent ${gridGap}px)
`;
        base.backgroundSize = `${size}px ${size}px`;
        break;
      case "waves":
        base.backgroundImage = `repeating-radial-gradient(
  circle at 0 50%,
  ${patternColor},
  transparent ${waveAmplitude}px
)`;
        base.backgroundSize = `${size * waveFrequency}px ${size * 2}px`;
        break;
    }

    return base;
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Pattern Generator</h1>
        <p className="text-muted-foreground">
          Create repeating CSS patterns including stripes, dots, checkerboard, grids, and waves. Generate lightweight pattern backgrounds.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pattern Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={patternType} onValueChange={(v) => setPatternType(v as typeof patternType)} className="mt-2">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="stripes">Stripes</TabsTrigger>
                  <TabsTrigger value="dots">Dots</TabsTrigger>
                  <TabsTrigger value="checkerboard">Check</TabsTrigger>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="waves">Waves</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Background Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-12 h-9" />
                  <Input type="text" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="font-mono text-sm" />
                </div>
              </div>
              <div>
                <Label>Pattern Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input type="color" value={patternColor} onChange={(e) => setPatternColor(e.target.value)} className="w-12 h-9" />
                  <Input type="text" value={patternColor} onChange={(e) => setPatternColor(e.target.value)} className="font-mono text-sm" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pattern Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Pattern Size: {size}px</Label>
                <Slider value={[size]} onValueChange={([v]) => setSize(v)} min={10} max={100} step={2} className="mt-2" />
              </div>

              {patternType === "stripes" && (
                <>
                  <div>
                    <Label>Angle: {stripeAngle}°</Label>
                    <Slider value={[stripeAngle]} onValueChange={([v]) => setStripeAngle(v)} min={0} max={180} step={5} className="mt-2" />
                  </div>
                  <div>
                    <Label>Stripe Width: {stripeWidth}%</Label>
                    <Slider value={[stripeWidth]} onValueChange={([v]) => setStripeWidth(v)} min={10} max={90} step={5} className="mt-2" />
                  </div>
                </>
              )}

              {patternType === "dots" && (
                <div>
                  <Label>Dot Radius: {dotRadius}px</Label>
                  <Slider value={[dotRadius]} onValueChange={([v]) => setDotRadius(v)} min={1} max={20} step={1} className="mt-2" />
                </div>
              )}

              {patternType === "grid" && (
                <div>
                  <Label>Grid Line Width: {gridGap}px</Label>
                  <Slider value={[gridGap]} onValueChange={([v]) => setGridGap(v)} min={1} max={10} step={1} className="mt-2" />
                </div>
              )}

              {patternType === "waves" && (
                <>
                  <div>
                    <Label>Wave Amplitude: {waveAmplitude}px</Label>
                    <Slider value={[waveAmplitude]} onValueChange={([v]) => setWaveAmplitude(v)} min={5} max={50} step={1} className="mt-2" />
                  </div>
                  <div>
                    <Label>Wave Frequency: {waveFrequency}</Label>
                    <Slider value={[waveFrequency]} onValueChange={([v]) => setWaveFrequency(v)} min={1} max={5} step={0.5} className="mt-2" />
                  </div>
                </>
              )}
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
                  setPatternType("stripes");
                  setBaseColor("#ffffff");
                  setPatternColor("#6366f1");
                  setSize(20);
                  setStripeAngle(45);
                }}
              >
                Diagonal Stripes
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPatternType("dots");
                  setBaseColor("#f8fafc");
                  setPatternColor("#94a3b8");
                  setSize(16);
                  setDotRadius(3);
                }}
              >
                Polka Dots
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPatternType("checkerboard");
                  setBaseColor("#ffffff");
                  setPatternColor("#e2e8f0");
                  setSize(24);
                }}
              >
                Checkerboard
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPatternType("grid");
                  setBaseColor("#ffffff");
                  setPatternColor("#e5e7eb");
                  setSize(40);
                  setGridGap(1);
                }}
              >
                Graph Paper
              </Button>
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
              <div
                className="w-full rounded-lg border"
                style={getPatternStyles()}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pattern Swatches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {[20, 40, 60, 80].map((s) => (
                  <div
                    key={s}
                    className="h-20 rounded border"
                    style={{
                      backgroundColor: baseColor,
                      backgroundImage: patternType === "dots"
                        ? `radial-gradient(${patternColor} ${dotRadius}px, transparent ${dotRadius}px)`
                        : undefined,
                      backgroundSize: patternType === "dots" ? `${s}px ${s}px` : undefined,
                    }}
                  />
                ))}
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
                  {`.pattern {
${patternCSS.split("\n").map((l) => "  " + l).join("\n")}
}`}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(`.pattern {\n${patternCSS.split("\n").map((l) => "  " + l).join("\n")}\n}`, "Pattern CSS")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(`.pattern {\n${patternCSS.split("\n").map((l) => "  " + l).join("\n")}\n}`, "Pattern CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Pattern CSS
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About CSS Patterns</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              CSS patterns are lightweight, scalable background designs created using CSS gradients and
              background properties. Unlike image backgrounds, CSS patterns are resolution-independent
              and don't require HTTP requests.
            </p>
            <p>
              By combining <code>linear-gradient</code>, <code>radial-gradient</code>, and
              <code>repeating-gradient</code> with background-size and background-position, you can
              create a wide variety of repeating patterns.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Pattern Types</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stripes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Created with repeating-linear-gradient. Adjust angle and width ratio for different stripe effects.
                Great for backgrounds, dividers, and accents.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dots</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Made with radial-gradient circles. Control dot size with radius and spacing with background-size.
                Perfect for subtle textures.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Checkerboard</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Four layered gradients create the classic check pattern. Versatile for backgrounds and decorative elements.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Grid</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Two perpendicular linear gradients form grid lines. Ideal for graph paper effects and technical designs.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Performance Benefits</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>No HTTP requests:</strong> Patterns are generated by CSS, no image downloads needed</li>
                <li><strong>Small file size:</strong> CSS code is much smaller than image files</li>
                <li><strong>Infinitely scalable:</strong> Vector-based patterns look sharp at any resolution</li>
                <li><strong>Easy to customize:</strong> Change colors and sizes with CSS variables</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
