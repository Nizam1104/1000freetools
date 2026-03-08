"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { copyToClipboard } from "./csv-utils";

interface CSVRow {
  [key: string]: string | number;
}

export default function XmlToCsv() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [delimiter, setDelimiter] = useState<string>(",");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        setInputText(text);
        toast.success(`Loaded file: ${file.name}`);
      } catch (error) {
        toast.error("Failed to read file");
      }
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && (file.name.toLowerCase().endsWith(".xml") || file.name.toLowerCase().endsWith(".txt"))) {
      file.text().then((text) => {
        setInputText(text);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop an XML file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const parseXml = useCallback((xml: string): any[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");

    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      throw new Error("Invalid XML format");
    }

    const root = xmlDoc.documentElement;
    const rows: any[] = [];
    const children = Array.from(root.children);

    if (children.length === 0) {
      return rows;
    }

    // Check if first child has attributes (attribute-based XML)
    const firstChild = children[0];
    const hasAttributes = firstChild.attributes.length > 0 && firstChild.children.length === 0;

    if (hasAttributes) {
      // Attribute-based XML
      const headers: string[] = [];
      children.forEach((child) => {
        Array.from(child.attributes).forEach((attr) => {
          if (!headers.includes(attr.name)) {
            headers.push(attr.name);
          }
        });
      });

      children.forEach((child) => {
        const row: any = {};
        headers.forEach((header) => {
          row[header] = child.getAttribute(header) || "";
        });
        rows.push(row);
      });
    } else {
      // Element-based XML
      const headers: string[] = [];
      children.forEach((child) => {
        Array.from(child.children).forEach((element) => {
          if (!headers.includes(element.tagName)) {
            headers.push(element.tagName);
          }
        });
      });

      children.forEach((child) => {
        const row: any = {};
        headers.forEach((header) => {
          const element = child.querySelector(`:scope > ${header}`);
          row[header] = element?.textContent || "";
        });
        rows.push(row);
      });
    }

    return rows;
  }, []);

  const convertToCsv = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload XML data");
      return;
    }

    setIsProcessing(true);

    try {
      const data = parseXml(inputText);

      if (data.length === 0) {
        throw new Error("No data found in XML");
      }

      const headers = Object.keys(data[0]);

      // Generate CSV
      let csv = "";
      if (headers.length > 0) {
        csv += headers.map((h) => {
          if (h.includes(delimiter) || h.includes('"') || h.includes("\n")) {
            return `"${h.replace(/"/g, '""')}"`;
          }
          return h;
        }).join(delimiter) + "\n";
      }

      data.forEach((row) => {
        const values = headers.map((header) => {
          const value = String(row[header] ?? "");
          if (value.includes(delimiter) || value.includes('"') || value.includes("\n")) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csv += values.join(delimiter) + "\n";
      });

      setOutput(csv.trim());
      toast.success("Successfully converted XML to CSV");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, delimiter, parseXml]);

  const copyToClipboardHandler = useCallback(async () => {
    if (!output) return;
    try {
      await copyToClipboard(output);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  }, [output]);

  const downloadOutput = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded CSV file");
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setDelimiter(",");
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">XML to CSV Converter</h1>
        <p className="text-muted-foreground">
          Convert XML data to CSV format
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">XML Input</Label>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Clear
              </Button>
            </div>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-border rounded-md p-6 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <Code className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop an XML file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">or paste XML data below</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xml,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='Paste XML data here...&#10;&lt;data&gt;&#10;  &lt;row&gt;&#10;    &lt;name&gt;John&lt;/name&gt;&#10;    &lt;age&gt;30&lt;/age&gt;&#10;  &lt;/row&gt;&#10;&lt;/data&gt;'
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">CSV Options</Label>
          <div className="max-w-xs">
            <div className="p-3 border rounded-md">
              <Label htmlFor="delimiter" className="text-sm font-medium">
                Delimiter
              </Label>
              <select
                id="delimiter"
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background text-sm"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="|">Pipe (|)</option>
                <option value="\t">Tab</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Character used to separate columns
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Convert Button */}
        <section>
          <Button
            onClick={convertToCsv}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Converting..." : "Convert to CSV"}
          </Button>
        </section>

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">CSV Output</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboardHandler}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadOutput}>
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>

            <div className="border rounded-md bg-muted/30 p-4 overflow-auto max-h-[500px]">
              <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                {output}
              </pre>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
