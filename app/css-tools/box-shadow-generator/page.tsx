"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Copy, Plus, Trash2 } from "lucide-react";

interface ShadowLayer {
  id: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export default function BoxShadowGeneratorPage() {
  const [shadowLayers, setShadowLayers] = useState<ShadowLayer[]>([
    {
      id: "1",
      offsetX: 0,
      offsetY: 4,
      blur: 6,
      spread: -1,
      color: "rgba(0, 0, 0, 0.1)",
      inset: false,
    },
    {
      id: "2",
      offsetX: 0,
      offsetY: 2,
      blur: 4,
      spread: -1,
      color: "rgba(0, 0, 0, 0.06)",
      inset: false,
    },
  ]);

  const generateShadow = useCallback(() => {
    return shadowLayers
      .map((layer) => {
        const insetStr = layer.inset ? "inset " : "";
        return `${insetStr}${layer.offsetX}px ${layer.offsetY}px ${layer.blur}px ${layer.spread}px ${layer.color}`;
      })
      .join(", ");
  }, [shadowLayers]);

  const addLayer = () => {
    const newLayer: ShadowLayer = {
      id: Date.now().toString(),
      offsetX: 0,
      offsetY: 4,
      blur: 8,
      spread: 0,
      color: "rgba(0, 0, 0, 0.15)",
      inset: false,
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

  const updateLayer = (id: string, updates: Partial<ShadowLayer>) => {
    setShadowLayers(
      shadowLayers.map((layer) =>
        layer.id === id ? { ...layer, ...updates } : layer,
      ),
    );
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const resetShadows = () => {
    setShadowLayers([
      {
        id: "1",
        offsetX: 0,
        offsetY: 4,
        blur: 6,
        spread: -1,
        color: "rgba(0, 0, 0, 0.1)",
        inset: false,
      },
      {
        id: "2",
        offsetX: 0,
        offsetY: 2,
        blur: 4,
        spread: -1,
        color: "rgba(0, 0, 0, 0.06)",
        inset: false,
      },
    ]);
  };

  const shadowCSS = generateShadow();

  const presets = [
    {
      name: "Soft",
      shadows: [
        {
          id: "1",
          offsetX: 0,
          offsetY: 1,
          blur: 3,
          spread: 0,
          color: "rgba(0, 0, 0, 0.1)",
          inset: false,
        },
      ] as ShadowLayer[],
    },
    {
      name: "Medium",
      shadows: [
        {
          id: "1",
          offsetX: 0,
          offsetY: 4,
          blur: 6,
          spread: -1,
          color: "rgba(0, 0, 0, 0.1)",
          inset: false,
        },
        {
          id: "2",
          offsetX: 0,
          offsetY: 2,
          blur: 4,
          spread: -1,
          color: "rgba(0, 0, 0, 0.06)",
          inset: false,
        },
      ] as ShadowLayer[],
    },
    {
      name: "Large",
      shadows: [
        {
          id: "1",
          offsetX: 0,
          offsetY: 10,
          blur: 15,
          spread: -3,
          color: "rgba(0, 0, 0, 0.1)",
          inset: false,
        },
        {
          id: "2",
          offsetX: 0,
          offsetY: 4,
          blur: 6,
          spread: -2,
          color: "rgba(0, 0, 0, 0.05)",
          inset: false,
        },
      ] as ShadowLayer[],
    },
    {
      name: "Inner",
      shadows: [
        {
          id: "1",
          offsetX: 0,
          offsetY: 2,
          blur: 4,
          spread: 0,
          color: "rgba(0, 0, 0, 0.06)",
          inset: true,
        },
      ] as ShadowLayer[],
    },
    {
      name: "Floating",
      shadows: [
        {
          id: "1",
          offsetX: 0,
          offsetY: 20,
          blur: 25,
          spread: -5,
          color: "rgba(0, 0, 0, 0.1)",
          inset: false,
        },
        {
          id: "2",
          offsetX: 0,
          offsetY: 8,
          blur: 10,
          spread: -3,
          color: "rgba(0, 0, 0, 0.04)",
          inset: false,
        },
      ] as ShadowLayer[],
    },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Box Shadow Generator</h1>
        <p className="text-muted-foreground">
          Create beautiful CSS box shadows with multiple layers, inset support,
          and live preview.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Shadow Layers</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetShadows}>
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={addLayer}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Layer
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {shadowLayers.map((layer, index) => (
                <Card key={layer.id}>
                  <CardContent className="pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Layer {index + 1}</Label>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs">Inset</Label>
                        <Switch
                          checked={layer.inset}
                          onCheckedChange={(checked) =>
                            updateLayer(layer.id, { inset: checked })
                          }
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeLayer(layer.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">
                          Offset X: {layer.offsetX}px
                        </Label>
                        <Slider
                          value={[layer.offsetX]}
                          onValueChange={([v]) =>
                            updateLayer(layer.id, { offsetX: v })
                          }
                          min={-50}
                          max={50}
                          step={1}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">
                          Offset Y: {layer.offsetY}px
                        </Label>
                        <Slider
                          value={[layer.offsetY]}
                          onValueChange={([v]) =>
                            updateLayer(layer.id, { offsetY: v })
                          }
                          min={-50}
                          max={50}
                          step={1}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Blur: {layer.blur}px</Label>
                        <Slider
                          value={[layer.blur]}
                          onValueChange={([v]) =>
                            updateLayer(layer.id, { blur: v })
                          }
                          min={0}
                          max={100}
                          step={1}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">
                          Spread: {layer.spread}px
                        </Label>
                        <Slider
                          value={[layer.spread]}
                          onValueChange={([v]) =>
                            updateLayer(layer.id, { spread: v })
                          }
                          min={-50}
                          max={50}
                          step={1}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Shadow Color</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          type="color"
                          value={
                            layer.color.startsWith("#")
                              ? layer.color
                              : "#000000"
                          }
                          onChange={(e) => {
                            const hex = e.target.value;
                            const rgb = hexToRgb(hex);
                            if (rgb) {
                              updateLayer(layer.id, {
                                color: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`,
                              });
                            }
                          }}
                          className="w-12 h-9 p-1"
                        />
                        <Input
                          type="text"
                          value={layer.color}
                          onChange={(e) =>
                            updateLayer(layer.id, { color: e.target.value })
                          }
                          className="font-mono text-sm flex-1"
                          placeholder="rgba(0, 0, 0, 0.1)"
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
                  onClick={() =>
                    setShadowLayers(
                      preset.shadows.map((s, i) => ({
                        ...s,
                        id: Date.now().toString() + i,
                      })),
                    )
                  }
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
              <div className="h-64  rounded-lg flex items-center justify-center p-8">
                <div
                  className="w-32 h-32 bg-white rounded-lg transition-shadow duration-200"
                  style={{ boxShadow: shadowCSS }}
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
                <Label>Box Shadow Property</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">
                    {shadowCSS}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(shadowCSS, "Box Shadow")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Complete Class Example</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">
                    {`.shadow { box-shadow: ${shadowCSS}; }`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(
                        `.shadow { box-shadow: ${shadowCSS}; }`,
                        "Complete CSS",
                      )
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Tailwind Arbitrary Value</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">
                    {`shadow-[${shadowCSS.replace(/ /g, "_")}]`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(
                        `shadow-[${shadowCSS.replace(/ /g, "_")}]`,
                        "Tailwind",
                      )
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => copyToClipboard(shadowCSS, "Box Shadow")}
              >
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
          <h2 className="text-2xl font-semibold mb-4">What Box Shadow Does</h2>
          <p className="text-muted-foreground mb-4">
            Box shadow adds depth to elements without images. You can stack
            multiple shadows, push them in any direction, blur the edges, and
            even create inner shadows for inset effects.
          </p>
          <p className="text-muted-foreground">
            The syntax looks intimidating at first - offset-x, offset-y, blur,
            spread, color, inset - but each property does one thing. This
            generator shows you what each value actually does before you copy
            the CSS.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Box Shadow Properties</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Offset X & Y</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Horizontal and vertical distance from the element. Positive X
                pushes right, positive Y pushes down. Negative values go left
                and up.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Blur Radius</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                How soft the shadow edges are. Zero creates a hard edge. Higher
                values create softer, more diffused shadows that look more
                natural.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Spread Radius</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Expands or shrinks the shadow size. Positive makes it larger,
                negative makes it smaller. Often used with blur for layered
                shadow effects.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inset</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Changes from outer shadow to inner shadow. Creates the
                appearance of elements being pressed in or having inner depth.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            When to Use Box Shadow
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Card elevation</h3>
                <p className="text-sm text-muted-foreground">
                  Subtle shadows make cards appear to float above the
                  background. Use low opacity (0.05-0.15) with moderate blur for
                  a natural look.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Button states</h3>
                <p className="text-sm text-muted-foreground">
                  Increase shadow on hover to simulate lifting. Decrease or use
                  inset shadow for pressed states.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Focus rings</h3>
                <p className="text-sm text-muted-foreground">
                  Colored shadows create visible focus indicators without
                  affecting layout. Better than outlines for custom designs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Tips for Natural Shadows
          </h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong>Use multiple layers:</strong> Stack 2-3 shadows with
                  different blur values for realistic depth.
                </li>
                <li>
                  <strong>Keep opacity low:</strong> Real shadows are subtle.
                  Start at 0.1 and adjust from there.
                </li>
                <li>
                  <strong>Match your light source:</strong> If shadows go
                  down-right, keep all elements consistent.
                </li>
                <li>
                  <strong>Colored shadows:</strong> Use your brand color at very
                  low opacity for a modern touch.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Box Shadow Does</h2>
          <p className="text-muted-foreground mb-4">
            Box shadow adds depth to elements without images. You can stack
            multiple shadows, push them in any direction, blur the edges, and
            even create inner shadows for inset effects.
          </p>
          <p className="text-muted-foreground">
            The syntax looks intimidating at first - offset-x, offset-y, blur,
            spread, color, inset - but each property does one thing. This
            generator shows you what each value actually does before you copy
            the CSS.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Box Shadow Properties</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Offset X & Y</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Horizontal and vertical distance from the element. Positive X
                pushes right, positive Y pushes down. Negative values go left
                and up.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Blur Radius</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                How soft the shadow edges are. Zero creates a hard edge. Higher
                values create softer, more diffused shadows that look more
                natural.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Spread Radius</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Expands or shrinks the shadow size. Positive makes it larger,
                negative makes it smaller. Often used with blur for layered
                shadow effects.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inset</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Changes from outer shadow to inner shadow. Creates the
                appearance of elements being pressed in or having inner depth.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            When to Use Box Shadow
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Card elevation</h3>
                <p className="text-sm text-muted-foreground">
                  Subtle shadows make cards appear to float above the
                  background. Use low opacity (0.05-0.15) with moderate blur for
                  a natural look.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Button states</h3>
                <p className="text-sm text-muted-foreground">
                  Increase shadow on hover to simulate lifting. Decrease or use
                  inset shadow for pressed states.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Focus rings</h3>
                <p className="text-sm text-muted-foreground">
                  Colored shadows create visible focus indicators without
                  affecting layout. Better than outlines for custom designs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Tips for Natural Shadows
          </h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <strong>Use multiple layers:</strong> Stack 2-3 shadows with
                  different blur values for realistic depth.
                </li>
                <li>
                  <strong>Keep opacity low:</strong> Real shadows are subtle.
                  Start at 0.1 and adjust from there.
                </li>
                <li>
                  <strong>Match your light source:</strong> If shadows go
                  down-right, keep all elements consistent.
                </li>
                <li>
                  <strong>Colored shadows:</strong> Use your brand color at very
                  low opacity for a modern touch.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

// Helper function for hex to rgb conversion
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}
