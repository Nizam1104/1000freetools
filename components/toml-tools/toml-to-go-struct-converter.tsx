"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Code } from "lucide-react";

const TomlToGoStructConverter: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [goOutput, setGoOutput] = useState("");
  const [structName, setStructName] = useState("Config");
  const [usePointers, setUsePointers] = useState(false);
  const [addTags, setAddTags] = useState(true);
  const [converted, setConverted] = useState(false);

  const sampleToml = `title = "My Application"
version = "1.0.0"

[database]
host = "localhost"
port = 5432
enabled = true

[server]
address = "0.0.0.0"
timeout = 30`;

  const tomlToGoType = (value: string): string => {
    if (value === "true" || value === "false") return "bool";
    if (/^-?\d+$/.test(value)) return "int";
    if (/^-?\d+\.\d+$/.test(value)) return "float64";
    if (value.startsWith('"') && value.endsWith('"')) return "string";
    if (value.startsWith("[") && value.endsWith("]")) return "[]interface{}";
    return "string";
  };

  const toCamelCase = (str: string): string => {
    return str
      .split(/[-_]/)
      .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
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
    const structs: { name: string; fields: string[] }[] = [];
    let currentStruct = { name: structName, fields: [] as string[] };
    let currentSection = "";

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      const sectionMatch = trimmed.match(/^\[(.+)\]$/);
      if (sectionMatch) {
        if (currentStruct.fields.length > 0) {
          structs.push(currentStruct);
        }
        currentSection = sectionMatch[1];
        currentStruct = { name: toPascalCase(currentSection), fields: [] };
        return;
      }

      const kvMatch = trimmed.match(/^([^=]+)=(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1].trim();
        const value = kvMatch[2].trim();
        const goType = tomlToGoType(value);
        const fieldName = toPascalCase(key);
        const jsonTag = addTags ? ` \`toml:"${key}" json:"${key}"\`` : "";
        const pointer = usePointers && goType !== "bool" ? "*" : "";
        currentStruct.fields.push(`  ${fieldName} ${pointer}${goType}${jsonTag}`);
      }
    });

    if (currentStruct.fields.length > 0) {
      structs.push(currentStruct);
    }

    let output = "package main\n\n";
    structs.forEach(s => {
      output += `type ${s.name} struct {\n`;
      output += s.fields.join("\n");
      output += "\n}\n\n";
    });

    setGoOutput(output);
    setConverted(true);
  }, [tomlInput, structName, usePointers, addTags]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setGoOutput("");
    setStructName("Config");
    setUsePointers(false);
    setAddTags(true);
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (goOutput) {
      navigator.clipboard.writeText(goOutput);
    }
  }, [goOutput]);

  const handleDownload = useCallback(() => {
    if (!goOutput) return;
    
    const blob = new Blob([goOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = `${structName.toLowerCase()}.go`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [goOutput, structName]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            TOML to Go Struct Converter
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
                  <Label htmlFor="structName" className="text-xs">Root Struct Name</Label>
                  <Input
                    id="structName"
                    value={structName}
                    onChange={(e) => setStructName(e.target.value)}
                    placeholder="Config"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="usePointers"
                    checked={usePointers}
                    onChange={(e) => setUsePointers(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="usePointers" className="font-normal text-sm">
                    Use pointers for fields
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="addTags"
                    checked={addTags}
                    onChange={(e) => setAddTags(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="addTags" className="font-normal text-sm">
                    Add TOML/JSON tags
                  </Label>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={goOutput}
                  readOnly
                  placeholder="Go struct output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <Code className="w-4 h-4 mr-2" />
              Convert to Go
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

          {converted && (
            <div className="p-4 border rounded-lg bg-blue-50">
              <p className="text-sm font-semibold mb-2">Conversion Summary:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Root struct: {structName}</li>
                <li>• Using pointers: {usePointers ? "Yes" : "No"}</li>
                <li>• Including tags: {addTags ? "Yes" : "No"}</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TomlToGoStructConverter;
