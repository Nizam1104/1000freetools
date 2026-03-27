"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Faqs from "@/components/utils/Faqs";


export default function LogarithmCalculator() {
  const [number, setNumber] = useState<string>("");
  const [base, setBase] = useState<string>("10");
  const [result, setResult] = useState<{ natural: number; base10: number; customBase: number } | null>(null);

  const calculate = () => {
    const num = parseFloat(number);
    const b = parseFloat(base);
    
    if (!isNaN(num) && !isNaN(b) && num > 0 && b > 0 && b !== 1) {
      setResult({
        natural: Math.log(num),
        base10: Math.log10(num),
        customBase: Math.log(num) / Math.log(b)
      });
    }
  };

  const reset = () => {
    setNumber("");
    setBase("10");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number (x)</label>
              <Input
                type="number"
                placeholder="e.g., 100"
                step="any"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base (optional, default: 10)</label>
              <Input
                type="number"
                placeholder="e.g., 2"
                step="any"
                value={base}
                onChange={(e) => setBase(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Natural Log (ln)</p>
                    <p className="text-xl font-semibold">{result.natural.toFixed(6)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Log Base 10</p>
                    <p className="text-xl font-semibold">{result.base10.toFixed(6)}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Log Base {base}</p>
                  <p className="text-lg">{result.customBase.toFixed(6)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Logarithm Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Enter the number</p>
                  <p>Input any positive number to calculate its logarithm. Logarithms are only defined for positive real numbers.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Choose the base (optional)</p>
                  <p>Enter a custom base, or leave the default of 10 for common logarithms. The calculator also shows the natural log (base e).</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">View all results</p>
                  <p>Get the natural logarithm (ln), common logarithm (log10), and your custom base logarithm in one calculation.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Logarithm Values
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Number (x)</th>
                    <th className="text-left py-3 px-2 font-semibold">log10(x)</th>
                    <th className="text-left py-3 px-2 font-semibold">ln(x)</th>
                    <th className="text-left py-3 px-2 font-semibold">log2(x)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">0</td>
                    <td className="py-3 px-2">0</td>
                    <td className="py-3 px-2">0</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">2</td>
                    <td className="py-3 px-2">0.301030</td>
                    <td className="py-3 px-2">0.693147</td>
                    <td className="py-3 px-2">1</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">10</td>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">2.302585</td>
                    <td className="py-3 px-2">3.321928</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">100</td>
                    <td className="py-3 px-2">2</td>
                    <td className="py-3 px-2">4.605170</td>
                    <td className="py-3 px-2">6.643856</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1,000</td>
                    <td className="py-3 px-2">3</td>
                    <td className="py-3 px-2">6.907755</td>
                    <td className="py-3 px-2">9.965784</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">1,000,000</td>
                    <td className="py-3 px-2">6</td>
                    <td className="py-3 px-2">13.815511</td>
                    <td className="py-3 px-2">19.931569</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: log10(x) is the common logarithm, ln(x) is the natural logarithm (base e ≈ 2.718), and log2(x) is the binary logarithm.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Logarithms
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                A logarithm answers the question: "To what power must I raise the base to get this number?" For example, log base 10 of 100 equals 2, because 10 raised to the power of 2 equals 100. In mathematical notation: log10(100) = 2 because 10^2 = 100.
              </p>
              <p>
                The natural logarithm uses Euler's number e (approximately 2.718) as its base. Natural logs appear throughout science and engineering because e describes continuous growth. The natural log of x is written as ln(x) or loge(x).
              </p>
              <p>
                Logarithms convert multiplication into addition, which made them invaluable before calculators existed. Scientists used log tables and slide rules to simplify complex calculations. Today, logarithms remain essential in fields like acoustics (decibels), chemistry (pH), seismology (Richter scale), and information theory (bits and bytes).
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Logarithm Properties
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-2">Product Rule</p>
                <p className="font-mono text-xs mb-1">logb(x × y) = logb(x) + logb(y)</p>
                <p>The log of a product equals the sum of the logs. Example: log10(100 × 1000) = log10(100) + log10(1000) = 2 + 3 = 5</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-2">Quotient Rule</p>
                <p className="font-mono text-xs mb-1">logb(x / y) = logb(x) - logb(y)</p>
                <p>The log of a quotient equals the difference of the logs. Example: log10(1000 / 100) = log10(1000) - log10(100) = 3 - 2 = 1</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-2">Power Rule</p>
                <p className="font-mono text-xs mb-1">logb(x^n) = n × logb(x)</p>
                <p>The log of a power equals the exponent times the log. Example: log10(100^3) = 3 × log10(100) = 3 × 2 = 6</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground mb-2">Change of Base Formula</p>
                <p className="font-mono text-xs mb-1">logb(x) = logc(x) / logc(b)</p>
                <p>Convert between bases using this formula. Most calculators only have log10 and ln, so use this to find other bases. Example: log2(100) = log10(100) / log10(2) = 2 / 0.301 ≈ 6.64</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is the difference between log and ln?",
    answer: "\"log\" without a specified base usually means log base 10 (common logarithm). \"ln\" means log base e (natural logarithm), where e ≈ 2.718. Common logs are used in engineering and science applications like decibels and pH. Natural logs appear in calculus, population growth models, and continuous compounding interest.",
  },
{
    question: "Can logarithms be negative?",
    answer: "The result of a logarithm can be negative. For example, log10(0.1) = -1 because 10^(-1) = 0.1. However, you cannot take the logarithm of a negative number or zero in the real number system. There's no real power of 10 that gives you -100 or 0.",
  },
{
    question: "Why are logarithms useful?",
    answer: "Logarithms compress huge ranges of values into manageable numbers. The Richter scale uses logs so an earthquake of magnitude 8 is 10 times stronger than magnitude 7. Decibels use logs to represent sound intensity. pH measures acidity on a log scale. Without logs, we'd need unwieldy numbers to describe these phenomena.",
  },
{
    question: "What is log base 2 used for?",
    answer: "Binary logarithms (base 2) are fundamental in computer science. They tell you how many bits are needed to represent a number. For example, log2(256) = 8, meaning you need 8 bits to represent 256 different values. Binary logs also appear in algorithm analysis, data compression, and information theory.",
  },
{
    question: "How do I calculate logarithms without a calculator?",
    answer: "Memorize key values like log10(2) ≈ 0.301 and log10(3) ≈ 0.477. Use logarithm properties to break down complex numbers. For example, log10(6) = log10(2 × 3) = log10(2) + log10(3) ≈ 0.301 + 0.477 = 0.778. Log tables were the standard tool before electronic calculators.",
  }
  ]} />
</section>

      </div>
    </div>
  );
}
