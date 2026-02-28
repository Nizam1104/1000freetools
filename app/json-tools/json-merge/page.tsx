"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
              <Textarea
                id="json1"
                value={json1}
                onChange={(e) => setJson1(e.target.value)}
                placeholder='{"a": 1, "b": {"x": 10}}'
                className="min-h-[300px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label htmlFor="json2" className="text-sm font-medium text-muted-foreground mb-2 block">
                JSON Object 2
              </Label>
              <Textarea
                id="json2"
                value={json2}
                onChange={(e) => setJson2(e.target.value)}
                placeholder='{"b": {"y": 20}, "c": "hello"}'
                className="min-h-[300px] font-mono text-sm resize-none"
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
              <Textarea
                value={mergedResult}
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
