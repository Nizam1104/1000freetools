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

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">How to Use This AES Key Size Estimator</h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <p className="font-medium text-foreground">Select your AES key size</p>
                    <p>Choose from AES-128, AES-192, or AES-256 from the dropdown menu based on your encryption requirements.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <p className="font-medium text-foreground">Click Calculate</p>
                    <p>The estimator will show you the total possible keys, brute force time estimates, and security level for your selection.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <p className="font-medium text-foreground">Review the analysis</p>
                    <p>Check the security recommendations and scale comparisons to understand how your key size stacks up against real-world benchmarks.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Understanding AES Encryption</h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  <strong>AES</strong> stands for <strong>Advanced Encryption Standard</strong>. It's a symmetric encryption algorithm adopted by the U.S. government in 2001 and has since become the global standard for securing sensitive data. AES is used everywhere - from securing your HTTPS connections to encrypting files on your hard drive.
                </p>
                <p>
                  AES comes in three key sizes: <strong>128 bits</strong>, <strong>192 bits</strong>, and <strong>256 bits</strong>. The key size directly determines how many possible encryption keys exist. A larger key means more possible combinations, making brute force attacks exponentially harder.
                </p>
                <p>
                  The relationship between key size and security isn't linear - it's exponential. Each additional bit doubles the number of possible keys. AES also uses a different number of encryption rounds based on key size: AES-128 uses 10 rounds, AES-192 uses 12 rounds, and AES-256 uses 14 rounds. More rounds mean more layers of transformation applied to your data.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">AES Key Size Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Variant</th>
                      <th className="text-left py-3 px-2 font-semibold">Key Size</th>
                      <th className="text-left py-3 px-2 font-semibold">Rounds</th>
                      <th className="text-left py-3 px-2 font-semibold">Security Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">AES-128</td>
                      <td className="py-3 px-2">128 bits</td>
                      <td className="py-3 px-2">10 rounds</td>
                      <td className="py-3 px-2">128 bits</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">AES-192</td>
                      <td className="py-3 px-2">192 bits</td>
                      <td className="py-3 px-2">12 rounds</td>
                      <td className="py-3 px-2">192 bits</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium">AES-256</td>
                      <td className="py-3 px-2">256 bits</td>
                      <td className="py-3 px-2">14 rounds</td>
                      <td className="py-3 px-2">256 bits</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Brute Force Attack Time Estimates</h2>
              <p className="text-sm text-muted-foreground mb-4">
                These estimates assume an optimistic quantum computer capable of testing 1 trillion keys per second. Classical computers would take vastly longer.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">AES Variant</th>
                      <th className="text-left py-3 px-2 font-semibold">Key Combinations</th>
                      <th className="text-left py-3 px-2 font-semibold">Time to Crack</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">AES-128</td>
                      <td className="py-3 px-2 font-mono">2<sup>128</sup></td>
                      <td className="py-3 px-2">Billions of years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">AES-192</td>
                      <td className="py-3 px-2 font-mono">2<sup>192</sup></td>
                      <td className="py-3 px-2">Incomprehensibly long (10<sup>28</sup>+ years)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium">AES-256</td>
                      <td className="py-3 px-2 font-mono">2<sup>256</sup></td>
                      <td className="py-3 px-2">Longer than the age of the universe</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                For perspective: the age of the universe is approximately 13.8 billion years (4.3 × 10<sup>17</sup> seconds).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Choosing the Right Key Size</h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">AES-128: Commercial Use</h3>
                  <p className="text-sm text-muted-foreground">
                    Best for general encryption needs, commercial applications, and everyday data protection. AES-128 provides strong security against all known classical computer attacks. It's faster than larger key sizes and sufficient for most use cases including SSL/TLS, file encryption, and secure communications.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">AES-192: Government Use</h3>
                  <p className="text-sm text-muted-foreground">
                    Designed for higher security requirements and government applications. AES-192 offers a middle ground between AES-128 and AES-256. It's less commonly used in practice but provides additional security margin for sensitive but not top-secret information.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">AES-256: Maximum Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Required for top-secret data and maximum security applications. AES-256 is approved by the NSA for protecting classified information up to TOP SECRET level. It provides the highest security margin and is considered resistant to attacks from future quantum computers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">What is the difference between AES-128 and AES-256?</h3>
                  <p className="text-sm text-muted-foreground">
                    The main difference is key length and the number of encryption rounds. AES-128 uses a 128-bit key with 10 rounds, while AES-256 uses a 256-bit key with 14 rounds. AES-256 has exponentially more possible keys (2<sup>256</sup> vs 2<sup>128</sup>) and provides better protection against future quantum computing threats. However, AES-128 is slightly faster and still considered secure for most applications.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Is AES-256 more secure than AES-128?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, AES-256 is technically more secure due to its larger key size and additional encryption rounds. However, both are currently unbreakable using classical computers. The practical security difference only matters for long-term data protection against potential future quantum computers or for protecting highly classified government information.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">How long would it take to crack AES encryption?</h3>
                  <p className="text-sm text-muted-foreground">
                    With current technology, cracking AES through brute force is practically impossible. Even with an optimistic quantum computer testing 1 trillion keys per second, AES-128 would take billions of years to crack. AES-256 would take longer than the current age of the universe. The only realistic way to "crack" AES is through poor key management, implementation flaws, or side-channel attacks - not brute force.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Which AES key size should I use?</h3>
                  <p className="text-sm text-muted-foreground">
                    For most applications, AES-128 provides adequate security with better performance. Choose AES-256 if you're protecting highly sensitive data that needs long-term security, if you're concerned about future quantum computers, or if compliance requirements mandate it (such as government classified data). AES-192 is rarely needed unless specific regulations require it.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Is AES encryption unbreakable?</h3>
                  <p className="text-sm text-muted-foreground">
                    AES itself has never been broken through mathematical attacks. No practical method exists to crack properly implemented AES encryption through brute force with current or foreseeable technology. However, "unbreakable" is a strong word - vulnerabilities can exist in implementations, key management practices, or through side-channel attacks. The algorithm is sound, but real-world security depends on proper implementation and key handling.
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
