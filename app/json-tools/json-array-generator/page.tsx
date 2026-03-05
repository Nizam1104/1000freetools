"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { JsonEditor } from "@/components/ui/json-editor";

export default function JsonArrayGeneratorPage() {
  const [length, setLength] = useState(5);
  const [valueType, setValueType] = useState<
    "number" | "string" | "boolean" | "object"
  >("number");
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Array Generator – Generate JSON Arrays Online
          </h1>
          <p className="text-muted-foreground">
            Generate JSON arrays with configurable length, types, and value
            ranges instantly. Our free JSON Array Generator is ideal for
            creating test data, mock datasets, and demos.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="length" className="text-sm whitespace-nowrap">
                    Array Length:
                  </Label>
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
                  <Label
                    htmlFor="valueType"
                    className="text-sm whitespace-nowrap"
                  >
                    Value Type:
                  </Label>
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadResult}
                    >
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
          <Card className="mb-6">
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated Array
              </Label>
              <JsonEditor
                value={result}
                readOnly
              />
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Array Generator
          </h2>
          <p className="text-muted-foreground mb-6">
            Writing test data by hand is tedious and error-prone. This tool
            generates JSON arrays instantly with configurable length and value
            types, giving you realistic mock data for testing APIs, components,
            and demos without the manual work.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Set the array length using the Array Length input (up to 1000 items)
            and choose a value type from the dropdown: Number, String, Boolean,
            or Object. Click Generate and the tool creates an array with random
            values of your chosen type.
          </p>
          <p className="text-muted-foreground mb-8">
            Numbers are random integers up to 1000, strings follow the pattern
            item_0, item_1, booleans are random true or false, and objects
            include an id and random value. Copy or download the result directly
            from the page.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You need sample data to test how your UI handles lists of different
            sizes. Generate arrays with 10, 100, or 1000 items to verify
            pagination, virtualization, and performance under load.
          </p>
          <p className="text-muted-foreground mb-8">
            This generates simple random data, not realistic domain-specific
            values. For complex test scenarios with specific patterns or
            relationships, you'll need a more advanced mock data generator.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                What value types can I generate?
              </p>
              <p className="text-muted-foreground">
                Choose from Number (random integers), String (item_0 pattern),
                Boolean (random true/false), or Object (with id and value
                properties).
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">How large can the array be?</p>
              <p className="text-muted-foreground">
                The maximum length is 1000 items. Larger arrays may slow down
                your browser, so keep it reasonable for testing purposes.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I generate the same data twice?
              </p>
              <p className="text-muted-foreground">
                No, values are randomly generated each time. If you need
                reproducible data, copy the result and save it for reuse.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                How do I get the generated array?
              </p>
              <p className="text-muted-foreground">
                Use the Copy button to paste into your code, or Download to save
                as a JSON file. Both options are available after generation.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Is this data suitable for production?
              </p>
              <p className="text-muted-foreground">
                No, this is for testing and development only. Production data
                should come from your actual database or API, not random
                generators.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-nested-structure"
                className="text-primary hover:underline"
              >
                JSON Nested Structure Generator
              </a>{" "}
              – Create deeply nested JSON
            </li>
            <li>
              <a
                href="/json-tools/json-object-generator"
                className="text-primary hover:underline"
              >
                JSON Object Generator
              </a>{" "}
              – Generate mock objects
            </li>
            <li>
              <a
                href="/json-tools/json-array-object-counter"
                className="text-primary hover:underline"
              >
                JSON Array & Object Counter
              </a>{" "}
              – Count elements in JSON
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
