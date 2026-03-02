"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Copy, Plus, Trash2 } from "lucide-react";

interface SnapSection {
  id: string;
  name: string;
  height: string;
}

export default function ScrollSnapBuilderPage() {
  const [snapType, setSnapType] = useState<"y" | "x" | "both" | "none">("y");
  const [snapAlign, setSnapAlign] = useState<"start" | "end" | "center" | "none">("start");
  const [snapStop, setSnapStop] = useState<"normal" | "always">("normal");
  const [sections, setSections] = useState<SnapSection[]>([
    { id: "1", name: "Section 1", height: "100vh" },
    { id: "2", name: "Section 2", height: "100vh" },
    { id: "3", name: "Section 3", height: "100vh" },
  ]);
  const [hasPadding, setHasPadding] = useState(false);
  const [paddingValue, setPaddingValue] = useState(20);

  const generateContainerCSS = () => {
    const lines: string[] = [];
    
    if (snapType === "y") {
      lines.push("scroll-snap-type: y var(--snap-strictness);");
    } else if (snapType === "x") {
      lines.push("scroll-snap-type: x var(--snap-strictness);");
    } else if (snapType === "both") {
      lines.push("scroll-snap-type: both var(--snap-strictness);");
    } else {
      lines.push("scroll-snap-type: none;");
    }
    
    if (hasPadding) {
      lines.push(`scroll-padding: ${paddingValue}px;`);
    }
    
    lines.push("overflow: auto;");
    lines.push("height: 100vh;");
    
    return lines.join("\n");
  };

  const generateSectionCSS = () => {
    const alignValue = snapAlign === "none" ? "none" : `snap-${snapAlign}`;
    return `scroll-snap-align: ${alignValue};
scroll-snap-stop: ${snapStop};`;
  };

  const generateFullCSS = () => {
    const strictnessVar = `--snap-strictness: ${snapStop};`;
    
    return `:root {
  ${strictnessVar}
}

.scroll-container {
${generateContainerCSS().split("\n").map((l) => "  " + l).join("\n")}
}

.section {
${generateSectionCSS().split("\n").map((l) => "  " + l).join("\n")}
}`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const addSection = () => {
    const newSection: SnapSection = {
      id: Date.now().toString(),
      name: `Section ${sections.length + 1}`,
      height: "100vh",
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    if (sections.length <= 1) {
      toast.error("Minimum 1 section required");
      return;
    }
    setSections(sections.filter((s) => s.id !== id));
  };

  const cssCode = generateFullCSS();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Scroll Snap Builder</h1>
        <p className="text-muted-foreground">
          Create CSS scroll snap layouts with configurable snap points. Build full-page scrolling sections and carousels.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scroll Snap Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Scroll Direction</Label>
                <Select value={snapType} onValueChange={(v) => setSnapType(v as typeof snapType)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="y">Vertical (Y)</SelectItem>
                    <SelectItem value="x">Horizontal (X)</SelectItem>
                    <SelectItem value="both">Both (Mandatory)</SelectItem>
                    <SelectItem value="none">None (Proximity)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Snap Align</Label>
                <Select value={snapAlign} onValueChange={(v) => setSnapAlign(v as typeof snapAlign)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start">Start (Top/Left)</SelectItem>
                    <SelectItem value="end">End (Bottom/Right)</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Snap Stop</Label>
                <Select value={snapStop} onValueChange={(v) => setSnapStop(v as typeof snapStop)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal (Can skip sections)</SelectItem>
                    <SelectItem value="always">Always (Must stop at each)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Scroll Padding</Label>
                <Switch checked={hasPadding} onCheckedChange={setHasPadding} />
              </div>
              {hasPadding && (
                <div>
                  <Label>Padding: {paddingValue}px</Label>
                  <Slider value={[paddingValue]} onValueChange={([v]) => setPaddingValue(v)} min={0} max={100} step={5} className="mt-2" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sections</CardTitle>
              <Button variant="outline" size="sm" onClick={addSection}>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {sections.map((section) => (
                <div key={section.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Input
                    value={section.name}
                    onChange={(e) => {
                      setSections(sections.map((s) => s.id === section.id ? { ...s, name: e.target.value } : s));
                    }}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeSection(section.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
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
                  setSnapType("y");
                  setSnapAlign("start");
                  setSnapStop("always");
                }}
              >
                Full Page Scroll
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSnapType("x");
                  setSnapAlign("start");
                  setSnapStop("normal");
                }}
              >
                Horizontal Carousel
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSnapType("y");
                  setSnapAlign("center");
                  setSnapStop("normal");
                }}
              >
                Center Snap
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSnapType("y");
                  setSnapAlign("start");
                  setSnapStop("normal");
                  setHasPadding(true);
                  setPaddingValue(80);
                }}
              >
                With Header Offset
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
                className="h-[400px] border rounded-lg overflow-auto"
                style={{
                  scrollSnapType: snapType === "none" ? "none" : `${snapType} mandatory`,
                  scrollPadding: hasPadding ? `${paddingValue}px` : undefined,
                }}
              >
                {snapType === "x" ? (
                  <div className="flex h-full">
                    {sections.map((section) => (
                      <div
                        key={section.id}
                        className="flex-shrink-0 h-full flex items-center justify-center border-r bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                        style={{
                          width: "100%",
                          scrollSnapAlign: snapAlign === "none" ? "none" : snapAlign,
                          scrollSnapStop: snapStop,
                        }}
                      >
                        <h3 className="text-2xl font-bold">{section.name}</h3>
                      </div>
                    ))}
                  </div>
                ) : (
                  sections.map((section) => (
                    <div
                      key={section.id}
                      className="h-full flex items-center justify-center border-b bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                      style={{
                        height: section.height,
                        scrollSnapAlign: snapAlign === "none" ? "none" : snapAlign,
                        scrollSnapStop: snapStop,
                      }}
                    >
                      <h3 className="text-2xl font-bold">{section.name}</h3>
                    </div>
                  ))
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                {snapType === "x" ? "Scroll horizontally →" : "Scroll vertically ↓"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                  {cssCode}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(cssCode, "Scroll Snap CSS")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(cssCode, "Scroll Snap CSS")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy CSS
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>HTML Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="p-3 bg-muted rounded-lg text-sm font-mono overflow-x-auto">
{`<div class="scroll-container">
${sections.map((s) => `  <div class="section">${s.name}</div>`).join("\n")}
</div>`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Scroll Snap</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              CSS Scroll Snap allows you to create scrollable containers that "snap" to specific points when scrolling.
              It's perfect for full-page scrolling sections, image carousels, and any content where you want controlled
              scroll positions.
            </p>
            <p>
              The <code>scroll-snap-type</code> property defines the snap behavior on the container, while
              <code> scroll-snap-align</code> on child elements determines where they snap to.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Properties</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Container Properties</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <div><code>scroll-snap-type</code> - Defines snap direction and strictness</div>
                <div><code>scroll-padding</code> - Offset for snap positions (useful for fixed headers)</div>
                <div><code>overflow</code> - Must be auto, scroll, or hidden for snap to work</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Child Properties</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <div><code>scroll-snap-align</code> - Where the element snaps (start/end/center)</div>
                <div><code>scroll-snap-stop</code> - Whether scrolling must stop at each element</div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Browser Support</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Scroll Snap is well-supported in all modern browsers including Chrome 69+, Firefox 68+, Safari 11+, 
                and Edge 79+. For older browsers, consider providing a fallback or progressive enhancement.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
