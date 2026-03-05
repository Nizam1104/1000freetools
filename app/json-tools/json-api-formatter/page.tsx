"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { JsonEditor } from "@/components/ui/json-editor";

export default function JsonApiFormatterPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const formatApiResponse = useCallback(() => {
    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const formatted: any = {
      success:
        obj.success !== undefined ? obj.success : obj.status === "success",
      data: obj.data || obj.result || obj.response || null,
      error: obj.error || obj.message || obj.errors || null,
      meta: {
        timestamp: obj.meta?.timestamp || new Date().toISOString(),
        version: obj.meta?.version || obj.version || "1.0.0",
        requestId:
          obj.meta?.requestId ||
          obj.requestId ||
          Math.random().toString(36).substring(7),
      },
    };

    if (obj.pagination) {
      formatted.pagination = obj.pagination;
    }

    setResult(JSON.stringify(formatted, null, 2));
    toast.success("API response formatted");
  }, [input]);

  const clearAll = () => {
    setInput("");
    setResult(null);
  };

  const loadSample = () => {
    setInput(
      JSON.stringify(
        {
          status: "success",
          result: { id: 1, name: "Test" },
          version: "2.0.0",
        },
        null,
        2,
      ),
    );
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Formatted JSON copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "formatted-api.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Formatted JSON downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON API Formatter – Standardize API Responses
          </h1>
          <p className="text-muted-foreground">
            Format JSON API responses into a consistent, readable structure
            following best practices. Our free JSON API Formatter helps teams
            maintain uniform response formats across all endpoints.
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
                {result && (
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
                <Button onClick={formatApiResponse}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Format
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input and Result */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Input */}
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
                placeholder='{"status": "success", "result": {...}}'
              />
            </CardContent>
          </Card>

          {/* Result */}
          {result && (
            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                  Formatted API Response
                </Label>
                <JsonEditor
                  value={result}
                  readOnly
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON API Formatter
          </h2>
          <p className="text-muted-foreground mb-6">
            Inconsistent API responses make frontend code messy with scattered
            null checks and property mapping. This tool transforms any JSON
            response into a standardized structure with success, data, error,
            and meta fields that your frontend can rely on.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your raw API response JSON and click Format. The tool
            identifies common response patterns like status, result, data, and
            message fields, then reorganizes them into a consistent structure.
          </p>
          <p className="text-muted-foreground mb-8">
            The output includes a success boolean, data field for the main
            payload, error field for any issues, and a meta object with
            timestamp, version, and requestId. Pagination data is preserved if
            present.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You're building a new API and want to establish a consistent
            response format from the start. Test different response structures
            here to see how they'd look in your standardized format.
          </p>
          <p className="text-muted-foreground mb-8">
            This is a formatting tool, not a validation tool. It reorganizes
            your JSON but doesn't enforce strict schemas. For production APIs,
            consider using a response serialization library instead.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                What fields does the formatted output include?
              </p>
              <p className="text-muted-foreground">
                The output has success, data, error, and meta fields. Meta
                includes timestamp, version, and requestId for tracking.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">How is success determined?</p>
              <p className="text-muted-foreground">
                If your JSON has a success field, that value is used. Otherwise
                it checks if status equals "success". The result defaults to
                true if neither exists.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What happens to pagination data?
              </p>
              <p className="text-muted-foreground">
                If your response includes a pagination field, it's preserved in
                the formatted output alongside the standard fields.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I customize the output format?
              </p>
              <p className="text-muted-foreground">
                This tool uses a fixed standard format. For custom formats,
                you'd need to write your own transformation logic or use a
                different tool.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Is this suitable for production use?
              </p>
              <p className="text-muted-foreground">
                This is a development and testing tool. For production,
                implement response formatting in your API code using middleware
                or serializers.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-pretty-print"
                className="text-primary hover:underline"
              >
                JSON Pretty Print
              </a>{" "}
              – Format JSON with indentation
            </li>
            <li>
              <a
                href="/json-tools/json-minifier"
                className="text-primary hover:underline"
              >
                JSON Minifier
              </a>{" "}
              – Compress JSON for production
            </li>
            <li>
              <a
                href="/json-tools/json-validator"
                className="text-primary hover:underline"
              >
                JSON Validator
              </a>{" "}
              – Validate JSON syntax
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
