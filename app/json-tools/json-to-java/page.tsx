"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Code2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonToJavaPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [className, setClassName] = useState("Root");
  const [packageName, setPackageName] = useState("");

  const getJavaType = (value: unknown): string => {
    if (value === null) {
      return "Object";
    }
    
    if (typeof value === "boolean") {
      return "boolean";
    }
    
    if (typeof value === "number") {
      return Number.isInteger(value) ? "int" : "double";
    }
    
    if (typeof value === "string") {
      return "String";
    }
    
    if (Array.isArray(value)) {
      return "List";
    }
    
    if (typeof value === "object") {
      return "Object";
    }
    
    return "Object";
  };

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

  const generateJavaClass = (name: string, obj: Record<string, unknown>, generated: Set<string>): string => {
    if (generated.has(name)) {
      return "";
    }
    generated.add(name);

    const entries = Object.entries(obj);
    const fields: string[] = [];
    const nestedClasses: string[] = [];

    for (const [key, value] of entries) {
      const fieldName = toCamelCase(key);
      
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const nestedName = `${name}${toPascalCase(key)}`;
        fields.push(`    private ${nestedName} ${fieldName};`);
        nestedClasses.push(generateJavaClass(nestedName, value as Record<string, unknown>, generated));
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
        const nestedName = `${name}${toPascalCase(key)}Item`;
        fields.push(`    private List<${nestedName}> ${fieldName};`);
        nestedClasses.push(generateJavaClass(nestedName, value[0] as Record<string, unknown>, generated));
      } else {
        const type = getJavaType(value);
        const boxedType = type === "boolean" ? "Boolean" : type === "int" ? "Integer" : type === "double" ? "Double" : type;
        fields.push(`    private ${boxedType} ${fieldName};`);
      }
    }

    let classBody = `public class ${name} {\n${fields.join("\n")}\n`;

    for (const [key, value] of entries) {
      const fieldName = toCamelCase(key);
      const fieldType = typeof value === "object" && value !== null && !Array.isArray(value)
        ? `${name}${toPascalCase(key)}`
        : Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null
        ? `List<${name}${toPascalCase(key)}Item>`
        : getJavaType(value);

      const capitalizedField = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
      classBody += `\n    public ${fieldType} get${capitalizedField}() {\n        return ${fieldName};\n    }\n`;
      classBody += `\n    public void set${capitalizedField}(${fieldType} ${fieldName}) {\n        this.${fieldName} = ${fieldName};\n    }\n`;
    }

    classBody += "\n}";

    return nestedClasses.filter(Boolean).join("\n\n") + "\n\n" + classBody;
  };

  const convertJsonToJava = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      let result = "";
      
      if (packageName) {
        result = `package ${packageName};\n\n`;
      }
      
      result += "import java.util.List;\n\n";
      
      if (Array.isArray(parsed) && parsed.length > 0) {
        result += generateJavaClass(className, parsed[0] as Record<string, unknown>, new Set());
      } else if (typeof parsed === "object" && parsed !== null) {
        result += generateJavaClass(className, parsed as Record<string, unknown>, new Set());
      }
      
      setOutput(result);
      toast.success("Generated Java POJO successfully!");
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

  const downloadJava = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/x-java;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${className}.java`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Java file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to Java POJO Generator Online</h1>
          <p className="text-muted-foreground">
            Generate Java POJO classes with fields, getters, and setters directly from JSON. Our free JSON to Java converter speeds up backend development and reduces boilerplate code.
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
                  className="h-9 w-[150px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="com.example"
                />
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToJava}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Generate POJO
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
                  Java Output
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
                    <Button variant="ghost" size="sm" onClick={downloadJava}>
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
                placeholder="Java POJO will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
