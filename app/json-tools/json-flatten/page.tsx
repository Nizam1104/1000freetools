"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/ui/json-editor";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function JsonFlattenPage() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState(".");
  const [preserveArrays, setPreserveArrays] = useState(false);
  const [flattened, setFlattened] = useState<string | null>(null);

  const flattenObject = useCallback(
    (obj: any, prefix = "", result: any = {}): any => {
      if (obj !== null && typeof obj === "object") {
        if (Array.isArray(obj)) {
          if (preserveArrays) {
            result[prefix] = obj;
          } else {
            obj.forEach((item, index) => {
              flattenObject(
                item,
                `${prefix}${prefix ? separator : ""}${index}`,
                result,
              );
            });
          }
        } else {
          Object.entries(obj).forEach(([key, value]) => {
            flattenObject(
              value,
              `${prefix}${prefix ? separator : ""}${key}`,
              result,
            );
          });
        }
      } else {
        result[prefix] = obj;
      }
      return result;
    },
    [separator, preserveArrays],
  );

  const flattenJson = useCallback(() => {
    setFlattened(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const flattened = flattenObject(obj);
    setFlattened(JSON.stringify(flattened, null, 2));
    toast.success("JSON flattened successfully");
  }, [input, flattenObject]);

  const clearAll = () => {
    setInput("");
    setFlattened(null);
  };

  const loadSample = () => {
    setInput(
      JSON.stringify(
        {
          user: {
            name: "John",
            address: {
              city: "NYC",
              zip: "10001",
            },
            hobbies: ["reading", "coding"],
          },
          active: true,
        },
        null,
        2,
      ),
    );
  };

  const copyResult = () => {
    if (flattened) {
      navigator.clipboard.writeText(flattened);
      toast.success("Flattened JSON copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (flattened) {
      const blob = new Blob([flattened], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "flattened.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Flattened JSON downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Flatten Tool – Flatten Nested JSON Online
          </h1>
          <p className="text-muted-foreground">
            Flatten deeply nested JSON into simple dot-notation key-value pairs.
            Our free JSON Flatten Tool makes complex data easier to process,
            store, and analyze in flat systems.
          </p>
        </div>

        {/* When to Flatten */}
        <Card className="mb-6 border-l-4 border-l-primary">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold mb-3">
              When to Use JSON Flatten
            </h2>
            <p className="text-muted-foreground mb-4">
              Your JSON has multiple levels of nesting that make it hard to work
              with in certain contexts. Database columns, form submissions, and
              environment variables all prefer flat key-value structures.
              Manually restructuring nested JSON is tedious and error-prone.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                Database imports
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                Form data
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                CSV conversion
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                Analytics
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                Key extraction
              </span>
            </div>
          </CardContent>
        </Card>

        {/* How Flattening Works */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">How Flattening Works</h2>
          <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2 text-muted-foreground">
                  Before (Nested):
                </h3>
                <pre className="text-xs bg-background p-3 rounded overflow-auto">
                  {`{
  "user": {
    "name": "John",
    "address": {
      "city": "NYC",
      "zip": "10001"
    }
  }
}`}
                </pre>
              </div>
              <div>
                <h3 className="font-medium mb-2 text-muted-foreground">
                  After (Flattened):
                </h3>
                <pre className="text-xs bg-background p-3 rounded overflow-auto">
                  {`{
  "user.name": "John",
  "user.address.city": "NYC",
  "user.address.zip": "10001"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Sample
                </Button>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="separator"
                    className="text-sm whitespace-nowrap"
                  >
                    Separator:
                  </Label>
                  <input
                    id="separator"
                    type="text"
                    value={separator}
                    onChange={(e) => setSeparator(e.target.value)}
                    className="w-16 h-9 px-3 text-sm border rounded-md bg-background"
                    maxLength={3}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="preserveArrays"
                    checked={preserveArrays}
                    onCheckedChange={(checked) =>
                      setPreserveArrays(checked as boolean)
                    }
                  />
                  <Label htmlFor="preserveArrays" className="text-sm">
                    Preserve Arrays
                  </Label>
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {flattened && (
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
                <Button onClick={flattenJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Flatten
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input and Result */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Input */}
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input JSON
              </Label>
              <JsonEditor
                id="input"
                value={input}
                onChange={setInput}
                placeholder='{"user": {"name": "John", "address": {"city": "NYC"}}}'
              />
            </CardContent>
          </Card>

          {/* Result */}
          {flattened && (
            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                  Flattened Result
                </Label>
                <JsonEditor
                  value={flattened}
                  readOnly
                  placeholder="Flattened JSON will appear here..."
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON Flatten Tool</h2>
        <p className="text-muted-foreground mb-6">
          Nested JSON is great for structure but sometimes you need flat
          key-value pairs. This tool flattens nested objects by joining keys
          with a separator, turning deep structures into single-level objects.
          It also unflattens dot-notation keys back into nested JSON.
        </p>

        <h3 className="text-xl font-semibold mb-3">How flattening works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your nested JSON and choose a separator like dot or underscore.
          Click Flatten and nested paths become single keys like
          user.address.city. Arrays get indexed keys like items.0.name. The
          result is a flat object with all values at the top level.
        </p>
        <p className="text-muted-foreground mb-8">
          To unflatten, paste dot-notation JSON and click Unflatten. Keys like
          user.profile.name get rebuilt into nested objects. This is useful for
          converting between flat config formats and nested structures.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          Your database stores flat key-value pairs but your app uses nested
          JSON. Or you need to export nested config as environment variables.
          This tool also helps when working with form data that uses dot
          notation for nested fields.
        </p>
        <p className="text-muted-foreground mb-8">
          Flattening loses some structure information. Arrays become indexed
          keys. Empty objects and null values need special handling. For complex
          structures, review the output to ensure it meets your needs.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">What separators can I use?</p>
            <p className="text-muted-foreground">
              Common choices are dot (.), underscore (_), or slash (/). Avoid
              separators that might appear in your keys naturally.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">How are arrays handled?</p>
            <p className="text-muted-foreground">
              Array items get numeric indices. An array item becomes items.0,
              items.1, etc. This preserves order when unflattening.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I flatten very deep objects?</p>
            <p className="text-muted-foreground">
              Yes, but very deep nesting creates very long keys. Consider
              restructuring deeply nested data if possible.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">
              Does unflatten work with any flat object?
            </p>
            <p className="text-muted-foreground">
              Keys need to follow the dot-notation pattern. Random flat keys
              won't create meaningful nested structures.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">
              What about empty objects or null?
            </p>
            <p className="text-muted-foreground">
              Empty objects may disappear when flattening. Null values are
              preserved as explicit keys with null values.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a
              href="/json-tools/json-unflatten"
              className="text-primary hover:underline"
            >
              JSON Unflatten
            </a>{" "}
            – Convert flat keys back to nested JSON
          </li>
          <li>
            <a
              href="/json-tools/json-transformer"
              className="text-primary hover:underline"
            >
              JSON Transformer
            </a>{" "}
            – Transform JSON structure with custom rules
          </li>
          <li>
            <a
              href="/json-tools/json-nested-structure"
              className="text-primary hover:underline"
            >
              JSON Nested Structure
            </a>{" "}
            – Work with deeply nested JSON
          </li>
        </ul>
      </div>
    </div>
  );
}
