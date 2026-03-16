"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function YamlToEnvironmentVariablesConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState<"bash" | "docker" | "windows" | "json">("bash");
  const [prefix, setPrefix] = useState("");

  const flattenObject = (obj: Record<string, unknown>, parentKey = ""): Record<string, string> => {
    const result: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const newKey = parentKey ? `${parentKey}_${key}` : key;
      
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
      } else {
        // Convert to uppercase and replace special chars
        const envKey = newKey.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
        result[envKey] = String(value);
      }
    }
    
    return result;
  };

  const parseYaml = (yaml: string): Record<string, unknown> => {
    // Simple YAML parser for basic key-value pairs and nested objects
    const result: Record<string, unknown> = {};
    const lines = yaml.split("\n");
    const stack: { obj: Record<string, unknown>; indent: number }[] = [{ obj: result, indent: -1 }];
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      
      const indent = line.search(/\S/);
      const match = trimmed.match(/^(\w+):\s*(.*)$/);
      
      if (!match) continue;
      
      const [, key, value] = match;
      
      // Pop stack until we find parent with smaller indent
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      
      const current = stack[stack.length - 1].obj;
      
      if (value === "" || value === "{}" || value === "[]") {
        current[key] = {};
        stack.push({ obj: current[key] as Record<string, unknown>, indent });
      } else {
        // Parse value
        let parsedValue: unknown = value;
        
        if (value === "true") parsedValue = true;
        else if (value === "false") parsedValue = false;
        else if (value === "null" || value === "~") parsedValue = null;
        else if (/^-?\d+$/.test(value)) parsedValue = parseInt(value, 10);
        else if (/^-?\d*\.\d+$/.test(value)) parsedValue = parseFloat(value);
        else if ((value.startsWith('"') && value.endsWith('"')) || 
                 (value.startsWith("'") && value.endsWith("'"))) {
          parsedValue = value.slice(1, -1);
        }
        
        current[key] = parsedValue;
      }
    }
    
    return result;
  };

  const formatOutput = (envVars: Record<string, string>) => {
    const entries = Object.entries(envVars).map(([key, value]) => {
      const finalKey = prefix ? `${prefix}_${key}` : key;
      return [finalKey, value];
    });

    switch (format) {
      case "bash":
        return entries.map(([k, v]) => `export ${k}="${v}"`).join("\n");
      case "docker":
        return entries.map(([k, v]) => `${k}=${v}`).join("\n");
      case "windows":
        return entries.map(([k, v]) => `set ${k}=${v}`).join("\n");
      case "json":
        return JSON.stringify(Object.fromEntries(entries), null, 2);
      default:
        return entries.map(([k, v]) => `${k}=${v}`).join("\n");
    }
  };

  const handleConvert = () => {
    if (!input) return;

    try {
      const parsed = parseYaml(input);
      const flattened = flattenObject(parsed);
      setOutput(formatOutput(flattened));
    } catch (e) {
      setOutput("Error: Invalid YAML format");
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleDownload = () => {
    if (output) {
      const ext = format === "json" ? "json" : format === "bash" ? "sh" : "env";
      const blob = new Blob([output], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `environment.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">YAML to Environment Variables Converter</h2>
        <p className="text-sm text-muted-foreground">
          Convert YAML configuration data into environment variable exports
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["bash", "docker", "windows", "json"] as const).map((f) => (
              <Button
                key={f}
                variant={format === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFormat(f)}
              >
                {f === "bash" ? "Bash Export" : f === "docker" ? "Docker ENV" : f === "windows" ? "Windows SET" : "JSON"}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="prefix">Variable Prefix (optional)</Label>
            <Input
              id="prefix"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="APP"
            />
            <p className="text-xs text-muted-foreground">
              Adds prefix to all variable names (e.g., APP_DATABASE_URL)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">YAML Input</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`database:
  host: localhost
  port: 5432
  name: myapp`}
              className="w-full min-h-[200px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Convert
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleConvert} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Convert
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Environment Variables</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleCopy();
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto whitespace-pre-wrap">
            {output}
          </pre>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Example Conversion</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-sm text-muted-foreground mb-2">YAML Input</div>
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
{`database:
  host: localhost
  port: 5432
app:
  debug: true`}
            </pre>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">Bash Output</div>
            <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
{`export DATABASE_HOST="localhost"
export DATABASE_PORT="5432"
export APP_DEBUG="true"`}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
}
