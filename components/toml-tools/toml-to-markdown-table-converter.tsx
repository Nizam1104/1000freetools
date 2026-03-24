"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, FileText } from "lucide-react";

const TomlToMarkdownTableConverter: React.FC = () => {
  const [tomlInput, setTomlInput] = useState("");
  const [markdownOutput, setMarkdownOutput] = useState("");
  const [includeSection, setIncludeSection] = useState(true);
  const [includeType, setIncludeType] = useState(true);
  const [sortBy, setSortBy] = useState<"key" | "section">("key");
  const [converted, setConverted] = useState(false);

  const sampleToml = `app_name = "My Application"
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

  const detectType = (value: string): string => {
    if (value === "true" || value === "false") return "boolean";
    if (/^-?\d+$/.test(value)) return "integer";
    if (/^-?\d+\.\d+$/.test(value)) return "float";
    if (value.startsWith("[") && value.endsWith("]")) return "array";
    if (value.startsWith("{") && value.endsWith("}")) return "object";
    return "string";
  };

  const convertTomlToMarkdown = (input: string): string => {
    const lines = input.split("\n");
    const entries: { key: string; value: string; section: string; type: string }[] = [];
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
        const key = kvMatch[1].trim();
        const value = kvMatch[2].trim();
        entries.push({
          key,
          value: value.replace(/^"|"$/g, ""),
          section: currentSection || "root",
          type: detectType(value),
        });
      }
    });

    if (sortBy === "key") {
      entries.sort((a, b) => a.key.localeCompare(b.key));
    } else if (sortBy === "section") {
      entries.sort((a, b) => a.section.localeCompare(b.section) || a.key.localeCompare(b.key));
    }

    let output = "# Configuration Reference\n\n";
    output += `Generated on ${new Date().toLocaleDateString()}\n\n`;

    // Create table
    output += "| ";
    if (includeSection) output += "Section | ";
    output += "Key | Value | Type |\n";
    
    output += "| ";
    if (includeSection) output += "--- | ";
    output += "--- | --- | --- |\n";

    entries.forEach(entry => {
      output += "| ";
      if (includeSection) output += `\`${entry.section}\` | `;
      output += `\`${entry.key}\` | \`${entry.value}\` | \`${entry.type}\` |\n`;
    });

    // Add summary
    output += "\n## Summary\n\n";
    output += `- **Total Keys:** ${entries.length}\n`;
    
    const sections = new Set(entries.map(e => e.section));
    output += `- **Sections:** ${sections.size}\n`;
    
    const types = new Set(entries.map(e => e.type));
    output += `- **Types:** ${Array.from(types).join(", ")}\n`;

    return output;
  };

  const handleConvert = useCallback(() => {
    if (!tomlInput.trim()) return;
    
    const markdown = convertTomlToMarkdown(tomlInput);
    setMarkdownOutput(markdown);
    setConverted(true);
  }, [tomlInput]);

  const handleClear = useCallback(() => {
    setTomlInput("");
    setMarkdownOutput("");
    setIncludeSection(true);
    setIncludeType(true);
    setSortBy("key");
    setConverted(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (markdownOutput) {
      navigator.clipboard.writeText(markdownOutput);
    }
  }, [markdownOutput]);

  const handleDownload = useCallback(() => {
    if (!markdownOutput) return;
    
    const blob = new Blob([markdownOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "config-reference.md";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [markdownOutput]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            TOML to Markdown Table Converter
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
                    id="includeSection"
                    checked={includeSection}
                    onChange={(e) => setIncludeSection(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="includeSection" className="font-normal text-sm">
                    Include Section column
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="includeType"
                    checked={includeType}
                    onChange={(e) => setIncludeType(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="includeType" className="font-normal text-sm">
                    Include Type column
                  </Label>
                </div>

                <div>
                  <Label className="text-xs">Sort By</Label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "key" | "section")}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="key">Key (A-Z)</option>
                    <option value="section">Section</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Output</Label>
                <Textarea
                  value={markdownOutput}
                  readOnly
                  placeholder="Markdown output will appear here..."
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!tomlInput.trim()}>
              <FileText className="w-4 h-4 mr-2" />
              Convert to Markdown
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

          {converted && markdownOutput && (
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-sm font-semibold mb-2">Preview:</p>
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ 
                  __html: markdownOutput
                    .replace(/^# (.+)$/gm, '<h1>$1</h2>')
                    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                    .replace(/\| (.+) \|\n\| (.+) \|\n/g, '<table><thead><tr>$1</tr></thead><tbody>')
                    .replace(/\| (.+) \|\n/g, '<tr>$1</tr>')
                    .replace(/<\/tbody>/g, '</tbody></table>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br/>')
                }} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TomlToMarkdownTableConverter;
