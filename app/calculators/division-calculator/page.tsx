"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DivisionCalculator() {
  const [dividend, setDividend] = useState<string>("");
  const [divisor, setDivisor] = useState<string>("");
  const [result, setResult] = useState<{ quotient: number; remainder: number } | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    const n1 = parseFloat(dividend);
    const n2 = parseFloat(divisor);
    
    if (isNaN(n1) || isNaN(n2)) {
      setError("Please enter valid numbers");
      return;
    }
    
    if (n2 === 0) {
      setError("Division by zero is not allowed");
      return;
    }
    
    setError("");
    setResult({
      quotient: n1 / n2,
      remainder: n1 % n2
    });
  };

  const reset = () => {
    setDividend("");
    setDivisor("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Dividend</label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={dividend}
                onChange={(e) => setDividend(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Divisor</label>
              <Input
                type="number"
                placeholder="e.g., 5"
                value={divisor}
                onChange={(e) => setDivisor(e.target.value)}
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Quotient</p>
                  <p className="text-2xl font-semibold">{result.quotient}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remainder</p>
                  <p className="text-xl font-semibold">{result.remainder}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <div className="mt-8 space-y-8">
        {/* How It Works */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">How the Division Calculator Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter the Dividend</h3>
                  <p className="text-sm text-muted-foreground">Input the number you want to divide (the total amount to be split into parts).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Enter the Divisor</h3>
                  <p className="text-sm text-muted-foreground">Input the number you are dividing by (how many parts to split into).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Get Quotient and Remainder</h3>
                  <p className="text-sm text-muted-foreground">Receive instant results showing the quotient (answer) and any remainder.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features and Benefits */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Features of This Division Calculator</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Quotient and Remainder</h3>
                    <p className="text-sm text-muted-foreground">Get both the division result (quotient) and any leftover amount (remainder) in one calculation.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Decimal Support</h3>
                    <p className="text-sm text-muted-foreground">Handle both whole numbers and decimal values for accurate division calculations.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Division by Zero Protection</h3>
                    <p className="text-sm text-muted-foreground">Built-in error handling prevents invalid calculations and explains why division by zero is undefined.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Instant Results</h3>
                    <p className="text-sm text-muted-foreground">Get division answers immediately without manual calculations or long division steps.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Free Math Tool</h3>
                    <p className="text-sm text-muted-foreground">Completely free division calculator for students, teachers, and anyone needing quick math help.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Mobile-Friendly Design</h3>
                    <p className="text-sm text-muted-foreground">Calculate division problems on any device - perfect for homework help on the go.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reference Table */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3">Division Terms Explained</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Term</th>
                      <th className="text-left py-2">Definition</th>
                      <th className="text-left py-2">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Dividend</td>
                      <td className="py-2">Number being divided</td>
                      <td className="py-2">In 100 &divide; 5, 100 is the dividend</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Divisor</td>
                      <td className="py-2">Number dividing the dividend</td>
                      <td className="py-2">In 100 &divide; 5, 5 is the divisor</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Quotient</td>
                      <td className="py-2">Result of division</td>
                      <td className="py-2">In 100 &divide; 5 = 20, 20 is the quotient</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Remainder</td>
                      <td className="py-2">Amount left over after division</td>
                      <td className="py-2">In 101 &divide; 5 = 20 R1, 1 is the remainder</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">How do I calculate division problems?</h3>
                <p className="text-sm text-muted-foreground">Division splits a number (dividend) into equal parts determined by another number (divisor). The answer is called the quotient. For example, 100 &divide; 5 = 20 means splitting 100 into 5 equal groups gives 20 in each group.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What is the remainder in division?</h3>
                <p className="text-sm text-muted-foreground">The remainder is what is left over when one number does not divide evenly into another. For example, 10 &divide; 3 = 3 with remainder 1, because 3 goes into 10 three times (9) with 1 left over.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Why can&apos;t you divide by zero?</h3>
                <p className="text-sm text-muted-foreground">Division by zero is undefined because there is no number that, when multiplied by zero, gives a non-zero result. Think of it this way: you cannot split something into zero parts - it makes no logical sense.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do you check division answers?</h3>
                <p className="text-sm text-muted-foreground">Multiply the quotient by the divisor, then add the remainder. The result should equal the original dividend. For example, if 100 &divide; 7 = 14 R2, check: 14 &times; 7 + 2 = 100.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What is long division?</h3>
                <p className="text-sm text-muted-foreground">Long division is a step-by-step method for dividing large numbers by hand. It breaks the problem into smaller steps: divide, multiply, subtract, bring down. Our calculator gives instant results without showing these intermediate steps.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools */}
      </div>
    </div>
  );
}
