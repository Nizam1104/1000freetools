"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Download } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JsonToCsvConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [copied, setCopied] = useState(false);
  const [flattenNested, setFlattenNested] = useState(false);

  const flattenObject = useCallback((obj: Record<string, unknown>, prefix = ""): Record<string, unknown> => {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
      } else if (Array.isArray(value)) {
        result[newKey] = JSON.stringify(value);
      } else {
        result[newKey] = value;
      }
    }

    return result;
  }, []);

  const escapeCsvValue = useCallback((value: unknown, delim: string): string => {
    if (value === null || value === undefined) {
      return "";
    }

    let strValue = String(value);

    if (strValue.includes(delim) || strValue.includes('"') || strValue.includes("\n") || strValue.includes("\r")) {
      strValue = strValue.replace(/"/g, '""');
      strValue = `"${strValue}"`;
    }

    return strValue;
  }, []);

  const convertJsonToCsv = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      let dataArray: Record<string, unknown>[] = [];

      if (Array.isArray(parsed)) {
        dataArray = parsed as Record<string, unknown>[];
      } else if (typeof parsed === "object") {
        dataArray = [parsed as Record<string, unknown>];
      } else {
        toast.error("JSON must be an object or array of objects");
        return;
      }

      if (dataArray.length === 0) {
        setOutput("");
        toast.info("Empty array - no data to convert");
        return;
      }

      const processedData = flattenNested
        ? dataArray.map((item) => flattenObject(item))
        : dataArray;

      const allKeys = new Set<string>();
      processedData.forEach((item) => {
        Object.keys(item).forEach((key) => allKeys.add(key));
      });

      const headers = Array.from(allKeys);
      const csvRows: string[] = [];

      if (includeHeaders) {
        csvRows.push(headers.map((h) => escapeCsvValue(h, delimiter)).join(delimiter));
      }

      for (const item of processedData) {
        const row = headers.map((header) => escapeCsvValue(item[header], delimiter)).join(delimiter);
        csvRows.push(row);
      }

      const csvContent = csvRows.join("\n");
      setOutput(csvContent);
      toast.success("Converted to CSV successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, delimiter, includeHeaders, flattenNested, flattenObject, escapeCsvValue]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "user" },
    ];
    setInput(JSON.stringify(sample, null, 2));
  };

  const loadNestedSample = () => {
    const sample = [
      {
        id: 1,
        name: "John Doe",
        address: { city: "New York", country: "USA" },
        skills: ["JavaScript", "React"],
      },
      {
        id: 2,
        name: "Jane Smith",
        address: { city: "London", country: "UK" },
        skills: ["Python", "Django"],
      },
    ];
    setInput(JSON.stringify(sample, null, 2));
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCsv = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("CSV file downloaded!");
  };

  const previewRows = useMemo(() => {
    if (!output) return 0;
    return output.split("\n").length - (includeHeaders ? 1 : 0);
  }, [output, includeHeaders]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to CSV Converter – Free Online Tool</h1>
          <p className="text-muted-foreground">
            Convert JSON arrays to CSV format instantly with automatic header detection and custom delimiter options. Export structured JSON data into spreadsheet-ready CSV files for free.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Simple Sample
                </Button>
                <Button variant="outline" size="sm" onClick={loadNestedSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Nested Sample
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="delimiter" className="text-sm text-muted-foreground whitespace-nowrap">
                  Delimiter:
                </Label>
                <Select value={delimiter} onValueChange={setDelimiter}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=",">Comma (,)</SelectItem>
                    <SelectItem value=";">Semicolon (;)</SelectItem>
                    <SelectItem value="|">Pipe (|)</SelectItem>
                    <SelectItem value="&#9;">Tab</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="includeHeaders"
                    checked={includeHeaders}
                    onChange={(e) => setIncludeHeaders(e.target.checked)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <Label htmlFor="includeHeaders" className="text-sm text-muted-foreground cursor-pointer">
                    Include headers
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="flattenNested"
                    checked={flattenNested}
                    onChange={(e) => setFlattenNested(e.target.checked)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <Label htmlFor="flattenNested" className="text-sm text-muted-foreground cursor-pointer">
                    Flatten nested
                  </Label>
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToCsv}>
                  <ArrowDownToLine className="h-4 w-4 mr-2" />
                  Convert to CSV
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
                placeholder="Paste your JSON array or object here..."
                className="min-h-[500px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="output" className="text-sm font-medium text-muted-foreground">
                  CSV Output {previewRows > 0 && `(${previewRows} rows)`}
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
                    <Button variant="ghost" size="sm" onClick={downloadCsv}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <Textarea
                id="output"
                value={output}
                readOnly
                placeholder="CSV output will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
