"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function CssGridGeneratorPage() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [gap, setGap] = useState(16);
  const [columnWidth, setColumnWidth] = useState("1fr");
  const [rowHeight, setRowHeight] = useState("1fr");
  const [selectedCells, setSelectedCells] = useState<number[]>([]);

  const generateGridCSS = () => {
    const cols = `repeat(${columns}, ${columnWidth})`;
    const rowValues = `repeat(${rows}, ${rowHeight})`;
    return {
      display: "display: grid;",
      gridTemplateColumns: `grid-template-columns: ${cols};`,
      gridTemplateRows: `grid-template-rows: ${rowValues};`,
      gap: `gap: ${gap}px;`,
    };
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const toggleCell = (index: number) => {
    setSelectedCells(
      selectedCells.includes(index)
        ? selectedCells.filter((i) => i !== index)
        : [...selectedCells, index]
    );
  };

  const gridCSS = generateGridCSS();

  const fullCSS = `display: grid;
grid-template-columns: ${gridCSS.gridTemplateColumns.replace("grid-template-columns: ", "").replace(";", "")};
grid-template-rows: ${gridCSS.gridTemplateRows.replace("grid-template-rows: ", "").replace(";", "")};
gap: ${gap}px;`;

  const presets = [
    { name: "2 Columns", columns: 2, rows: 1 },
    { name: "3 Columns", columns: 3, rows: 1 },
    { name: "4 Columns", columns: 4, rows: 1 },
    { name: "2x2 Grid", columns: 2, rows: 2 },
    { name: "3x3 Grid", columns: 3, rows: 3 },
    { name: "4x4 Grid", columns: 4, rows: 4 },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS Grid Generator</h1>
        <p className="text-muted-foreground">
          Create CSS Grid layouts visually with customizable columns, rows, and gaps.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Grid Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Columns: {columns}</Label>
                <Slider
                  value={[columns]}
                  onValueChange={([v]) => setColumns(v)}
                  min={1}
                  max={12}
                  step={1}
                />
              </div>
              <div>
                <Label>Rows: {rows}</Label>
                <Slider
                  value={[rows]}
                  onValueChange={([v]) => setRows(v)}
                  min={1}
                  max={12}
                  step={1}
                />
              </div>
              <div>
                <Label>Gap: {gap}px</Label>
                <Slider
                  value={[gap]}
                  onValueChange={([v]) => setGap(v)}
                  min={0}
                  max={48}
                  step={4}
                />
              </div>
              <div>
                <Label>Column Width</Label>
                <Select value={columnWidth} onValueChange={setColumnWidth}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1fr">Equal (1fr)</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="200px">Fixed (200px)</SelectItem>
                    <SelectItem value="minmax(200px, 1fr)">Minmax (200px, 1fr)</SelectItem>
                    <SelectItem value="repeat(auto-fit, minmax(200px, 1fr))">Auto-fit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Row Height</Label>
                <Select value={rowHeight} onValueChange={setRowHeight}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1fr">Equal (1fr)</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="200px">Fixed (200px)</SelectItem>
                    <SelectItem value="minmax(100px, auto)">Minmax (100px, auto)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Presets</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  onClick={() => {
                    setColumns(preset.columns);
                    setRows(preset.rows);
                  }}
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
              <CardTitle>Grid Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="p-4 bg-muted rounded-lg min-h-[300px]"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gridTemplateRows: `repeat(${rows}, 1fr)`,
                  gap: `${gap}px`,
                }}
              >
                {Array.from({ length: columns * rows }).map((_, i) => (
                  <div
                    key={i}
                    className={`bg-primary/20 border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:bg-primary/40 ${
                      selectedCells.includes(i) ? "border-primary bg-primary/40" : "border-primary/60"
                    }`}
                    onClick={() => toggleCell(i)}
                    style={{ aspectRatio: "1" }}
                  >
                    <span className="text-sm font-mono">{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Click cells to select them
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap">
                  {fullCSS}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(fullCSS, "Grid CSS")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <Label>Complete Example</Label>
                <div className="flex gap-2 mt-2">
                  <code className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono whitespace-pre-wrap">
                    {`.grid-container {
  ${fullCSS}
}`}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`.grid-container {\n  ${fullCSS}\n}`, "Complete CSS")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={() => copyToClipboard(fullCSS, "CSS Grid")}>
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
          <h2 className="text-2xl font-semibold mb-4">CSS Grid in Plain English</h2>
          <p className="text-muted-foreground mb-4">
            CSS Grid creates two-dimensional layouts with rows and columns. You define the grid structure 
            on a parent container, then place child elements into grid cells. It's the most powerful 
            layout system CSS offers.
          </p>
          <p className="text-muted-foreground">
            This generator builds the basic grid structure. Adjust columns, rows, and gap, then copy 
            the CSS. The visual preview shows exactly what you're getting.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Grid Properties</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-lg">grid-template-columns</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Defines column widths. Use <code className="bg-muted px-1 rounded">repeat(3, 1fr)</code> for 
                three equal columns, or <code className="bg-muted px-1 rounded">200px 1fr 2fr</code> for 
                mixed widths.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">grid-template-rows</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Defines row heights. Same syntax as columns. Often set to <code className="bg-muted px-1 rounded">auto</code> to 
                let content determine height.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">gap</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Space between grid cells. Replaces the old margin hack. Use one value for uniform gap, 
                or two for row-gap and column-gap.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">fr units</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Fraction units distribute available space. <code className="bg-muted px-1 rounded">1fr 2fr</code> means 
                the second column gets twice the space of the first.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Useful Grid Patterns</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Responsive auto-fit</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));</code>
                <p className="text-sm text-muted-foreground">
                  Creates as many columns as fit, each at least 250px wide. Automatically adjusts to 
                  screen size without media queries.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Holy grail layout</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">grid-template-columns: 200px 1fr 200px;</code>
                <p className="text-sm text-muted-foreground">
                  Classic three-column layout with fixed sidebars and flexible content area. Stack 
                  vertically on mobile with a media query.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">12-column grid</h3>
                <code className="block p-3 bg-muted rounded-lg text-sm font-mono mb-2">grid-template-columns: repeat(12, 1fr);</code>
                <p className="text-sm text-muted-foreground">
                  Flexible foundation for complex layouts. Place items across multiple columns using 
                  grid-column spans.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
