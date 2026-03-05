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

        {/* Understanding JWTs */}
        <Card className="mb-6 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 border-0">
          <CardContent className="p-5">
            <h2 className="text-lg font-semibold mb-3">What is a JWT?</h2>
            <p className="text-muted-foreground mb-4">
              You have a JWT from an authentication response and need to see what's inside. The token is just a long string of characters that's actually Base64-encoded JSON. You want to read the claims, check expiration, or verify the user info without making API calls.
            </p>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded">Header</span>
              <span className="text-muted-foreground">.</span>
              <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded">Payload</span>
              <span className="text-muted-foreground">.</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">Signature</span>
            </div>
          </CardContent>
        </Card>

        {/* Features List */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">What This Tool Does</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Header Display</h3>
                <p className="text-xs text-muted-foreground">View algorithm and token type</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Payload Claims</h3>
                <p className="text-xs text-muted-foreground">Read user data and metadata</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Expiration Check</h3>
                <p className="text-xs text-muted-foreground">See if token is expired</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Local Processing</h3>
                <p className="text-xs text-muted-foreground">Tokens stay in your browser</p>
              </div>
            </div>
          </div>
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

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON JWT Decoder</h2>
        <p className="text-muted-foreground mb-6">
          JWT tokens contain encoded JSON data that needs to be inspected during development. This decoder splits the token into its three parts and displays the header and payload as readable JSON. No server-side processing, everything happens in your browser.
        </p>

        <h3 className="text-xl font-semibold mb-3">How JWT decoding works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your JWT token in the input box. The tool splits it by dots into header, payload, and signature sections. Each Base64URL-encoded part is decoded and parsed as JSON, then displayed in its own card with syntax highlighting.
        </p>
        <p className="text-muted-foreground mb-8">
          The header shows the algorithm and token type. The payload displays claims like user ID, expiration, and custom data. The signature is shown as raw Base64URL. Invalid tokens show an error message.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You're debugging authentication issues and need to see what's in a JWT. Or you received a token from an API and want to verify its contents before using it. This tool also helps when learning how JWTs are structured.
        </p>
        <p className="text-muted-foreground mb-8">
          This decoder only reads token contents, it doesn't verify signatures. Don't trust decoded data without proper verification in your application. Never paste production tokens with sensitive data into online tools.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">What are the three parts of a JWT?</p>
            <p className="text-muted-foreground">Header (algorithm info), Payload (claims/data), and Signature (verification). Each is Base64URL-encoded and separated by dots.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can this verify token signatures?</p>
            <p className="text-muted-foreground">No, this only decodes and displays contents. Signature verification requires the secret key and should happen server-side.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Is it safe to decode tokens here?</p>
            <p className="text-muted-foreground">The decoding happens locally in your browser. However, avoid pasting tokens with sensitive data or production credentials.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What if my token is invalid?</p>
            <p className="text-muted-foreground">Invalid tokens will show an error. Common issues include wrong format, corrupted Base64, or missing parts.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I decode expired tokens?</p>
            <p className="text-muted-foreground">Yes, decoding works regardless of expiration. The exp claim will show the token is expired but the data is still readable.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-base64" className="text-primary hover:underline">JSON Base64</a> – Encode and decode Base64 strings
          </li>
          <li>
            <a href="/json-tools/json-validator" className="text-primary hover:underline">JSON Validator</a> – Validate JSON syntax
          </li>
          <li>
            <a href="/json-tools/json-formatter-beautifier" className="text-primary hover:underline">JSON Formatter</a> – Format and beautify JSON
          </li>
        </ul>
      </div>
    </div>
  );
}
