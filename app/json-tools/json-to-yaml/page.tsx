"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Code2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JsonToYamlConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");
  const [copied, setCopied] = useState(false);
  const [quoteStrings, setQuoteStrings] = useState(false);

  const convertToJsonYaml = useCallback((obj: unknown, level: number = 0): string => {
    const indentStr = " ".repeat(parseInt(indent, 10) * level);
    const nextIndent = " ".repeat(parseInt(indent, 10) * (level + 1));

    if (obj === null) {
      return "null";
    }

    if (typeof obj === "boolean") {
      return obj ? "true" : "false";
    }

    if (typeof obj === "number") {
      return String(obj);
    }

    if (typeof obj === "string") {
      if (quoteStrings) {
        return `"${obj.replace(/"/g, '\\"')}"`;
      }

      if (obj === "" || obj.includes("\n") || obj.includes(":") || obj.includes("#") ||
          obj.startsWith(" ") || obj.endsWith(" ") ||
          /^[-?\d.]+$/.test(obj) ||
          /^(true|false|null|yes|no|on|off)$/i.test(obj)) {
        return `"${obj.replace(/"/g, '\\"')}"`;
      }

      return obj;
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return "[]";
      }

      return obj.map((item) => {
        if (typeof item === "object" && item !== null) {
          const itemYaml = convertToJsonYaml(item, level + 1);
          return `${indentStr}- ${itemYaml.split("\n").join(`\n${indentStr}  `)}`;
        }
        return `${indentStr}- ${convertToJsonYaml(item, 0)}`;
      }).join("\n");
    }

    if (typeof obj === "object") {
      const entries = Object.entries(obj);

      if (entries.length === 0) {
        return "{}";
      }

      return entries.map(([key, value]) => {
        const safeKey = needsQuotes(key) ? `"${key}"` : key;

        if (typeof value === "object" && value !== null && Object.keys(value).length > 0) {
          const valueYaml = convertToJsonYaml(value, level + 1);
          return `${indentStr}${safeKey}:\n${valueYaml}`;
        }

        return `${indentStr}${safeKey}: ${convertToJsonYaml(value, 0)}`;
      }).join("\n");
    }

    return String(obj);
  }, [indent, quoteStrings]);

  const needsQuotes = (key: string): boolean => {
    return key.includes(":") || key.includes("#") || key.includes("{") ||
           key.includes("}") || key.includes("[") || key.includes("]") ||
           key.includes(",") || key.includes("&") || key.includes("*") ||
           key.includes("?") || key.includes("|") || key.includes(">") ||
           key.includes("'") || key.includes('"') || key.includes("`") ||
           key.startsWith(" ") || key.endsWith(" ") ||
           /^[-?\d.]+$/.test(key);
  };

  const convertJsonToYaml = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const yamlContent = convertToJsonYaml(parsed, 0);
      setOutput(yamlContent);
      toast.success("Converted to YAML successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, convertToJsonYaml]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = {
      users: [
        { id: 1, name: "John Doe", email: "john@example.com", active: true },
        { id: 2, name: "Jane Smith", email: "jane@example.com", active: false },
      ],
      metadata: {
        version: "1.0.0",
        generated: true,
        tags: ["json", "yaml", "converter"],
      },
      settings: {
        theme: "dark",
        notifications: {
          email: true,
          push: false,
        },
      },
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadYaml = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/yaml;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.yaml";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("YAML file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to YAML Converter – Free Online Tool</h1>
          <p className="text-muted-foreground">
            Convert JSON to YAML with clean indentation and human-readable syntax. Our free JSON to YAML Converter is perfect for configuration files, CI/CD pipelines, and DevOps workflows.
          </p>
        </div>

        {/* When to Use */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-0">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold mb-3">When You Need YAML</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground mb-3">
                  Your config is in JSON but the tool you're using expects YAML. Kubernetes manifests, Docker Compose files, and CI configs all use YAML. Manually converting means watching your indentation carefully and quoting strings correctly.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-muted-foreground">Kubernetes manifests</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-muted-foreground">Docker Compose files</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-muted-foreground">GitHub Actions workflows</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-muted-foreground">Ansible playbooks</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features - Card Grid */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Proper YAML Formatting</h3>
              <p className="text-sm text-muted-foreground">Generates valid YAML with correct indentation and string quoting rules</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Array Conversion</h3>
              <p className="text-sm text-muted-foreground">Converts JSON arrays to YAML list format with dash prefixes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Nested Support</h3>
              <p className="text-sm text-muted-foreground">Handles deeply nested objects with correct indentation</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
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
                <Label htmlFor="indent" className="text-sm text-muted-foreground whitespace-nowrap">
                  Indent:
                </Label>
                <Select value={indent} onValueChange={setIndent}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 spaces</SelectItem>
                    <SelectItem value="4">4 spaces</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="quoteStrings"
                  checked={quoteStrings}
                  onChange={(e) => setQuoteStrings(e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
                <Label htmlFor="quoteStrings" className="text-sm text-muted-foreground cursor-pointer">
                  Quote all strings
                </Label>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToYaml}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Convert to YAML
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
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

          {/* Output */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="output" className="text-sm font-medium text-muted-foreground">
                  YAML Output
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
                    <Button variant="ghost" size="sm" onClick={downloadYaml}>
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
                placeholder="YAML output will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON to YAML Converter</h2>
        <p className="text-muted-foreground mb-6">
          YAML is a popular format for configuration files in DevOps and cloud infrastructure. This converter transforms JSON into clean YAML syntax with proper indentation and quoting. It's useful for Kubernetes configs, Docker Compose files, and CI/CD pipelines.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the conversion works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your JSON in the left panel and click Convert to YAML. The tool parses your JSON and rebuilds it using YAML syntax. Objects become nested mappings, arrays become lists with dashes, and values are properly quoted when needed.
        </p>
        <p className="text-muted-foreground mb-8">
          The output uses 2-space indentation by default. Strings with special characters get quoted. Boolean and null values use YAML format. Download the result as a .yaml file or copy it directly to your config.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          Your cloud provider expects YAML but your config is JSON. Or you're writing a Kubernetes manifest and want to convert from JSON examples. This tool also helps when migrating configs between systems that prefer different formats.
        </p>
        <p className="text-muted-foreground mb-8">
          YAML has features JSON doesn't support, like anchors and aliases. This converter creates basic YAML without advanced features. For complex YAML with references, manual editing may be needed after conversion.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">Does YAML support all JSON data types?</p>
            <p className="text-muted-foreground">Yes, YAML supports all JSON types plus more. Numbers, strings, booleans, null, arrays, and objects all convert cleanly.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How are special characters handled?</p>
            <p className="text-muted-foreground">Strings with colons, dashes, or leading spaces get quoted. This prevents YAML parsing issues with special syntax.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I convert YAML back to JSON?</p>
            <p className="text-muted-foreground">Yes, use our YAML to JSON tool for the reverse conversion. The round-trip should preserve your data structure.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What about comments in YAML?</p>
            <p className="text-muted-foreground">JSON doesn't support comments so they won't appear in the output. Add comments manually after conversion if needed.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Is the output valid for Kubernetes?</p>
            <p className="text-muted-foreground">The YAML syntax is valid but you'll need to ensure the structure matches Kubernetes schema requirements.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/yaml-to-json" className="text-primary hover:underline">YAML to JSON</a> – Convert YAML configuration back to JSON
          </li>
          <li>
            <a href="/json-tools/json-to-xml" className="text-primary hover:underline">JSON to XML</a> – Convert JSON to XML format
          </li>
          <li>
            <a href="/json-tools/json-formatter-beautifier" className="text-primary hover:underline">JSON Formatter</a> – Format and beautify JSON with indentation
          </li>
        </ul>
      </div>
    </div>
  );
}
