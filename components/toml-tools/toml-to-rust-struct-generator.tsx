"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Code } from "lucide-react";

const TomlToRustStructGenerator: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [rustOutput, setRustOutput] = useState("");
  const [structName, setStructName] = useState("Config");
  const [useSerde, setUseSerde] = useState(true);
  const [useOptional, setUseOptional] = useState(false);
  const [deriveDebug, setDeriveDebug] = useState(true);
  const [deriveClone, setDeriveClone] = useState(true);
  const [converted, setConverted] = useState(false);

  const sampleToml = `title = "My Rust App"
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

  const tomlToRustType = (value: string): string => {
    if (value === "true" || value === "false") return "bool";
    if (/^-?\d+$/.test(value)) return "i64";
    if (/^-?\d+\.\d+$/.test(value)) return "f64";
    if (value.startsWith("[") && value.endsWith("]")) return "Vec<String>";
    return "String";
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
    const structs: { name: string; fields: string[]; section?: string }[] = [];
    let currentStruct = { name: structName, fields: [] as string[], section: "" as string };

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      const sectionMatch = trimmed.match(/^\[(.+)\]$/);
      if (sectionMatch) {
        if (currentStruct.fields.length > 0) {
          structs.push(currentStruct);
        }
        const sectionName = sectionMatch[1];
        currentStruct = { name: toPascalCase(sectionName), fields: [], section: sectionName };
        return;
      }

      const kvMatch = trimmed.match(/^([^=]+)=(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1].trim();
        const value = kvMatch[2].trim();
        const rustType = tomlToRustType(value);
        const fieldName = key;
        const optional = useOptional ? `Option<${rustType}>` : rustType;
        const serdeAttr = useSerde ? `#[serde(rename = "${key}")]\n    ` : "    ";
        currentStruct.fields.push(`${serdeAttr}pub ${fieldName}: ${optional},`);
      }
    });

    if (currentStruct.fields.length > 0) {
      structs.push(currentStruct);
    }

    let output = "";
    
    if (useSerde) {
      output += "use serde::{Deserialize, Serialize};\n\n";
    }

    structs.forEach((s) => {
      const derives: string[] = [];
      if (deriveDebug) derives.push("Debug");
      if (deriveClone) derives.push("Clone");
      if (useSerde) derives.push("Serialize", "Deserialize");
      
      output += `#[derive(${derives.join(", ")})]\n`;
      if (useSerde) {
        output += "#[serde(deny_unknown_fields)]\n";
      }
      output += `pub struct ${s.name} {\n`;
      output += s.fields.join("\n");
      output += "\n}\n\n";
    });

    // Add default implementation if using serde
    if (useSerde) {
      output += `// Example usage:\n`;
      output += `// let config: ${structName} = toml::from_str(&toml_string)?;\n`;
    }

    setRustOutput(output);
    setConverted(true);
  }, [tomlInput, structName, useSerde, useOptional, deriveDebug, deriveClone]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setRustOutput("");
    setStructName("Config");
    setUseSerde(true);
    setUseOptional(false);
    setDeriveDebug(true);
    setDeriveClone(true);
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (rustOutput) {
      navigator.clipboard.writeText(rustOutput);
    }
  }, [rustOutput]);

  const handleDownload = useCallback(() => {
    if (!rustOutput) return;
    
    const blob = new Blob([rustOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = `${structName.toLowerCase()}.rs`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [rustOutput, structName]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            TOML to Rust Struct Generator
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
                    id="useSerde"
                    checked={useSerde}
                    onChange={(e) => setUseSerde(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="useSerde" className="font-normal text-sm">
                    Use Serde attributes
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
                    Use Option&lt;T&gt; for fields
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="deriveDebug"
                    checked={deriveDebug}
                    onChange={(e) => setDeriveDebug(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="deriveDebug" className="font-normal text-sm">
                    Derive Debug
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="deriveClone"
                    checked={deriveClone}
                    onChange={(e) => setDeriveClone(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="deriveClone" className="font-normal text-sm">
                    Derive Clone
                  </Label>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={rustOutput}
                  readOnly
                  placeholder="Rust output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <Code className="w-4 h-4 mr-2" />
              Generate Rust Struct
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
              <p className="text-sm font-semibold mb-2">Cargo.toml dependencies:</p>
              <pre className="text-xs bg-white p-2 rounded">
{`[dependencies]
serde = {{ version = "1.0", features = ["derive"] }}
toml = "0.8"`}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TomlToRustStructGenerator;
