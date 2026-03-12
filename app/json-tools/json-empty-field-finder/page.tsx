"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { JsonEditor } from "@/components/utils/json-editor";

interface EmptyField {
  path: string;
  type: "null" | "empty_string" | "empty_array" | "empty_object";
  value: any;
}

export default function JsonEmptyFieldFinderPage() {
  const [input, setInput] = useState("");
  const [emptyFields, setEmptyFields] = useState<EmptyField[] | null>(null);

  const findEmptyFields = useCallback(
    (
      obj: any,
      path: string = "$",
      results: EmptyField[] = [],
    ): EmptyField[] => {
      if (obj === null) {
        results.push({ path, type: "null", value: null });
        return results;
      }

      if (typeof obj === "string" && obj === "") {
        results.push({ path, type: "empty_string", value: "" });
        return results;
      }

      if (Array.isArray(obj)) {
        if (obj.length === 0) {
          results.push({ path, type: "empty_array", value: [] });
        } else {
          obj.forEach((item, index) => {
            findEmptyFields(item, `${path}[${index}]`, results);
          });
        }
        return results;
      }

      if (typeof obj === "object") {
        const keys = Object.keys(obj);
        if (keys.length === 0) {
          results.push({ path, type: "empty_object", value: {} });
        } else {
          Object.entries(obj).forEach(([key, value]) => {
            findEmptyFields(value, `${path}.${key}`, results);
          });
        }
        return results;
      }

      return results;
    },
    [],
  );

  const findEmpty = useCallback(() => {
    setEmptyFields(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const results = findEmptyFields(obj);
    setEmptyFields(results);

    if (results.length > 0) {
      toast.warning(`Found ${results.length} empty field(s)`);
    } else {
      toast.success("No empty fields found");
    }
  }, [input, findEmptyFields]);

  const clearAll = () => {
    setInput("");
    setEmptyFields(null);
  };

  const loadSample = () => {
    setInput(
      JSON.stringify(
        {
          name: "Test",
          description: "",
          data: null,
          items: [],
          meta: {},
          valid: "value",
        },
        null,
        2,
      ),
    );
  };

  const copyResult = () => {
    if (emptyFields) {
      navigator.clipboard.writeText(JSON.stringify(emptyFields, null, 2));
      toast.success("Empty fields copied to clipboard");
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "null":
        return "bg-gray-500";
      case "empty_string":
        return "bg-yellow-500";
      case "empty_array":
        return "bg-orange-500";
      case "empty_object":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Empty Field Finder – Find Null & Empty Values
          </h1>
          <p className="text-muted-foreground">
            Identify null, empty string, and missing values in your JSON data
            instantly. Our free JSON Empty Field Finder helps you clean datasets
            and ensure data completeness.
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
                {emptyFields && (
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
                <Button onClick={findEmpty}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Find Empty
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
              placeholder='{"name": "Test", "description": "", "data": null}'
            />
          </CardContent>
        </Card>

        {/* Result */}
        {emptyFields && (
          <Card>
            <CardContent className="p-4">
              {emptyFields.length === 0 ? (
                <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                      No Empty Fields
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      All fields contain values.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">
                      Found {emptyFields.length} empty field(s)
                    </span>
                  </div>
                  {emptyFields.map((field, index) => (
                    <div
                      key={index}
                      className="bg-muted rounded-md p-3 flex items-center gap-3"
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${getTypeColor(field.type)}`}
                      />
                      <span className="font-mono text-sm">{field.path}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted-foreground/20">
                        {field.type.replace("_", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Empty Field Finder
          </h2>
          <p className="text-muted-foreground mb-6">
            Null values and empty fields in JSON can cause runtime errors or
            display issues in your application. This tool scans your JSON and
            identifies all null values, empty strings, empty arrays, and empty
            objects so you can handle them properly.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON and click Find Empty. The tool recursively checks
            every value, flagging nulls, empty strings, empty arrays, and empty
            objects with their full path.
          </p>
          <p className="text-muted-foreground mb-8">
            Results are color-coded by type: gray for null, yellow for empty
            strings, orange for empty arrays, and purple for empty objects. Each
            result shows the path so you can locate and fix the issue.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You're cleaning a dataset before importing it into your application.
            Find all empty fields first so you can decide whether to fill them,
            remove them, or handle them in code.
          </p>
          <p className="text-muted-foreground mb-8">
            This tool identifies empty fields but doesn't modify your JSON.
            You'll need to manually fix issues or use a transformation tool to
            remove or replace empty values.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">What counts as an empty field?</p>
              <p className="text-muted-foreground">
                Null values, empty strings "", empty arrays [], and empty
                objects { } are all considered empty and will be flagged.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                How are nested empty fields found?
              </p>
              <p className="text-muted-foreground">
                The tool checks every level recursively. Empty fields deep in
                nested objects are found and their full path is shown.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Are zero and false considered empty?
              </p>
              <p className="text-muted-foreground">
                No, zero (0) and false are valid values. Only null, empty
                strings, empty arrays, and empty objects are flagged.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I export the results?</p>
              <p className="text-muted-foreground">
                Yes, use the Copy button to copy all empty field locations as
                JSON. This is useful for documentation or bug reports.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What if no empty fields are found?
              </p>
              <p className="text-muted-foreground">
                A green success message appears confirming all fields have
                values. Your JSON is ready to use without empty field concerns.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
