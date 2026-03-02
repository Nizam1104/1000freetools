"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, RefreshCw } from "lucide-react";

export default function BackgroundNoiseGrainGeneratorPage() {
  const [noiseType, setNoiseType] = useState<"svg" | "css">("svg");
  const [opacity, setOpacity] = useState(0.05);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState("#000000");
  const [blendMode, setBlendMode] = useState<"normal" | "multiply" | "overlay" | "soft-light">("multiply");

  const generateSVGNoise = () => {
    const seed = Math.floor(Math.random() * 1000);
    return `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;
  };

  const generateCSS = () => {
    if (noiseType === "svg") {
      return `.noise-background {
  position: relative;
}

.noise-background::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("${generateSVGNoise()}");
  opacity: ${opacity};
  pointer-events: none;
  mix-blend-mode: ${blendMode};
  transform: scale(${scale});
}`;
    } else {
      return `.noise-background {
  background-color: ${color};
  background-image: 
    radial-gradient(${color} 1px, transparent 1px),
    radial-gradient(${color} 1px, transparent 1px);
  background-size: ${Math.round(20 * scale)}px ${Math.round(20 * scale)}px;
  background-position: 0 0, ${Math.round(10 * scale)}px ${Math.round(10 * scale)}px;
  opacity: ${opacity};
}`;
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

  const cssCode = generateCSS();

  const getPreviewStyles = () => {
    if (noiseType === "svg") {
      return {
        backgroundImage: `url("${generateSVGNoise()}")`,
        opacity: opacity,
        mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
        transform: `scale(${scale})`,
      };
    } else {
      return {
        backgroundColor: color,
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px), radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: `${Math.round(20 * scale)}px ${Math.round(20 * scale)}px`,
        backgroundPosition: `0 0, ${Math.round(10 * scale)}px ${Math.round(10 * scale)}px`,
        opacity: opacity,
      };
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Background Noise/Grain Generator</h1>
        <p className="text-muted-foreground">
          Add subtle noise and grain textures to your designs. Create vintage, film-like effects with pure CSS or SVG.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Noise Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Noise Type</Label>
                <Select value={noiseType} onValueChange={(v) => setNoiseType(v as typeof noiseType)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="svg">SVG Filter (Recommended)</SelectItem>
                    <SelectItem value="css">CSS Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Opacity: {(opacity * 100).toFixed(0)}%</Label>
                <Slider value={[opacity]} onValueChange={([v]) => setOpacity(v)} min={0.01} max={0.3} step={0.01} className="mt-2" />
              </div>
              <div>
                <Label>Scale: {scale}x</Label>
                <Slider value={[scale]} onValueChange={([v]) => setScale(v)} min={0.5} max={3} step={0.1} className="mt-2" />
              </div>
              {noiseType === "css" && (
                <div>
                  <Label>Noise Color</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 h-9" />
                    <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="font-mono text-sm" />
                  </div>
                </div>
              )}
              <div>
                <Label>Blend Mode</Label>
                <Select value={blendMode} onValueChange={(v) => setBlendMode(v as typeof blendMode)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiply">Multiply (Darkens)</SelectItem>
                    <SelectItem value="overlay">Overlay (Contrast)</SelectItem>
                    <SelectItem value="soft-light">Soft Light (Subtle)</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Low opacity:</strong> Keep between 3-10% for subtle effects
              </div>
              <div>
                <strong className="text-foreground">Blend modes:</strong> Multiply works best on light backgrounds
              </div>
              <div>
                <strong className="text-foreground">SVG vs CSS:</strong> SVG produces more natural, random noise
              </div>
              <div>
                <strong className="text-foreground">Performance:</strong> Both methods are GPU-accelerated
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
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                  <div
                    className="absolute inset-0"
                    style={getPreviewStyles()}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground">Light Background</span>
                  </div>
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  <div
                    className="absolute inset-0"
                    style={{
                      ...getPreviewStyles(),
                      mixBlendMode: "screen",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/80">Dark Background</span>
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
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                  {cssCode}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(cssCode, "Noise CSS")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(cssCode, "Noise CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setOpacity(0.05);
                  setScale(1);
                  setBlendMode("multiply");
                }}
              >
                Subtle Grain
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setOpacity(0.15);
                  setScale(1.5);
                  setBlendMode("overlay");
                }}
              >
                Vintage Film
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setOpacity(0.08);
                  setScale(0.8);
                  setBlendMode("soft-light");
                }}
              >
                Texture Overlay
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setOpacity(0.2);
                  setScale(2);
                  setBlendMode("normal");
                }}
              >
                Strong Noise
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Noise Textures</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Noise and grain textures add subtle visual interest to flat backgrounds, creating depth and 
              a tactile, organic feel. They're commonly used to achieve vintage, film photography aesthetics
              or to reduce banding in gradients.
            </p>
            <p>
              SVG-based noise uses the &lt;feTurbulence&gt; filter to generate random patterns, while CSS-only
              approaches use repeating radial gradients for a more structured dot pattern.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Keep It Subtle</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Noise should enhance, not dominate. Use low opacity (3-10%) for best results. The effect 
                should be noticeable when removed but not distracting when present.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Consider Context</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Noise works great on solid colors and gradients. Be cautious with busy backgrounds where 
                it might create visual clutter.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
