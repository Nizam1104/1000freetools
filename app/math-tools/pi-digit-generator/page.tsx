"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PiDigitGenerator() {
  const [digits, setDigits] = useState("");
  const [result, setResult] = useState<{
    numDigits: number;
    piString: string;
    lastDigit: string;
  } | null>(null);
  const [error, setError] = useState("");

  // Pre-computed digits of pi (1000 digits)
  const PI_DIGITS = "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";

  const generatePiDigits = (n: number) => {
    const piString = "3." + PI_DIGITS.substring(0, n);
    const lastDigit = PI_DIGITS.substring(n - 1, n);
    return { numDigits: n, piString, lastDigit };
  };

  const calculate = () => {
    const num = parseInt(digits.trim());

    if (isNaN(num)) {
      setError("Please enter a valid number of digits");
      setResult(null);
      return;
    }

    if (num < 1 || num > 1000) {
      setError("Please enter a number between 1 and 1000");
      setResult(null);
      return;
    }

    setError("");
    setResult(generatePiDigits(num));
  };

  const reset = () => {
    setDigits("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pi Digit Generator – Explore Digits of π</h1>
        <p className="text-muted-foreground">
          Display the digits of pi (π) to any decimal place up to 1000 digits. Perfect for math projects, memorization practice, and exploring this famous irrational number.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Number of Decimal Places</Label>
          <Input
            type="text"
            placeholder="e.g., 50"
            value={digits}
            onChange={(e) => setDigits(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Generate Pi Digits</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">
                π to {result.numDigits} decimal places
              </p>
              <p className="text-lg font-mono break-all leading-relaxed">
                {result.piString}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Decimal Places Shown</p>
                <p className="text-2xl font-bold">{result.numDigits}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Last Digit</p>
                <p className="text-2xl font-bold">{result.lastDigit}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Characters</p>
                <p className="text-2xl font-bold">{result.piString.length}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">First 10 Digits</p>
                <p className="text-2xl font-mono">3.141592653...</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Digits in Groups of 10</p>
              <div className="space-y-2 font-mono text-sm overflow-x-auto">
                {Array.from({ length: Math.ceil(result.numDigits / 10) }, (_, i) => {
                  const start = i * 10;
                  const end = Math.min(start + 10, result.numDigits);
                  const group = PI_DIGITS.substring(start, end);
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-muted-foreground w-16">
                        {start + 1}-{end}:
                      </span>
                      <span className="bg-background px-3 py-1 rounded">
                        {group.match(/.{1,10}/g)?.join(" ") || group}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Digit Frequency</p>
              <div className="space-y-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => {
                  const count = PI_DIGITS.substring(0, result.numDigits).split("").filter(c => parseInt(c) === d).length;
                  const percentage = ((count / result.numDigits) * 100).toFixed(1);
                  return (
                    <div key={d} className="flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded font-mono font-bold">{d}</span>
                      <div className="flex-1 h-4 bg-background rounded overflow-hidden">
                        <div 
                          className="h-full bg-primary/50 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono w-20 text-right">{count} ({percentage}%)</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                In a truly random sequence, each digit would appear about 10% of the time.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
