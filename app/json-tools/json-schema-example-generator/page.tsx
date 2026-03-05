"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export default function JsonSchemaExampleGeneratorPage() {
  const [schema, setSchema] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const generateExample = useCallback(() => {
    let schemaObj: any;
    try {
      schemaObj = JSON.parse(schema);
    } catch (e) {
      toast.error(`Invalid JSON Schema: ${(e as Error).message}`);
      return;
    }

    function generateValue(schemaPart: any, depth: number = 0): any {
      if (depth > 10) return null; // Prevent infinite recursion

      if (!schemaPart) return null;

      // Handle $ref (simplified - just return null)
      if (schemaPart.$ref) return null;

      // Handle enum
      if (schemaPart.enum && schemaPart.enum.length > 0) {
        return schemaPart.enum[0];
      }

      // Handle const
      if (schemaPart.const !== undefined) {
        return schemaPart.const;
      }

      // Handle default
      if (schemaPart.default !== undefined) {
        return schemaPart.default;
      }

      // Handle example
      if (schemaPart.examples && schemaPart.examples.length > 0) {
        return schemaPart.examples[0];
      }

      const type = schemaPart.type;

      if (!type) {
        // Try to infer from properties
        if (schemaPart.properties)
          return generateFromProperties(schemaPart.properties, depth);
        if (schemaPart.items)
          return [generateValue(schemaPart.items, depth + 1)];
        return null;
      }

      const types = Array.isArray(type) ? type : [type];

      for (const t of types) {
        switch (t) {
          case "string":
            if (schemaPart.format) {
              switch (schemaPart.format) {
                case "email":
                  return "user@example.com";
                case "date":
                  return "2024-01-15";
                case "date-time":
                  return "2024-01-15T10:30:00Z";
                case "uri":
                  return "https://example.com";
                case "uuid":
                  return "123e4567-e89b-12d3-a456-426614174000";
                default:
                  return "string";
              }
            }
            if (schemaPart.pattern) return "pattern_match";
            return schemaPart.minLength
              ? "a".repeat(schemaPart.minLength)
              : "string";

          case "number":
          case "integer":
            if (schemaPart.minimum !== undefined) return schemaPart.minimum;
            if (schemaPart.maximum !== undefined) return schemaPart.maximum;
            return t === "integer" ? 0 : 0.0;

          case "boolean":
            return schemaPart.default !== undefined ? schemaPart.default : true;

          case "null":
            return null;

          case "array":
            if (schemaPart.items) {
              const count = schemaPart.minItems || 1;
              return Array.from({ length: count }, () =>
                generateValue(schemaPart.items, depth + 1),
              );
            }
            return [];

          case "object":
            return generateFromProperties(schemaPart.properties || {}, depth);

          default:
            return null;
        }
      }

      return null;
    }

    function generateFromProperties(properties: any, depth: number): any {
      if (!properties) return {};
      const result: any = {};
      for (const [key, propSchema] of Object.entries(properties)) {
        result[key] = generateValue(propSchema, depth + 1);
      }
      return result;
    }

    const example = generateValue(schemaObj);
    setResult(JSON.stringify(example, null, 2));
    toast.success("Example generated");
  }, [schema]);

  const clearAll = () => {
    setSchema("");
    setResult(null);
  };

  const loadSample = () => {
    setSchema(
      JSON.stringify(
        {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: { type: "string", minLength: 1 },
            email: { type: "string", format: "email" },
            age: { type: "integer", minimum: 0, maximum: 150 },
            active: { type: "boolean", default: true },
            roles: {
              type: "array",
              items: { type: "string", enum: ["user", "admin", "moderator"] },
            },
            address: {
              type: "object",
              properties: {
                street: { type: "string" },
                city: { type: "string" },
                zip: { type: "string", pattern: "^\\d{5}$" },
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
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Example copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Schema Example Generator Online
          </h1>
          <p className="text-muted-foreground">
            Generate realistic example JSON data from any JSON Schema definition
            instantly. Our free tool helps developers test schema validation and
            create accurate mock data for their APIs.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Sample Schema
                </Button>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
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
                <Button onClick={generateExample}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Generate Example
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label
              htmlFor="schema"
              className="text-sm font-medium text-muted-foreground mb-2 block"
            >
              JSON Schema
            </Label>
            <JsonEditor
              value={schema}
              onChange={setSchema}
              placeholder='{"type": "object", "properties": {...}}'
            />
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated Example
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
            About JSON Schema Example Generator
          </h2>
          <p className="text-muted-foreground mb-6">
            JSON Schema defines the structure of valid JSON data, but testing
            validation logic requires sample instances that match your schema.
            Writing these examples by hand is tedious, especially for complex
            nested schemas. This generator reads your schema and produces a
            valid example automatically.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON Schema into the input area. Click Load Sample Schema
            to see a complex example with strings, numbers, arrays, enums, and
            nested objects. The generator analyzes each property type and
            creates appropriate sample values.
          </p>
          <p className="text-muted-foreground mb-8">
            String formats like email, date, and uri get realistic example
            values. Enums use the first allowed value. Numbers respect minimum
            and maximum constraints. Click Generate Example to see the output
            and copy it for testing.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            API developers writing OpenAPI specifications need example payloads
            for documentation. QA engineers need valid test data that conforms
            to schema constraints. This tool generates those examples without
            manual effort.
          </p>
          <p className="text-muted-foreground mb-8">
            The generator handles common schema keywords but does not support
            advanced features like oneOf, anyOf, or complex pattern validation.
            For highly specialized schemas, you may need to adjust the output
            manually.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                What JSON Schema version is supported?
              </p>
              <p className="text-muted-foreground">
                The generator works with Draft 7 and later versions using
                standard type and format keywords.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Does it handle nested objects?</p>
              <p className="text-muted-foreground">
                Yes. Nested object schemas are processed recursively up to 10
                levels deep to prevent infinite loops.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What about arrays?</p>
              <p className="text-muted-foreground">
                Arrays generate one item by default. If minItems is specified,
                it generates that many items.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can it use default values from the schema?
              </p>
              <p className="text-muted-foreground">
                Yes. If a property has a default keyword, that value is used in
                the generated example.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Does it support $ref references?
              </p>
              <p className="text-muted-foreground">
                References are resolved to null. For full $ref support, you
                would need to provide the complete schema with all definitions
                inline.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
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
                href="/json-tools/json-generator"
                className="text-primary hover:underline"
              >
                JSON Generator
              </a>{" "}
              – Create random mock JSON data
            </li>
            <li>
              <a
                href="/json-tools/json-validator"
                className="text-primary hover:underline"
              >
                JSON Validator
              </a>{" "}
              – Check JSON syntax validity
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
