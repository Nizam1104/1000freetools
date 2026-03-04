"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export default function JsonExplainerPage() {
  const [input, setInput] = useState("");
  const [explanation, setExplanation] = useState<string | null>(null);

  const explainJson = useCallback(() => {
    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    function analyzeStructure(value: any, path: string = "root"): string[] {
      const lines: string[] = [];

      if (value === null) {
        lines.push(`• ${path}: null value`);
      } else if (typeof value === "string") {
        lines.push(`• ${path}: string "${value.substring(0, 50)}${value.length > 50 ? "..." : ""}" (${value.length} chars)`);
      } else if (typeof value === "number") {
        lines.push(`• ${path}: number ${value}${Number.isInteger(value) ? " (integer)" : " (float)"}`);
      } else if (typeof value === "boolean") {
        lines.push(`• ${path}: boolean ${value ? "true" : "false"}`);
      } else if (Array.isArray(value)) {
        lines.push(`• ${path}: array with ${value.length} item(s)`);
        if (value.length > 0) {
          const types = new Set(value.map((item: any) => {
            if (item === null) return "null";
            if (Array.isArray(item)) return "array";
            return typeof item;
          }));
          lines.push(`  → Contains: ${Array.from(types).join(", ")}`);
          value.forEach((item: any, index: number) => {
            if (typeof item === "object" && item !== null) {
              lines.push(...analyzeStructure(item, `${path}[${index}]`));
            }
          });
        }
      } else if (typeof value === "object") {
        const keys = Object.keys(value);
        lines.push(`• ${path}: object with ${keys.length} key(s)`);
        keys.forEach(key => {
          const val = value[key];
          if (typeof val === "object" && val !== null) {
            lines.push(...analyzeStructure(val, `${path}.${key}`));
          } else {
            lines.push(...analyzeStructure(val, `${path}.${key}`));
          }
        });
      }

      return lines;
    }

    const lines = analyzeStructure(obj);
    const summary = [
      `📊 JSON Structure Explanation`,
      ``,
      `**Overview:**`,
      `- Type: ${Array.isArray(obj) ? "Array" : "Object"}`,
      `- Total keys: ${JSON.stringify(obj).match(/"/g)?.length || 0} / 2`,
      `- Size: ${new Blob([input]).size} bytes`,
      ``,
      `**Structure:**`,
      ...lines
    ].join("\n");

    setExplanation(summary);
    toast.success("JSON explained");
  }, [input]);

  const clearAll = () => {
    setInput("");
    setExplanation(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      users: [
        { id: 1, name: "John", email: "john@example.com", active: true },
        { id: 2, name: "Jane", email: "jane@example.com", active: false }
      ],
      meta: {
        total: 2,
        page: 1,
        generated: new Date().toISOString()
      }
    }, null, 2));
  };

  const copyResult = () => {
    if (explanation) {
      navigator.clipboard.writeText(explanation);
      toast.success("Explanation copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Explainer – Understand JSON in Plain English</h1>
          <p className="text-muted-foreground">
            Understand any JSON structure explained in simple, human-readable language. Our free JSON Explainer is perfect for beginners, non-developers, and anyone learning to work with JSON.
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
                {explanation && (
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
                <Button onClick={explainJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Explain
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
              className="min-h-[200px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Result */}
        {explanation && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Explanation
              </Label>
              <div className="bg-muted rounded-md p-4">
                <pre className="whitespace-pre-wrap text-sm font-sans">
                  {explanation}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
