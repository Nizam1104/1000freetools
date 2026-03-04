"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  FileJson,
  RotateCcw,
  Trash2,
  ArrowDownToLine,
  Copy,
  Check,
  Download,
} from "lucide-react";
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

  const flattenObject = useCallback(
    (obj: Record<string, unknown>, prefix = ""): Record<string, unknown> => {
      const result: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          Object.assign(
            result,
            flattenObject(value as Record<string, unknown>, newKey),
          );
        } else if (Array.isArray(value)) {
          result[newKey] = JSON.stringify(value);
        } else {
          result[newKey] = value;
        }
      }

      return result;
    },
    [],
  );

  const escapeCsvValue = useCallback(
    (value: unknown, delim: string): string => {
      if (value === null || value === undefined) {
        return "";
      }

      let strValue = String(value);

      if (
        strValue.includes(delim) ||
        strValue.includes('"') ||
        strValue.includes("\n") ||
        strValue.includes("\r")
      ) {
        strValue = strValue.replace(/"/g, '""');
        strValue = `"${strValue}"`;
      }

      return strValue;
    },
    [],
  );

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
        csvRows.push(
          headers.map((h) => escapeCsvValue(h, delimiter)).join(delimiter),
        );
      }

      for (const item of processedData) {
        const row = headers
          .map((header) => escapeCsvValue(item[header], delimiter))
          .join(delimiter);
        csvRows.push(row);
      }

      const csvContent = csvRows.join("\n");
      setOutput(csvContent);
      toast.success("Converted to CSV successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [
    input,
    delimiter,
    includeHeaders,
    flattenNested,
    flattenObject,
    escapeCsvValue,
  ]);

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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON to CSV Converter – Free Online Tool
          </h1>
          <p className="text-muted-foreground">
            Convert JSON arrays to CSV format instantly with automatic header
            detection and custom delimiter options. Export structured JSON data
            into spreadsheet-ready CSV files for free.
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
                <Label
                  htmlFor="delimiter"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
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
                  <Label
                    htmlFor="includeHeaders"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
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
                  <Label
                    htmlFor="flattenNested"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
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
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON array or object here..."
                className="min-h-[500px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label
                  htmlFor="output"
                  className="text-sm font-medium text-muted-foreground"
                >
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
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50 max-h-[500px] overflow-y-auto"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">
          About JSON to CSV Converter
        </h2>
        <p className="text-muted-foreground mb-6">
          CSV format is universal for data exchange with spreadsheets and
          databases. This tool converts JSON arrays to CSV with automatic header
          detection, custom delimiters, and proper escaping for special
          characters.
        </p>

        <h3 className="text-xl font-semibold mb-3">How it works</h3>
        <p className="text-muted-foreground mb-2">
          The converter extracts all unique keys from your JSON array to create
          column headers. Each object becomes a row with values properly escaped
          for CSV format compatibility.
        </p>
        <p className="text-muted-foreground mb-8">
          Enable Flatten Nested to convert nested objects into dot-notation
          columns. Choose your delimiter from comma, semicolon, pipe, or tab
          based on your target application's requirements.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You have API data in JSON that needs to go into Excel for analysis or
          reporting. Convert to CSV and open directly in your spreadsheet
          application with proper column headers.
        </p>
        <p className="text-muted-foreground mb-8">
          CSV works best with flat arrays of similar objects. Highly nested or
          irregular data structures may produce many empty cells or require
          preprocessing for clean output.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">How are nested objects handled?</p>
            <p className="text-muted-foreground">
              Without flattening, nested objects become JSON strings. Enable
              Flatten Nested to create separate columns for each nested
              property.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">What delimiter should I use?</p>
            <p className="text-muted-foreground">
              Comma is standard but conflicts with data containing commas.
              Semicolon works well in European locales. Tab is great for Excel
              imports.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Are special characters escaped?</p>
            <p className="text-muted-foreground">
              Yes, values containing the delimiter, quotes, or newlines are
              properly quoted and escaped according to CSV standards.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I exclude the header row?</p>
            <p className="text-muted-foreground">
              Yes, uncheck Include Headers to output data rows only. This is
              useful when appending to existing CSV files with headers.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I download the CSV?</p>
            <p className="text-muted-foreground">
              Yes. Click Download to save as a .csv file or Copy to paste
              directly into your spreadsheet or database import tool.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a
              href="/json-tools/json-to-tsv"
              className="text-primary hover:underline"
            >
              JSON to TSV
            </a>{" "}
            – Tab-separated values format
          </li>
          <li>
            <a
              href="/json-tools/json-to-excel"
              className="text-primary hover:underline"
            >
              JSON to Excel
            </a>{" "}
            – Direct XLSX export
          </li>
          <li>
            <a
              href="/json-tools/csv-to-json"
              className="text-primary hover:underline"
            >
              CSV to JSON
            </a>{" "}
            – Convert CSV back to JSON
          </li>
        </ul>
      </div>
    </div>
  );
}
