"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Code } from "lucide-react";

const TomlToRubyHashConverter: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [rubyOutput, setRubyOutput] = useState("");
  const [useSymbols, setUseSymbols] = useState(true);
  const [converted, setConverted] = useState(false);

  const sampleToml = `title = "My Ruby App"
version = "1.0.0"

[database]
host = "localhost"
port = 5432
adapter = "postgresql"

[features]
debug = true
max_threads = 4`;

  const convertTomlToRuby = (input: string): string => {
    const lines = input.split("\n");
    const result: string[] = [];
    let currentHash: string[] = [];
    let currentSection = "";
    const sections: { [key: string]: string[] } = {};

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      const sectionMatch = trimmed.match(/^\[(.+)\]$/);
      if (sectionMatch) {
        if (currentHash.length > 0) {
          sections[currentSection || "root"] = currentHash;
        }
        currentSection = sectionMatch[1];
        currentHash = [];
        return;
      }

      const kvMatch = trimmed.match(/^([^=]+)=(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1].trim();
        const value = kvMatch[2].trim();
        const rubyKey = useSymbols ? `:${key}` : `"${key}"`;
        const rubyValue = tomlValueToRuby(value);
        currentHash.push(`    ${rubyKey} => ${rubyValue}`);
      }
    });

    if (currentHash.length > 0) {
      sections[currentSection || "root"] = currentHash;
    }

    // Build output
    Object.entries(sections).forEach(([section, lines], index) => {
      if (section === "root") {
        result.push("# Root configuration");
        result.push("config = {");
        result.push(lines.join(",\n"));
        result.push("}");
      } else {
        result.push("");
        result.push(`# ${section} configuration`);
        result.push(`${section} = {`);
        result.push(lines.join(",\n"));
        result.push("}");
      }
    });

    return result.join("\n");
  };

  const tomlValueToRuby = (value: string): string => {
    if (value === "true") return "true";
    if (value === "false") return "false";
    if (/^-?\d+$/.test(value)) return value;
    if (/^-?\d+\.\d+$/.test(value)) return value;
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.replace(/^"|"$/g, "'");
    }
    if (value.startsWith("[") && value.endsWith("]")) {
      const items = value.slice(1, -1).split(",").map(i => tomlValueToRuby(i.trim()));
      return `[${items.join(", ")}]`;
    }
    return `'${value}'`;
  };

  const handleConvert = useCallback(() => {
    if (!tomlInput.trim()) return;
    
    const ruby = convertTomlToRuby(tomlInput);
    setRubyOutput(ruby);
    setConverted(true);
  }, [tomlInput]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setRubyOutput("");
    setUseSymbols(true);
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (rubyOutput) {
      navigator.clipboard.writeText(rubyOutput);
    }
  }, [rubyOutput]);

  const handleDownload = useCallback(() => {
    if (!rubyOutput) return;
    
    const blob = new Blob([rubyOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "config.rb";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [rubyOutput]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            TOML to Ruby Hash Converter
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
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="useSymbols"
                    checked={useSymbols}
                    onChange={(e) => setUseSymbols(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="useSymbols" className="font-normal text-sm">
                    Use symbol keys (:key)
                  </Label>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={rubyOutput}
                  readOnly
                  placeholder="Ruby hash output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <Code className="w-4 h-4 mr-2" />
              Convert to Ruby
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

export default TomlToRubyHashConverter;
