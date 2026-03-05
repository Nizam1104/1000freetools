"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

interface PatchOperation {
  op: "add" | "remove" | "replace" | "move" | "copy" | "test";
  path: string;
  value?: any;
  from?: string;
}

export default function JsonPatchGeneratorPage() {
  const [sourceJson, setSourceJson] = useState("");
  const [targetJson, setTargetJson] = useState("");
  const [patches, setPatches] = useState<PatchOperation[] | null>(null);

  const generatePath = (obj: any, key: string | number, parentPath: string): string => {
    const keyStr = typeof key === "number" ? `/${key}` : `/${key.toString().replace(/~/g, "~0").replace(/\//g, "~1")}`;
    return parentPath + keyStr;
  };

  const generatePatches = useCallback((source: any, target: any, path: string = ""): PatchOperation[] => {
    const operations: PatchOperation[] = [];

    if (source === target) return operations;

    if (typeof source !== typeof target) {
      operations.push({ op: "replace", path: path || "/", value: target });
      return operations;
    }

    if (Array.isArray(source) && Array.isArray(target)) {
      const maxLength = Math.max(source.length, target.length);
      for (let i = 0; i < maxLength; i++) {
        const itemPath = `${path}/${i}`;
        if (i >= source.length) {
          operations.push({ op: "add", path: itemPath, value: target[i] });
        } else if (i >= target.length) {
          operations.push({ op: "remove", path: itemPath });
        } else {
          operations.push(...generatePatches(source[i], target[i], itemPath));
        }
      }
    } else if (typeof source === "object" && source !== null && typeof target === "object" && target !== null) {
      const allKeys = new Set([...Object.keys(source), ...Object.keys(target)]);
      for (const key of allKeys) {
        const keyPath = generatePath(source, key, path);
        if (!(key in source)) {
          operations.push({ op: "add", path: keyPath, value: target[key] });
        } else if (!(key in target)) {
          operations.push({ op: "remove", path: keyPath });
        } else {
          operations.push(...generatePatches(source[key], target[key], keyPath));
        }
      }
    } else if (source !== target) {
      operations.push({ op: "replace", path: path || "/", value: target });
    }

    return operations;
  }, []);

  const generatePatch = useCallback(() => {
    setPatches(null);

    let source: any, target: any;

    try {
      source = sourceJson.trim() ? JSON.parse(sourceJson) : {};
    } catch (e) {
      toast.error(`Source JSON is invalid: ${(e as Error).message}`);
      return;
    }

    try {
      target = targetJson.trim() ? JSON.parse(targetJson) : {};
    } catch (e) {
      toast.error(`Target JSON is invalid: ${(e as Error).message}`);
      return;
    }

    const operations = generatePatches(source, target);
    setPatches(operations);
    toast.success(`Generated ${operations.length} patch operation(s)`);
  }, [sourceJson, targetJson, generatePatches]);

  const clearAll = () => {
    setSourceJson("");
    setTargetJson("");
    setPatches(null);
  };

  const loadSample = () => {
    setSourceJson(JSON.stringify({ name: "John", age: 30, city: "NYC" }, null, 2));
    setTargetJson(JSON.stringify({ name: "Jane", age: 30, country: "USA" }, null, 2));
  };

  const copyResult = () => {
    if (patches) {
      navigator.clipboard.writeText(JSON.stringify(patches, null, 2));
      toast.success("Patch operations copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (patches) {
      const blob = new Blob([JSON.stringify(patches, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "json-patch.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Patch operations downloaded");
    }
  };

  const applyPatch = () => {
    if (!patches || !sourceJson) return;

    try {
      let source = JSON.parse(sourceJson);
      for (const patch of patches) {
        const pathParts = patch.path.slice(1).split("/").map(p => p.replace(/~1/g, "/").replace(/~0/g, "~"));

        if (patch.op === "add" || patch.op === "replace") {
          let obj = source;
          for (let i = 0; i < pathParts.length - 1; i++) {
            obj = obj[pathParts[i]];
          }
          obj[pathParts[pathParts.length - 1]] = patch.value;
        } else if (patch.op === "remove") {
          let obj = source;
          for (let i = 0; i < pathParts.length - 1; i++) {
            obj = obj[pathParts[i]];
          }
          delete obj[pathParts[pathParts.length - 1]];
        }
      }
      setTargetJson(JSON.stringify(source, null, 2));
      toast.success("Patch applied successfully");
    } catch (e) {
      toast.error(`Failed to apply patch: ${(e as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Patch Generator – Generate Patch Operations</h1>
          <p className="text-muted-foreground">
            Generate RFC 6902 JSON Patch operations to transform one JSON document into another. Our free tool is ideal for versioning APIs and tracking incremental JSON changes.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Sample
                </Button>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {patches && (
                  <>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadResult}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={applyPatch}>
                      Apply to Source
                    </Button>
                  </>
                )}
                <Button onClick={generatePatch}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Generate Patch
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="source" className="text-sm font-medium text-muted-foreground mb-2 block">
                Source JSON
              </Label>
              <Textarea
                id="source"
                value={sourceJson}
                onChange={(e) => setSourceJson(e.target.value)}
                placeholder='{"name": "John", "age": 30}'
                className="min-h-[300px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label htmlFor="target" className="text-sm font-medium text-muted-foreground mb-2 block">
                Target JSON
              </Label>
              <Textarea
                id="target"
                value={targetJson}
                onChange={(e) => setTargetJson(e.target.value)}
                placeholder='{"name": "Jane", "country": "USA"}'
                className="min-h-[300px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        </div>

        {/* Result */}
        {patches && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Patch Operations ({patches.length})
              </Label>
              <div className="space-y-2">
                {patches.map((patch, index) => (
                  <div key={index} className="bg-muted rounded-md p-3 font-mono text-sm">
                    <span className="text-primary font-semibold">{patch.op}</span>
                    <span className="text-muted-foreground ml-2">{patch.path}</span>
                    {patch.value !== undefined && (
                      <span className="text-green-600 dark:text-green-400 ml-2">
                        → {JSON.stringify(patch.value)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <Textarea
                value={JSON.stringify(patches, null, 2)}
                readOnly
                className="min-h-[200px] font-mono text-sm resize-none mt-4"
              />
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON Patch Generator</h2>
          <p className="text-muted-foreground mb-6">
            Tracking changes between two JSON documents manually is error-prone. This tool automatically generates RFC 6902 JSON Patch operations that describe exactly how to transform one document into another, perfect for version control and sync operations.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Provide your original JSON as the source and your desired result as the target. The tool compares both documents and produces a sequence of add, remove, and replace operations needed to convert source into target.
          </p>
          <p className="text-muted-foreground mb-8">
            Each operation includes a JSONPath-style path pointing to the exact location of the change. You can review the operations before applying them or use them directly in your application's patch logic.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You're building a collaborative editor where multiple users modify shared JSON data. Instead of sending entire documents, transmit only the patch operations to reduce bandwidth and enable conflict resolution.
          </p>
          <p className="text-muted-foreground mb-8">
            The generated patches follow RFC 6902 but don't support all advanced operations like move or copy. For complex scenarios, you may need a full JSON Patch library with complete RFC compliance.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">What operations does this tool generate?</p>
              <p className="text-muted-foreground">The tool generates add, remove, and replace operations. These cover most common change scenarios like adding new fields, deleting old ones, and updating values.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I apply the patches back?</p>
              <p className="text-muted-foreground">Yes, click Apply to Source to see the patches transform your original JSON into the target. This verifies the patch operations work correctly.</p>
            </div>
            <div>
              <p className="font-medium mb-1">How are array changes handled?</p>
              <p className="text-muted-foreground">Array modifications use numeric indices in the path. Adding or removing array items generates operations with specific index positions for precise changes.</p>
            </div>
            <div>
              <p className="font-medium mb-1">What if both JSONs are identical?</p>
              <p className="text-muted-foreground">The tool will generate an empty patch list since no operations are needed. This is useful for verifying that two documents are truly equivalent.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I download the patch operations?</p>
              <p className="text-muted-foreground">Yes. Use the Download button to save patches as a JSON file, or Copy to paste them into your code. The format is ready to use with JSON Patch libraries.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="/json-tools/json-diff" className="text-primary hover:underline">JSON Diff</a> – Compare two JSON objects visually
            </li>
            <li>
              <a href="/json-tools/json-merge" className="text-primary hover:underline">JSON Merge</a> – Combine multiple JSON documents
            </li>
            <li>
              <a href="/json-tools/json-transformer" className="text-primary hover:underline">JSON Transformer</a> – Reshape JSON with custom rules
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
