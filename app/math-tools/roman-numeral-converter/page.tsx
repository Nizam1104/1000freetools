"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RomanNumeralConverter() {
  const [numberInput, setNumberInput] = useState<string>("");
  const [romanInput, setRomanInput] = useState<string>("");
  const [result, setResult] = useState<{ value: string; steps?: string[] } | null>(null);
  const [error, setError] = useState<string>("");

  const romanValues = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  const romanMap: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
    i: 1, v: 5, x: 10, l: 50, c: 100, d: 500, m: 1000,
  };

  const toRoman = (num: number): { result: string; steps: string[] } => {
    if (num <= 0 || num > 3999) {
      throw new Error("Number must be between 1 and 3999");
    }

    let result = "";
    const steps: string[] = [];
    let remaining = num;

    for (const { value, symbol } of romanValues) {
      while (remaining >= value) {
        result += symbol;
        steps.push(`${remaining} - ${value} = ${remaining - value} → Add "${symbol}"`);
        remaining -= value;
      }
    }

    return { result, steps };
  };

  const toNumber = (roman: string): { result: number; steps: string[] } => {
    const cleanRoman = roman.toUpperCase().replace(/\s/g, "");
    
    if (!cleanRoman) {
      throw new Error("Please enter a Roman numeral");
    }

    for (const char of cleanRoman) {
      if (!romanMap[char]) {
        throw new Error(`Invalid Roman numeral character: ${char}`);
      }
    }

    let result = 0;
    const steps: string[] = [];
    let prevValue = 0;

    for (let i = cleanRoman.length - 1; i >= 0; i--) {
      const char = cleanRoman[i];
      const value = romanMap[char];

      if (value < prevValue) {
        result -= value;
        steps.push(`"${char}" (${value}) < previous → Subtract: ${result}`);
      } else {
        result += value;
        steps.push(`"${char}" (${value}) ≥ previous → Add: ${result}`);
      }
      prevValue = value;
    }

    return { result, steps };
  };

  const convertNumberToRoman = () => {
    setError("");
    setResult(null);
    
    const num = parseInt(numberInput);
    if (isNaN(num)) {
      setError("Please enter a valid number");
      return;
    }

    try {
      const { result: roman, steps } = toRoman(num);
      setResult({ value: roman, steps });
    } catch (e: any) {
      setError(e.message);
    }
  };

  const convertRomanToNumber = () => {
    setError("");
    setResult(null);
    
    if (!romanInput.trim()) {
      setError("Please enter a Roman numeral");
      return;
    }

    try {
      const { result: num, steps } = toNumber(romanInput);
      setResult({ value: num.toString(), steps });
    } catch (e: any) {
      setError(e.message);
    }
  };

  const reset = () => {
    setNumberInput("");
    setRomanInput("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Roman Numeral Converter – Convert Numbers to Roman Numerals</h1>
        <p className="text-muted-foreground">
          Convert any integer to Roman numerals or translate Roman numerals back to numbers with our free online Roman numeral converter. Instant, accurate conversions for any value.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Roman Numeral Converter</CardTitle>
          <CardDescription>
            Convert between numbers and Roman numerals instantly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Tabs defaultValue="number-to-roman" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="number-to-roman">Number → Roman</TabsTrigger>
                <TabsTrigger value="roman-to-number">Roman → Number</TabsTrigger>
              </TabsList>

              <TabsContent value="number-to-roman" className="space-y-4">
                <div>
                  <Label>Enter a number (1-3999)</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 2024"
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && convertNumberToRoman()}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={convertNumberToRoman}>Convert to Roman</Button>
                  <Button variant="outline" onClick={reset}>Reset</Button>
                </div>
              </TabsContent>

              <TabsContent value="roman-to-number" className="space-y-4">
                <div>
                  <Label>Enter a Roman numeral</Label>
                  <Input
                    type="text"
                    placeholder="e.g., MMXXIV"
                    value={romanInput}
                    onChange={(e) => setRomanInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && convertRomanToNumber()}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={convertRomanToNumber}>Convert to Number</Button>
                  <Button variant="outline" onClick={reset}>Reset</Button>
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Result</p>
                  <p className="text-5xl font-bold tracking-wider">{result.value}</p>
                </div>

                {result.steps && (
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-3">Conversion Steps</h4>
                    <div className="space-y-1 text-sm font-mono max-h-64 overflow-y-auto">
                      {result.steps.map((step, i) => (
                        <div key={i} className="text-muted-foreground">
                          {step}
                        </div>
                      ))}
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
          <h2 className="text-2xl font-semibold mb-3">Roman Numeral Converter – Convert Numbers to Roman Numerals</h2>
          <p className="text-muted-foreground">
            Convert any number to Roman numerals instantly with our free online converter. Whether you need to translate a date, decode a historical inscription, or understand the Roman numeral system, this tool handles both directions: numbers to Roman numerals and Roman numerals back to numbers.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Roman numerals use seven letters from the Latin alphabet: I, V, X, L, C, D, and M. Each represents a specific value. The system combines these letters using additive and subtractive rules. When a smaller value appears before a larger one, you subtract it (like IV for 4). Otherwise, you add the values together (like VI for 6).
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            The converter shows every step of the conversion process. For number to Roman conversions, you see how the algorithm breaks down the number using the standard Roman numeral values. For Roman to number conversions, you can follow how each character contributes to the final result, with subtraction rules applied where needed.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Roman Numeral Reference Chart</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { roman: "I", number: 1 },
            { roman: "V", number: 5 },
            { roman: "X", number: 10 },
            { roman: "L", number: 50 },
            { roman: "C", number: 100 },
            { roman: "D", number: 500 },
            { roman: "M", number: 1000 },
          ].map((item) => (
            <div key={item.roman} className="p-4 border rounded-lg text-center">
              <p className="text-2xl font-bold mb-1">{item.roman}</p>
              <p className="text-sm text-muted-foreground">= {item.number}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Roman Numerals</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { roman: "IV", number: 4, label: "Subtractive notation" },
            { roman: "IX", number: 9, label: "One before ten" },
            { roman: "XIV", number: 14, label: "10 + 4" },
            { roman: "XIX", number: 19, label: "10 + 9" },
            { roman: "XL", number: 40, label: "50 - 10" },
            { roman: "XC", number: 90, label: "100 - 10" },
            { roman: "CML", number: 950, label: "900 + 50" },
            { roman: "MCMXCIX", number: 1999, label: "1000 + 900 + 90 + 9" },
            { roman: "MMXXIV", number: 2024, label: "Current year" },
            { roman: "MMXXV", number: 2025, label: "Next year" },
          ].map((item) => (
            <div key={item.roman} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-bold">{item.roman}</span>
                <span className="text-lg text-muted-foreground">= {item.number}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How Roman Numeral Conversion Works</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-3">Number to Roman Numerals</h4>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Start with the largest Roman numeral value (M = 1000)</li>
              <li>Divide the number by that value</li>
              <li>Add the corresponding symbol for each whole division</li>
              <li>Subtract and move to the next smaller value</li>
              <li>Repeat until the number reaches zero</li>
            </ol>
            <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">
              2024 → MM (2000) + XX (20) + IV (4) = MMXXIV
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-3">Roman Numerals to Number</h4>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Read from right to left</li>
              <li>If a symbol is smaller than the one after it, subtract it</li>
              <li>Otherwise, add the symbol's value</li>
              <li>Sum all values for the final result</li>
            </ol>
            <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">
              MCMXCIX → 1000 + 900 + 90 + 9 = 1999
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Where You'll See Roman Numerals</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Clocks and Watches</h4>
            <p className="text-xs text-muted-foreground">
              Many analog clocks use Roman numerals for the hour markers. You'll often see IIII instead of IV for 4 o'clock – a tradition dating back to early clockmaking.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Movie Copyright Dates</h4>
            <p className="text-xs text-muted-foreground">
              Films traditionally display their copyright year in Roman numerals at the end of credits. MMXXIV means the movie was copyrighted in 2024.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Book Chapters and Outlines</h4>
            <p className="text-xs text-muted-foreground">
              Academic papers and books often use Roman numerals for preliminary pages (i, ii, iii...) and major section headings.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Monarchs and Popes</h4>
            <p className="text-xs text-muted-foreground">
              Royal succession uses Roman numerals: Queen Elizabeth II, Pope Benedict XVI, King Louis XIV of France.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Sports Events</h4>
            <p className="text-xs text-muted-foreground">
              The Super Bowl uses Roman numerals for each game. Super Bowl LVIII was the 58th Super Bowl.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Building Cornerstones</h4>
            <p className="text-xs text-muted-foreground">
              Historical buildings often display their construction year in Roman numerals on cornerstones or facades.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Roman Numeral Rules</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Basic Symbols</h4>
            <p className="text-sm text-muted-foreground">
              Seven letters form all Roman numerals: I (1), V (5), X (10), L (50), C (100), D (500), M (1000). No symbol repeats more than three times in a row. That's why 4 is IV, not IIII.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Subtractive Notation</h4>
            <p className="text-sm text-muted-foreground">
              Only I, X, and C can be used subtractively. I can precede V and X (IV = 4, IX = 9). X can precede L and C (XL = 40, XC = 90). C can precede D and M (CD = 400, CM = 900).
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Standard Form</h4>
            <p className="text-sm text-muted-foreground">
              Write symbols from largest to smallest, left to right. The subtractive pairs (IV, IX, XL, XC, CD, CM) are the only exceptions where a smaller value comes before a larger one.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Range Limitation</h4>
            <p className="text-sm text-muted-foreground">
              Standard Roman numerals work for 1 to 3999. The Romans didn't have a standard symbol for 5000 or higher in everyday use. This converter handles that full range.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is 4 sometimes IIII instead of IV?</h4>
            <p className="text-sm text-muted-foreground">
              Both forms exist. IV is the standard subtractive notation. IIII appears on some clock faces – possibly for visual symmetry with VIII on the opposite side, or because early clockmakers preferred four characters per quadrant.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the largest Roman numeral?</h4>
            <p className="text-sm text-muted-foreground">
              In standard form, MMMCMXCIX (3999) is the largest. The Romans sometimes used bars over symbols to multiply by 1000, but that's non-standard. This converter sticks to the conventional 1-3999 range.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is there a Roman numeral for zero?</h4>
            <p className="text-sm text-muted-foreground">
              No. The Roman numeral system developed before the concept of zero reached Europe. The Romans had no symbol or need for zero in their counting system.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I write my birth year in Roman numerals?</h4>
            <p className="text-sm text-muted-foreground">
              Enter your birth year in the Number to Roman converter above. For 1985: MCMLXXXV. For 2000: MM. For 1999: MCMXCIX.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can Roman numerals be lowercase?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, though uppercase is more common. Lowercase roman numerals (i, v, x, l, c, d, m) work the same way. This converter accepts both and displays results in uppercase.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why use Roman numerals today?</h4>
            <p className="text-sm text-muted-foreground">
              They add a classical, formal feel. You'll see them on monuments, in legal documents, for ceremonial events, and anywhere tradition matters. They're also useful for distinguishing different levels of headings or lists.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
