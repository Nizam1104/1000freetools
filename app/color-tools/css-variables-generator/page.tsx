"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Copy, Check, RotateCcw, Download } from "lucide-react";
import { toast } from "sonner";
import { hexToRgb } from "@/app/color-tools/lib/color-utils";
import CssVariablesGeneratorSEO from "@/components/seo-content/color-tools/CssVariablesGenerator";

export const relatedTools = [
  { name: "Palette Export Tool", href: "/color-tools/palette-export-tool", description: "Export colors in multiple formats" },
  { name: "Hex to RGB Converter", href: "/color-tools/hex-to-rgb-converter", description: "Convert HEX to RGB values" },
  { name: "Color Picker", href: "/color-tools/color-picker", description: "Pick and convert colors" },
  { name: "RGB to HSL Converter", href: "/color-tools/rgb-to-hsl-converter", description: "Convert RGB to HSL format" },
];

interface ColorVariable {
  id: string;
  name: string;
  color: string;
}

export default function CssVariablesGeneratorPage() {
  const [colors, setColors] = useState<ColorVariable[]>([
    { id: "1", name: "--color-primary", color: "#3B82F6" },
    { id: "2", name: "--color-secondary", color: "#8B5CF6" },
    { id: "3", name: "--color-accent", color: "#F59E0B" },
  ]);
  const [newColor, setNewColor] = useState("#10B981");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [prefix, setPrefix] = useState("--color");

  const addColor = useCallback(() => {
    const colorToAdd = newColor.startsWith("#") ? newColor : "#" + newColor;
    const rgb = hexToRgb(colorToAdd);
    if (!rgb) {
      toast.error("Invalid color value");
      return;
    }
    const name = `${prefix}-${Object.keys(colors).length + 1}`;
    setColors((prev) => [...prev, { id: Date.now().toString(), name, color: colorToAdd }]);
    setNewColor("#10B981");
  }, [newColor, prefix, colors]);

  const removeColor = useCallback((id: string) => {
    setColors((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateColor = useCallback((id: string, color: string) => {
    setColors((prev) => prev.map((c) => (c.id === id ? { ...c, color } : c)));
  }, []);

  const updateName = useCallback((id: string, name: string) => {
    setColors((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  }, []);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Copied!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const generateCSS = useCallback(() => {
    return `:root {\n${colors.map((c) => `  ${c.name}: ${c.color};`).join("\n")}\n}`;
  }, [colors]);

  const generateCSSWithRGB = useCallback(() => {
    const css = colors.map((c) => {
      const rgb = hexToRgb(c.color);
      const rgbString = rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : "0, 0, 0";
      return `  ${c.name}: ${c.color};\n  ${c.name}-rgb: ${rgbString};`;
    });
    return `:root {\n${css.join("\n")}\n}`;
  }, [colors]);

  const generateModernCSS = useCallback(() => {
    return `:root {\n${colors.map((c) => {
      const rgb = hexToRgb(c.color);
      const rgbString = rgb ? `${rgb.r} ${rgb.g} ${rgb.b}` : "0 0 0";
      return `  ${c.name}: ${c.color};\n  ${c.name}-rgb: ${rgbString};`;
    }).join("\n")}\n}`;
  }, [colors]);

  const downloadCSS = useCallback(() => {
    const css = generateCSS();
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "color-variables.css";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSS file downloaded!");
  }, [generateCSS]);

  const CopyButton = ({ text, id }: { text: string; id: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
      onClick={() => copyToClipboard(text, id)}
    >
      {copiedId === id ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">CSS Variables Generator</h1>
          <p className="text-muted-foreground">
            Convert your color palette into ready-to-use CSS custom properties. Generate a clean :root variable block for any design system or theme.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Color Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Variables</CardTitle>
                <CardDescription>Define your CSS color variables</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Variable Prefix</Label>
                  <Input
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="--color"
                    className="font-mono"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
                    <Input
                      value={newColor.replace("#", "")}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="pl-7 font-mono"
                      maxLength={6}
                      placeholder="000000"
                      onKeyDown={(e) => e.key === "Enter" && addColor()}
                    />
                  </div>
                  <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="h-10 w-14 rounded-md border cursor-pointer"
                  />
                  <Button onClick={addColor} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {colors.map((variable) => (
                    <div
                      key={variable.id}
                      className="flex items-center gap-2 p-2 rounded-lg border bg-card"
                    >
                      <div
                        className="w-10 h-10 rounded-md border flex-shrink-0"
                        style={{ backgroundColor: variable.color }}
                      />
                      <div className="relative flex-1">
                        <Input
                          value={variable.name}
                          onChange={(e) => updateName(variable.id, e.target.value)}
                          className="h-8 text-sm font-mono"
                          placeholder="--color-name"
                        />
                      </div>
                      <div className="relative w-24">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">#</span>
                        <Input
                          value={variable.color.replace("#", "")}
                          onChange={(e) =>
                            updateColor(variable.id, "#" + e.target.value)
                          }
                          className="pl-5 h-8 text-sm font-mono"
                          maxLength={6}
                        />
                      </div>
                      <input
                        type="color"
                        value={variable.color}
                        onChange={(e) => updateColor(variable.id, e.target.value)}
                        className="h-8 w-8 rounded border cursor-pointer"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeColor(variable.id)}
                        disabled={colors.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setColors([
                        { id: "1", name: "--color-primary", color: "#3B82F6" },
                        { id: "2", name: "--color-secondary", color: "#8B5CF6" },
                        { id: "3", name: "--color-accent", color: "#F59E0B" },
                      ])
                    }
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Color Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {colors.map((variable) => (
                    <div
                      key={variable.id}
                      className="rounded-lg p-3 text-center"
                      style={{ backgroundColor: variable.color }}
                    >
                      <div
                        className="text-xs font-medium truncate"
                        style={{
                          color:
                            hexToRgb(variable.color) &&
                              hexToRgb(variable.color)!.r * 0.299 +
                              hexToRgb(variable.color)!.g * 0.587 +
                              hexToRgb(variable.color)!.b * 0.114 >
                              150
                              ? "#000"
                              : "#fff",
                        }}
                      >
                        {variable.name.replace("--", "")}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CSS Output */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>CSS Output</span>
                  <Button variant="outline" size="sm" onClick={downloadCSS}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardTitle>
                <CardDescription>Copy or download your CSS variables</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic CSS */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Basic CSS Variables</Label>
                    <CopyButton text={generateCSS()} id="basic" />
                  </div>
                  <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                    {generateCSS()}
                  </pre>
                </div>

                {/* CSS with RGB */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">With RGB Fallbacks</Label>
                    <CopyButton text={generateCSSWithRGB()} id="rgb" />
                  </div>
                  <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                    {generateCSSWithRGB()}
                  </pre>
                </div>

                {/* Modern CSS */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Modern CSS (Space-separated RGB)</Label>
                    <CopyButton text={generateModernCSS()} id="modern" />
                  </div>
                  <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                    {generateModernCSS()}
                  </pre>
                </div>

                {/* Usage Example */}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Tools - Internal Linking */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Related Color Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <CssVariablesGeneratorSEO />
      </div>
    </div>
  );
}
