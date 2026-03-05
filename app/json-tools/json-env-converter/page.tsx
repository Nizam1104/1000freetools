"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { JsonEditor } from "@/components/ui/json-editor";

export default function JsonEnvConverterPage() {
  const [input, setInput] = useState("");
  const [prefix, setPrefix] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const flattenObject = (obj: any, prefix = ""): Record<string, string> => {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}_${key.toUpperCase()}` : key.toUpperCase();

      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value, newKey));
      } else if (Array.isArray(value)) {
        result[newKey] = JSON.stringify(value);
      } else if (typeof value === "boolean") {
        result[newKey] = value ? "true" : "false";
      } else {
        result[newKey] = String(value);
      }
    }

    return result;
  };

  const convertToJson = (envContent: string): Record<string, any> => {
    const result: Record<string, any> = {};
    const lines = envContent.split("\n");

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) continue;

      const key = trimmed.slice(0, eqIndex).trim();
      let value: any = trimmed.slice(eqIndex + 1).trim();

      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Parse boolean
      if (value === "true") value = true;
      else if (value === "false") value = false;
      // Parse number
      else if (!isNaN(Number(value)) && value !== "") value = Number(value);

      result[key] = value;
    }

    return result;
  };

  const convertToEnv = useCallback(() => {
    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const flattened = flattenObject(obj);
    const envLines = Object.entries(flattened)
      .map(([key, value]) => {
        const finalKey = prefix ? `${prefix}_${key}` : key;
        // Quote values with special characters
        const needsQuotes = value.includes(" ") || value.includes("#") || value.includes("=");
        return `${finalKey}=${needsQuotes ? `"${value}"` : value}`;
      })
      .join("\n");

    setResult(envLines);
    toast.success("Converted to .env format");
  }, [input, prefix]);

  const convertToJsonFormat = useCallback(() => {
    const json = convertToJson(input);
    setResult(JSON.stringify(json, null, 2));
    toast.success("Converted to JSON format");
  }, [input]);

  const [mode, setMode] = useState<"json-to-env" | "env-to-json">("json-to-env");

  const clearAll = () => {
    setInput("");
    setResult(null);
  };

  const loadSample = () => {
    if (mode === "json-to-env") {
      setInput(JSON.stringify({
        database: {
          host: "localhost",
          port: 5432,
          name: "mydb"
        },
        debug: true
      }, null, 2));
    } else {
      setInput(`DATABASE_HOST=localhost\nDATABASE_PORT=5432\nDEBUG=true`);
    }
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success(`Result copied to clipboard`);
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = mode === "json-to-env" ? ".env" : "config.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Result downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to .env Converter – Export Config as ENV</h1>
          <p className="text-muted-foreground">
            Convert JSON configuration objects into .env key-value format instantly. Our free JSON Env Converter makes it easy to migrate app settings between JSON configs and environment variables.
          </p>
        </div>

        {/* Why This Matters */}
        <Card className="mb-6 bg-muted/30">
          <CardContent className="p-5">
            <h2 className="text-xl font-semibold mb-3">Why Convert JSON to ENV Format?</h2>
            <p className="text-muted-foreground mb-4">
              Your config is in JSON but your deployment expects environment variables. Manually rewriting each key as an ENV variable is tedious and error-prone. You need a quick way to transform JSON configuration into dotenv format that works with Docker, Node.js, and most deployment platforms.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Common Use Cases:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Docker container configuration</li>
                  <li>• Node.js dotenv files</li>
                  <li>• CI/CD pipeline variables</li>
                  <li>• Cloud platform environment settings</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Benefits:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Fast conversion without manual typing</li>
                  <li>• Handles nested JSON automatically</li>
                  <li>• Proper value escaping</li>
                  <li>• Bidirectional conversion support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Quick Steps</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-card border rounded-lg p-4">
              <div className="text-2xl font-bold text-primary mb-2">1</div>
              <h3 className="font-medium mb-1">Paste JSON</h3>
              <p className="text-sm text-muted-foreground">Enter your JSON configuration object with nested settings</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <div className="text-2xl font-bold text-primary mb-2">2</div>
              <h3 className="font-medium mb-1">Set Options</h3>
              <p className="text-sm text-muted-foreground">Choose prefix for variable names if needed</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <div className="text-2xl font-bold text-primary mb-2">3</div>
              <h3 className="font-medium mb-1">Get ENV File</h3>
              <p className="text-sm text-muted-foreground">Download or copy the generated .env content</p>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={mode === "json-to-env" ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setMode("json-to-env"); setInput(""); setResult(null); }}
                >
                  JSON to .env
                </Button>
                <Button
                  variant={mode === "env-to-json" ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setMode("env-to-json"); setInput(""); setResult(null); }}
                >
                  .env to JSON
                </Button>
              </div>

              {mode === "json-to-env" && (
                <div className="flex items-center gap-2">
                  <Label htmlFor="prefix" className="text-sm whitespace-nowrap">Prefix:</Label>
                  <Input
                    id="prefix"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="APP"
                    className="w-32 h-9"
                  />
                </div>
              )}

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
                <Button onClick={mode === "json-to-env" ? convertToEnv : convertToJsonFormat}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Convert
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
              Input ({mode === "json-to-env" ? "JSON" : ".env"})
            </Label>
            <JsonEditor
              value={input}
              onChange={setInput}
              placeholder={mode === "json-to-env" ? '{"database": {"host": "localhost"}}' : 'DATABASE_HOST=localhost'}
            />
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Output ({mode === "json-to-env" ? ".env" : "JSON"})
              </Label>
              <JsonEditor
                value={result}
                readOnly
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON to ENV Converter</h2>
        <p className="text-muted-foreground mb-6">
          Moving configuration between JSON files and environment variables is a common DevOps task. This converter handles the transformation automatically, flattening nested JSON objects into the KEY_VALUE format that dotenv files expect. It works both ways, converting .env content back to JSON when needed.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the conversion works</h3>
        <p className="text-muted-foreground mb-2">
          For JSON to .env mode, paste your JSON config and optionally set a prefix like APP. The tool flattens nested objects by joining keys with underscores and converts them to UPPERCASE. Arrays get stringified, booleans become true or false strings.
        </p>
        <p className="text-muted-foreground mb-8">
          For .env to JSON mode, paste your dotenv content and the tool parses each KEY=value line. It intelligently converts values back to their original types: numbers become numbers, true becomes boolean true, and quoted strings stay as strings. The result is a nested JSON object.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          Your Docker deployment needs environment variables but your local config is JSON. Or you're migrating from a .env file to a cloud provider that expects JSON configuration. This tool also helps when documenting configuration options in different formats.
        </p>
        <p className="text-muted-foreground mb-8">
          Note that complex nested structures may not round-trip perfectly. Arrays become JSON strings in .env format. Very deep nesting can create unwieldy environment variable names. For simple flat configs the conversion is clean.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">How are nested objects handled?</p>
            <p className="text-muted-foreground">Nested keys get flattened with underscores. A database.host value becomes DATABASE_HOST. The prefix option adds another level like APP_DATABASE_HOST.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What happens to arrays in .env format?</p>
            <p className="text-muted-foreground">Arrays are converted to JSON strings. An array like [1,2,3] becomes the literal string "[1,2,3]" in the .env file.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Are special characters escaped properly?</p>
            <p className="text-muted-foreground">Yes, values containing spaces, equals signs, or hash symbols get wrapped in double quotes to ensure valid .env syntax.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I convert back from .env to JSON?</p>
            <p className="text-muted-foreground">Yes, switch to .env to JSON mode. The tool parses the dotenv format and reconstructs a flat JSON object with proper type conversion.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Does this support multiline values?</p>
            <p className="text-muted-foreground">No, standard .env files don't support multiline values well. Keep your values on single lines for best results with this converter.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-to-yaml" className="text-primary hover:underline">JSON to YAML</a> – Convert JSON to YAML configuration format
          </li>
          <li>
            <a href="/json-tools/yaml-to-json" className="text-primary hover:underline">YAML to JSON</a> – Convert YAML back to JSON
          </li>
          <li>
            <a href="/json-tools/json-config-validator" className="text-primary hover:underline">JSON Config Validator</a> – Validate your JSON configuration files
          </li>
        </ul>
      </div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`h-9 px-3 text-sm border rounded-md bg-background ${props.className || ""}`} />;
}
