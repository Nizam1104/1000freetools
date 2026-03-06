"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignificantFiguresCalculator() {
  const [number, setNumber] = useState<string>("");
  const [targetSigFigs, setTargetSigFigs] = useState<string>("3");
  const [countResult, setCountResult] = useState<{ count: number; digits: string[]; explanation: string } | null>(null);
  const [roundResult, setRoundResult] = useState<{ rounded: string; original: string; sigFigs: number } | null>(null);
  const [error, setError] = useState<string>("");

  const countSignificantFigures = (numStr: string): { count: number; digits: string[]; explanation: string } => {
    const clean = numStr.trim().toLowerCase();
    
    if (!clean) {
      throw new Error("Please enter a number");
    }

    const num = parseFloat(clean);
    if (isNaN(num)) {
      throw new Error("Please enter a valid number");
    }

    if (num === 0) {
      return {
        count: 1,
        digits: ["0"],
        explanation: "Zero by itself has 1 significant figure"
      };
    }

    const absNum = Math.abs(num);
    const str = clean.replace(/^-/, "").replace(/^[eE][+-]?/, "").replace(/\.?0*$/, "");
    
    let sigFigDigits: string[] = [];
    let explanationParts: string[] = [];

    const hasDecimal = clean.includes(".");
    const normalized = absNum.toExponential(20).replace(/\.?0+e/, "e");
    
    const match = clean.match(/^(-?)(0*)\.?(0*)(\d+)(e[+-]?\d+)?$/i);
    if (match) {
      const [, sign, leadingZerosBeforeDot, zerosAfterDot, significantPart] = match;
      
      if (leadingZerosBeforeDot && leadingZerosBeforeDot.length > 0) {
        explanationParts.push("Leading zeros before the decimal don't count");
      }
      
      if (zerosAfterDot && zerosAfterDot.length > 0) {
        explanationParts.push(`Leading zeros after decimal (${zerosAfterDot.length} zeros) don't count`);
      }
      
      sigFigDigits = significantPart.split("");
      
      if (hasDecimal && clean.match(/\d+\.0+$/) && !clean.match(/^0*\./)) {
        const trailingZeros = clean.match(/0+$/)?.[0] || "";
        if (trailingZeros) {
          sigFigDigits.push(...trailingZeros.split(""));
          explanationParts.push(`Trailing zeros after decimal ARE significant (${trailingZeros.length} zeros)`);
        }
      }
    } else {
      const sciNotation = absNum.toExponential(15);
      const sciMatch = sciNotation.match(/(\d+)\.(\d+)e/);
      if (sciMatch) {
        sigFigDigits = (sciMatch[1] + sciMatch[2]).split("");
      }
    }

    if (explanationParts.length === 0) {
      explanationParts.push("All non-zero digits are significant");
      if (hasDecimal) {
        explanationParts.push("Trailing zeros after decimal are significant");
      }
    }

    return {
      count: sigFigDigits.length,
      digits: sigFigDigits,
      explanation: explanationParts.join(". ")
    };
  };

  const roundToSigFigs = (numStr: string, sigFigs: number): { rounded: string; original: string; sigFigs: number } => {
    const num = parseFloat(numStr);
    
    if (isNaN(num)) {
      throw new Error("Please enter a valid number");
    }

    if (num === 0) {
      return { rounded: "0", original: numStr, sigFigs: 1 };
    }

    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const decimalPlaces = sigFigs - magnitude - 1;
    
    const multiplier = Math.pow(10, decimalPlaces);
    const rounded = Math.round(num * multiplier) / multiplier;

    let roundedStr: string;
    if (decimalPlaces >= 0) {
      roundedStr = rounded.toFixed(decimalPlaces);
    } else {
      roundedStr = rounded.toExponential(sigFigs - 1);
    }

    roundedStr = parseFloat(roundedStr).toString();

    return {
      rounded: roundedStr,
      original: numStr,
      sigFigs
    };
  };

  const handleCount = () => {
    setError("");
    setCountResult(null);
    setRoundResult(null);

    try {
      const result = countSignificantFigures(number);
      setCountResult(result);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleRound = () => {
    setError("");
    setCountResult(null);
    setRoundResult(null);

    if (!number.trim()) {
      setError("Please enter a number");
      return;
    }

    const sf = parseInt(targetSigFigs);
    if (isNaN(sf) || sf < 1) {
      setError("Please enter a valid number of significant figures");
      return;
    }

    try {
      const result = roundToSigFigs(number, sf);
      setRoundResult(result);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const reset = () => {
    setNumber("");
    setTargetSigFigs("3");
    setCountResult(null);
    setRoundResult(null);
    setError("");
  };

  const loadExample = (num: string) => {
    setNumber(num);
    setError("");
    setCountResult(null);
    setRoundResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Significant Figures Calculator – Count and Round Sig Figs</h1>
        <p className="text-muted-foreground">
          Count significant figures in any number or round to a specified number of sig figs with our free online significant figures calculator. Essential for chemistry and physics calculations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Significant Figures Calculator</CardTitle>
          <CardDescription>
            Count significant figures or round to a specified number of sig figs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Tabs defaultValue="count" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="count">Count Sig Figs</TabsTrigger>
                <TabsTrigger value="round">Round to Sig Figs</TabsTrigger>
              </TabsList>

              <TabsContent value="count" className="space-y-4">
                <div>
                  <Label>Enter a number</Label>
                  <Input
                    type="text"
                    placeholder="e.g., 0.00123 or 123.45"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCount()}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCount}>Count</Button>
                  <Button variant="outline" onClick={reset}>Reset</Button>
                </div>
              </TabsContent>

              <TabsContent value="round" className="space-y-4">
                <div>
                  <Label>Enter a number</Label>
                  <Input
                    type="text"
                    placeholder="e.g., 0.0012345"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Round to how many significant figures?</Label>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={targetSigFigs}
                    onChange={(e) => setTargetSigFigs(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleRound}>Round</Button>
                  <Button variant="outline" onClick={reset}>Reset</Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("0.00123")}>0.00123</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("123.45")}>123.45</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("100.0")}>100.0</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("0.0001")}>0.0001</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("1.00e-5")}>1.00×10⁻⁵</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {countResult && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Significant Figures</p>
                  <p className="text-5xl font-bold">{countResult.count}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {number} has {countResult.count} significant figure{countResult.count !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Significant Digits</h4>
                  <div className="flex flex-wrap gap-2">
                    {countResult.digits.map((digit, i) => (
                      <span key={i} className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold">
                        {digit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Explanation</h4>
                  <p className="text-sm text-muted-foreground">{countResult.explanation}</p>
                </div>
              </div>
            )}

            {roundResult && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Rounded Result</p>
                  <p className="text-5xl font-bold">{roundResult.rounded}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {roundResult.original} → {roundResult.rounded} ({roundResult.sigFigs} sig fig{roundResult.sigFigs !== 1 ? "s" : ""})
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Comparison</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Original:</span>
                      <span className="font-mono">{roundResult.original}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rounded:</span>
                      <span className="font-mono">{roundResult.rounded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sig Figs:</span>
                      <span className="font-mono">{roundResult.sigFigs}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Significant Figures Calculator – Count and Round Sig Figs</h2>
          <p className="text-muted-foreground">
            Significant figures tell you how precise a measurement is. They count all the digits that carry real information about a value's accuracy. This calculator counts sig figs in any number and rounds values to your specified precision.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Chemistry and physics labs live by significant figures. Your balance reads to 0.01 g? That's 2 decimal places of precision. Multiply that by a volume measured to 3 sig figs? Your answer can't have more than 3 sig figs. This calculator handles the counting and rounding so you can focus on the science.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Rules for Counting Significant Figures</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">1. Non-zero digits are always significant</h4>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>123 → 3 sig figs</div>
              <div>9.81 → 3 sig figs</div>
              <div>456.78 → 5 sig figs</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">2. Leading zeros are never significant</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Zeros before the first non-zero digit just position the decimal point.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>0.00123 → 3 sig figs (the 1, 2, 3)</div>
              <div>0.0001 → 1 sig fig</div>
              <div>0.0102 → 3 sig figs</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">3. Captive zeros are always significant</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Zeros between non-zero digits count.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>101 → 3 sig figs</div>
              <div>10.01 → 4 sig figs</div>
              <div>2005 → 4 sig figs</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">4. Trailing zeros after a decimal ARE significant</h4>
            <p className="text-xs text-muted-foreground mb-2">
              They show measurement precision.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>1.00 → 3 sig figs</div>
              <div>100.0 → 4 sig figs</div>
              <div>0.100 → 3 sig figs</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">5. Trailing zeros without a decimal are ambiguous</h4>
            <p className="text-xs text-muted-foreground mb-2">
              100 could be 1, 2, or 3 sig figs. Use scientific notation to clarify.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>100 → 1 sig fig (usually)</div>
              <div>1.0 × 10² → 2 sig figs</div>
              <div>1.00 × 10² → 3 sig figs</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Sig Figs in Calculations</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Multiplication and Division</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Answer has the same number of sig figs as the measurement with the fewest sig figs.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>2.5 × 3.42 = 8.6 (2 sig figs)</div>
              <div>100.0 ÷ 4.0 = 25 (2 sig figs)</div>
              <div>0.0025 × 100 = 0.3 (1 sig fig)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Addition and Subtraction</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Answer has the same number of decimal places as the measurement with the fewest decimal places.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>12.34 + 5.6 = 17.9 (1 decimal)</div>
              <div>100 - 1.234 = 99 (0 decimals)</div>
              <div>0.001 + 0.1 = 0.1 (1 decimal)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Examples</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Avogadro's number</span>
              <span className="font-mono text-xs">6.022 × 10²³ → 4 sig figs</span>
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Speed of light</span>
              <span className="font-mono text-xs">299,792,458 m/s → 9 sig figs (exact)</span>
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">pH measurement</span>
              <span className="font-mono text-xs">pH 7.00 → 2 sig figs (decimal places count)</span>
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Lab balance reading</span>
              <span className="font-mono text-xs">12.345 g → 5 sig figs</span>
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Graduated cylinder</span>
              <span className="font-mono text-xs">25.0 mL → 3 sig figs</span>
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Integer counts</span>
              <span className="font-mono text-xs">23 students → infinite sig figs (exact)</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Scientific Notation</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            Scientific notation removes ambiguity. Every digit in the coefficient is significant.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between p-2 border rounded">
                <span>1.2 × 10³</span>
                <span className="text-muted-foreground">2 sig figs</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>1.20 × 10³</span>
                <span className="text-muted-foreground">3 sig figs</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>1.200 × 10³</span>
                <span className="text-muted-foreground">4 sig figs</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between p-2 border rounded">
                <span>5 × 10⁻³</span>
                <span className="text-muted-foreground">1 sig fig</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>5.00 × 10⁻³</span>
                <span className="text-muted-foreground">3 sig figs</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>9.999 × 10⁸</span>
                <span className="text-muted-foreground">4 sig figs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Are exact numbers considered to have infinite sig figs?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Counting numbers (23 students, 5 trials) and defined constants (100 cm = 1 m, 12 inches = 1 foot) have infinite significant figures. They don't limit the precision of calculated results.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do sig figs work with pH?</h4>
            <p className="text-sm text-muted-foreground">
              For pH, only digits after the decimal point count as significant. pH 7.00 has 2 sig figs. pH 3.456 has 3 sig figs. The whole number part just indicates the power of 10.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does 100 have only 1 sig fig?</h4>
            <p className="text-sm text-muted-foreground">
              Without a decimal point, trailing zeros are ambiguous. 100 could mean "about 100" (1 sig fig), "between 95 and 105" (2 sig figs), or "exactly 100" (3 sig figs). Write 1.0 × 10² or 1.00 × 10² to be clear.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do I round intermediate steps?</h4>
            <p className="text-sm text-muted-foreground">
              No. Keep extra digits during calculations. Round only the final answer to the correct number of sig figs. Early rounding accumulates errors.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What about constants like π or e?</h4>
            <p className="text-sm text-muted-foreground">
              Mathematical constants have infinite precision. Use as many digits as needed for your calculation. They don't limit sig figs in your answer.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/rounding-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Rounding Calculator</p>
            <p className="text-xs text-muted-foreground">Round to decimal places</p>
          </a>
          <a href="/math-tools/scientific-notation-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Scientific Notation Converter</p>
            <p className="text-xs text-muted-foreground">Standard to scientific form</p>
          </a>
          <a href="/math-tools/standard-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Standard Calculator</p>
            <p className="text-xs text-muted-foreground">Basic arithmetic</p>
          </a>
        </div>
      </section>
    </div>
  );
}
