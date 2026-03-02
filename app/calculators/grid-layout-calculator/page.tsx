"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GridLayoutResult {
  containerWidth: number;
  columns: number;
  gutterWidth: number;
  margin: number;
  columnWidth: number;
  totalGutterWidth: number;
  cssGrid: string;
  cssFlex: string;
  recommendations: string[];
}

export default function GridLayoutCalculatorPage() {
  const [containerWidth, setContainerWidth] = useState<string>("1200");
  const [columns, setColumns] = useState<string>("12");
  const [gutterWidth, setGutterWidth] = useState<string>("20");
  const [margin, setMargin] = useState<string>("20");
  const [unit, setUnit] = useState<string>("px");
  const [result, setResult] = useState<GridLayoutResult | null>(null);

  const calculate = () => {
    const containerNum = parseFloat(containerWidth) || 1200;
    const columnsNum = parseInt(columns) || 12;
    const gutterNum = parseFloat(gutterWidth) || 20;
    const marginNum = parseFloat(margin) || 20;

    // Calculate available width for columns (container - margins - gutters)
    const availableWidth = containerNum - (marginNum * 2);
    const totalGutterWidth = gutterNum * (columnsNum - 1);
    
    // Column width = (available width - total gutter width) / number of columns
    const columnWidth = (availableWidth - totalGutterWidth) / columnsNum;

    // CSS Grid template
    const cssGrid = `grid-template-columns: repeat(${columnsNum}, ${columnWidth.toFixed(0)}${unit});
gap: ${gutterNum}${unit};
padding: ${marginNum}${unit};`;

    // CSS Flex approach
    const cssFlex = `.column {
  width: calc(${(100 / columnsNum).toFixed(4)}% - ${gutterNum}${unit});
  margin: 0 ${gutterNum / 2}${unit};
}`;

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`📐 Column width: ${columnWidth.toFixed(1)}${unit}`);
    recommendations.push(`📏 Total gutter space: ${totalGutterWidth}${unit}`);
    
    if (columnsNum === 12) {
      recommendations.push("✅ 12-column grid is industry standard");
    }
    
    if (gutterNum >= 20 && gutterNum <= 30) {
      recommendations.push("✅ Gutter width is within recommended range");
    }

    recommendations.push(`💻 CSS Grid: Use 'gap' property for modern browsers`);
    recommendations.push(`📱 Consider responsive breakpoints for different screen sizes`);

    setResult({
      containerWidth: containerNum,
      columns: columnsNum,
      gutterWidth: gutterNum,
      margin: marginNum,
      columnWidth: parseFloat(columnWidth.toFixed(1)),
      totalGutterWidth,
      cssGrid,
      cssFlex,
      recommendations,
    });
  };

  const reset = () => {
    setContainerWidth("1200");
    setColumns("12");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Grid Layout Calculator – Calculate Column Widths, Gutters & Margins for Web Design
          </h1>
          <p className="text-muted-foreground">
            Build perfect grid layouts with our Grid Layout Calculator.
            Enter your container width, number of columns, and gutter size to calculate
            precise column widths and margins — essential for responsive web design and print layout.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="container">Container Width</Label>
                  <Input
                    id="container"
                    type="number"
                    value={containerWidth}
                    onChange={(e) => setContainerWidth(e.target.value)}
                    placeholder="1200"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="px">px</SelectItem>
                      <SelectItem value="rem">rem</SelectItem>
                      <SelectItem value="em">em</SelectItem>
                      <SelectItem value="%">%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="columns">Columns</Label>
                  <Input
                    id="columns"
                    type="number"
                    value={columns}
                    onChange={(e) => setColumns(e.target.value)}
                    placeholder="12"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="gutter">Gutter</Label>
                  <Input
                    id="gutter"
                    type="number"
                    value={gutterWidth}
                    onChange={(e) => setGutterWidth(e.target.value)}
                    placeholder="20"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="margin">Margin</Label>
                  <Input
                    id="margin"
                    type="number"
                    value={margin}
                    onChange={(e) => setMargin(e.target.value)}
                    placeholder="20"
                  />
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Common Grid Systems:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => { setContainerWidth("1200"); setColumns("12"); setGutterWidth("20"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    Standard (1200px)
                  </button>
                  <button
                    onClick={() => { setContainerWidth("1440"); setColumns("12"); setGutterWidth("24"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    Wide (1440px)
                  </button>
                  <button
                    onClick={() => { setContainerWidth("960"); setColumns("12"); setGutterWidth("20"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    960 Grid
                  </button>
                  <button
                    onClick={() => { setContainerWidth("100%"); setColumns("12"); setGutterWidth("2"); }}
                    className="p-2 bg-muted rounded hover:bg-muted-foreground/20"
                  >
                    Fluid (%)
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Grid Calculations</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Column Width</p>
                      <p className="text-lg font-bold text-primary">{result.columnWidth}{unit}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Gutters</p>
                      <p className="text-lg font-bold text-primary">{result.columns - 1}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Total Gutters</p>
                      <p className="text-lg font-bold text-primary">{result.totalGutterWidth}{unit}</p>
                    </div>
                  </div>

                  {/* Visual grid representation */}
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">Visual Representation:</p>
                    <div className="flex gap-1">
                      {Array.from({ length: result.columns }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-primary/20 h-8 rounded"
                          style={{ flex: 1 }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      {result.columns} columns × {result.columnWidth}{unit} + {result.columns - 1} gutters × {result.gutterWidth}{unit}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">CSS Grid Code</h4>
                    <pre className="p-3 bg-muted rounded-lg text-xs overflow-x-auto font-mono">
                      {result.cssGrid}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">CSS Flex Code</h4>
                    <pre className="p-3 bg-muted rounded-lg text-xs overflow-x-auto font-mono">
                      {result.cssFlex}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Tips</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter grid settings and click Calculate to see calculations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Grid System Best Practices
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>12 columns:</strong> Most flexible, divisible by 2, 3, 4, 6
                  </li>
                  <li>
                    <strong>Gutter width:</strong> 20-30px for desktop, 10-15px for mobile
                  </li>
                  <li>
                    <strong>Container margins:</strong> Match gutter width for consistency
                  </li>
                  <li>
                    <strong>Responsive:</strong> Use different column counts at breakpoints
                  </li>
                </ul>
                <p>
                  <strong>Formula:</strong> Column Width = (Container - 2×Margin - (Columns-1)×Gutter) / Columns
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
