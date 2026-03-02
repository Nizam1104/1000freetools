"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function CssLoaderGeneratorPage() {
  const [loaderType, setLoaderType] = useState<"spinner" | "dots" | "bars" | "pulse">("spinner");
  const [size, setSize] = useState(40);
  const [color, setColor] = useState("#6366f1");
  const [speed, setSpeed] = useState(1);
  const [borderWidth, setBorderWidth] = useState(3);

  const generateLoaderCSS = () => {
    switch (loaderType) {
      case "spinner":
        return `.loader {
  width: ${size}px;
  height: ${size}px;
  border: ${borderWidth}px solid ${color}33;
  border-top-color: ${color};
  border-radius: 50%;
  animation: spin ${speed}s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}`;
      case "dots":
        return `.loader {
  display: flex;
  gap: ${size / 8}px;
}

.loader::before,
.loader::after {
  content: "";
  width: ${size / 3}px;
  height: ${size / 3}px;
  background: ${color};
  border-radius: 50%;
  animation: bounce ${speed}s ease-in-out infinite;
}

.loader::after {
  animation-delay: ${speed / 3}s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-${size / 2}px); }
}`;
      case "bars":
        return `.loader {
  display: flex;
  gap: ${size / 10}px;
  align-items: center;
}

.loader span {
  width: ${size / 6}px;
  height: ${size}px;
  background: ${color};
  animation: stretch ${speed}s ease-in-out infinite;
}

.loader span:nth-child(2) { animation-delay: ${speed / 5}s; }
.loader span:nth-child(3) { animation-delay: ${speed * 2 / 5}s; }
.loader span:nth-child(4) { animation-delay: ${speed * 3 / 5}s; }
.loader span:nth-child(5) { animation-delay: ${speed * 4 / 5}s; }

@keyframes stretch {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1); }
}`;
      case "pulse":
        return `.loader {
  width: ${size}px;
  height: ${size}px;
  background: ${color};
  border-radius: 50%;
  animation: pulse ${speed}s ease-out infinite;
}

@keyframes pulse {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}`;
      default:
        return "";
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const loaderCSS = generateLoaderCSS();

  const renderLoader = () => {
    switch (loaderType) {
      case "spinner":
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              borderWidth: borderWidth,
              borderStyle: "solid",
              borderColor: `${color}33`,
              borderTopColor: color,
              animation: `spin ${speed}s linear infinite`,
            }}
          />
        );
      case "dots":
        return (
          <div className="flex" style={{ gap: size / 8 }}>
            <div
              className="rounded-full animate-bounce"
              style={{
                width: size / 3,
                height: size / 3,
                background: color,
                animation: `bounce ${speed}s ease-in-out infinite`,
              }}
            />
            <div
              className="rounded-full"
              style={{
                width: size / 3,
                height: size / 3,
                background: color,
                animation: `bounce ${speed}s ease-in-out infinite`,
                animationDelay: `${speed / 3}s`,
              }}
            />
          </div>
        );
      case "bars":
        return (
          <div className="flex items-center" style={{ gap: size / 10 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: size / 6,
                  height: size,
                  background: color,
                  animation: `stretch ${speed}s ease-in-out infinite`,
                  animationDelay: `${(speed / 5) * i}s`,
                }}
              />
            ))}
          </div>
        );
      case "pulse":
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              background: color,
              animation: `pulse ${speed}s ease-out infinite`,
            }}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Loader Generator</h1>
        <p className="text-muted-foreground">
          Generate pure CSS loading animations - spinners, dots, bars, and more.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loader Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Loader Type</Label>
                <Select value={loaderType} onValueChange={(v) => setLoaderType(v as typeof loaderType)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spinner">Spinner</SelectItem>
                    <SelectItem value="dots">Bouncing Dots</SelectItem>
                    <SelectItem value="bars">Stretching Bars</SelectItem>
                    <SelectItem value="pulse">Pulse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Size: {size}px</Label>
                <Slider
                  value={[size]}
                  onValueChange={([v]) => setSize(v)}
                  min={20}
                  max={100}
                  step={5}
                />
              </div>

              <div>
                <Label>Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>

              <div>
                <Label>Speed: {speed}s</Label>
                <Slider
                  value={[speed]}
                  onValueChange={([v]) => setSpeed(v)}
                  min={0.3}
                  max={3}
                  step={0.1}
                />
              </div>

              {loaderType === "spinner" && (
                <div>
                  <Label>Border Width: {borderWidth}px</Label>
                  <Slider
                    value={[borderWidth]}
                    onValueChange={([v]) => setBorderWidth(v)}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>
              )}
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
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                {renderLoader()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap">
                  {loaderCSS}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(loaderCSS, "Loader CSS")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <Button className="w-full" onClick={() => copyToClipboard(loaderCSS, "CSS Loader")}>
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
          <h2 className="text-2xl font-semibold mb-4">CSS Loaders Without Images</h2>
          <p className="text-muted-foreground mb-4">
            CSS loaders are pure CSS animations that show while content loads. No GIFs, no SVGs, 
            no JavaScript libraries - just CSS keyframes and transforms.
          </p>
          <p className="text-muted-foreground">
            This generator creates common loader patterns: spinners, dots, bars, and pulses. 
            Customize the colors and speed, then copy the CSS.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Loader Types</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-lg">Spinner</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Classic rotating circle. Uses border with one side transparent, spinning with 
                keyframes. Works everywhere.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Dots</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Three bouncing dots. Each dot animates with a delay for the wave effect. 
                Common for "loading..." states.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Bars</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Vertical bars that scale up and down. Stagger the animation delay for 
                the wave effect.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Pulse</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Expanding and fading circles. Creates a subtle "breathing" effect. Good 
                for background loading states.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Keep it subtle:</strong> Loaders should indicate activity, not distract from content</li>
                <li><strong>Match your brand:</strong> Use your brand colors, not default blue</li>
                <li><strong>Consider size:</strong> 24-48px works for most contexts. Larger for full-page loaders</li>
                <li><strong>Don't over-animate:</strong> One loader per page is enough. Multiple spinning things feel chaotic</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
