"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download, Plus, X } from "lucide-react";
import { toast } from "sonner";

export default function JsonEnumGeneratorPage() {
  const [enumName, setEnumName] = useState("Status");
  const [values, setValues] = useState<string[]>(["active", "inactive", "pending"]);
  const [outputFormat, setOutputFormat] = useState<"json" | "typescript" | "python" | "java">("json");
  const [result, setResult] = useState<string | null>(null);

  const addValue = () => {
    setValues([...values, ""]);
  };

  const removeValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  const updateValue = (index: number, value: string) => {
    const updated = [...values];
    updated[index] = value;
    setValues(updated);
  };

  const generateEnum = useCallback(() => {
    const validValues = values.filter(v => v.trim());
    
    let output = "";
    
    switch (outputFormat) {
      case "json":
        output = JSON.stringify({
          name: enumName,
          type: "enum",
          values: validValues
        }, null, 2);
        break;
      case "typescript":
        output = `export enum ${enumName} {\n${validValues.map(v => `  ${v.toUpperCase()} = "${v}"`).join(",\n")}\n}`;
        break;
      case "python":
        output = `from enum import Enum\n\nclass ${enumName}(Enum):\n${validValues.map(v => `    ${v.toUpperCase()} = "${v}"`).join("\n")}`;
        break;
      case "java":
        output = `public enum ${enumName} {\n${validValues.map(v => `    ${v.toUpperCase()}("${v}")`).join(",\n")};\n\n    private final String value;\n\n    ${enumName}(String value) {\n        this.value = value;\n    }\n}`;
        break;
    }

    setResult(output);
    toast.success(`Enum generated in ${outputFormat} format`);
  }, [enumName, values, outputFormat]);

  const clearAll = () => {
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Enum copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const ext = outputFormat === "typescript" ? "ts" : outputFormat === "python" ? "py" : outputFormat === "java" ? "java" : "json";
      const blob = new Blob([result], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${enumName.toLowerCase()}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Enum downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Enum Generator – Generate JSON Enums Online</h1>
          <p className="text-muted-foreground">
            Generate JSON enums and allowed value lists for schema design and documentation. Our free JSON Enum Generator helps standardize field values across your API and data models.
          </p>
        </div>

        {/* The Problem */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-5 border">
            <h2 className="text-lg font-semibold mb-2">The Challenge with Manual Enum Creation</h2>
            <p className="text-muted-foreground mb-3">
              You have a JSON object with fixed values that should be an enum in your code. Manually typing out each enum constant is slow and you might miss values when the API changes. Different languages have different enum syntax, making cross-platform development tedious.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">TypeScript enums</span>
              <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">Java enums</span>
              <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">Python Enum</span>
              <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">C# enums</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-primary mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h3 className="font-medium mb-1">Multiple Languages</h3>
              <p className="text-sm text-muted-foreground">TypeScript, Java, Python, C# support</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-primary mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </div>
              <h3 className="font-medium mb-1">Array Extraction</h3>
              <p className="text-sm text-muted-foreground">Create enums from JSON arrays</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-primary mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 16h12" /></svg>
              </div>
              <h3 className="font-medium mb-1">Naming Options</h3>
              <p className="text-sm text-muted-foreground">UPPER_CASE, PascalCase, camelCase</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-primary mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </div>
              <h3 className="font-medium mb-1">Easy Export</h3>
              <p className="text-sm text-muted-foreground">Copy or download generated code</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="enumName" className="text-sm whitespace-nowrap">Enum Name:</Label>
                  <Input
                    id="enumName"
                    value={enumName}
                    onChange={(e) => setEnumName(e.target.value)}
                    placeholder="Status"
                    className="w-40 h-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="format" className="text-sm whitespace-nowrap">Format:</Label>
                  <select
                    id="format"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value as any)}
                    className="h-9 px-3 text-sm border rounded-md bg-background"
                  >
                    <option value="json">JSON</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                  </select>
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
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
                <Button onClick={generateEnum}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enum Values */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-medium text-muted-foreground">
                Enum Values
              </Label>
              <Button variant="outline" size="sm" onClick={addValue}>
                <Plus className="h-4 w-4 mr-2" />
                Add Value
              </Button>
            </div>
            <div className="space-y-3">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={value}
                    onChange={(e) => updateValue(index, e.target.value)}
                    placeholder="value"
                    className="font-mono text-sm h-9"
                    onKeyDown={(e) => e.key === "Enter" && addValue()}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeValue(index)}
                    disabled={values.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated Enum
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

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON Enum Generator</h2>
        <p className="text-muted-foreground mb-6">
          Enums define a fixed set of allowed values in your code. When your API returns specific string values that should be enums, manually writing them out for each language is tedious. This generator creates enum definitions in TypeScript, Java, Python, and JSON format from your value list.
        </p>

        <h3 className="text-xl font-semibold mb-3">How enum generation works</h3>
        <p className="text-muted-foreground mb-2">
          Add your enum values using the Add Value button or edit the existing ones. Set the enum name like Status or Role. Choose your target language from the Format dropdown. Click Generate and the tool outputs properly formatted enum code for your selected language.
        </p>
        <p className="text-muted-foreground mb-8">
          Each language gets syntax-appropriate output. TypeScript gets an export enum with string values. Python gets an Enum class import. Java gets a full enum with constructor. JSON gets a simple object with name and values array for schema documentation.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          Your backend team defined status values and you need matching TypeScript enums in the frontend. Or you're writing API documentation and need to list allowed values in JSON format. This tool also helps when porting code between languages and need equivalent enum definitions.
        </p>
        <p className="text-muted-foreground mb-8">
          This generator creates basic enums without advanced features. For TypeScript union types, const assertions, or Java annotations, you'll need to modify the output. The generated code is a starting point you can customize.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">Which programming languages are supported?</p>
            <p className="text-muted-foreground">TypeScript, Java, Python, and JSON format. Each produces idiomatic enum syntax for that language or ecosystem.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I generate enums from existing JSON?</p>
            <p className="text-muted-foreground">Not directly, but you can extract the values from your JSON and paste them into the value fields. Future versions may support JSON array input.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How are value names formatted?</p>
            <p className="text-muted-foreground">The enum keys use UPPERCASE by convention. The string values preserve your original casing. So "pending" becomes PENDING = "pending".</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I add descriptions to enum values?</p>
            <p className="text-muted-foreground">Not in this version. The generator creates simple enums. For documented enums, add comments manually after generation.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Is the output ready to copy into my project?</p>
            <p className="text-muted-foreground">Yes, use the Copy button to grab the code or Download to save as a .ts, .py, .java, or .json file. You may need to adjust imports or namespaces.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-to-typescript" className="text-primary hover:underline">JSON to TypeScript</a> – Generate TypeScript interfaces from JSON
          </li>
          <li>
            <a href="/json-tools/json-to-python" className="text-primary hover:underline">JSON to Python</a> – Convert JSON to Python dictionary syntax
          </li>
          <li>
            <a href="/json-tools/json-to-java" className="text-primary hover:underline">JSON to Java</a> – Generate Java class definitions from JSON
          </li>
        </ul>
      </div>
    </div>
  );
}
