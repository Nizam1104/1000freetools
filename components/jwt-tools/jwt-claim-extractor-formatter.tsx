"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, FileText } from "lucide-react";

export default function JwtClaimExtractorFormatter() {
  const [token, setToken] = useState("");
  const [extractedClaims, setExtractedClaims] = useState<Record<string, unknown>>({});
  const [customClaim, setCustomClaim] = useState("");
  const [copied, setCopied] = useState(false);

  const parseToken = useCallback(() => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        return { error: "Invalid token format" };
      }

      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

      return { header, payload };
    } catch (err) {
      return { error: "Failed to parse token" };
    }
  }, [token]);

  const extractClaims = useCallback(() => {
    const result = parseToken();
    if ("error" in result) {
      setExtractedClaims({ error: result.error });
      return;
    }

    const claims: Record<string, unknown> = {};
    const payload = result.payload;

    // Standard claims
    const standardClaims = ["iss", "sub", "aud", "exp", "nbf", "iat", "jti"];
    standardClaims.forEach((claim) => {
      if (claim in payload) {
        claims[claim] = payload[claim];
      }
    });

    // Custom claims
    Object.keys(payload).forEach((key) => {
      if (!standardClaims.includes(key)) {
        claims[key] = payload[key];
      }
    });

    setExtractedClaims(claims);
  }, [parseToken]);

  const getClaimValue = useCallback((claim: string) => {
    return extractedClaims[claim] !== undefined ? String(extractedClaims[claim]) : "Not found";
  }, [extractedClaims]);

  const formatDateClaim = useCallback((timestamp: number | string): string => {
    const ts = typeof timestamp === "string" ? parseInt(timestamp) : timestamp;
    if (isNaN(ts)) return String(timestamp);
    return new Date(ts * 1000).toLocaleString();
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(extractedClaims, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [extractedClaims]);

  const tokenInfo = parseToken();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            JWT Token Input
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="token">JWT Token</Label>
            <Textarea
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your JWT token..."
              className="mt-1 h-24 font-mono text-xs"
            />
          </div>
          <Button onClick={extractClaims} disabled={!token} className="w-full">
            Extract Claims
          </Button>
        </CardContent>
      </Card>

      {extractedClaims && !("error" in extractedClaims) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Standard Claims</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { claim: "iss", name: "Issuer" },
                { claim: "sub", name: "Subject" },
                { claim: "aud", name: "Audience" },
                { claim: "exp", name: "Expiration Time" },
                { claim: "nbf", name: "Not Before" },
                { claim: "iat", name: "Issued At" },
                { claim: "jti", name: "JWT ID" },
              ].map(({ claim, name }) => (
                <div key={claim} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{name} ({claim})</span>
                    {extractedClaims[claim] !== undefined && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Present</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 font-mono break-all">
                    {extractedClaims[claim] !== undefined
                      ? ["exp", "nbf", "iat"].includes(claim)
                        ? formatDateClaim(extractedClaims[claim] as number)
                        : String(extractedClaims[claim])
                      : "Not present in token"}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Claims</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Label>All Extracted Claims (JSON)</Label>
                <Textarea
                  value={JSON.stringify(extractedClaims, null, 2)}
                  readOnly
                  className="mt-1 h-48 font-mono text-xs"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-8 right-2"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              <div>
                <Label>Extract Specific Claim</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={customClaim}
                    onChange={(e) => setCustomClaim(e.target.value)}
                    placeholder="Enter claim name..."
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={() => {
                    const value = getClaimValue(customClaim);
                    alert(`${customClaim}: ${value}`);
                  }}>
                    Get Value
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label>Claim Statistics</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>Total Claims: {Object.keys(extractedClaims).length}</div>
                  <div>Standard: {["iss", "sub", "aud", "exp", "nbf", "iat", "jti"].filter(c => extractedClaims[c] !== undefined).length}</div>
                  <div>Custom: {Object.keys(extractedClaims).length - ["iss", "sub", "aud", "exp", "nbf", "iat", "jti"].filter(c => extractedClaims[c] !== undefined).length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {"error" in extractedClaims && (extractedClaims as { error?: string }).error && (
        <Card>
          <CardContent className="text-center py-8 text-red-600">
            <p>{(extractedClaims as { error?: string }).error}</p>
            <p className="text-sm text-muted-foreground mt-2">Please enter a valid JWT token</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full p-2 border rounded-md bg-background ${props.className}`} />;
}
