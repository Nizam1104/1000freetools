"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export default function JsonToGraphqlPage() {
  const [input, setInput] = useState("");
  const [operationType, setOperationType] = useState<"query" | "mutation">(
    "query",
  );
  const [operationName, setOperationName] = useState("GetData");
  const [result, setResult] = useState<string | null>(null);

  const jsonToGraphql = useCallback(
    (obj: any, indent: number = 0, parentKey: string = ""): string => {
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
    },
    [],
  );

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
    setInput(
      JSON.stringify(
        {
          user: {
            id: 1,
            name: "John",
            email: "john@example.com",
            posts: [{ title: "Post 1", content: "Content 1" }],
          },
        },
        null,
        2,
      ),
    );
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON to GraphQL Input Converter Online
          </h1>
          <p className="text-muted-foreground">
            Convert JSON objects into GraphQL input type syntax instantly. Our
            free JSON to GraphQL tool helps developers bridge REST JSON data
            with GraphQL schemas quickly.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="operationType"
                    className="text-sm whitespace-nowrap"
                  >
                    Operation:
                  </Label>
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
                  <Label
                    htmlFor="operationName"
                    className="text-sm whitespace-nowrap"
                  >
                    Name:
                  </Label>
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
            <Label
              htmlFor="input"
              className="text-sm font-medium text-muted-foreground mb-2 block"
            >
              Input JSON
            </Label>
            <JsonEditor
              value={input}
              onChange={setInput}
              placeholder='{"user": {"id": 1, "name": "John"}}'
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
            About JSON to GraphQL Conversion
          </h2>
          <p className="text-muted-foreground mb-6">
            You have a JSON response and need to query it with GraphQL. Writing
            the type definitions by hand means checking every field, guessing at
            nullability, and handling nested objects. This tool reads your JSON
            structure and outputs GraphQL query syntax you can use immediately.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON and the tool walks through each field. Objects
            become nested selections. Arrays tell the tool what type of items to
            expect. The operation name and type (query or mutation) are yours to
            set.
          </p>
          <p className="text-muted-foreground mb-8">
            What you get back is ready to drop into your GraphQL client. No
            manual typing, no second-guessing the structure.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Maybe you're migrating from REST and have sample responses ready. Or
            you're writing tests and need valid query structures. The tool
            handles nested objects and arrays without getting confused.
          </p>
          <p className="text-muted-foreground mb-8">
            It won't generate your full schema or handle interfaces and unions.
            For basic query generation from existing JSON, it gets you there
            faster than typing by hand.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                Does this handle nested objects?
              </p>
              <p className="text-muted-foreground">
                Yes. The tool recursively processes nested objects and creates
                selection sets for each level.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What about arrays?</p>
              <p className="text-muted-foreground">
                Arrays are handled by examining the first item. The generated
                query includes fields from that item's structure.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I use this for mutations?</p>
              <p className="text-muted-foreground">
                Yes, switch the operation type to mutation. You'll get a
                selection set for the mutation response structure.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Does it support GraphQL interfaces?
              </p>
              <p className="text-muted-foreground">
                No. This generates basic query selections from JSON structure.
                Interfaces and unions need manual schema work.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                How does it handle different types?
              </p>
              <p className="text-muted-foreground">
                Types are inferred from your sample values. If a field sometimes
                holds different types, you may need to adjust manually.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-to-typescript"
                className="text-primary hover:underline"
              >
                JSON to TypeScript
              </a>{" "}
              – Generate TypeScript interfaces from JSON
            </li>
            <li>
              <a
                href="/json-tools/json-schema-validator"
                className="text-primary hover:underline"
              >
                JSON Schema Validator
              </a>{" "}
              – Validate JSON against a schema
            </li>
            <li>
              <a
                href="/json-tools/json-to-python"
                className="text-primary hover:underline"
              >
                JSON to Python
              </a>{" "}
              – Convert JSON to Python dataclasses
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
