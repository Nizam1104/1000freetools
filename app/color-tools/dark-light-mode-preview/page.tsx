"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Sun, Moon, Plus, Trash2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { hexToRgb } from "@/app/color-tools/lib/color-utils";

export const metadata = {
  title: "Dark & Light Mode Color Preview — Test Colors in Both Themes",
  description: "Preview how your colors look in both dark and light UI modes side by side. Test your palette's versatility and accessibility before committing to a design direction.",
  keywords: ["dark light mode preview", "theme color tester", "dual theme preview", "dark mode colors", "light mode colors", "theme switcher tool", "accessible theme design"],
  openGraph: {
    title: "Dark & Light Mode Color Preview — Test Colors in Both Themes",
    description: "Preview how your colors look in both dark and light UI modes side by side. Test your palette's versatility and accessibility.",
    type: "website",
  },
};

export const relatedTools = [
  { name: "Contrast Checker", href: "/color-tools/contrast-checker", description: "Check WCAG accessibility compliance" },
  { name: "Text Color Suggestion Tool", href: "/color-tools/text-color-suggestion-tool", description: "Get readable text color suggestions" },
  { name: "Color Picker", href: "/color-tools/color-picker", description: "Pick and convert colors" },
  { name: "Palette Contrast Viewer", href: "/color-tools/palette-contrast-viewer", description: "View contrast matrix for palettes" },
];

interface ColorSwatch {
  id: string;
  name: string;
  color: string;
}

export default function DarkLightModePreviewPage() {
  const [colors, setColors] = useState<ColorSwatch[]>([
    { id: "1", name: "Primary", color: "#3B82F6" },
    { id: "2", name: "Secondary", color: "#8B5CF6" },
    { id: "3", name: "Accent", color: "#F59E0B" },
    { id: "4", name: "Background", color: "#FFFFFF" },
    { id: "5", name: "Surface", color: "#F3F4F6" },
  ]);
  const [newColor, setNewColor] = useState("#10B981");
  const [newName, setNewName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"light" | "dark" | "split">("split");

  const addColor = useCallback(() => {
    const colorToAdd = newColor.startsWith("#") ? newColor : "#" + newColor;
    const rgb = hexToRgb(colorToAdd);
    if (!rgb) {
      toast.error("Invalid color value");
      return;
    }
    const name = newName.trim() || `Color ${colors.length + 1}`;
    setColors((prev) => [...prev, { id: Date.now().toString(), name, color: colorToAdd.toUpperCase() }]);
    setNewColor("#10B981");
    setNewName("");
  }, [newColor, newName, colors.length]);

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
      toast.success("Color copied!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

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

  const getTextColor = (bgColor: string): string => {
    const rgb = hexToRgb(bgColor);
    if (!rgb) return "#000000";
    const luminance = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
    return luminance > 150 ? "#000000" : "#FFFFFF";
  };

  // Dark mode adjusted colors
  const getDarkModeColor = (color: string): string => {
    const rgb = hexToRgb(color);
    if (!rgb) return color;
    
    // For background-like colors, darken them
    const luminance = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
    if (luminance > 200) {
      // Light colors get darker in dark mode
      const factor = 0.2;
      return `#${Math.round(rgb.r * factor).toString(16).padStart(2, "0")}${Math.round(rgb.g * factor).toString(16).padStart(2, "0")}${Math.round(rgb.b * factor).toString(16).padStart(2, "0")}`;
    }
    // For vibrant colors, slightly adjust for dark mode
    return color;
  };

  const PreviewCard = ({ mode }: { mode: "light" | "dark" }) => {
    const bgColor = mode === "light" ? "#FFFFFF" : "#1F2937";
    const surfaceColor = mode === "light" ? "#F3F4F6" : "#374151";
    const textColor = mode === "light" ? "#1F2937" : "#F9FAFB";
    const mutedColor = mode === "light" ? "#6B7280" : "#9CA3AF";
    const borderColor = mode === "light" ? "#E5E7EB" : "#4B5563";

    const getColorForMode = (color: string) => {
      if (mode === "dark") {
        // Check if this is a background-like color
        const rgb = hexToRgb(color);
        if (rgb && rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 200) {
          return getDarkModeColor(color);
        }
      }
      return color;
    };

    return (
      <div
        className="rounded-xl border p-6 space-y-4"
        style={{ backgroundColor: bgColor, borderColor }}
      >
        {/* Header */}
        <div className="space-y-1">
          <h3
            className="text-xl font-semibold"
            style={{ color: textColor }}
          >
            {mode === "light" ? "Light Mode" : "Dark Mode"} Preview
          </h3>
          <p
            className="text-sm"
            style={{ color: mutedColor }}
          >
            See how your colors appear in {mode} mode
          </p>
        </div>

        {/* Color Swatches */}
        <div className="grid grid-cols-5 gap-2">
          {colors.slice(0, 5).map((swatch) => (
            <div key={swatch.id} className="text-center">
              <div
                className="w-full aspect-square rounded-lg border mb-1"
                style={{ backgroundColor: getColorForMode(swatch.color) }}
              />
              <p
                className="text-xs truncate"
                style={{ color: mutedColor }}
              >
                {swatch.name}
              </p>
            </div>
          ))}
        </div>

        {/* UI Components Preview */}
        <div
          className="rounded-lg border p-4 space-y-3"
          style={{ backgroundColor: surfaceColor, borderColor }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: textColor }}
          >
            UI Components
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
            {colors.slice(0, 3).map((swatch) => (
              <button
                key={swatch.id}
                className="px-4 py-2 rounded-md text-sm font-medium transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: swatch.color,
                  color: getTextColor(swatch.color),
                }}
              >
                {swatch.name}
              </button>
            ))}
          </div>

          {/* Input Field */}
          <div
            className="rounded-md border p-3"
            style={{ backgroundColor: bgColor, borderColor }}
          >
            <p
              className="text-sm"
              style={{ color: mutedColor }}
            >
              Input field placeholder
            </p>
          </div>

          {/* Alert/Badge */}
          <div className="flex flex-wrap gap-2">
            {colors.slice(3, 5).map((swatch) => (
              <span
                key={swatch.id}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${swatch.color}20`,
                  color: swatch.color,
                }}
              >
                {swatch.name}
              </span>
            ))}
          </div>
        </div>

        {/* Text Hierarchy */}
        <div className="space-y-2">
          <h4
            className="text-lg font-semibold"
            style={{ color: textColor }}
          >
            Heading Text
          </h4>
          <p
            className="text-sm"
            style={{ color: textColor }}
          >
            Body text showing how readable your color choices are in {mode} mode.
          </p>
          <p
            className="text-xs"
            style={{ color: mutedColor }}
          >
            Muted text for secondary information and captions.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Dark & Light Mode Color Preview</h1>
          <p className="text-muted-foreground">
            Preview how your colors look in both dark and light UI modes side by side. Test your palette's versatility before committing to a design direction.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border p-1 bg-card">
            <Button
              variant={activeMode === "light" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveMode("light")}
              className="gap-2"
            >
              <Sun className="h-4 w-4" />
              Light Only
            </Button>
            <Button
              variant={activeMode === "split" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveMode("split")}
              className="gap-2"
            >
              <Sun className="h-4 w-4" />
              /
              <Moon className="h-4 w-4" />
              Split View
            </Button>
            <Button
              variant={activeMode === "dark" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveMode("dark")}
              className="gap-2"
            >
              <Moon className="h-4 w-4" />
              Dark Only
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Color Editor */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>Define your color scheme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Color Name</Label>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g., Primary"
                    onKeyDown={(e) => e.key === "Enter" && addColor()}
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

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {colors.map((swatch) => (
                    <div
                      key={swatch.id}
                      className="flex items-center gap-2 p-2 rounded-lg border bg-card"
                    >
                      <div
                        className="w-8 h-8 rounded-md border flex-shrink-0"
                        style={{ backgroundColor: swatch.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <Input
                          value={swatch.name}
                          onChange={(e) => updateName(swatch.id, e.target.value)}
                          className="h-7 text-sm"
                          placeholder="Name"
                        />
                      </div>
                      <div className="relative w-16">
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
                      <input
                        type="color"
                        value={swatch.color}
                        onChange={(e) => updateColor(swatch.id, e.target.value)}
                        className="h-7 w-7 rounded border cursor-pointer flex-shrink-0"
                      />
                      <CopyButton text={swatch.color} id={swatch.id} />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive flex-shrink-0"
                        onClick={() => removeColor(swatch.id)}
                        disabled={colors.length <= 1}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    setColors([
                      { id: "1", name: "Primary", color: "#3B82F6" },
                      { id: "2", name: "Secondary", color: "#8B5CF6" },
                      { id: "3", name: "Accent", color: "#F59E0B" },
                      { id: "4", name: "Background", color: "#FFFFFF" },
                      { id: "5", name: "Surface", color: "#F3F4F6" },
                    ])
                  }
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Mode Preview</CardTitle>
                <CardDescription>
                  {activeMode === "split"
                    ? "Side-by-side comparison of light and dark modes"
                    : `Previewing ${activeMode} mode only`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeMode === "split" ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <PreviewCard mode="light" />
                    <PreviewCard mode="dark" />
                  </div>
                ) : (
                  <div className="max-w-md">
                    <PreviewCard mode={activeMode} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Design Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Sun className="h-4 w-4 mt-0.5 text-yellow-600" />
                  <p>
                    <strong>Light Mode:</strong> Use darker colors for text and lighter colors for backgrounds. Ensure sufficient contrast for readability.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Moon className="h-4 w-4 mt-0.5 text-blue-600" />
                  <p>
                    <strong>Dark Mode:</strong> Invert your approach - use lighter text on darker backgrounds. Avoid pure black (#000000) as it can cause eye strain.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600" />
                  <p>
                    <strong>Accent Colors:</strong> Bright accent colors work well in both modes, but may need slight adjustments for optimal visibility.
                  </p>
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
        <section className="mt-12 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Test Colors in Both Themes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <ol className="list-decimal list-inside space-y-2">
                <li>Add your color palette using the color picker or HEX input</li>
                <li>Name each color for easy reference (Primary, Secondary, etc.)</li>
                <li>Toggle between Light Only, Split View, and Dark Only modes</li>
                <li>Review how buttons, inputs, and text appear in each theme</li>
                <li>Adjust colors that don't translate well between modes</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Why Preview Both Light and Dark Modes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Users expect apps and websites to work well in their preferred theme:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Catch accessibility issues before they affect users</li>
                <li>Ensure brand colors work across different backgrounds</li>
                <li>Test contrast ratios in both light and dark contexts</li>
                <li>Save time by fixing problems during design, not development</li>
              </ul>
              <p className="pt-2">
                A well-designed color palette should maintain readability and visual hierarchy in both light and dark modes.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
