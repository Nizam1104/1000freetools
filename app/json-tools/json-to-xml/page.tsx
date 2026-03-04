"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Code2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JsonToXmlConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [rootName, setRootName] = useState("root");
  const [indent, setIndent] = useState("2");
  const [copied, setCopied] = useState(false);

  const sanitizeTagName = (name: string): string => {
    return name
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .replace(/^[^a-zA-Z_]/, "_$&");
  };

  const convertToJsonXml = useCallback((obj: unknown, tagName: string, indentLevel: number): string => {
    const indentStr = " ".repeat(parseInt(indent, 10) * indentLevel);
    const nextIndent = " ".repeat(parseInt(indent, 10) * (indentLevel + 1));

    if (obj === null) {
      return `${indentStr}<${tagName} xsi:nil="true"/>`;
    }

    if (typeof obj !== "object") {
      const value = String(obj);
      if (value === "") {
        return `${indentStr}<${tagName}></${tagName}>`;
      }
      return `${indentStr}<${tagName}>${escapeXml(value)}</${tagName}>`;
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return `${indentStr}<${tagName}></${tagName}>`;
      }

      let result = `${indentStr}<${tagName}>\n`;
      for (let i = 0; i < obj.length; i++) {
        const itemTag = `${tagName.endsWith("s") ? tagName.slice(0, -1) : "item"}_${i + 1}`;
        result += convertToJsonXml(obj[i], itemTag, indentLevel + 1);
        if (i < obj.length - 1) {
          result += "\n";
        }
      }
      result += `\n${indentStr}</${tagName}>`;
      return result;
    }

    const entries = Object.entries(obj as Record<string, unknown>);

    if (entries.length === 0) {
      return `${indentStr}<${tagName}></${tagName}>`;
    }

    let result = `${indentStr}<${tagName}>\n`;
    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      const safeTagName = sanitizeTagName(key);
      result += convertToJsonXml(value, safeTagName, indentLevel + 1);
      if (i < entries.length - 1) {
        result += "\n";
      }
    }
    result += `\n${indentStr}</${tagName}>`;
    return result;
  }, [indent]);

  const escapeXml = (str: string): string => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const convertJsonToXml = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const safeRootName = sanitizeTagName(rootName) || "root";
      const xmlContent = convertToJsonXml(parsed, safeRootName, 0);
      const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>';
      const fullXml = `${xmlDeclaration}\n${xmlContent}`;
      setOutput(fullXml);
      toast.success("Converted to XML successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, rootName, convertToJsonXml]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = {
      users: [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ],
      metadata: {
        version: "1.0",
        generated: true,
      },
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadXml = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/xml;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.xml";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("XML file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to XML Converter – Transform JSON Online</h1>
          <p className="text-muted-foreground">
            Convert JSON to XML with configurable root element and attribute handling. Our free JSON to XML Converter produces valid, well-structured XML from any JSON input.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Sample JSON
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="rootName" className="text-sm text-muted-foreground whitespace-nowrap">
                  Root Element:
                </Label>
                <input
                  id="rootName"
                  value={rootName}
                  onChange={(e) => setRootName(e.target.value)}
                  placeholder="root"
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm w-[150px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="indent" className="text-sm text-muted-foreground whitespace-nowrap">
                  Indent:
                </Label>
                <Select value={indent} onValueChange={setIndent}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 spaces</SelectItem>
                    <SelectItem value="4">4 spaces</SelectItem>
                    <SelectItem value="8">8 spaces</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToXml}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Convert to XML
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="min-h-[500px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="output" className="text-sm font-medium text-muted-foreground">
                  XML Output
                </Label>
                {output && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={copyOutput}>
                      {copied ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={downloadXml}>
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <Textarea
                id="output"
                value={output}
                readOnly
                placeholder="XML output will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
