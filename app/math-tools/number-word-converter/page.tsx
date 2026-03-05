"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function NumberWordConverter() {
  const [number, setNumber] = useState<string>("");
  const [words, setWords] = useState<string>("");
  const [currencyMode, setCurrencyMode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const ones: string[] = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"
  ];

  const tens: string[] = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
  ];

  const scales: string[] = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];

  const convertChunkToWords = (num: number): string => {
    if (num === 0) return "";
    
    let result = "";
    
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + " hundred";
      num %= 100;
      if (num > 0) result += " ";
    }
    
    if (num >= 20) {
      result += tens[Math.floor(num / 10)];
      if (num % 10 > 0) result += "-" + ones[num % 10];
    } else if (num > 0) {
      result += ones[num];
    }
    
    return result;
  };

  const numberToWords = (num: number): string => {
    if (num === 0) return "zero";
    
    const isNegative = num < 0;
    num = Math.abs(num);
    
    let result = "";
    let scaleIndex = 0;
    
    while (num > 0) {
      const chunk = num % 1000;
      if (chunk > 0) {
        const chunkWords = convertChunkToWords(chunk);
        const scale = scales[scaleIndex];
        const chunkWithScale = scale ? `${chunkWords} ${scale}` : chunkWords;
        
        if (result) {
          result = `${chunkWithScale} ${result}`;
        } else {
          result = chunkWithScale;
        }
      }
      
      num = Math.floor(num / 1000);
      scaleIndex++;
    }
    
    return isNegative ? "negative " + result : result;
  };

  const decimalToWords = (decimalStr: string): string => {
    const digits = decimalStr.split("").map(d => {
      const num = parseInt(d);
      return ones[num] || d;
    });
    
    return digits.join(" ");
  };

  const convertToCurrency = (num: number, decimalPart: string | null): string => {
    const dollars = Math.floor(num);
    const cents = decimalPart ? parseInt(decimalPart.padEnd(2, "0").slice(0, 2)) : 0;
    
    let result = "";
    
    if (dollars === 1) {
      result = "one dollar";
    } else {
      result = `${numberToWords(dollars)} dollars`;
    }
    
    if (cents > 0) {
      if (cents === 1) {
        result += " and one cent";
      } else {
        result += ` and ${numberToWords(cents)} cents`;
      }
    } else {
      result += " exactly";
    }
    
    return result;
  };

  const convert = () => {
    setError("");
    setWords("");

    if (!number.trim()) {
      setError("Please enter a number");
      return;
    }

    const numStr = number.trim().replace(/,/g, "");
    
    if (!/^-?\d+(\.\d+)?$/.test(numStr)) {
      setError("Please enter a valid number");
      return;
    }

    const num = parseFloat(numStr);
    
    if (isNaN(num)) {
      setError("Invalid number");
      return;
    }

    if (!isFinite(num)) {
      setError("Number is too large");
      return;
    }

    try {
      let result: string;

      if (currencyMode) {
        const parts = numStr.split(".");
        const decimalPart = parts[1] || null;
        result = convertToCurrency(Math.abs(num), decimalPart);
        if (num < 0) {
          result = "negative " + result;
        }
      } else {
        const parts = numStr.split(".");
        const integerPart = parseFloat(parts[0]);
        const decimalPart = parts[1];
        
        result = numberToWords(integerPart);
        
        if (decimalPart) {
          result += " point " + decimalToWords(decimalPart);
        }
      }

      setWords(result);
    } catch (e: any) {
      setError(e.message || "Conversion error");
    }
  };

  const reset = () => {
    setNumber("");
    setWords("");
    setError("");
  };

  const copyToClipboard = () => {
    if (words) {
      navigator.clipboard.writeText(words);
    }
  };

  const loadExample = (num: string) => {
    setNumber(num);
    setError("");
    setWords("");
  };

  const capitalizeFirst = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Number to Words Converter – Convert Numbers to English Words</h1>
        <p className="text-muted-foreground">
          Convert any number to its full English word representation with our free online number words converter. Supports millions, billions, and beyond – perfect for checks, documents, and more.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Number to Words Converter</CardTitle>
          <CardDescription>
            Enter a number to convert it to English words.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Number</Label>
              <Input
                type="text"
                placeholder="e.g., 1234567.89"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && convert()}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Accepts positive and negative integers and decimals
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="currency-mode"
                checked={currencyMode}
                onCheckedChange={setCurrencyMode}
              />
              <Label htmlFor="currency-mode">Currency mode (dollars and cents)</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={convert}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
              {words && (
                <Button variant="outline" onClick={copyToClipboard}>Copy</Button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("42")}>42</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("1234567")}>1,234,567</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("3.14159")}>3.14159</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("-999")}>-999</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("1000000000")}>1 billion</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {words && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Result</p>
                  <p className="text-xl font-medium leading-relaxed">
                    {capitalizeFirst(words)}
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Formats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lowercase:</span>
                      <span className="font-mono text-xs">{words}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title Case:</span>
                      <span className="font-mono text-xs">{words.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">UPPERCASE:</span>
                      <span className="font-mono text-xs">{words.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                {number.includes(".") && !currencyMode && (
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Integer part:</span>
                        <span>{numberToWords(Math.floor(Math.abs(parseFloat(number))))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Decimal part:</span>
                        <span>{decimalToWords(number.split(".")[1])}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Number to Words Converter – Convert Numbers to English Words</h2>
          <p className="text-muted-foreground">
            Writing out numbers in words comes up more often than you'd think. Filling out checks, writing legal documents, creating formal invitations, or spelling out amounts in contracts – all require numbers in word form. This converter handles everything from simple integers to large numbers with decimals.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Toggle currency mode to get dollar and cent amounts formatted correctly for checks and financial documents. The converter handles negative numbers, decimals, and values up into the quintillions.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Number Word Patterns</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">1-20: Unique Names</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-mono text-xs">1 → one</div>
              <div className="font-mono text-xs">11 → eleven</div>
              <div className="font-mono text-xs">2 → two</div>
              <div className="font-mono text-xs">12 → twelve</div>
              <div className="font-mono text-xs">3 → three</div>
              <div className="font-mono text-xs">13 → thirteen</div>
              <div className="font-mono text-xs">4 → four</div>
              <div className="font-mono text-xs">14 → fourteen</div>
              <div className="font-mono text-xs">5 → five</div>
              <div className="font-mono text-xs">15 → fifteen</div>
              <div className="font-mono text-xs">10 → ten</div>
              <div className="font-mono text-xs">20 → twenty</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Tens: -ty Suffix</h4>
            <div className="space-y-2 text-sm">
              <div className="font-mono text-xs">20 → twenty</div>
              <div className="font-mono text-xs">30 → thirty</div>
              <div className="font-mono text-xs">40 → forty (not fourty)</div>
              <div className="font-mono text-xs">50 → fifty</div>
              <div className="font-mono text-xs">60 → sixty</div>
              <div className="font-mono text-xs">90 → ninety</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Large Number Scales</h3>
        <div className="p-4 bg-muted rounded-lg">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between p-2 border rounded">
                <span>1,000</span>
                <span className="text-muted-foreground">thousand</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>1,000,000</span>
                <span className="text-muted-foreground">million</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>1,000,000,000</span>
                <span className="text-muted-foreground">billion</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>1,000,000,000,000</span>
                <span className="text-muted-foreground">trillion</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between p-2 border rounded">
                <span>10^15</span>
                <span className="text-muted-foreground">quadrillion</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>10^18</span>
                <span className="text-muted-foreground">quintillion</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>10^21</span>
                <span className="text-muted-foreground">sextillion</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>10^24</span>
                <span className="text-muted-foreground">septillion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Examples</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Small numbers</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              7 → seven | 15 → fifteen | 100 → one hundred
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Compound numbers</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              21 → twenty-one | 99 → ninety-nine | 101 → one hundred one
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Large numbers</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              1,234 → one thousand two hundred thirty-four
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Decimals</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              3.14 → three point one four | 0.5 → zero point five
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Currency</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              $123.45 → one hundred twenty-three dollars and forty-five cents
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Negative numbers</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              -42 → negative forty-two
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Writing Numbers on Checks</h3>
        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold text-sm mb-3">Standard Check Format</h4>
          <p className="text-sm text-muted-foreground mb-4">
            When writing amounts on checks, use currency mode. The converter formats dollars and cents correctly, adding "exactly" for whole dollar amounts.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded">
              <div className="text-xs text-muted-foreground mb-1">$1,234.56</div>
              <div className="font-mono text-sm">One thousand two hundred thirty-four dollars and fifty-six cents</div>
            </div>
            <div className="p-3 bg-muted rounded">
              <div className="text-xs text-muted-foreground mb-1">$50.00</div>
              <div className="font-mono text-sm">Fifty dollars exactly</div>
            </div>
            <div className="p-3 bg-muted rounded">
              <div className="text-xs text-muted-foreground mb-1">$0.99</div>
              <div className="font-mono text-sm">Zero dollars and ninety-nine cents</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I use hyphens?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, for compound numbers 21-99. Write "twenty-one" not "twenty one". This converter includes hyphens automatically. The exception is when writing checks – some banks prefer no hyphens.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is it "and" or no "and"?</h4>
            <p className="text-sm text-muted-foreground">
              In American English, "and" typically appears only before the decimal part or cents. "One hundred twenty-three" not "one hundred and twenty-three". British English often includes "and". This converter follows American convention.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I write decimal numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Read each digit individually after the decimal point. 3.14159 becomes "three point one four one five nine" – not "three point one hundred forty-one thousand five hundred ninety".
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the largest number you can convert?</h4>
            <p className="text-sm text-muted-foreground">
              JavaScript safely handles integers up to about 9 quadrillion. Beyond that, precision issues may occur. For most practical purposes – checks, documents, everyday numbers – this is more than enough.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this for legal documents?</h4>
            <p className="text-sm text-muted-foreground">
              The converter produces standard English number words suitable for most documents. However, always verify against your specific requirements. Some legal contexts have particular formatting rules.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/roman-numeral-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Roman Numeral Converter</p>
            <p className="text-xs text-muted-foreground">Numbers to Roman numerals</p>
          </a>
          <a href="/math-tools/standard-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Standard Calculator</p>
            <p className="text-xs text-muted-foreground">Basic arithmetic</p>
          </a>
          <a href="/math-tools/decimal-to-fraction-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Decimal to Fraction Converter</p>
            <p className="text-xs text-muted-foreground">Decimal to fraction</p>
          </a>
        </div>
      </section>
    </div>
  );
}
