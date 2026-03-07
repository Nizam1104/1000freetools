"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Code2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonToSwiftPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [structName, setStructName] = useState("Root");

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

  const getSwiftType = (value: unknown): string => {
    if (value === null) {
      return "Any";
    }

    if (typeof value === "boolean") {
      return "Bool";
    }

    if (typeof value === "number") {
      return Number.isInteger(value) ? "Int" : "Double";
    }

    if (typeof value === "string") {
      return "String";
    }

    if (Array.isArray(value)) {
      return "[Any]";
    }

    if (typeof value === "object") {
      return "[String: Any]";
    }

    return "Any";
  };

  const generateSwiftStruct = (name: string, obj: Record<string, unknown>, generated: Set<string>): string => {
    if (generated.has(name)) {
      return "";
    }
    generated.add(name);

    const entries = Object.entries(obj);
    const properties: string[] = [];
    const nestedStructs: string[] = [];

    for (const [key, value] of entries) {
      const propertyName = toCamelCase(key);

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const nestedName = `${name}${toPascalCase(key)}`;
        properties.push(`    let ${propertyName}: ${nestedName}?`);
        nestedStructs.push(generateSwiftStruct(nestedName, value as Record<string, unknown>, generated));
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
        const nestedName = `${name}${toPascalCase(key)}Item`;
        properties.push(`    let ${propertyName}: [${nestedName}]?`);
        nestedStructs.push(generateSwiftStruct(nestedName, value[0] as Record<string, unknown>, generated));
      } else {
        const type = getSwiftType(value);
        const swiftType = Array.isArray(value) ? type : type;
        properties.push(`    let ${propertyName}: ${swiftType}?`);
      }
    }

    let structBody = `struct ${name}: Codable {\n${properties.join("\n")}\n}`;

    return nestedStructs.filter(Boolean).join("\n\n") + "\n\n" + structBody;
  };

  const convertJsonToSwift = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      let result = "";

      if (Array.isArray(parsed) && parsed.length > 0) {
        result += generateSwiftStruct(structName, parsed[0] as Record<string, unknown>, new Set());
      } else if (typeof parsed === "object" && parsed !== null) {
        result += generateSwiftStruct(structName, parsed as Record<string, unknown>, new Set());
      }

      setOutput(result);
      toast.success("Generated Swift struct successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, structName]);

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

  const downloadSwift = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/x-swift;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${structName}.swift`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Swift file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to Swift Struct Generator Online</h1>
          <p className="text-muted-foreground">
            Generate Swift structs conforming to Codable protocol from JSON. Our free JSON to Swift converter is perfect for iOS developers building type-safe data models quickly.
          </p>
        </div>

        {/* For iOS Developers */}
        <Card className="mb-6 border-l-4 border-l-orange-500">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span>🍎</span> For iOS Developers
            </h2>
            <p className="text-muted-foreground mb-4">
              You're building an iOS app and need to parse JSON from an API. Writing Swift structs with Codable conformance by hand is tedious, especially for nested responses. You want type-safe models that decode JSON correctly.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <h3 className="font-medium text-sm mb-2">Generates:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Codable structs</li>
                  <li>• Proper Swift types</li>
                  <li>• Nested type support</li>
                  <li>• Optional properties</li>
                </ul>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <h3 className="font-medium text-sm mb-2">Use Cases:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• API response models</li>
                  <li>• Local data storage</li>
                  <li>• Core Data entities</li>
                  <li>• JSON serialization</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">The Process</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {[
              { step: "Paste JSON", desc: "Enter your JSON response or sample data" },
              { step: "Name Struct", desc: "Set the root struct name (default: Root)" },
              { step: "Generate", desc: "Get Swift code ready to copy into your project" }
            ].map((item, idx) => (
              <div key={idx} className="flex-1 bg-card border rounded-lg p-4">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm mb-2">{idx + 1}</div>
                <h3 className="font-medium mb-1">{item.step}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
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
                <Label htmlFor="structName" className="text-sm text-muted-foreground whitespace-nowrap">
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

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToSwift}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Generate Swift
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
                  Swift Output
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
                    <Button variant="ghost" size="sm" onClick={downloadSwift}>
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <JsonEditor
                value={output}
                readOnly
                placeholder="Swift struct will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON to Swift Converter</h2>
        <p className="text-muted-foreground mb-6">
          iOS developers often need to convert JSON responses into Swift structs with Codable conformance. This tool generates Swift struct definitions from your JSON, handling nested objects, arrays, and proper type inference. Save time writing boilerplate model code.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the conversion works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your JSON in the input panel and set the struct name. Click Convert to Swift and the tool analyzes your JSON structure, infers types, and generates Swift structs with Codable protocol conformance. Nested objects become nested structs.
        </p>
        <p className="text-muted-foreground mb-8">
          The output includes proper Swift types: String, Int, Double, Bool, and arrays. Unknown or mixed types use Any. Use Copy to grab the code or Download to save as a .swift file ready for your Xcode project.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You're building an iOS app that consumes a REST API. Or you received JSON from a backend team and need Swift models to parse it. This tool also helps when prototyping and you want to quickly see what your data models should look like.
        </p>
        <p className="text-muted-foreground mb-8">
          The generated structs are a starting point. You may need to add custom coding keys, handle date formatting, or add validation. For complex APIs, consider tools that generate from OpenAPI specs.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">Does this handle nested objects?</p>
            <p className="text-muted-foreground">Yes, nested JSON objects become nested Swift structs with appropriate names based on their parent key.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What about optional fields?</p>
            <p className="text-muted-foreground">All fields are generated as non-optional. You may need to make some optional based on your API's actual behavior.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I customize the struct name?</p>
            <p className="text-muted-foreground">Yes, use the Struct Name input to set your preferred name. The default is Root but you can use any valid Swift identifier.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Does it support generics?</p>
            <p className="text-muted-foreground">No, the generated structs use concrete types. For generic models, you'll need to modify the output manually.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What Swift version is this compatible with?</p>
            <p className="text-muted-foreground">The generated code works with Swift 4 and later, which introduced the Codable protocol.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
