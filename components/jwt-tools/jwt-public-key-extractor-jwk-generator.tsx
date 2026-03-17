"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Key, Download } from "lucide-react";

export default function JWTPublicKeyExtractorJWKGenerator() {
  const [token, setToken] = useState("");
  const [jwkConfig, setJwkConfig] = useState({
    kty: "RSA",
    use: "sig",
    alg: "RS256",
  });
  const [generatedJWK, setGeneratedJWK] = useState("");
  const [copied, setCopied] = useState(false);

  const parseToken = useCallback(() => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return null;
      
      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      
      return { header, payload };
    } catch {
      return null;
    }
  }, [token]);

  const generateJWK = useCallback(() => {
    const parsed = parseToken();
    if (!parsed) {
      setGeneratedJWK("Error: Invalid token");
      return;
    }

    const alg = parsed.header.alg as string || "RS256";
    
    // Generate a sample JWK structure
    // Note: In production, you would extract the actual key from the token or JWKS endpoint
    const jwk: Record<string, unknown> = {
      kty: jwkConfig.kty,
      use: jwkConfig.use,
      alg: alg,
      kid: parsed.header.kid || "default-key-id",
    };

    if (jwkConfig.kty === "RSA") {
      jwk.n = "MODULUS_PLACEHOLDER";
      jwk.e = "AQAB";
    } else if (jwkConfig.kty === "EC") {
      jwk.crv = "P-256";
      jwk.x = "X_COORDINATE_PLACEHOLDER";
      jwk.y = "Y_COORDINATE_PLACEHOLDER";
    } else if (jwkConfig.kty === "oct") {
      jwk.k = "SYMMETRIC_KEY_PLACEHOLDER";
    }

    setGeneratedJWK(JSON.stringify(jwk, null, 2));
  }, [token, jwkConfig, parseToken]);

  const generateJWKS = useCallback(() => {
    const jwks = {
      keys: [
        JSON.parse(generatedJWK),
        {
          kty: "RSA",
          use: "sig",
          alg: "RS256",
          kid: "backup-key",
          n: "BACKUP_MODULUS",
          e: "AQAB",
        },
      ],
    };
    return JSON.stringify(jwks, null, 2);
  }, [generatedJWK]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedJWK);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [generatedJWK]);

  const downloadJWK = useCallback(() => {
    const blob = new Blob([generatedJWK], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jwk.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [generatedJWK]);

  const tokenInfo = parseToken();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Token & Configuration
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

            {tokenInfo && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-semibold">Token Info</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Algorithm: {tokenInfo.header.alg}
                  {tokenInfo.header.kid && `, Key ID: ${tokenInfo.header.kid}`}
                </p>
              </div>
            )}

            <div>
              <Label>Key Type</Label>
              <select
                value={jwkConfig.kty}
                onChange={(e) => setJwkConfig({ ...jwkConfig, kty: e.target.value })}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                <option value="RSA">RSA</option>
                <option value="EC">Elliptic Curve (EC)</option>
                <option value="oct">Octet (Symmetric)</option>
              </select>
            </div>

            <div>
              <Label>Key Use</Label>
              <select
                value={jwkConfig.use}
                onChange={(e) => setJwkConfig({ ...jwkConfig, use: e.target.value })}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                <option value="sig">Signature (sig)</option>
                <option value="enc">Encryption (enc)</option>
              </select>
            </div>

            <Button onClick={generateJWK} disabled={!token} className="w-full">
              Generate JWK
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JWK Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Generated JWK</Label>
              <Textarea
                value={generatedJWK}
                readOnly
                className="mt-1 h-40 font-mono text-xs"
                placeholder="JWK will appear here..."
              />
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!generatedJWK}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button size="sm" variant="outline" onClick={downloadJWK} disabled={!generatedJWK || generatedJWK.startsWith("Error")}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {generatedJWK && !generatedJWK.startsWith("Error") && (
              <div>
                <Label>JWKS (Key Set)</Label>
                <Textarea
                  value={generateJWKS()}
                  readOnly
                  className="mt-1 h-32 font-mono text-xs"
                />
              </div>
            )}

            <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg text-sm">
              <p className="font-semibold mb-2">⚠️ Important Notes:</p>
              <ul className="text-muted-foreground list-disc list-inside space-y-1">
                <li>This tool generates JWK templates, not actual keys</li>
                <li>Replace placeholder values with real key material</li>
                <li>Never expose private keys in JWK format publicly</li>
                <li>JWKS endpoints should be served over HTTPS</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>JWK Format Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">RSA Keys</h4>
              <pre className="text-xs mt-2 text-muted-foreground">
{`{
  "kty": "RSA",
  "n": "modulus",
  "e": "exponent"
}`}
              </pre>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">EC Keys</h4>
              <pre className="text-xs mt-2 text-muted-foreground">
{`{
  "kty": "EC",
  "crv": "P-256",
  "x": "x-coordinate",
  "y": "y-coordinate"
}`}
              </pre>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Symmetric Keys</h4>
              <pre className="text-xs mt-2 text-muted-foreground">
{`{
  "kty": "oct",
  "k": "base64url-key"
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
