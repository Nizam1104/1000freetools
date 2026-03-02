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

interface RSAResult {
  keySize: number;
  securityBits: number;
  crackTime: string;
  securityLevel: string;
  nistCompliant: boolean;
  recommendations: string[];
  comparisons: Array<{ algorithm: string; equivalentBits: number }>;
}

export default function RSAKeyStrengthCalculatorPage() {
  const [keySize, setKeySize] = useState<string>("2048");
  const [result, setResult] = useState<RSAResult | null>(null);

  const calculate = () => {
    const keyNum = parseInt(keySize) || 2048;

    // Security bits (approximately keySize / 3 for RSA due to GNFS)
    // More accurate: security ≈ 1.923 × (keySize)^(1/3) × (ln(keySize))^(2/3)
    const securityBits = Math.floor(keyNum / 3);

    // Crack time estimation (GNFS complexity)
    // This is a rough estimate based on current factoring records
    let crackTime = "";
    if (keyNum < 512) {
      crackTime = "Already broken (record: 829 bits in 2020)";
    } else if (keyNum < 768) {
      crackTime = "Days to weeks with large cluster";
    } else if (keyNum < 1024) {
      crackTime = "Years with nation-state resources";
    } else if (keyNum < 2048) {
      crackTime = "Decades with current technology";
    } else if (keyNum < 3072) {
      crackTime = "Centuries with current technology";
    } else if (keyNum < 4096) {
      crackTime = "Millennia with current technology";
    } else {
      crackTime = "Longer than age of universe";
    }

    // Security level
    let securityLevel = "";
    let nistCompliant = false;

    if (keyNum < 1024) {
      securityLevel = "🔴 Deprecated - Do not use";
      nistCompliant = false;
    } else if (keyNum < 2048) {
      securityLevel = "🟠 Weak - Below current standards";
      nistCompliant = false;
    } else if (keyNum < 3072) {
      securityLevel = "🟡 Acceptable - Minimum for current use";
      nistCompliant = true;
    } else if (keyNum < 4096) {
      securityLevel = "🟢 Good - Recommended for most uses";
      nistCompliant = true;
    } else {
      securityLevel = "🔵 Excellent - Maximum security";
      nistCompliant = true;
    }

    // Comparisons
    const comparisons = [
      { algorithm: "AES", equivalentBits: Math.floor(securityBits / 1.5) },
      { algorithm: "ECC", equivalentBits: securityBits * 6 },
      { algorithm: "SHA-256", equivalentBits: 256 },
    ];

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🔐 Security level: ~${securityBits} bits`);
    recommendations.push(`📊 NIST compliant: ${nistCompliant ? "Yes" : "No"}`);

    if (keyNum < 2048) {
      recommendations.push("⚠️ Upgrade to at least 2048-bit immediately");
      recommendations.push("🔑 Generate new keys with larger key size");
    } else if (keyNum < 3072) {
      recommendations.push("✅ Acceptable for current use");
      recommendations.push("📅 Plan migration to 3072+ bits before 2030");
    } else if (keyNum >= 3072) {
      recommendations.push("🏆 Strong security for long-term use");
      recommendations.push("🔮 Quantum-resistant for foreseeable future");
    }

    recommendations.push("🔄 Rotate keys every 1-2 years for sensitive data");
    recommendations.push("🔐 Use OAEP padding for encryption");

    setResult({
      keySize: keyNum,
      securityBits,
      crackTime,
      securityLevel,
      nistCompliant,
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
            RSA Key Strength Calculator – Check How Secure Your RSA Encryption Key Is
          </h1>
          <p className="text-muted-foreground">
            Ensure your RSA encryption is strong enough with our RSA Key Strength Calculator.
            Enter your key size in bits to see its security rating, estimated crack time with
            current hardware, and NIST compliance — vital for developers and security architects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="key-size">RSA Key Size (bits)</Label>
                <Select value={keySize} onValueChange={setKeySize}>
                  <SelectTrigger id="key-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="512">512 bits (Broken)</SelectItem>
                    <SelectItem value="768">768 bits (Record broken)</SelectItem>
                    <SelectItem value="1024">1024 bits (Deprecated)</SelectItem>
                    <SelectItem value="2048">2048 bits (Minimum)</SelectItem>
                    <SelectItem value="3072">3072 bits (Recommended)</SelectItem>
                    <SelectItem value="4096">4096 bits (Maximum)</SelectItem>
                    <SelectItem value="8192">8192 bits (Extreme)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  NIST Recommendations:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 2048 bits: Minimum through 2030</li>
                  <li>• 3072 bits: Recommended for new systems</li>
                  <li>• 4096 bits: Long-term security</li>
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
                  <div className={`p-4 rounded-lg text-center ${
                    result.keySize >= 4096 ? "bg-green-100 dark:bg-green-900/20" :
                    result.keySize >= 3072 ? "bg-blue-100 dark:bg-blue-900/20" :
                    result.keySize >= 2048 ? "bg-amber-100 dark:bg-amber-900/20" :
                    "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Security Level</p>
                    <p className="text-lg font-bold mt-1">{result.securityLevel}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Key Size:</span>
                      <span className="font-semibold">{result.keySize} bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Security Bits:</span>
                      <span className="font-semibold">~{result.securityBits} bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">NIST Compliant:</span>
                      <span className={`font-semibold ${result.nistCompliant ? "text-green-600" : "text-red-600"}`}>
                        {result.nistCompliant ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Est. Crack Time:</span>
                      <span className="font-semibold text-sm">{result.crackTime}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Equivalent Security</h4>
                    <div className="space-y-1">
                      {result.comparisons.map((comp, i) => (
                        <div key={i} className="flex justify-between p-2 bg-muted/50 rounded text-sm">
                          <span>{comp.algorithm}</span>
                          <span className="font-mono">{comp.equivalentBits} bits</span>
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
                RSA Key Size Guidelines
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>1024 bits:</strong> Deprecated since 2013, factorable
                  </li>
                  <li>
                    <strong>2048 bits:</strong> Minimum through 2030 (NIST)
                  </li>
                  <li>
                    <strong>3072 bits:</strong> Recommended for new deployments
                  </li>
                  <li>
                    <strong>4096 bits:</strong> Long-term security, more CPU intensive
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> RSA security relies on the difficulty of integer
                  factorization. Quantum computers could break RSA using Shor&apos;s algorithm,
                  but practical quantum computers capable of this don&apos;t exist yet.
                  Consider post-quantum algorithms for long-term security.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
