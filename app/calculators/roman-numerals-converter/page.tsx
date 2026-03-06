"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RomanNumeralsConverter() {
  const [value, setValue] = useState<string>("");
  const [mode, setMode] = useState<"toRoman" | "fromRoman">("toRoman");
  const [result, setResult] = useState<string>("");

  const toRoman = (num: number): string => {
    const romanNumerals: [number, string][] = [
      [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
      [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
      [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
    ];
    
    let result = "";
    for (const [value, symbol] of romanNumerals) {
      while (num >= value) {
        result += symbol;
        num -= value;
      }
    }
    return result;
  };

  const fromRoman = (roman: string): number => {
    const romanValues: Record<string, number> = {
      I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    };
    
    let result = 0;
    let prevValue = 0;
    
    for (let i = roman.length - 1; i >= 0; i--) {
      const value = romanValues[roman[i].toUpperCase()];
      if (value < prevValue) {
        result -= value;
      } else {
        result += value;
      }
      prevValue = value;
    }
    
    return result;
  };

  const calculate = () => {
    if (mode === "toRoman") {
      const num = parseInt(value);
      if (!isNaN(num) && num > 0 && num < 4000) {
        setResult(toRoman(num));
      }
    } else {
      const num = fromRoman(value);
      if (num > 0) {
        setResult(num.toString());
      }
    }
  };

  const reset = () => {
    setValue("");
    setResult("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={mode === "toRoman" ? "default" : "outline"}
                onClick={() => { setMode("toRoman"); setResult(""); }}
              >
                Decimal → Roman
              </Button>
              <Button
                variant={mode === "fromRoman" ? "default" : "outline"}
                onClick={() => { setMode("fromRoman"); setResult(""); }}
              >
                Roman → Decimal
              </Button>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                {mode === "toRoman" ? "Decimal Number (1-3999)" : "Roman Numerals"}
              </label>
              <Input
                type={mode === "toRoman" ? "number" : "text"}
                placeholder={mode === "toRoman" ? "e.g., 2024" : "e.g., MMXXIV"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Roman Numerals Converter
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Choose conversion direction</p>
                  <p>Select whether you want to convert a decimal number to Roman numerals or convert Roman numerals back to decimal.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter your value</p>
                  <p>Type a decimal number between 1 and 3999, or enter Roman numerals like MMXXIV for 2024.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Get your result</p>
                  <p>Click Convert to see the converted value instantly. No sign-up required, results display right on the page.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Roman Numeral Reference Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Roman Numeral</th>
                    <th className="text-left py-3 px-2 font-semibold">Decimal Value</th>
                    <th className="text-left py-3 px-2 font-semibold">Roman Numeral</th>
                    <th className="text-left py-3 px-2 font-semibold">Decimal Value</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2 font-semibold">I</td>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2 font-semibold">L</td>
                    <td className="py-3 px-2">50</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2 font-semibold">V</td>
                    <td className="py-3 px-2">5</td>
                    <td className="py-3 px-2 font-semibold">C</td>
                    <td className="py-3 px-2">100</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2 font-semibold">X</td>
                    <td className="py-3 px-2">10</td>
                    <td className="py-3 px-2 font-semibold">D</td>
                    <td className="py-3 px-2">500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2 font-semibold">M</td>
                    <td className="py-3 px-2">1000</td>
                    <td className="py-3 px-2 font-semibold">MM</td>
                    <td className="py-3 px-2">2000</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-semibold">MMM</td>
                    <td className="py-3 px-2">3000</td>
                    <td className="py-3 px-2 font-semibold">MMMCMXCIX</td>
                    <td className="py-3 px-2">3999</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Standard Roman numerals only support values from 1 to 3999. Larger numbers require special notation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Roman Numerals
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Roman numerals use seven letters from the Latin alphabet to represent values: I (1), V (5), X (10), L (50), C (100), D (500), and M (1000). Unlike our decimal system, Roman numerals combine these letters using addition and subtraction rules.
              </p>
              <p>
                The subtractive principle is key to reading Roman numerals correctly. When a smaller value appears before a larger one, you subtract it. IV means 4 (5 minus 1), not 6. Similarly, IX is 9, XL is 40, and CM is 900. This rule prevents four identical letters in a row — you write IV instead of IIII.
              </p>
              <p>
                Roman numerals still appear in everyday life: movie copyright dates, clock faces, book chapter numbers, Super Bowl numbering, and monarch names like Queen Elizabeth II. Understanding the system helps you decode these at a glance.
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Historical note:</strong> The Romans themselves didn&apos;t always follow strict rules. You might see IIII on clock faces instead of IV — this is called the &quot;watchmaker&apos;s four&quot; and was used for visual balance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Tips for Reading and Writing Roman Numerals
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Break it into groups</h4>
                <p>
                  Read Roman numerals from left to right, grouping subtractive pairs first. For MMXXIV: MM (2000) + XX (20) + IV (4) = 2024. This chunking approach makes large numbers manageable.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Know the subtractive combinations</h4>
                <p>
                  Only six subtractive combinations exist: IV (4), IX (9), XL (40), XC (90), CD (400), and CM (900). Memorizing these makes conversion much faster.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Watch for invalid forms</h4>
                <p>
                  You cannot repeat I, X, C, or M more than three times in a row. V, L, and D never repeat. IV is valid; IIII is not standard. VX is invalid — you cannot subtract V from anything.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Use this converter for verification</h4>
                <p>
                  When learning Roman numerals, convert back and forth to check your work. This tool handles all valid combinations from 1 to 3999 instantly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Why does Roman numerals stop at 3999?</h4>
                <p>
                  Standard Roman numeral notation has no symbol for 5000 or 10000. The Romans used special marks (vinculum bars) over letters to multiply by 1000, but these aren&apos;t supported in plain text. Our converter handles 1-3999, which covers most practical uses.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Is IIII or IV correct for 4?</h4>
                <p>
                  IV is the standard subtractive form. IIII appears on some clock faces for visual symmetry — it balances VIII on the opposite side. Both are readable, but IV follows the formal rules.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How do you write zero in Roman numerals?</h4>
                <p>
                  You don&apos;t. The Romans had no concept of zero as a number. Their system was for counting and measuring, not abstract mathematics. Medieval scholars later used &quot;N&quot; (from nulla) for zero in some contexts.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can Roman numerals have lowercase letters?</h4>
                <p>
                  Yes, lowercase roman numerals exist (i, v, x, l, c, d, m) and follow the same rules. They&apos;re often used for page numbers, outlines, and introductory sections. This converter accepts both cases.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What&apos;s the longest Roman numeral under 4000?</h4>
                <p>
                  3888 (MMMDCCCLXXXVIII) uses 15 characters — the maximum for standard notation. Numbers with many 8s require the most letters since 8 is VIII (four characters).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Related Tools
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="/calculators/number-to-words-converter"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Number to Words Converter</span>
                <p className="text-muted-foreground">Convert numbers to written English words</p>
              </a>
              <a
                href="/calculators/base-converter"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Base Converter Calculator</span>
                <p className="text-muted-foreground">Convert between binary, decimal, hex, and other bases</p>
              </a>
              <a
                href="/calculators/fraction-to-decimal-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Fraction to Decimal Calculator</span>
                <p className="text-muted-foreground">Convert fractions to decimal numbers instantly</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
