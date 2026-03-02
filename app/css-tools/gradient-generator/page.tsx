"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, Plus, Trash2, ArrowUpDown, RotateCcw } from "lucide-react";

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export default function GradientGeneratorPage() {
  const [gradientType, setGradientType] = useState<"linear" | "radial" | "conic">("linear");
  const [angle, setAngle] = useState(90);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: "1", color: "#6366f1", position: 0 },
    { id: "2", color: "#8b5cf6", position: 100 },
  ]);
  const [radialShape, setRadialShape] = useState<"circle" | "ellipse">("circle");
  const [conicAngle, setConicAngle] = useState(0);

  const generateGradient = useCallback(() => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops.map((stop) => `${stop.color} ${stop.position}%`).join(", ");

    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${stopsString})`;
    } else if (gradientType === "radial") {
      return `radial-gradient(${radialShape}, ${stopsString})`;
    } else {
      return `conic-gradient(from ${conicAngle}deg, ${stopsString})`;
    }
  }, [gradientType, angle, colorStops, radialShape, conicAngle]);

  const addColorStop = () => {
    const newPosition = colorStops.length > 0 
      ? Math.min(100, Math.max(0, colorStops[colorStops.length - 1].position + 10))
      : 50;
    const newStop: ColorStop = {
      id: Date.now().toString(),
      color: "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
      position: newPosition,
    };
    setColorStops([...colorStops, newStop]);
  };

  const removeColorStop = (id: string) => {
    if (colorStops.length <= 2) {
      toast.error("Minimum 2 color stops required");
      return;
    }
    setColorStops(colorStops.filter((stop) => stop.id !== id));
  };

  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    setColorStops(colorStops.map((stop) => 
      stop.id === id ? { ...stop, ...updates } : stop
    ));
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const randomizeColors = () => {
    const randomColors = colorStops.map((stop) => ({
      ...stop,
      color: "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
    }));
    setColorStops(randomColors);
  };

  const resetGradient = () => {
    setGradientType("linear");
    setAngle(90);
    setColorStops([
      { id: "1", color: "#6366f1", position: 0 },
      { id: "2", color: "#8b5cf6", position: 100 },
    ]);
    setRadialShape("circle");
    setConicAngle(0);
  };

  const gradientCSS = generateGradient();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Gradient Generator</h1>
        <p className="text-muted-foreground">
          Create beautiful linear, radial, and conic gradients with live preview. Generate production-ready CSS code instantly.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gradient Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Gradient Type</Label>
                <Tabs value={gradientType} onValueChange={(v) => setGradientType(v as typeof gradientType)} className="mt-2">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="linear">Linear</TabsTrigger>
                    <TabsTrigger value="radial">Radial</TabsTrigger>
                    <TabsTrigger value="conic">Conic</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {gradientType === "linear" && (
                <div>
                  <Label>Angle: {angle}°</Label>
                  <Slider
                    value={[angle]}
                    onValueChange={([v]) => setAngle(v)}
                    min={0}
                    max={360}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0°</span>
                    <span>90°</span>
                    <span>180°</span>
                    <span>270°</span>
                    <span>360°</span>
                  </div>
                </div>
              )}

              {gradientType === "radial" && (
                <div>
                  <Label>Shape</Label>
                  <Select value={radialShape} onValueChange={(v) => setRadialShape(v as typeof radialShape)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="ellipse">Ellipse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {gradientType === "conic" && (
                <div>
                  <Label>Start Angle: {conicAngle}°</Label>
                  <Slider
                    value={[conicAngle]}
                    onValueChange={([v]) => setConicAngle(v)}
                    min={0}
                    max={360}
                    step={1}
                    className="mt-2"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Color Stops</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={randomizeColors}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Randomize
                </Button>
                <Button variant="outline" size="sm" onClick={addColorStop}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Stop
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {colorStops.map((stop, index) => (
                <div key={stop.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <Label className="text-xs">Color {index + 1}</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        type="color"
                        value={stop.color}
                        onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                        className="w-12 h-9 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={stop.color}
                        onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                        className="w-24 font-mono text-sm"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs">Position: {stop.position}%</Label>
                    <Slider
                      value={[stop.position]}
                      onValueChange={([v]) => updateColorStop(stop.id, { position: v })}
                      min={0}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeColorStop(stop.id)}
                    className="mt-6 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
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
              <div
                className="w-full h-64 rounded-lg border bg-checkerboard"
                style={{ background: gradientCSS }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Background Property</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">
                    {gradientCSS}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(gradientCSS, "Gradient CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Complete Class Example</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">
                    {`.gradient { background: ${gradientCSS}; }`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`.gradient { background: ${gradientCSS}; }`, "Complete CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={() => copyToClipboard(gradientCSS, "Gradient")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Gradient CSS
              </Button>
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
                  setGradientType("linear");
                  setAngle(90);
                  setColorStops([
                    { id: "1", color: "#667eea", position: 0 },
                    { id: "2", color: "#764ba2", position: 100 },
                  ]);
                }}
              >
                Sunset
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setGradientType("linear");
                  setAngle(45);
                  setColorStops([
                    { id: "1", color: "#f093fb", position: 0 },
                    { id: "2", color: "#f5576c", position: 100 },
                  ]);
                }}
              >
                Pink Flare
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setGradientType("linear");
                  setAngle(135);
                  setColorStops([
                    { id: "1", color: "#4facfe", position: 0 },
                    { id: "2", color: "#00f2fe", position: 100 },
                  ]);
                }}
              >
                Ocean Blue
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setGradientType("radial");
                  setRadialShape("circle");
                  setColorStops([
                    { id: "1", color: "#43e97b", position: 0 },
                    { id: "2", color: "#38f9d7", position: 100 },
                  ]);
                }}
              >
                Mint Fresh
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About CSS Gradients</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              CSS gradients are smooth transitions between two or more colors. They're powerful tools for creating 
              visually appealing backgrounds, buttons, cards, and other UI elements without relying on images.
            </p>
            <p>
              There are three main types of CSS gradients: <strong>linear</strong> (colors transition along a line), 
              <strong> radial</strong> (colors radiate from a center point), and <strong>conic</strong> 
              (colors rotate around a center point). Each type offers unique visual effects for different design needs.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Gradient Types Explained</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Linear Gradient</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Colors transition along a straight line defined by an angle. Perfect for backgrounds, buttons, and progress bars.
                <div className="mt-3 p-2 bg-muted rounded font-mono text-xs">
                  linear-gradient(90deg, red, blue)
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Radial Gradient</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Colors radiate outward from a center point. Great for creating depth, spotlights, and circular designs.
                <div className="mt-3 p-2 bg-muted rounded font-mono text-xs">
                  radial-gradient(circle, red, blue)
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conic Gradient</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Colors rotate around a center point like a clock. Ideal for pie charts, color wheels, and radial menus.
                <div className="mt-3 p-2 bg-muted rounded font-mono text-xs">
                  conic-gradient(from 0deg, red, blue)
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What are CSS color stops?</h3>
                <p className="text-muted-foreground">
                  Color stops define the colors and their positions in a gradient. Each stop has a color value and 
                  a position percentage (0-100%). The gradient smoothly transitions between these stops.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Can I use transparency in gradients?</h3>
                <p className="text-muted-foreground">
                  Yes! Use RGBA or HSLA color values with alpha channels. For example: 
                  <code className="ml-1 bg-muted px-1 rounded">rgba(255, 0, 0, 0.5)</code> creates a semi-transparent red.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Are CSS gradients performant?</h3>
                <p className="text-muted-foreground">
                  Yes, CSS gradients are GPU-accelerated and very performant. They're often faster than using images 
                  because they're rendered directly by the browser without network requests.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
