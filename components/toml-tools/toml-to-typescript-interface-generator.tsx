"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Code } from "lucide-react";

const TomlToTypescriptInterfaceGenerator: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [tsOutput, setTsOutput] = useState("");
  const [interfaceName, setInterfaceName] = useState("Config");
  const [useReadonly, setUseReadonly] = useState(true);
  const [useOptional, setUseOptional] = useState(false);
  const [exportInterfaces, setExportInterfaces] = useState(true);
  const [converted, setConverted] = useState(false);

  const sampleToml = `app_name = "My TypeScript App"
version = "1.0.0"
debug = true

[database]
host = "localhost"
port = 5432
username = "admin"
password = "secret"

[server]
port = 8080
timeout = 30`;

  const tomlToTsType = (value: string): string => {
    if (value === "true" || value === "false") return "boolean";
    if (/^-?\d+$/.test(value)) return "number";
    if (/^-?\d+\.\d+$/.test(value)) return "number";
    if (value.startsWith("[") && value.endsWith("]")) return "any[]";
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
    const interfaces: { name: string; fields: string[]; section?: string }[] = [];
    let currentInterface = { name: interfaceName, fields: [] as string[], section: "" as string };

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      const sectionMatch = trimmed.match(/^\[(.+)\]$/);
      if (sectionMatch) {
        if (currentInterface.fields.length > 0) {
          interfaces.push(currentInterface);
        }
        const sectionName = sectionMatch[1];
        currentInterface = { name: toPascalCase(sectionName), fields: [], section: sectionName };
        return;
      }

      const kvMatch = trimmed.match(/^([^=]+)=(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1].trim();
        const value = kvMatch[2].trim();
        const tsType = tomlToTsType(value);
        const fieldName = key;
        const optional = useOptional ? "?" : "";
        const readonly = useReadonly ? "readonly " : "";
        currentInterface.fields.push(`  ${readonly}${fieldName}${optional}: ${tsType};`);
      }
    });

    if (currentInterface.fields.length > 0) {
      interfaces.push(currentInterface);
    }

    let output = "";
    
    if (exportInterfaces) {
      output += "// Auto-generated TypeScript interfaces from TOML\n\n";
    }

    interfaces.forEach((iface) => {
      if (exportInterfaces) {
        output += "export ";
      }
      output += `interface ${iface.name} {\n`;
      output += iface.fields.join("\n");
      output += "\n}\n\n";
    });

    // Add root config interface that includes all sections
    if (interfaces.length > 1) {
      if (exportInterfaces) {
        output += "export ";
      }
      output += `interface ${interfaceName} {\n`;
      interfaces.forEach((iface, i) => {
        if (iface.section) {
          const optional = useOptional ? "?" : "";
          output += `  ${iface.section}${optional}: ${iface.name};\n`;
        } else {
          iface.fields.forEach(field => {
            output += `  ${field.replace("readonly ", "")}\n`;
          });
        }
      });
      output += "}\n";
    }

    setTsOutput(output);
    setConverted(true);
  }, [tomlInput, interfaceName, useReadonly, useOptional, exportInterfaces]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setTsOutput("");
    setInterfaceName("Config");
    setUseReadonly(true);
    setUseOptional(false);
    setExportInterfaces(true);
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (tsOutput) {
      navigator.clipboard.writeText(tsOutput);
    }
  }, [tsOutput]);

  const handleDownload = useCallback(() => {
    if (!tsOutput) return;
    
    const blob = new Blob([tsOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = `${interfaceName.toLowerCase()}.ts`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [tsOutput, interfaceName]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            TOML to TypeScript Interface Generator
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
                  <Label htmlFor="interfaceName" className="text-xs">Root Interface Name</Label>
                  <Input
                    id="interfaceName"
                    value={interfaceName}
                    onChange={(e) => setInterfaceName(e.target.value)}
                    placeholder="Config"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="useReadonly"
                    checked={useReadonly}
                    onChange={(e) => setUseReadonly(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="useReadonly" className="font-normal text-sm">
                    Use readonly properties
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="useOptional"
                    checked={useOptional}
                    onChange={(e) => setUseOptional(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="useOptional" className="font-normal text-sm">
                    Use optional properties (?)
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="exportInterfaces"
                    checked={exportInterfaces}
                    onChange={(e) => setExportInterfaces(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="exportInterfaces" className="font-normal text-sm">
                    Export interfaces
                  </Label>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={tsOutput}
                  readOnly
                  placeholder="TypeScript output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <Code className="w-4 h-4 mr-2" />
              Generate Interfaces
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

export default TomlToTypescriptInterfaceGenerator;
