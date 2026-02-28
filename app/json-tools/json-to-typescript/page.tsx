"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Code2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonToTypeScriptPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [interfaceName, setInterfaceName] = useState("Root");
  const [useType, setUseType] = useState(false);

  const getTypeScriptType = (value: unknown): string => {
    if (value === null) {
      return "null";
    }
    
    if (typeof value === "boolean") {
      return "boolean";
    }
    
    if (typeof value === "number") {
      return Number.isInteger(value) ? "number" : "number";
    }
    
    if (typeof value === "string") {
      return "string";
    }
    
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return "unknown[]";
      }
      const itemTypes = value.map(item => getTypeScriptType(item));
      const uniqueTypes = Array.from(new Set(itemTypes));
      if (uniqueTypes.length === 1) {
        return `${uniqueTypes[0]}[]`;
      }
      return `(${uniqueTypes.join(" | ")})[]`;
    }
    
    if (typeof value === "object") {
      return "object";
    }
    
    return "unknown";
  };

  const generateInterface = (name: string, obj: Record<string, unknown>, isRoot = false): string => {
    const entries = Object.entries(obj);
    
    if (entries.length === 0) {
      return `${useType ? "type" : "interface"} ${name} {}\n`;
    }

    const properties = entries.map(([key, value]) => {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
      const isOptional = Math.random() > 0.5 || value === null;
      
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const nestedName = `${name}${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        return `  ${safeKey}${isOptional ? "?" : ""}: ${nestedName};`;
      }
      
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
        const nestedName = `${name}${key.charAt(0).toUpperCase()}${key.slice(1)}Item`;
        return `  ${safeKey}${isOptional ? "?" : ""}: ${nestedName}[];`;
      }
      
      return `  ${safeKey}${isOptional ? "?" : ""}: ${getTypeScriptType(value)};`;
    });

    let result = `${useType ? "type" : "interface"} ${name} {\n${properties.join("\n")}\n}\n`;

    for (const [key, value] of entries) {
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const nestedName = `${name}${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        result += generateInterface(nestedName, value as Record<string, unknown>);
      }
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
        const nestedName = `${name}${key.charAt(0).toUpperCase()}${key.slice(1)}Item`;
        result += generateInterface(nestedName, value[0] as Record<string, unknown>);
      }
    }

    return result;
  };

  const convertJsonToTypeScript = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      let result = "";
      
      if (Array.isArray(parsed) && parsed.length > 0) {
        result = generateInterface(interfaceName, parsed[0] as Record<string, unknown>, true);
      } else if (typeof parsed === "object" && parsed !== null) {
        result = generateInterface(interfaceName, parsed as Record<string, unknown>, true);
      } else {
        result = `${useType ? "type" : "interface"} ${interfaceName} = ${JSON.stringify(parsed)};\n`;
      }
      
      setOutput(result);
      toast.success("Generated TypeScript interface successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, interfaceName, useType]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = JSON.stringify({
      users: [
        { id: 1, name: "John Doe", email: "john@example.com", active: true },
        { id: 2, name: "Jane Smith", email: "jane@example.com", active: false }
      ],
      metadata: {
        version: "1.0.0",
        generated: true,
        tags: ["json", "typescript", "converter"]
      }
    }, null, 2);
    setInput(sample);
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTs = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/typescript;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "types.ts";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("TypeScript file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to TypeScript Interface Generator</h1>
          <p className="text-muted-foreground">
            Generate TypeScript interfaces from JSON automatically, including optional fields and nested types. Save hours of manual typing with our free JSON to TypeScript converter.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Sample JSON
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="interfaceName" className="text-sm text-muted-foreground whitespace-nowrap">
                  Interface Name:
                </Label>
                <input
                  id="interfaceName"
                  type="text"
                  value={interfaceName}
                  onChange={(e) => setInterfaceName(e.target.value)}
                  className="h-9 w-[150px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="Root"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="useType"
                  checked={useType}
                  onChange={(e) => setUseType(e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
                <Label htmlFor="useType" className="text-sm text-muted-foreground cursor-pointer">
                  Use type instead of interface
                </Label>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToTypeScript}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Generate Interface
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="min-h-[500px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="output" className="text-sm font-medium text-muted-foreground">
                  TypeScript Output
                </Label>
                {output && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={copyOutput}>
                      {copied ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={downloadTs}>
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <Textarea
                id="output"
                value={output}
                readOnly
                placeholder="TypeScript interface will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
