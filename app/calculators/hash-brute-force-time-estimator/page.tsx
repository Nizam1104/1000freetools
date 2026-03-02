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

interface HashResult {
  hashType: string;
  passwordLength: number;
  charsetSize: number;
  totalCombinations: string;
  timeToCrack: string;
  securityLevel: string;
  recommendations: string[];
}

export default function HashBruteForceTimeEstimatorPage() {
  const [passwordLength, setPasswordLength] = useState<string>("");
  const [charset, setCharset] = useState<string>("alphanumeric");
  const [hashType, setHashType] = useState<string>("md5");
  const [hashesPerSecond, setHashesPerSecond] = useState<string>("100000000000");
  const [result, setResult] = useState<HashResult | null>(null);

  const calculate = () => {
    const lengthNum = parseInt(passwordLength) || 0;
    const hashesNum = parseFloat(hashesPerSecond) || 1e11;

    if (lengthNum === 0) return;

    // Character set sizes
    const charsetSizes: Record<string, number> = {
      numeric: 10,
      lowercase: 26,
      alphanumeric: 36,
      alphanumericCase: 62,
      special: 94,
    };
    const charsetSize = charsetSizes[charset] || 36;

    // Total combinations
    const totalCombinations = BigInt(Math.pow(charsetSize, lengthNum));
    const totalCombinationsStr = totalCombinations.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Time to crack (average case = half the keyspace)
    const secondsToCrack = Number(totalCombinations) / 2 / hashesNum;

    // Format time
    let timeToCrack = "";
    if (secondsToCrack < 1) {
      timeToCrack = "Instant (<1 second)";
    } else if (secondsToCrack < 60) {
      timeToCrack = `${secondsToCrack.toFixed(1)} seconds`;
    } else if (secondsToCrack < 3600) {
      timeToCrack = `${(secondsToCrack / 60).toFixed(1)} minutes`;
    } else if (secondsToCrack < 86400) {
      timeToCrack = `${(secondsToCrack / 3600).toFixed(1)} hours`;
    } else if (secondsToCrack < 31536000) {
      timeToCrack = `${(secondsToCrack / 86400).toFixed(1)} days`;
    } else if (secondsToCrack < 31536000000) {
      timeToCrack = `${(secondsToCrack / 31536000).toFixed(1)} years`;
    } else if (secondsToCrack < 31536000000000) {
      timeToCrack = `${(secondsToCrack / 31536000000).toFixed(1)} thousand years`;
    } else if (secondsToCrack < 31536000000000000) {
      timeToCrack = `${(secondsToCrack / 31536000000000).toFixed(1)} million years`;
    } else {
      timeToCrack = "Longer than age of universe";
    }

    // Security level
    let securityLevel = "";
    const log2Combinations = lengthNum * Math.log2(charsetSize);
    
    if (log2Combinations < 40) {
      securityLevel = "🔴 Very Weak - Crackable instantly";
    } else if (log2Combinations < 60) {
      securityLevel = "🟠 Weak - Crackable in hours/days";
    } else if (log2Combinations < 80) {
      securityLevel = "🟡 Moderate - Some protection";
    } else if (log2Combinations < 100) {
      securityLevel = "🟢 Strong - Good protection";
    } else if (log2Combinations < 128) {
      securityLevel = "🔵 Very Strong - Excellent protection";
    } else {
      securityLevel = "🟣 Maximum - Practically uncrackable";
    }

    // Recommendations
    const recommendations: string[] = [];
    recommendations.push(`🔐 Password entropy: ${log2Combinations.toFixed(0)} bits`);
    recommendations.push(`📊 Combinations: ${totalCombinationsStr.length > 30 ? totalCombinationsStr.substring(0, 30) + "..." : totalCombinationsStr}`);

    if (lengthNum < 8) {
      recommendations.push("⚠️ Too short - Use at least 12 characters");
    } else if (lengthNum < 12) {
      recommendations.push("⚠️ Consider using 12+ characters");
    } else {
      recommendations.push("✅ Good length for security");
    }

    if (charset === "numeric" || charset === "lowercase") {
      recommendations.push("⚠️ Limited charset - Add numbers, symbols, uppercase");
    } else if (charset === "alphanumeric") {
      recommendations.push("⚠️ Consider adding special characters");
    } else {
      recommendations.push("✅ Good character variety");
    }

    if (hashType === "md5") {
      recommendations.push("⚠️ MD5 is deprecated - Use bcrypt, Argon2, or scrypt");
    } else if (hashType === "sha256") {
      recommendations.push("⚠️ SHA-256 is fast - Use password-specific hashing");
    } else {
      recommendations.push("✅ Using appropriate password hashing");
    }

    setResult({
      hashType,
      passwordLength: lengthNum,
      charsetSize,
      totalCombinations: totalCombinationsStr,
      timeToCrack,
      securityLevel,
      recommendations,
    });
  };

  const reset = () => {
    setPasswordLength("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Hash Brute-Force Time Estimator – How Long to Crack a Password Hash?
          </h1>
          <p className="text-muted-foreground">
            Understand the real-world risk of hash cracking with our Brute-Force Time Estimator.
            Enter the hash algorithm, password length, and character set to estimate how long
            it would take to crack the hash by brute force.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hash-type">Hash Algorithm</Label>
                <Select value={hashType} onValueChange={setHashType}>
                  <SelectTrigger id="hash-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="md5">MD5 (Fast, deprecated)</SelectItem>
                    <SelectItem value="sha256">SHA-256 (Fast)</SelectItem>
                    <SelectItem value="bcrypt">bcrypt (Slow, recommended)</SelectItem>
                    <SelectItem value="argon2">Argon2 (Slow, recommended)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="length">Password Length</Label>
                <Input
                  id="length"
                  type="number"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(e.target.value)}
                  placeholder="e.g., 12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="charset">Character Set</Label>
                <Select value={charset} onValueChange={setCharset}>
                  <SelectTrigger id="charset">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="numeric">Numbers only (0-9)</SelectItem>
                    <SelectItem value="lowercase">Lowercase (a-z)</SelectItem>
                    <SelectItem value="alphanumeric">Alphanumeric (a-z, 0-9)</SelectItem>
                    <SelectItem value="alphanumericCase">Alphanumeric + Case (a-zA-Z0-9)</SelectItem>
                    <SelectItem value="special">Full ASCII (printable)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hashes">Hashes Per Second</Label>
                <Input
                  id="hashes"
                  type="number"
                  value={hashesPerSecond}
                  onChange={(e) => setHashesPerSecond(e.target.value)}
                  placeholder="100000000000"
                />
                <p className="text-xs text-muted-foreground">
                  GPU cluster: ~100 billion/sec for MD5
                </p>
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
                    result.securityLevel.includes("Maximum") || result.securityLevel.includes("Very Strong")
                      ? "bg-green-100 dark:bg-green-900/20"
                      : result.securityLevel.includes("Strong")
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : result.securityLevel.includes("Moderate")
                      ? "bg-amber-100 dark:bg-amber-900/20"
                      : "bg-red-100 dark:bg-red-900/20"
                  }`}>
                    <p className="text-sm text-muted-foreground">Security Level</p>
                    <p className="text-lg font-bold mt-1">{result.securityLevel}</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Time to Crack</p>
                    <p className="text-xl font-bold">{result.timeToCrack}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      (at {parseFloat(result.recommendations[0]?.split(':')[1] || '1e11')} hashes/sec)
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Analysis</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter password details and click Calculate to see analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Password Security Best Practices
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Length:</strong> At least 12 characters, 16+ recommended
                  </li>
                  <li>
                    <strong>Complexity:</strong> Mix of uppercase, lowercase, numbers, symbols
                  </li>
                  <li>
                    <strong>Hashing:</strong> Use bcrypt, Argon2, or scrypt for passwords
                  </li>
                  <li>
                    <strong>Uniqueness:</strong> Never reuse passwords across sites
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> This calculator assumes pure brute-force attack.
                  Real-world attacks often use dictionaries and rainbow tables, which can
                  crack weak passwords much faster. Always use strong, unique passwords.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
