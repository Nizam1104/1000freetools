"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, Plus, Trash2 } from "lucide-react";

interface TextShadowLayer {
  id: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
}

export default function TextShadowGeneratorPage() {
  const [text, setText] = useState("Sample Text");
  const [fontSize, setFontSize] = useState(48);
  const [shadowLayers, setShadowLayers] = useState<TextShadowLayer[]>([
    { id: "1", offsetX: 2, offsetY: 2, blur: 4, color: "rgba(0, 0, 0, 0.3)" },
  ]);

  const addLayer = () => {
    const newLayer: TextShadowLayer = {
      id: Date.now().toString(),
      offsetX: 2,
      offsetY: 2,
      blur: 4,
      color: "rgba(0, 0, 0, 0.3)",
    };
    setShadowLayers([...shadowLayers, newLayer]);
  };

  const removeLayer = (id: string) => {
    if (shadowLayers.length <= 1) {
      toast.error("Minimum 1 shadow layer required");
      return;
    }
    setShadowLayers(shadowLayers.filter((layer) => layer.id !== id));
  };

  const updateLayer = (id: string, updates: Partial<TextShadowLayer>) => {
    setShadowLayers(shadowLayers.map((layer) =>
      layer.id === id ? { ...layer, ...updates } : layer
    ));
  };

  const generateTextShadow = () => {
    return shadowLayers.map((layer) =>
      `${layer.offsetX}px ${layer.offsetY}px ${layer.blur}px ${layer.color}`
    ).join(", ");
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const textShadowCSS = generateTextShadow();

  const presets = [
    { name: "Simple", shadows: [{ offsetX: 2, offsetY: 2, blur: 4, color: "rgba(0, 0, 0, 0.3)" }] as Partial<TextShadowLayer>[] },
    {
      name: "3D", shadows: [
        { offsetX: 1, offsetY: 1, blur: 0, color: "#999" },
        { offsetX: 2, offsetY: 2, blur: 0, color: "#999" },
        { offsetX: 3, offsetY: 3, blur: 0, color: "#999" },
        { offsetX: 4, offsetY: 4, blur: 6, color: "rgba(0, 0, 0, 0.4)" },
      ] as Partial<TextShadowLayer>[]
    },
    {
      name: "Glow", shadows: [
        { offsetX: 0, offsetY: 0, blur: 10, color: "rgba(255, 255, 255, 0.8)" },
        { offsetX: 0, offsetY: 0, blur: 20, color: "rgba(255, 255, 255, 0.5)" },
      ] as Partial<TextShadowLayer>[]
    },
    {
      name: "Neon", shadows: [
        { offsetX: 0, offsetY: 0, blur: 10, color: "#ff00de" },
        { offsetX: 0, offsetY: 0, blur: 20, color: "#ff00de" },
        { offsetX: 0, offsetY: 0, blur: 40, color: "#ff00de" },
      ] as Partial<TextShadowLayer>[]
    },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setShadowLayers(preset.shadows.map((s, i) => ({ ...s, id: Date.now().toString() + i } as TextShadowLayer)));
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Text Shadow Generator</h1>
        <p className="text-muted-foreground">
          Create beautiful CSS text shadows with multiple layers and live preview.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Text Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Sample Text</Label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="mt-2"
                  placeholder="Enter text"
                />
              </div>
              <div>
                <Label>Font Size: {fontSize}px</Label>
                <Slider
                  value={[fontSize]}
                  onValueChange={([v]) => setFontSize(v)}
                  min={12}
                  max={120}
                  step={1}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Shadow Layers</CardTitle>
              <Button variant="outline" size="sm" onClick={addLayer}>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {shadowLayers.map((layer, index) => (
                <Card key={layer.id}>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Layer {index + 1}</Label>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeLayer(layer.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Offset X: {layer.offsetX}px</Label>
                        <Slider
                          value={[layer.offsetX]}
                          onValueChange={([v]) => updateLayer(layer.id, { offsetX: v })}
                          min={-20}
                          max={20}
                          step={1}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Offset Y: {layer.offsetY}px</Label>
                        <Slider
                          value={[layer.offsetY]}
                          onValueChange={([v]) => updateLayer(layer.id, { offsetY: v })}
                          min={-20}
                          max={20}
                          step={1}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Blur: {layer.blur}px</Label>
                        <Slider
                          value={[layer.blur]}
                          onValueChange={([v]) => updateLayer(layer.id, { blur: v })}
                          min={0}
                          max={20}
                          step={1}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Color</Label>
                        <Input
                          type="color"
                          value={layer.color.startsWith("#") ? layer.color : "#000000"}
                          onChange={(e) => {
                            const hex = e.target.value;
                            updateLayer(layer.id, { color: hex });
                          }}
                          className="h-9 mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                <p
                  className="text-center transition-all duration-200"
                  style={{
                    fontSize: `${fontSize}px`,
                    textShadow: textShadowCSS,
                  }}
                >
                  {text}
                </p>
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
                  text-shadow: {textShadowCSS};
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(`text-shadow: ${textShadowCSS};`, "Text Shadow")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <Label>Complete Example</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap">
                    {`.text {
  font-size: ${fontSize}px;
  text-shadow: ${textShadowCSS};
}`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`.text {\n  font-size: ${fontSize}px;\n  text-shadow: ${textShadowCSS};\n}`, "Complete CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={() => copyToClipboard(`text-shadow: ${textShadowCSS};`, "Text Shadow")}>
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
          <h2 className="text-2xl font-semibold mb-4">Text Shadow Basics</h2>
          <p className="text-muted-foreground mb-4">
            Text-shadow adds depth or effects to text. Unlike box-shadow, it doesn't support spread
            or inset. The syntax is: offset-x, offset-y, blur, color.
          </p>
          <p className="text-muted-foreground">
            Use text shadow sparingly. It's easy to make text harder to read. Subtle shadows work
            better than obvious ones.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">When Text Shadow Helps</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-lg">Text on images</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                A subtle shadow (1-2px blur, low opacity) improves readability when text overlays
                variable backgrounds.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Retro/glow effects</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Stack multiple shadows with the same color for a neon glow. Works well for dark
                mode headers.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">3D text</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Layer shadows with increasing offsets to create depth. Combine with bold fonts
                for best results.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Accessibility</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Light text on dark backgrounds sometimes needs a subtle shadow to maintain contrast
                at small sizes.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tips</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Less is more:</strong> 1px offset, 1-2px blur is usually enough.</li>
                <li><strong>Match your light source:</strong> If UI shadows go down-right, text should too.</li>
                <li><strong>Use currentColor:</strong> <code className="bg-muted px-1 rounded">text-shadow: 1px 1px 2px currentColor;</code> inherits the text color.</li>
                <li><strong>Avoid on body text:</strong> Reserve shadows for headings and large text.</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
