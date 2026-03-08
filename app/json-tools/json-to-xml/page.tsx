"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
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
              <JsonEditor
                value={input}
                onChange={setInput}
                placeholder="Paste your JSON here..."
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
              <JsonEditor
                value={output}
                readOnly
                placeholder="XML output will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON to XML Converter</h2>
        <p className="text-muted-foreground mb-6">
          Some legacy systems and enterprise APIs still use XML instead of JSON. This converter transforms JSON data into well-formed XML with proper nesting, tag names, and attribute handling. It's useful for SOAP APIs, configuration files, and data interchange.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the conversion works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your JSON and set the root element name. Choose your indentation preference. Click Convert to XML and the tool transforms each JSON key into an XML element. Arrays become repeated elements, objects become nested structures.
        </p>
        <p className="text-muted-foreground mb-8">
          Special characters in values are escaped for XML safety. Null values get an xsi:nil attribute. The output is valid XML that can be parsed by any XML processor. Use Copy or Download to export the result.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You need to send data to a SOAP web service that expects XML. Or you're migrating from a JSON-based system to an XML-based one. This tool also helps when working with legacy enterprise systems that require XML input.
        </p>
        <p className="text-muted-foreground mb-8">
          JSON to XML conversion is lossy in some cases. JSON's flexible structure doesn't always map cleanly to XML's rigid hierarchy. Review the output to ensure it meets your schema requirements.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">How are arrays converted?</p>
            <p className="text-muted-foreground">Array items become repeated elements with the same tag name. Each item is a separate element under the parent.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What about special characters?</p>
            <p className="text-muted-foreground">Characters like less-than, greater-than, and ampersand are escaped as XML entities for safe parsing.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I customize the root element?</p>
            <p className="text-muted-foreground">Yes, use the Root Element Name input to set your preferred root tag. The default is "root".</p>
          </div>
          <div>
            <p className="font-medium mb-1">Does it add an XML declaration?</p>
            <p className="text-muted-foreground">The output includes the XML declaration with version and encoding. This is required for proper XML parsing.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I convert XML back to JSON?</p>
            <p className="text-muted-foreground">Yes, use our XML to JSON tool for the reverse conversion. Note that some XML features don't map to JSON.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
