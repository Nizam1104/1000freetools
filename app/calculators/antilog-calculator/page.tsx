"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AntilogCalculator() {
  const [value, setValue] = useState<string>("");
  const [base, setBase] = useState<string>("10");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v = parseFloat(value);
    const b = parseFloat(base);
    
    if (!isNaN(v) && !isNaN(b) && b > 0 && b !== 1) {
      setResult(Math.pow(b, v));
    }
  };

  const reset = () => {
    setValue("");
    setBase("10");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Value (x)</label>
              <Input
                type="number"
                placeholder="e.g., 2"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base (default: 10)</label>
              <Input
                type="number"
                placeholder="e.g., e for natural antilog"
                step="any"
                value={base}
                onChange={(e) => setBase(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Antilog ({base}<sup>{value}</sup>)</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How to Use Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use This Antilog Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 list-decimal list-inside text-sm">
            <li>
              <strong>Enter the value (x):</strong> Input the exponent or logarithm value you want to find the antilog for. This is the power to which the base will be raised.
            </li>
            <li>
              <strong>Set the base:</strong> Choose the base for your calculation. The default is 10 (common antilog), but you can enter any positive number except 1. Use 2.71828 for natural antilog (base e).
            </li>
            <li>
              <strong>Calculate:</strong> Click the Calculate button to see the result. The calculator will compute base raised to the power of your input value.
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Understanding Antilog Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Understanding Antilog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            Antilog, short for "antilogarithm," is the inverse operation of a logarithm. If you think of a logarithm as asking "what power do I raise this base to get a certain number?", then antilog answers the opposite question: "what number do I get when I raise this base to a certain power?"
          </p>
          <p>
            The relationship between log and antilog is straightforward. If log<sub>b</sub>(x) = y, then antilog<sub>b</sub>(y) = x. In other words, applying log and then antilog (or vice versa) brings you back to your original number.
          </p>
          <p>
            The most common bases you'll encounter are:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Base 10:</strong> Called the common logarithm base, used in scientific notation and many engineering applications</li>
            <li><strong>Base e (2.71828...):</strong> Called the natural logarithm base, fundamental in calculus, physics, and continuous growth calculations</li>
            <li><strong>Base 2:</strong> Used in computer science and information theory</li>
          </ul>
          <p>
            Antilog is useful whenever you need to convert from a logarithmic scale back to a linear scale. This comes up constantly in science and engineering, from measuring sound intensity to calculating compound interest.
          </p>
        </CardContent>
      </Card>

      {/* Formula Reference Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Antilog Formula Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="bg-muted p-4 rounded-md">
            <p className="font-semibold mb-2">General Formula</p>
            <p className="font-mono">antilog<sub>b</sub>(x) = b<sup>x</sup></p>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <p className="font-semibold mb-2">Common Antilog (Base 10)</p>
            <p className="font-mono">antilog<sub>10</sub>(x) = 10<sup>x</sup></p>
            <p className="mt-2 text-muted-foreground">Example: antilog<sub>10</sub>(3) = 10<sup>3</sup> = 1000</p>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <p className="font-semibold mb-2">Natural Antilog (Base e)</p>
            <p className="font-mono">antilog<sub>e</sub>(x) = e<sup>x</sup></p>
            <p className="mt-2 text-muted-foreground">Example: antilog<sub>e</sub>(2) = e<sup>2</sup> ≈ 7.389</p>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <p className="font-semibold mb-2">Binary Antilog (Base 2)</p>
            <p className="font-mono">antilog<sub>2</sub>(x) = 2<sup>x</sup></p>
            <p className="mt-2 text-muted-foreground">Example: antilog<sub>2</sub>(4) = 2<sup>4</sup> = 16</p>
          </div>
        </CardContent>
      </Card>

      {/* Log and Antilog Relationship Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Log and Antilog Relationship Table</CardTitle>
          <CardDescription>See how logarithms and antilogarithms are inverse operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Logarithm</th>
                  <th className="text-left py-2 px-3">Result</th>
                  <th className="text-left py-2 px-3">Antilog</th>
                  <th className="text-left py-2 px-3">Returns</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3 font-mono">log<sub>10</sub>(100)</td>
                  <td className="py-2 px-3">= 2</td>
                  <td className="py-2 px-3 font-mono">antilog<sub>10</sub>(2)</td>
                  <td className="py-2 px-3">= 100</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-mono">log<sub>10</sub>(1000)</td>
                  <td className="py-2 px-3">= 3</td>
                  <td className="py-2 px-3 font-mono">antilog<sub>10</sub>(3)</td>
                  <td className="py-2 px-3">= 1000</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-mono">log<sub>10</sub>(0.1)</td>
                  <td className="py-2 px-3">= -1</td>
                  <td className="py-2 px-3 font-mono">antilog<sub>10</sub>(-1)</td>
                  <td className="py-2 px-3">= 0.1</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-mono">log<sub>10</sub>(1)</td>
                  <td className="py-2 px-3">= 0</td>
                  <td className="py-2 px-3 font-mono">antilog<sub>10</sub>(0)</td>
                  <td className="py-2 px-3">= 1</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono">ln(e)</td>
                  <td className="py-2 px-3">= 1</td>
                  <td className="py-2 px-3 font-mono">antilog<sub>e</sub>(1)</td>
                  <td className="py-2 px-3">= e ≈ 2.718</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Applications Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Applications of Antilog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold">Converting Logarithmic Scales Back to Linear</h4>
            <p className="text-muted-foreground">
              Many scientific measurements use logarithmic scales to handle huge ranges of values. Antilog converts these back to meaningful linear values you can actually use in calculations.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">pH Calculations</h4>
            <p className="text-muted-foreground">
              pH is defined as -log<sub>10</sub>[H<sup>+</sup>]. To find the hydrogen ion concentration from pH, you calculate [H<sup>+</sup>] = 10<sup>-pH</sup>. A pH of 3 means [H<sup>+</sup>] = 10<sup>-3</sup> = 0.001 mol/L.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">Decibel Calculations</h4>
            <p className="text-muted-foreground">
              Sound intensity in decibels uses the formula dB = 10 log<sub>10</sub>(P/P<sub>0</sub>). To find the actual power ratio from decibels, use P/P<sub>0</sub> = 10<sup>dB/10</sup>. A 20 dB increase means 10<sup>2</sup> = 100 times more power.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">Earthquake Magnitude (Richter Scale)</h4>
            <p className="text-muted-foreground">
              The Richter scale is logarithmic. Each whole number increase represents 10 times greater amplitude. The energy release follows E = 10<sup>1.5M + 4.8</sup> joules, where M is magnitude. A magnitude 6 quake releases about 10<sup>13.8</sup> joules.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">Financial Calculations</h4>
            <p className="text-muted-foreground">
              Compound interest calculations often use natural logarithms to solve for time or rate. When you need to convert back, antilog (specifically e<sup>x</sup>) gives you the actual growth factor. For continuous compounding: A = Pe<sup>rt</sup>.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold">What is antilog?</h4>
            <p className="text-muted-foreground">
              Antilog is the inverse operation of a logarithm. If you take the logarithm of a number, taking the antilog of that result gives you back the original number. Mathematically, antilog<sub>b</sub>(x) = b<sup>x</sup>.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">How do you calculate antilog?</h4>
            <p className="text-muted-foreground">
              To calculate antilog, raise the base to the power of the given value. For common antilog (base 10), calculate 10<sup>x</sup>. For natural antilog, calculate e<sup>x</sup>. Most calculators have dedicated buttons: 10<sup>x</sup> for common antilog and e<sup>x</sup> for natural antilog.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">What is the difference between log and antilog?</h4>
            <p className="text-muted-foreground">
              Log and antilog are inverse operations. Logarithm finds the exponent: log<sub>b</sub>(x) asks "what power do I raise b to get x?" Antilog finds the result: antilog<sub>b</sub>(y) asks "what do I get when I raise b to the power y?" They undo each other.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">Can antilog be negative?</h4>
            <p className="text-muted-foreground">
              The result of an antilog calculation is always positive when using a positive base. This is because any positive number raised to any real power always produces a positive result. However, the input value (the exponent) can be negative, which gives a fractional result between 0 and 1.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">What is the antilog of 0?</h4>
            <p className="text-muted-foreground">
              The antilog of 0 is always 1, regardless of the base (as long as the base is positive and not 1). This is because any number raised to the power of 0 equals 1. So antilog<sub>10</sub>(0) = 10<sup>0</sup> = 1, and antilog<sub>e</sub>(0) = e<sup>0</sup> = 1.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Related Tools Section */}    </div>
  );
}
