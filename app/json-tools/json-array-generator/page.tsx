"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function JsonArrayGeneratorPage() {
  const [length, setLength] = useState(5);
  const [valueType, setValueType] = useState<"number" | "string" | "boolean" | "object">("number");
  const [result, setResult] = useState<string | null>(null);

  const generateValue = (type: string, index: number): any => {
    switch (type) {
      case "number":
        return Math.floor(Math.random() * 1000);
      case "string":
        return `item_${index}`;
      case "boolean":
        return Math.random() > 0.5;
      case "object":
        return { id: index, value: Math.floor(Math.random() * 100) };
      default:
        return index;
    }
  };

  const generateArray = useCallback(() => {
    const arr = Array.from({ length }, (_, i) => generateValue(valueType, i));
    setResult(JSON.stringify(arr, null, 2));
    toast.success(`Generated array with ${length} items`);
  }, [length, valueType]);

  const clearAll = () => {
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Generated array copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated-array.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Generated array downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Array Generator – Generate JSON Arrays Online</h1>
          <p className="text-muted-foreground">
            Generate JSON arrays with configurable length, types, and value ranges instantly. Our free JSON Array Generator is ideal for creating test data, mock datasets, and demos.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="length" className="text-sm whitespace-nowrap">Array Length:</Label>
                  <Input
                    id="length"
                    type="number"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value) || 1)}
                    min={1}
                    max={1000}
                    className="w-24 h-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="valueType" className="text-sm whitespace-nowrap">Value Type:</Label>
                  <select
                    id="valueType"
                    value={valueType}
                    onChange={(e) => setValueType(e.target.value as any)}
                    className="h-9 px-3 text-sm border rounded-md bg-background"
                  >
                    <option value="number">Number</option>
                    <option value="string">String</option>
                    <option value="boolean">Boolean</option>
                    <option value="object">Object</option>
                  </select>
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {result && (
                  <>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadResult}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
                <Button onClick={generateArray}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated Array
              </Label>
              <Textarea
                value={result}
                readOnly
                className="min-h-[300px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
