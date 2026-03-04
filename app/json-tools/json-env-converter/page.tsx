"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

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
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "json-to-env" ? '{"database": {"host": "localhost"}}' : 'DATABASE_HOST=localhost'}
              className="min-h-[200px] font-mono text-sm resize-none"
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

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`h-9 px-3 text-sm border rounded-md bg-background ${props.className || ""}`} />;
}
