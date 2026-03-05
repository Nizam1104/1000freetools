"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function JsonConfigValidatorPage() {
  const [input, setInput] = useState("");
  const [requiredKeys, setRequiredKeys] = useState<string[]>(["name", "version"]);
  const [result, setResult] = useState<{ valid: boolean; errors: string[]; warnings: string[] } | null>(null);

  const addKey = () => {
    setRequiredKeys([...requiredKeys, ""]);
  };

  const removeKey = (index: number) => {
    setRequiredKeys(requiredKeys.filter((_, i) => i !== index));
  };

  const updateKey = (index: number, value: string) => {
    const updated = [...requiredKeys];
    updated[index] = value;
    setRequiredKeys(updated);
  };

  const validateConfig = useCallback(() => {
    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      setResult({ valid: false, errors: [`Invalid JSON: ${(e as Error).message}`], warnings: [] });
      toast.error("Invalid JSON");
      return;
    }

    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required keys
    for (const key of requiredKeys.filter(k => k.trim())) {
      if (!(key in obj)) {
        errors.push(`Missing required key: "${key}"`);
      }
    }

    // Check for empty values
    function checkEmpty(value: any, path: string) {
      if (value === null) {
        warnings.push(`Null value at: ${path}`);
      } else if (value === "") {
        warnings.push(`Empty string at: ${path}`);
      } else if (Array.isArray(value) && value.length === 0) {
        warnings.push(`Empty array at: ${path}`);
      } else if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([k, v]) => {
          checkEmpty(v, `${path}.${k}`);
        });
      }
    }

    Object.entries(obj).forEach(([key, value]) => {
      checkEmpty(value, key);
    });

    // Check for common config patterns
    if ("port" in obj && (typeof obj.port !== "number" || obj.port < 1 || obj.port > 65535)) {
      warnings.push("Port should be a number between 1 and 65535");
    }

    if ("debug" in obj && typeof obj.debug !== "boolean") {
      warnings.push("Debug flag should be a boolean");
    }

    setResult({
      valid: errors.length === 0,
      errors,
      warnings
    });

    if (errors.length === 0) {
      toast.success(warnings.length > 0 ? "Valid with warnings" : "Configuration is valid");
    } else {
      toast.error(`Found ${errors.length} error(s)`);
    }
  }, [input, requiredKeys]);

  const clearAll = () => {
    setInput("");
    setResult(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      name: "my-app",
      version: "1.0.0",
      port: 3000,
      debug: true,
      database: {
        host: "localhost",
        port: 5432
      }
    }, null, 2));
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      toast.success("Validation result copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Config File Validator Online</h1>
          <p className="text-muted-foreground">
            Validate JSON configuration files and check for required keys and correct structure. Our free JSON Config Validator helps prevent misconfiguration errors before deployment.
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
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
                <Button onClick={validateConfig}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Validate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
              Configuration JSON
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "my-app", "version": "1.0.0"}'
              className="min-h-[200px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Required Keys */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-medium text-muted-foreground">
                Required Keys
              </Label>
              <Button variant="outline" size="sm" onClick={addKey}>
                <Plus className="h-4 w-4 mr-2" />
                Add Key
              </Button>
            </div>
            <div className="space-y-3">
              {requiredKeys.map((key, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={key}
                    onChange={(e) => updateKey(index, e.target.value)}
                    placeholder="Key name"
                    className="font-mono text-sm h-9"
                    onKeyDown={(e) => e.key === "Enter" && addKey()}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeKey(index)}
                    disabled={requiredKeys.length === 1}
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
          <Card className={result.valid ? "border-green-500" : "border-destructive"}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${result.valid ? "bg-green-500" : "bg-destructive"}`}>
                  {result.valid ? (
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <X className="h-5 w-5 text-white" />
                  )}
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${result.valid ? "text-green-600" : "text-destructive"}`}>
                    {result.valid ? "Valid Configuration" : "Invalid Configuration"}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {result.errors.length} error(s), {result.warnings.length} warning(s)
                  </p>
                </div>
              </div>

              {result.errors.length > 0 && (
                <div className="mb-4">
                  <Label className="text-sm font-medium text-destructive mb-2 block">Errors</Label>
                  <ul className="space-y-1">
                    {result.errors.map((error, i) => (
                      <li key={i} className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.warnings.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-yellow-600 mb-2 block">Warnings</Label>
                  <ul className="space-y-1">
                    {result.warnings.map((warning, i) => (
                      <li key={i} className="text-sm text-yellow-600 bg-yellow-500/10 p-2 rounded">
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON Config Validator</h2>
          <p className="text-muted-foreground mb-6">
            Configuration files drive your application behavior, and a single typo can cause deployment failures. This tool validates your JSON config files against required keys and common patterns before you deploy, catching errors early in the process.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Define which keys must exist in your configuration by adding them to the required keys list. The validator checks your JSON and reports any missing required fields along with potential issues like empty values.
          </p>
          <p className="text-muted-foreground mb-8">
            Smart pattern detection looks for common configuration fields like port numbers and debug flags, warning you if they have unexpected types or out-of-range values that could cause runtime problems.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Before deploying a new environment configuration, validate that all required settings are present. This prevents application crashes from missing database URLs, API keys, or other critical settings.
          </p>
          <p className="text-muted-foreground mb-8">
            This validator checks structure and common patterns, not semantic correctness. It won't verify if your database connection string actually works, only that the field exists and isn't empty.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">How do I add required keys?</p>
              <p className="text-muted-foreground">Click Add Key to create a new required field entry. Type the exact key name as it appears in your JSON. Press Enter to add multiple keys quickly.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Does it check nested configuration?</p>
              <p className="text-muted-foreground">The validator checks for empty values at all nesting levels. Required key checking is currently limited to top-level keys only.</p>
            </div>
            <div>
              <p className="font-medium mb-1">What warnings does it generate?</p>
              <p className="text-muted-foreground">Warnings include null values, empty strings, empty arrays, and type mismatches for common fields like port (should be 1-65535) and debug (should be boolean).</p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I save my required keys list?</p>
              <p className="text-muted-foreground">Currently the list resets when you clear or reload. For repeated validation with the same schema, consider using a dedicated JSON Schema validator.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Is my configuration data sent anywhere?</p>
              <p className="text-muted-foreground">No, all validation happens in your browser. Your configuration data never leaves your device, making it safe to validate sensitive settings.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="/json-tools/json-schema-validator" className="text-primary hover:underline">JSON Schema Validator</a> – Validate against full JSON Schema
            </li>
            <li>
              <a href="/json-tools/json-validator" className="text-primary hover:underline">JSON Validator</a> – Check JSON syntax
            </li>
            <li>
              <a href="/json-tools/json-empty-field-finder" className="text-primary hover:underline">JSON Empty Field Finder</a> – Find null and empty values
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
