"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AESResult {
  keySize: number;
  possibleKeys: string;
  bruteForceTime: string;
  securityLevel: string;
  recommendations: string[];
  comparisons: Array<{ name: string; comparison: string }>;
}

export default function AESKeySizeEstimatorPage() {
  const [keySize, setKeySize] = useState<string>("256");
  const [result, setResult] = useState<AESResult | null>(null);

  const calculate = () => {
    const keyNum = parseInt(keySize) || 256;

    // Calculate possible keys (2^keySize)
    const possibleKeys = BigInt(Math.pow(2, keyNum));
    const possibleKeysStr = possibleKeys.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Brute force time estimation (assuming 1 trillion keys/second with quantum computer)
    // Classical computer: much slower
    const keysPerSecond = 1e12; // 1 trillion keys/second (optimistic quantum)
    const secondsToCrack = Number(possibleKeys) / 2 / keysPerSecond; // Average case (half the keyspace)

    // Format time
    let bruteForceTime = "";
    if (secondsToCrack < 60) {
      bruteForceTime = `${secondsToCrack.toFixed(2)} seconds`;
    } else if (secondsToCrack < 3600) {
      bruteForceTime = `${(secondsToCrack / 60).toFixed(2)} minutes`;
    } else if (secondsToCrack < 86400) {
      bruteForceTime = `${(secondsToCrack / 3600).toFixed(2)} hours`;
    } else if (secondsToCrack < 31536000) {
      bruteForceTime = `${(secondsToCrack / 86400).toFixed(2)} days`;
    } else if (secondsToCrack < 31536000000) {
      bruteForceTime = `${(secondsToCrack / 31536000).toFixed(2)} years`;
    } else if (secondsToCrack < 31536000000000) {
      bruteForceTime = `${(secondsToCrack / 31536000000).toFixed(2)} thousand years`;
    } else {
      bruteForceTime = "Longer than age of universe";
    }

    // Security level
    let securityLevel = "";
    if (keyNum >= 256) {
      securityLevel = "🔒 Military/Government grade - Quantum resistant";
    } else if (keyNum >= 192) {
      securityLevel = "🔒 High security - Commercial grade";
    } else if (keyNum >= 128) {
      securityLevel = "🔒 Good security - Standard protection";
    } else {
      securityLevel = "⚠️ Weak - Not recommended for sensitive data";
    }

    // Comparisons
    const comparisons = [
      { name: "Atoms in Earth", comparison: "~10^50" },
      { name: "Keys (AES-" + keyNum + ")", comparison: "2^" + keyNum },
      { name: "Age of universe (seconds)", comparison: "~4×10^17" },
    ];

    // Recommendations
    const recommendations: string[] = [];

    if (keyNum < 128) {
      recommendations.push("⚠️ Upgrade to at least AES-128 for basic security");
    } else if (keyNum < 256) {
      recommendations.push("✅ AES-" + keyNum + " is secure for most applications");
      recommendations.push("🔐 Consider AES-256 for long-term sensitive data");
    } else {
      recommendations.push("🏆 AES-256 provides maximum security");
      recommendations.push("🔮 Quantum-resistant for foreseeable future");
    }

    recommendations.push("🔑 Key management is as important as key size");
    recommendations.push("🔄 Rotate keys periodically for enhanced security");

    setResult({
      keySize: keyNum,
      possibleKeys: possibleKeysStr,
      bruteForceTime,
      securityLevel,
      recommendations,
      comparisons,
    });
  };

  const reset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            AES Key Size Estimator – Understand Encryption Key Strength
          </h1>
          <p className="text-muted-foreground">
            Understand the security of your encryption with our AES Key Size Estimator.
            See how many possible keys exist for different key sizes and how long brute
            force attacks would take — essential for security planning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="key-size">AES Key Size (bits)</Label>
                <Select value={keySize} onValueChange={setKeySize}>
                  <SelectTrigger id="key-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="128">AES-128 (128-bit)</SelectItem>
                    <SelectItem value="192">AES-192 (192-bit)</SelectItem>
                    <SelectItem value="256">AES-256 (256-bit)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Key Size Comparison:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• AES-128: 3.4×10³⁸ possible keys</li>
                  <li>• AES-192: 6.2×10⁵⁷ possible keys</li>
                  <li>• AES-256: 1.1×10⁷⁷ possible keys</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Security Analysis</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Possible Keys</p>
                    <p className="text-lg font-bold text-primary break-all">2^{result.keySize}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {result.possibleKeys.length > 50 
                        ? result.possibleKeys.substring(0, 50) + "..." 
                        : result.possibleKeys}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Brute Force Time</p>
                    <p className="text-xl font-bold">{result.bruteForceTime}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      (with optimistic quantum computer)
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      {result.securityLevel}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Scale Comparison</h4>
                    <div className="space-y-1">
                      {result.comparisons.map((comp, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{comp.name}</span>
                          <span className="font-mono">{comp.comparison}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommendations</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Select key size and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Understanding AES Key Sizes
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>AES-128:</strong> Secure against classical computers,
                    potentially vulnerable to quantum
                  </li>
                  <li>
                    <strong>AES-192:</strong> Higher security margin, less commonly used
                  </li>
                  <li>
                    <strong>AES-256:</strong> Quantum-resistant, used for top-secret data
                  </li>
                  <li>
                    <strong>Brute force:</strong> Trying every possible key until one works
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> Even with all computers on Earth working together,
                  brute-forcing AES-256 would take longer than the age of the universe.
                  The real risk is poor key management, not brute force attacks.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
