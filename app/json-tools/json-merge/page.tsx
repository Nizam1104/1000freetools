"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { NativeSelect as Select } from "@/components/ui/native-select";

type MergeStrategy = "shallow" | "deep" | "overwrite";

export default function JsonMergePage() {
  const [json1, setJson1] = useState("");
  const [json2, setJson2] = useState("");
  const [strategy, setStrategy] = useState<MergeStrategy>("deep");
  const [mergedResult, setMergedResult] = useState<string | null>(null);

  const deepMerge = (target: any, source: any): any => {
    const result = { ...target };
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  };

  const mergeJson = useCallback(() => {
    setMergedResult(null);

    let obj1: any, obj2: any;

    try {
      obj1 = json1.trim() ? JSON.parse(json1) : {};
    } catch (e) {
      toast.error(`JSON 1 is invalid: ${(e as Error).message}`);
      return;
    }

    try {
      obj2 = json2.trim() ? JSON.parse(json2) : {};
    } catch (e) {
      toast.error(`JSON 2 is invalid: ${(e as Error).message}`);
      return;
    }

    let merged: any;
    switch (strategy) {
      case "shallow":
        merged = { ...obj1, ...obj2 };
        break;
      case "deep":
        merged = deepMerge(obj1, obj2);
        break;
      case "overwrite":
        merged = obj2;
        break;
    }

    setMergedResult(JSON.stringify(merged, null, 2));
    toast.success("JSON merged successfully");
  }, [json1, json2, strategy]);

  const clearAll = () => {
    setJson1("");
    setJson2("");
    setMergedResult(null);
  };

  const loadSample = () => {
    setJson1(JSON.stringify({ a: 1, b: { x: 10, y: 20 }, c: "hello" }, null, 2));
    setJson2(JSON.stringify({ b: { y: 200, z: 30 }, d: "world" }, null, 2));
  };

  const copyResult = () => {
    if (mergedResult) {
      navigator.clipboard.writeText(mergedResult);
      toast.success("Merged JSON copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (mergedResult) {
      const blob = new Blob([mergedResult], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Merged JSON downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Merge Tool – Combine JSON Objects Online</h1>
          <p className="text-muted-foreground">
            Merge multiple JSON objects using configurable merge strategies. Our free JSON Merge Tool handles deep merges, overwrites, and conflict resolution for complex data structures.
          </p>
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
                <Label className="text-sm">Strategy:</Label>
                <Select
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value as MergeStrategy)}
                  className="text-sm"
                >
                  <option value="deep">Deep Merge</option>
                  <option value="shallow">Shallow Merge</option>
                  <option value="overwrite">Overwrite</option>
                </Select>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {mergedResult && (
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
                <Button onClick={mergeJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Merge
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="json1" className="text-sm font-medium text-muted-foreground mb-2 block">
                JSON Object 1
              </Label>
              <JsonEditor
                id="json1"
                value={json1}
                onChange={setJson1}
                placeholder='{"a": 1, "b": {"x": 10}}'
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label htmlFor="json2" className="text-sm font-medium text-muted-foreground mb-2 block">
                JSON Object 2
              </Label>
              <JsonEditor
                id="json2"
                value={json2}
                onChange={setJson2}
                placeholder='{"b": {"y": 20}, "c": "hello"}'
              />
            </CardContent>
          </Card>
        </div>

        {/* Result */}
        {mergedResult && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Merged Result
              </Label>
              <JsonEditor
                value={mergedResult}
                readOnly
                placeholder="Merged JSON will appear here..."
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON Merge Tool</h2>
        <p className="text-muted-foreground mb-6">
          Merging two JSON objects sounds simple until you have nested structures. Should nested objects merge recursively or overwrite completely? This tool gives you control over the merge strategy, handling everything from shallow copies to deep recursive merges of complex nested data.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the merge works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your first JSON object and second JSON object in their respective panels. Choose a merge strategy from the dropdown: Deep Merge combines nested objects recursively, Shallow Merge overwrites nested objects entirely, and Overwrite replaces the first object with the second.
        </p>
        <p className="text-muted-foreground mb-8">
          Click the Merge button and the result appears below. Properties from the second object take precedence when there are conflicts. Arrays are replaced, not concatenated. Use Copy or Download to export your merged JSON.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You have a base configuration object and need to apply environment-specific overrides. Or you're combining API responses from multiple sources into a single object. This tool also helps when building up complex objects from partial data sources.
        </p>
        <p className="text-muted-foreground mb-8">
          Note that this tool merges objects at the key level. Arrays get replaced entirely rather than merged element-by-element. For array merging you'd need custom logic based on your specific needs.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">What's the difference between deep and shallow merge?</p>
            <p className="text-muted-foreground">Deep merge recursively combines nested objects. Shallow merge only merges top-level keys, replacing any nested objects entirely with the second object's version.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How are array conflicts handled?</p>
            <p className="text-muted-foreground">Arrays are always replaced, not merged. If both objects have a "tags" array, the second object's array wins completely.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I merge more than two objects?</p>
            <p className="text-muted-foreground">Not directly. Merge two at a time, using the result as input for the next merge. Or use a programming language for batch merging.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What happens with null values?</p>
            <p className="text-muted-foreground">Null is treated as a valid value. If the second object has null for a key, it overwrites whatever was in the first object.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Does this preserve the order of keys?</p>
            <p className="text-muted-foreground">Modern JavaScript preserves insertion order for object keys. The merged result will have keys from the first object followed by new keys from the second.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-diff" className="text-primary hover:underline">JSON Diff</a> – Compare two JSON objects and see the differences
          </li>
          <li>
            <a href="/json-tools/json-transformer" className="text-primary hover:underline">JSON Transformer</a> – Transform JSON structure with custom rules
          </li>
          <li>
            <a href="/json-tools/json-rename-keys" className="text-primary hover:underline">JSON Rename Keys</a> – Rename keys in your JSON objects
          </li>
        </ul>
      </div>
    </div>
  );
}
