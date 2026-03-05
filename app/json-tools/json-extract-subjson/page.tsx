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

    const parts = path
      .replace(/^\$/, "")
      .split(/\.|\[|\]/)
      .filter((p) => p !== "");
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
    setInput(
      JSON.stringify(
        {
          status: "success",
          data: {
            user: {
              id: 1,
              name: "John",
              profile: {
                email: "john@example.com",
                settings: { theme: "dark" },
              },
            },
          },
        },
        null,
        2,
      ),
    );
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Extract Tool – Extract Nested JSON by Path
          </h1>
          <p className="text-muted-foreground">
            Extract a specific nested portion of JSON using a key path. Our free
            JSON Extract Sub-JSON Tool helps you isolate exactly the data you
            need from large, complex JSON documents.
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
              {quickPaths.map((q) => (
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
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"data": {"user": {...}}}'
                className="min-h-[500px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="keyPath"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
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
          <Card className="mb-6">
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Extracted Sub-JSON
              </Label>
              <Textarea
                value={result}
                readOnly
                className="min-h-[300px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
              />
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Extract Tool
          </h2>
          <p className="text-muted-foreground mb-6">
            Large JSON responses often contain more data than you need. This
            tool extracts a specific nested portion using a JSONPath-style key
            path, giving you just the sub-object or array you care about.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON and enter a key path like $.data.user.profile. The
            tool navigates to that location and extracts just that portion as a
            new JSON document.
          </p>
          <p className="text-muted-foreground mb-8">
            Use the Quick Paths buttons to try common patterns, or type your own
            path. Dot notation accesses object properties, and bracket notation
            accesses array indices.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Your API returns a large response but you only need one nested
            section for your feature. Extract just that part to simplify your
            code and reduce data processing.
          </p>
          <p className="text-muted-foreground mb-8">
            This extracts by path only, not by filtering conditions. For
            extracting items that match certain criteria from arrays, use the
            JSON Filter tool instead.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">What path syntax is supported?</p>
              <p className="text-muted-foreground">
                Use $ for root, dots for properties ($.data.user), and brackets
                for arrays ($.items[0]). Wildcards are not supported.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What happens if the path doesn't exist?
              </p>
              <p className="text-muted-foreground">
                An error message appears saying the path was not found. Check
                your path spelling and verify the structure of your JSON.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I extract multiple paths at once?
              </p>
              <p className="text-muted-foreground">
                No, this tool extracts one path at a time. Run it multiple times
                for different paths or use a more advanced JSON query tool.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                How do I save the extracted JSON?
              </p>
              <p className="text-muted-foreground">
                Use Copy to paste into your code, or Download to save as a JSON
                file. Both options appear after extraction.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Does it work with array roots?</p>
              <p className="text-muted-foreground">
                Yes, use $[0] to access the first array element, $[1] for the
                second, and so on. Combine with property access for nested data.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/jmespath-query"
                className="text-primary hover:underline"
              >
                JMESPath Query Tool
              </a>{" "}
              – Advanced JSON queries
            </li>
            <li>
              <a
                href="/json-tools/json-filter"
                className="text-primary hover:underline"
              >
                JSON Filter
              </a>{" "}
              – Filter arrays by conditions
            </li>
            <li>
              <a
                href="/json-tools/json-key-extractor"
                className="text-primary hover:underline"
              >
                JSON Key Extractor
              </a>{" "}
              – List all keys
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
