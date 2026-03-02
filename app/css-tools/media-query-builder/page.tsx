"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Copy, Plus, Trash2 } from "lucide-react";

interface MediaQuery {
  id: string;
  type: "min-width" | "max-width" | "min-height" | "max-height" | "orientation" | "prefers-color-scheme" | "custom";
  value: string;
  not: boolean;
}

export default function MediaQueryBuilderPage() {
  const [queries, setQueries] = useState<MediaQuery[]>([
    { id: "1", type: "min-width", value: "768", not: false },
  ]);

  const addQuery = () => {
    const newQuery: MediaQuery = {
      id: Date.now().toString(),
      type: "min-width",
      value: "1024",
      not: false,
    };
    setQueries([...queries, newQuery]);
  };

  const removeQuery = (id: string) => {
    if (queries.length <= 1) {
      toast.error("Minimum 1 query required");
      return;
    }
    setQueries(queries.filter((q) => q.id !== id));
  };

  const updateQuery = (id: string, updates: Partial<MediaQuery>) => {
    setQueries(queries.map((q) => (q.id === id ? { ...q, ...updates } : q)));
  };

  const generateMediaQuery = () => {
    const parts = queries.map((q) => {
      if (q.type === "orientation" || q.type === "prefers-color-scheme") {
        return `${q.not ? "not " : ""}(${q.type}: ${q.value})`;
      }
      return `${q.not ? "not " : ""}(${q.type}: ${q.value}${["min-width", "max-width", "min-height", "max-height"].includes(q.type) ? "px" : ""})`;
    });
    return `@media ${parts.join(" and ")}`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const mediaQuery = generateMediaQuery();

  const presets = [
    { name: "Mobile", queries: [{ id: "1", type: "max-width" as const, value: "767", not: false }] },
    { name: "Tablet", queries: [{ id: "1", type: "min-width" as const, value: "768", not: false }, { id: "2", type: "max-width" as const, value: "1023", not: false }] },
    { name: "Desktop", queries: [{ id: "1", type: "min-width" as const, value: "1024", not: false }] },
    { name: "Dark Mode", queries: [{ id: "1", type: "prefers-color-scheme" as const, value: "dark", not: false }] },
    { name: "Portrait", queries: [{ id: "1", type: "orientation" as const, value: "portrait", not: false }] },
    { name: "Landscape", queries: [{ id: "1", type: "orientation" as const, value: "landscape", not: false }] },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setQueries(preset.queries.map((q, i) => ({ ...q, id: Date.now().toString() + i })));
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Media Query Builder</h1>
        <p className="text-muted-foreground">
          Build complex CSS media queries visually with support for breakpoints, orientation, and preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Media Queries</CardTitle>
              <Button variant="outline" size="sm" onClick={addQuery}>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {queries.map((query, index) => (
                <Card key={query.id}>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Query {index + 1}</Label>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs">NOT</Label>
                        <Switch
                          checked={query.not}
                          onCheckedChange={(checked) => updateQuery(query.id, { not: checked })}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeQuery(query.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Type</Label>
                        <select
                          value={query.type}
                          onChange={(e) => updateQuery(query.id, { type: e.target.value as MediaQuery["type"] })}
                          className="w-full mt-1 p-2 border rounded-md text-sm bg-background"
                        >
                          <option value="min-width">Min Width</option>
                          <option value="max-width">Max Width</option>
                          <option value="min-height">Min Height</option>
                          <option value="max-height">Max Height</option>
                          <option value="orientation">Orientation</option>
                          <option value="prefers-color-scheme">Color Scheme</option>
                          <option value="custom">Custom</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs">Value</Label>
                        <Input
                          value={query.value}
                          onChange={(e) => updateQuery(query.id, { value: e.target.value })}
                          className="mt-1"
                          placeholder={query.type === "orientation" ? "portrait" : "768"}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
              <CardTitle>Generated Media Query</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                  {mediaQuery} {"{ }"}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(mediaQuery, "Media Query")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <Label>Complete Example</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap">
                    {`${mediaQuery} {
  .element {
    /* Your styles here */
    display: flex;
  }
}`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`${mediaQuery} {\n  /* styles */\n}`, "Complete CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={() => copyToClipboard(mediaQuery, "Media Query")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Media Query
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Breakpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Mobile (small)</span>
                  <code className="font-mono">@media (max-width: 639px)</code>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Mobile (large)</span>
                  <code className="font-mono">@media (min-width: 640px)</code>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Tablet</span>
                  <code className="font-mono">@media (min-width: 768px)</code>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Desktop</span>
                  <code className="font-mono">@media (min-width: 1024px)</code>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Large Desktop</span>
                  <code className="font-mono">@media (min-width: 1280px)</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Media Queries Explained</h2>
          <p className="text-muted-foreground mb-4">
            Media queries apply CSS rules based on device characteristics. They're the foundation 
            of responsive design - letting you adapt layouts for phones, tablets, and desktops.
          </p>
          <p className="text-muted-foreground">
            This builder creates the CSS for you. Pick your breakpoints and features, then copy 
            the generated code.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Breakpoint Strategy</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                Instead of targeting specific devices, design for content. Add breakpoints where 
                your layout breaks, not where new iPhones launch.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Content gets cramped:</span>
                  <code className="font-mono">Add a breakpoint</code>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Lines of text too long:</span>
                  <code className="font-mono">Add a max-width constraint</code>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Too much white space:</span>
                  <code className="font-mono">Expand the layout</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Media Query Features</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-lg">Width-based</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <code className="bg-muted px-1 rounded">(min-width: 768px)</code> - Most common. 
                Triggers when viewport is at least 768px wide. Use for mobile-first responsive design.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Height-based</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <code className="bg-muted px-1 rounded">(min-height: 600px)</code> - Useful for 
                full-screen layouts or when vertical space matters more than width.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Orientation</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <code className="bg-muted px-1 rounded">(orientation: landscape)</code> - Detects 
                device rotation. Handy for video players or full-screen experiences.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Prefers-color-scheme</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <code className="bg-muted px-1 rounded">(prefers-color-scheme: dark)</code> - 
                Respects user's system dark mode preference. Essential for modern sites.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
