"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { copyToClipboard, parseCSVIntelligently, CSVRow } from "./csv-utils";

export default function CsvToXml() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [rootElement, setRootElement] = useState<string>("data");
  const [rowElement, setRowElement] = useState<string>("row");
  const [useAttributes, setUseAttributes] = useState<boolean>(false);
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
    if (file && file.name.toLowerCase().endsWith(".csv")) {
      file.text().then((text) => {
        setInputText(text);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const escapeXml = useCallback((value: string): string => {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }, []);

  const convertToXml = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const { data, headers } = parseCSVIntelligently(inputText);

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<${rootElement}>\n`;

      data.forEach((row) => {
        xml += `  <${rowElement}`;

        if (useAttributes) {
          headers.forEach((header) => {
            const value = String(row[header] || "").replace(/"/g, "&quot;");
            xml += ` ${header}="${value}"`;
          });
          xml += ` />\n`;
        } else {
          xml += `>\n`;
          headers.forEach((header) => {
            const value = String(row[header] || "");
            xml += `    <${header}>${escapeXml(value)}</${header}>\n`;
          });
          xml += `  </${rowElement}>\n`;
        }
      });

      xml += `</${rootElement}>`;

      setOutput(xml);
      toast.success("Successfully converted CSV to XML");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, rootElement, rowElement, useAttributes, escapeXml]);

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
    const blob = new Blob([output], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.xml";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded XML file");
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setRootElement("data");
    setRowElement("row");
    setUseAttributes(false);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV to XML Converter</h1>
        <p className="text-muted-foreground">
          Convert CSV data to XML format with configurable element names
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">CSV Input</Label>
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
              <FileSpreadsheet className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop a CSV file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">or paste CSV data below</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste CSV data here...&#10;name,age,city&#10;John,30,New York&#10;Jane,25,Los Angeles"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">XML Options</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-md">
              <Label htmlFor="rootElement" className="text-sm font-medium">
                Root Element
              </Label>
              <Input
                id="rootElement"
                value={rootElement}
                onChange={(e) => setRootElement(e.target.value)}
                className="mt-1"
                placeholder="data"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Name of the root XML element
              </p>
            </div>

            <div className="p-3 border rounded-md">
              <Label htmlFor="rowElement" className="text-sm font-medium">
                Row Element
              </Label>
              <Input
                id="rowElement"
                value={rowElement}
                onChange={(e) => setRowElement(e.target.value)}
                className="mt-1"
                placeholder="row"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Name of each row element
              </p>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <input
                type="checkbox"
                id="useAttributes"
                checked={useAttributes}
                onChange={(e) => setUseAttributes(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300"
              />
              <div className="flex-1">
                <Label htmlFor="useAttributes" className="text-sm font-medium cursor-pointer">
                  Use Attributes
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Use attributes instead of child elements
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Convert Button */}
        <section>
          <Button
            onClick={convertToXml}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Converting..." : "Convert to XML"}
          </Button>
        </section>

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">XML Output</Label>
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
