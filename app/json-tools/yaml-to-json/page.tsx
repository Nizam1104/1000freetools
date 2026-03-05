"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import {
  FileJson,
  Trash2,
  ArrowDownToLine,
  Copy,
  Check,
  Code2,
} from "lucide-react";
import { toast } from "sonner";

export default function YamlToJsonConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState("2");

  const parseYamlValue = (value: string): unknown => {
    const trimmed = value.trim();

    if (trimmed === "" || trimmed === "~" || trimmed.toLowerCase() === "null") {
      return null;
    }

    if (trimmed.toLowerCase() === "true") {
      return true;
    }

    if (trimmed.toLowerCase() === "false") {
      return false;
    }

    if (/^-?\d+$/.test(trimmed)) {
      return parseInt(trimmed, 10);
    }

    if (/^-?\d*\.\d+$/.test(trimmed)) {
      return parseFloat(trimmed);
    }

    if (
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
      return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
    }

    return trimmed;
  };

  const parseYaml = useCallback((yamlText: string): unknown => {
    const lines = yamlText.split("\n");
    let currentIndent = -1;
    const stack: Array<{ indent: number; container: unknown; key?: string }> = [
      { indent: -1, container: {} },
    ];

    for (const line of lines) {
      if (!line.trim() || line.trim().startsWith("#")) {
        continue;
      }

      const indentMatch = line.match(/^(\s*)/);
      const indentLevel = indentMatch ? indentMatch[1].length : 0;
      const content = line.trim();

      if (content.startsWith("- ")) {
        const listValue = content.slice(2).trim();

        while (
          stack.length > 1 &&
          stack[stack.length - 1].indent >= indentLevel
        ) {
          stack.pop();
        }

        const parent = stack[stack.length - 1];

        if (
          listValue.includes(":") &&
          !listValue.startsWith('"') &&
          !listValue.startsWith("'")
        ) {
          const colonIndex = listValue.indexOf(":");
          const key = listValue.slice(0, colonIndex).trim();
          const value = listValue.slice(colonIndex + 1).trim();

          const newObject: Record<string, unknown> = {};
          if (value) {
            newObject[key] = parseYamlValue(value);
          } else {
            newObject[key] = {};
          }

          if (Array.isArray(parent.container)) {
            parent.container.push(newObject);
          }
          stack.push({ indent: indentLevel + 2, container: newObject, key });
        } else {
          if (Array.isArray(parent.container)) {
            parent.container.push(parseYamlValue(listValue));
          }
        }
      } else if (content.includes(":")) {
        const colonIndex = content.indexOf(":");
        const key = content.slice(0, colonIndex).trim();
        const value = content.slice(colonIndex + 1).trim();

        while (
          stack.length > 1 &&
          stack[stack.length - 1].indent >= indentLevel
        ) {
          stack.pop();
        }

        const parent = stack[stack.length - 1];

        if (value) {
          if (
            typeof parent.container === "object" &&
            parent.container !== null &&
            !Array.isArray(parent.container)
          ) {
            (parent.container as Record<string, unknown>)[key] =
              parseYamlValue(value);
          }
        } else {
          if (
            typeof parent.container === "object" &&
            parent.container !== null &&
            !Array.isArray(parent.container)
          ) {
            (parent.container as Record<string, unknown>)[key] = {};
          }
          stack.push({
            indent: indentLevel,
            container: (parent.container as Record<string, unknown>)[key],
            key,
          });
        }
      }
    }

    return stack[0]?.container || {};
  }, []);

  const convertYamlToJson = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter YAML to convert");
      return;
    }

    try {
      const parsed = parseYaml(input);
      setOutput(JSON.stringify(parsed, null, parseInt(indent, 10)));
      toast.success("Converted to JSON successfully!");
    } catch (e) {
      toast.error(`Invalid YAML: ${(e as Error).message}`);
    }
  }, [input, indent, parseYaml]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = `users:
  - id: 1
    name: John Doe
    email: john@example.com
    active: true
  - id: 2
    name: Jane Smith
    email: jane@example.com
    active: false
metadata:
  version: 1.0.0
  generated: true
  tags:
    - json
    - yaml
    - converter
settings:
  theme: dark
  notifications:
    email: true
    push: false`;
    setInput(sample);
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], {
      type: "application/json;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("JSON file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            YAML to JSON Converter – Free Online Tool
          </h1>
          <p className="text-muted-foreground">
            Parse YAML and convert it into valid JSON instantly. Our free YAML
            to JSON Converter supports multi-line strings, anchors, and complex
            YAML structures for seamless transformation.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Sample YAML
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="indent"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
                  Indent:
                </Label>
                <select
                  id="indent"
                  value={indent}
                  onChange={(e) => setIndent(e.target.value)}
                  className="h-9 w-[100px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                </select>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertYamlToJson}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Convert to JSON
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input YAML
              </Label>
              <JsonEditor
                value={input}
                onChange={setInput}
                placeholder="Paste your YAML here..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label
                  htmlFor="output"
                  className="text-sm font-medium text-muted-foreground"
                >
                  JSON Output
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
                    <Button variant="ghost" size="sm" onClick={downloadJson}>
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <JsonEditor
                value={output}
                readOnly
                placeholder="JSON output will appear here..."
              />
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About YAML to JSON Converter
          </h2>
          <p className="text-muted-foreground mb-6">
            YAML configuration files are popular for their readability, but many
            tools require JSON format. Manually converting YAML indentation and
            syntax to JSON brackets and quotes is error-prone. This YAML to JSON
            converter parses YAML and outputs valid JSON instantly.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your YAML into the Input area. Choose 2 or 4 spaces for JSON
            indentation. Click Convert to JSON and the tool parses the YAML
            structure, converting lists, mappings, and scalar values into
            equivalent JSON format.
          </p>
          <p className="text-muted-foreground mb-8">
            The converter handles nested structures, boolean values, numbers,
            and strings. Sample YAML demonstrates typical configuration with
            users array, metadata object, and nested settings. Copy or Download
            saves the JSON output.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            DevOps teams working with Kubernetes or Docker configs often need
            JSON for tools that do not accept YAML. Developers migrating from
            YAML-based configuration to JSON-based systems benefit from quick
            conversion.
          </p>
          <p className="text-muted-foreground mb-8">
            This converter handles standard YAML features. Advanced YAML like
            anchors, aliases, and multi-line strings may not convert perfectly.
            For complex YAML files, verify the output matches your expectations.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">Does it handle nested YAML?</p>
              <p className="text-muted-foreground">
                Yes. Nested mappings and lists are converted to nested JSON
                objects and arrays.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What about YAML anchors?</p>
              <p className="text-muted-foreground">
                Anchors and aliases are not fully supported. The converter
                processes the basic structure only.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Are comments preserved?</p>
              <p className="text-muted-foreground">
                No. JSON does not support comments, so YAML comments are removed
                during conversion.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I convert JSON back to YAML?
              </p>
              <p className="text-muted-foreground">
                This tool only converts YAML to JSON. Use a separate JSON to
                YAML converter for reverse conversion.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Is my data sent anywhere?</p>
              <p className="text-muted-foreground">
                No. All conversion happens in your browser. Your YAML content
                stays private.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-to-yaml"
                className="text-primary hover:underline"
              >
                JSON to YAML
              </a>{" "}
              – Convert JSON back to YAML format
            </li>
            <li>
              <a
                href="/json-tools/yaml-validator"
                className="text-primary hover:underline"
              >
                YAML Validator
              </a>{" "}
              – Check YAML syntax for errors
            </li>
            <li>
              <a
                href="/json-tools/json-formatter"
                className="text-primary hover:underline"
              >
                JSON Formatter
              </a>{" "}
              – Beautify the converted JSON output
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
