"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, Play, Square } from "lucide-react";

export default function CubicBezierEditorPage() {
  const [p1x, setP1x] = useState(0.25);
  const [p1y, setP1y] = useState(0.1);
  const [p2x, setP2x] = useState(0.25);
  const [p2y, setP2y] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const cubicBezier = `cubic-bezier(${p1x}, ${p1y}, ${p2x}, ${p2y})`;

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const presets = [
    { name: "Ease", values: [0.25, 0.1, 0.25, 1] },
    { name: "Ease In", values: [0.42, 0, 1, 1] },
    { name: "Ease Out", values: [0, 0, 0.58, 1] },
    { name: "Ease In Out", values: [0.42, 0, 0.58, 1] },
    { name: "Bounce", values: [0.68, -0.55, 0.265, 1.55] },
    { name: "Snap", values: [0.54, 0.03, 0.12, 1.32] },
    { name: "Smooth", values: [0.29, 0.12, 0.19, 1] },
    { name: "Fast Out", values: [0.21, 0, 0, 1] },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setP1x(preset.values[0]);
    setP1y(preset.values[1]);
    setP2x(preset.values[2]);
    setP2y(preset.values[3]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Cubic Bezier Editor</h1>
        <p className="text-muted-foreground">
          Visually create custom cubic-bezier easing functions for smooth CSS animations.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Control Points</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>P1 X: {p1x.toFixed(2)}</Label>
                <Slider
                  value={[p1x]}
                  onValueChange={([v]) => setP1x(v)}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
              <div>
                <Label>P1 Y: {p1y.toFixed(2)}</Label>
                <Slider
                  value={[p1y]}
                  onValueChange={([v]) => setP1y(v)}
                  min={-0.5}
                  max={1.5}
                  step={0.01}
                />
              </div>
              <div>
                <Label>P2 X: {p2x.toFixed(2)}</Label>
                <Slider
                  value={[p2x]}
                  onValueChange={([v]) => setP2x(v)}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
              <div>
                <Label>P2 Y: {p2y.toFixed(2)}</Label>
                <Slider
                  value={[p2y]}
                  onValueChange={([v]) => setP2y(v)}
                  min={-0.5}
                  max={1.5}
                  step={0.01}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  value={p1x}
                  onChange={(e) => setP1x(parseFloat(e.target.value) || 0)}
                  step={0.01}
                  placeholder="P1 X"
                />
                <Input
                  type="number"
                  value={p1y}
                  onChange={(e) => setP1y(parseFloat(e.target.value) || 0)}
                  step={0.01}
                  placeholder="P1 Y"
                />
                <Input
                  type="number"
                  value={p2x}
                  onChange={(e) => setP2x(parseFloat(e.target.value) || 0)}
                  step={0.01}
                  placeholder="P2 X"
                />
                <Input
                  type="number"
                  value={p2y}
                  onChange={(e) => setP2y(parseFloat(e.target.value) || 0)}
                  step={0.01}
                  placeholder="P2 Y"
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
              <CardTitle>Bezier Curve</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Grid */}
                  <line x1="0" y1="100" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
                  <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
                  <line x1="100" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
                  <line x1="0" y1="0" x2="0" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />
                  
                  {/* Control lines */}
                  <line
                    x1="0"
                    y1="100"
                    x2={p1x * 100}
                    y2={100 - p1y * 100}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="2"
                    className="text-muted-foreground"
                  />
                  <line
                    x1="100"
                    y1="0"
                    x2={p2x * 100}
                    y2={100 - p2y * 100}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="2"
                    className="text-muted-foreground"
                  />
                  
                  {/* Bezier curve */}
                  <path
                    d={`M 0 100 C ${p1x * 100} ${100 - p1y * 100}, ${p2x * 100} ${100 - p2y * 100}, 100 0`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  />
                  
                  {/* Control points */}
                  <circle cx={p1x * 100} cy={100 - p1y * 100} r="3" fill="currentColor" className="text-blue-500" />
                  <circle cx={p2x * 100} cy={100 - p2y * 100} r="3" fill="currentColor" className="text-green-500" />
                  
                  {/* Labels */}
                  <text x={p1x * 100 + 3} y={100 - p1y * 100 - 3} fontSize="4" className="fill-blue-500">P1</text>
                  <text x={p2x * 100 + 3} y={100 - p2y * 100 - 3} fontSize="4" className="fill-green-500">P2</text>
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Animation Preview</CardTitle>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-muted rounded-lg flex items-center p-4">
                <div
                  className={`w-12 h-12 bg-primary rounded-lg ${isPlaying ? "animate-custom-bezier" : ""}`}
                  style={{
                    animation: isPlaying ? `slide 2s ${cubicBezier} infinite` : "none",
                  }}
                />
              </div>
              <style>{`
                @keyframes slide {
                  0% { transform: translateX(0); }
                  50% { transform: translateX(calc(100% - 3rem)); }
                  100% { transform: translateX(0); }
                }
              `}</style>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                  {cubicBezier}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(cubicBezier, "Cubic Bezier")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <Label>Usage Example</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                    {`transition: all 0.3s ${cubicBezier};`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`transition: all 0.3s ${cubicBezier};`, "CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={() => copyToClipboard(cubicBezier, "Cubic Bezier")}>
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
          <h2 className="text-2xl font-semibold mb-4">What Is Cubic Bezier?</h2>
          <p className="text-muted-foreground mb-4">
            Cubic bezier curves define custom easing functions for CSS transitions and animations. 
            Instead of linear or ease, you create your own acceleration curve.
          </p>
          <p className="text-muted-foreground">
            The curve has four values: two control points that shape the curve. This editor lets 
            you drag the points and see the result in real-time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding the Values</h2>
          <Card>
            <CardContent className="pt-6">
              <code className="block p-4 bg-muted rounded-lg text-sm font-mono mb-4">
                cubic-bezier(x1, y1, x2, y2)
              </code>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <span className="font-mono bg-muted px-2 rounded">x1, x2</span>
                  <span>Control point horizontal positions. Usually stay between 0 and 1.</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono bg-muted px-2 rounded">y1, y2</span>
                  <span>Control point vertical positions. Can go outside 0-1 for bounce effects.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Easing Functions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Ease (default)</h3>
                <code className="block p-2 bg-muted rounded text-sm font-mono mb-2">cubic-bezier(0.25, 0.1, 0.25, 1)</code>
                <p className="text-sm text-muted-foreground">Starts slow, speeds up, slows down at the end.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Ease-in-out</h3>
                <code className="block p-2 bg-muted rounded text-sm font-mono mb-2">cubic-bezier(0.42, 0, 0.58, 1)</code>
                <p className="text-sm text-muted-foreground">Symmetric slow start and end. Smooth and professional.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Ease-out</h3>
                <code className="block p-2 bg-muted rounded text-sm font-mono mb-2">cubic-bezier(0, 0, 0.58, 1)</code>
                <p className="text-sm text-muted-foreground">Starts fast, slows down at the end. Good for entering elements.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Custom bounce</h3>
                <code className="block p-2 bg-muted rounded text-sm font-mono mb-2">cubic-bezier(0.68, -0.55, 0.265, 1.55)</code>
                <p className="text-sm text-muted-foreground">Overshoots and bounces back. Playful but use sparingly.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tips</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Keep x values between 0-1:</strong> Outside values can cause the animation to go backwards</li>
                <li><strong>Use y values for character:</strong> Negative y1 creates delay, y2 over 1 creates overshoot</li>
                <li><strong>Test with UI elements:</strong> What looks good on a graph might feel wrong in motion</li>
                <li><strong>Match your brand:</strong> Snappy curves for energetic brands, smooth curves for professional</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
