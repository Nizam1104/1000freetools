"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Bug } from "lucide-react";

export default function JWTDebuggerTester() {
  const [token, setToken] = useState("");
  const [debugInfo, setDebugInfo] = useState<{
    valid: boolean;
    parts: string[];
    header?: Record<string, unknown>;
    payload?: Record<string, unknown>;
    signature?: string;
    errors: string[];
    warnings: string[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const debugToken = useCallback(() => {
    const result = {
      valid: false,
      parts: [] as string[],
      header: undefined as Record<string, unknown> | undefined,
      payload: undefined as Record<string, unknown> | undefined,
      signature: "",
      errors: [] as string[],
      warnings: [] as string[],
    };

    if (!token.trim()) {
      result.errors.push("Token is empty");
      setDebugInfo(result);
      return;
    }

    result.parts = token.split(".");

    if (result.parts.length !== 3) {
      result.errors.push(`Invalid token format: expected 3 parts, got ${result.parts.length}`);
      setDebugInfo(result);
      return;
    }

    // Check for common issues
    if (token.includes(" ")) {
      result.warnings.push("Token contains whitespace characters");
    }

    if (token.length < 50) {
      result.warnings.push("Token seems unusually short");
    }

    // Decode header
    try {
      const headerBase64 = result.parts[0].replace(/-/g, "+").replace(/_/g, "/");
      result.header = JSON.parse(atob(headerBase64));
      
      // Validate header
      if (!result.header.alg) {
        result.errors.push("Missing 'alg' (algorithm) in header");
      }
      if (!result.header.typ) {
        result.warnings.push("Missing 'typ' (type) in header");
      }
    } catch {
      result.errors.push("Failed to decode header (invalid Base64URL or JSON)");
    }

    // Decode payload
    try {
      const payloadBase64 = result.parts[1].replace(/-/g, "+").replace(/_/g, "/");
      result.payload = JSON.parse(atob(payloadBase64));
      
      // Check for standard claims
      if (result.payload.exp) {
        const expTime = new Date((result.payload.exp as number) * 1000);
        if (expTime < new Date()) {
          result.warnings.push("Token has expired");
        } else {
          result.warnings.push(`Token expires: ${expTime.toLocaleString()}`);
        }
      } else {
        result.warnings.push("No expiration claim (exp) - token never expires");
      }

      if (!result.payload.iat) {
        result.warnings.push("No 'iat' (issued at) claim");
      }
      if (!result.payload.sub) {
        result.warnings.push("No 'sub' (subject) claim");
      }
    } catch {
      result.errors.push("Failed to decode payload (invalid Base64URL or JSON)");
    }

    // Check signature
    result.signature = result.parts[2];
    if (!result.signature) {
      result.warnings.push("Empty signature (algorithm might be 'none')");
    }

    result.valid = result.errors.length === 0;
    setDebugInfo(result);
  }, [token]);

  const copyToClipboard = useCallback(async () => {
    if (!debugInfo) return;
    try {
      const text = `JWT Debug Report:
Valid: ${debugInfo.valid}
Errors: ${debugInfo.errors.join(", ") || "None"}
Warnings: ${debugInfo.warnings.join(", ") || "None"}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [debugInfo]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="w-5 h-5" />
            JWT Token Debugger
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="token">JWT Token</Label>
            <Textarea
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your JWT token for debugging..."
              className="mt-1 h-24 font-mono text-xs"
            />
          </div>
          <Button onClick={debugToken} disabled={!token} className="w-full">
            Debug Token
          </Button>
        </CardContent>
      </Card>

      {debugInfo && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Validation Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg text-center ${
                debugInfo.valid ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"
              }`}>
                <p className={`text-2xl font-bold ${
                  debugInfo.valid ? "text-green-600" : "text-red-600"
                }`}>
                  {debugInfo.valid ? "✓ Valid Token Structure" : "✗ Invalid Token"}
                </p>
                <p className="text-sm mt-2">
                  {debugInfo.errors.length} errors, {debugInfo.warnings.length} warnings
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Errors</CardTitle>
              </CardHeader>
              <CardContent>
                {debugInfo.errors.length > 0 ? (
                  <ul className="space-y-2">
                    {debugInfo.errors.map((error, i) => (
                      <li key={i} className="p-2 bg-red-50 dark:bg-red-950 rounded text-sm text-red-600">
                        ✗ {error}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-green-600">No errors found</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Warnings</CardTitle>
              </CardHeader>
              <CardContent>
                {debugInfo.warnings.length > 0 ? (
                  <ul className="space-y-2">
                    {debugInfo.warnings.map((warning, i) => (
                      <li key={i} className="p-2 bg-amber-50 dark:bg-amber-950 rounded text-sm text-amber-600">
                        ⚠ {warning}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-green-600">No warnings</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {debugInfo.header && (
              <Card>
                <CardHeader>
                  <CardTitle>Header</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="p-3 bg-muted rounded-lg text-xs overflow-auto">
                    {JSON.stringify(debugInfo.header, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}

            {debugInfo.payload && (
              <Card>
                <CardHeader>
                  <CardTitle>Payload</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="p-3 bg-muted rounded-lg text-xs overflow-auto">
                    {JSON.stringify(debugInfo.payload, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>

          <Button variant="outline" onClick={copyToClipboard} className="w-full">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            Copy Debug Report
          </Button>
        </div>
      )}
    </div>
  );
}
