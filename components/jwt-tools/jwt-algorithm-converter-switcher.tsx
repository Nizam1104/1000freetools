"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Key, RefreshCw } from "lucide-react";

const algorithms = ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "none"];

export default function JwtAlgorithmConverterSwitcher() {
  const [token, setToken] = useState("");
  const [currentAlgorithm, setCurrentAlgorithm] = useState("HS256");
  const [targetAlgorithm, setTargetAlgorithm] = useState("HS512");
  const [secret, setSecret] = useState("your-secret-key");
  const [convertedToken, setConvertedToken] = useState("");
  const [copied, setCopied] = useState(false);

  const parseToken = useCallback(() => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return null;
      
      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      
      return { header, payload, signature: parts[2] };
    } catch {
      return null;
    }
  }, [token]);

  const convertAlgorithm = useCallback(() => {
    const parsed = parseToken();
    if (!parsed) {
      setConvertedToken("Invalid token");
      return;
    }

    // Update header with new algorithm
    const newHeader = { ...parsed.header, alg: targetAlgorithm };
    
    // Re-encode header and payload
    const newHeaderEncoded = btoa(JSON.stringify(newHeader))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
    
    const payloadEncoded = btoa(JSON.stringify(parsed.payload))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    // Generate new signature (simplified - in production use proper crypto)
    const dataToSign = `${newHeaderEncoded}.${payloadEncoded}`;
    let newSignature = "";
    
    if (targetAlgorithm.startsWith("HS")) {
      // Simplified HMAC simulation
      newSignature = btoa(dataToSign + secret)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
    } else if (targetAlgorithm === "none") {
      newSignature = "";
    } else {
      newSignature = "SIGNATURE_REQUIRES_PRIVATE_KEY";
    }

    setConvertedToken(`${newHeaderEncoded}.${payloadEncoded}.${newSignature}`);
    setCurrentAlgorithm(targetAlgorithm);
  }, [token, targetAlgorithm, secret, parseToken]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(convertedToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [convertedToken]);

  const tokenInfo = parseToken();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
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
                className="mt-1 h-32 font-mono text-xs"
              />
            </div>

            {tokenInfo && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-semibold">Current Algorithm: {tokenInfo.header.alg}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Token is valid and can be converted
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="targetAlgorithm">Target Algorithm</Label>
              <select
                id="targetAlgorithm"
                value={targetAlgorithm}
                onChange={(e) => setTargetAlgorithm(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                {algorithms.map((alg) => (
                  <option key={alg} value={alg}>{alg}</option>
                ))}
              </select>
            </div>

            {(targetAlgorithm.startsWith("HS")) && (
              <div>
                <Label htmlFor="secret">Secret Key</Label>
                <Input
                  id="secret"
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            <Button onClick={convertAlgorithm} disabled={!token} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Convert Algorithm
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Converted Token</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Output</Label>
              <Textarea
                value={convertedToken}
                readOnly
                className="mt-1 h-32 font-mono text-xs"
                placeholder="Converted token will appear here..."
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  {convertedToken.length} characters
                </p>
                <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!convertedToken}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {convertedToken && convertedToken !== "Invalid token" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="font-semibold mb-2">Algorithm Comparison</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Original:</span> {tokenInfo?.header.alg || "N/A"}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Converted:</span> {targetAlgorithm}
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg text-sm">
              <p className="font-semibold mb-2">⚠️ Important Notes:</p>
              <ul className="text-muted-foreground list-disc list-inside space-y-1">
                <li>Algorithm conversion requires re-signing the token</li>
                <li>You need the appropriate key for the target algorithm</li>
                <li>HS* algorithms use symmetric keys (shared secret)</li>
                <li>RS* and ES* algorithms require private keys</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Algorithm Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">HMAC (HS*)</h4>
              <p className="text-sm text-muted-foreground mt-1">
                HS256, HS384, HS512 - Symmetric encryption using shared secrets
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">RSA (RS*)</h4>
              <p className="text-sm text-muted-foreground mt-1">
                RS256, RS384, RS512 - Asymmetric encryption using key pairs
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">ECDSA (ES*)</h4>
              <p className="text-sm text-muted-foreground mt-1">
                ES256, ES384, ES512 - Elliptic curve digital signatures
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full p-2 border rounded-md bg-background ${props.className}`} />;
}
