"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

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
      success: obj.success !== undefined ? obj.success : obj.status === "success",
      data: obj.data || obj.result || obj.response || null,
      error: obj.error || obj.message || obj.errors || null,
      meta: {
        timestamp: obj.meta?.timestamp || new Date().toISOString(),
        version: obj.meta?.version || obj.version || "1.0.0",
        requestId: obj.meta?.requestId || obj.requestId || Math.random().toString(36).substring(7)
      }
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
    setInput(JSON.stringify({
      status: "success",
      result: { id: 1, name: "Test" },
      version: "2.0.0"
    }, null, 2));
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON API Formatter – Standardize API Responses</h1>
          <p className="text-muted-foreground">
            Format JSON API responses into a consistent, readable structure following best practices. Our free JSON API Formatter helps teams maintain uniform response formats across all endpoints.
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
                    <Button variant="outline" size="sm" onClick={downloadResult}>
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

        {/* Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
              Input JSON
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"status": "success", "result": {...}}'
              className="min-h-[200px] font-mono text-sm resize-none"
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
              <Textarea
                value={result}
                readOnly
                className="min-h-[300px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
