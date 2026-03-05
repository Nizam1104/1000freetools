"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";
import { JsonEditor } from "@/components/ui/json-editor";

export default function JsonDepthAnalyzerPage() {
  const [input, setInput] = useState("");
  const [maxDepth, setMaxDepth] = useState<number | null>(null);
  const [depthDetails, setDepthDetails] = useState<string | null>(null);

  const calculateDepth = useCallback(
    (obj: any, currentDepth: number = 0): number => {
      if (obj === null || typeof obj !== "object") {
        return currentDepth;
      }

      if (Array.isArray(obj)) {
        if (obj.length === 0) return currentDepth + 1;
        return Math.max(
          ...obj.map((item) => calculateDepth(item, currentDepth + 1)),
        );
      }

      const keys = Object.keys(obj);
      if (keys.length === 0) return currentDepth + 1;

      return Math.max(
        ...keys.map((key) => calculateDepth(obj[key], currentDepth + 1)),
      );
    },
    [],
  );

  const findDeepestPath = useCallback(
    (
      obj: any,
      currentPath: string = "$",
      currentDepth: number = 0,
    ): { path: string; depth: number } => {
      if (obj === null || typeof obj !== "object") {
        return { path: currentPath, depth: currentDepth };
      }

      let maxResult = { path: currentPath, depth: currentDepth };

      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          const result = findDeepestPath(
            item,
            `${currentPath}[${index}]`,
            currentDepth + 1,
          );
          if (result.depth > maxResult.depth) {
            maxResult = result;
          }
        });
      } else {
        Object.entries(obj).forEach(([key, value]) => {
          const result = findDeepestPath(
            value,
            `${currentPath}.${key}`,
            currentDepth + 1,
          );
          if (result.depth > maxResult.depth) {
            maxResult = result;
          }
        });
      }

      return maxResult;
    },
    [],
  );

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
    setInput(
      JSON.stringify(
        {
          level1: {
            level2: {
              level3: {
                level4: {
                  deepest: "value",
                },
              },
            },
          },
        },
        null,
        2,
      ),
    );
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Depth Analyzer – Check Nesting Depth
          </h1>
          <p className="text-muted-foreground">
            Calculate the maximum nesting depth of any JSON structure instantly.
            Our free JSON Depth Analyzer helps developers understand complexity
            and avoid deeply nested data issues.
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
            <Label
              htmlFor="input"
              className="text-sm font-medium text-muted-foreground mb-2 block"
            >
              Input JSON
            </Label>
            <JsonEditor
              value={input}
              onChange={setInput}
              placeholder='{"level1": {"level2": {"level3": "value"}}}'
            />
          </CardContent>
        </Card>

        {/* Result */}
        {maxDepth !== null && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  <span className="text-3xl font-bold text-primary-foreground">
                    {maxDepth}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Maximum Nesting Depth
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {depthDetails}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Depth Analyzer
          </h2>
          <p className="text-muted-foreground mb-6">
            Deeply nested JSON can cause stack overflow errors and make code
            hard to maintain. This tool calculates the maximum nesting depth of
            your JSON structure and shows the path to the deepest value, helping
            you identify overly complex data.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON and click Analyze. The tool recursively traverses
            every level, tracking the depth as it goes. It finds the maximum
            depth and the exact path to the deepest nested value.
          </p>
          <p className="text-muted-foreground mb-8">
            Results show the depth number in a large circle, with the deepest
            path displayed below. Paths use dot notation for objects and bracket
            notation for arrays, like $.data.users[0].profile.address.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You're designing an API and want to ensure your response structure
            isn't too deeply nested. Check the depth before finalizing your
            schema to keep it manageable for consumers.
          </p>
          <p className="text-muted-foreground mb-8">
            This tool measures depth but doesn't suggest flattening strategies.
            If your JSON is too deep, you'll need to manually restructure it or
            use a flattening tool to reduce nesting.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                What counts as one level of depth?
              </p>
              <p className="text-muted-foreground">
                Each nested object or array adds one level. A simple object with
                no nesting has depth 1. Each level of nesting increases the
                count.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What is a reasonable nesting depth?
              </p>
              <p className="text-muted-foreground">
                Most APIs stay under 5-7 levels. Beyond 10 levels, code becomes
                hard to read and may cause issues with some parsers or
                serializers.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">How is the deepest path shown?</p>
              <p className="text-muted-foreground">
                The path uses $ for root, dots for object properties, and
                brackets for array indices. For example: $.users[0].address.city
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Does array length affect depth?
              </p>
              <p className="text-muted-foreground">
                No, only nesting matters. An array with 1000 flat items has
                depth 2 (root + array). An array of arrays of arrays has depth
                based on nesting levels.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can this handle large JSON files?
              </p>
              <p className="text-muted-foreground">
                Yes, but very large files may slow down your browser. The
                analysis is done in your browser, so performance depends on your
                device.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-array-object-counter"
                className="text-primary hover:underline"
              >
                JSON Array & Object Counter
              </a>{" "}
              – Count JSON elements
            </li>
            <li>
              <a
                href="/json-tools/json-flattener"
                className="text-primary hover:underline"
              >
                JSON Flattener
              </a>{" "}
              – Reduce nesting depth
            </li>
            <li>
              <a
                href="/json-tools/json-explainer"
                className="text-primary hover:underline"
              >
                JSON Explainer
              </a>{" "}
              – Understand JSON structure
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
