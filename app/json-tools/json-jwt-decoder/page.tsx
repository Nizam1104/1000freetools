"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface JwtData {
  header: any;
  payload: any;
  signature: string;
  valid: boolean;
  error?: string;
}

export default function JsonJwtDecoderPage() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState<JwtData | null>(null);

  const base64UrlDecode = (str: string): string => {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    if (typeof window !== "undefined") {
      return decodeURIComponent(escape(atob(base64)));
    }
    return Buffer.from(base64, "base64").toString("utf-8");
  };

  const decodeJwt = useCallback(() => {
    setDecoded(null);

    const token = input.trim();

    if (!token) {
      toast.error("Please enter a JWT token");
      return;
    }

    const parts = token.split(".");

    if (parts.length !== 3) {
      setDecoded({
        header: null,
        payload: null,
        signature: "",
        valid: false,
        error: "Invalid JWT format. Expected 3 parts separated by dots."
      });
      toast.error("Invalid JWT format");
      return;
    }

    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      const signature = parts[2];

      setDecoded({
        header,
        payload,
        signature,
        valid: true
      });
      toast.success("JWT decoded successfully");
    } catch (e) {
      setDecoded({
        header: null,
        payload: null,
        signature: parts[1],
        valid: false,
        error: `Failed to decode: ${(e as Error).message}`
      });
      toast.error("Failed to decode JWT");
    }
  }, [input]);

  const clearAll = () => {
    setInput("");
    setDecoded(null);
  };

  const loadSample = () => {
    // Sample JWT (not real, just for demo)
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({
      sub: "1234567890",
      name: "John Doe",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    }));
    const signature = btoa("signature");
    setInput(`${header}.${payload}.${signature}`);
  };

  const copyResult = () => {
    if (decoded) {
      navigator.clipboard.writeText(JSON.stringify({ header: decoded.header, payload: decoded.payload }, null, 2));
      toast.success("Decoded JWT copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (decoded) {
      const blob = new Blob([JSON.stringify({ header: decoded.header, payload: decoded.payload }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "jwt-decoded.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Decoded JWT downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JWT Decoder – Decode JWT Tokens Online</h1>
          <p className="text-muted-foreground">
            Decode JWT headers and payloads into readable JSON without signature verification. Our free JWT Decoder is the fastest way to inspect token claims during development and debugging.
          </p>
        </div>

        {/* Warning */}
        <Card className="mb-6 border-yellow-500/50 bg-yellow-500/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                  Security Notice
                </h3>
                <p className="text-sm text-muted-foreground">
                  This tool decodes JWT tokens without verifying their signature.
                  Do not use this to validate authentication tokens. For educational and debugging purposes only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                {decoded && (
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
                <Button onClick={decodeJwt}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Decode
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
              JWT Token
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
              className="min-h-[100px] font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Result */}
        {decoded && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                  Header
                </Label>
                {decoded.header ? (
                  <Textarea
                    value={JSON.stringify(decoded.header, null, 2)}
                    readOnly
                    className="min-h-[150px] font-mono text-sm resize-none"
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">{decoded.error}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                  Payload
                </Label>
                {decoded.payload ? (
                  <Textarea
                    value={JSON.stringify(decoded.payload, null, 2)}
                    readOnly
                    className="min-h-[150px] font-mono text-sm resize-none"
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">{decoded.error}</p>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Signature
                </Label>
                <Textarea
                  value={decoded.signature}
                  readOnly
                  className="min-h-[60px] font-mono text-sm resize-none"
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
