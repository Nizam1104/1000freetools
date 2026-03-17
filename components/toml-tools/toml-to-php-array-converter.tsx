"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Code } from "lucide-react";

const TomlToPhpArrayConverter: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [phpOutput, setPhpOutput] = useState("");
  const [returnFormat, setReturnFormat] = useState<"array" | "class">("array");
  const [converted, setConverted] = useState(false);

  const sampleToml = `app_name = "My PHP App"
version = "1.0.0"

[database]
host = "localhost"
port = 3306
username = "root"
password = "secret"

[cache]
driver = "redis"
ttl = 3600`;

  const convertTomlToPhp = (input: string): string => {
    const lines = input.split("\n");
    const result: string[] = [];
    let currentSection = "";
    const sections: { [key: string]: { key: string; value: string }[] } = {};

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      const sectionMatch = trimmed.match(/^\[(.+)\]$/);
      if (sectionMatch) {
        currentSection = sectionMatch[1];
        sections[currentSection] = [];
        return;
      }

      const kvMatch = trimmed.match(/^([^=]+)=(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1].trim();
        const value = kvMatch[2].trim();
        const target = currentSection ? sections[currentSection] : (sections["root"] = []);
        target.push({ key, value: tomlValueToPhp(value) });
      }
    });

    if (returnFormat === "array") {
      result.push("<?php\n\nreturn ");
      result.push(convertSectionsToArray(sections));
      result.push(";\n");
    } else {
      result.push("<?php\n\n");
      result.push("class Config\n");
      result.push("{\n");
      result.push("    public static function get(): array\n");
      result.push("    {\n");
      result.push("        return ");
      result.push(convertSectionsToArray(sections));
      result.push(";\n");
      result.push("    }\n");
      result.push("}\n");
    }

    return result.join("");
  };

  const convertSectionsToArray = (sections: { [key: string]: { key: string; value: string }[] }): string => {
    const parts: string[] = [];
    
    Object.entries(sections).forEach(([section, items]) => {
      if (section === "root") {
        items.forEach(item => {
          parts.push(`    '${item.key}' => ${item.value}`);
        });
      } else {
        parts.push(`    '${section}' => [`);
        items.forEach(item => {
          parts.push(`        '${item.key}' => ${item.value}`);
        });
        parts.push("    ]");
      }
    });

    return "[\n" + parts.join(",\n") + "\n]";
  };

  const tomlValueToPhp = (value: string): string => {
    if (value === "true") return "true";
    if (value === "false") return "false";
    if (/^-?\d+$/.test(value)) return value;
    if (/^-?\d+\.\d+$/.test(value)) return value;
    if (value.startsWith('"') && value.endsWith('"')) {
      return "'" + value.slice(1, -1) + "'";
    }
    if (value.startsWith("[") && value.endsWith("]")) {
      const items = value.slice(1, -1).split(",").map(i => tomlValueToPhp(i.trim()));
      return "[" + items.join(", ") + "]";
    }
    return "'" + value + "'";
  };

  const handleConvert = useCallback(() => {
    if (!tomlInput.trim()) return;
    
    const php = convertTomlToPhp(tomlInput);
    setPhpOutput(php);
    setConverted(true);
  }, [tomlInput]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setPhpOutput("");
    setReturnFormat("array");
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (phpOutput) {
      navigator.clipboard.writeText(phpOutput);
    }
  }, [phpOutput]);

  const handleDownload = useCallback(() => {
    if (!phpOutput) return;
    
    const blob = new Blob([phpOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "config.php";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [phpOutput]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            TOML to PHP Array Converter
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
                  <Label className="text-xs">Output Format</Label>
                  <select
                    value={returnFormat}
                    onChange={(e) => setReturnFormat(e.target.value as "array" | "class")}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="array">Return Array</option>
                    <option value="class">Config Class</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={phpOutput}
                  readOnly
                  placeholder="PHP output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <Code className="w-4 h-4 mr-2" />
              Convert to PHP
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

export default TomlToPhpArrayConverter;
