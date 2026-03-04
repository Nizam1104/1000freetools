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

        {/* Why Standardize Errors */}
        <div className="mb-6 bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-xl p-6 border border-destructive/20">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-destructive">!</span> Why Standardize API Errors?
          </h2>
          <p className="text-muted-foreground mb-4">
            Your API returns errors in different formats depending on where they occur. Some have message fields, others use error, and the structure changes between endpoints. This inconsistency makes client-side error handling a nightmare.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-background/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Without Standardization:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Inconsistent client error handling</li>
                <li>• Hard to debug issues</li>
                <li>• Poor developer experience</li>
                <li>• Documentation becomes complex</li>
              </ul>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">With Standardization:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Unified error handling code</li>
                <li>• Easier debugging and logging</li>
                <li>• Better API documentation</li>
                <li>• Improved developer experience</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <div className="text-primary mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-medium mb-1">Standard Structure</h3>
            <p className="text-sm text-muted-foreground">Consistent error, code, message, and details fields</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-primary mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            </div>
            <h3 className="font-medium mb-1">Field-Level Errors</h3>
            <p className="text-sm text-muted-foreground">Validation errors for specific fields</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-primary mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 16h12" /></svg>
            </div>
            <h3 className="font-medium mb-1">Multiple Formats</h3>
            <p className="text-sm text-muted-foreground">RFC 7807, JSON:API, or custom formats</p>
          </div>
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

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON API Error Formatter</h2>
        <p className="text-muted-foreground mb-6">
          Consistent error responses make API integration smoother. Instead of ad-hoc error formats that vary by endpoint, this tool generates standardized JSON error objects with proper structure, error codes, timestamps, and optional field-level validation details.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the formatter works</h3>
        <p className="text-muted-foreground mb-2">
          Select an error type from the dropdown like Validation Error, Not Found, or Unauthorized. Enter your error message and optionally an error code. For validation errors, specify the field name. Click Generate to create a properly structured error response.
        </p>
        <p className="text-muted-foreground mb-8">
          The output includes standard fields: error type, error code, message, timestamp, and request path. Validation errors include a details array with field-specific messages. Use Copy or Download to integrate the response into your API.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You're designing a new REST API and need a consistent error format. Or your team has inconsistent error handling across services and you want to standardize. This tool also helps when writing API documentation with example error responses.
        </p>
        <p className="text-muted-foreground mb-8">
          This generates example error structures, not actual error handling logic. You'll need to implement the logic in your backend framework. The output follows common conventions but may need adjustment for your specific API standards.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">What error types are available?</p>
            <p className="text-muted-foreground">Validation Error, Not Found, Unauthorized, Forbidden, Server Error, and Rate Limit. Each has appropriate fields for that error category.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I customize the error structure?</p>
            <p className="text-muted-foreground">The basic structure is fixed but you can modify the generated JSON. For custom formats, use this as a starting point and adjust as needed.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Does this follow any standard?</p>
            <p className="text-muted-foreground">It follows common REST API conventions similar to RFC 7807 Problem Details. You can adapt it to JSON:API or other specifications.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How are validation errors structured?</p>
            <p className="text-muted-foreground">Validation errors include a details array with objects containing field, message, and code for each validation failure.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Should I include stack traces in errors?</p>
            <p className="text-muted-foreground">Never include stack traces in production API errors. They leak implementation details. Use a debug mode or separate logging for development.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-api-formatter" className="text-primary hover:underline">JSON API Formatter</a> – Format and beautify API response JSON
          </li>
          <li>
            <a href="/json-tools/json-api-response-generator" className="text-primary hover:underline">JSON API Response Generator</a> – Generate complete API response examples
          </li>
          <li>
            <a href="/json-tools/json-validator" className="text-primary hover:underline">JSON Validator</a> – Validate your JSON error responses
          </li>
        </ul>
      </div>
    </div>
  );
}
