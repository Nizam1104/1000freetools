"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export default function JsonToGraphqlPage() {
  const [input, setInput] = useState("");
  const [operationType, setOperationType] = useState<"query" | "mutation">("query");
  const [operationName, setOperationName] = useState("GetData");
  const [result, setResult] = useState<string | null>(null);

  const jsonToGraphql = useCallback((obj: any, indent: number = 0, parentKey: string = ""): string => {
    const spaces = "  ".repeat(indent);
    let result = "";

    if (Array.isArray(obj)) {
      if (obj.length > 0) {
        result += jsonToGraphql(obj[0], indent, parentKey);
      }
    } else if (typeof obj === "object" && obj !== null) {
      result += "{\n";
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object" && value !== null) {
          result += `${spaces}  ${key} ${jsonToGraphql(value, indent + 1, key)}\n`;
        } else {
          result += `${spaces}  ${key}\n`;
        }
      }
      result += `${spaces}}`;
    }

    return result;
  }, []);

  const generateGraphql = useCallback(() => {
    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const fields = jsonToGraphql(obj, 1);
    const graphql = `${operationType.toLowerCase()} ${operationName} ${fields}`;

    setResult(graphql);
    toast.success("GraphQL generated");
  }, [input, operationType, operationName, jsonToGraphql]);

  const clearAll = () => {
    setResult(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      user: {
        id: 1,
        name: "John",
        email: "john@example.com",
        posts: [
          { title: "Post 1", content: "Content 1" }
        ]
      }
    }, null, 2));
    setOperationName("GetUser");
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("GraphQL copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to GraphQL Input Converter Online</h1>
          <p className="text-muted-foreground">
            Convert JSON objects into GraphQL input type syntax instantly. Our free JSON to GraphQL tool helps developers bridge REST JSON data with GraphQL schemas quickly.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="operationType" className="text-sm whitespace-nowrap">Operation:</Label>
                  <select
                    id="operationType"
                    value={operationType}
                    onChange={(e) => setOperationType(e.target.value as any)}
                    className="h-9 px-3 text-sm border rounded-md bg-background"
                  >
                    <option value="query">Query</option>
                    <option value="mutation">Mutation</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="operationName" className="text-sm whitespace-nowrap">Name:</Label>
                  <input
                    id="operationName"
                    value={operationName}
                    onChange={(e) => setOperationName(e.target.value)}
                    className="w-40 h-9 px-3 text-sm border rounded-md bg-background"
                  />
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Sample
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {result && (
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
                <Button onClick={generateGraphql}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Generate
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
              placeholder='{"user": {"id": 1, "name": "John"}}'
              className="min-h-[200px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated GraphQL
              </Label>
              <Textarea
                value={result}
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
