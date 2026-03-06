"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const relatedTools = [
  { name: "Color Palette Generator", href: "/color-palette-generator" },
  { name: "Palette Export Tool", href: "/palette-export-tool" },
  { name: "CSS Variables Generator", href: "/css-variables-generator" },
  { name: "Color Picker", href: "/color-picker" },
];
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Copy, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export default function CSSGradientGeneratorPage() {
  const [gradientType, setGradientType] = useState<"linear" | "radial">(
    "linear",
  );
  const [angle, setAngle] = useState(90);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: "1", color: "#6366f1", position: 0 },
    { id: "2", color: "#a855f7", position: 100 },
  ]);
  const [radialShape, setRadialShape] = useState("circle");
  const [radialPosition, setRadialPosition] = useState("center");

  const generateGradient = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ");

    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${stopsString})`;
    } else {
      return `radial-gradient(${radialShape} at ${radialPosition}, ${stopsString})`;
    }
  };

  const cssCode = generateGradient();

  const addColorStop = () => {
    const newPosition =
      colorStops.length > 0
        ? Math.min(
            100,
            Math.max(0, colorStops[colorStops.length - 1].position + 10),
          )
        : 50;
    const newStop: ColorStop = {
      id: Date.now().toString(),
      color: "#000000",
      position: newPosition,
    };
    setColorStops([...colorStops, newStop]);
  };

  const removeColorStop = (id: string) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((s) => s.id !== id));
    } else {
      toast.error("Minimum 2 color stops required");
    }
  };

  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    setColorStops(
      colorStops.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  };

  const moveStop = (id: string, direction: "up" | "down") => {
    const index = colorStops.findIndex((s) => s.id === id);
    if (index === -1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= colorStops.length) return;

    const newStops = [...colorStops];
    [newStops[index], newStops[newIndex]] = [
      newStops[newIndex],
      newStops[index],
    ];
    setColorStops(newStops);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      toast.success("CSS copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const copyPreview = async () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const gradient = ctx.createLinearGradient(0, 0, 800, 0);
      const sortedStops = [...colorStops].sort(
        (a, b) => a.position - b.position,
      );
      sortedStops.forEach((stop) => {
        gradient.addColorStop(stop.position / 100, stop.color);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 600);

      canvas.toBlob((blob) => {
        if (blob) {
          navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          toast.success("Preview image copied to clipboard!");
        }
      });
    } catch {
      toast.error("Failed to copy preview");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            CSS Gradient Generator
          </h1>
          <p className="text-muted-foreground">
            Create beautiful linear and radial CSS gradients with a live preview
            and export clean, ready-to-use CSS code. No design skills required.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Preview */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-muted-foreground">
                  Preview
                </Label>
                <Button variant="outline" size="sm" onClick={copyPreview}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Preview
                </Button>
              </div>
              <div
                className="w-full aspect-video rounded-lg border "
                style={{ background: cssCode }}
              />
            </CardContent>
          </Card>

          {/* CSS Output */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-muted-foreground">
                  CSS Code
                </Label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto whitespace-pre-wrap break-all">
                  {cssCode}
                </pre>
              </div>
              <div className="pt-2">
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Background Preview
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {["Text", "Button", "Card", "Border"].map((item) => (
                    <div key={item} className="space-y-1">
                      <div
                        className="h-12 rounded-md flex items-center justify-center text-sm font-medium"
                        style={{ background: cssCode }}
                      >
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              {/* Gradient Type */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Gradient Type</Label>
                  <Select
                    value={gradientType}
                    onValueChange={(v) =>
                      setGradientType(v as "linear" | "radial")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linear">Linear</SelectItem>
                      <SelectItem value="radial">Radial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {gradientType === "linear" ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Angle</Label>
                      <span className="text-sm font-mono text-muted-foreground">
                        {angle}°
                      </span>
                    </div>
                    <Slider
                      value={[angle]}
                      min={0}
                      max={360}
                      step={15}
                      onValueChange={([v]) => setAngle(v)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0°</span>
                      <span>90°</span>
                      <span>180°</span>
                      <span>270°</span>
                      <span>360°</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Shape</Label>
                      <Select
                        value={radialShape}
                        onValueChange={setRadialShape}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="circle">Circle</SelectItem>
                          <SelectItem value="ellipse">Ellipse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Select
                        value={radialPosition}
                        onValueChange={setRadialPosition}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="top left">Top Left</SelectItem>
                          <SelectItem value="top center">Top Center</SelectItem>
                          <SelectItem value="top right">Top Right</SelectItem>
                          <SelectItem value="center left">
                            Center Left
                          </SelectItem>
                          <SelectItem value="center right">
                            Center Right
                          </SelectItem>
                          <SelectItem value="bottom left">
                            Bottom Left
                          </SelectItem>
                          <SelectItem value="bottom center">
                            Bottom Center
                          </SelectItem>
                          <SelectItem value="bottom right">
                            Bottom Right
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>

              {/* Color Stops */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Color Stops</Label>
                  <Button variant="outline" size="sm" onClick={addColorStop}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stop
                  </Button>
                </div>

                <div className="space-y-3">
                  {colorStops.map((stop, index) => (
                    <div
                      key={stop.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => moveStop(stop.id, "up")}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => moveStop(stop.id, "down")}
                          disabled={index === colorStops.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="relative w-12 h-10 rounded border overflow-hidden ">
                        <input
                          type="color"
                          value={stop.color}
                          onChange={(e) =>
                            updateColorStop(stop.id, { color: e.target.value })
                          }
                          className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer border-0 p-0"
                        />
                      </div>

                      <Input
                        type="text"
                        value={stop.color}
                        onChange={(e) =>
                          updateColorStop(stop.id, { color: e.target.value })
                        }
                        className="w-24 font-mono text-sm"
                        maxLength={7}
                      />

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-muted-foreground">
                            Position
                          </Label>
                          <span className="text-xs font-mono">
                            {stop.position}%
                          </span>
                        </div>
                        <Slider
                          value={[stop.position]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={([v]) =>
                            updateColorStop(stop.id, { position: v })
                          }
                        />
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeColorStop(stop.id)}
                        disabled={colorStops.length <= 2}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Tools & SEO Content */}
        <section className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              Related Color Tools
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {tool.href.replace(/^\//, "")}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              About the CSS Gradient Generator
            </h2>
            <p className="text-muted-foreground">
              The CSS Gradient Generator helps you create beautiful linear and radial gradients with full control over direction, color stops, and positioning. Add multiple color stops, adjust their positions, and preview your gradient in real-time.
            </p>
            <p className="text-muted-foreground">
              Export clean, production-ready CSS code that works across all modern browsers. Perfect for backgrounds, buttons, cards, and any element that needs a gradient touch. Copy the CSS directly or download as a file for later use.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
