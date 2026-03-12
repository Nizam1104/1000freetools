"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Code2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonToKotlinPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [className, setClassName] = useState("Root");
  const [packageName, setPackageName] = useState("com.example");

  const toPascalCase = (str: string): string => {
    return str
      .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
      .replace(/^(\w)/, c => c.toUpperCase());
  };

  const toCamelCase = (str: string): string => {
    return str
      .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
      .replace(/^(\w)/, c => c.toLowerCase());
  };

  const getKotlinType = (value: unknown): string => {
    if (value === null) {
      return "Any?";
    }

    if (typeof value === "boolean") {
      return "Boolean";
    }

    if (typeof value === "number") {
      return Number.isInteger(value) ? "Int" : "Double";
    }

    if (typeof value === "string") {
      return "String";
    }

    if (Array.isArray(value)) {
      return "List";
    }

    if (typeof value === "object") {
      return "Any";
    }

    return "Any?";
  };

  const generateKotlinClass = (name: string, obj: Record<string, unknown>, generated: Set<string>): string => {
    if (generated.has(name)) {
      return "";
    }
    generated.add(name);

    const entries = Object.entries(obj);
    const properties: string[] = [];
    const nestedClasses: string[] = [];

    for (const [key, value] of entries) {
      const propertyName = toCamelCase(key);

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const nestedName = `${name}${toPascalCase(key)}`;
        properties.push(`    val ${propertyName}: ${nestedName}?`);
        nestedClasses.push(generateKotlinClass(nestedName, value as Record<string, unknown>, generated));
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
        const nestedName = `${name}${toPascalCase(key)}Item`;
        properties.push(`    val ${propertyName}: List<${nestedName}>?`);
        nestedClasses.push(generateKotlinClass(nestedName, value[0] as Record<string, unknown>, generated));
      } else {
        const type = getKotlinType(value);
        const nullableType = value === null ? type : type === "Boolean" || type === "Int" || type === "Double" ? `${type}?` : type;
        properties.push(`    val ${propertyName}: ${nullableType}`);
      }
    }

    let classBody = `data class ${name}(\n${properties.join(",\n")}\n)`;

    return nestedClasses.filter(Boolean).join("\n\n") + "\n\n" + classBody;
  };

  const convertJsonToKotlin = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      let result = `package ${packageName}\n\n`;

      if (Array.isArray(parsed) && parsed.length > 0) {
        result += generateKotlinClass(className, parsed[0] as Record<string, unknown>, new Set());
      } else if (typeof parsed === "object" && parsed !== null) {
        result += generateKotlinClass(className, parsed as Record<string, unknown>, new Set());
      }

      setOutput(result);
      toast.success("Generated Kotlin data class successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, className, packageName]);

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
        generated: true
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

  const downloadKt = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/x-kotlin;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${className}.kt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Kotlin file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to Kotlin Data Class Generator</h1>
          <p className="text-muted-foreground">
            Generate Kotlin data classes with nullable and non-nullable fields from JSON. Our free tool helps Android and Kotlin developers create accurate data models in seconds.
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
                <Label htmlFor="className" className="text-sm text-muted-foreground whitespace-nowrap">
                  Class Name:
                </Label>
                <input
                  id="className"
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="h-9 w-[150px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="Root"
                />
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="packageName" className="text-sm text-muted-foreground whitespace-nowrap">
                  Package:
                </Label>
                <input
                  id="packageName"
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="com.example"
                />
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToKotlin}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Generate Kotlin
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
                <Label htmlFor="output" className="text-sm font-medium text-muted-foreground">
                  Kotlin Output
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
                    <Button variant="ghost" size="sm" onClick={downloadKt}>
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <JsonEditor
                value={output}
                readOnly
                placeholder="Kotlin data class will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON to Kotlin Converter</h2>
        <p className="text-muted-foreground mb-6">
          Android developers need data classes to parse JSON responses. This tool generates Kotlin data classes from your JSON with proper types and nullable fields. It handles nested objects, arrays, and creates separate classes for complex structures.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the conversion works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your JSON and set the class name and package. Click Convert to Kotlin and the tool analyzes your structure, infers types, and generates data classes with primary constructors. Nested objects become separate data classes.
        </p>
        <p className="text-muted-foreground mb-8">
          The output uses Kotlin types: String, Int, Double, Boolean, and List. Nullable fields are marked with question marks. Use Copy to grab the code or Download to save as a .kt file for your Android project.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You're building an Android app that consumes a REST API. Or you received JSON from backend and need Kotlin models quickly. This tool also helps when exploring an unfamiliar API and you want to understand the data structure.
        </p>
        <p className="text-muted-foreground mb-8">
          Generated classes are a starting point. You may need to add serialization annotations, custom serializers, or validation. For production code, consider using libraries like kotlinx.serialization or Moshi.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">Does this handle nested JSON?</p>
            <p className="text-muted-foreground">Yes, nested objects become separate data classes. The tool generates all necessary nested classes automatically.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Are fields nullable by default?</p>
            <p className="text-muted-foreground">Fields that could be null based on the JSON are marked as nullable with the question mark suffix.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I set a custom package name?</p>
            <p className="text-muted-foreground">Yes, use the Package Name input to set your Android app's package. The default is com.example.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Does it support data class defaults?</p>
            <p className="text-muted-foreground">No default values are generated. All fields are required constructor parameters in the data classes.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What about JSON serialization?</p>
            <p className="text-muted-foreground">The generated classes are plain data classes. Add @Serializable or @Json annotations based on your chosen library.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
