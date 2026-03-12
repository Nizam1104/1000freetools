"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function GlassmorphismGeneratorPage() {
  const [blur, setBlur] = useState(10);
  const [saturate, setSaturate] = useState(180);
  const [opacity, setOpacity] = useState(10);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [borderOpacity, setBorderOpacity] = useState(20);
  const [borderWidth, setBorderWidth] = useState(1);

  const generateGlassmorphism = () => {
    const rgba = hexToRgba(bgColor, opacity / 100);
    const borderRgba = hexToRgba(bgColor, borderOpacity / 100);
    return `background: ${rgba};
backdrop-filter: blur(${blur}px) saturate(${saturate}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturate}%);
border: ${borderWidth}px solid ${borderRgba};`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const glassmorphismCSS = generateGlassmorphism();

  function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Glassmorphism Generator</h1>
        <p className="text-muted-foreground">
          Create beautiful glassmorphism effects with backdrop blur, transparency, and borders.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Glassmorphism Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Background Blur: {blur}px</Label>
                <Slider
                  value={[blur]}
                  onValueChange={([v]) => setBlur(v)}
                  min={0}
                  max={40}
                  step={1}
                />
              </div>
              <div>
                <Label>Saturate: {saturate}%</Label>
                <Slider
                  value={[saturate]}
                  onValueChange={([v]) => setSaturate(v)}
                  min={0}
                  max={300}
                  step={10}
                />
              </div>
              <div>
                <Label>Background Opacity: {opacity}%</Label>
                <Slider
                  value={[opacity]}
                  onValueChange={([v]) => setOpacity(v)}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
              <div>
                <Label>Background Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              <div>
                <Label>Border Opacity: {borderOpacity}%</Label>
                <Slider
                  value={[borderOpacity]}
                  onValueChange={([v]) => setBorderOpacity(v)}
                  min={0}
                  max={100}
                  step={5}
                />
              </div>
              <div>
                <Label>Border Width: {borderWidth}px</Label>
                <Slider
                  value={[borderWidth]}
                  onValueChange={([v]) => setBorderWidth(v)}
                  min={0}
                  max={4}
                  step={1}
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
              <div className="h-80 rounded-lg flex items-center justify-center p-8 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                {/* Decorative circles */}
                <div className="absolute w-32 h-32 bg-white/30 rounded-full -top-4 -left-4" />
                <div className="absolute w-24 h-24 bg-white/20 rounded-full -bottom-4 -right-4" />

                {/* Glass card */}
                <div
                  className="p-8 rounded-2xl w-64 text-center"
                  style={{
                    background: `rgba(${parseInt(bgColor.slice(1, 3), 16)}, ${parseInt(bgColor.slice(3, 5), 16)}, ${parseInt(bgColor.slice(5, 7), 16)}, ${opacity / 100})`,
                    backdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
                    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
                    border: `${borderWidth}px solid rgba(${parseInt(bgColor.slice(1, 3), 16)}, ${parseInt(bgColor.slice(3, 5), 16)}, ${parseInt(bgColor.slice(5, 7), 16)}, ${borderOpacity / 100})`,
                  }}
                >
                  <p className="text-white font-semibold">Glass Card</p>
                  <p className="text-white/70 text-sm mt-2">Beautiful glassmorphism effect</p>
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
                <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap">
                  {glassmorphismCSS}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(glassmorphismCSS, "CSS")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <Label>Complete Example</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap">
                    {`.glass-card {
  ${glassmorphismCSS}
}`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`.glass-card {\n  ${glassmorphismCSS}\n}`, "Complete CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={() => copyToClipboard(glassmorphismCSS, "CSS")}>
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
          <h2 className="text-2xl font-semibold mb-4">What Is Glassmorphism?</h2>
          <p className="text-muted-foreground mb-4">
            Glassmorphism creates a frosted glass effect using backdrop blur and semi-transparent
            backgrounds. It became popular with macOS Big Sur and Windows 11 design languages.
          </p>
          <p className="text-muted-foreground">
            The effect works by blurring what's behind an element, creating depth and visual
            hierarchy without heavy shadows.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Properties</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Backdrop Filter</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">backdrop-filter: blur(10px);</code>
                <p className="text-sm text-muted-foreground">
                  Blurs the background behind the element. Requires a semi-transparent background
                  to see the effect.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Semi-transparent Background</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">background: rgba(255, 255, 255, 0.2);</code>
                <p className="text-sm text-muted-foreground">
                  Low opacity background (10-30%) lets the blur show through. White for light
                  glass, dark for night mode.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Subtle Border</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">border: 1px solid rgba(255, 255, 255, 0.3);</code>
                <p className="text-sm text-muted-foreground">
                  A faint border defines the edge of the glass. Use white with low opacity for
                  the light-catching effect.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">When to Use Glassmorphism</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Over images:</strong> Works best on colorful, detailed backgrounds where blur is visible</li>
                <li><strong>Overlay panels:</strong> Sidebars, modals, and floating cards benefit from the depth</li>
                <li><strong>Navigation bars:</strong> Sticky headers with glass effect stay visible without blocking content</li>
                <li><strong>Avoid on solid colors:</strong> The effect disappears on plain backgrounds</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
