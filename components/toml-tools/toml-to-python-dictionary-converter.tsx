"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Code } from "lucide-react";

const TomlToPythonDictionaryConverter: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [pythonOutput, setPythonOutput] = useState("");
  const [outputStyle, setOutputStyle] = useState<"dict" | "class" | "dataclass">("dict");
  const [converted, setConverted] = useState(false);

  const sampleToml = `title = "My Python App"
version = "1.0.0"

[database]
host = "localhost"
port = 5432
username = "admin"
password = "secret"

[features]
debug = true
max_connections = 100`;

  const convertTomlToPython = (input: string): string => {
    const lines = input.split("\n");
    const sections: { [key: string]: { key: string; value: string }[] } = {};
    let currentSection = "root";

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
        if (!sections[currentSection]) sections[currentSection] = [];
        sections[currentSection].push({ key, value: tomlValueToPython(value) });
      }
    });

    if (outputStyle === "dict") {
      return generateDict(sections);
    } else if (outputStyle === "class") {
      return generateClass(sections);
    } else {
      return generateDataclass(sections);
    }
  };

  const generateDict = (sections: { [key: string]: { key: string; value: string }[] }): string => {
    let output = "# Configuration dictionary\n";
    output += "config = {\n";
    
    Object.entries(sections).forEach(([section, items]) => {
      if (section === "root") {
        items.forEach(item => {
          output += `    '${item.key}': ${item.value},\n`;
        });
      } else {
        output += `    '${section}': {\n`;
        items.forEach(item => {
          output += `        '${item.key}': ${item.value},\n`;
        });
        output += "    },\n";
      }
    });
    
    output += "}\n";
    return output;
  };

  const generateClass = (sections: { [key: string]: { key: string; value: string }[] }): string => {
    let output = "# Configuration class\n";
    output += "class Config:\n";
    
    Object.entries(sections).forEach(([section, items]) => {
      if (section === "root") {
        items.forEach(item => {
          output += `    ${item.key} = ${item.value}\n`;
        });
      } else {
        output += `\n    class ${section.capitalize()}:\n`;
        items.forEach(item => {
          output += `        ${item.key} = ${item.value}\n`;
        });
      }
    });
    
    return output;
  };

  const generateDataclass = (sections: { [key: string]: { key: string; value: string }[] }): string => {
    let output = "from dataclasses import dataclass\nfrom typing import Optional\n\n";
    
    Object.entries(sections).forEach(([section, items]) => {
      if (section !== "root") {
        output += `@dataclass\nclass ${section.charAt(0).toUpperCase() + section.slice(1)}:\n`;
        items.forEach(item => {
          const pyType = getPythonType(item.value);
          output += `    ${item.key}: ${pyType}\n`;
        });
        output += "\n";
      }
    });
    
    output += "@dataclass\nclass Config:\n";
    Object.entries(sections).forEach(([section, items]) => {
      if (section === "root") {
        items.forEach(item => {
          const pyType = getPythonType(item.value);
          output += `    ${item.key}: ${pyType}\n`;
        });
      } else {
        const className = section.charAt(0).toUpperCase() + section.slice(1);
        output += `    ${section}: ${className}\n`;
      }
    });
    
    return output;
  };

  const getPythonType = (value: string): string => {
    if (value === "true" || value === "false") return "bool";
    if (/^-?\d+$/.test(value)) return "int";
    if (/^-?\d+\.\d+$/.test(value)) return "float";
    return "str";
  };

  const tomlValueToPython = (value: string): string => {
    if (value === "true") return "True";
    if (value === "false") return "False";
    if (/^-?\d+$/.test(value)) return value;
    if (/^-?\d+\.\d+$/.test(value)) return value;
    if (value.startsWith('"') && value.endsWith('"')) {
      return `'${value.slice(1, -1)}'`;
    }
    if (value.startsWith("[") && value.endsWith("]")) {
      const items = value.slice(1, -1).split(",").map(i => tomlValueToPython(i.trim()));
      return `[${items.join(", ")}]`;
    }
    return `'${value}'`;
  };

  const handleConvert = useCallback(() => {
    if (!tomlInput.trim()) return;
    
    const python = convertTomlToPython(tomlInput);
    setPythonOutput(python);
    setConverted(true);
  }, [tomlInput]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setPythonOutput("");
    setOutputStyle("dict");
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (pythonOutput) {
      navigator.clipboard.writeText(pythonOutput);
    }
  }, [pythonOutput]);

  const handleDownload = useCallback(() => {
    if (!pythonOutput) return;
    
    const blob = new Blob([pythonOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "config.py";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [pythonOutput]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            TOML to Python Dictionary Converter
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
                  <Label className="text-xs">Output Style</Label>
                  <select
                    value={outputStyle}
                    onChange={(e) => setOutputStyle(e.target.value as "dict" | "class" | "dataclass")}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="dict">Dictionary</option>
                    <option value="class">Class</option>
                    <option value="dataclass">Dataclass</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={pythonOutput}
                  readOnly
                  placeholder="Python output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <Code className="w-4 h-4 mr-2" />
              Convert to Python
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

export default TomlToPythonDictionaryConverter;
