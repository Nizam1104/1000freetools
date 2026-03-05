"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Table } from "lucide-react";
import { toast } from "sonner";

export default function JsonToTsvConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const escapeTsv = (value: unknown): string => {
    if (value === null || value === undefined) {
      return "";
    }
    const str = String(value);
    if (str.includes("\t") || str.includes("\n") || str.includes("\r")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const flattenObject = (obj: Record<string, unknown>, prefix = ""): Record<string, unknown> => {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
      } else {
        result[newKey] = value;
      }
    }

    return result;
  };

  const convertJsonToTsv = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const dataArray = Array.isArray(parsed) ? parsed : [parsed];

      if (dataArray.length === 0) {
        toast.error("JSON array is empty");
        return;
      }

      const flattenedData = dataArray.map(item => flattenObject(item as Record<string, unknown>));
      const allKeys = Array.from(new Set(flattenedData.flatMap(obj => Object.keys(obj))));

      const header = allKeys.join("\t");
      const rows = flattenedData.map(obj =>
        allKeys.map(key => escapeTsv(obj[key])).join("\t")
      );

      const tsv = [header, ...rows].join("\n");
      setOutput(tsv);
      toast.success("Converted to TSV successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = JSON.stringify([
      { id: 1, name: "John Doe", email: "john@example.com", active: true },
      { id: 2, name: "Jane Smith", email: "jane@example.com", active: false },
      { id: 3, name: "Bob Wilson", email: "bob@example.com", active: true },
    ], null, 2);
    setInput(sample);
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTsv = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/tab-separated-values;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.tsv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("TSV file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to TSV Converter – Tab-Separated Values</h1>
          <p className="text-muted-foreground">
            Convert JSON arrays into tab-separated values (TSV) for easy spreadsheet and database import. Free online JSON to TSV Converter with instant preview and download support.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Sample JSON
                </Button>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToTsv}>
                  <Table className="h-4 w-4 mr-2" />
                  Convert to TSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON array here..."
                className="min-h-[500px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="output" className="text-sm font-medium text-muted-foreground">
                  TSV Output
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
                    <Button variant="ghost" size="sm" onClick={downloadTsv}>
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
                placeholder="TSV output will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON to TSV Converter</h2>
        <p className="text-muted-foreground mb-6">
          Tab-separated values format is perfect for importing JSON data into spreadsheets, databases, or legacy systems. This tool converts your JSON arrays into TSV format with proper escaping for special characters.
        </p>

        <h3 className="text-xl font-semibold mb-3">How it works</h3>
        <p className="text-muted-foreground mb-2">
          The tool extracts all unique keys from your JSON array to create the header row. Each object becomes a data row with values separated by tabs, handling nested objects by flattening them.
        </p>
        <p className="text-muted-foreground mb-8">
          Special characters like tabs and newlines within values are properly escaped to maintain TSV integrity. Values containing tabs are quoted to prevent column misalignment.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You have JSON data from an API that needs to go into Excel or Google Sheets. TSV format opens directly in spreadsheet applications while preserving the data structure.
        </p>
        <p className="text-muted-foreground mb-8">
          TSV works best with flat or moderately nested data. Deeply nested structures produce long flattened key names that may be harder to work with in spreadsheet applications.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">What's the difference between TSV and CSV?</p>
            <p className="text-muted-foreground">TSV uses tabs as delimiters while CSV uses commas. TSV is safer when your data might contain commas, but CSV is more universally supported.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How are nested objects handled?</p>
            <p className="text-muted-foreground">Nested objects are flattened using dot notation. A field like address.city becomes a single column header in the TSV output.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I open TSV in Excel?</p>
            <p className="text-muted-foreground">Yes, Excel opens TSV files directly. You can also import TSV data using the Text Import Wizard for more control over column formatting.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What about arrays in the data?</p>
            <p className="text-muted-foreground">Arrays are converted to JSON strings within their cell. For better array handling, consider preprocessing your data to expand arrays into separate rows.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I download the TSV file?</p>
            <p className="text-muted-foreground">Yes. Click Download to save the TSV as a file, or use Copy to paste it directly into your spreadsheet or database import tool.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-to-csv" className="text-primary hover:underline">JSON to CSV</a> – Comma-separated values format
          </li>
          <li>
            <a href="/json-tools/json-to-excel" className="text-primary hover:underline">JSON to Excel</a> – Direct XLSX export
          </li>
          <li>
            <a href="/json-tools/json-to-text" className="text-primary hover:underline">JSON to Text</a> – Plain text key-value format
          </li>
        </ul>
      </div>
    </div>
  );
}
