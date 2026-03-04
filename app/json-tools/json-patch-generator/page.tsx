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
      </div>
    </div>
  );
}
