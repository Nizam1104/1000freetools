"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { FileJson, RotateCcw, Trash2, Copy, Download, Plus, X } from "lucide-react";
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
    { id: "1", sourcePath: "", targetPath: "", operation: "copy" }
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
    setRules([...rules, { id: Date.now().toString(), sourcePath: "", targetPath: "", operation: "copy" }]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const updateRule = (id: string, field: keyof TransformRule, value: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
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
    setInput(JSON.stringify({
      user: { firstName: "John", lastName: "Doe", email: "JOHN@EXAMPLE.COM" },
      meta: { createdAt: "2024-01-01" }
    }, null, 2));
    setRules([
      { id: "1", sourcePath: "user.firstName", targetPath: "name.first", operation: "copy" },
      { id: "2", sourcePath: "user.lastName", targetPath: "name.last", operation: "copy" },
      { id: "3", sourcePath: "user.email", targetPath: "contact.email", operation: "lowercase" }
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Transformer – Reshape JSON Structures Online</h1>
          <p className="text-muted-foreground">
            Transform JSON structure using user-defined rules and key mappings. Our free JSON Transformer is perfect for reshaping API responses to match your application's data model.
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
            <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
              Input JSON
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"user": {"firstName": "John", "lastName": "Doe"}}'
              className="min-h-[150px] font-mono text-sm resize-none"
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
                <div key={rule.id} className="flex items-center gap-2 p-3 bg-muted rounded-md">
                  <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                  <Input
                    value={rule.sourcePath}
                    onChange={(e) => updateRule(rule.id, "sourcePath", e.target.value)}
                    placeholder="Source path (e.g., user.name)"
                    className="flex-1 font-mono text-sm h-9"
                  />
                  <NativeSelect
                    value={rule.operation}
                    onChange={(e) => updateRule(rule.id, "operation", e.target.value)}
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
                    onChange={(e) => updateRule(rule.id, "targetPath", e.target.value)}
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
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Transformed Result
              </Label>
              <Textarea
                value={result}
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
