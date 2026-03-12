"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, Play } from "lucide-react";

const easingFunctions = {
  linear: "linear",
  ease: "ease",
  "ease-in": "ease-in",
  "ease-out": "ease-out",
  "ease-in-out": "ease-in-out",
  custom: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
};

export default function CssTransitionPreviewerPage() {
  const [transitionProperty, setTransitionProperty] = useState("all");
  const [duration, setDuration] = useState(300);
  const [easing, setEasing] = useState("ease-in-out");
  const [delay, setDelay] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [customBezier, setCustomBezier] = useState({ x1: 0.68, y1: -0.55, x2: 0.27, y2: 1.55 });

  const generateTransitionCSS = () => {
    const easingValue = easing === "custom"
      ? `cubic-bezier(${customBezier.x1}, ${customBezier.y1}, ${customBezier.x2}, ${customBezier.y2})`
      : easing;
    return `${transitionProperty} ${duration}ms ${easingValue} ${delay}ms`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const transitionCSS = generateTransitionCSS();

  const previewStyles = {
    transition: transitionCSS,
    transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
    backgroundColor: isHovered ? "#6366f1" : "#e0e7ff",
    color: isHovered ? "#fff" : "#333",
    borderRadius: isHovered ? "12px" : "8px",
    boxShadow: isHovered
      ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
      : "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  };

  const builtInEasings = [
    { name: "linear", description: "Constant speed", preview: "0% → 100% evenly" },
    { name: "ease", description: "Slow, fast, slow", preview: "Default easing" },
    { name: "ease-in", description: "Slow start", preview: "Accelerates" },
    { name: "ease-out", description: "Fast start", preview: "Decelerates" },
    { name: "ease-in-out", description: "Slow both ends", preview: "Accelerates then decelerates" },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Transition Previewer</h1>
        <p className="text-muted-foreground">
          Compare built-in and custom easing functions side-by-side. Preview and generate CSS transitions with perfect timing.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transition Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Property</Label>
                <Select value={transitionProperty} onValueChange={setTransitionProperty}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">all</SelectItem>
                    <SelectItem value="transform">transform</SelectItem>
                    <SelectItem value="opacity">opacity</SelectItem>
                    <SelectItem value="background-color">background-color</SelectItem>
                    <SelectItem value="color">color</SelectItem>
                    <SelectItem value="box-shadow">box-shadow</SelectItem>
                    <SelectItem value="border-radius">border-radius</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Duration: {duration}ms</Label>
                <Slider value={[duration]} onValueChange={([v]) => setDuration(v)} min={0} max={2000} step={50} className="mt-2" />
              </div>
              <div>
                <Label>Delay: {delay}ms</Label>
                <Slider value={[delay]} onValueChange={([v]) => setDelay(v)} min={0} max={1000} step={50} className="mt-2" />
              </div>
              <div>
                <Label>Easing Function</Label>
                <Tabs value={easing} onValueChange={setEasing} className="mt-2">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="ease-in-out">ease-in-out</TabsTrigger>
                    <TabsTrigger value="ease-out">ease-out</TabsTrigger>
                    <TabsTrigger value="ease-in">ease-in</TabsTrigger>
                    <TabsTrigger value="linear">linear</TabsTrigger>
                    <TabsTrigger value="ease">ease</TabsTrigger>
                    <TabsTrigger value="custom">Custom</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              {easing === "custom" && (
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <div>
                    <Label>X1: {customBezier.x1.toFixed(2)}</Label>
                    <Slider
                      value={[customBezier.x1]}
                      onValueChange={([v]) => setCustomBezier({ ...customBezier, x1: v })}
                      min={0}
                      max={1}
                      step={0.01}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Y1: {customBezier.y1.toFixed(2)}</Label>
                    <Slider
                      value={[customBezier.y1]}
                      onValueChange={([v]) => setCustomBezier({ ...customBezier, y1: v })}
                      min={-1}
                      max={2}
                      step={0.01}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>X2: {customBezier.x2.toFixed(2)}</Label>
                    <Slider
                      value={[customBezier.x2]}
                      onValueChange={([v]) => setCustomBezier({ ...customBezier, x2: v })}
                      min={0}
                      max={1}
                      step={0.01}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Y2: {customBezier.y2.toFixed(2)}</Label>
                    <Slider
                      value={[customBezier.y2]}
                      onValueChange={([v]) => setCustomBezier({ ...customBezier, y2: v })}
                      min={-1}
                      max={2}
                      step={0.01}
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Built-in Easing Functions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {builtInEasings.map((easing) => (
                <div key={easing.name} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <code className="text-sm font-mono bg-background px-2 py-1 rounded">{easing.name}</code>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{easing.description}</p>
                    <p className="text-xs text-muted-foreground">{easing.preview}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="w-48 h-48 mx-auto flex items-center justify-center cursor-pointer select-none"
                style={previewStyles}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="text-lg font-medium">Hover Me!</span>
              </div>
              <div className="text-center mt-4">
                <Button onClick={() => setIsHovered(!isHovered)}>
                  <Play className="w-4 h-4 mr-2" />
                  {isHovered ? "Reset" : "Animate"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timing Function Visualizer</CardTitle>
            </CardHeader>
            <CardContent>
              <svg viewBox="0 0 100 100" className="w-full h-48">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                <line x1="0" y1="100" x2="100" y2="100" stroke="#333" strokeWidth="1" />
                <line x1="0" y1="100" x2="0" y2="0" stroke="#333" strokeWidth="1" />

                {/* Linear */}
                <path d="M 0 100 L 100 0" stroke="#9ca3af" strokeWidth="1" strokeDasharray="2,2" fill="none" />

                {/* Current easing curve */}
                {easing === "custom" ? (
                  <path
                    d={`M 0 100 C ${customBezier.x1 * 100} ${100 - customBezier.y1 * 100}, ${customBezier.x2 * 100} ${100 - customBezier.y2 * 100}, 100 0`}
                    stroke="#6366f1"
                    strokeWidth="2"
                    fill="none"
                  />
                ) : (
                  <path
                    d={
                      easing === "ease-in"
                        ? "M 0 100 C 50 100, 50 0, 100 0"
                        : easing === "ease-out"
                          ? "M 0 100 C 50 100, 0 0, 100 0"
                          : easing === "ease-in-out"
                            ? "M 0 100 C 25 100, 75 0, 100 0"
                            : easing === "ease"
                              ? "M 0 100 C 25 100, 25 0, 100 0"
                              : "M 0 100 L 100 0"
                    }
                    stroke="#6366f1"
                    strokeWidth="2"
                    fill="none"
                  />
                )}

                <text x="50" y="115" textAnchor="middle" fontSize="8" fill="#666">Time</text>
                <text x="-10" y="50" textAnchor="middle" fontSize="8" fill="#666" transform="rotate(-90, -10, 50)">Progress</text>
              </svg>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                  {transitionCSS}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(transitionCSS, "Transition CSS")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
                  {`.element {
  transition: ${transitionCSS};
}`}
                </pre>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(`.element {\n  transition: ${transitionCSS};\n}`, "Complete CSS")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(transitionCSS, "Transition CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Transition CSS
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About CSS Transitions</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              CSS transitions allow you to smoothly interpolate between CSS property values over a specified duration.
              They're essential for creating polished, professional user interfaces with smooth hover effects,
              state changes, and animations.
            </p>
            <p>
              The <code>transition</code> shorthand property accepts four values: property, duration, timing function
              (easing), and delay. The timing function controls the rate of change during the transition.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Understanding Cubic Bezier</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                Cubic bezier curves define custom easing functions using four control points: P0(0,0), P1(x1,y1),
                P2(x2,y2), and P3(1,1). The first and last points are fixed, so you only control P1 and P2.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted rounded-lg">
                  <strong>Y values &gt; 1 or &lt; 0:</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create bounce or elastic effects that overshoot the target value
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <strong>Y values between 0 and 1:</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create smooth acceleration/deceleration without overshooting
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
