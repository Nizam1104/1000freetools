"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { Code2, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Upload } from "lucide-react";
import { toast } from "sonner";

export default function XmlToJsonConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");
  const [copied, setCopied] = useState(false);
  const [preserveAttributes, setPreserveAttributes] = useState(true);

  const parseXml = useCallback((xml: string): unknown => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");

    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      throw new Error("Invalid XML: " + parseError.textContent);
    }

    const parseNode = (node: Node): unknown => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        if (!text) return null;
        return text;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const result: Record<string, unknown> = {};

        if (preserveAttributes && element.attributes.length > 0) {
          result["@attributes"] = {};
          for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            (result["@attributes"] as Record<string, string>)[attr.name] = attr.value;
          }
        }

        const children = Array.from(element.childNodes);
        const childNodes = children.filter(
          (n) => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
        );

        if (childNodes.length === 0) {
          const text = element.textContent?.trim();
          if (text) {
            return parseValue(text);
          }
          return Object.keys(result).length > 0 ? result : null;
        }

        const childMap: Record<string, unknown[]> = {};

        for (const child of childNodes) {
          if (child.nodeType === Node.ELEMENT_NODE) {
            const childElement = child as Element;
            const childValue = parseNode(child);
            const childName = childElement.nodeName;

            if (!childMap[childName]) {
              childMap[childName] = [];
            }
            childMap[childName].push(childValue);
          }
        }

        for (const [name, values] of Object.entries(childMap)) {
          if (values.length === 1) {
            result[name] = values[0];
          } else {
            result[name] = values;
          }
        }

        const textContent = element.textContent?.trim();
        if (textContent && Object.keys(result).length === 0) {
          return parseValue(textContent);
        }

        return Object.keys(result).length > 0 ? result : null;
      }

      return null;
    };

    const parseValue = (value: string): unknown => {
      if (value === "true") return true;
      if (value === "false") return false;
      if (/^-?\d+$/.test(value)) return parseInt(value, 10);
      if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value);
      return value;
    };

    const rootElement = xmlDoc.documentElement;
    if (!rootElement) {
      throw new Error("No root element found in XML");
    }

    const rootName = rootElement.nodeName;
    const rootValue = parseNode(rootElement);

    if (typeof rootValue === "object" && rootValue !== null) {
      return { [rootName]: rootValue };
    }

    return { [rootName]: rootValue };
  }, [preserveAttributes]);

  const convertXmlToJson = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter XML to convert");
      return;
    }

    try {
      const parsed = parseXml(input);
      const indentSize = parseInt(indent, 10);
      setOutput(JSON.stringify(parsed, null, indentSize));
      toast.success("Converted to JSON successfully!");
    } catch (e) {
      toast.error((e as Error).message);
    }
  }, [input, indent, parseXml]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = `<?xml version="1.0" encoding="UTF-8"?>
<users>
  <user id="1">
    <name>John Doe</name>
    <email>john@example.com</email>
    <active>true</active>
  </user>
  <user id="2">
    <name>Jane Smith</name>
    <email>jane@example.com</email>
    <active>false</active>
  </user>
</users>`;
    setInput(sample);
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("JSON file downloaded!");
  };

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInput(content);
        toast.success("File loaded successfully!");
      }
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">XML to JSON Converter – Free Online Tool</h1>
          <p className="text-muted-foreground">
            Parse and convert XML into clean, structured JSON while preserving full hierarchy. Our free XML to JSON Converter handles nested elements, attributes, and complex XML documents.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Sample XML
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <label>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                    <input
                      type="file"
                      accept=".xml,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="indent" className="text-sm text-muted-foreground whitespace-nowrap">
                  Indent:
                </Label>
                <select
                  id="indent"
                  value={indent}
                  onChange={(e) => setIndent(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                  <option value="8">8 spaces</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="preserveAttributes"
                  checked={preserveAttributes}
                  onChange={(e) => setPreserveAttributes(e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
                <Label htmlFor="preserveAttributes" className="text-sm text-muted-foreground cursor-pointer">
                  Preserve attributes
                </Label>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertXmlToJson}>
                  <ArrowDownToLine className="h-4 w-4 mr-2" />
                  Convert to JSON
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
                Input XML
              </Label>
              <JsonEditor
                value={input}
                onChange={setInput}
                placeholder="Paste your XML here or upload a file..."
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="output" className="text-sm font-medium text-muted-foreground">
                  JSON Output
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
                    <Button variant="ghost" size="sm" onClick={downloadJson}>
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <JsonEditor
                value={output}
                readOnly
                placeholder="JSON output will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About XML to JSON Converter</h2>
        <p className="text-muted-foreground mb-6">
          Many legacy systems and APIs still use XML, but modern applications prefer JSON. This tool converts XML documents to JSON format while preserving the document structure, attributes, and data types.
        </p>

        <h3 className="text-xl font-semibold mb-3">How it works</h3>
        <p className="text-muted-foreground mb-2">
          The converter parses your XML using the browser's built-in DOM parser. Elements become JSON objects, attributes are stored under @attributes, and text content becomes string values.
        </p>
        <p className="text-muted-foreground mb-8">
          Smart type detection converts numeric and boolean strings to their proper types. The preserve attributes option lets you include or exclude XML attributes based on your needs.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You're migrating from an XML-based API to a modern JSON API. Convert sample responses to understand the data structure and plan your new JSON schema accordingly.
        </p>
        <p className="text-muted-foreground mb-8">
          Complex XML with mixed content or processing instructions may not convert perfectly. Review the output for complex documents and adjust manually if needed.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">How are XML attributes handled?</p>
            <p className="text-muted-foreground">Attributes are grouped under an @attributes key within each element's object. Enable the preserve attributes option to include them in the output.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I upload XML files?</p>
            <p className="text-muted-foreground">Yes, click Upload File to select an XML file from your device. The content loads directly into the input area for conversion.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What about XML namespaces?</p>
            <p className="text-muted-foreground">Namespaces are preserved in element names. For cleaner output, you may need to post-process the JSON to remove or simplify namespace prefixes.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Are CDATA sections preserved?</p>
            <p className="text-muted-foreground">CDATA content is extracted as text content. The distinction between CDATA and regular text is not preserved in the JSON output.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I download the JSON?</p>
            <p className="text-muted-foreground">Yes. Use the Download button to save the converted JSON as a file, or Copy to paste it directly into your application.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
