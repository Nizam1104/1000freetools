"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Code } from "lucide-react";

const TomlToCsharpClassGenerator: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [csharpOutput, setCsOutput] = useState("");
  const [namespaceName, setNamespaceName] = useState("MyApp.Config");
  const [className, setClassName] = useState("Configuration");
  const [useRecords, setUseRecords] = useState(false);
  const [addAttributes, setAddAttributes] = useState(true);
  const [converted, setConverted] = useState(false);

  const sampleToml = `app_name = "My Application"
version = "1.0.0"

[database]
connection_string = "Server=localhost;Database=mydb;"
max_connections = 100
timeout_seconds = 30

[logging]
enabled = true
level = "Info"`;

  const tomlToCSharpType = (value: string): string => {
    if (value === "true" || value === "false") return "bool";
    if (/^-?\d+$/.test(value)) return "int";
    if (/^-?\d+\.\d+$/.test(value)) return "double";
    if (value.startsWith("[") && value.endsWith("]")) return "List<object>";
    return "string";
  };

  const toPascalCase = (str: string): string => {
    return str
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  };

  const handleConvert = useCallback(() => {
    if (!tomlInput.trim()) return;

    const lines = tomlInput.split("\n");
    const classes: { name: string; fields: string[]; section?: string }[] = [];
    let currentClass = { name: className, fields: [] as string[], section: "" as string };

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      const sectionMatch = trimmed.match(/^\[(.+)\]$/);
      if (sectionMatch) {
        if (currentClass.fields.length > 0) {
          classes.push(currentClass);
        }
        const sectionName = sectionMatch[1];
        currentClass = { name: toPascalCase(sectionName), fields: [], section: sectionName };
        return;
      }

      const kvMatch = trimmed.match(/^([^=]+)=(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1].trim();
        const value = kvMatch[2].trim();
        const csType = tomlToCSharpType(value);
        const propName = toPascalCase(key);
        const attr = addAttributes ? `\n    [JsonPropertyName("${key}")]\n    ` : "    ";
        currentClass.fields.push(`${attr}public ${csType} ${propName} {{ get; set; }}`);
      }
    });

    if (currentClass.fields.length > 0) {
      classes.push(currentClass);
    }

    let output = "using System;\n";
    if (addAttributes) output += "using System.Text.Json.Serialization;\n";
    output += "\n";
    output += `namespace ${namespaceName}\n{\n`;

    classes.forEach((cls, index) => {
      const classKeyword = useRecords ? "record" : "class";
      output += `    /// <summary>\n`;
      output += `    /// ${cls.section ? `Configuration for ${cls.section}` : 'Root configuration'}\n`;
      output += `    /// </summary>\n`;
      output += `    public ${classKeyword} ${cls.name}\n    {\n`;
      output += cls.fields.join("\n");
      output += "\n    }\n\n";
    });

    output += "}\n";

    setCsOutput(output);
    setConverted(true);
  }, [tomlInput, className, namespaceName, useRecords, addAttributes]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setCsOutput("");
    setNamespaceName("MyApp.Config");
    setClassName("Configuration");
    setUseRecords(false);
    setAddAttributes(true);
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (csharpOutput) {
      navigator.clipboard.writeText(csharpOutput);
    }
  }, [csharpOutput]);

  const handleDownload = useCallback(() => {
    if (!csharpOutput) return;
    
    const blob = new Blob([csharpOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = `${className}.cs`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [csharpOutput, className]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            TOML to C# Class Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tomlInput">TOML Input</Label>
              <Textarea
                id="tomlInput"
                value={tomlInput}
                onChange={(e) => setTomlInput(e.target.value)}
                placeholder="Paste TOML content here..."
                rows={15}
              />
              <Button 
                onClick={() => setTomlInput(sampleToml)} 
                variant="outline" 
                size="sm"
              >
                Load Sample TOML
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="namespace" className="text-xs">Namespace</Label>
                  <Input
                    id="namespace"
                    value={namespaceName}
                    onChange={(e) => setNamespaceName(e.target.value)}
                    placeholder="MyApp.Config"
                  />
                </div>

                <div>
                  <Label htmlFor="className" className="text-xs">Root Class Name</Label>
                  <Input
                    id="className"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder="Configuration"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="useRecords"
                    checked={useRecords}
                    onChange={(e) => setUseRecords(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="useRecords" className="font-normal text-sm">
                    Use C# records (C# 9+)
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="addAttributes"
                    checked={addAttributes}
                    onChange={(e) => setAddAttributes(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="addAttributes" className="font-normal text-sm">
                    Add JSON attributes
                  </Label>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={csharpOutput}
                  readOnly
                  placeholder="C# class output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <Code className="w-4 h-4 mr-2" />
              Convert to C#
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!converted}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!converted}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TomlToCsharpClassGenerator;
