"use client";

import { useState, useCallback, useMemo } from "react";
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
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

type DiffType = "added" | "removed" | "changed" | "unchanged";

interface DiffResult {
  key: string;
  type: DiffType;
  oldValue?: any;
  newValue?: any;
  children?: DiffResult[];
}

export default function JsonDiffPage() {
  const [json1, setJson1] = useState("");
  const [json2, setJson2] = useState("");
  const [diffResult, setDiffResult] = useState<DiffResult[] | null>(null);

  const computeDiff = useCallback(
    (obj1: any, obj2: any, path: string = ""): DiffResult[] => {
      const results: DiffResult[] = [];

      if (typeof obj1 !== typeof obj2) {
        results.push({
          key: path || "(root)",
          type: "changed",
          oldValue: obj1,
          newValue: obj2,
        });
        return results;
      }

      if (Array.isArray(obj1) && Array.isArray(obj2)) {
        const maxLength = Math.max(obj1.length, obj2.length);
        for (let i = 0; i < maxLength; i++) {
          const key = `[${i}]`;
          if (i >= obj1.length) {
            results.push({ key, type: "added", newValue: obj2[i] });
          } else if (i >= obj2.length) {
            results.push({ key, type: "removed", oldValue: obj1[i] });
          } else {
            const childDiffs = computeDiff(obj1[i], obj2[i], key);
            if (childDiffs.length > 0) {
              results.push({
                key,
                type: "changed",
                oldValue: obj1[i],
                newValue: obj2[i],
                children: childDiffs,
              });
            }
          }
        }
      } else if (
        typeof obj1 === "object" &&
        obj1 !== null &&
        typeof obj2 === "object" &&
        obj2 !== null
      ) {
        const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
        for (const key of allKeys) {
          const fullPath = path ? `${path}.${key}` : key;
          if (!(key in obj1)) {
            results.push({ key, type: "added", newValue: obj2[key] });
          } else if (!(key in obj2)) {
            results.push({ key, type: "removed", oldValue: obj1[key] });
          } else {
            const childDiffs = computeDiff(obj1[key], obj2[key], fullPath);
            if (childDiffs.length > 0) {
              results.push({
                key,
                type: "changed",
                oldValue: obj1[key],
                newValue: obj2[key],
                children: childDiffs,
              });
            }
          }
        }
      } else if (obj1 !== obj2) {
        results.push({
          key: path || "(root)",
          type: "changed",
          oldValue: obj1,
          newValue: obj2,
        });
      }

      return results;
    },
    [],
  );

  const compareJson = useCallback(() => {
    setDiffResult(null);

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

    const diff = computeDiff(obj1, obj2);
    setDiffResult(diff);

    const added = diff.filter((d) => d.type === "added").length;
    const removed = diff.filter((d) => d.type === "removed").length;
    const changed = diff.filter((d) => d.type === "changed").length;
    toast.success(
      `Diff complete: ${added} added, ${removed} removed, ${changed} changed`,
    );
  }, [json1, json2, computeDiff]);

  const clearAll = () => {
    setJson1("");
    setJson2("");
    setDiffResult(null);
  };

  const loadSample = () => {
    setJson1(
      JSON.stringify(
        { name: "John", age: 30, city: "NYC", hobbies: ["reading"] },
        null,
        2,
      ),
    );
    setJson2(
      JSON.stringify(
        {
          name: "John",
          age: 31,
          country: "USA",
          hobbies: ["reading", "coding"],
        },
        null,
        2,
      ),
    );
  };

  const copyResult = () => {
    if (diffResult) {
      navigator.clipboard.writeText(JSON.stringify(diffResult, null, 2));
      toast.success("Diff result copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (diffResult) {
      const blob = new Blob([JSON.stringify(diffResult, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "json-diff.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Diff result downloaded");
    }
  };

  const stats = useMemo(() => {
    if (!diffResult) return null;
    const countByType = (type: DiffType) =>
      diffResult.filter((d) => d.type === type).length;
    return {
      added: countByType("added"),
      removed: countByType("removed"),
      changed: countByType("changed"),
      unchanged:
        diffResult.length -
        countByType("added") -
        countByType("removed") -
        countByType("changed"),
    };
  }, [diffResult]);

  const renderDiffItem = (item: DiffResult, depth: number = 0) => {
    const bgColor = {
      added: "bg-green-500/10 border-green-500/30",
      removed: "bg-red-500/10 border-red-500/30",
      changed: "bg-yellow-500/10 border-yellow-500/30",
      unchanged: "bg-transparent",
    }[item.type];

    const typeLabel = {
      added: "Added",
      removed: "Removed",
      changed: "Changed",
      unchanged: "Unchanged",
    }[item.type];

    return (
      <div
        key={item.key}
        className={`rounded-md border p-3 ${bgColor}`}
        style={{ marginLeft: depth * 16 }}
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium">{item.key}</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              item.type === "added"
                ? "bg-green-500 text-white"
                : item.type === "removed"
                  ? "bg-red-500 text-white"
                  : "bg-yellow-500 text-white"
            }`}
          >
            {typeLabel}
          </span>
        </div>
        {item.oldValue !== undefined && (
          <div className="mt-1 text-sm text-muted-foreground">
            <span className="text-red-500">Old:</span>{" "}
            <span className="font-mono">{JSON.stringify(item.oldValue)}</span>
          </div>
        )}
        {item.newValue !== undefined && (
          <div className="mt-1 text-sm text-muted-foreground">
            <span className="text-green-500">New:</span>{" "}
            <span className="font-mono">{JSON.stringify(item.newValue)}</span>
          </div>
        )}
        {item.children && item.children.length > 0 && (
          <div className="mt-2 space-y-1">
            {item.children.map((child) => renderDiffItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Diff Tool – Compare Two JSON Objects
          </h1>
          <p className="text-muted-foreground">
            Compare two JSON objects side by side and highlight added, removed,
            and changed fields instantly. Our free JSON Diff Tool makes
            reviewing API response changes and config diffs easy.
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
                {diffResult && (
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
                <Button onClick={compareJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Compare
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="json1"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Original JSON
              </Label>
              <JsonEditor
                id="json1"
                value={json1}
                onChange={setJson1}
                placeholder='{"name": "John", "age": 30}'
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="json2"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Modified JSON
              </Label>
              <JsonEditor
                id="json2"
                value={json2}
                onChange={setJson2}
                placeholder='{"name": "John", "age": 31}'
              />
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        {stats && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm">
                    Added: <span className="font-semibold">{stats.added}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm">
                    Removed:{" "}
                    <span className="font-semibold">{stats.removed}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-sm">
                    Changed:{" "}
                    <span className="font-semibold">{stats.changed}</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Diff Result */}
        {diffResult && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Diff Results
              </Label>
              <div className="space-y-2">
                {diffResult.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No differences found
                  </p>
                ) : (
                  diffResult.map((item) => renderDiffItem(item))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON Diff Tool</h2>
          <p className="text-muted-foreground mb-6">
            Comparing two JSON files by eye is error-prone and time-consuming.
            This tool highlights exactly what changed between two JSON objects,
            showing added fields, removed fields, and modified values with
            color-coded results.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste the original JSON on the left and the modified JSON on the
            right. Click Compare and the tool recursively analyzes both
            structures, identifying every difference at any nesting level.
          </p>
          <p className="text-muted-foreground mb-8">
            Results show green for added fields, red for removed fields, and
            yellow for changed values. Stats at the top show the count of each
            change type. Click on nested items to expand and see deeper
            differences.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You updated an API response and need to verify what changed before
            deploying. Compare the old and new responses to ensure only intended
            changes were made and nothing broke.
          </p>
          <p className="text-muted-foreground mb-8">
            This tool compares structure and values, not semantic equivalence.
            Two JSON objects with the same data in different order will show as
            different. For semantic comparison, use a specialized tool.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                What types of changes are detected?
              </p>
              <p className="text-muted-foreground">
                Added fields (green), removed fields (red), and changed values
                (yellow). Nested changes are shown hierarchically under their
                parent.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Does it work with arrays?</p>
              <p className="text-muted-foreground">
                Yes, arrays are compared by index. Items added or removed at
                specific positions are shown. Reordered arrays may show many
                changes.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                How are nested objects handled?
              </p>
              <p className="text-muted-foreground">
                Nested differences are shown under their parent with
                indentation. Click to expand nested items and see the full
                change hierarchy.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I export the diff results?</p>
              <p className="text-muted-foreground">
                Yes, use Copy to copy results as JSON or Download to save as a
                file. This is useful for including diffs in bug reports or
                documentation.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What if both JSONs are identical?
              </p>
              <p className="text-muted-foreground">
                The tool shows "No differences found" with a message. This
                confirms your two JSON files are structurally identical.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
