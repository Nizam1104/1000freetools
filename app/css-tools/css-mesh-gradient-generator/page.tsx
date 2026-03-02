"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, Plus, Trash2, Shuffle } from "lucide-react";

interface GradientPoint {
  id: string;
  x: number;
  y: number;
  color: string;
  radius: number;
}

export default function CssMeshGradientGeneratorPage() {
  const [points, setPoints] = useState<GradientPoint[]>([
    { id: "1", x: 20, y: 20, color: "#ff6b6b", radius: 50 },
    { id: "2", x: 80, y: 30, color: "#4ecdc4", radius: 50 },
    { id: "3", x: 70, y: 80, color: "#45b7d1", radius: 50 },
    { id: "4", x: 30, y: 70, color: "#96ceb4", radius: 50 },
  ]);
  const [blur, setBlur] = useState(80);

  const addPoint = () => {
    const newPoint: GradientPoint = {
      id: Date.now().toString(),
      x: 50 + (Math.random() - 0.5) * 60,
      y: 50 + (Math.random() - 0.5) * 60,
      color: "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0"),
      radius: 40 + Math.random() * 30,
    };
    setPoints([...points, newPoint]);
  };

  const removePoint = (id: string) => {
    if (points.length <= 2) {
      toast.error("Minimum 2 points required");
      return;
    }
    setPoints(points.filter((p) => p.id !== id));
  };

  const updatePoint = (id: string, updates: Partial<GradientPoint>) => {
    setPoints(points.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const generateMeshGradient = () => {
    const radialGradients = points.map((point) => {
      return `radial-gradient(${point.radius}% at ${point.x}% ${point.y}%, ${point.color} 0%, transparent 100%)`;
    });
    
    return radialGradients.join(",\n");
  };

  const generateCSS = () => {
    const gradients = generateMeshGradient();
    
    return `.mesh-gradient {
  background: 
${gradients};
  filter: blur(${blur}px);
}`;
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
    const randomized = points.map((p) => ({
      ...p,
      color: "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0"),
    }));
    setPoints(randomized);
  };

  const cssCode = generateCSS();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Mesh Gradient Generator</h1>
        <p className="text-muted-foreground">
          Create beautiful multi-point gradient meshes with blended colors. Generate modern, fluid background effects.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Gradient Points</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={randomizeColors}>
                  <Shuffle className="w-4 h-4 mr-1" />
                  Randomize
                </Button>
                <Button variant="outline" size="sm" onClick={addPoint}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {points.map((point, index) => (
                <div key={point.id} className="p-3 bg-muted rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Point {index + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removePoint(point.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Color</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="color"
                          value={point.color}
                          onChange={(e) => updatePoint(point.id, { color: e.target.value })}
                          className="w-10 h-8 p-0"
                        />
                        <Input
                          type="text"
                          value={point.color}
                          onChange={(e) => updatePoint(point.id, { color: e.target.value })}
                          className="w-20 text-xs font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Radius: {point.radius}%</Label>
                      <Slider
                        value={[point.radius]}
                        onValueChange={([v]) => updatePoint(point.id, { radius: v })}
                        min={20}
                        max={100}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">X: {point.x.toFixed(0)}%</Label>
                      <Slider
                        value={[point.x]}
                        onValueChange={([v]) => updatePoint(point.id, { x: v })}
                        min={0}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Y: {point.y.toFixed(0)}%</Label>
                      <Slider
                        value={[point.y]}
                        onValueChange={([v]) => updatePoint(point.id, { y: v })}
                        min={0}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blur Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Blur Amount: {blur}px</Label>
                <Slider value={[blur]} onValueChange={([v]) => setBlur(v)} min={20} max={150} step={5} className="mt-2" />
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
              <div
                className="w-full aspect-square rounded-lg overflow-hidden"
                style={{
                  background: points.map((p) => `radial-gradient(${p.radius}% at ${p.x}% ${p.y}%, ${p.color} 0%, transparent 100%)`).join(", "),
                  filter: `blur(${blur}px)`,
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Point Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-square bg-muted rounded-lg border overflow-hidden">
                {points.map((point, index) => (
                  <div
                    key={point.id}
                    className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white shadow-lg cursor-pointer"
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      backgroundColor: point.color,
                    }}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold">{index + 1}</span>
                  </div>
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
                  {cssCode}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(cssCode, "Mesh Gradient CSS")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(cssCode, "Mesh Gradient CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS
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
                  setPoints([
                    { id: "1", x: 20, y: 20, color: "#ff6b6b", radius: 50 },
                    { id: "2", x: 80, y: 30, color: "#4ecdc4", radius: 50 },
                    { id: "3", x: 70, y: 80, color: "#45b7d1", radius: 50 },
                    { id: "4", x: 30, y: 70, color: "#96ceb4", radius: 50 },
                  ]);
                  setBlur(80);
                }}
              >
                Sunset Mesh
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPoints([
                    { id: "1", x: 25, y: 25, color: "#667eea", radius: 60 },
                    { id: "2", x: 75, y: 25, color: "#764ba2", radius: 60 },
                    { id: "3", x: 50, y: 75, color: "#f093fb", radius: 60 },
                  ]);
                  setBlur(70);
                }}
              >
                Purple Dream
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPoints([
                    { id: "1", x: 30, y: 30, color: "#f093fb", radius: 50 },
                    { id: "2", x: 70, y: 30, color: "#f5576c", radius: 50 },
                    { id: "3", x: 50, y: 70, color: "#4facfe", radius: 50 },
                  ]);
                  setBlur(90);
                }}
              >
                Candy Pop
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPoints([
                    { id: "1", x: 20, y: 40, color: "#11998e", radius: 55 },
                    { id: "2", x: 80, y: 40, color: "#38ef7d", radius: 55 },
                    { id: "3", x: 50, y: 80, color: "#0ba360", radius: 55 },
                  ]);
                  setBlur(75);
                }}
              >
                Green Fresh
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Are Mesh Gradients?</h2>
          <p className="text-muted-foreground mb-4">
            Mesh gradients blend multiple colors across a surface using overlapping
            radial gradients. Unlike linear gradients that go from A to B in a
            straight line, mesh gradients create organic, fluid color patterns.
          </p>
          <p className="text-muted-foreground">
            They're popular in modern web design for hero backgrounds, cards, and
            anywhere you want visual interest without images. The entire effect is
            pure CSS - no images to load.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                Each point creates a radial gradient that fades from solid color to
                transparent. Multiple points layer on top of each other. A blur filter
                blends them together for smooth transitions.
              </p>
              <code className="block p-4 bg-muted rounded-lg text-sm font-mono">
                {`background:
  radial-gradient(50% at 20% 30%, #ff6b6b, transparent),
  radial-gradient(50% at 80% 20%, #4ecdc4, transparent),
  radial-gradient(50% at 60% 80%, #45b7d1, transparent);
filter: blur(80px);`}
              </code>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Design Tips</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Color Harmony</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Use analogous colors (next to each other on the wheel) for smooth
                blends, or complementary colors for more dynamic contrast.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Point Placement</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Distribute points across the canvas. Cluster points for intense color
                mixing in specific areas.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Blur Amount</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Higher blur (80-120px) creates smooth, dreamy blends. Lower blur
                (40-60px) keeps more defined color boundaries.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
