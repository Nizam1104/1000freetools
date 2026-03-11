"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function UnicodeCsvTsvEscaper() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState<"csv" | "tsv">("csv");
  const [action, setAction] = useState<"escape" | "unescape">("escape");

  const escapeCsv = (text: string) => {
    // If text contains comma, quote, or newline, wrap in quotes and escape quotes
    if (text.includes(",") || text.includes('"') || text.includes("\n") || text.includes("\r")) {
      return '"' + text.replace(/"/g, '""') + '"';
    }
    return text;
  };

  const escapeTsv = (text: string) => {
    // If text contains tab or newline, wrap in quotes and escape
    if (text.includes("\t") || text.includes("\n") || text.includes("\r")) {
      return '"' + text.replace(/"/g, '""') + '"';
    }
    return text;
  };

  const unescapeCsv = (text: string) => {
    if (text.startsWith('"') && text.endsWith('"')) {
      return text.slice(1, -1).replace(/""/g, '"');
    }
    return text;
  };

  const unescapeTsv = (text: string) => {
    if (text.startsWith('"') && text.endsWith('"')) {
      return text.slice(1, -1).replace(/""/g, '"');
    }
    return text;
  };

  const processLines = () => {
    if (!input) return;

    const lines = input.split("\n");
    const processed = lines.map((line) => {
      if (format === "csv") {
        // Split by comma (simple approach)
        const cells = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (action === "escape") {
          return cells.map(escapeCsv).join(",");
        } else {
          return cells.map(unescapeCsv).join(",");
        }
      } else {
        // TSV
        const cells = line.split("\t");
        if (action === "escape") {
          return cells.map(escapeTsv).join("\t");
        } else {
          return cells.map(unescapeTsv).join("\t");
        }
      }
    });

    setOutput(processed.join("\n"));
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleDownload = () => {
    if (output) {
      const extension = format === "csv" ? "csv" : "tsv";
      const mimeType = format === "csv" ? "text/csv" : "text/tab-separated-values";
      const blob = new Blob([output], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `output.${extension}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Unicode CSV/TSV Escaper</h2>
        <p className="text-sm text-muted-foreground">
          Escape and unescape Unicode characters in CSV/TSV data
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={format === "csv" ? "default" : "outline"}
              size="sm"
              onClick={() => setFormat("csv")}
            >
              CSV
            </Button>
            <Button
              variant={format === "tsv" ? "default" : "outline"}
              size="sm"
              onClick={() => setFormat("tsv")}
            >
              TSV
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={action === "escape" ? "default" : "outline"}
              size="sm"
              onClick={() => setAction("escape")}
            >
              Escape
            </Button>
            <Button
              variant={action === "unescape" ? "default" : "outline"}
              size="sm"
              onClick={() => setAction("unescape")}
            >
              Unescape
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={action === "escape" ? "Name,Age,City\nJohn,30,New York" : '"Name","Age","City"\n"John","30","New York"'}
              className="w-full min-h-[150px] p-3 font-mono text-sm rounded-md border border-input"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={processLines} disabled={!input} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              {action === "escape" ? "Escape" : "Unescape"}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={processLines} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          {action === "escape" ? "Escape" : "Unescape"}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!input}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Output</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleCopy();
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <pre className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto whitespace-pre-wrap">
            {output}
          </pre>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-2">Escaping Rules</h3>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">CSV</div>
            <div className="text-muted-foreground">
              Fields containing commas, quotes, or newlines are wrapped in double quotes.
              Double quotes within fields are escaped by doubling them ("").
            </div>
          </div>
          <div className="p-2 bg-muted rounded">
            <div className="font-semibold">TSV</div>
            <div className="text-muted-foreground">
              Fields containing tabs or newlines are wrapped in double quotes.
              Double quotes within fields are escaped by doubling them ("").
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
