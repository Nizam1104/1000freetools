"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

export default function JsonNestedStructureGeneratorPage() {
  const [depth, setDepth] = useState(5);
  const [branchingFactor, setBranchingFactor] = useState(2);
  const [result, setResult] = useState<string | null>(null);

  const generateNested = useCallback((currentDepth: number, maxDepth: number, branching: number): any => {
    if (currentDepth >= maxDepth) {
      return {
        value: `leaf_${currentDepth}`,
        depth: currentDepth
      };
    }

    const obj: any = {
      level: currentDepth,
      children: []
    };

    for (let i = 0; i < branching; i++) {
      obj.children.push(generateNested(currentDepth + 1, maxDepth, branching));
    }

    return obj;
  }, []);

  const generateStructure = useCallback(() => {
    const structure = generateNested(0, depth, branchingFactor);
    setResult(JSON.stringify(structure, null, 2));
    toast.success(`Generated nested structure with depth ${depth}`);
  }, [depth, branchingFactor, generateNested]);

  const clearAll = () => {
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Nested structure copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nested-structure.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Nested structure downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Nested Structure Generator Online</h1>
          <p className="text-muted-foreground">
            Generate deeply nested JSON structures for stress testing parsers, UIs, and APIs. Our free tool lets you configure nesting depth and breadth to simulate complex real-world data.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="depth" className="text-sm whitespace-nowrap">Depth:</Label>
                  <Input
                    id="depth"
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(parseInt(e.target.value) || 1)}
                    min={1}
                    max={20}
                    className="w-20 h-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="branching" className="text-sm whitespace-nowrap">Branching:</Label>
                  <Input
                    id="branching"
                    type="number"
                    value={branchingFactor}
                    onChange={(e) => setBranchingFactor(parseInt(e.target.value) || 1)}
                    min={1}
                    max={10}
                    className="w-20 h-9"
                  />
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
                <Button onClick={generateStructure}>
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
                Generated Nested Structure
              </Label>
              <Textarea
                value={result}
                readOnly
                className="min-h-[400px] font-mono text-sm resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Size: {new Blob([result]).size} bytes
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
