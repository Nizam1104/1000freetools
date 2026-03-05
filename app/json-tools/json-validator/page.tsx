"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/ui/json-editor";
import { Label } from "@/components/ui/label";
import { Check, FileJson, RotateCcw, Trash2, X, Download } from "lucide-react";
import { toast } from "sonner";

interface ValidationError {
  message: string;
  line: number;
  column: number;
  explanation: string;
}

export default function JsonValidatorPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<ValidationError | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateJson = useCallback(() => {
    if (!input.trim()) {
      setError({
        message: "Empty input",
        line: 1,
        column: 1,
        explanation: "Please enter JSON to validate",
      });
      setIsValid(false);
      return;
    }

    try {
      JSON.parse(input);
      setError(null);
      setIsValid(true);
      toast.success("JSON is valid!");
    } catch (e) {
      const errorMatch = (e as Error).message.match(/position (\d+)/);
      const position = errorMatch ? parseInt(errorMatch[1]) : 0;

      const lines = input.substring(0, position).split("\n");
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;

      let explanation = "The JSON parser encountered a syntax error.";
      const msg = (e as Error).message.toLowerCase();

      if (msg.includes("unexpected token")) {
        explanation = "There's an unexpected character or symbol. Check for missing commas, quotes, or brackets.";
      } else if (msg.includes("string")) {
        explanation = "String syntax error. Ensure all strings are properly quoted with double quotes.";
      } else if (msg.includes("number")) {
        explanation = "Number format error. Check for invalid number syntax.";
      } else if (msg.includes("property")) {
        explanation = "Object property syntax error. Ensure property names are in double quotes.";
      }

      setError({
        message: (e as Error).message,
        line,
        column,
        explanation,
      });
      setIsValid(false);
    }
  }, [input]);

  const clearAll = () => {
    setInput("");
    setError(null);
    setIsValid(null);
  };

  const loadSample = () => {
    const sample = JSON.stringify({ name: "Example", version: 1, features: ["fast", "simple"] }, null, 2);
    setInput(sample);
  };

  const loadInvalidSample = () => {
    const invalid = `{
  "name": "Example",
  "version": 1,
  "features": ["fast", "simple"
}`;
    setInput(invalid);
  };

  const statusColor = useMemo(() => {
    if (isValid === null) return "border-border";
    return isValid ? "border-green-500 bg-green-500/10" : "border-destructive bg-destructive/10";
  }, [isValid]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Validator – Validate JSON Online Free</h1>
          <p className="text-muted-foreground">
            Validate JSON syntax instantly with our free online JSON Validator. Get precise error messages with line and column numbers to debug and fix malformed JSON fast.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Valid Sample
                </Button>
                <Button variant="outline" size="sm" onClick={loadInvalidSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Invalid Sample
                </Button>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={validateJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Validate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Input */}
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input JSON
              </Label>
              <JsonEditor
                id="input"
                value={input}
                onChange={setInput}
                placeholder='Paste your JSON here to validate...'
              />
            </CardContent>
          </Card>

          {/* Validation Result */}
          {isValid !== null && (
            <Card className={`border-2 ${statusColor}`}>
              <CardContent className="p-6">
                {isValid ? (
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                      <Check className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                        Valid JSON
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Your JSON syntax is correct and properly formatted.
                      </p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive">
                        <X className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-destructive">
                          Invalid JSON
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Error at line {error.line}, column {error.column}
                        </p>
                      </div>
                    </div>

                    <div className="bg-muted rounded-md p-4 space-y-2">
                      <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                        <span className="text-muted-foreground font-medium">Error:</span>
                        <span className="font-mono text-destructive">{error.message}</span>

                        <span className="text-muted-foreground font-medium">Position:</span>
                        <span>Line {error.line}, Column {error.column}</span>

                        <span className="text-muted-foreground font-medium">Explanation:</span>
                        <span>{error.explanation}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON Validator</h2>
        <p className="text-muted-foreground mb-6">
          A single syntax error can break your entire application. This validator checks your JSON for proper syntax and pinpoints the exact location of any errors, saving you hours of debugging time.
        </p>

        <h3 className="text-xl font-semibold mb-3">How it works</h3>
        <p className="text-muted-foreground mb-2">
          The tool uses the browser's native JSON.parse to validate your input. When an error occurs, it extracts the position and calculates the exact line and column numbers.
        </p>
        <p className="text-muted-foreground mb-8">
          Smart error analysis provides human-readable explanations for common mistakes like missing commas, unquoted strings, or trailing commas that JavaScript doesn't allow in JSON.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You copied JSON from a log file or API response and need to verify it's valid before using it. Quick validation catches copy-paste errors before they cause problems.
        </p>
        <p className="text-muted-foreground mb-8">
          This validator checks syntax only, not semantic correctness. Your JSON might be syntactically valid but still contain wrong data types or missing required fields.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">What JSON syntax errors does it catch?</p>
            <p className="text-muted-foreground">Missing quotes around keys or strings, trailing commas, unmatched brackets, invalid escape sequences, and unquoted reserved words like true or null.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can it validate large files?</p>
            <p className="text-muted-foreground">Yes, but very large files may take a moment to process. For files over 50MB, consider using a command-line validator for better performance.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Does it check JSON Schema?</p>
            <p className="text-muted-foreground">No, this validates syntax only. For schema validation against a defined structure, use the JSON Schema Validator tool instead.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What's the difference between valid and invalid samples?</p>
            <p className="text-muted-foreground">Load Valid Sample to see properly formatted JSON. Load Invalid Sample to see common errors and how the validator reports them.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Is my data sent anywhere?</p>
            <p className="text-muted-foreground">No, validation happens entirely in your browser. Your JSON data never leaves your device, making it safe for sensitive information.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-schema-validator" className="text-primary hover:underline">JSON Schema Validator</a> – Validate against a schema
          </li>
          <li>
            <a href="/json-tools/json-linter" className="text-primary hover:underline">JSON Linter</a> – Lint and fix JSON issues
          </li>
          <li>
            <a href="/json-tools/json-pretty-print" className="text-primary hover:underline">JSON Pretty Print</a> – Format valid JSON
          </li>
        </ul>
      </div>
    </div>
  );
}
