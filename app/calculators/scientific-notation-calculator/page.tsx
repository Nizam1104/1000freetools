"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Faqs from "@/components/utils/Faqs";


export default function ScientificNotationCalculator() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<{ scientific: string; eNotation: string } | null>(null);

  const calculate = () => {
    const num = parseFloat(number);
    
    if (!isNaN(num) && num !== 0) {
      const exponent = Math.floor(Math.log10(Math.abs(num)));
      const mantissa = num / Math.pow(10, exponent);
      setResult({
        scientific: `${mantissa.toFixed(6)} × 10^${exponent}`,
        eNotation: `${mantissa.toFixed(6)}e${exponent >= 0 ? "+" : ""}${exponent}`
      });
    } else if (num === 0) {
      setResult({ scientific: "0 × 10^0", eNotation: "0e0" });
    }
  };

  const reset = () => {
    setNumber("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number to Convert</label>
              <Input
                type="number"
                placeholder="e.g., 123456789 or 0.0000123"
                step="any"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Scientific Notation</p>
                  <p className="text-xl font-semibold">{result.scientific}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-Notation</p>
                  <p className="text-lg font-mono">{result.eNotation}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Scientific Notation Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <p className="font-semibold">Enter your number</p>
              <p className="text-sm text-muted-foreground">Type any number – whether it's extremely large like the distance to stars or tiny like atomic measurements.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <p className="font-semibold">Click Convert</p>
              <p className="text-sm text-muted-foreground">The calculator instantly converts your number to standard scientific notation format.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <p className="font-semibold">Read your results</p>
              <p className="text-sm text-muted-foreground">Get both the traditional scientific notation (with × 10^) and E-notation formats used in calculators and computers.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Scientific Notation</CardTitle>
          <CardDescription>Why scientists use this format</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Scientific notation is a way to write very large or very small numbers in a compact, standardized form. Instead of writing 0.00000000000000000000000167 grams for a proton's mass, scientists write 1.67 × 10⁻²⁴ grams. Much cleaner.
          </p>
          <p className="text-sm text-muted-foreground">
            The format has two parts: the <strong>coefficient</strong> (also called mantissa) and the <strong>exponent</strong>. The coefficient is always a number between 1 and 10. The exponent tells you how many places to move the decimal point.
          </p>
          <p className="text-sm text-muted-foreground">
            Positive exponents mean large numbers – move the decimal right. 3.5 × 10⁶ equals 3,500,000. Negative exponents mean small numbers – move the decimal left. 2.1 × 10⁻⁴ equals 0.00021.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scientific Notation Format Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-semibold">Component</th>
                  <th className="text-left py-2 px-3 font-semibold">Description</th>
                  <th className="text-left py-2 px-3 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">Coefficient</td>
                  <td className="py-2 px-3">Number between 1 and 10</td>
                  <td className="py-2 px-3">In 6.02 × 10²³, coefficient is 6.02</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Base</td>
                  <td className="py-2 px-3">Always 10</td>
                  <td className="py-2 px-3">10 is constant in all scientific notation</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Exponent</td>
                  <td className="py-2 px-3">Power of 10 (positive or negative)</td>
                  <td className="py-2 px-3">In 4.5 × 10⁻⁹, exponent is -9</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">E-Notation</td>
                  <td className="py-2 px-3">Compact computer format</td>
                  <td className="py-2 px-3">6.02e23 means 6.02 × 10²³</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Standard Form</td>
                  <td className="py-2 px-3">Regular decimal number</td>
                  <td className="py-2 px-3">3.0 × 10⁸ = 300,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Scientific Notation Examples</CardTitle>
          <CardDescription>Real-world numbers in scientific notation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold mb-2">Astronomy</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Distance to Sun: 1.496 × 10⁸ km</li>
                <li>Distance to nearest star: 4.0 × 10¹³ km</li>
                <li>Mass of Earth: 5.97 × 10²⁴ kg</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold mb-2">Physics</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Speed of light: 3.0 × 10⁸ m/s</li>
                <li>Electron mass: 9.11 × 10⁻³¹ kg</li>
                <li>Planck's constant: 6.626 × 10⁻³⁴ J·s</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold mb-2">Chemistry</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Avogadro's number: 6.022 × 10²³ mol⁻¹</li>
                <li>Atomic radius (hydrogen): 5.3 × 10⁻¹¹ m</li>
                <li>pH of pure water: 1.0 × 10⁻⁷ M H⁺</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <h4 className="font-semibold mb-2">Biology</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Human cells in body: 3.72 × 10¹³</li>
                <li>DNA base pairs: 3.0 × 10⁹ per cell</li>
                <li>Virus size: 1.0 × 10⁻⁷ m</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Converting Between Formats</CardTitle>
          <CardDescription>How to convert manually</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold mb-2">Standard to Scientific Notation</h4>
            <ol className="text-sm text-muted-foreground space-y-2">
              <li>Move the decimal point until you have a number between 1 and 10</li>
              <li>Count how many places you moved – this becomes the exponent</li>
              <li>Moved left = positive exponent. Moved right = negative exponent</li>
              <li>Write as coefficient × 10^exponent</li>
            </ol>
            <p className="text-sm font-mono mt-2">Example: 45,000 → 4.5 (moved 4 left) → 4.5 × 10⁴</p>
          </div>
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold mb-2">Scientific to Standard Notation</h4>
            <ol className="text-sm text-muted-foreground space-y-2">
              <li>Look at the exponent</li>
              <li>Positive exponent: move decimal right, add zeros as needed</li>
              <li>Negative exponent: move decimal left, add zeros as needed</li>
            </ol>
            <p className="text-sm font-mono mt-2">Example: 2.3 × 10⁵ → move 5 right → 230,000</p>
          </div>
        </CardContent>
      </Card>

      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is scientific notation?",
    answer: "Scientific notation is a standardized way to write very large or very small numbers using powers of 10. It has the form a × 10ⁿ where a is between 1 and 10, and n is an integer. This format makes calculations and comparisons easier.",
  },
{
    question: "What is E-notation?",
    answer: "E-notation is a compact version of scientific notation used in calculators and computers. Instead of writing 6.02 × 10²³, you write 6.02e23. The \"e\" stands for \"exponent\" and means \"times 10 to the power of.\"",
  },
{
    question: "Why use scientific notation?",
    answer: "Scientific notation saves space, reduces errors when writing many zeros, and makes it easy to compare magnitudes at a glance. It's essential in science and engineering where numbers span many orders of magnitude.",
  },
{
    question: "Can scientific notation have negative exponents?",
    answer: "Yes. Negative exponents represent numbers smaller than 1. For example, 0.001 equals 1 × 10⁻³. The negative exponent tells you to move the decimal point left instead of right.",
  },
{
    question: "What's the difference between scientific and engineering notation?",
    answer: "Scientific notation uses any integer exponent. Engineering notation uses exponents that are multiples of 3 (like 10³, 10⁶, 10⁻⁹), which align with metric prefixes (kilo, mega, nano). Engineering notation's coefficient ranges from 1 to 999.",
  }
  ]} />
</section>
    </div>
  );
}
