"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubtractionCalculator() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (!isNaN(n1) && !isNaN(n2)) {
      setResult(n1 - n2);
    }
  };

  const reset = () => {
    setNum1("");
    setNum2("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">First Number (Minuend)</label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Second Number (Subtrahend)</label>
              <Input
                type="number"
                placeholder="e.g., 25"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result (Difference)</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Subtraction Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
            <div>
              <p className="font-semibold">Enter the first number</p>
              <p className="text-sm text-muted-foreground">This is the number you're subtracting from (called the minuend). It can be positive or negative, whole or decimal.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
            <div>
              <p className="font-semibold">Enter the second number</p>
              <p className="text-sm text-muted-foreground">This is the number being subtracted (called the subtrahend). Enter any value you want to subtract from the first number.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
            <div>
              <p className="font-semibold">Get your result</p>
              <p className="text-sm text-muted-foreground">Click Calculate to see the difference. The result appears instantly below the input fields.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Subtraction</CardTitle>
          <CardDescription>The basics of finding the difference</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Subtraction is one of the four fundamental operations in arithmetic. It tells you how much is left when you take one quantity away from another, or how much greater one number is than another.
          </p>
          <p className="text-sm text-muted-foreground">
            The number you start with is called the <strong>minuend</strong>. The number you take away is the <strong>subtrahend</strong>. The result is called the <strong>difference</strong>. For example, in 15 – 7 = 8, fifteen is the minuend, seven is the subtrahend, and eight is the difference.
          </p>
          <p className="text-sm text-muted-foreground">
            Subtraction is the opposite of addition. If you know that 8 + 7 = 15, then you automatically know that 15 – 7 = 8. This relationship makes subtraction easier to understand and verify.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subtraction Properties Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-semibold">Property</th>
                  <th className="text-left py-2 px-3 font-semibold">Formula</th>
                  <th className="text-left py-2 px-3 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">Identity</td>
                  <td className="py-2 px-3 font-mono">a – 0 = a</td>
                  <td className="py-2 px-3">25 – 0 = 25</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Self-Subtraction</td>
                  <td className="py-2 px-3 font-mono">a – a = 0</td>
                  <td className="py-2 px-3">17 – 17 = 0</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Non-Commutative</td>
                  <td className="py-2 px-3 font-mono">a – b ≠ b – a</td>
                  <td className="py-2 px-3">10 – 3 = 7, but 3 – 10 = -7</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Non-Associative</td>
                  <td className="py-2 px-3 font-mono">(a – b) – c ≠ a – (b – c)</td>
                  <td className="py-2 px-3">(10 – 5) – 2 = 3, but 10 – (5 – 2) = 7</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Inverse of Addition</td>
                  <td className="py-2 px-3 font-mono">a – b = a + (-b)</td>
                  <td className="py-2 px-3">8 – 3 = 8 + (-3) = 5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subtracting Positive and Negative Numbers</CardTitle>
          <CardDescription>Rules for working with signed numbers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold mb-2">Positive minus Positive</h4>
            <p className="text-sm text-muted-foreground mb-2">Subtract normally. If the second number is larger, the result is negative.</p>
            <p className="text-sm font-mono">15 – 8 = 7 | 8 – 15 = -7</p>
          </div>
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold mb-2">Positive minus Negative</h4>
            <p className="text-sm text-muted-foreground mb-2">Subtracting a negative is the same as adding. The two minus signs become a plus.</p>
            <p className="text-sm font-mono">10 – (-5) = 10 + 5 = 15</p>
          </div>
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold mb-2">Negative minus Positive</h4>
            <p className="text-sm text-muted-foreground mb-2">Add the absolute values and keep the negative sign.</p>
            <p className="text-sm font-mono">-8 – 3 = -11</p>
          </div>
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold mb-2">Negative minus Negative</h4>
            <p className="text-sm text-muted-foreground mb-2">Change the second minus to plus, then follow addition rules for negatives.</p>
            <p className="text-sm font-mono">-10 – (-4) = -10 + 4 = -6</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Subtraction Applications</CardTitle>
          <CardDescription>Where you use subtraction every day</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Calculating Change</h4>
                <p className="text-sm text-muted-foreground">Subtract the purchase amount from what you paid to find your change.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Finding Temperature Differences</h4>
                <p className="text-sm text-muted-foreground">Subtract the low temperature from the high to see the daily range.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Tracking Weight Loss</h4>
                <p className="text-sm text-muted-foreground">Subtract current weight from starting weight to measure progress.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Budget Planning</h4>
                <p className="text-sm text-muted-foreground">Subtract expenses from income to see what's left for savings.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Time Calculations</h4>
                <p className="text-sm text-muted-foreground">Subtract start time from end time to find duration.</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-1">What is subtraction?</h4>
            <p className="text-sm text-muted-foreground">
              Subtraction is the arithmetic operation of finding the difference between two numbers by taking one away from the other. It's the opposite of addition and is used to calculate how much remains, how much more is needed, or how much greater one value is than another.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">What are the parts of a subtraction problem?</h4>
            <p className="text-sm text-muted-foreground">
              A subtraction problem has three parts: the minuend (the number being subtracted from), the subtrahend (the number being subtracted), and the difference (the result). In 20 – 8 = 12, twenty is the minuend, eight is the subtrahend, and twelve is the difference.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Can you subtract a larger number from a smaller one?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. When you subtract a larger number from a smaller one, the result is negative. For example, 5 – 12 = -7. This represents moving left past zero on the number line.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Why is subtracting a negative the same as adding?</h4>
            <p className="text-sm text-muted-foreground">
              Think of it this way: if losing $5 is represented as -5, then "taking away a loss of $5" means you're actually gaining $5. Mathematically, 10 – (-5) = 10 + 5 = 15. Two negatives make a positive in subtraction.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">How do you check a subtraction answer?</h4>
            <p className="text-sm text-muted-foreground">
              Add the difference back to the subtrahend. If your subtraction is correct, you should get the original minuend. For example, if 25 – 9 = 16, check by adding 16 + 9 = 25.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/calculators/addition-calculator" className="text-primary hover:underline">
                Addition Calculator
              </a>
              <span className="text-muted-foreground ml-2">– Add multiple numbers together</span>
            </li>
            <li>
              <a href="/calculators/multiplication-calculator" className="text-primary hover:underline">
                Multiplication Calculator
              </a>
              <span className="text-muted-foreground ml-2">– Multiply numbers instantly</span>
            </li>
            <li>
              <a href="/calculators/division-calculator" className="text-primary hover:underline">
                Division Calculator
              </a>
              <span className="text-muted-foreground ml-2">– Divide numbers with remainder support</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
