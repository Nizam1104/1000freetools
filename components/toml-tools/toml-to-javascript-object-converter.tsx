"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Code } from "lucide-react";

const TomlToJavascriptObjectConverter: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [jsOutput, setJsOutput] = useState("");
  const [exportStyle, setExportStyle] = useState<"module" | "commonjs" | "const">("module");
  const [useConst, setUseConst] = useState(true);
  const [converted, setConverted] = useState(false);

  const sampleToml = `title = "My JavaScript App"
version = "1.0.0"

[database]
host = "localhost"
port = 5432
enabled = true

[features]
debug = true
max_connections = 100`;

  const convertTomlToJs = (input: string): string => {
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
        sections[currentSection].push({ key, value: tomlValueToJs(value) });
      }
    });

    let output = "";
    
    if (exportStyle === "module") {
      output += "// Configuration object\n";
      output += "export const config = {\n";
    } else if (exportStyle === "commonjs") {
      output += "// Configuration object\n";
      output += "module.exports = {\n";
    } else {
      output += "// Configuration object\n";
      output += `${useConst ? "const" : "let"} config = {\n`;
    }

    Object.entries(sections).forEach(([section, items]) => {
      if (section === "root") {
        items.forEach(item => {
          output += `  ${item.key}: ${item.value},\n`;
        });
      } else {
        output += `  ${section}: {\n`;
        items.forEach(item => {
          output += `    ${item.key}: ${item.value},\n`;
        });
        output += "  },\n";
      }
    });

    output += "};\n";

    if (exportStyle === "module") {
      output += "\nexport default config;\n";
    }

    return output;
  };

  const tomlValueToJs = (value: string): string => {
    if (value === "true") return "true";
    if (value === "false") return "false";
    if (/^-?\d+$/.test(value)) return value;
    if (/^-?\d+\.\d+$/.test(value)) return value;
    if (value.startsWith('"') && value.endsWith('"')) {
      return `'${value.slice(1, -1)}'`;
    }
    if (value.startsWith("[") && value.endsWith("]")) {
      const items = value.slice(1, -1).split(",").map(i => tomlValueToJs(i.trim()));
      return `[${items.join(", ")}]`;
    }
    return `'${value}'`;
  };

  const handleConvert = useCallback(() => {
    if (!tomlInput.trim()) return;
    
    const js = convertTomlToJs(tomlInput);
    setJsOutput(js);
    setConverted(true);
  }, [tomlInput]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setJsOutput("");
    setExportStyle("module");
    setUseConst(true);
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (jsOutput) {
      navigator.clipboard.writeText(jsOutput);
    }
  }, [jsOutput]);

  const handleDownload = useCallback(() => {
    if (!jsOutput) return;
    
    const blob = new Blob([jsOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "config.js";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [jsOutput]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            TOML to JavaScript Object Converter
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
                  <Label className="text-xs">Export Style</Label>
                  <select
                    value={exportStyle}
                    onChange={(e) => setExportStyle(e.target.value as "module" | "commonjs" | "const")}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="module">ES Module (export)</option>
                    <option value="commonjs">CommonJS (module.exports)</option>
                    <option value="const">Const/Let variable</option>
                  </select>
                </div>

                {exportStyle === "const" && (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="useConst"
                      checked={useConst}
                      onChange={(e) => setUseConst(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="useConst" className="font-normal text-sm">
                      Use const instead of let
                    </Label>
                  </div>
                )}
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={jsOutput}
                  readOnly
                  placeholder="JavaScript output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <Code className="w-4 h-4 mr-2" />
              Convert to JavaScript
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

export default TomlToJavascriptObjectConverter;
