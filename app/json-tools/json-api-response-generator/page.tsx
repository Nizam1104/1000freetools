"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { NativeSelect as Select } from "@/components/ui/native-select";

export default function JsonApiResponseGeneratorPage() {
  const [status, setStatus] = useState("success");
  const [message, setMessage] = useState("Operation completed successfully");
  const [dataItems, setDataItems] = useState(3);
  const [includePagination, setIncludePagination] = useState(true);
  const [includeMeta, setIncludeMeta] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  const generateResponse = useCallback(() => {
    const response: any = {
      status,
      message: status === "success" ? message : "An error occurred",
    };

    if (dataItems > 0) {
      response.data = Array.from({ length: dataItems }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        value: Math.floor(Math.random() * 1000)
      }));
    }

    if (includePagination) {
      response.pagination = {
        page: 1,
        limit: 10,
        total: dataItems,
        totalPages: Math.ceil(dataItems / 10)
      };
    }

    if (includeMeta) {
      response.meta = {
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        requestId: Math.random().toString(36).substring(7)
      };
    }

    setResult(JSON.stringify(response, null, 2));
    toast.success("API response generated");
  }, [status, message, dataItems, includePagination, includeMeta]);

  const clearAll = () => {
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("API response copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "api-response.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("API response downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON API Response Generator – Mock API Responses</h1>
          <p className="text-muted-foreground">
            Generate realistic mock API JSON responses with status codes, data payloads, and pagination. Our free tool speeds up frontend development and API testing without a live backend.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="status" className="text-sm whitespace-nowrap">Status:</Label>
                  <Select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-9"
                  >
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                    <option value="warning">Warning</option>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="dataItems" className="text-sm whitespace-nowrap">Data Items:</Label>
                  <Input
                    id="dataItems"
                    type="number"
                    value={dataItems}
                    onChange={(e) => setDataItems(parseInt(e.target.value) || 0)}
                    min={0}
                    max={100}
                    className="w-20 h-9"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pagination"
                    checked={includePagination}
                    onChange={(e) => setIncludePagination(e.target.checked)}
                    className="rounded border-input"
                  />
                  <Label htmlFor="pagination" className="text-sm cursor-pointer">Pagination</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="meta"
                    checked={includeMeta}
                    onChange={(e) => setIncludeMeta(e.target.checked)}
                    className="rounded border-input"
                  />
                  <Label htmlFor="meta" className="text-sm cursor-pointer">Meta</Label>
                </div>
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
                <Button onClick={generateResponse}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label htmlFor="message" className="text-sm font-medium text-muted-foreground mb-2 block">
              Response Message
            </Label>
            <Input
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Operation completed successfully"
              className="h-9"
            />
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated API Response
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
