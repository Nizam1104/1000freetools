"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, FileJson, RotateCcw, Trash2, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ValidationError {
  path: string;
  message: string;
  expected?: string;
  actual?: string;
}

export default function JsonSchemaValidatorPage() {
  const [jsonData, setJsonData] = useState("");
  const [schemaData, setSchemaData] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateJsonSchema = useCallback(() => {
    setErrors([]);
    setIsValid(null);

    let dataObj: any;
    let schemaObj: any;

    try {
      dataObj = JSON.parse(jsonData);
    } catch (e) {
      setErrors([{ path: "$", message: `Invalid JSON data: ${(e as Error).message}` }]);
      return;
    }

    try {
      schemaObj = JSON.parse(schemaData);
    } catch (e) {
      setErrors([{ path: "$", message: `Invalid JSON Schema: ${(e as Error).message}` }]);
      return;
    }

    const validationErrors: ValidationError[] = [];

    function validateType(value: any, type: string): boolean {
      switch (type) {
        case "string": return typeof value === "string";
        case "number": return typeof value === "number";
        case "integer": return typeof value === "number" && Number.isInteger(value);
        case "boolean": return typeof value === "boolean";
        case "array": return Array.isArray(value);
        case "object": return typeof value === "object" && value !== null && !Array.isArray(value);
        case "null": return value === null;
        default: return true;
      }
    }

    function validate(value: any, schema: any, path: string) {
      if (!schema) return;

      // Check type
      if (schema.type) {
        const types = Array.isArray(schema.type) ? schema.type : [schema.type];
        if (!types.some((type: string) => validateType(value, type))) {
          validationErrors.push({
            path,
            message: `Type mismatch`,
            expected: types.join(" or "),
            actual: Array.isArray(value) ? "array" : value === null ? "null" : typeof value,
          });
          return;
        }
      }

      // Check enum
      if (schema.enum) {
        if (!schema.enum.includes(value)) {
          validationErrors.push({
            path,
            message: `Value not in enum`,
            expected: schema.enum.join(", "),
            actual: String(value),
          });
        }
      }

      // String validations
      if (typeof value === "string") {
        if (schema.minLength && value.length < schema.minLength) {
          validationErrors.push({
            path,
            message: `String too short`,
            expected: `minLength: ${schema.minLength}`,
            actual: `length: ${value.length}`,
          });
        }
        if (schema.maxLength && value.length > schema.maxLength) {
          validationErrors.push({
            path,
            message: `String too long`,
            expected: `maxLength: ${schema.maxLength}`,
            actual: `length: ${value.length}`,
          });
        }
        if (schema.pattern) {
          const regex = new RegExp(schema.pattern);
          if (!regex.test(value)) {
            validationErrors.push({
              path,
              message: `Pattern mismatch`,
              expected: `pattern: ${schema.pattern}`,
              actual: value,
            });
          }
        }
      }

      // Number validations
      if (typeof value === "number") {
        if (schema.minimum !== undefined && value < schema.minimum) {
          validationErrors.push({
            path,
            message: `Value below minimum`,
            expected: `minimum: ${schema.minimum}`,
            actual: String(value),
          });
        }
        if (schema.maximum !== undefined && value > schema.maximum) {
          validationErrors.push({
            path,
            message: `Value above maximum`,
            expected: `maximum: ${schema.maximum}`,
            actual: String(value),
          });
        }
      }

      // Array validations
      if (Array.isArray(value)) {
        if (schema.minItems && value.length < schema.minItems) {
          validationErrors.push({
            path,
            message: `Array too short`,
            expected: `minItems: ${schema.minItems}`,
            actual: `length: ${value.length}`,
          });
        }
        if (schema.maxItems && value.length > schema.maxItems) {
          validationErrors.push({
            path,
            message: `Array too long`,
            expected: `maxItems: ${schema.maxItems}`,
            actual: `length: ${value.length}`,
          });
        }
        if (schema.items) {
          value.forEach((item, index) => {
            validate(item, schema.items, `${path}[${index}]`);
          });
        }
      }

      // Object validations
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        // Required fields
        if (schema.required) {
          schema.required.forEach((req: string) => {
            if (!(req in value)) {
              validationErrors.push({
                path: `${path}.${req}`,
                message: `Required property missing`,
              });
            }
          });
        }

        // Properties validation
        if (schema.properties) {
          Object.entries(schema.properties).forEach(([key, propSchema]) => {
            if (key in value) {
              validate(value[key], propSchema, `${path}.${key}`);
            }
          });
        }
      }
    }

    validate(dataObj, schemaObj, "$");
    setErrors(validationErrors);
    setIsValid(validationErrors.length === 0);

    if (validationErrors.length === 0) {
      toast.success("JSON is valid against the schema!");
    } else {
      toast.error(`Found ${validationErrors.length} validation error(s)`);
    }
  }, [jsonData, schemaData]);

  const clearAll = () => {
    setJsonData("");
    setSchemaData("");
    setErrors([]);
    setIsValid(null);
  };

  const loadSample = () => {
    setJsonData(JSON.stringify({
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      roles: ["user", "admin"]
    }, null, 2));
    setSchemaData(JSON.stringify({
      type: "object",
      required: ["name", "email"],
      properties: {
        name: { type: "string", minLength: 1 },
        age: { type: "integer", minimum: 0, maximum: 150 },
        email: { type: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
        roles: { type: "array", items: { type: "string" } }
      }
    }, null, 2));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Schema Validator – Validate Against Schema</h1>
          <p className="text-muted-foreground">
            Validate JSON data against any JSON Schema and get detailed error reports. Our free JSON Schema Validator ensures your data conforms to expected types and structures.
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
                <Button onClick={validateJsonSchema}>
                  <Check className="h-4 w-4 mr-2" />
                  Validate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="jsonData" className="text-sm font-medium text-muted-foreground mb-2 block">
                JSON Data
              </Label>
              <Textarea
                id="jsonData"
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                placeholder='{"name": "John", "age": 30}'
                className="min-h-[300px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label htmlFor="schemaData" className="text-sm font-medium text-muted-foreground mb-2 block">
                JSON Schema
              </Label>
              <Textarea
                id="schemaData"
                value={schemaData}
                onChange={(e) => setSchemaData(e.target.value)}
                placeholder='{"type": "object", "properties": {...}}'
                className="min-h-[300px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        </div>

        {/* Validation Result */}
        {isValid !== null && (
          <Card className={`border-2 ${isValid ? "border-green-500" : "border-destructive"}`}>
            <CardContent className="p-6">
              {isValid ? (
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                      Valid Against Schema
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      The JSON data conforms to the provided schema.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive">
                      <X className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-destructive">
                        Schema Validation Failed
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Found {errors.length} validation error(s)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {errors.map((error, index) => (
                      <div key={index} className="bg-muted rounded-md p-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <span className="font-mono text-sm text-destructive">{error.path}</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">{error.message}</p>
                        {error.expected && (
                          <p className="text-xs text-muted-foreground ml-6">
                            Expected: <span className="font-mono">{error.expected}</span>
                          </p>
                        )}
                        {error.actual && (
                          <p className="text-xs text-muted-foreground ml-6">
                            Actual: <span className="font-mono">{error.actual}</span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
