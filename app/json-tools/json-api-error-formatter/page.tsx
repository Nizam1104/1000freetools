"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

export default function JsonApiErrorFormatterPage() {
  const [errorType, setErrorType] = useState("validation");
  const [message, setMessage] = useState("Invalid input data");
  const [field, setField] = useState("email");
  const [code, setCode] = useState("VALIDATION_ERROR");
  const [result, setResult] = useState<string | null>(null);

  const generateError = useCallback(() => {
    const error: any = {
      error: {
        type: errorType,
        code,
        message,
        timestamp: new Date().toISOString(),
        path: "/api/v1/resource"
      }
    };

    if (errorType === "validation") {
      error.error.details = [
        {
          field,
          message: `${field} is required`,
          code: "REQUIRED_FIELD"
        }
      ];
    }

    if (errorType === "not_found") {
      error.error.resourceId = "12345";
    }

    if (errorType === "unauthorized") {
      error.error.requiredScope = "read:resource";
    }

    setResult(JSON.stringify(error, null, 2));
    toast.success("Error response generated");
  }, [errorType, message, field, code]);

  const clearAll = () => {
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Error response copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "error-response.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Error response downloaded");
    }
  };

  const errorTypes = [
    { value: "validation", label: "Validation Error", code: "VALIDATION_ERROR" },
    { value: "not_found", label: "Not Found", code: "NOT_FOUND" },
    { value: "unauthorized", label: "Unauthorized", code: "UNAUTHORIZED" },
    { value: "forbidden", label: "Forbidden", code: "FORBIDDEN" },
    { value: "server", label: "Server Error", code: "INTERNAL_ERROR" },
    { value: "rate_limit", label: "Rate Limit", code: "RATE_LIMIT_EXCEEDED" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON API Error Formatter – Standard Error Responses</h1>
          <p className="text-muted-foreground">
            Generate standardized JSON error response objects for REST APIs. Our free JSON API Error Formatter ensures consistent error formats with proper codes, messages, and details.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="errorType" className="text-sm whitespace-nowrap">Error Type:</Label>
                  <select
                    id="errorType"
                    value={errorType}
                    onChange={(e) => {
                      setErrorType(e.target.value);
                      const selected = errorTypes.find(t => t.value === e.target.value);
                      if (selected) setCode(selected.code);
                    }}
                    className="h-9 px-3 text-sm border rounded-md bg-background"
                  >
                    {errorTypes.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="code" className="text-sm whitespace-nowrap">Error Code:</Label>
                  <input
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-48 h-9 px-3 text-sm border rounded-md bg-background font-mono"
                  />
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
                <Button onClick={generateError}>
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
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="message" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Error Message
                </Label>
                <input
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-9 px-3 text-sm border rounded-md bg-background"
                />
              </div>
              {errorType === "validation" && (
                <div>
                  <Label htmlFor="field" className="text-sm font-medium text-muted-foreground mb-2 block">
                    Field Name
                  </Label>
                  <input
                    id="field"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    className="w-full h-9 px-3 text-sm border rounded-md bg-background font-mono"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                Generated Error Response
              </Label>
              <Textarea
                value={result}
                readOnly
                className="min-h-[200px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
