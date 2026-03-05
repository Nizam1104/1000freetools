"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

export default function JsonKeyFrequencyPage() {
  const [input, setInput] = useState("");
  const [keyFrequency, setKeyFrequency] = useState<Record<
    string,
    number
  > | null>(null);

  const analyzeKeys = useCallback(
    (
      obj: any,
      frequencies: Record<string, number> = {},
    ): Record<string, number> => {
      if (obj !== null && typeof obj === "object") {
        if (Array.isArray(obj)) {
          obj.forEach((item) => analyzeKeys(item, frequencies));
        } else {
          Object.entries(obj).forEach(([key, value]) => {
            frequencies[key] = (frequencies[key] || 0) + 1;
            analyzeKeys(value, frequencies);
          });
        }
      }
      return frequencies;
    },
    [],
  );

  const analyzeJson = useCallback(() => {
    setKeyFrequency(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const frequencies = analyzeKeys(obj);
    setKeyFrequency(frequencies);
    toast.success(`Analyzed ${Object.keys(frequencies).length} unique keys`);
  }, [input, analyzeKeys]);

  const clearAll = () => {
    setInput("");
    setKeyFrequency(null);
  };

  const loadSample = () => {
    setInput(
      JSON.stringify(
        {
          users: [
            { id: 1, name: "John", email: "john@example.com" },
            { id: 2, name: "Jane", email: "jane@example.com" },
          ],
          meta: { total: 2, page: 1 },
        },
        null,
        2,
      ),
    );
  };

  const copyResult = () => {
    if (keyFrequency) {
      navigator.clipboard.writeText(JSON.stringify(keyFrequency, null, 2));
      toast.success("Key frequency copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (keyFrequency) {
      const blob = new Blob([JSON.stringify(keyFrequency, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "key-frequency.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Key frequency downloaded");
    }
  };

  const sortedFrequency = useMemo(() => {
    if (!keyFrequency) return null;
    return Object.entries(keyFrequency)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  }, [keyFrequency]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Key Frequency Analyzer Online
          </h1>
          <p className="text-muted-foreground">
            Analyze how often each key appears across your JSON dataset. Our
            free JSON Key Frequency Analyzer is perfect for auditing API
            responses, datasets, and log files at scale.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Sample
                </Button>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {keyFrequency && (
                  <>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadResult}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
                <Button onClick={analyzeJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="mb-6">
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
              placeholder='{"users": [{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}]}'
              className="min-h-[300px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
            />
          </CardContent>
        </Card>

        {/* Result */}
        {sortedFrequency && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Key Frequency ({Object.keys(sortedFrequency).length} unique
                keys)
              </Label>
              <div className="space-y-2">
                {Object.entries(sortedFrequency).map(([key, count]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 bg-muted rounded-md"
                  >
                    <span className="font-mono text-sm">{key}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${((count as number) / Math.max(...Object.values(sortedFrequency as number))) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-8 text-right">
                        {count as number}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Key Frequency Analyzer
          </h2>
          <p className="text-muted-foreground mb-6">
            When working with large JSON datasets, knowing which keys appear
            most often helps identify the core structure. This tool counts how
            many times each key appears across your entire JSON, showing
            frequency with visual bars.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON and click Analyze. The tool recursively scans every
            object, counting each key occurrence. Results are sorted by
            frequency with the most common keys at the top.
          </p>
          <p className="text-muted-foreground mb-8">
            Each key shows a horizontal bar representing its frequency relative
            to the most common key. The count appears on the right. Copy or
            download the frequency data as JSON.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You're analyzing API response logs to understand which fields are
            consistently present. Frequency analysis reveals optional vs
            required fields and data completeness patterns.
          </p>
          <p className="text-muted-foreground mb-8">
            This counts key occurrences but doesn't analyze values. Two records
            with the same key but different value types are counted the same.
            For type analysis, use a schema tool.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">How is frequency calculated?</p>
              <p className="text-muted-foreground">
                Every occurrence of a key is counted, even in nested objects. If
                "id" appears in 100 user objects, its frequency is 100.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What do the bars represent?</p>
              <p className="text-muted-foreground">
                Bars show relative frequency. The longest bar is the most common
                key. Other bars are scaled proportionally.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Are results sorted?</p>
              <p className="text-muted-foreground">
                Yes, keys are sorted by frequency descending. The most common
                keys appear at the top for quick identification.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I export the frequency data?
              </p>
              <p className="text-muted-foreground">
                Yes, use Copy to copy as JSON or Download to save as a file. The
                data is ready for further analysis or reporting.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Does it handle large datasets?</p>
              <p className="text-muted-foreground">
                Yes, but very large JSON files may slow down your browser.
                Consider sampling for datasets over a few megabytes.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-key-extractor"
                className="text-primary hover:underline"
              >
                JSON Key Extractor
              </a>{" "}
              – List unique keys
            </li>
            <li>
              <a
                href="/json-tools/json-array-object-counter"
                className="text-primary hover:underline"
              >
                JSON Array & Object Counter
              </a>{" "}
              – Count elements
            </li>
            <li>
              <a
                href="/json-tools/json-schema-generator"
                className="text-primary hover:underline"
              >
                JSON Schema Generator
              </a>{" "}
              – Infer schemas
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
