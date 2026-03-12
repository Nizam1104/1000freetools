"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function AspectRatioCalculatorPage() {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyRatio = (w: number, h: number) => {
    const divisor = gcd(w, h);
    return {
      width: w / divisor,
      height: h / divisor,
    };
  };

  const ratio = simplifyRatio(width, height);
  const aspectRatio = (width / height).toFixed(4);
  const percentage = ((height / width) * 100).toFixed(2);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const commonAspectRatios = [
    { name: "16:9", w: 16, h: 9, description: "Widescreen, YouTube, most videos" },
    { name: "4:3", w: 4, h: 3, description: "Classic TV, iPad, old monitors" },
    { name: "3:2", w: 3, h: 2, description: "35mm camera, some laptops" },
    { name: "1:1", w: 1, h: 1, description: "Square, Instagram posts" },
    { name: "21:9", w: 21, h: 9, description: "Ultrawide monitors" },
    { name: "9:16", w: 9, h: 16, description: "Vertical video, Stories" },
    { name: "2:3", w: 2, h: 3, description: "Portrait photos, Pinterest" },
    { name: "4:5", w: 4, h: 5, description: "Instagram portrait" },
  ];

  const applyRatio = (w: number, h: number) => {
    const scale = Math.min(1920 / w, 1080 / h);
    setWidth(Math.round(w * scale));
    setHeight(Math.round(h * scale));
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Aspect Ratio Calculator</h1>
        <p className="text-muted-foreground">
          Calculate aspect ratios, find equivalent dimensions, and generate CSS snippets.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dimensions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Width</Label>
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Height</Label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Aspect Ratios</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {commonAspectRatios.map((ratio) => (
                <Button
                  key={ratio.name}
                  variant="outline"
                  onClick={() => applyRatio(ratio.w, ratio.h)}
                  className="text-left h-auto py-2"
                >
                  <div>
                    <div className="font-semibold">{ratio.name}</div>
                    <div className="text-xs text-muted-foreground">{ratio.description}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Simplified Ratio</p>
                  <p className="text-3xl font-bold">{ratio.width}:{ratio.height}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Ratio Value</p>
                  <p className="text-3xl font-bold">{aspectRatio}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Padding-Bottom %</p>
                  <p className="text-3xl font-bold">{percentage}%</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Format</p>
                  <p className="text-3xl font-bold">{ratio.width}:{ratio.height}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSS Snippets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>aspect-ratio Property</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                    aspect-ratio: {ratio.width} / {ratio.height};
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`aspect-ratio: ${ratio.width} / ${ratio.height};`, "CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Padding-Bottom Hack</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap">
                    {`.container {
  position: relative;
  padding-bottom: ${percentage}%;
  height: 0;
}
.container > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(
                      `.container {\n  position: relative;\n  padding-bottom: ${percentage}%;\n  height: 0;\n}`,
                      "CSS"
                    )}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Tailwind Class</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                    aspect-{ratio.width}/{ratio.height}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`aspect-${ratio.width}/${ratio.height}`, "Tailwind")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visual Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div
                  className="bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold"
                  style={{
                    width: "100%",
                    maxWidth: 400,
                    aspectRatio: `${ratio.width} / ${ratio.height}`,
                  }}
                >
                  {width} × {height}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What Aspect Ratio Is</h2>
          <p className="text-muted-foreground mb-4">
            Aspect ratio is the proportional relationship between width and height.
            It's expressed as two numbers separated by a colon (16:9, 4:3, 1:1).
          </p>
          <p className="text-muted-foreground">
            In CSS, aspect ratio ensures elements maintain their proportions regardless of screen size.
            This is crucial for responsive images, videos, and containers that need to scale uniformly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Aspect Ratios</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader><CardTitle className="text-lg">16:9 (Widescreen)</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Standard for videos, YouTube, modern displays. Most common ratio for web content.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">4:3 (Standard)</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Old TV format, iPad, some monitors. Still common for presentations and documents.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">1:1 (Square)</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Instagram posts, profile pictures, product thumbnails. Perfect for grid layouts.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">21:9 (Ultrawide)</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Cinematic format, ultrawide monitors. Great for immersive hero sections.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">3:2 (Photo)</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Classic photo format, Micro Four Thirds cameras. Common in photography portfolios.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">9:16 (Vertical)</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Stories format (Instagram, TikTok, Snapchat). Mobile-first vertical content.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">CSS Aspect Ratio</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                Modern CSS has a dedicated <code className="bg-muted px-1 rounded">aspect-ratio</code> property:
              </p>
              <code className="block p-4 bg-muted rounded-lg text-sm font-mono mb-4">
                {`.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
}`}
              </code>
              <p className="text-sm text-muted-foreground">
                The old padding hack (using padding-top percentage) still works if you need older
                browser support, but the native property is cleaner and easier to maintain.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
