"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, Sun, Moon } from "lucide-react";

export default function NeumorphismGeneratorPage() {
  const [baseColor, setBaseColor] = useState("#e0e5ec");
  const [size, setSize] = useState(20);
  const [distance, setDistance] = useState(20);
  const [blur, setBlur] = useState(40);
  const [intensity, setIntensity] = useState(0.15);
  const [shape, setShape] = useState<"flat" | "concave" | "convex" | "pressed">("convex");

  const generateNeumorphismCSS = () => {
    const lightColor = adjustColor(baseColor, Math.round(100 * intensity));
    const darkColor = adjustColor(baseColor, Math.round(-100 * intensity));
    
    const shadow1 = `${-distance}px ${-distance}px ${blur}px ${lightColor}`;
    const shadow2 = `${distance}px ${distance}px ${blur}px ${darkColor}`;
    
    if (shape === "pressed") {
      return `box-shadow: inset ${-distance}px ${-distance}px ${blur}px ${lightColor}, inset ${distance}px ${distance}px ${blur}px ${darkColor};`;
    }
    
    return `box-shadow: ${shadow1}, ${shadow2};`;
  };

  const generateBackgroundCSS = () => {
    return `background-color: ${baseColor};`;
  };

  // Helper function to adjust color brightness
  function adjustColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
    return `rgb(${R}, ${G}, ${B})`;
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const boxShadowCSS = generateNeumorphismCSS();
  const backgroundCSS = generateBackgroundCSS();

  const getShapeStyles = () => {
    const base = {
      backgroundColor: baseColor,
      width: "150px",
      height: "150px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
    };

    if (shape === "convex") {
      return {
        ...base,
        borderRadius: "20px",
        boxShadow: generateNeumorphismCSS().replace("box-shadow: ", "").replace(";", ""),
      };
    } else if (shape === "pressed") {
      return {
        ...base,
        borderRadius: "20px",
        boxShadow: generateNeumorphismCSS().replace("box-shadow: ", "").replace(";", ""),
      };
    } else if (shape === "concave") {
      return {
        ...base,
        borderRadius: "50%",
        boxShadow: generateNeumorphismCSS().replace("box-shadow: ", "").replace(";", ""),
      };
    }
    return {
      ...base,
      borderRadius: "0",
      boxShadow: generateNeumorphismCSS().replace("box-shadow: ", "").replace(";", ""),
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Neumorphism Generator</h1>
        <p className="text-muted-foreground">
          Create soft UI neumorphic shadows and effects. Generate subtle, extruded shapes with light and shadow.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Base Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Base Color</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-32 font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setBaseColor("#e0e5ec")}
                    title="Reset to default"
                  >
                    <Sun className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setBaseColor("#2d3748")}
                    title="Dark mode"
                  >
                    <Moon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Shape Type</Label>
                <Tabs value={shape} onValueChange={(v) => setShape(v as typeof shape)} className="mt-2">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="convex">Convex</TabsTrigger>
                    <TabsTrigger value="pressed">Pressed</TabsTrigger>
                    <TabsTrigger value="concave">Concave</TabsTrigger>
                    <TabsTrigger value="flat">Flat</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shadow Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Size: {size}px</Label>
                <Slider value={[size]} onValueChange={([v]) => setSize(v)} min={5} max={50} step={1} className="mt-2" />
              </div>
              <div>
                <Label>Distance: {distance}px</Label>
                <Slider value={[distance]} onValueChange={([v]) => setDistance(v)} min={5} max={50} step={1} className="mt-2" />
              </div>
              <div>
                <Label>Blur: {blur}px</Label>
                <Slider value={[blur]} onValueChange={([v]) => setBlur(v)} min={0} max={100} step={1} className="mt-2" />
              </div>
              <div>
                <Label>Intensity: {(intensity * 100).toFixed(0)}%</Label>
                <Slider value={[intensity]} onValueChange={([v]) => setIntensity(v)} min={0.05} max={0.5} step={0.01} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shape Presets</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShape("convex");
                  setDistance(20);
                  setBlur(40);
                  setIntensity(0.15);
                }}
              >
                Soft Button
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShape("pressed");
                  setDistance(10);
                  setBlur(30);
                  setIntensity(0.1);
                }}
              >
                Pressed In
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShape("concave");
                  setDistance(15);
                  setBlur(35);
                  setIntensity(0.12);
                }}
              >
                Circular Well
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShape("flat");
                  setDistance(25);
                  setBlur(50);
                  setIntensity(0.2);
                }}
              >
                Strong Shadow
              </Button>
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
                className="flex items-center justify-center p-12 rounded-xl"
                style={{ backgroundColor: baseColor }}
              >
                <div style={getShapeStyles()}>
                  <span className="text-sm font-medium" style={{ color: baseColor === "#2d3748" ? "#fff" : "#333" }}>
                    {shape}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="flex items-center justify-center p-12 rounded-xl gap-6"
                style={{ backgroundColor: baseColor }}
              >
                <button
                  className="px-6 py-3 font-medium cursor-pointer border-none outline-none"
                  style={{
                    backgroundColor: baseColor,
                    borderRadius: "10px",
                    color: baseColor === "#2d3748" ? "#fff" : "#333",
                    boxShadow: `${-10}px ${-10}px ${20}px ${adjustColor(baseColor, Math.round(100 * intensity))}, ${10}px ${10}px ${20}px ${adjustColor(baseColor, Math.round(-100 * intensity))}`,
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.boxShadow = `inset ${-10}px ${-10}px ${20}px ${adjustColor(baseColor, Math.round(100 * intensity))}, inset ${10}px ${10}px ${20}px ${adjustColor(baseColor, Math.round(-100 * intensity))}`;
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.boxShadow = `${-10}px ${-10}px ${20}px ${adjustColor(baseColor, Math.round(100 * intensity))}, ${10}px ${10}px ${20}px ${adjustColor(baseColor, Math.round(-100 * intensity))}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `${-10}px ${-10}px ${20}px ${adjustColor(baseColor, Math.round(100 * intensity))}, ${10}px ${10}px ${20}px ${adjustColor(baseColor, Math.round(-100 * intensity))}`;
                  }}
                >
                  Click Me
                </button>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: baseColor,
                    boxShadow: `inset ${-10}px ${-10}px ${20}px ${adjustColor(baseColor, Math.round(100 * intensity))}, inset ${10}px ${10}px ${20}px ${adjustColor(baseColor, Math.round(-100 * intensity))}`,
                    color: baseColor === "#2d3748" ? "#fff" : "#333",
                  }}
                >
                  ●
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Background</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">{backgroundCSS}</code>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(backgroundCSS, "Background CSS")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Box Shadow</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">{boxShadowCSS}</code>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(boxShadowCSS, "Box Shadow CSS")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Complete Class</Label>
                <div className="flex gap-2 mt-2">
                  <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono break-all">
                    {`.neumorphic {
  ${backgroundCSS}
  ${boxShadowCSS}
}`}
                  </pre>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`.neumorphic {\n  ${backgroundCSS}\n  ${boxShadowCSS}\n}`, "Complete CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(`.neumorphic {\n  ${backgroundCSS}\n  ${boxShadowCSS}\n}`, "Neumorphism CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Complete CSS
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Neumorphism</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Neumorphism (or soft UI) is a design trend that creates the illusion of extruded shapes through 
              carefully placed light and dark shadows. Elements appear to be pushed out from or pressed into 
              the background.
            </p>
            <p>
              The key to neumorphism is using two shadows: a light shadow on the top-left and a dark shadow 
              on the bottom-right. This mimics how light would interact with a physically extruded surface.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Neumorphism Best Practices</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Color Choice</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Use low-saturation colors for the best effect. Gray-blue tones like #e0e5ec work beautifully. 
                Avoid highly saturated colors.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accessibility</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Neumorphism can have contrast issues. Ensure interactive elements have clear visual indicators 
                and consider adding borders for focus states.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
