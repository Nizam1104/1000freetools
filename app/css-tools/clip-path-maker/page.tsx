"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, Plus, Trash2, Move } from "lucide-react";

interface Point {
  id: string;
  x: number;
  y: number;
}

export default function ClipPathMakerPage() {
  const [shapeType, setShapeType] = useState<"polygon" | "circle" | "ellipse" | "inset">("polygon");
  const [points, setPoints] = useState<Point[]>([
    { id: "1", x: 50, y: 0 },
    { id: "2", x: 100, y: 50 },
    { id: "3", x: 50, y: 100 },
    { id: "4", x: 0, y: 50 },
  ]);
  const [circleRadius, setCircleRadius] = useState(50);
  const [circleX, setCircleX] = useState(50);
  const [circleY, setCircleY] = useState(50);
  const [ellipseXRadius, setEllipseXRadius] = useState(50);
  const [ellipseYRadius, setEllipseYRadius] = useState(30);
  const [insetTop, setInsetTop] = useState(20);
  const [insetRight, setInsetRight] = useState(20);
  const [insetBottom, setInsetBottom] = useState(20);
  const [insetLeft, setInsetLeft] = useState(20);
  const [insetRound, setInsetRound] = useState(0);

  const generateClipPath = useCallback(() => {
    if (shapeType === "polygon") {
      const pointsString = points.map((p) => `${p.x}% ${p.y}%`).join(", ");
      return `polygon(${pointsString})`;
    } else if (shapeType === "circle") {
      return `circle(${circleRadius}% at ${circleX}% ${circleY}%)`;
    } else if (shapeType === "ellipse") {
      return `ellipse(${ellipseXRadius}% ${ellipseYRadius}% at ${circleX}% ${circleY}%)`;
    } else {
      const round = insetRound > 0 ? ` round ${insetRound}%` : "";
      return `inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}%${round})`;
    }
  }, [shapeType, points, circleRadius, circleX, circleY, ellipseXRadius, ellipseYRadius, insetTop, insetRight, insetBottom, insetLeft, insetRound]);

  const addPoint = () => {
    const newPoint: Point = {
      id: Date.now().toString(),
      x: 50 + (Math.random() - 0.5) * 40,
      y: 50 + (Math.random() - 0.5) * 40,
    };
    setPoints([...points, newPoint]);
  };

  const removePoint = (id: string) => {
    if (points.length <= 3) {
      toast.error("Minimum 3 points required for polygon");
      return;
    }
    setPoints(points.filter((p) => p.id !== id));
  };

  const updatePoint = (id: string, updates: Partial<Point>) => {
    setPoints(points.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const resetPolygon = () => {
    setPoints([
      { id: "1", x: 50, y: 0 },
      { id: "2", x: 100, y: 50 },
      { id: "3", x: 50, y: 100 },
      { id: "4", x: 0, y: 50 },
    ]);
  };

  const clipPathCSS = generateClipPath();

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (shapeType !== "polygon") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const newPoint: Point = {
      id: Date.now().toString(),
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
    };
    setPoints([...points, newPoint]);
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Clip Path Maker</h1>
        <p className="text-muted-foreground">
          Create polygon, circle, ellipse, and inset clip paths visually. Generate production-ready CSS code.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shape Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={shapeType} onValueChange={(v) => setShapeType(v as typeof shapeType)} className="mt-2">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="polygon">Polygon</TabsTrigger>
                  <TabsTrigger value="circle">Circle</TabsTrigger>
                  <TabsTrigger value="ellipse">Ellipse</TabsTrigger>
                  <TabsTrigger value="inset">Inset</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {shapeType === "polygon" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Polygon Points</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetPolygon}>
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addPoint}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Point
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Click on the preview canvas to add points, or adjust values below:</p>
                {points.map((point, index) => (
                  <div key={point.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium w-16">Point {index + 1}</span>
                    <div className="flex-1">
                      <Label className="text-xs">X: {point.x}%</Label>
                      <Slider
                        value={[point.x]}
                        onValueChange={([v]) => updatePoint(point.id, { x: v })}
                        min={0}
                        max={100}
                        step={1}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs">Y: {point.y}%</Label>
                      <Slider
                        value={[point.y]}
                        onValueChange={([v]) => updatePoint(point.id, { y: v })}
                        min={0}
                        max={100}
                        step={1}
                        className="mt-1"
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removePoint(point.id)} className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {shapeType === "circle" && (
            <Card>
              <CardHeader>
                <CardTitle>Circle Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Radius: {circleRadius}%</Label>
                  <Slider value={[circleRadius]} onValueChange={([v]) => setCircleRadius(v)} min={0} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <Label>Center X: {circleX}%</Label>
                  <Slider value={[circleX]} onValueChange={([v]) => setCircleX(v)} min={0} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <Label>Center Y: {circleY}%</Label>
                  <Slider value={[circleY]} onValueChange={([v]) => setCircleY(v)} min={0} max={100} step={1} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {shapeType === "ellipse" && (
            <Card>
              <CardHeader>
                <CardTitle>Ellipse Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>X Radius: {ellipseXRadius}%</Label>
                  <Slider value={[ellipseXRadius]} onValueChange={([v]) => setEllipseXRadius(v)} min={0} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <Label>Y Radius: {ellipseYRadius}%</Label>
                  <Slider value={[ellipseYRadius]} onValueChange={([v]) => setEllipseYRadius(v)} min={0} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <Label>Center X: {circleX}%</Label>
                  <Slider value={[circleX]} onValueChange={([v]) => setCircleX(v)} min={0} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <Label>Center Y: {circleY}%</Label>
                  <Slider value={[circleY]} onValueChange={([v]) => setCircleY(v)} min={0} max={100} step={1} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {shapeType === "inset" && (
            <Card>
              <CardHeader>
                <CardTitle>Inset Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Top: {insetTop}%</Label>
                  <Slider value={[insetTop]} onValueChange={([v]) => setInsetTop(v)} min={0} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <Label>Right: {insetRight}%</Label>
                  <Slider value={[insetRight]} onValueChange={([v]) => setInsetRight(v)} min={0} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <Label>Bottom: {insetBottom}%</Label>
                  <Slider value={[insetBottom]} onValueChange={([v]) => setInsetBottom(v)} min={0} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <Label>Left: {insetLeft}%</Label>
                  <Slider value={[insetLeft]} onValueChange={([v]) => setInsetLeft(v)} min={0} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <Label>Border Radius: {insetRound}%</Label>
                  <Slider value={[insetRound]} onValueChange={([v]) => setInsetRound(v)} min={0} max={100} step={1} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div
                  className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600"
                  style={{ clipPath: clipPathCSS }}
                />
                {shapeType === "polygon" && (
                  <svg className="absolute inset-0 w-full h-full" onClick={handleCanvasClick} style={{ cursor: "crosshair" }}>
                    {points.map((point, i) => (
                      <g key={point.id}>
                        <circle cx={`${point.x}%`} cy={`${point.y}%`} r="8" fill="#fff" stroke="#333" strokeWidth="2" />
                        <text x={`${point.x}%`} y={`${point.y}%`} dy="-12" textAnchor="middle" fontSize="12" fill="#333" fontWeight="bold">
                          {i + 1}
                        </text>
                      </g>
                    ))}
                  </svg>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>clip-path Property</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">{clipPathCSS}</code>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(clipPathCSS, "Clip-path")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Complete Class Example</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">{`.clipped { clip-path: ${clipPathCSS}; }`}</code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`.clipped { clip-path: ${clipPathCSS}; }`, "Complete CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(clipPathCSS, "Clip-path")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Clip-path CSS
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
                  setShapeType("polygon");
                  setPoints([
                    { id: "1", x: 50, y: 0 },
                    { id: "2", x: 100, y: 50 },
                    { id: "3", x: 50, y: 100 },
                    { id: "4", x: 0, y: 50 },
                  ]);
                }}
              >
                Diamond
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShapeType("polygon");
                  setPoints([
                    { id: "1", x: 50, y: 0 },
                    { id: "2", x: 100, y: 25 },
                    { id: "3", x: 100, y: 75 },
                    { id: "4", x: 50, y: 100 },
                    { id: "5", x: 0, y: 75 },
                    { id: "6", x: 0, y: 25 },
                  ]);
                }}
              >
                Hexagon
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShapeType("circle");
                  setCircleRadius(50);
                  setCircleX(50);
                  setCircleY(50);
                }}
              >
                Circle
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShapeType("inset");
                  setInsetTop(10);
                  setInsetRight(10);
                  setInsetBottom(10);
                  setInsetLeft(10);
                  setInsetRound(20);
                }}
              >
                Rounded Frame
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Clip-Path Does</h2>
          <p className="text-muted-foreground mb-4">
            Clip-path cuts elements into shapes. Instead of rectangular divs, you can create triangles,
            polygons, circles, or any custom shape. The clipped area becomes transparent.
          </p>
          <p className="text-muted-foreground">
            This maker lets you drag points to create custom polygons, then copies the CSS.
            No need to manually calculate coordinates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Clip-Path Shapes</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Circle</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">clip-path: circle(50% at 50% 50%);</code>
                <p className="text-sm text-muted-foreground">Perfect circle centered in the element.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Ellipse</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">clip-path: ellipse(50% 30% at 50% 50%);</code>
                <p className="text-sm text-muted-foreground">Oval shape - first value is horizontal radius, second is vertical.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Polygon (Triangle)</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">clip-path: polygon(50% 0%, 0% 100%, 100% 100%);</code>
                <p className="text-sm text-muted-foreground">Upward-pointing triangle.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Polygon (Arrow)</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">clip-path: polygon(0% 0%, 100% 50%, 0% 100%, 30% 50%);</code>
                <p className="text-sm text-muted-foreground">Right-pointing arrow shape.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Browser Support</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Clip-path has good support in modern browsers (Chrome, Firefox, Safari, Edge).
                Internet Explorer doesn't support it - use SVG clips as a fallback if you need
                legacy support.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
