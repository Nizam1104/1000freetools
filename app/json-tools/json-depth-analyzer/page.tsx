"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export default function JsonDepthAnalyzerPage() {
  const [input, setInput] = useState("");
  const [maxDepth, setMaxDepth] = useState<number | null>(null);
  const [depthDetails, setDepthDetails] = useState<string | null>(null);

  const calculateDepth = useCallback((obj: any, currentDepth: number = 0): number => {
    if (obj === null || typeof obj !== "object") {
      return currentDepth;
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) return currentDepth + 1;
      return Math.max(...obj.map(item => calculateDepth(item, currentDepth + 1)));
    }

    const keys = Object.keys(obj);
    if (keys.length === 0) return currentDepth + 1;

    return Math.max(...keys.map(key => calculateDepth(obj[key], currentDepth + 1)));
  }, []);

  const findDeepestPath = useCallback((obj: any, currentPath: string = "$", currentDepth: number = 0): { path: string; depth: number } => {
    if (obj === null || typeof obj !== "object") {
      return { path: currentPath, depth: currentDepth };
    }

    let maxResult = { path: currentPath, depth: currentDepth };

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        const result = findDeepestPath(item, `${currentPath}[${index}]`, currentDepth + 1);
        if (result.depth > maxResult.depth) {
          maxResult = result;
        }
      });
    } else {
      Object.entries(obj).forEach(([key, value]) => {
        const result = findDeepestPath(value, `${currentPath}.${key}`, currentDepth + 1);
        if (result.depth > maxResult.depth) {
          maxResult = result;
        }
      });
    }

    return maxResult;
  }, []);

  const analyzeDepth = useCallback(() => {
    setMaxDepth(null);
    setDepthDetails(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const depth = calculateDepth(obj);
    const deepest = findDeepestPath(obj);

    setMaxDepth(depth);
    setDepthDetails(`Deepest path: ${deepest.path} (depth: ${deepest.depth})`);
    toast.success(`Maximum depth: ${depth}`);
  }, [input, calculateDepth, findDeepestPath]);

  const clearAll = () => {
    setInput("");
    setMaxDepth(null);
    setDepthDetails(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      level1: {
        level2: {
          level3: {
            level4: {
              deepest: "value"
            }
          }
        }
      }
    }, null, 2));
  };

  const copyResult = () => {
    if (maxDepth !== null && depthDetails) {
      navigator.clipboard.writeText(`Max Depth: ${maxDepth}\n${depthDetails}`);
      toast.success("Depth analysis copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Depth Analyzer – Check Nesting Depth</h1>
          <p className="text-muted-foreground">
            Calculate the maximum nesting depth of any JSON structure instantly. Our free JSON Depth Analyzer helps developers understand complexity and avoid deeply nested data issues.
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
                {maxDepth !== null && (
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
                <Button onClick={analyzeDepth}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
              Input JSON
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"level1": {"level2": {"level3": "value"}}}'
              className="min-h-[300px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Result */}
        {maxDepth !== null && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  <span className="text-3xl font-bold text-primary-foreground">{maxDepth}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Maximum Nesting Depth</h3>
                  <p className="text-muted-foreground text-sm mt-1">{depthDetails}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
