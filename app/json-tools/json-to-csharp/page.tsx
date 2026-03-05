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
import { Textarea } from "@/components/ui/textarea";
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

export default function JsonToCSharpPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [className, setClassName] = useState("Root");
  const [namespaceName, setNamespaceName] = useState("MyApp.Models");

  const getCSharpType = (value: unknown): string => {
    if (value === null) {
      return "object";
    }

    if (typeof value === "boolean") {
      return "bool";
    }

    if (typeof value === "number") {
      return Number.isInteger(value) ? "int" : "double";
    }

    if (typeof value === "string") {
      return "string";
    }

    if (Array.isArray(value)) {
      return "List";
    }

    if (typeof value === "object") {
      return "object";
    }

    return "object";
  };

  const toPascalCase = (str: string): string => {
    return str
      .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
      .replace(/^(\w)/, (c) => c.toUpperCase());
  };

  const generateCSharpClass = (
    name: string,
    obj: Record<string, unknown>,
    generated: Set<string>,
  ): string => {
    if (generated.has(name)) {
      return "";
    }
    generated.add(name);

    const entries = Object.entries(obj);
    const properties: string[] = [];
    const nestedClasses: string[] = [];

    for (const [key, value] of entries) {
      const propertyName = toPascalCase(key);

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const nestedName = `${name}${toPascalCase(key)}`;
        properties.push(
          `    public ${nestedName} ${propertyName} { get; set; }`,
        );
        nestedClasses.push(
          generateCSharpClass(
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
        properties.push(
          `    public List<${nestedName}> ${propertyName} { get; set; }`,
        );
        nestedClasses.push(
          generateCSharpClass(
            nestedName,
            value[0] as Record<string, unknown>,
            generated,
          ),
        );
      } else {
        const type = getCSharpType(value);
        const nullableType =
          value === null || type === "object"
            ? type
            : type === "bool" || type === "int" || type === "double"
              ? `${type}?`
              : type;
        properties.push(
          `    public ${nullableType} ${propertyName} { get; set; }`,
        );
      }
    }

    let classBody = `public class ${name}\n{\n${properties.join("\n")}\n}`;

    return nestedClasses.filter(Boolean).join("\n\n") + "\n\n" + classBody;
  };

  const convertJsonToCSharp = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      let result = "";

      if (Array.isArray(parsed) && parsed.length > 0) {
        result += generateCSharpClass(
          className,
          parsed[0] as Record<string, unknown>,
          new Set(),
        );
      } else if (typeof parsed === "object" && parsed !== null) {
        result += generateCSharpClass(
          className,
          parsed as Record<string, unknown>,
          new Set(),
        );
      }

      const finalOutput = `namespace ${namespaceName}\n{\n${result
        .split("\n")
        .map((line) => "    " + line)
        .join("\n")}\n}`;
      setOutput(finalOutput);
      toast.success("Generated C# class successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, className, namespaceName]);

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

  const downloadCs = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/x-csharp;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${className}.cs`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("C# file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON to C# Class Generator – Free Online
          </h1>
          <p className="text-muted-foreground">
            Generate C# model classes with correct data types from any JSON
            input. Our free JSON to C# converter streamlines .NET development by
            eliminating manual class creation.
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
                  htmlFor="className"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
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
                <Label
                  htmlFor="namespaceName"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
                  Namespace:
                </Label>
                <input
                  id="namespaceName"
                  type="text"
                  value={namespaceName}
                  onChange={(e) => setNamespaceName(e.target.value)}
                  className="h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="MyApp.Models"
                />
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToCSharp}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Generate C#
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
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="min-h-[500px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
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
                  C# Output
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
                    <Button variant="ghost" size="sm" onClick={downloadCs}>
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
                placeholder="C# class will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50 max-h-[500px] overflow-y-auto"
              />
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON to C# Class Generator
          </h2>
          <p className="text-muted-foreground mb-6">
            Manually creating C# classes from JSON is error-prone and
            time-consuming. Getting property types wrong or missing nested
            objects leads to runtime errors. This JSON to C# generator analyzes
            your JSON and produces properly typed classes with nullable types
            for .NET development.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON into the Input area. Set the Class Name for the root
            class and Namespace for your project. Click Generate C# and the tool
            creates classes with public properties, correct types like int,
            double, string, and bool, plus List types for arrays.
          </p>
          <p className="text-muted-foreground mb-8">
            Nested objects generate separate classes with PascalCase naming. The
            output wraps everything in your specified namespace. Use Copy or
            Download to save the generated .cs file for your Visual Studio
            project.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            .NET developers consuming REST APIs need model classes matching the
            API response structure. This tool quickly scaffolds those classes so
            you can focus on business logic instead of manual type definitions.
          </p>
          <p className="text-muted-foreground mb-8">
            The generator infers types from sample data, so edge cases like
            empty arrays default to List without specific type parameters.
            Always review generated code and adjust types based on your actual
            data variations.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                How are nullable types handled?
              </p>
              <p className="text-muted-foreground">
                Value types like int, double, and bool are made nullable with
                the ? suffix to handle missing JSON properties.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Does it handle nested objects?</p>
              <p className="text-muted-foreground">
                Yes. Each nested object becomes a separate class with a
                generated name based on the parent class and property name.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What about arrays of objects?</p>
              <p className="text-muted-foreground">
                Arrays generate List properties. If the array contains objects,
                a separate item class is created for the list type.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I customize property names?
              </p>
              <p className="font-medium mb-1">
                Property names are converted to PascalCase automatically. The
                generator does not add JsonProperty attributes for custom
                serialization names.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Is my JSON sent to a server?</p>
              <p className="text-muted-foreground">
                No. All conversion happens in your browser. Your data stays
                private and is not transmitted anywhere.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-to-typescript"
                className="text-primary hover:underline"
              >
                JSON to TypeScript
              </a>{" "}
              – Generate TypeScript interfaces from JSON
            </li>
            <li>
              <a
                href="/json-tools/json-to-java"
                className="text-primary hover:underline"
              >
                JSON to Java
              </a>{" "}
              – Create Java POJO classes from JSON
            </li>
            <li>
              <a
                href="/json-tools/json-to-go"
                className="text-primary hover:underline"
              >
                JSON to Go
              </a>{" "}
              – Generate Go structs with JSON tags
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
