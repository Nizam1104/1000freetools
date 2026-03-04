"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

export default function JmespathQueryPage() {
  const [input, setInput] = useState("");
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<any>(null);

  const evaluateJmesPath = useCallback((data: any, expr: string): any => {
    // Basic JMESPath implementation
    if (!expr.trim()) return data;

    const parts = expr.split(".");
    let current: any = data;

    for (const part of parts) {
      if (current === null || current === undefined) {
        return null;
      }

      // Handle array projection [*]
      const arrayMatch = part.match(/^([^\[]+)\[\](.*)$/);
      if (arrayMatch) {
        const [, key, rest] = arrayMatch;
        if (Array.isArray(current?.[key])) {
          const projected = current[key].map(item => {
            if (rest) {
              return evaluateJmesPath(item, rest.slice(1));
            }
            return item;
          });
          current = projected;
        } else {
          current = null;
        }
        continue;
      }

      // Handle array index [0]
      const indexMatch = part.match(/^([^\[]+)\[(\d+)\](.*)$/);
      if (indexMatch) {
        const [, key, index, rest] = indexMatch;
        if (Array.isArray(current?.[key])) {
          const item = current[key][parseInt(index)];
          current = rest ? evaluateJmesPath(item, rest.slice(1)) : item;
        } else {
          current = null;
        }
        continue;
      }

      // Handle simple property access
      if (typeof current === "object" && current !== null && part in current) {
        current = current[part];
      } else if (Array.isArray(current)) {
        // Apply to each element in array
        current = current.map(item => evaluateJmesPath(item, part));
      } else {
        current = null;
      }
    }

    return current;
  }, []);

  const executeQuery = useCallback(() => {
    setResult(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    if (!expression.trim()) {
      toast.error("Please enter a JMESPath expression");
      return;
    }

    try {
      const result = evaluateJmesPath(obj, expression);
      setResult(result);
      toast.success("Query executed successfully");
    } catch (e) {
      toast.error(`Query error: ${(e as Error).message}`);
    }
  }, [input, expression, evaluateJmesPath]);

  const clearAll = () => {
    setInput("");
    setExpression("");
    setResult(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      locations: [
        { name: "NYC", weather: { temp: 20, condition: "sunny" } },
        { name: "LA", weather: { temp: 25, condition: "cloudy" } },
        { name: "SF", weather: { temp: 18, condition: "foggy" } }
      ]
    }, null, 2));
    setExpression("locations[].weather.temp");
  };

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      toast.success("Query result copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result !== null) {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "jmespath-result.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Query result downloaded");
    }
  };

  const quickExpressions = [
    { label: "Root", expr: "" },
    { label: "First level", expr: "locations" },
    { label: "Array projection", expr: "locations[].name" },
    { label: "Nested", expr: "locations[].weather" },
    { label: "Deep nested", expr: "locations[].weather.temp" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JMESPath Query Tool – Run JMESPath Online</h1>
          <p className="text-muted-foreground">
            Execute JMESPath expressions on JSON for advanced filtering, projection, and transformation. Our free JMESPath tool is ideal for AWS CLI users and developers working with complex JSON.
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
                {result !== null && (
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
                <Button onClick={executeQuery}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Query
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Expressions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label className="text-sm font-medium text-muted-foreground mb-2 block">
              Quick Expressions
            </Label>
            <div className="flex flex-wrap gap-2">
              {quickExpressions.map(q => (
                <Button
                  key={q.expr || "root"}
                  variant="outline"
                  size="sm"
                  onClick={() => setExpression(q.expr)}
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
                placeholder='{"locations": [...]}'
                className="min-h-[200px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label htmlFor="expression" className="text-sm font-medium text-muted-foreground mb-2 block">
                JMESPath Expression
              </Label>
              <div className="flex gap-2">
                <Input
                  id="expression"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  placeholder="locations[].name"
                  className="font-mono text-sm flex-1"
                  onKeyDown={(e) => e.key === "Enter" && executeQuery()}
                />
                <Button onClick={executeQuery}>Run</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Result */}
        {result !== null && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Query Result
              </Label>
              <Textarea
                value={typeof result === "object" ? JSON.stringify(result, null, 2) : String(result)}
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
