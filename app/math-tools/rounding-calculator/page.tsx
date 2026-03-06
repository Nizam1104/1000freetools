"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RoundingCalculator() {
  const [number, setNumber] = useState<string>("");
  const [places, setPlaces] = useState<string>("2");
  const [mode, setMode] = useState<"decimal" | "sigfigs" | "integer">("decimal");
  const [roundingMethod, setRoundingMethod] = useState<"half-up" | "half-down" | "half-even" | "ceiling" | "floor">("half-up");
  const [result, setResult] = useState<{ rounded: string; explanation: string } | null>(null);
  const [error, setError] = useState<string>("");

  const roundHalfUp = (num: number, decimalPlaces: number): number => {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(num * multiplier) / multiplier;
  };

  const roundHalfDown = (num: number, decimalPlaces: number): number => {
    const multiplier = Math.pow(10, decimalPlaces);
    const rounded = Math.floor(num * multiplier + 0.5) / multiplier;
    const exact = num * multiplier;
    if (exact - Math.floor(exact) === 0.5) {
      return Math.floor(num * multiplier) / multiplier;
    }
    return rounded;
  };

  const roundHalfEven = (num: number, decimalPlaces: number): number => {
    const multiplier = Math.pow(10, decimalPlaces);
    const scaled = num * multiplier;
    const floor = Math.floor(scaled);
    const frac = scaled - floor;
    
    if (frac === 0.5) {
      return (floor % 2 === 0 ? floor : floor + 1) / multiplier;
    }
    return Math.round(scaled) / multiplier;
  };

  const roundToSigFigs = (num: number, sigFigs: number): number => {
    if (num === 0) return 0;
    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const decimalPlaces = sigFigs - magnitude - 1;
    return roundHalfUp(num, decimalPlaces);
  };

  const calculate = () => {
    setError("");
    setResult(null);

    if (!number.trim()) {
      setError("Please enter a number");
      return;
    }

    const num = parseFloat(number);
    if (isNaN(num)) {
      setError("Please enter a valid number");
      return;
    }

    const p = parseInt(places);
    if (isNaN(p) || p < 0) {
      setError("Please enter a valid number of places");
      return;
    }

    try {
      let rounded: number;
      let explanation: string;

      if (mode === "integer") {
        switch (roundingMethod) {
          case "half-up":
            rounded = Math.round(num);
            break;
          case "half-down":
            rounded = num >= 0 ? Math.floor(num + 0.5) : Math.ceil(num - 0.5);
            break;
          case "half-even":
            const floor = Math.floor(Math.abs(num));
            const frac = Math.abs(num) - floor;
            if (frac === 0.5) {
              rounded = (floor % 2 === 0 ? floor : floor + 1) * Math.sign(num);
            } else {
              rounded = Math.round(num);
            }
            break;
          case "ceiling":
            rounded = Math.ceil(num);
            break;
          case "floor":
            rounded = Math.floor(num);
            break;
        }
        explanation = `Rounded to nearest integer using ${roundingMethod} method`;
      } else if (mode === "decimal") {
        switch (roundingMethod) {
          case "half-up":
            rounded = roundHalfUp(num, p);
            break;
          case "half-down":
            rounded = roundHalfDown(num, p);
            break;
          case "half-even":
            rounded = roundHalfEven(num, p);
            break;
          case "ceiling":
            rounded = Math.ceil(num * Math.pow(10, p)) / Math.pow(10, p);
            break;
          case "floor":
            rounded = Math.floor(num * Math.pow(10, p)) / Math.pow(10, p);
            break;
        }
        explanation = `Rounded to ${p} decimal place${p !== 1 ? "s" : ""} using ${roundingMethod} method`;
      } else {
        rounded = roundToSigFigs(num, p);
        explanation = `Rounded to ${p} significant figure${p !== 1 ? "s" : ""}`;
      }

      const roundedStr = rounded.toFixed(mode === "decimal" ? p : mode === "sigfigs" ? Math.max(0, p - Math.floor(Math.log10(Math.abs(rounded)) - 1)) : 0);
      
      setResult({
        rounded: parseFloat(roundedStr).toString(),
        explanation
      });
    } catch (e: any) {
      setError(e.message || "Calculation error");
    }
  };

  const reset = () => {
    setNumber("");
    setPlaces("2");
    setMode("decimal");
    setRoundingMethod("half-up");
    setResult(null);
    setError("");
  };

  const loadExample = (num: string, p: string, m: typeof mode) => {
    setNumber(num);
    setPlaces(p);
    setMode(m);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Rounding Calculator – Round to Decimal Places or Sig Figs</h1>
        <p className="text-muted-foreground">
          Round any number to a specified number of decimal places or significant figures with our free online rounding calculator. Supports standard and scientific rounding rules.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rounding Calculator</CardTitle>
          <CardDescription>
            Round numbers to decimal places, significant figures, or integers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Number to Round</Label>
              <Input
                type="text"
                placeholder="e.g., 3.14159"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
            </div>

            <div>
              <Label>Rounding Mode</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decimal">Decimal Places</SelectItem>
                  <SelectItem value="sigfigs">Significant Figures</SelectItem>
                  <SelectItem value="integer">Nearest Integer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode !== "integer" && (
              <div>
                <Label>{mode === "decimal" ? "Decimal Places" : "Significant Figures"}</Label>
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={places}
                  onChange={(e) => setPlaces(e.target.value)}
                />
              </div>
            )}

            <div>
              <Label>Rounding Method</Label>
              <Select value={roundingMethod} onValueChange={(v) => setRoundingMethod(v as typeof roundingMethod)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="half-up">Round Half Up (standard)</SelectItem>
                  <SelectItem value="half-down">Round Half Down</SelectItem>
                  <SelectItem value="half-even">Round Half Even (banker's)</SelectItem>
                  <SelectItem value="ceiling">Round Up (ceiling)</SelectItem>
                  <SelectItem value="floor">Round Down (floor)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Round</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("3.14159", "2", "decimal")}>
                π to 2 decimals
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("0.00123456", "3", "sigfigs")}>
                0.00123456 to 3 sig figs
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("2.5", "0", "integer")}>
                2.5 to integer
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("1234.567", "1", "decimal")}>
                1234.567 to 1 decimal
              </Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Rounded Result</p>
                  <p className="text-5xl font-bold">{result.rounded}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {number} → {result.rounded}
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Explanation</h4>
                  <p className="text-sm text-muted-foreground">{result.explanation}</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Rounding Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Original:</span>
                      <span className="font-mono">{number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rounded:</span>
                      <span className="font-mono">{result.rounded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Difference:</span>
                      <span className="font-mono">{(parseFloat(result.rounded) - parseFloat(number)).toPrecision(6)}</span>
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
          <h2 className="text-2xl font-semibold mb-3">Rounding Calculator – Round to Decimal Places or Sig Figs</h2>
          <p className="text-muted-foreground">
            Rounding simplifies numbers while keeping them close to their original value. Whether you need 2 decimal places for currency, 3 significant figures for a lab report, or just the nearest whole number, this calculator handles it with multiple rounding methods.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Different situations call for different rounding rules. School math typically uses "round half up" – 2.5 becomes 3. But scientists and statisticians often prefer "round half even" (banker's rounding) to avoid systematic bias. This calculator lets you choose the method that fits your needs.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Rounding Methods Explained</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Round Half Up (Standard)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The most common method. If the digit after your rounding position is 5 or greater, round up. Otherwise, round down.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>2.5 → 3</div>
              <div>2.4 → 2</div>
              <div>3.14159 to 2 decimals → 3.14</div>
              <div>3.145 to 2 decimals → 3.15</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Round Half Even (Banker's Rounding)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              When the digit is exactly 5, round to the nearest even number. This reduces bias in large datasets. Used in IEEE 754 floating-point standard.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>2.5 → 2 (round to even)</div>
              <div>3.5 → 4 (round to even)</div>
              <div>2.45 to 1 decimal → 2.4</div>
              <div>2.55 to 1 decimal → 2.6</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Round Half Down</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Opposite of half-up. When the digit is exactly 5, round down instead of up.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>2.5 → 2</div>
              <div>2.6 → 3</div>
              <div>3.145 to 2 decimals → 3.14</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Ceiling (Round Up)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Always round toward positive infinity. Any fractional part causes rounding up.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>2.1 → 3</div>
              <div>2.9 → 3</div>
              <div>-2.1 → -2</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Floor (Round Down)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Always round toward negative infinity. Any fractional part causes rounding down.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>2.1 → 2</div>
              <div>2.9 → 2</div>
              <div>-2.1 → -3</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Significant Figures</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            Significant figures (sig figs) count all digits that carry meaning about a measurement's precision. Leading zeros don't count. Trailing zeros after a decimal do count.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between p-2 border rounded">
                <span>0.00123</span>
                <span className="text-muted-foreground">3 sig figs</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>123.45</span>
                <span className="text-muted-foreground">5 sig figs</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>100.0</span>
                <span className="text-muted-foreground">4 sig figs</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between p-2 border rounded">
                <span>100</span>
                <span className="text-muted-foreground">1 sig fig (ambiguous)</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>0.0001</span>
                <span className="text-muted-foreground">1 sig fig</span>
              </div>
              <div className="flex justify-between p-2 border rounded">
                <span>1.00 × 10²</span>
                <span className="text-muted-foreground">3 sig figs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Rounding Examples</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Currency (2 decimal places)</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              $12.3456 → $12.35 | $12.344 → $12.34
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Scientific measurement (3 sig figs)</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              0.0012345 → 0.00123 | 12345 → 12300
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Temperature (1 decimal place)</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              98.67°F → 98.7°F | 98.64°F → 98.6°F
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Population (nearest thousand)</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              1,234,567 → 1,235,000 | 1,234,200 → 1,234,000
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Pi approximation</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              3.14159265... → 3.14 (2 dp) | 3.142 (3 dp) | 3.1416 (4 dp)
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why use banker's rounding?</h4>
            <p className="text-sm text-muted-foreground">
              Standard rounding (half up) introduces a slight upward bias because 5 always rounds up. Banker's rounding (half even) rounds 5 to the nearest even number, balancing out over many calculations. It's the default in Python, IEEE 754, and many statistical applications.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many decimal places for money?</h4>
            <p className="text-sm text-muted-foreground">
              Most currencies use 2 decimal places (cents, pence, euro cents). Some, like the Japanese Yen, use 0. Cryptocurrencies often use 8 (Bitcoin) or 18 (Ethereum) decimal places.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between decimal places and significant figures?</h4>
            <p className="text-sm text-muted-foreground">
              Decimal places count digits after the decimal point. Significant figures count all meaningful digits from the first non-zero digit. 0.00123 has 5 decimal places but only 3 significant figures.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I round in calculations?</h4>
            <p className="text-sm text-muted-foreground">
              Keep full precision during intermediate steps. Round only the final answer. Early rounding introduces cumulative errors that can significantly affect results.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I round negative numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. The same rules apply. For half-up: -2.5 rounds to -3 (away from zero). For half-even: -2.5 rounds to -2 (to even). Ceiling and floor work with the number line direction.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/significant-figures-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Significant Figures Calculator</p>
            <p className="text-xs text-muted-foreground">Count and round sig figs</p>
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
