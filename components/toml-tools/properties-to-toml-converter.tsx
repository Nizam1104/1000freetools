"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, FileCode } from "lucide-react";

const PropertiesToTomlConverter: React.FC = () => {
  const [propertiesInput, setPropertiesInput] = useState("");
  const [tomlOutput, setTomlOutput] = useState("");
  const [groupByKey, setGroupByKey] = useState(true);
  const [sortKeys, setSortKeys] = useState(true);
  const [converted, setConverted] = useState(false);

  const sampleProperties = `app.name=MyApplication
app.version=1.0.0
app.debug=true

database.host=localhost
database.port=5432
database.username=admin
database.password=secret

cache.enabled=true
cache.ttl=3600`;

  const parsePropertiesLine = (line: string): { key: string; value: string } | null => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("!")) return null;
    
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      return { key: match[1].trim(), value: match[2].trim() };
    }
    return null;
  };

  const extractPrefix = (key: string): string => {
    const parts = key.split(".");
    if (parts.length > 1) {
      return parts[0];
    }
    return "";
  };

  const convertPropertiesToToml = (input: string): string => {
    const lines = input.split("\n");
    const entries: { key: string; value: string; prefix: string }[] = [];

    lines.forEach(line => {
      const parsed = parsePropertiesLine(line);
      if (parsed) {
        entries.push({
          key: parsed.key,
          value: parsed.value,
          prefix: groupByKey ? extractPrefix(parsed.key) : "",
        });
      }
    });

    if (sortKeys) {
      entries.sort((a, b) => a.key.localeCompare(b.key));
    }

    // Group by prefix
    const groups: { [key: string]: { key: string; value: string }[] } = {};
    entries.forEach(entry => {
      const group = entry.prefix || "root";
      if (!groups[group]) groups[group] = [];
      const keyWithoutPrefix = entry.prefix ? entry.key.substring(entry.prefix.length + 1) : entry.key;
      groups[group].push({ key: keyWithoutPrefix, value: entry.value });
    });

    let output = "# TOML Configuration\n";
    output += `# Generated from Properties on ${new Date().toISOString()}\n\n`;

    // Output root level first
    if (groups.root) {
      groups.root.forEach(item => {
        output += `${item.key} = ${formatTomlValue(item.value)}\n`;
      });
      output += "\n";
    }

    // Output grouped sections
    Object.entries(groups).forEach(([group, items]) => {
      if (group !== "root") {
        output += `[${group}]\n`;
        items.forEach(item => {
          output += `${item.key} = ${formatTomlValue(item.value)}\n`;
        });
        output += "\n";
      }
    });

    return output.trim() + "\n";
  };

  const formatTomlValue = (value: string): string => {
    // Handle escaped characters
    const unescaped = value
      .replace(/\\:/g, ":")
      .replace(/\\=/g, "=")
      .replace(/\\n/g, "\n");
    
    if (unescaped === "true" || unescaped === "false") return unescaped;
    if (/^-?\d+$/.test(unescaped)) return unescaped;
    if (/^-?\d+\.\d+$/.test(unescaped)) return unescaped;
    return `"${unescaped}"`;
  };

  const handleConvert = useCallback(() => {
    if (!propertiesInput.trim()) return;
    
    const toml = convertPropertiesToToml(propertiesInput);
    setTomlOutput(toml);
    setConverted(true);
  }, [propertiesInput]);

  const handleClear = useCallback(() => {
    setPropertiesInput("");
    setTomlOutput("");
    setGroupByKey(true);
    setSortKeys(true);
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (tomlOutput) {
      navigator.clipboard.writeText(tomlOutput);
    }
  }, [tomlOutput]);

  const handleDownload = useCallback(() => {
    if (!tomlOutput) return;
    
    const blob = new Blob([tomlOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "config.toml";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [tomlOutput]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="w-5 h-5" />
            Properties to TOML Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="propertiesInput">Properties Input</Label>
              <Textarea
                id="propertiesInput"
                value={propertiesInput}
                onChange={(e) => setPropertiesInput(e.target.value)}
                placeholder="Paste .properties content here..."
                rows={15}
              />
              <Button 
                onClick={() => setPropertiesInput(sampleProperties)} 
                variant="outline" 
                size="sm"
              >
                Load Sample Properties
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="groupByKey"
                    checked={groupByKey}
                    onChange={(e) => setGroupByKey(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="groupByKey" className="font-normal text-sm">
                    Group by key prefix
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sortKeys"
                    checked={sortKeys}
                    onChange={(e) => setSortKeys(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="sortKeys" className="font-normal text-sm">
                    Sort keys alphabetically
                  </Label>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={tomlOutput}
                  readOnly
                  placeholder="TOML output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!propertiesInput.trim()}>
              <FileCode className="w-4 h-4 mr-2" />
              Convert to TOML
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

export default PropertiesToTomlConverter;
