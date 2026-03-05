"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import {
  FileJson,
  RotateCcw,
  Trash2,
  Copy,
  Download,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface TransformRule {
  id: string;
  sourcePath: string;
  targetPath: string;
  operation: "copy" | "rename" | "delete" | "uppercase" | "lowercase";
}

export default function JsonTransformerPage() {
  const [input, setInput] = useState("");
  const [rules, setRules] = useState<TransformRule[]>([
    { id: "1", sourcePath: "", targetPath: "", operation: "copy" },
  ]);
  const [result, setResult] = useState<string | null>(null);

  const getValueByPath = (obj: any, path: string): any => {
    if (!path) return obj;
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };

  const setValueByPath = (obj: any, path: string, value: any): any => {
    if (!path) return value;
    const parts = path.split(".");
    const last = parts.pop()!;
    let current = obj;
    for (const part of parts) {
      if (!(part in current)) current[part] = {};
      current = current[part];
    }
    current[last] = value;
    return obj;
  };

  const addRule = () => {
    setRules([
      ...rules,
      {
        id: Date.now().toString(),
        sourcePath: "",
        targetPath: "",
        operation: "copy",
      },
    ]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  const updateRule = (
    id: string,
    field: keyof TransformRule,
    value: string,
  ) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const transformJson = useCallback(() => {
    setResult(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    try {
      let resultObj: any = {};

      for (const rule of rules) {
        if (!rule.sourcePath && rule.operation !== "delete") continue;

        const value = getValueByPath(obj, rule.sourcePath);

        switch (rule.operation) {
          case "copy":
          case "rename":
            if (rule.targetPath) {
              setValueByPath(resultObj, rule.targetPath, value);
            }
            break;
          case "delete":
            // Handled by not copying
            break;
          case "uppercase":
            if (rule.targetPath && typeof value === "string") {
              setValueByPath(resultObj, rule.targetPath, value.toUpperCase());
            }
            break;
          case "lowercase":
            if (rule.targetPath && typeof value === "string") {
              setValueByPath(resultObj, rule.targetPath, value.toLowerCase());
            }
            break;
        }
      }

      setResult(JSON.stringify(resultObj, null, 2));
      toast.success("Transformation complete");
    } catch (e) {
      toast.error(`Transformation error: ${(e as Error).message}`);
    }
  }, [input, rules]);

  const clearAll = () => {
    setInput("");
    setRules([{ id: "1", sourcePath: "", targetPath: "", operation: "copy" }]);
    setResult(null);
  };

  const loadSample = () => {
    setInput(
      JSON.stringify(
        {
          user: {
            firstName: "John",
            lastName: "Doe",
            email: "JOHN@EXAMPLE.COM",
          },
          meta: { createdAt: "2024-01-01" },
        },
        null,
        2,
      ),
    );
    setRules([
      {
        id: "1",
        sourcePath: "user.firstName",
        targetPath: "name.first",
        operation: "copy",
      },
      {
        id: "2",
        sourcePath: "user.lastName",
        targetPath: "name.last",
        operation: "copy",
      },
      {
        id: "3",
        sourcePath: "user.email",
        targetPath: "contact.email",
        operation: "lowercase",
      },
    ]);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Transformed JSON copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transformed.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Transformed JSON downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Transformer – Reshape JSON Structures Online
          </h1>
          <p className="text-muted-foreground">
            Transform JSON structure using user-defined rules and key mappings.
            Our free JSON Transformer is perfect for reshaping API responses to
            match your application's data model.
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
                <Button onClick={transformJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Transform
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
              id="input"
              value={input}
              onChange={setInput}
              placeholder='{"user": {"firstName": "John", "lastName": "Doe"}}'
            />
          </CardContent>
        </Card>

        {/* Rules */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-medium text-muted-foreground">
                Transformation Rules
              </Label>
              <Button variant="outline" size="sm" onClick={addRule}>
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>
            <div className="space-y-3">
              {rules.map((rule, index) => (
                <div
                  key={rule.id}
                  className="flex items-center gap-2 p-3 bg-muted rounded-md"
                >
                  <span className="text-sm text-muted-foreground w-6">
                    {index + 1}.
                  </span>
                  <Input
                    value={rule.sourcePath}
                    onChange={(e) =>
                      updateRule(rule.id, "sourcePath", e.target.value)
                    }
                    placeholder="Source path (e.g., user.name)"
                    className="flex-1 font-mono text-sm h-9"
                  />
                  <NativeSelect
                    value={rule.operation}
                    onChange={(e) =>
                      updateRule(rule.id, "operation", e.target.value)
                    }
                    className="w-32"
                  >
                    <option value="copy">Copy</option>
                    <option value="rename">Rename</option>
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="delete">Delete</option>
                  </NativeSelect>
                  <Input
                    value={rule.targetPath}
                    onChange={(e) =>
                      updateRule(rule.id, "targetPath", e.target.value)
                    }
                    placeholder="Target path"
                    className="flex-1 font-mono text-sm h-9"
                    disabled={rule.operation === "delete"}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRule(rule.id)}
                    disabled={rules.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Transformed Result
              </Label>
              <JsonEditor
                value={result}
                readOnly
              />
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Transformer
          </h2>
          <p className="text-muted-foreground mb-6">
            API responses rarely match your application data model exactly.
            Renaming keys, extracting nested values, and reshaping structures
            manually is repetitive work. This JSON Transformer lets you define
            rules to copy, rename, and transform JSON paths into your desired
            output structure.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON into the Input area. Add transformation rules
            specifying Source Path, Target Path, and Operation. Choose from
            Copy, Rename, Uppercase, Lowercase, or Delete operations. Click
            Transform to apply all rules and see the reshaped result.
          </p>
          <p className="text-muted-foreground mb-8">
            Use dot notation for nested paths like user.profile.name. Add
            multiple rules to build complex transformations. The Load Sample
            button demonstrates renaming firstName to name.first and lowercasing
            email values in one transformation.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Frontend developers adapting third-party API responses to match
            component props save significant time. Data engineers normalizing
            JSON from multiple sources into a unified schema benefit from
            repeatable transformation rules.
          </p>
          <p className="text-muted-foreground mb-8">
            This tool handles structural transformations, not complex data
            manipulation. For calculations, filtering, or conditional logic, use
            a programming language. The transformer works best for consistent
            reshaping tasks.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                How do I reference nested values?
              </p>
              <p className="text-muted-foreground">
                Use dot notation like user.address.city for nested objects and
                array[index] for array items.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I delete fields?</p>
              <p className="text-muted-foreground">
                Yes. Use the Delete operation to exclude fields from the output
                entirely.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What does Rename do?</p>
              <p className="text-muted-foreground">
                Rename copies a value to a new path with a different key name,
                effectively renaming the field.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Do string operations chain?</p>
              <p className="text-muted-foreground">
                No. Each rule operates on the original input. Apply Uppercase or
                Lowercase directly to the source value.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I save transformation rules?
              </p>
              <p className="text-muted-foreground">
                Rules are not persisted. Copy your rule configuration for reuse
                or bookmark this page with your rules in browser storage.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-path-finder"
                className="text-primary hover:underline"
              >
                JSON Path Finder
              </a>{" "}
              – Extract values using path expressions
            </li>
            <li>
              <a
                href="/json-tools/json-flattener"
                className="text-primary hover:underline"
              >
                JSON Flattener
              </a>{" "}
              – Flatten nested JSON structures
            </li>
            <li>
              <a
                href="/json-tools/json-merger"
                className="text-primary hover:underline"
              >
                JSON Merger
              </a>{" "}
              – Combine multiple JSON objects
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
