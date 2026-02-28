"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface EmptyField {
  path: string;
  type: "null" | "empty_string" | "empty_array" | "empty_object";
  value: any;
}

export default function JsonEmptyFieldFinderPage() {
  const [input, setInput] = useState("");
  const [emptyFields, setEmptyFields] = useState<EmptyField[] | null>(null);

  const findEmptyFields = useCallback((obj: any, path: string = "$", results: EmptyField[] = []): EmptyField[] => {
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
  }, []);

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
    setInput(JSON.stringify({
      name: "Test",
      description: "",
      data: null,
      items: [],
      meta: {},
      valid: "value"
    }, null, 2));
  };

  const copyResult = () => {
    if (emptyFields) {
      navigator.clipboard.writeText(JSON.stringify(emptyFields, null, 2));
      toast.success("Empty fields copied to clipboard");
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "null": return "bg-gray-500";
      case "empty_string": return "bg-yellow-500";
      case "empty_array": return "bg-orange-500";
      case "empty_object": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Empty Field Finder – Find Null & Empty Values</h1>
          <p className="text-muted-foreground">
            Identify null, empty string, and missing values in your JSON data instantly. Our free JSON Empty Field Finder helps you clean datasets and ensure data completeness.
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
            <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
              Input JSON
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "Test", "description": "", "data": null}'
              className="min-h-[300px] font-mono text-sm resize-none"
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
                    <span className="font-semibold">Found {emptyFields.length} empty field(s)</span>
                  </div>
                  {emptyFields.map((field, index) => (
                    <div key={index} className="bg-muted rounded-md p-3 flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(field.type)}`} />
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
      </div>
    </div>
  );
}
