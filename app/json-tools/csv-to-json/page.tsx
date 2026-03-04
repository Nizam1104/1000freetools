"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileSpreadsheet, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Upload, Download } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CsvToJsonConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [outputFormat, setOutputFormat] = useState<"array" | "object">("array");
  const [copied, setCopied] = useState(false);
  const [autoDetectDelimiter, setAutoDetectDelimiter] = useState(true);

  const detectDelimiter = useCallback((text: string): string => {
    const firstLine = text.split("\n")[0] || "";
    const delimiters = [",", ";", "|", "\t"];
    let maxCount = 0;
    let detectedDelimiter = ",";

    for (const delim of delimiters) {
      const count = (firstLine.match(new RegExp(`\\${delim}`, "g")) || []).length;
      if (count > maxCount) {
        maxCount = count;
        detectedDelimiter = delim;
      }
    }

    return detectedDelimiter;
  }, []);

  const parseCsvLine = useCallback((line: string, delim: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delim && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  }, []);

  const convertValue = useCallback((value: string): unknown => {
    if (value === "") {
      return null;
    }

    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "null") return null;

    if (/^-?\d+$/.test(value)) {
      return parseInt(value, 10);
    }

    if (/^-?\d*\.\d+$/.test(value)) {
      return parseFloat(value);
    }

    return value;
  }, []);

  const convertCsvToJson = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter CSV to convert");
      return;
    }

    try {
      const actualDelimiter = autoDetectDelimiter ? detectDelimiter(input) : delimiter;
      const lines = input.split("\n").filter((line) => line.trim());

      if (lines.length < 1) {
        toast.error("CSV must have at least a header row");
        return;
      }

      const headers = parseCsvLine(lines[0], actualDelimiter);

      if (outputFormat === "array") {
        const result = lines.slice(1).map((line) => {
          const values = parseCsvLine(line, actualDelimiter);
          const obj: Record<string, unknown> = {};
          headers.forEach((header, index) => {
            obj[header] = convertValue(values[index] || "");
          });
          return obj;
        });
        setOutput(JSON.stringify(result, null, 2));
      } else {
        const result: Record<string, Record<string, unknown>[]> = {};
        lines.slice(1).forEach((line) => {
          const values = parseCsvLine(line, actualDelimiter);
          const obj: Record<string, unknown> = {};
          headers.forEach((header, index) => {
            obj[header] = convertValue(values[index] || "");
          });

          const firstHeader = headers[0];
          const firstValue = obj[firstHeader];
          const key = String(firstValue);

          if (!result[key]) {
            result[key] = [];
          }
          result[key].push(obj);
        });
        setOutput(JSON.stringify(result, null, 2));
      }

      toast.success("Converted to JSON successfully!");
    } catch (e) {
      toast.error(`Conversion error: ${(e as Error).message}`);
    }
  }, [input, delimiter, outputFormat, autoDetectDelimiter, detectDelimiter, parseCsvLine, convertValue]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = `id,name,email,role,active
1,John Doe,john@example.com,admin,true
2,Jane Smith,jane@example.com,user,true
3,Bob Johnson,bob@example.com,user,false`;
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

  const rowCount = useMemo(() => {
    if (!input) return 0;
    const lines = input.split("\n").filter((line) => line.trim());
    return Math.max(0, lines.length - 1);
  }, [input]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">CSV to JSON Converter – Free Online Tool</h1>
          <p className="text-muted-foreground">
            Convert CSV files or pasted text into structured JSON objects or arrays in seconds. Our free CSV to JSON Converter handles headers automatically and supports any delimiter.
          </p>
        </div>

        {/* The Problem */}
        <Card className="mb-6 border-dashed">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold mb-3">The Challenge</h2>
            <p className="text-muted-foreground mb-4">
              You exported data from a spreadsheet or database as CSV but your application needs JSON. Manually restructuring the data means adding quotes, commas, and braces for every row. This tool parses your CSV and converts it to a JSON array of objects using the header row as keys.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <h3 className="font-medium text-sm mb-2">Input Support:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Comma-separated values</li>
                  <li>• Semicolon delimiters</li>
                  <li>• Tab-separated values</li>
                  <li>• Pipe-delimited files</li>
                </ul>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <h3 className="font-medium text-sm mb-2">Features:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Auto-detect delimiter</li>
                  <li>• Type inference</li>
                  <li>• Quote handling</li>
                  <li>• File upload support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works - Numbered Steps */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Conversion Steps</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {[
              { num: 1, title: "Paste CSV", desc: "Enter CSV data or upload a file" },
              { num: 2, title: "Configure", desc: "Set delimiter and output format" },
              { num: 3, title: "Convert", desc: "Get JSON array output instantly" }
            ].map((step) => (
              <div key={step.num} className="flex-1 bg-card border rounded-lg p-4 text-center">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto mb-2">{step.num}</div>
                <h3 className="font-medium mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Sample CSV
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <label>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                    <input
                      type="file"
                      accept=".csv,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="delimiter" className="text-sm text-muted-foreground whitespace-nowrap">
                  Delimiter:
                </Label>
                <Select value={delimiter} onValueChange={setDelimiter} disabled={autoDetectDelimiter}>
                  <SelectTrigger className="w-[120px]">
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

              <div className="flex items-center gap-2">
                <Label htmlFor="format" className="text-sm text-muted-foreground whitespace-nowrap">
                  Output Format:
                </Label>
                <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as "array" | "object")}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="array">Array of Objects</SelectItem>
                    <SelectItem value="object">Grouped Object</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autoDetect"
                  checked={autoDetectDelimiter}
                  onChange={(e) => setAutoDetectDelimiter(e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
                <Label htmlFor="autoDetect" className="text-sm text-muted-foreground cursor-pointer">
                  Auto-detect delimiter
                </Label>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertCsvToJson}>
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
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="input" className="text-sm font-medium text-muted-foreground">
                  Input CSV {rowCount > 0 && `(${rowCount} data rows)`}
                </Label>
              </div>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your CSV here or upload a file..."
                className="min-h-[500px] font-mono text-sm resize-none"
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
                placeholder="JSON output will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About CSV to JSON Converter</h2>
        <p className="text-muted-foreground mb-6">
          CSV files from spreadsheets and databases need to become JSON for web applications. This converter handles the transformation automatically, detecting delimiters and converting data types. Export your CSV data as JSON arrays or objects keyed by the first column.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the conversion works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your CSV data in the input box. The tool auto-detects the delimiter or you can specify it manually. Choose your output format: array of objects or object keyed by first column. Click Convert and the CSV becomes structured JSON.
        </p>
        <p className="text-muted-foreground mb-8">
          The first row is treated as headers. Values are converted to appropriate types: numbers become numbers, true/false become booleans. Empty cells become null. Use Copy or Download to export the result.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You exported data from Excel or a database and need it in JSON format for your app. Or you're importing spreadsheet data into a web application. This tool also helps when migrating from legacy systems that use CSV.
        </p>
        <p className="text-muted-foreground mb-8">
          CSV has limitations compared to JSON. It can't represent nested structures or arrays within cells. For complex data, consider exporting directly to JSON from your source system.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">Does this handle quoted fields?</p>
            <p className="text-muted-foreground">Yes, CSV fields with commas or newlines should be quoted. The parser handles standard CSV quoting correctly.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What delimiters are supported?</p>
            <p className="text-muted-foreground">Comma, semicolon, tab, pipe, and custom delimiters. Auto-detect usually figures it out from your data.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How are data types handled?</p>
            <p className="text-muted-foreground">Numbers and booleans are auto-converted. Strings stay as strings. Empty values become null in the JSON output.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I convert JSON back to CSV?</p>
            <p className="text-muted-foreground">Yes, use our JSON to CSV tool for the reverse conversion. Flat JSON arrays convert best to CSV format.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What about CSV files with no headers?</p>
            <p className="text-muted-foreground">The first row is always treated as headers. Add a header row to your CSV or use array output format.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-to-csv" className="text-primary hover:underline">JSON to CSV</a> – Convert JSON arrays to CSV format
          </li>
          <li>
            <a href="/json-tools/json-to-excel" className="text-primary hover:underline">JSON to Excel</a> – Export JSON data to Excel spreadsheets
          </li>
          <li>
            <a href="/json-tools/json-to-tsv" className="text-primary hover:underline">JSON to TSV</a> – Convert JSON to tab-separated values
          </li>
        </ul>
      </div>
    </div>
  );
}
