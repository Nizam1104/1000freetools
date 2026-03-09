"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ScientificNotationConverter() {
  const [standardInput, setStandardInput] = useState<string>("");
  const [scientificInput, setScientificInput] = useState<string>("");
  const [exponent, setExponent] = useState<string>("0");
  const [result, setResult] = useState<{ value: string; steps: string[] } | null>(null);
  const [error, setError] = useState<string>("");

  const loadExample = (standard: string, scientific: string, exp: string) => {
    setStandardInput(standard);
    setScientificInput(scientific);
    setExponent(exp);
    setResult(null);
    setError("");
  };

  const toScientific = (numStr: string): { result: string; steps: string[] } => {
    const num = parseFloat(numStr);
    if (isNaN(num)) throw new Error("Please enter a valid number");
    if (num === 0) return { result: "0 × 10^0", steps: ["Zero in scientific notation: 0 × 10^0"] };

    const isNegative = num < 0;
    const absNum = Math.abs(num);
    let coefficient = absNum;
    let exp = 0;

    if (coefficient >= 10) {
      while (coefficient >= 10) { coefficient /= 10; exp++; }
    } else if (coefficient < 1 && coefficient > 0) {
      while (coefficient < 1) { coefficient *= 10; exp--; }
    }

    coefficient = Math.round(coefficient * 1e10) / 1e10;
    const steps: string[] = [`Original number: ${isNegative ? "-" : ""}${absNum}`];
    if (exp > 0) {
      steps.push(`Move decimal point ${exp} place${exp > 1 ? "s" : ""} to the left`);
      steps.push(`Coefficient: ${coefficient}`);
      steps.push(`Exponent: +${exp} (number > 1, so positive exponent)`);
    } else if (exp < 0) {
      steps.push(`Move decimal point ${Math.abs(exp)} place${Math.abs(exp) > 1 ? "s" : ""} to the right`);
      steps.push(`Coefficient: ${coefficient}`);
      steps.push(`Exponent: ${exp} (number < 1, so negative exponent)`);
    } else {
      steps.push(`Number is already between 1 and 10`);
      steps.push(`Coefficient: ${coefficient}`);
      steps.push(`Exponent: 0`);
    }

    const sign = isNegative ? "-" : "";
    return { result: `${sign}${coefficient} × 10^${exp}`, steps };
  };

  const toStandard = (coeff: string, exp: string): { result: string; steps: string[] } => {
    const coefficient = parseFloat(coeff);
    const exponent = parseInt(exp);
    if (isNaN(coefficient)) throw new Error("Please enter a valid coefficient");
    if (isNaN(exponent)) throw new Error("Please enter a valid exponent");

    const steps: string[] = [`Starting with: ${coefficient} × 10^${exponent}`];
    let result: number;

    if (exponent > 0) {
      steps.push(`Exponent is positive (${exponent}), so move decimal point ${exponent} places to the right`);
      result = coefficient * Math.pow(10, exponent);
      steps.push(`Multiply: ${coefficient} × ${Math.pow(10, exponent).toLocaleString()} = ${result.toLocaleString()}`);
    } else if (exponent < 0) {
      steps.push(`Exponent is negative (${exponent}), so move decimal point ${Math.abs(exponent)} places to the left`);
      result = coefficient / Math.pow(10, Math.abs(exponent));
      steps.push(`Divide: ${coefficient} ÷ ${Math.pow(10, Math.abs(exponent)).toLocaleString()} = ${result}`);
    } else {
      steps.push(`Exponent is 0, and 10^0 = 1`);
      result = coefficient;
      steps.push(`Result: ${coefficient} × 1 = ${coefficient}`);
    }

    return { result: result.toString(), steps };
  };

  const convertToScientific = () => {
    setError(""); setResult(null);
    if (!standardInput.trim()) { setError("Please enter a number"); return; }
    try {
      const { result: sci, steps } = toScientific(standardInput);
      setResult({ value: sci, steps });
    } catch (e: any) { setError(e.message); }
  };

  const convertToStandard = () => {
    setError(""); setResult(null);
    if (!scientificInput.trim()) { setError("Please enter a coefficient"); return; }
    try {
      const { result: std, steps } = toStandard(scientificInput, exponent);
      setResult({ value: std, steps });
    } catch (e: any) { setError(e.message); }
  };

  const reset = () => {
    setStandardInput(""); setScientificInput(""); setExponent("0"); setResult(null); setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Scientific Notation Converter – Standard to Scientific Form</h1>
        <p className="text-muted-foreground">
          Convert any number to scientific notation or from scientific notation to standard form with our free online converter. Perfect for chemistry, physics, and large number calculations.
        </p>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="standard-to-scientific" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard-to-scientific">Standard → Scientific</TabsTrigger>
            <TabsTrigger value="scientific-to-standard">Scientific → Standard</TabsTrigger>
          </TabsList>

          <TabsContent value="standard-to-scientific" className="space-y-4">
            <div>
              <Label>Enter a number in standard form</Label>
              <Input type="text" placeholder="e.g., 0.000045 or 3500000" value={standardInput} onChange={(e) => setStandardInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && convertToScientific()} />
              <p className="text-xs text-muted-foreground mt-1">Accepts decimals, whole numbers, and negative values</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={convertToScientific}>Convert to Scientific</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground self-center">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("300000000", "", "0")}>Speed of Light</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("0.000000000053", "", "0")}>Atom Radius</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("602200000000000000000000", "", "0")}>Avogadro's Number</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("0.0000007", "", "0")}>Red Light Wavelength</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("8000000000", "", "0")}>Earth Population</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("0.000002", "", "0")}>Bacterium Length</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("149600000", "", "0")}>Astronomical Unit</Button>
            </div>
          </TabsContent>

          <TabsContent value="scientific-to-standard" className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-end">
              <div className="col-span-2">
                <Label>Coefficient</Label>
                <Input type="text" placeholder="e.g., 3.5" value={scientificInput} onChange={(e) => setScientificInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && convertToStandard()} />
              </div>
              <div>
                <Label>Exponent (power of 10)</Label>
                <Input type="number" placeholder="0" value={exponent} onChange={(e) => setExponent(e.target.value)} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Converts coefficient × 10^exponent to standard form</p>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={convertToStandard}>Convert to Standard</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground self-center">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("", "3.0", "8")}>3.0 × 10⁸</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("", "5.3", "-11")}>5.3 × 10⁻¹¹</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("", "6.022", "23")}>6.022 × 10²³</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("", "7.0", "-7")}>7.0 × 10⁻⁷</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("", "8.0", "9")}>8.0 × 10⁹</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("", "2.0", "-6")}>2.0 × 10⁻⁶</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("", "1.496", "8")}>1.496 × 10⁸</Button>
            </div>
          </TabsContent>
        </Tabs>

        {error && <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Result</p>
              <p className="text-4xl font-bold font-mono">{result.value}</p>
            </div>
            {result.steps && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Step-by-Step Conversion</h4>
                <div className="space-y-2 text-sm font-mono">{result.steps.map((step, i) => (<div key={i} className="text-muted-foreground">{step}</div>))}</div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Scientific Notation</h2>
          <p className="text-muted-foreground">
            Scientific notation expresses extremely large or small numbers compactly. Write any number as a coefficient (between 1 and 10) multiplied by 10 raised to a power. The exponent tells you how many places to move the decimal point.
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">
            Positive exponents mean big numbers – move the decimal right. Negative exponents mean tiny decimals – move the decimal left. Scientists use this format constantly because it's cleaner than writing 0.000000000000000000000001 or 602200000000000000000000.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Formula and Method</h3>
        <div className="p-6 bg-muted rounded-lg">
          <p className="text-lg font-mono text-center mb-4">a × 10^n</p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 border rounded">
              <p className="font-semibold mb-1">Coefficient (a)</p>
              <p className="text-muted-foreground">A number where 1 ≤ |a| &lt; 10. These are your significant digits.</p>
            </div>
            <div className="p-3 border rounded">
              <p className="font-semibold mb-1">Base</p>
              <p className="text-muted-foreground">Always 10. Scientific notation uses base-10 exponents exclusively.</p>
            </div>
            <div className="p-3 border rounded">
              <p className="font-semibold mb-1">Exponent (n)</p>
              <p className="text-muted-foreground">An integer showing decimal places to move. Positive for large numbers, negative for small.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Large Numbers (Positive Exponent)</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-2 bg-muted rounded"><span>Speed of light (m/s)</span><span className="font-mono">300,000,000 → 3.0 × 10^8</span></div>
              <div className="flex justify-between p-2 bg-muted rounded"><span>Earth population</span><span className="font-mono">8,000,000,000 → 8.0 × 10^9</span></div>
              <div className="flex justify-between p-2 bg-muted rounded"><span>Astronomical unit (km)</span><span className="font-mono">149,600,000 → 1.496 × 10^8</span></div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Small Numbers (Negative Exponent)</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-2 bg-muted rounded"><span>Hydrogen atom radius (m)</span><span className="font-mono">0.000000000053 → 5.3 × 10^-11</span></div>
              <div className="flex justify-between p-2 bg-muted rounded"><span>Bacterium length (m)</span><span className="font-mono">0.000002 → 2.0 × 10^-6</span></div>
              <div className="flex justify-between p-2 bg-muted rounded"><span>Red light wavelength (m)</span><span className="font-mono">0.0000007 → 7.0 × 10^-7</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Step-by-Step Conversion Process</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-3">For Numbers ≥ 10</h4>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Move the decimal point left until you have a number between 1 and 10</li>
              <li>Count how many places you moved it</li>
              <li>That count becomes your positive exponent</li>
              <li>Write as coefficient × 10^exponent</li>
            </ol>
            <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">45,000 → move decimal 4 places → 4.5 × 10^4</div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-3">For Numbers &lt; 1</h4>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Move the decimal point right until you have a number between 1 and 10</li>
              <li>Count how many places you moved it</li>
              <li>That count becomes your negative exponent</li>
              <li>Write as coefficient × 10^exponent</li>
            </ol>
            <div className="mt-3 p-2 bg-muted rounded text-xs font-mono">0.0032 → move decimal 3 places → 3.2 × 10^-3</div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm">
            Scientific notation was popularized by French mathematician René Descartes in the 17th century, though the concept dates back to Archimedes. He estimated the number of grains of sand to fill the universe as 10^63 – remarkably close to modern estimates of atoms in the observable universe (10^80).
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between scientific and engineering notation?</h4>
            <p className="text-sm text-muted-foreground">Engineering notation uses exponents that are multiples of 3 (10^3, 10^6, 10^-9), matching metric prefixes like kilo, mega, and nano. Scientific notation uses any integer exponent. 0.000045 becomes 45 × 10^-6 in engineering notation but 4.5 × 10^-5 in scientific notation.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I multiply numbers in scientific notation?</h4>
            <p className="text-sm text-muted-foreground">Multiply the coefficients and add the exponents. (3 × 10^5) × (2 × 10^3) = 6 × 10^8. If the result's coefficient is outside 1-10, adjust it. For example, 12 × 10^8 becomes 1.2 × 10^9.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why use scientific notation instead of regular numbers?</h4>
            <p className="text-sm text-muted-foreground">It's easier to read, compare, and calculate with extreme values. Which is clearer: 0.000000000000000000000001 or 1 × 10^-24? Scientific notation also makes significant figures explicit and prevents counting zeros errors.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the coefficient be negative?</h4>
            <p className="text-sm text-muted-foreground">Yes. Negative numbers keep the minus sign on the coefficient: -5.2 × 10^4. The exponent stays positive or negative based on the magnitude, not the sign. -0.0032 becomes -3.2 × 10^-3.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do calculators display scientific notation?</h4>
            <p className="text-sm text-muted-foreground">Most calculators use "E" notation: 3.5E8 means 3.5 × 10^8. Some use a small raised number for the exponent. Both mean the same thing. Computer programming languages also use this E notation format.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What about zero in scientific notation?</h4>
            <p className="text-sm text-muted-foreground">Zero is simply 0 × 10^0. It's a special case because zero has no magnitude. You can't write zero with a coefficient between 1 and 10, so we make an exception for this unique number.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/roman-numeral-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Roman Numeral Converter</p><p className="text-xs text-muted-foreground">Numbers to Roman numerals</p></a>
          <a href="/math-tools/significant-figures-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Significant Figures Calculator</p><p className="text-xs text-muted-foreground">Count and round sig figs</p></a>
          <a href="/math-tools/rounding-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Rounding Calculator</p><p className="text-xs text-muted-foreground">Round to decimal places</p></a>
        </div>
      </section>
    </div>
  );
}
