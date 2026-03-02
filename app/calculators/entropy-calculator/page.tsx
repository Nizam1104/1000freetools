"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface EntropyResult {
  entropy: number;
  crackTime: string;
  strength: "Very Weak" | "Weak" | "Moderate" | "Strong" | "Very Strong";
  characterSetSize: number;
}

export default function EntropyCalculatorPage() {
  const [password, setPassword] = useState<string>("");
  const [customCharset, setCustomCharset] = useState<string>("");
  const [useCustomCharset, setUseCustomCharset] = useState<boolean>(false);
  const [result, setResult] = useState<EntropyResult | null>(null);
  const [crackTimeSeconds, setCrackTimeSeconds] = useState<number>(0);

  const getCharsetSize = (str: string): number => {
    let size = 0;
    if (/[a-z]/.test(str)) size += 26;
    if (/[A-Z]/.test(str)) size += 26;
    if (/[0-9]/.test(str)) size += 10;
    if (/[^a-zA-Z0-9]/.test(str)) size += 32;
    return size || 1;
  };

  const calculateEntropy = () => {
    if (!password) {
      setResult(null);
      setCrackTimeSeconds(0);
      return;
    }

    const charsetSize = useCustomCharset
      ? Math.max(customCharset.length, 1)
      : getCharsetSize(password);

    const entropy = password.length * Math.log2(charsetSize);

    const guessesPerSecond = 1e12;
    const totalCombinations = Math.pow(2, entropy);
    const secondsToCrack = totalCombinations / guessesPerSecond;

    let strength: EntropyResult["strength"];
    if (entropy < 28) strength = "Very Weak";
    else if (entropy < 36) strength = "Weak";
    else if (entropy < 60) strength = "Moderate";
    else if (entropy < 80) strength = "Strong";
    else strength = "Very Strong";

    setResult({
      entropy: Math.round(entropy * 100) / 100,
      crackTime: formatTime(secondsToCrack),
      strength,
      characterSetSize: charsetSize,
    });
    setCrackTimeSeconds(secondsToCrack);
  };

  const formatTime = (seconds: number): string => {
    if (seconds < 1) return "Instantly";
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
    if (seconds < 31536000000) return `${(seconds / 31536000).toFixed(1)} years`;
    if (seconds < 31536000000000) return `${(seconds / 31536000000).toFixed(1)} thousand years`;
    if (seconds < 31536000000000000) return `${(seconds / 31536000000000).toFixed(1)} million years`;
    return "Centuries";
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "Very Weak": return "bg-destructive";
      case "Weak": return "bg-orange-500";
      case "Moderate": return "bg-yellow-500";
      case "Strong": return "bg-lime-500";
      case "Very Strong": return "bg-green-500";
      default: return "bg-muted";
    }
  };

  const generatePassword = (length: number, options: { lowercase: boolean; uppercase: boolean; numbers: boolean; symbols: boolean }) => {
    let chars = "";
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleGenerateAndCalculate = (length: number) => {
    const newPassword = generatePassword(length, {
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true,
    });
    setPassword(newPassword);
  };

  useEffect(() => {
    calculateEntropy();
  }, [password, useCustomCharset, customCharset]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Entropy Calculator – Calculate Password & Data Entropy in Bits</h1>
          <p className="text-muted-foreground">
            Measure the true randomness and security of your passwords with our Entropy Calculator. Enter your password or data string to calculate entropy in bits — helping security professionals and developers assess cryptographic strength.
          </p>
        </div>

        <Tabs defaultValue="password" className="mb-6">
          <TabsList>
            <TabsTrigger value="password">Password Entropy</TabsTrigger>
            <TabsTrigger value="data">Data Entropy</TabsTrigger>
          </TabsList>

          <TabsContent value="password">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password or Passphrase</Label>
                    <Input
                      id="password"
                      type="text"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Quick Generate</Label>
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" size="sm" onClick={() => handleGenerateAndCalculate(8)}>8 chars</Button>
                      <Button variant="outline" size="sm" onClick={() => handleGenerateAndCalculate(12)}>12 chars</Button>
                      <Button variant="outline" size="sm" onClick={() => handleGenerateAndCalculate(16)}>16 chars</Button>
                      <Button variant="outline" size="sm" onClick={() => handleGenerateAndCalculate(20)}>20 chars</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="custom-charset">Use Custom Character Set</Label>
                      <input
                        type="checkbox"
                        checked={useCustomCharset}
                        onChange={(e) => setUseCustomCharset(e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>
                    {useCustomCharset && (
                      <Input
                        id="custom-charset"
                        type="text"
                        placeholder="e.g., abc123"
                        value={customCharset}
                        onChange={(e) => setCustomCharset(e.target.value)}
                      />
                    )}
                  </div>

                  <div className="pt-4">
                    <Button onClick={calculateEntropy} className="w-full">
                      Calculate Entropy
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Results</h3>
                  {result ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">Entropy</p>
                        <p className="text-3xl font-bold text-primary">{result.entropy} bits</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Strength</span>
                          <span className="font-medium">{result.strength}</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getStrengthColor(result.strength)} transition-all duration-300`}
                            style={{ width: `${Math.min((result.entropy / 100) * 100, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Time to Crack (at 1 trillion guesses/sec)</p>
                        <p className="text-xl font-bold">{result.crackTime}</p>
                      </div>

                      <div className="text-sm text-muted-foreground pt-4 border-t">
                        <p>Character Set Size: {result.characterSetSize}</p>
                        <p className="mt-1">Formula: Entropy = L × log₂(N)</p>
                        <p className="text-xs mt-1">Where L = length, N = character set size</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Enter a password and click Calculate to see entropy analysis</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="data-input">Data String</Label>
                  <textarea
                    id="data-input"
                    className="w-full min-h-[150px] p-3 border rounded-md font-mono text-sm"
                    placeholder="Enter data string to calculate Shannon entropy"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button onClick={calculateEntropy} className="w-full">
                  Calculate Shannon Entropy
                </Button>

                {result && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Shannon Entropy</p>
                    <p className="text-3xl font-bold text-primary">{result.entropy} bits</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Per character: {(result.entropy / Math.max(password.length, 1)).toFixed(4)} bits/char
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">About Password Entropy</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Entropy</strong> measures the randomness and unpredictability of a password. Higher entropy means better security against brute-force attacks.
              </p>
              <p>
                <strong>Formula:</strong> Entropy = L × log₂(N), where L is password length and N is the size of the character set.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium">Character Set Sizes:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Lowercase only: 26</li>
                    <li>• + Uppercase: 52</li>
                    <li>• + Numbers: 62</li>
                    <li>• + Symbols: ~94</li>
                  </ul>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium">Entropy Guidelines:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• &lt; 28 bits: Very Weak</li>
                    <li>• 28-36 bits: Weak</li>
                    <li>• 36-60 bits: Moderate</li>
                    <li>• 60-80 bits: Strong</li>
                    <li>• &gt; 80 bits: Very Strong</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
