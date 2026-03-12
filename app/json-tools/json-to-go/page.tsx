"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import {
  FileJson,
  RotateCcw,
  Trash2,
  ArrowDownToLine,
  Copy,
  Check,
  Code2,
} from "lucide-react";
import { toast } from "sonner";

export default function JsonToGoPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [structName, setStructName] = useState("Root");
  const [packageName, setPackageName] = useState("main");

  const toPascalCase = (str: string): string => {
    return str
      .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
      .replace(/^(\w)/, (c) => c.toUpperCase());
  };

  const getGoType = (value: unknown): string => {
    if (value === null) {
      return "interface{}";
    }

    if (typeof value === "boolean") {
      return "bool";
    }

    if (typeof value === "number") {
      return Number.isInteger(value) ? "int" : "float64";
    }

    if (typeof value === "string") {
      return "string";
    }

    if (Array.isArray(value)) {
      return "[]";
    }

    if (typeof value === "object") {
      return "*";
    }

    return "interface{}";
  };

  const generateGoStruct = (
    name: string,
    obj: Record<string, unknown>,
    generated: Set<string>,
  ): string => {
    if (generated.has(name)) {
      return "";
    }
    generated.add(name);

    const entries = Object.entries(obj);
    const fields: string[] = [];
    const nestedStructs: string[] = [];

    for (const [key, value] of entries) {
      const fieldName = toPascalCase(key);

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const nestedName = `${name}${toPascalCase(key)}`;
        fields.push(`    ${fieldName} *${nestedName} \`json:"${key}"\``);
        nestedStructs.push(
          generateGoStruct(
            nestedName,
            value as Record<string, unknown>,
            generated,
          ),
        );
      } else if (
        Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === "object" &&
        value[0] !== null
      ) {
        const nestedName = `${name}${toPascalCase(key)}Item`;
        fields.push(`    ${fieldName} []*${nestedName} \`json:"${key}"\``);
        nestedStructs.push(
          generateGoStruct(
            nestedName,
            value[0] as Record<string, unknown>,
            generated,
          ),
        );
      } else {
        const type = getGoType(value);
        const goType = Array.isArray(value)
          ? `[]${getGoType(value[0] ?? null)}`
          : type;
        fields.push(`    ${fieldName} ${goType} \`json:"${key}"\``);
      }
    }

    let structBody = `type ${name} struct {\n${fields.join("\n")}\n}`;

    return nestedStructs.filter(Boolean).join("\n\n") + "\n\n" + structBody;
  };

  const convertJsonToGo = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      let result = `package ${packageName}\n\n`;

      if (Array.isArray(parsed) && parsed.length > 0) {
        result += generateGoStruct(
          structName,
          parsed[0] as Record<string, unknown>,
          new Set(),
        );
      } else if (typeof parsed === "object" && parsed !== null) {
        result += generateGoStruct(
          structName,
          parsed as Record<string, unknown>,
          new Set(),
        );
      }

      setOutput(result);
      toast.success("Generated Go struct successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, structName, packageName]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = JSON.stringify(
      {
        users: [
          { id: 1, name: "John Doe", email: "john@example.com", active: true },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            active: false,
          },
        ],
        metadata: {
          version: "1.0.0",
          generated: true,
        },
      },
      null,
      2,
    );
    setInput(sample);
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadGo = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/x-go;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${structName.toLowerCase()}.go`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Go file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON to Go Struct Generator Online
          </h1>
          <p className="text-muted-foreground">
            Generate Go structs with proper json tags from JSON input instantly.
            Our free JSON to Go converter helps Golang developers scaffold data
            models fast and accurately.
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
                <Label
                  htmlFor="structName"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
                  Struct Name:
                </Label>
                <input
                  id="structName"
                  type="text"
                  value={structName}
                  onChange={(e) => setStructName(e.target.value)}
                  className="h-9 w-[150px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="Root"
                />
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="packageName"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
                  Package:
                </Label>
                <input
                  id="packageName"
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="h-9 w-[120px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="main"
                />
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToGo}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Generate Go
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
                Input JSON
              </Label>
              <JsonEditor
                value={input}
                onChange={setInput}
                placeholder="Paste your JSON here..."
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
                  Go Output
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
                    <Button variant="ghost" size="sm" onClick={downloadGo}>
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <JsonEditor
                value={output}
                readOnly
                placeholder="Go struct will appear here..."
              />
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON to Go Struct Generator
          </h2>
          <p className="text-muted-foreground mb-6">
            Go developers frequently need to define structs matching JSON API
            responses. Writing struct tags by hand and choosing correct types
            like int versus float64 takes time. This JSON to Go converter
            generates properly tagged structs with pointer types for nested
            objects.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON into the Input panel. Set the Struct Name for the
            root type and Package name for your Go module. Click Generate Go and
            the tool creates struct definitions with json tags matching the
            original key names.
          </p>
          <p className="text-muted-foreground mb-8">
            Nested objects become pointer types with asterisk prefix. Arrays
            generate slice types with square brackets. The output includes your
            package declaration at the top. Copy or Download saves the .go file
            for your project.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Go developers building API clients need structs that unmarshal
            correctly from JSON responses. This tool eliminates manual struct
            definition and ensures json tags match the API exactly for reliable
            deserialization.
          </p>
          <p className="text-muted-foreground mb-8">
            The generator infers types from sample data. If your API returns
            different types for the same field, you may need to use interface{ }{" "}
            manually. Always test generated structs with actual API responses.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                Why are nested objects pointers?
              </p>
              <p className="text-muted-foreground">
                Pointer types allow nil values for optional nested objects,
                matching Go best practices for JSON unmarshaling.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">How are arrays handled?</p>
              <p className="text-muted-foreground">
                Arrays become slices with the element type inferred from the
                first item, like []string or []*NestedStruct.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What about empty arrays?</p>
              <p className="text-muted-foreground">
                Empty arrays default to []interface{ } since the element type
                cannot be determined from empty data.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Does it preserve key names in tags?
              </p>
              <p className="text-muted-foreground">
                Yes. The json tag uses the original JSON key name exactly,
                including any special characters or casing.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I change the package name?</p>
              <p className="text-muted-foreground">
                Yes. Enter your desired package name in the Package field before
                generating the struct.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
