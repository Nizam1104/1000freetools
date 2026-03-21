"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { copyToClipboard, parseCSVIntelligently } from "./csv-utils";

type Language = "javascript" | "python" | "php" | "ruby";

export default function CsvToArray() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>("javascript");
  const [arrayType, setArrayType] = useState<"objects" | "arrays">("objects");
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

  const escapeString = useCallback((str: string, lang: Language): string => {
    switch (lang) {
      case "php":
        return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
      case "ruby":
        return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
      default:
        return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
    }
  }, []);

  const convertToArray = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const { data, headers } = parseCSVIntelligently(inputText);

      let result = "";

      if (arrayType === "objects") {
        // Array of objects format
        switch (language) {
          case "javascript":
            result = "[\n";
            data.forEach((row, index) => {
              result += "  {\n";
              headers.forEach((header, hIndex) => {
                const value = String(row[header] || "");
                const isNumeric = !isNaN(Number(value)) && value !== "";
                result += `    "${header}": ${isNumeric ? value : `"${escapeString(value, language)}"`}${hIndex < headers.length - 1 ? "," : ""}\n`;
              });
              result += `  }${index < data.length - 1 ? "," : ""}\n`;
            });
            result += "]";
            break;

          case "python":
            result = "[\n";
            data.forEach((row, index) => {
              result += "  {\n";
              headers.forEach((header, hIndex) => {
                const value = String(row[header] || "");
                const isNumeric = !isNaN(Number(value)) && value !== "";
                result += `    "${header}": ${isNumeric ? value : `"${escapeString(value, language)}"`}${hIndex < headers.length - 1 ? "," : ""}\n`;
              });
              result += `  }${index < data.length - 1 ? "," : ""}\n`;
            });
            result += "]";
            break;

          case "php":
            result = "[\n";
            data.forEach((row, index) => {
              result += "  [\n";
              headers.forEach((header, hIndex) => {
                const value = String(row[header] || "");
                result += `    "${header}" => "${escapeString(value, language)}"${hIndex < headers.length - 1 ? "," : ""}\n`;
              });
              result += `  ]${index < data.length - 1 ? "," : ""}\n`;
            });
            result += "]";
            break;

          case "ruby":
            result = "[\n";
            data.forEach((row, index) => {
              result += "  {\n";
              headers.forEach((header, hIndex) => {
                const value = String(row[header] || "");
                result += `    "${header}" => "${escapeString(value, language)}"${hIndex < headers.length - 1 ? "," : ""}\n`;
              });
              result += `  }${index < data.length - 1 ? "," : ""}\n`;
            });
            result += "]";
            break;
        }
      } else {
        // Array of arrays format
        switch (language) {
          case "javascript":
            result = "[\n";
            result += `  [${headers.map((h) => `"${escapeString(h, language)}"`).join(", ")}],\n`;
            data.forEach((row, index) => {
              const values = headers.map((header) => {
                const value = String(row[header] || "");
                const isNumeric = !isNaN(Number(value)) && value !== "";
                return isNumeric ? value : `"${escapeString(value, language)}"`;
              });
              result += `  [${values.join(", ")}]${index < data.length - 1 ? "," : ""}\n`;
            });
            result += "]";
            break;

          case "python":
            result = "[\n";
            result += `  [${headers.map((h) => `"${escapeString(h, language)}"`).join(", ")}],\n`;
            data.forEach((row, index) => {
              const values = headers.map((header) => {
                const value = String(row[header] || "");
                const isNumeric = !isNaN(Number(value)) && value !== "";
                return isNumeric ? value : `"${escapeString(value, language)}"`;
              });
              result += `  [${values.join(", ")}]${index < data.length - 1 ? "," : ""}\n`;
            });
            result += "]";
            break;

          case "php":
            result = "[\n";
            result += `  [${headers.map((h) => `"${escapeString(h, language)}"`).join(", ")}],\n`;
            data.forEach((row, index) => {
              const values = headers.map((header) => {
                const value = String(row[header] || "");
                return `"${escapeString(value, language)}"`;
              });
              result += `  [${values.join(", ")}]${index < data.length - 1 ? "," : ""}\n`;
            });
            result += "]";
            break;

          case "ruby":
            result = "[\n";
            result += `  [${headers.map((h) => `"${escapeString(h, language)}"`).join(", ")}],\n`;
            data.forEach((row, index) => {
              const values = headers.map((header) => {
                const value = String(row[header] || "");
                return `"${escapeString(value, language)}"`;
              });
              result += `  [${values.join(", ")}]${index < data.length - 1 ? "," : ""}\n`;
            });
            result += "]";
            break;
        }
      }

      setOutput(result);
      toast.success(`Successfully converted CSV to ${language} array`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, language, arrayType, escapeString]);

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
    const extensions = { javascript: "js", python: "py", php: "php", ruby: "rb" };
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${extensions[language]}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${language.toUpperCase()} file`);
  }, [output, language]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setLanguage("javascript");
    setArrayType("objects");
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
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
          <Label className="text-base mb-3 block">Output Options</Label>
          <Tabs value={language} onValueChange={(v) => setLanguage(v as Language)}>
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="php">PHP</TabsTrigger>
              <TabsTrigger value="ruby">Ruby</TabsTrigger>
            </TabsList>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-md">
                <Label className="text-sm font-medium">Array Type</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="arrayType"
                      checked={arrayType === "objects"}
                      onChange={() => setArrayType("objects")}
                      className="h-4 w-4"
                    />
                    Objects
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="arrayType"
                      checked={arrayType === "arrays"}
                      onChange={() => setArrayType("arrays")}
                      className="h-4 w-4"
                    />
                    Arrays
                  </label>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {arrayType === "objects" ? "Array of objects with named properties" : "Array of arrays (including headers)"}
                </p>
              </div>

              <div className="p-3 border rounded-md bg-muted/30">
                <Label className="text-sm font-medium">Output Format</Label>
                <p className="text-xs text-muted-foreground mt-2">
                  {language === "javascript" && "const data = [...]"}
                  {language === "python" && "data = [...]"}
                  {language === "php" && "$data = [...];"}
                  {language === "ruby" && "data = [...]"}
                </p>
              </div>
            </div>
          </Tabs>
        </section>

        <Separator />

        {/* Convert Button */}
        <section>
          <Button
            onClick={convertToArray}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Converting..." : `Convert to ${language.charAt(0).toUpperCase() + language.slice(1)} Array`}
          </Button>
        </section>

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Array Output</Label>
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
