"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
    </div>
  );
}
