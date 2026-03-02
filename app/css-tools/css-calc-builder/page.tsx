"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, Plus, Trash2 } from "lucide-react";

interface CalcOperation {
  id: string;
  type: "add" | "subtract" | "multiply" | "divide";
  value: string;
  unit: string;
}

export default function CssCalcBuilderPage() {
  const [baseValue, setBaseValue] = useState(100);
  const [baseUnit, setBaseUnit] = useState("%");
  const [operations, setOperations] = useState<CalcOperation[]>([
    { id: "1", type: "subtract", value: "20", unit: "px" },
  ]);
  const [resultUnit, setResultUnit] = useState<"auto" | "px" | "rem" | "em" | "%" | "vw" | "vh">("auto");

  const addOperation = () => {
    const newOp: CalcOperation = {
      id: Date.now().toString(),
      type: "add",
      value: "10",
      unit: "px",
    };
    setOperations([...operations, newOp]);
  };

  const removeOperation = (id: string) => {
    setOperations(operations.filter((op) => op.id !== id));
  };

  const updateOperation = (id: string, updates: Partial<CalcOperation>) => {
    setOperations(operations.map((op) => (op.id === id ? { ...op, ...updates } : op)));
  };

  const generateCalcExpression = () => {
    let expression = `${baseValue}${baseUnit}`;
    
    operations.forEach((op) => {
      const operator = op.type === "add" ? "+" : op.type === "subtract" ? "-" : op.type === "multiply" ? "*" : "/";
      expression += ` ${operator} ${op.value}${op.unit}`;
    });
    
    return expression;
  };

  const generateCSS = () => {
    const expression = generateCalcExpression();
    return `calc(${expression})`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const calcExpression = generateCalcExpression();
  const cssCode = generateCSS();

  const commonUnits = ["px", "rem", "em", "%", "vw", "vh", "vmin", "vmax"];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSS calc() Builder</h1>
        <p className="text-muted-foreground">
          Build complex CSS calc() expressions visually. Combine different units and operations for responsive layouts.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Base Value</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Label>Value</Label>
                  <Input
                    type="number"
                    value={baseValue}
                    onChange={(e) => setBaseValue(parseFloat(e.target.value) || 0)}
                    className="mt-2"
                  />
                </div>
                <div className="w-32">
                  <Label>Unit</Label>
                  <Select value={baseUnit} onValueChange={setBaseUnit}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="%">%</SelectItem>
                      <SelectItem value="px">px</SelectItem>
                      <SelectItem value="rem">rem</SelectItem>
                      <SelectItem value="em">em</SelectItem>
                      <SelectItem value="vw">vw</SelectItem>
                      <SelectItem value="vh">vh</SelectItem>
                      <SelectItem value="vmin">vmin</SelectItem>
                      <SelectItem value="vmax">vmax</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Operations</CardTitle>
              <Button variant="outline" size="sm" onClick={addOperation}>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {operations.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No operations added</p>
              )}
              {operations.map((op, index) => (
                <div key={op.id} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-muted-foreground w-6">
                    {index === 0 ? "" : op.type === "add" ? "+" : op.type === "subtract" ? "−" : op.type === "multiply" ? "×" : "÷"}
                  </div>
                  <Select value={op.type} onValueChange={(v) => updateOperation(op.id, { type: v as CalcOperation["type"] })}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Add</SelectItem>
                      <SelectItem value="subtract">Subtract</SelectItem>
                      <SelectItem value="multiply">Multiply</SelectItem>
                      <SelectItem value="divide">Divide</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={op.value}
                    onChange={(e) => updateOperation(op.id, { value: e.target.value })}
                    className="w-24"
                  />
                  <Select value={op.unit} onValueChange={setUnit => updateOperation(op.id, { unit: setUnit })}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {commonUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" onClick={() => removeOperation(op.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Patterns</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setBaseValue(100);
                  setBaseUnit("%");
                  setOperations([{ id: "1", type: "subtract", value: "40", unit: "px" }]);
                }}
              >
                Full width minus padding: 100% - 40px
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBaseValue(100);
                  setBaseUnit("vw");
                  setOperations([]);
                }}
              >
                Viewport width: 100vw
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBaseValue(1);
                  setBaseUnit("rem");
                  setOperations([{ id: "1", type: "subtract", value: "0.25", unit: "rem" }]);
                }}
              >
                REM adjustment: 1rem - 0.25rem
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBaseValue(50);
                  setBaseUnit("vh");
                  setOperations([{ id: "1", type: "subtract", value: "40", unit: "px" }]);
                }}
              >
                Half viewport: 50vh - 40px
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBaseValue(100);
                  setBaseUnit("%");
                  setOperations([
                    { id: "1", type: "divide", value: "3", unit: "" },
                    { id: "2", type: "subtract", value: "10", unit: "px" },
                  ]);
                }}
              >
                Third width: 100% / 3 - 10px
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Expression Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-muted/50 rounded-lg text-center">
                <code className="text-lg font-mono">{cssCode}</code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visual Demo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Container (300px)</p>
                  <div
                    className="h-16 bg-primary rounded flex items-center justify-center text-white font-mono"
                    style={{ width: cssCode }}
                  >
                    {calcExpression}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Width Result</p>
                    <p className="text-lg font-semibold">≈ {(() => {
                      // Rough estimation for demo
                      if (baseUnit === "%") {
                        const subtractOp = operations.find(op => op.type === "subtract");
                        return baseValue - (subtractOp ? parseFloat(subtractOp.value) || 0 : 0);
                      }
                      return baseValue;
                    })()} units</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Operations</p>
                    <p className="text-lg font-semibold">{operations.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                  {`.element {
  width: ${cssCode};
}`}
                </pre>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(`.element {\n  width: ${cssCode};\n}`, "CSS Code")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <pre className="flex-1 p-3 bg-muted rounded-lg text-sm font-mono">
                  {`:root {
  --custom-width: ${cssCode};
}

.element {
  width: var(--custom-width);
}`}
                </pre>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(`:root {\n  --custom-width: ${cssCode};\n}`, "CSS Variables")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full" onClick={() => copyToClipboard(cssCode, "calc() expression")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy calc() Expression
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded">
                <strong>width:</strong> <code className="ml-2">{cssCode}</code>
              </div>
              <div className="p-3 bg-muted rounded">
                <strong>height:</strong> <code className="ml-2">{cssCode}</code>
              </div>
              <div className="p-3 bg-muted rounded">
                <strong>padding:</strong> <code className="ml-2">{cssCode}</code>
              </div>
              <div className="p-3 bg-muted rounded">
                <strong>margin:</strong> <code className="ml-2">{cssCode}</code>
              </div>
              <div className="p-3 bg-muted rounded">
                <strong>font-size:</strong> <code className="ml-2">{cssCode}</code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About CSS calc()</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              The CSS <code>calc()</code> function allows you to perform mathematical calculations when defining CSS 
              property values. It's incredibly powerful for creating responsive layouts and combining different units.
            </p>
            <p>
              You can use calc() with any CSS property that accepts length, angle, time, frequency, or number values.
              Common use cases include fluid widths, responsive spacing, and dynamic sizing.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Supported Operations</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Addition (+)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Combine values: <code>calc(100% + 20px)</code>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subtraction (−)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Subtract spacing: <code>calc(100vw - 40px)</code>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Multiplication (×)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Scale values: <code>calc(50% × 2)</code>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Division (÷)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Divide space: <code>calc(100% ÷ 3)</code>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Important Notes</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Spaces required:</strong> Always include spaces around + and − operators</li>
                <li><strong>Unit mixing:</strong> You can combine different units (px, %, rem, etc.)</li>
                <li><strong>Order of operations:</strong> Multiplication and division happen before addition and subtraction</li>
                <li><strong>Browser support:</strong> Well supported in all modern browsers</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
