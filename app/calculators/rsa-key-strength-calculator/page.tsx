"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
            Check your RSA key security instantly with our free RSA Key Strength Calculator. Enter your key size in bits to see security rating, estimated crack time with current hardware, and NIST compliance status — essential for developers and security architects choosing encryption key sizes.
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
                  <div className={`p-4 rounded-lg text-center ${result.keySize >= 4096 ? "bg-green-100 dark:bg-green-900/20" :
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
                How to Use This RSA Key Strength Calculator
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Select your RSA key size</p>
                    <p>Choose from common key sizes ranging from 512 bits (broken) to 8192 bits (extreme security).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate</p>
                    <p>The calculator analyzes your key's security bits, estimated crack time, and NIST compliance status.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Review the security analysis</p>
                    <p>See how your RSA key compares to AES and ECC, plus get recommendations for your use case.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Why RSA Key Size Matters
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Security bits determine real protection</h4>
                  <p>
                    RSA key size doesn't equal security bits. A 2048-bit RSA key provides roughly 112 bits of security due to the General Number Field Sieve attack. This is why 2048 bits is the minimum – anything less falls below accepted security thresholds.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">NIST compliance affects certifications</h4>
                  <p>
                    Government contractors and regulated industries must follow NIST guidelines. Using non-compliant key sizes can void security certifications and create compliance issues during audits.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Larger keys cost more CPU</h4>
                  <p>
                    Doubling key size doesn't double security – it roughly doubles computational cost. A 4096-bit key takes about 4-6x longer for operations than 2048-bit. For high-traffic servers, this latency adds up.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Quantum computers change the equation</h4>
                  <p>
                    Shor's algorithm could break RSA efficiently on a sufficiently large quantum computer. Current estimates suggest we need 4000+ qubits – we're at a few hundred today. But if you're encrypting data that needs to stay secret for 30+ years, consider post-quantum alternatives.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                RSA Key Size Guidelines
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Key Size</th>
                      <th className="text-left py-3 px-2 font-semibold">Security Bits</th>
                      <th className="text-left py-3 px-2 font-semibold">Status</th>
                      <th className="text-left py-3 px-2 font-semibold">Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 px-2">512 bits</td>
                      <td className="py-3 px-2">~64 bits</td>
                      <td className="py-3 px-2 text-red-600">Broken</td>
                      <td className="py-3 px-2">Academic only</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">1024 bits</td>
                      <td className="py-3 px-2">~80 bits</td>
                      <td className="py-3 px-2 text-red-600">Deprecated</td>
                      <td className="py-3 px-2">Legacy systems</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">2048 bits</td>
                      <td className="py-3 px-2">~112 bits</td>
                      <td className="py-3 px-2 text-amber-600">Minimum</td>
                      <td className="py-3 px-2">Current standard through 2030</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">3072 bits</td>
                      <td className="py-3 px-2">~128 bits</td>
                      <td className="py-3 px-2 text-green-600">Recommended</td>
                      <td className="py-3 px-2">New deployments, long-term security</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2">4096 bits</td>
                      <td className="py-3 px-2">~140 bits</td>
                      <td className="py-3 px-2 text-green-600">Strong</td>
                      <td className="py-3 px-2">High-security applications</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">8192 bits</td>
                      <td className="py-3 px-2">~160 bits</td>
                      <td className="py-3 px-2 text-blue-600">Maximum</td>
                      <td className="py-3 px-2">Extreme security, research</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Security bits are approximate and based on the General Number Field Sieve (GNFS) algorithm complexity.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Is 2048-bit RSA still secure in 2026?</h4>
                  <p>
                    Yes, 2048-bit RSA remains secure for most applications through 2030 according to NIST. No practical attacks exist against properly implemented 2048-bit keys. However, new systems should use 3072 bits for long-term security beyond 2030.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">How long would it take to crack a 2048-bit RSA key?</h4>
                  <p>
                    With current technology, factoring a 2048-bit RSA modulus would take millions of years using the best known classical algorithms. The record is 829 bits (factored in 2020). Even with massive computing clusters, 2048 bits remains out of reach.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What RSA key size does NIST recommend?</h4>
                  <p>
                    NIST SP 800-57 recommends 2048 bits as the minimum through 2030, and 3072 bits or higher for security beyond 2030. Federal agencies must follow these guidelines, and they're widely adopted in regulated industries.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Should I use RSA or ECC for new projects?</h4>
                  <p>
                    ECC (Elliptic Curve Cryptography) offers equivalent security with smaller keys – a 256-bit ECC key matches 3072-bit RSA. ECC is faster and uses less bandwidth. However, RSA has broader legacy support. For new systems, ECC or Ed25519 is often the better choice.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Will quantum computers break my RSA keys?</h4>
                  <p>
                    Eventually, yes – but not soon. Shor's algorithm can factor RSA efficiently on a quantum computer, but we'd need thousands of error-corrected qubits. Current quantum computers have a few hundred noisy qubits. If you need data to stay secret for 30+ years, consider post-quantum cryptography now.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
