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
    <div className="w-full max-w-6xl mx-auto">
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
    </div>
  );
}
