"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, FileCode } from "lucide-react";

const TomlToEnvConverter: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [envOutput, setEnvOutput] = useState("");
  const [prefix, setPrefix] = useState("");
  const [uppercase, setUppercase] = useState(true);
  const [flattenSections, setFlattenSections] = useState(true);
  const [converted, setConverted] = useState(false);

  const sampleToml = `app_name = "MyApplication"
version = "1.0.0"
debug = true

[database]
host = "localhost"
port = 5432
username = "admin"
password = "secret"

[redis]
host = "127.0.0.1"
port = 6379`;

  const convertTomlToEnv = (input: string): string => {
    const lines = input.split("\n");
    const entries: { key: string; value: string }[] = [];
    let currentSection = "";

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      const sectionMatch = trimmed.match(/^\[(.+)\]$/);
      if (sectionMatch) {
        currentSection = sectionMatch[1];
        return;
      }

      const kvMatch = trimmed.match(/^([^=]+)=(.*)$/);
      if (kvMatch) {
        let key = kvMatch[1].trim();
        const value = kvMatch[2].trim();

        if (flattenSections && currentSection) {
          key = `${currentSection}_${key}`;
        }

        if (prefix) {
          key = `${prefix}_${key}`;
        }

        if (uppercase) {
          key = key.toUpperCase();
        }

        entries.push({ key, value: formatEnvValue(value) });
      }
    });

    let output = "# Environment Variables\n";
    output += `# Generated from TOML on ${new Date().toISOString()}\n\n`;
    
    entries.forEach(entry => {
      output += `${entry.key}=${entry.value}\n`;
    });

    return output;
  };

  const formatEnvValue = (value: string): string => {
    const unquoted = value.replace(/^["']|["']$/g, "");
    
    // Always quote values with special characters
    if (unquoted.includes(" ") || unquoted.includes("#") || unquoted.includes("$")) {
      return `"${unquoted}"`;
    }
    
    return unquoted;
  };

  const handleConvert = useCallback(() => {
    if (!tomlInput.trim()) return;
    
    const env = convertTomlToEnv(tomlInput);
    setEnvOutput(env);
    setConverted(true);
  }, [tomlInput]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setEnvOutput("");
    setPrefix("");
    setUppercase(true);
    setFlattenSections(true);
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (envOutput) {
      navigator.clipboard.writeText(envOutput);
    }
  }, [envOutput]);

  const handleDownload = useCallback(() => {
    if (!envOutput) return;
    
    const blob = new Blob([envOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = ".env";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [envOutput]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="w-5 h-5" />
            TOML to ENV Converter
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
                  <Label htmlFor="prefix" className="text-xs">Key Prefix (Optional)</Label>
                  <Input
                    id="prefix"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="APP"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="uppercase"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="uppercase" className="font-normal text-sm">
                    Convert keys to UPPERCASE
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="flattenSections"
                    checked={flattenSections}
                    onChange={(e) => setFlattenSections(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="flattenSections" className="font-normal text-sm">
                    Flatten sections into keys
                  </Label>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={envOutput}
                  readOnly
                  placeholder="ENV output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <FileCode className="w-4 h-4 mr-2" />
              Convert to ENV
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

export default TomlToEnvConverter;
