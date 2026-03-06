"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Copy, Check, Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { hexToRgb, hexToHsl } from "@/app/color-tools/lib/color-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaletteExportToolSEO from "@/components/seo-content/color-tools/PaletteExportTool";

export const relatedTools = [
  { name: "CSS Variables Generator", href: "/color-tools/css-variables-generator", description: "Generate CSS custom properties" },
  { name: "Extract Colors from Image", href: "/color-tools/extract-colors-from-image", description: "Get colors from images" },
  { name: "Color History Tool", href: "/color-tools/color-history-tool", description: "Track recently used colors" },
  { name: "Favorite Colors Manager", href: "/color-tools/favorite-colors-manager", description: "Save and organize colors" },
];

interface ColorSwatch {
  id: string;
  name: string;
  color: string;
}

export default function PaletteExportToolPage() {
  const [colors, setColors] = useState<ColorSwatch[]>([
    { id: "1", name: "Primary", color: "#3B82F6" },
    { id: "2", name: "Secondary", color: "#8B5CF6" },
    { id: "3", name: "Accent", color: "#F59E0B" },
    { id: "4", name: "Success", color: "#10B981" },
    { id: "5", name: "Danger", color: "#EF4444" },
  ]);
  const [newColor, setNewColor] = useState("#6366F1");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [paletteName, setPaletteName] = useState("My Palette");

  const addColor = useCallback(() => {
    const colorToAdd = newColor.startsWith("#") ? newColor : "#" + newColor;
    const rgb = hexToRgb(colorToAdd);
    if (!rgb) {
      toast.error("Invalid color value");
      return;
    }
    setColors((prev) => [...prev, { id: Date.now().toString(), name: `Color ${prev.length + 1}`, color: colorToAdd }]);
    setNewColor("#6366F1");
  }, [newColor]);

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
    return `:root {\n${colors.map((c) => `  --${c.name.toLowerCase().replace(/\s+/g, "-")}: ${c.color};`).join("\n")}\n}`;
  }, [colors]);

  const generateSCSS = useCallback(() => {
    return colors.map((c) => `$${c.name.toLowerCase().replace(/\s+/g, "-")}: ${c.color};`).join("\n");
  }, [colors]);

  const generateJSON = useCallback(() => {
    return JSON.stringify(
      colors.reduce((acc, c) => {
        acc[c.name.toLowerCase().replace(/\s+/g, "_")] = c.color;
        return acc;
      }, {} as Record<string, string>),
      null,
      2
    );
  }, [colors]);

  const generateTailwind = useCallback(() => {
    return `module.exports = {
  theme: {
    extend: {
      colors: {
${colors.map((c) => `        '${c.name.toLowerCase().replace(/\s+/g, "-")}': '${c.color}',`).join("\n")}
      }
    }
  }
}`;
  }, [colors]);

  const generatePlainText = useCallback(() => {
    return colors.map((c) => `${c.name}: ${c.color}`).join("\n");
  }, [colors]);

  const generateSwiftUI = useCallback(() => {
    return colors.map((c) => `let ${c.name.toLowerCase().replace(/\s+/g, "")} = Color(hex: "${c.color}")`).join("\n");
  }, [colors]);

  const generateAndroidXML = useCallback(() => {
    return `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n${colors.map((c) => `    <color name="${c.name.toLowerCase().replace(/\s+/g, "_")}">${c.color}</color>`).join("\n")}\n</resources>`;
  }, [colors]);

  const downloadFile = useCallback((content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${filename} downloaded!`);
  }, []);

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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Palette Export Tool</h1>
          <p className="text-muted-foreground">
            Export your color palette as CSS variables, JSON, or plain text. Seamlessly transfer your colors into code, design tools, or documentation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Color Editor */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>Add and name your colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Palette Name</Label>
                  <Input
                    value={paletteName}
                    onChange={(e) => setPaletteName(e.target.value)}
                    placeholder="My Palette"
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

                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {colors.map((swatch) => (
                    <div
                      key={swatch.id}
                      className="flex items-center gap-2 p-2 rounded-lg border bg-card"
                    >
                      <div
                        className="w-10 h-10 rounded-md border flex-shrink-0"
                        style={{ backgroundColor: swatch.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <Input
                          value={swatch.name}
                          onChange={(e) => updateName(swatch.id, e.target.value)}
                          className="h-8 text-sm mb-1"
                          placeholder="Color name"
                        />
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">#</span>
                          <Input
                            value={swatch.color.replace("#", "")}
                            onChange={(e) =>
                              updateColor(swatch.id, "#" + e.target.value)
                            }
                            className="pl-5 h-7 text-xs font-mono"
                            maxLength={6}
                          />
                        </div>
                      </div>
                      <input
                        type="color"
                        value={swatch.color}
                        onChange={(e) => updateColor(swatch.id, e.target.value)}
                        className="h-8 w-8 rounded border cursor-pointer flex-shrink-0"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive flex-shrink-0"
                        onClick={() => removeColor(swatch.id)}
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
                        { id: "1", name: "Primary", color: "#3B82F6" },
                        { id: "2", name: "Secondary", color: "#8B5CF6" },
                        { id: "3", name: "Accent", color: "#F59E0B" },
                        { id: "4", name: "Success", color: "#10B981" },
                        { id: "5", name: "Danger", color: "#EF4444" },
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
          </div>

          {/* Export Options */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Export Formats</CardTitle>
                <CardDescription>Choose your preferred format and copy or download</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="css" className="w-full">
                  <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-1 h-auto">
                    <TabsTrigger value="css" className="text-xs">CSS</TabsTrigger>
                    <TabsTrigger value="scss" className="text-xs">SCSS</TabsTrigger>
                    <TabsTrigger value="json" className="text-xs">JSON</TabsTrigger>
                    <TabsTrigger value="tailwind" className="text-xs">Tailwind</TabsTrigger>
                    <TabsTrigger value="text" className="text-xs">Plain</TabsTrigger>
                    <TabsTrigger value="swift" className="text-xs">Swift</TabsTrigger>
                    <TabsTrigger value="android" className="text-xs">Android</TabsTrigger>
                  </TabsList>

                  <TabsContent value="css" className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>CSS Variables</Label>
                      <div className="flex gap-2">
                        <CopyButton text={generateCSS()} id="css" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile(generateCSS(), "palette.css", "text/css")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                      {generateCSS()}
                    </pre>
                  </TabsContent>

                  <TabsContent value="scss" className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>SCSS Variables</Label>
                      <div className="flex gap-2">
                        <CopyButton text={generateSCSS()} id="scss" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile(generateSCSS(), "palette.scss", "text/css")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                      {generateSCSS()}
                    </pre>
                  </TabsContent>

                  <TabsContent value="json" className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>JSON</Label>
                      <div className="flex gap-2">
                        <CopyButton text={generateJSON()} id="json" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile(generateJSON(), "palette.json", "application/json")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                      {generateJSON()}
                    </pre>
                  </TabsContent>

                  <TabsContent value="tailwind" className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Tailwind Config</Label>
                      <div className="flex gap-2">
                        <CopyButton text={generateTailwind()} id="tailwind" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile(generateTailwind(), "tailwind.config.js", "text/javascript")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                      {generateTailwind()}
                    </pre>
                  </TabsContent>

                  <TabsContent value="text" className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Plain Text</Label>
                      <div className="flex gap-2">
                        <CopyButton text={generatePlainText()} id="text" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile(generatePlainText(), "palette.txt", "text/plain")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                      {generatePlainText()}
                    </pre>
                  </TabsContent>

                  <TabsContent value="swift" className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>SwiftUI</Label>
                      <div className="flex gap-2">
                        <CopyButton text={generateSwiftUI()} id="swift" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile(generateSwiftUI(), "Palette.swift", "text/plain")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                      {generateSwiftUI()}
                    </pre>
                  </TabsContent>

                  <TabsContent value="android" className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Android XML</Label>
                      <div className="flex gap-2">
                        <CopyButton text={generateAndroidXML()} id="android" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile(generateAndroidXML(), "colors.xml", "text/xml")}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                      {generateAndroidXML()}
                    </pre>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Palette Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-3">
                  {colors.map((swatch) => (
                    <div key={swatch.id} className="text-center">
                      <div
                        className="w-full aspect-square rounded-lg border mb-2"
                        style={{ backgroundColor: swatch.color }}
                      />
                      <p className="text-xs font-medium truncate">{swatch.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{swatch.color}</p>
                    </div>
                  ))}
                </div>
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
        <PaletteExportToolSEO />
      </div>
    </div>
  );
}
