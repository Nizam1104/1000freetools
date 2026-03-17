"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Clock, AlertTriangle } from "lucide-react";

export default function JWTExpiryCheckerTimestampConverter() {
  const [token, setToken] = useState("");
  const [expiryInfo, setExpiryInfo] = useState<{
    exp?: number;
    nbf?: number;
    iat?: number;
    isExpired: boolean;
    isNotYetValid: boolean;
    timeUntilExpiry?: string;
    timeSinceIssued?: string;
    timeUntilValid?: string;
  } | null>(null);
  const [customTimestamp, setCustomTimestamp] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const [copied, setCopied] = useState(false);

  const checkExpiry = useCallback(() => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        setExpiryInfo(null);
        return;
      }

      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      const now = Math.floor(Date.now() / 1000);

      const exp = payload.exp as number | undefined;
      const nbf = payload.nbf as number | undefined;
      const iat = payload.iat as number | undefined;

      const isExpired = exp ? now > exp : false;
      const isNotYetValid = nbf ? now < nbf : false;

      let timeUntilExpiry: string | undefined;
      let timeSinceIssued: string | undefined;
      let timeUntilValid: string | undefined;

      if (exp) {
        const diff = exp - now;
        const days = Math.floor(diff / 86400);
        const hours = Math.floor((diff % 86400) / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        timeUntilExpiry = diff > 0 
          ? `${days}d ${hours}h ${minutes}m`
          : `Expired ${Math.abs(days)}d ${Math.abs(hours)}h ${Math.abs(minutes)}m ago`;
      }

      if (iat) {
        const diff = now - iat;
        const days = Math.floor(diff / 86400);
        const hours = Math.floor((diff % 86400) / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        timeSinceIssued = `${days}d ${hours}h ${minutes}m ago`;
      }

      if (nbf && now < nbf) {
        const diff = nbf - now;
        const days = Math.floor(diff / 86400);
        const hours = Math.floor((diff % 86400) / 3600);
        timeUntilValid = `${days}d ${hours}h until valid`;
      }

      setExpiryInfo({
        exp,
        nbf,
        iat,
        isExpired,
        isNotYetValid,
        timeUntilExpiry,
        timeSinceIssued,
        timeUntilValid,
      });
    } catch {
      setExpiryInfo(null);
    }
  }, [token]);

  const convertTimestamp = useCallback(() => {
    const ts = parseInt(customTimestamp);
    if (isNaN(ts)) {
      setConvertedDate("Invalid timestamp");
      return;
    }

    // Assume Unix timestamp (seconds)
    const date = new Date(ts * 1000);
    setConvertedDate(date.toLocaleString());
  }, [customTimestamp]);

  const getCurrentTimestamp = useCallback(() => {
    setCustomTimestamp(Math.floor(Date.now() / 1000).toString());
    setConvertedDate(new Date().toLocaleString());
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!expiryInfo) return;
    try {
      const text = `JWT Expiry Check:
Expired: ${expiryInfo.isExpired}
Not Yet Valid: ${expiryInfo.isNotYetValid}
${expiryInfo.timeUntilExpiry ? `Time Until Expiry: ${expiryInfo.timeUntilExpiry}` : ""}
${expiryInfo.timeSinceIssued ? `Time Since Issued: ${expiryInfo.timeSinceIssued}` : ""}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [expiryInfo]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Token Expiry Check
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
            <Button onClick={checkExpiry} disabled={!token} className="w-full">
              Check Expiry
            </Button>

            {expiryInfo && (
              <div className="space-y-3">
                <div className={`p-4 rounded-lg text-center ${
                  expiryInfo.isExpired ? "bg-red-50 dark:bg-red-950" :
                  expiryInfo.isNotYetValid ? "bg-amber-50 dark:bg-amber-950" :
                  "bg-green-50 dark:bg-green-950"
                }`}>
                  <p className={`text-xl font-bold ${
                    expiryInfo.isExpired ? "text-red-600" :
                    expiryInfo.isNotYetValid ? "text-amber-600" : "text-green-600"
                  }`}>
                    {expiryInfo.isExpired ? "✗ Token Expired" :
                     expiryInfo.isNotYetValid ? "⚠ Not Yet Valid" : "✓ Token Valid"}
                  </p>
                </div>

                {expiryInfo.timeUntilExpiry && (
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Time Until Expiry</p>
                    <p className="text-lg font-semibold">{expiryInfo.timeUntilExpiry}</p>
                  </div>
                )}

                {expiryInfo.timeSinceIssued && (
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Time Since Issued</p>
                    <p className="text-lg font-semibold">{expiryInfo.timeSinceIssued}</p>
                  </div>
                )}

                {expiryInfo.timeUntilValid && (
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Time Until Valid</p>
                    <p className="text-lg font-semibold">{expiryInfo.timeUntilValid}</p>
                  </div>
                )}

                <Button variant="outline" onClick={copyToClipboard} className="w-full">
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy Results
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Timestamp Converter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="timestamp">Unix Timestamp (seconds)</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="timestamp"
                  type="number"
                  value={customTimestamp}
                  onChange={(e) => setCustomTimestamp(e.target.value)}
                  placeholder="e.g., 1704067200"
                  className="flex-1"
                />
                <Button onClick={getCurrentTimestamp} variant="outline">
                  Now
                </Button>
              </div>
            </div>

            <Button onClick={convertTimestamp} className="w-full">
              Convert to Date
            </Button>

            {convertedDate && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Converted Date/Time</p>
                <p className="text-xl font-semibold mt-1">{convertedDate}</p>
              </div>
            )}

            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="font-semibold mb-2">Common Timestamps</p>
              <div className="space-y-2 text-sm">
                <button
                  className="block w-full text-left p-2 hover:bg-muted rounded"
                  onClick={() => {
                    const now = Math.floor(Date.now() / 1000);
                    setCustomTimestamp(now.toString());
                    setConvertedDate(new Date().toLocaleString());
                  }}
                >
                  Current Time: {Math.floor(Date.now() / 1000)}
                </button>
                <button
                  className="block w-full text-left p-2 hover:bg-muted rounded"
                  onClick={() => {
                    const future = Math.floor(Date.now() / 1000) + 3600;
                    setCustomTimestamp(future.toString());
                    setConvertedDate(new Date(future * 1000).toLocaleString());
                  }}
                >
                  +1 Hour: {Math.floor(Date.now() / 1000) + 3600}
                </button>
                <button
                  className="block w-full text-left p-2 hover:bg-muted rounded"
                  onClick={() => {
                    const future = Math.floor(Date.now() / 1000) + 86400;
                    setCustomTimestamp(future.toString());
                    setConvertedDate(new Date(future * 1000).toLocaleString());
                  }}
                >
                  +1 Day: {Math.floor(Date.now() / 1000) + 86400}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full p-2 border rounded-md bg-background ${props.className}`} />;
}
