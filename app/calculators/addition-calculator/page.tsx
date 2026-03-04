"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdditionCalculator() {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const nums = numbers.split(",").map((n) => parseFloat(n.trim())).filter((n) => !isNaN(n));
    if (nums.length > 0) {
      setResult(nums.reduce((a, b) => a + b, 0));
    }
  };

  const reset = () => {
    setNumbers("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Addition Calculator</CardTitle>
          <CardDescription>Add multiple numbers together</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Enter numbers (comma-separated)
              </label>
              <Input
                type="text"
                placeholder="e.g., 5, 10, 15, 20"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How to Use This Addition Calculator */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use This Addition Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Enter the numbers you want to add in the input field, separated by commas (for example: 5, 10, 15, 20)</li>
            <li>Click the "Calculate" button to see the sum of all your numbers</li>
            <li>Use the "Reset" button to clear the input and start a new calculation</li>
          </ol>
        </CardContent>
      </Card>

      {/* Understanding Addition */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Understanding Addition</CardTitle>
          <CardDescription>The foundation of arithmetic</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">What is Addition?</h3>
            <p className="text-sm text-muted-foreground">
              Addition is the process of combining two or more quantities to find their total. It's one of the four basic operations in arithmetic, along with subtraction, multiplication, and division. When you add numbers together, you're finding out how much you have in all.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Basic Properties of Addition</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>Commutative Property:</strong> The order of numbers doesn't change the sum (3 + 5 = 5 + 3)</li>
              <li><strong>Associative Property:</strong> How you group numbers doesn't change the sum ((2 + 3) + 4 = 2 + (3 + 4))</li>
              <li><strong>Identity Property:</strong> Adding zero to any number gives you the same number back (7 + 0 = 7)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Addition with Positive and Negative Numbers</h3>
            <p className="text-sm text-muted-foreground mb-2">
              When adding positive and negative numbers, think of it as moving along a number line:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Positive + Positive = Move right on the number line (5 + 3 = 8)</li>
              <li>Negative + Negative = Move further left (-5 + -3 = -8)</li>
              <li>Positive + Negative = Move in the direction of the larger absolute value (5 + -3 = 2)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Mental Math Strategies for Addition</h3>
            <p className="text-sm text-muted-foreground">
              Building mental addition skills helps you calculate faster without relying on tools. Start with simple strategies like making tens, breaking apart numbers, and using compensation. Practice regularly with everyday situations like adding prices while shopping or calculating total distances.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Addition Properties Reference Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Addition Properties Reference Table</CardTitle>
          <CardDescription>Key properties to remember</CardDescription>
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
                  <td className="py-2 px-3">Commutative</td>
                  <td className="py-2 px-3 font-mono">a + b = b + a</td>
                  <td className="py-2 px-3">4 + 7 = 7 + 4 = 11</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Associative</td>
                  <td className="py-2 px-3 font-mono">(a + b) + c = a + (b + c)</td>
                  <td className="py-2 px-3">(2 + 3) + 4 = 2 + (3 + 4) = 9</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Identity</td>
                  <td className="py-2 px-3 font-mono">a + 0 = a</td>
                  <td className="py-2 px-3">15 + 0 = 15</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Inverse</td>
                  <td className="py-2 px-3 font-mono">a + (-a) = 0</td>
                  <td className="py-2 px-3">8 + (-8) = 0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Mental Addition Strategies */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Mental Addition Strategies</CardTitle>
          <CardDescription>Calculate faster in your head</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Breaking Apart Numbers</h3>
            <p className="text-sm text-muted-foreground mb-1">
              Split numbers into tens and ones, add separately, then combine:
            </p>
            <p className="text-sm font-mono bg-muted p-2 rounded">34 + 27 = (30 + 20) + (4 + 7) = 50 + 11 = 61</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Making Tens</h3>
            <p className="text-sm text-muted-foreground mb-1">
              Adjust one number to make a ten, then compensate:
            </p>
            <p className="text-sm font-mono bg-muted p-2 rounded">8 + 6 = 8 + 2 + 4 = 10 + 4 = 14</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Compensation Method</h3>
            <p className="text-sm text-muted-foreground mb-1">
              Round one number up, then adjust the result:
            </p>
            <p className="text-sm font-mono bg-muted p-2 rounded">98 + 47 = 100 + 45 = 145</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Column Addition for Larger Numbers</h3>
            <p className="text-sm text-muted-foreground">
              For bigger numbers, stack them vertically and add column by column from right to left, carrying over when a column sums to 10 or more. This keeps your work organized and reduces mistakes.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Common Addition Applications */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common Addition Applications</CardTitle>
          <CardDescription>Where you'll use addition every day</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Adding Prices When Shopping</h4>
                <p className="text-sm text-muted-foreground">Calculate your total bill before checkout by adding up the prices of all items in your cart.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Calculating Total Distances</h4>
                <p className="text-sm text-muted-foreground">Add up segments of a trip to find the total distance traveled or remaining.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Summing Time Durations</h4>
                <p className="text-sm text-muted-foreground">Combine time spent on different tasks to track your day or plan your schedule.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Combining Measurements</h4>
                <p className="text-sm text-muted-foreground">Add lengths, weights, or volumes when working on recipes, construction, or crafts.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-sm">Budget Calculations</h4>
                <p className="text-sm text-muted-foreground">Total your income sources or add up expenses to manage your finances.</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about addition</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm mb-1">What are the rules for adding positive and negative numbers?</h3>
            <p className="text-sm text-muted-foreground">
              When adding numbers with the same sign, add their absolute values and keep the sign. When adding numbers with different signs, subtract the smaller absolute value from the larger one and keep the sign of the number with the larger absolute value.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">How do you add large numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Use column addition: stack the numbers vertically, aligning digits by place value. Add each column from right to left, carrying over to the next column when the sum is 10 or greater.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">What is the sum called in addition?</h3>
            <p className="text-sm text-muted-foreground">
              The result of an addition problem is called the "sum." The numbers being added are called "addends."
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">Can you add fractions with different denominators?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but first you need to find a common denominator. Convert each fraction to an equivalent fraction with the common denominator, then add the numerators while keeping the denominator the same.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1">What happens when you add zero to a number?</h3>
            <p className="text-sm text-muted-foreground">
              Adding zero to any number gives you the same number back. This is called the Identity Property of Addition. Zero is the additive identity because it doesn't change the value of the number it's added to.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Related Tools */}
      <Card className="mt-6 mb-8">
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
          <CardDescription>Explore more calculators</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/calculators/subtraction-calculator" className="text-primary hover:underline">
                Subtraction Calculator
              </a>
            </li>
            <li>
              <a href="/calculators/multiplication-calculator" className="text-primary hover:underline">
                Multiplication Calculator
              </a>
            </li>
            <li>
              <a href="/calculators/average-calculator" className="text-primary hover:underline">
                Average Calculator
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
