"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import {
  FileJson,
  RotateCcw,
  Trash2,
  ArrowDownToLine,
  Copy,
  Check,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function JsonToExcelConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [sheetName, setSheetName] = useState("Sheet1");

  const flattenObject = (
    obj: Record<string, unknown>,
    prefix = "",
  ): Record<string, unknown> => {
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
        result[newKey] = value
          .map((v) => (typeof v === "object" ? JSON.stringify(v) : String(v)))
          .join(", ");
      } else {
        result[newKey] = value;
      }
    }

    return result;
  };

  const convertJsonToExcel = useCallback(() => {
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

      const flattenedData = dataArray.map((item) =>
        flattenObject(item as Record<string, unknown>),
      );
      const allKeys = Array.from(
        new Set(flattenedData.flatMap((obj) => Object.keys(obj))),
      );

      const worksheetData = [allKeys];
      for (const row of flattenedData) {
        worksheetData.push(allKeys.map((key) => String(row[key] ?? "")));
      }

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(worksheetData);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);

      const excelBuffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "data.xlsx";
      link.click();
      URL.revokeObjectURL(url);

      setOutput(
        `Excel file generated with ${dataArray.length} rows and ${allKeys.length} columns`,
      );
      toast.success("Excel file generated successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, sheetName]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = JSON.stringify(
      [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          department: "Engineering",
          salary: 75000,
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          department: "Marketing",
          salary: 65000,
        },
        {
          id: 3,
          name: "Bob Wilson",
          email: "bob@example.com",
          department: "Sales",
          salary: 70000,
        },
        {
          id: 4,
          name: "Alice Brown",
          email: "alice@example.com",
          department: "Engineering",
          salary: 80000,
        },
      ],
      null,
      2,
    );
    setInput(sample);
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON to Excel Converter – Export JSON to XLSX
          </h1>
          <p className="text-muted-foreground">
            Export JSON data directly to Excel XLSX format using client-side
            generation. Our free JSON to Excel Converter requires no uploads —
            your data stays private in your browser.
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

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="sheetName"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
                  Sheet Name:
                </Label>
                <input
                  id="sheetName"
                  type="text"
                  value={sheetName}
                  onChange={(e) => setSheetName(e.target.value)}
                  className="h-9 w-[150px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="Sheet1"
                />
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToExcel}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Download Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input JSON
              </Label>
              <JsonEditor
                value={input}
                onChange={setInput}
                placeholder="Paste your JSON array here..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label
                  htmlFor="output"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Output Status
                </Label>
                {output && (
                  <Button variant="ghost" size="sm" onClick={copyOutput}>
                    {copied ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </div>
              <JsonEditor
                value={output}
                readOnly
                placeholder="Excel generation status will appear here..."
              />
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON to Excel Converter
          </h2>
          <p className="text-muted-foreground mb-6">
            Sharing JSON data with non-technical stakeholders often means
            converting it to a familiar spreadsheet format. Manually copying
            values into Excel is tedious for large datasets. This JSON to Excel
            converter creates XLSX files directly in your browser with proper
            column headers and row data.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste a JSON array into the Input area. Each object in the array
            becomes a row in the spreadsheet. Set the Sheet Name if you want
            something other than the default. Click Download Excel and the file
            is generated instantly using the XLSX library.
          </p>
          <p className="text-muted-foreground mb-8">
            Nested objects are flattened with dot notation for column names.
            Arrays within objects are converted to comma-separated strings. The
            Output Status panel confirms how many rows and columns were created
            in your spreadsheet.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Data analysts receiving JSON exports from APIs need to analyze the
            data in Excel. Product managers want to review feature flags or
            configuration data in a familiar spreadsheet view. This tool bridges
            the gap between developer formats and business users.
          </p>
          <p className="text-muted-foreground mb-8">
            Very wide JSON objects with many unique keys create spreadsheets
            with many columns. Deeply nested structures may produce long column
            names. For complex data, consider flattening your JSON structure
            before conversion.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">Does it handle nested objects?</p>
              <p className="text-muted-foreground">
                Yes. Nested properties are flattened using dot notation like
                address.city for column headers.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What about arrays inside objects?
              </p>
              <p className="text-muted-foreground">
                Array values are joined into comma-separated strings within a
                single cell.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I convert a single JSON object?
              </p>
              <p className="text-muted-foreground">
                Yes. Single objects are wrapped in an array and converted as a
                one-row spreadsheet.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Is the Excel file generated online?
              </p>
              <p className="text-muted-foreground">
                No. The XLSX file is created entirely in your browser using the
                xlsx library. No data is uploaded.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What Excel version is supported?
              </p>
              <p className="text-muted-foreground">
                The XLSX format works with Excel 2007 and later, plus compatible
                tools like Google Sheets and LibreOffice.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
