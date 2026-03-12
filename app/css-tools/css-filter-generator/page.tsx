"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function CssFilterGeneratorPage() {
  const [filters, setFilters] = useState({
    blur: 0,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    sepia: 0,
    saturate: 100,
    hueRotate: 0,
    invert: 0,
    opacity: 100,
  });

  const generateFilter = () => {
    const parts: string[] = [];
    if (filters.blur > 0) parts.push(`blur(${filters.blur}px)`);
    if (filters.brightness !== 100) parts.push(`brightness(${filters.brightness}%)`);
    if (filters.contrast !== 100) parts.push(`contrast(${filters.contrast}%)`);
    if (filters.grayscale > 0) parts.push(`grayscale(${filters.grayscale}%)`);
    if (filters.sepia > 0) parts.push(`sepia(${filters.sepia}%)`);
    if (filters.saturate !== 100) parts.push(`saturate(${filters.saturate}%)`);
    if (filters.hueRotate > 0) parts.push(`hue-rotate(${filters.hueRotate}deg)`);
    if (filters.invert > 0) parts.push(`invert(${filters.invert}%)`);
    if (filters.opacity !== 100) parts.push(`opacity(${filters.opacity}%)`);
    return parts.length > 0 ? parts.join(" ") : "none";
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
    setFilters({
      blur: 0,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      sepia: 0,
      saturate: 100,
      hueRotate: 0,
      invert: 0,
      opacity: 100,
    });
  };

  const filterCSS = generateFilter();

  const presets = [
    { name: "Vintage", values: { sepia: 40, contrast: 120, brightness: 90, saturate: 80 } },
    { name: "B&W", values: { grayscale: 100, contrast: 110 } },
    { name: "Warm", values: { sepia: 20, saturate: 120, brightness: 105 } },
    { name: "Cool", values: { hueRotate: 180, saturate: 80 } },
    { name: "Dramatic", values: { contrast: 150, saturate: 130, brightness: 90 } },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setFilters({
      blur: 0,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      sepia: 0,
      saturate: 100,
      hueRotate: 0,
      invert: 0,
      opacity: 100,
      ...preset.values,
    });
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Filter Generator</h1>
        <p className="text-muted-foreground">
          Apply visual effects like blur, brightness, contrast, and more with live preview.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Filter Properties</CardTitle>
              <Button variant="outline" size="sm" onClick={reset}>
                Reset
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Blur: {filters.blur}px</Label>
                <Slider
                  value={[filters.blur]}
                  onValueChange={([v]) => setFilters({ ...filters, blur: v })}
                  min={0}
                  max={20}
                  step={0.5}
                />
              </div>
              <div>
                <Label>Brightness: {filters.brightness}%</Label>
                <Slider
                  value={[filters.brightness]}
                  onValueChange={([v]) => setFilters({ ...filters, brightness: v })}
                  min={0}
                  max={200}
                  step={1}
                />
              </div>
              <div>
                <Label>Contrast: {filters.contrast}%</Label>
                <Slider
                  value={[filters.contrast]}
                  onValueChange={([v]) => setFilters({ ...filters, contrast: v })}
                  min={0}
                  max={200}
                  step={1}
                />
              </div>
              <div>
                <Label>Grayscale: {filters.grayscale}%</Label>
                <Slider
                  value={[filters.grayscale]}
                  onValueChange={([v]) => setFilters({ ...filters, grayscale: v })}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
              <div>
                <Label>Sepia: {filters.sepia}%</Label>
                <Slider
                  value={[filters.sepia]}
                  onValueChange={([v]) => setFilters({ ...filters, sepia: v })}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
              <div>
                <Label>Saturate: {filters.saturate}%</Label>
                <Slider
                  value={[filters.saturate]}
                  onValueChange={([v]) => setFilters({ ...filters, saturate: v })}
                  min={0}
                  max={200}
                  step={1}
                />
              </div>
              <div>
                <Label>Hue Rotate: {filters.hueRotate}°</Label>
                <Slider
                  value={[filters.hueRotate]}
                  onValueChange={([v]) => setFilters({ ...filters, hueRotate: v })}
                  min={0}
                  max={360}
                  step={1}
                />
              </div>
              <div>
                <Label>Invert: {filters.invert}%</Label>
                <Slider
                  value={[filters.invert]}
                  onValueChange={([v]) => setFilters({ ...filters, invert: v })}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
              <div>
                <Label>Opacity: {filters.opacity}%</Label>
                <Slider
                  value={[filters.opacity]}
                  onValueChange={([v]) => setFilters({ ...filters, opacity: v })}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Presets</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  onClick={() => applyPreset(preset)}
                >
                  {preset.name}
                </Button>
              ))}
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
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center p-8 overflow-hidden">
                <img
                  src="https://picsum.photos/400/300"
                  alt="Preview"
                  className="max-w-full max-h-full rounded-lg transition-all duration-200"
                  style={{ filter: filterCSS }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                  filter: {filterCSS};
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(`filter: ${filterCSS};`, "Filter CSS")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <Button className="w-full" onClick={() => copyToClipboard(`filter: ${filterCSS};`, "Filter")}>
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
          <h2 className="text-2xl font-semibold mb-4">CSS Filters Explained</h2>
          <p className="text-muted-foreground mb-4">
            CSS filters apply graphical effects like blurring, color shifting, or inverting to
            elements. They're the same filters you'd use in image editing software, but in CSS.
          </p>
          <p className="text-muted-foreground">
            Filters work on images, backgrounds, text, and any HTML element. Stack multiple
            filters for complex effects.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Filter Functions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-lg">blur()</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Softens the image. <code className="bg-muted px-1 rounded">blur(5px)</code> - higher
                values create more blur. Good for backgrounds behind modals.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">brightness()</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Adjusts lightness. <code className="bg-muted px-1 rounded">100%</code> is normal,
                <code className="bg-muted px-1 rounded">0%</code> is black, <code className="bg-muted px-1 rounded">200%</code> is double bright.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">contrast()</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Adjusts the difference between light and dark. <code className="bg-muted px-1 rounded">100%</code> is normal,
                higher values increase contrast.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">grayscale()</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Removes color. <code className="bg-muted px-1 rounded">100%</code> is fully grayscale,
                <code className="bg-muted px-1 rounded">0%</code> is unchanged. Good for hover effects.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">hue-rotate()</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Rotates colors around the color wheel. <code className="bg-muted px-1 rounded">180deg</code>
                inverts colors. <code className="bg-muted px-1 rounded">360deg</code> returns to original.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">saturate()</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Intensifies or dulls colors. <code className="bg-muted px-1 rounded">100%</code> is normal,
                <code className="bg-muted px-1 rounded">0%</code> is grayscale, higher values are more vivid.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Image hover effects:</strong> Grayscale to full color on hover</li>
                <li><strong>Background treatment:</strong> Blur + brightness for readable text overlays</li>
                <li><strong>Dark mode:</strong> brightness(0.8) to reduce glare</li>
                <li><strong>Disabled states:</strong> grayscale(100%) opacity(0.5) for disabled buttons</li>
                <li><strong>Theming:</strong> hue-rotate() to shift entire color schemes</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
