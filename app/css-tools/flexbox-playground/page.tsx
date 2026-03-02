"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function FlexboxPlaygroundPage() {
  const [flexDirection, setFlexDirection] = useState<"row" | "row-reverse" | "column" | "column-reverse">("row");
  const [justifyContent, setJustifyContent] = useState<"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly">("flex-start");
  const [alignItems, setAlignItems] = useState<"flex-start" | "flex-end" | "center" | "baseline" | "stretch">("stretch");
  const [flexWrap, setFlexWrap] = useState<"nowrap" | "wrap" | "wrap-reverse">("nowrap");
  const [gap, setGap] = useState(8);
  const [itemCount, setItemCount] = useState(5);
  const [itemWidth, setItemWidth] = useState(80);

  const generateFlexCSS = () => {
    return `display: flex;
flex-direction: ${flexDirection};
justify-content: ${justifyContent};
align-items: ${alignItems};
flex-wrap: ${flexWrap};
gap: ${gap}px;`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const flexCSS = generateFlexCSS();

  const items = Array.from({ length: itemCount }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Flexbox Playground</h1>
        <p className="text-muted-foreground">
          Interactive CSS Flexbox generator with live preview and instant code generation.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Container Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Flex Direction</Label>
                <Select value={flexDirection} onValueChange={(v) => setFlexDirection(v as typeof flexDirection)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="row">Row</SelectItem>
                    <SelectItem value="row-reverse">Row Reverse</SelectItem>
                    <SelectItem value="column">Column</SelectItem>
                    <SelectItem value="column-reverse">Column Reverse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Justify Content</Label>
                <Select value={justifyContent} onValueChange={(v) => setJustifyContent(v as typeof justifyContent)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flex-start">Flex Start</SelectItem>
                    <SelectItem value="flex-end">Flex End</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="space-between">Space Between</SelectItem>
                    <SelectItem value="space-around">Space Around</SelectItem>
                    <SelectItem value="space-evenly">Space Evenly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Align Items</Label>
                <Select value={alignItems} onValueChange={(v) => setAlignItems(v as typeof alignItems)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flex-start">Flex Start</SelectItem>
                    <SelectItem value="flex-end">Flex End</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="baseline">Baseline</SelectItem>
                    <SelectItem value="stretch">Stretch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Flex Wrap</Label>
                <Select value={flexWrap} onValueChange={(v) => setFlexWrap(v as typeof flexWrap)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nowrap">No Wrap</SelectItem>
                    <SelectItem value="wrap">Wrap</SelectItem>
                    <SelectItem value="wrap-reverse">Wrap Reverse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Gap: {gap}px</Label>
                <Slider
                  value={[gap]}
                  onValueChange={([v]) => setGap(v)}
                  min={0}
                  max={32}
                  step={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Items Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Number of Items: {itemCount}</Label>
                <Slider
                  value={[itemCount]}
                  onValueChange={([v]) => setItemCount(v)}
                  min={1}
                  max={12}
                  step={1}
                />
              </div>
              <div>
                <Label>Item Width: {itemWidth}px</Label>
                <Slider
                  value={[itemWidth]}
                  onValueChange={([v]) => setItemWidth(v)}
                  min={40}
                  max={200}
                  step={10}
                />
              </div>
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
                className="min-h-[400px] p-4 bg-muted rounded-lg border-2 border-dashed"
                style={{
                  display: "flex",
                  flexDirection,
                  justifyContent,
                  alignItems,
                  flexWrap,
                  gap: `${gap}px`,
                }}
              >
                {items.map((item) => (
                  <div
                    key={item}
                    className="bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold transition-all"
                    style={{
                      width: `${itemWidth}px`,
                      minHeight: alignItems === "stretch" ? "auto" : `${itemWidth}px`,
                      height: alignItems === "stretch" ? "auto" : `${itemWidth}px`,
                    }}
                  >
                    {item}
                  </div>
                ))}
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
                  {flexCSS}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(flexCSS, "Flexbox CSS")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <Label>Complete Example</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap">
                    {`.container {
  ${flexCSS}
}`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`.container {\n  ${flexCSS}\n}`, "Complete CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={() => copyToClipboard(flexCSS, "Flexbox")}>
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
          <h2 className="text-2xl font-semibold mb-4">Flexbox Without the Confusion</h2>
          <p className="text-muted-foreground mb-4">
            Flexbox arranges items in a single dimension - either a row or a column. It's perfect for 
            navigation bars, button groups, card layouts, and anything that needs to distribute space 
            or align items.
          </p>
          <p className="text-muted-foreground">
            The confusion usually comes from mixing up parent properties (flex-direction, justify-content) 
            with child properties (flex-grow, flex-shrink). This playground separates them so you can 
            see what each one does.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Parent Properties</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-lg">flex-direction</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <code className="bg-muted px-1 rounded">row</code> | <code className="bg-muted px-1 rounded">row-reverse</code> | 
                <code className="bg-muted px-1 rounded">column</code> | <code className="bg-muted px-1 rounded">column-reverse</code>
                <p className="mt-2">Controls the main axis. Row is horizontal, column is vertical.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">justify-content</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <code className="bg-muted px-1 rounded">flex-start</code> | <code className="bg-muted px-1 rounded">center</code> | 
                <code className="bg-muted px-1 rounded">flex-end</code> | <code className="bg-muted px-1 rounded">space-between</code> | 
                <code className="bg-muted px-1 rounded">space-around</code>
                <p className="mt-2">Distributes items along the main axis.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">align-items</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <code className="bg-muted px-1 rounded">stretch</code> | <code className="bg-muted px-1 rounded">flex-start</code> | 
                <code className="bg-muted px-1 rounded">center</code> | <code className="bg-muted px-1 rounded">flex-end</code> | 
                <code className="bg-muted px-1 rounded">baseline</code>
                <p className="mt-2">Aligns items along the cross axis (perpendicular to main axis).</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">gap</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Space between flex items. Replaces margin hacks. Use one value for uniform spacing
                or two for row-gap and column-gap.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Child Properties</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <code className="font-semibold">flex-grow</code>
                  <p>
                    How much an item expands to fill available space. 0 means don't
                    grow, 1 means grow proportionally.
                  </p>
                </div>
                <div>
                  <code className="font-semibold">flex-shrink</code>
                  <p>
                    How much an item shrinks when space is limited. 1 is proportional
                    shrinking, 0 prevents shrinking.
                  </p>
                </div>
                <div>
                  <code className="font-semibold">flex-basis</code>
                  <p>
                    Initial size before growing or shrinking.{" "}
                    <code className="bg-muted px-1 rounded">auto</code> uses content
                    size, <code className="bg-muted px-1 rounded">0</code> ignores
                    content.
                  </p>
                </div>
                <div>
                  <code className="font-semibold">align-self</code>
                  <p>
                    Overrides parent's align-items for a single item. Useful for
                    one-off alignment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Flexbox Patterns</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Centered content</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono">display: flex; justify-content: center; align-items: center;</code>
                <p className="text-sm text-muted-foreground mt-2">Perfect centering in both directions.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Space-between navigation</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono">display: flex; justify-content: space-between; align-items: center;</code>
                <p className="text-sm text-muted-foreground mt-2">Logo on left, nav items on right.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Equal-width columns</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono">display: flex; gap: 1rem; &gt; * {`{ flex: 1; }`}</code>
                <p className="text-sm text-muted-foreground mt-2">All children get equal width.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
