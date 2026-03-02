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
          <h2 className="text-2xl font-semibold mb-4">What This Tool Does</h2>
          <p className="text-muted-foreground mb-4">
            CSS gradients replace background images with code. You pick colors, adjust the angle or shape, 
            and get the CSS to paste into your stylesheet. No Photoshop, no export, no 500KB PNGs.
          </p>
          <p className="text-muted-foreground">
            This generator covers all three gradient types: linear (straight transitions), radial (circular 
            spread from a center point), and conic (rotating around a center, like a pie chart). Each has 
            its use - linear for buttons and cards, radial for spotlights and depth, conic for charts and 
            color wheels.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">When Gradients Actually Help</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Call-to-action buttons</h3>
                <p className="text-sm text-muted-foreground">
                  A subtle gradient makes buttons pop without looking gimmicky. Try a 2-3% lightness 
                  shift at a 45-degree angle.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Hero section backgrounds</h3>
                <p className="text-sm text-muted-foreground">
                  Gradients create visual interest without the performance hit of large images. 
                  Layer multiple gradients for complexity.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Loading states and progress bars</h3>
                <p className="text-sm text-muted-foreground">
                  Animated gradients signal activity. Use conic gradients for circular loaders, 
                  linear for progress bars.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Card and section dividers</h3>
                <p className="text-sm text-muted-foreground">
                  A soft gradient background separates content areas more elegantly than hard borders 
                  or solid colors.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Gradient Syntax, Explained</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Linear gradients</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-3">
                  linear-gradient(135deg, #667eea 0%, #764ba2 100%)
                </code>
                <p className="text-sm text-muted-foreground">
                  The angle controls direction. 0deg goes up, 90deg goes right, 180deg goes down. 
                  Color stops define where each color hits 100% opacity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Radial gradients</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-3">
                  radial-gradient(circle, #667eea 0%, #764ba2 100%)
                </code>
                <p className="text-sm text-muted-foreground">
                  Shape can be "circle" or "ellipse". The gradient spreads from the center outward. 
                  You can also set a specific center point with "at 50% 50%".
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Conic gradients</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-3">
                  conic-gradient(from 0deg, #667eea 0%, #764ba2 50%, #667eea 100%)
                </code>
                <p className="text-sm text-muted-foreground">
                  Conic gradients rotate around a center. "from 0deg" starts at the top. 
                  Great for pie charts - each slice is a color stop with specific start and end positions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How many color stops should I use?</h3>
                <p className="text-sm text-muted-foreground">
                  Two to four colors usually works best. More than that and gradients start looking muddy. 
                  If you need complex blends, consider layering multiple gradients instead of adding more stops.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Can I use transparency?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes - use rgba() or hsla() values. Transparent gradients work well for overlays. 
                  Example: <code className="bg-muted px-1 rounded">rgba(0, 0, 0, 0.4)</code> for a dark overlay.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Do gradients affect performance?</h3>
                <p className="text-sm text-muted-foreground">
                  Not noticeably. Gradients are GPU-accelerated and render faster than loading images. 
                  The only concern is animating gradients, which can trigger repaints.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why does my gradient look banded?</h3>
                <p className="text-sm text-muted-foreground">
                  Color banding happens when there aren't enough intermediate colors. Add a tiny amount 
                  of noise with a pseudo-element, or use more color stops to smooth the transition.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tips That Actually Help</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Subtle beats obvious</h3>
                <p className="text-sm text-muted-foreground">
                  A 5% lightness shift looks professional. Rainbow gradients look like 2005 called.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Match your brand colors</h3>
                <p className="text-sm text-muted-foreground">
                  Use your primary color as the base, then shift hue slightly for the second stop.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Test in grayscale</h3>
                <p className="text-sm text-muted-foreground">
                  If the gradient disappears in grayscale, the colors are too similar in lightness.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
