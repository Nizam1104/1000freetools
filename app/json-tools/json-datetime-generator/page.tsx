"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { NativeSelect as Select } from "@/components/ui/native-select";

export default function JsonDatetimeGeneratorPage() {
  const [format, setFormat] = useState<"iso" | "utc" | "timestamp" | "custom">("iso");
  const [customFormat, setCustomFormat] = useState("YYYY-MM-DD HH:mm:ss");
  const [count, setCount] = useState(1);
  const [result, setResult] = useState<string | null>(null);

  const formatDate = (date: Date, fmt: string): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ms = String(date.getMilliseconds()).padStart(3, "0");

    return fmt
      .replace("YYYY", String(year))
      .replace("YY", String(year).slice(-2))
      .replace("MM", month)
      .replace("DD", day)
      .replace("HH", hours)
      .replace("mm", minutes)
      .replace("ss", seconds)
      .replace("SSS", ms);
  };

  const generateDatetime = useCallback(() => {
    const dates = Array.from({ length: count }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);

      switch (format) {
        case "iso":
          return date.toISOString();
        case "utc":
          return date.toUTCString();
        case "timestamp":
          return date.getTime();
        case "custom":
          return formatDate(date, customFormat);
        default:
          return date.toISOString();
      }
    });

    const output = count === 1 ? dates[0] : dates;
    setResult(JSON.stringify({ datetime: output }, null, 2));
    toast.success(`Generated ${count} datetime value(s)`);
  }, [format, customFormat, count]);

  const clearAll = () => {
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Datetime copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "datetime.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Datetime downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Date Time Generator – Generate Timestamps</h1>
          <p className="text-muted-foreground">
            Generate ISO 8601, UTC, and custom formatted date-time values in JSON. Our free JSON Date Time Generator is perfect for mocking timestamps in test data and API responses.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="format" className="text-sm whitespace-nowrap">Format:</Label>
                  <Select
                    id="format"
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                    className="h-9"
                  >
                    <option value="iso">ISO 8601</option>
                    <option value="utc">UTC String</option>
                    <option value="timestamp">Unix Timestamp</option>
                    <option value="custom">Custom</option>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="count" className="text-sm whitespace-nowrap">Count:</Label>
                  <input
                    id="count"
                    type="number"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    min={1}
                    max={100}
                    className="w-20 h-9 px-3 text-sm border rounded-md bg-background"
                  />
                </div>
              </div>

              {format === "custom" && (
                <div className="flex items-center gap-2">
                  <Label htmlFor="customFormat" className="text-sm whitespace-nowrap">Custom Format:</Label>
                  <input
                    id="customFormat"
                    value={customFormat}
                    onChange={(e) => setCustomFormat(e.target.value)}
                    placeholder="YYYY-MM-DD HH:mm:ss"
                    className="w-48 h-9 px-3 text-sm border rounded-md bg-background font-mono"
                  />
                </div>
              )}

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {result && (
                  <>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadResult}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
                <Button onClick={generateDatetime}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Format Examples */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label className="text-sm font-medium text-muted-foreground mb-2 block">
              Format Examples
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">ISO 8601</p>
                <code className="text-xs">2024-01-15T10:30:00Z</code>
              </div>
              <div>
                <p className="text-muted-foreground">UTC</p>
                <code className="text-xs">Mon, 15 Jan 2024 10:30:00 GMT</code>
              </div>
              <div>
                <p className="text-muted-foreground">Timestamp</p>
                <code className="text-xs">1705315800000</code>
              </div>
              <div>
                <p className="text-muted-foreground">Custom</p>
                <code className="text-xs">YYYY-MM-DD HH:mm:ss</code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated Datetime
              </Label>
              <Textarea
                value={result}
                readOnly
                className="min-h-[100px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON Date Time Generator</h2>
          <p className="text-muted-foreground mb-6">
            Generating consistent date-time values for test data or API mocks can be tedious. This tool creates properly formatted timestamps in JSON format with support for ISO 8601, UTC strings, Unix timestamps, and custom patterns.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Select your preferred date format and specify how many values you need. The generator creates timestamps starting from the current moment, incrementing by one day for each additional item.
          </p>
          <p className="text-muted-foreground mb-8">
            Custom format support lets you define patterns like YYYY-MM-DD HH:mm:ss for specific requirements. The tool replaces pattern tokens with actual date components to match your expected output format.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You're building a frontend that expects API responses with timestamp fields. Generate realistic date values for mock data without writing date formatting code or relying on external libraries.
          </p>
          <p className="text-muted-foreground mb-8">
            This tool generates client-side timestamps based on your local time. For server-side date generation or timezone-specific requirements, you'll need backend logic with proper timezone handling.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">What is ISO 8601 format?</p>
              <p className="text-muted-foreground">ISO 8601 is an international standard for date-time representation, formatted as YYYY-MM-DDTHH:mm:ss.sssZ. It's widely used in APIs and databases for unambiguous timestamps.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I generate past dates?</p>
              <p className="text-muted-foreground">This tool generates future dates starting from today. For past dates, you'd need to modify the output manually or use a more advanced date generation tool.</p>
            </div>
            <div>
              <p className="font-medium mb-1">What custom format tokens are supported?</p>
              <p className="text-muted-foreground">Use YYYY for four-digit year, YY for two-digit year, MM for month, DD for day, HH for hours, mm for minutes, ss for seconds, and SSS for milliseconds.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Is the timezone included?</p>
              <p className="text-muted-foreground">ISO 8601 format includes the Z suffix indicating UTC. UTC String shows the full timezone name. Custom and timestamp formats don't include explicit timezone information.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I use this for database seeding?</p>
              <p className="text-muted-foreground">Yes, the generated JSON can be copied and used for database seeding scripts. Just ensure the date format matches your database's expected timestamp format.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="/json-tools/json-array-generator" className="text-primary hover:underline">JSON Array Generator</a> – Generate arrays with configurable items
            </li>
            <li>
              <a href="/json-tools/json-random-object" className="text-primary hover:underline">JSON Random Object</a> – Create random JSON test data
            </li>
            <li>
              <a href="/json-tools/json-api-response-generator" className="text-primary hover:underline">JSON API Response Generator</a> – Mock complete API responses
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
