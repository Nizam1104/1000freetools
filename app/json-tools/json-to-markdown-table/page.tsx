"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/ui/json-editor";
import { Label } from "@/components/ui/label";
import {
  FileJson,
  RotateCcw,
  Trash2,
  ArrowDownToLine,
  Copy,
  Check,
  Table,
} from "lucide-react";
import { toast } from "sonner";

export default function JsonToMarkdownTablePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">(
    "left",
  );

  const escapeMarkdown = (value: unknown): string => {
    if (value === null || value === undefined) {
      return "";
    }
    const str = String(value);
    return str.replace(/\|/g, "\\|").replace(/\n/g, " ");
  };

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

  const getAlignmentMarker = (align: string) => {
    switch (align) {
      case "center":
        return ":---:";
      case "right":
        return "---:";
      default:
        return "---";
    }
  };

  const convertJsonToMarkdown = useCallback(() => {
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

      const alignmentMarker = getAlignmentMarker(alignment);

      const header = `| ${allKeys.join(" | ")} |`;
      const separator = `| ${allKeys.map(() => alignmentMarker).join(" | ")} |`;
      const rows = flattenedData.map(
        (obj) =>
          `| ${allKeys.map((key) => escapeMarkdown(obj[key])).join(" | ")} |`,
      );

      const markdown = [header, separator, ...rows].join("\n");
      setOutput(markdown);
      toast.success("Converted to Markdown table successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, alignment]);

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
          role: "Developer",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "Designer",
        },
        {
          id: 3,
          name: "Bob Wilson",
          email: "bob@example.com",
          role: "Manager",
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

  const downloadMarkdown = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "table.md";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Markdown file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON to Markdown Table Converter Online
          </h1>
          <p className="text-muted-foreground">
            Convert JSON arrays into formatted Markdown tables with headers and
            column alignment. Perfect for documentation, README files, and
            GitHub wikis — free and instant.
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
                  htmlFor="alignment"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
                  Alignment:
                </Label>
                <select
                  id="alignment"
                  value={alignment}
                  onChange={(e) =>
                    setAlignment(e.target.value as "left" | "center" | "right")
                  }
                  className="h-9 w-[120px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToMarkdown}>
                  <Table className="h-4 w-4 mr-2" />
                  Convert to Markdown
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
                  Markdown Table Output
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={downloadMarkdown}
                    >
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <JsonEditor
                value={output}
                readOnly
                placeholder="Markdown table will appear here..."
              />
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON to Markdown Table Converter
          </h2>
          <p className="text-muted-foreground mb-6">
            Documentation often requires presenting data in readable table
            format. Converting JSON arrays to Markdown tables by hand means
            careful alignment of pipes and dashes. This JSON to Markdown
            converter creates properly formatted tables with headers and column
            alignment for README files and wikis.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste a JSON array into the Input area. Each object becomes a table
            row with keys as column headers. Choose column alignment from Left,
            Center, or Right using the Alignment dropdown. Click Convert to
            Markdown and get a ready-to-use table.
          </p>
          <p className="text-muted-foreground mb-8">
            Nested objects and arrays are flattened for display. Special
            characters like pipes are escaped to prevent Markdown formatting
            issues. Use Copy or Download to save the table for your
            documentation.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Developers writing API documentation need to show example responses
            in a readable format. Technical writers creating user guides benefit
            from clean tables showing configuration options or feature
            comparisons.
          </p>
          <p className="text-muted-foreground mb-8">
            Very wide JSON objects create tables with many columns that may not
            render well on all screens. For large datasets, consider selecting
            only relevant fields before conversion or splitting into multiple
            tables.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                How are nested objects displayed?
              </p>
              <p className="text-muted-foreground">
                Nested properties are flattened with dot notation like user.name
                for column headers.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What about arrays in values?</p>
              <p className="text-muted-foreground">
                Array values are joined into comma-separated strings within the
                table cell.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I change column alignment?</p>
              <p className="text-muted-foreground">
                Yes. Use the Alignment dropdown to set all columns to Left,
                Center, or Right alignment.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Does it escape special characters?
              </p>
              <p className="text-muted-foreground">
                Yes. Pipe characters and newlines in values are escaped to
                prevent breaking the table format.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Can I convert a single object?</p>
              <p className="text-muted-foreground">
                Yes. Single objects are wrapped in an array and converted as a
                one-row table.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-to-csv"
                className="text-primary hover:underline"
              >
                JSON to CSV
              </a>{" "}
              – Convert JSON to spreadsheet format
            </li>
            <li>
              <a
                href="/json-tools/json-to-excel"
                className="text-primary hover:underline"
              >
                JSON to Excel
              </a>{" "}
              – Generate XLSX files from JSON arrays
            </li>
            <li>
              <a
                href="/json-tools/markdown-to-json"
                className="text-primary hover:underline"
              >
                Markdown to JSON
              </a>{" "}
              – Parse tables back to JSON format
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
