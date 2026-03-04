"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, ChevronRight, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { JSX } from "react";

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject { [key: string]: JsonValue }
interface JsonArray extends Array<JsonValue> { }

export default function JsonStructureVisualizerPage() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<JsonValue | null>(null);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set(["$"]));

  const togglePath = (path: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedPaths(newExpanded);
  };

  const parseJson = useCallback(() => {
    try {
      const obj = JSON.parse(input);
      setParsed(obj);
      setExpandedPaths(new Set(["$"]));
      toast.success("JSON parsed");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      setParsed(null);
    }
  }, [input]);

  const clearAll = () => {
    setInput("");
    setParsed(null);
    setExpandedPaths(new Set());
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      users: [
        { id: 1, name: "John", profile: { email: "john@example.com", active: true } },
        { id: 2, name: "Jane", profile: { email: "jane@example.com", active: false } }
      ],
      meta: { total: 2, page: 1 }
    }, null, 2));
  };

  const copyResult = () => {
    if (parsed) {
      navigator.clipboard.writeText(JSON.stringify(parsed, null, 2));
      toast.success("JSON copied to clipboard");
    }
  };

  const renderValue = (value: JsonValue, path: string, key?: string): JSX.Element => {
    const isExpanded = expandedPaths.has(path);
    const isObject = value !== null && typeof value === "object";
    const isArray = Array.isArray(value);
    const isEmpty = isObject && (isArray ? (value as JsonArray).length === 0 : Object.keys(value as JsonObject).length === 0);

    if (!isObject) {
      let valueClass = "text-green-600 dark:text-green-400";
      if (typeof value === "string") valueClass = "text-red-600 dark:text-red-400";
      if (typeof value === "number") valueClass = "text-blue-600 dark:text-blue-400";
      if (typeof value === "boolean") valueClass = "text-purple-600 dark:text-purple-400";
      if (value === null) valueClass = "text-gray-500";

      return (
        <div key={path} className="flex items-center gap-2 py-1">
          {key && <span className="text-muted-foreground">"{key}":</span>}
          <span className={`font-mono text-sm ${valueClass}`}>
            {typeof value === "string" ? `"${value}"` : String(value)}
          </span>
        </div>
      );
    }

    const items = isArray ? (value as JsonArray) : Object.entries(value as JsonObject);
    const count = isArray ? (value as JsonArray).length : Object.keys(value as JsonObject).length;

    return (
      <div key={path} className="ml-4">
        <div
          className="flex items-center gap-2 py-1 cursor-pointer hover:bg-muted/50 rounded px-2 -mx-2"
          onClick={() => togglePath(path)}
        >
          <span className="text-muted-foreground">
            {isEmpty ? null : isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
          {key && <span className="text-muted-foreground">"{key}":</span>}
          <span className="text-yellow-600 dark:text-yellow-400">
            {isArray ? "[" : "{"}
          </span>
          {!isExpanded && (
            <span className="text-muted-foreground text-sm">
              {isArray ? `Array(${count})` : `${count} keys`}
            </span>
          )}
          {!isExpanded && (
            <span className="text-yellow-600 dark:text-yellow-400">
              {isArray ? "]" : "}"}
            </span>
          )}
        </div>
        {isExpanded && !isEmpty && (
          <div className="border-l border-muted pl-4">
            {isArray
              ? (items as JsonArray).map((item, index) => renderValue(item, `${path}[${index}]`))
              : (items as [string, JsonValue][]).map(([k, v]) => renderValue(v, `${path}.${k}`, k))
            }
          </div>
        )}
        {isExpanded && (
          <div className="text-yellow-600 dark:text-yellow-400">
            {isArray ? "]" : "}"}
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Structure Visualizer – Visualize JSON as Tree</h1>
          <p className="text-muted-foreground">
            Visualize JSON data as an interactive tree or graph for better understanding. Our free JSON Structure Visualizer makes it easy to explore and present complex JSON hierarchies.
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
                {parsed && (
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
                <Button onClick={parseJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Visualize
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
              placeholder='{"name": "John", "age": 30}'
              className="min-h-[150px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Visualization */}
        {parsed && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Tree View (click to expand/collapse)
              </Label>
              <div className="bg-muted rounded-md p-4 overflow-auto">
                {renderValue(parsed, "$")}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Tip: Click on objects/arrays to expand or collapse them
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
