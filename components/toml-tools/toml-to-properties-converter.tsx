"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, FileCode } from "lucide-react";

const TomlToPropertiesConverter: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [propertiesOutput, setPropertiesOutput] = useState("");
  const [prefix, setPrefix] = useState("");
  const [flattenSections, setFlattenSections] = useState(true);
  const [addHeader, setAddHeader] = useState(true);
  const [converted, setConverted] = useState(false);

  const sampleToml = `app_name = "My Application"
version = "1.0.0"

[database]
host = "localhost"
port = 3306
driver = "mysql"

[cache]
enabled = true
ttl = 3600`;

  const convertTomlToProperties = (input: string): string => {
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
          key = `${currentSection}.${key}`;
        }

        if (prefix) {
          key = `${prefix}.${key}`;
        }

        entries.push({ key, value: formatPropertyValue(value) });
      }
    });

    let output = "";
    
    if (addHeader) {
      output += `# Java Properties File\n`;
      output += `# Generated from TOML on ${new Date().toISOString()}\n\n`;
    }
    
    entries.forEach(entry => {
      output += `${entry.key}=${entry.value}\n`;
    });

    return output;
  };

  const formatPropertyValue = (value: string): string => {
    const unquoted = value.replace(/^["']|["']$/g, "");
    
    // Escape special characters
    return unquoted
      .replace(/\\/g, "\\\\")
      .replace(/:/g, "\\:")
      .replace(/=/g, "\\=")
      .replace(/\n/g, "\\n");
  };

  const handleConvert = useCallback(() => {
    if (!tomlInput.trim()) return;
    
    const properties = convertTomlToProperties(tomlInput);
    setPropertiesOutput(properties);
    setConverted(true);
  }, [tomlInput]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setPropertiesOutput("");
    setPrefix("");
    setFlattenSections(true);
    setAddHeader(true);
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (propertiesOutput) {
      navigator.clipboard.writeText(propertiesOutput);
    }
  }, [propertiesOutput]);

  const handleDownload = useCallback(() => {
    if (!propertiesOutput) return;
    
    const blob = new Blob([propertiesOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "config.properties";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [propertiesOutput]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="w-5 h-5" />
            TOML to Properties Converter
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
                    placeholder="app.config"
                  />
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
                    Flatten sections with dot notation
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="addHeader"
                    checked={addHeader}
                    onChange={(e) => setAddHeader(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="addHeader" className="font-normal text-sm">
                    Add header comment
                  </Label>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={propertiesOutput}
                  readOnly
                  placeholder="Properties output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <FileCode className="w-4 h-4 mr-2" />
              Convert to Properties
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

export default TomlToPropertiesConverter;
