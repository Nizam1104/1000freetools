"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

export default function JsonExtractSubjsonPage() {
  const [input, setInput] = useState("");
  const [keyPath, setKeyPath] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const getValueByPath = useCallback((obj: any, path: string): any => {
    if (!path || path === "$") return obj;
    
    const parts = path.replace(/^\$/, "").split(/\.|\[|\]/).filter(p => p !== "");
    let current: any = obj;

    for (const part of parts) {
      if (current === null || current === undefined) {
        return undefined;
      }
      
      if (part === "*") {
        if (Array.isArray(current)) {
          return current;
        }
        return Object.values(current);
      }
      
      const index = parseInt(part, 10);
      if (!isNaN(index)) {
        current = current[index];
      } else {
        current = current[part];
      }
    }

    return current;
  }, []);

  const extractSubjson = useCallback(() => {
    setResult(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    if (!keyPath.trim()) {
      toast.error("Please enter a key path");
      return;
    }

    const extracted = getValueByPath(obj, keyPath);
    
    if (extracted === undefined) {
      toast.error(`Path "${keyPath}" not found in JSON`);
      return;
    }

    setResult(JSON.stringify(extracted, null, 2));
    toast.success("Sub-JSON extracted successfully");
  }, [input, keyPath, getValueByPath]);

  const clearAll = () => {
    setInput("");
    setKeyPath("");
    setResult(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      status: "success",
      data: {
        user: {
          id: 1,
          name: "John",
          profile: {
            email: "john@example.com",
            settings: { theme: "dark" }
          }
        }
      }
    }, null, 2));
    setKeyPath("$.data.user.profile");
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Extracted JSON copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "extracted.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Extracted JSON downloaded");
    }
  };

  const quickPaths = [
    { label: "Root", path: "$" },
    { label: "First level", path: "$.data" },
    { label: "Nested", path: "$.data.user" },
    { label: "Deep", path: "$.data.user.profile" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Extract Tool – Extract Nested JSON by Path</h1>
          <p className="text-muted-foreground">
            Extract a specific nested portion of JSON using a key path. Our free JSON Extract Sub-JSON Tool helps you isolate exactly the data you need from large, complex JSON documents.
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
                <Button onClick={extractSubjson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Extract
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Paths */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label className="text-sm font-medium text-muted-foreground mb-2 block">
              Quick Paths
            </Label>
            <div className="flex flex-wrap gap-2">
              {quickPaths.map(q => (
                <Button
                  key={q.path}
                  variant="outline"
                  size="sm"
                  onClick={() => setKeyPath(q.path)}
                >
                  {q.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <div className="grid gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"data": {"user": {...}}}'
                className="min-h-[200px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label htmlFor="keyPath" className="text-sm font-medium text-muted-foreground mb-2 block">
                Key Path (JSONPath style)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="keyPath"
                  value={keyPath}
                  onChange={(e) => setKeyPath(e.target.value)}
                  placeholder="$.data.user.profile"
                  className="font-mono text-sm flex-1"
                  onKeyDown={(e) => e.key === "Enter" && extractSubjson()}
                />
                <Button onClick={extractSubjson}>Extract</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Use dot notation for nested paths (e.g., $.data.user.name)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Extracted Sub-JSON
              </Label>
              <Textarea
                value={result}
                readOnly
                className="min-h-[200px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
