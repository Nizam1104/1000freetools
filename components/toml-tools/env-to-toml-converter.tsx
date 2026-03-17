"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, FileCode } from "lucide-react";

const EnvToTomlConverter: React.FC = () => {
  const [envInput, setEnvInput] = useState("");
  const [tomlOutput, setTomlOutput] = useState("");
  const [groupByKey, setGroupByKey] = useState(true);
  const [sortKeys, setSortKeys] = useState(true);
  const [converted, setConverted] = useState(false);

  const sampleEnv = `APP_NAME=MyApplication
APP_VERSION=1.0.0
DEBUG=true

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=secret

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

API_KEY=abc123
API_TIMEOUT=30`;

  const parseEnvLine = (line: string): { key: string; value: string } | null => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return null;
    
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      return { key: match[1].trim(), value: match[2].trim() };
    }
    return null;
  };

  const extractPrefix = (key: string): string => {
    const parts = key.split("_");
    if (parts.length > 1) {
      return parts[0].toLowerCase();
    }
    return "";
  };

  const convertEnvToToml = (input: string): string => {
    const lines = input.split("\n");
    const entries: { key: string; value: string; prefix: string }[] = [];

    lines.forEach(line => {
      const parsed = parseEnvLine(line);
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
      groups[group].push({ key: entry.key, value: entry.value });
    });

    let output = "# TOML Configuration\n";
    output += `# Generated from ENV on ${new Date().toISOString()}\n\n`;

    // Output root level first
    if (groups.root) {
      groups.root.forEach(item => {
        output += `${item.key.toLowerCase()} = ${formatTomlValue(item.value)}\n`;
      });
      output += "\n";
    }

    // Output grouped sections
    Object.entries(groups).forEach(([group, items]) => {
      if (group !== "root") {
        output += `[${group}]\n`;
        items.forEach(item => {
          const keyWithoutPrefix = item.key.substring(group.length + 1).toLowerCase();
          output += `${keyWithoutPrefix} = ${formatTomlValue(item.value)}\n`;
        });
        output += "\n";
      }
    });

    return output.trim() + "\n";
  };

  const formatTomlValue = (value: string): string => {
    // Remove quotes if present
    const unquoted = value.replace(/^["']|["']$/g, "");
    
    if (unquoted === "true" || unquoted === "false") return unquoted;
    if (/^-?\d+$/.test(unquoted)) return unquoted;
    if (/^-?\d+\.\d+$/.test(unquoted)) return unquoted;
    return `"${unquoted}"`;
  };

  const handleConvert = useCallback(() => {
    if (!envInput.trim()) return;
    
    const toml = convertEnvToToml(envInput);
    setTomlOutput(toml);
    setConverted(true);
  }, [envInput]);

  const handleClear = useCallback(() => {
    setEnvInput("");
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
            ENV to TOML Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="envInput">ENV Input</Label>
              <Textarea
                id="envInput"
                value={envInput}
                onChange={(e) => setEnvInput(e.target.value)}
                placeholder="Paste .env content here..."
                rows={15}
              />
              <Button 
                onClick={() => setEnvInput(sampleEnv)} 
                variant="outline" 
                size="sm"
              >
                Load Sample ENV
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
            <Button onClick={handleConvert} disabled={!envInput.trim()}>
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

export default EnvToTomlConverter;
