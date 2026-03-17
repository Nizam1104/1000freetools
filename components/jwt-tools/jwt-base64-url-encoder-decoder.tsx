"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, ArrowRightLeft } from "lucide-react";

export default function JWTBase64URLEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const base64ToBase64Url = useCallback((base64: string): string => {
    return base64
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }, []);

  const base64UrlToBase64 = useCallback((base64Url: string): string => {
    let base64 = base64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    
    // Add padding if needed
    while (base64.length % 4) {
      base64 += "=";
    }
    
    return base64;
  }, []);

  const process = useCallback(() => {
    try {
      if (mode === "encode") {
        // Standard Base64 to Base64URL
        const base64 = btoa(input);
        setOutput(base64ToBase64Url(base64));
      } else {
        // Base64URL to Standard Base64 then decode
        const base64 = base64UrlToBase64(input);
        const decoded = atob(base64);
        setOutput(decoded);
      }
    } catch (err) {
      setOutput("Error: Invalid input");
    }
  }, [input, mode, base64ToBase64Url, base64UrlToBase64]);

  const processJSON = useCallback(() => {
    try {
      if (mode === "encode") {
        const jsonString = JSON.stringify(input);
        const base64 = btoa(jsonString);
        setOutput(base64ToBase64Url(base64));
      }
    } catch {
      setOutput("Error: Invalid JSON");
    }
  }, [input, mode, base64ToBase64Url]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [output]);

  const encodeJWTSection = useCallback((section: string) => {
    try {
      const base64 = btoa(section);
      return base64ToBase64Url(base64);
    } catch {
      return "Error";
    }
  }, [base64ToBase64Url]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5" />
              Base64URL Encoder/Decoder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Mode</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={mode === "encode"}
                    onChange={() => setMode("encode")}
                  />
                  Encode to Base64URL
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={mode === "decode"}
                    onChange={() => setMode("decode")}
                  />
                  Decode from Base64URL
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="input">Input</Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64URL string..."}
                className="mt-1 h-40 font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={process} className="flex-1">
                {mode === "encode" ? "Encode" : "Decode"}
              </Button>
              {mode === "encode" && (
                <Button onClick={processJSON} variant="outline">
                  Encode JSON
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Result</Label>
              <Textarea
                value={output}
                readOnly
                className="mt-1 h-40 font-mono text-sm"
                placeholder="Output will appear here..."
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  {output.length} characters
                </p>
                <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!output || output.startsWith("Error")}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <Label>JWT Section Encoder</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Input
                    placeholder='{"alg":"HS256"}'
                    id="jwtHeader"
                    className="text-xs"
                    onBlur={(e) => {
                      if (e.target.value) {
                        const encoded = encodeJWTSection(e.target.value);
                        e.target.value = encoded;
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Header</p>
                </div>
                <div>
                  <Input
                    placeholder='{"sub":"123"}'
                    id="jwtPayload"
                    className="text-xs"
                    onBlur={(e) => {
                      if (e.target.value) {
                        const encoded = encodeJWTSection(e.target.value);
                        e.target.value = encoded;
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Payload</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Base64 vs Base64URL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Character</th>
                  <th className="text-left p-2">Base64</th>
                  <th className="text-left p-2">Base64URL</th>
                  <th className="text-left p-2">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-mono">+</td>
                  <td className="p-2 font-mono">+</td>
                  <td className="p-2 font-mono">-</td>
                  <td className="p-2">URL unsafe</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-mono">/</td>
                  <td className="p-2 font-mono">/</td>
                  <td className="p-2 font-mono">_</td>
                  <td className="p-2">URL unsafe</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">=</td>
                  <td className="p-2 font-mono">= (padding)</td>
                  <td className="p-2 font-mono">(removed)</td>
                  <td className="p-2">URL length optimization</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
