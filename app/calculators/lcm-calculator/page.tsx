"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Faqs from "@/components/utils/Faqs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LCMCalculator() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const calculate = () => {
    const n1 = parseInt(num1);
    const n2 = parseInt(num2);
    if (!isNaN(n1) && !isNaN(n2) && n1 !== 0 && n2 !== 0) {
      setResult(lcm(n1, n2));
    }
  };

  const reset = () => {
    setNum1("");
    setNum2("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">First Number</label>
              <Input
                type="number"
                placeholder="e.g., 12"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Second Number</label>
              <Input
                type="number"
                placeholder="e.g., 18"
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
                <p className="text-sm text-muted-foreground">LCM</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How LCM Calculation Works</CardTitle>
          <CardDescription>Understanding least common multiple methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold">Find the GCD First</h4>
                <p className="text-sm text-muted-foreground">
                  Use the Euclidean algorithm to find the Greatest Common Divisor. Repeatedly divide: GCD(a,b) = GCD(b, a mod b) until remainder is zero. The last non-zero remainder is the GCD.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold">Apply the LCM Formula</h4>
                <p className="text-sm text-muted-foreground">
                  LCM(a,b) = |a × b| / GCD(a,b). This elegant relationship means you can find LCM quickly once you know the GCD. The product of two numbers equals their LCM times their GCD.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold">Verify the Result</h4>
                <p className="text-sm text-muted-foreground">
                  Check that the LCM is divisible by both original numbers. The LCM is the smallest positive number that both inputs divide evenly into with no remainder.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>LCM Features and Applications</CardTitle>
          <CardDescription>Why least common multiple matters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Fraction Operations**</h4>
              <p className="text-xs text-muted-foreground">
                Adding fractions requires a common denominator. The LCM of denominators gives the least common denominator (LCD), keeping numbers manageable. Essential for arithmetic and algebra.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Scheduling and Timing**</h4>
              <p className="text-xs text-muted-foreground">
                When events repeat at different intervals, LCM tells you when they coincide. Bus schedules, machine maintenance, and planetary orbits all use LCM calculations for synchronization.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Gear Ratios**</h4>
              <p className="text-xs text-muted-foreground">
                In mechanical systems, LCM determines when gear teeth realign. This affects wear patterns and vibration. Engineers use LCM to optimize gear design for even wear distribution.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Music and Rhythm**</h4>
              <p className="text-xs text-muted-foreground">
                Polyrhythms in music rely on LCM. A 3:4 polyrhythm repeats every 12 beats (LCM of 3 and 4). Understanding LCM helps musicians master complex rhythmic patterns.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">LCM Examples Reference Table</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numbers</TableHead>
                  <TableHead>GCD</TableHead>
                  <TableHead>LCM</TableHead>
                  <TableHead>Verification</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">4, 6</TableCell>
                  <TableCell className="font-mono">2</TableCell>
                  <TableCell className="font-mono">12</TableCell>
                  <TableCell className="text-xs">12÷4=3, 12÷6=2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">8, 12</TableCell>
                  <TableCell className="font-mono">4</TableCell>
                  <TableCell className="font-mono">24</TableCell>
                  <TableCell className="text-xs">24÷8=3, 24÷12=2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">15, 25</TableCell>
                  <TableCell className="font-mono">5</TableCell>
                  <TableCell className="font-mono">75</TableCell>
                  <TableCell className="text-xs">75÷15=5, 75÷25=3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">7, 11</TableCell>
                  <TableCell className="font-mono">1</TableCell>
                  <TableCell className="font-mono">77</TableCell>
                  <TableCell className="text-xs">Coprime: LCM = product</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">12, 18</TableCell>
                  <TableCell className="font-mono">6</TableCell>
                  <TableCell className="font-mono">36</TableCell>
                  <TableCell className="text-xs">36÷12=3, 36÷18=2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">24, 36</TableCell>
                  <TableCell className="font-mono">12</TableCell>
                  <TableCell className="font-mono">72</TableCell>
                  <TableCell className="text-xs">72÷24=3, 72÷36=2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is the least common multiple?",
    answer: "The LCM is the smallest positive number that is divisible by both (or all) given numbers. For example, LCM(4,6) = 12 because 12 is the smallest number both 4 and 6 divide evenly.",
  },
{
    question: "How do you find LCM using prime factorization?",
    answer: "Break each number into prime factors. For each prime, take the highest power that appears in any factorization. Multiply these together. Example: 12=2²×3, 18=2×3², so LCM=2²×3²=36.",
  },
{
    question: "What is the relationship between LCM and GCD?",
    answer: "For any two numbers: LCM(a,b) × GCD(a,b) = |a × b|. This means LCM = |a×b| / GCD. This relationship makes LCM calculation efficient once you know the GCD.",
  },
{
    question: "Can LCM be calculated for more than two numbers?",
    answer: "Yes, find LCM iteratively: LCM(a,b,c) = LCM(LCM(a,b), c). For example, LCM(4,6,8) = LCM(LCM(4,6),8) = LCM(12,8) = 24. This extends to any number of inputs.",
  },
{
    question: "What is LCM used for in real life?",
    answer: "LCM appears in scheduling (when do repeating events coincide?), cooking (scaling recipes with different serving sizes), music (polyrhythms), and engineering (gear synchronization, signal processing).",
  }
  ]} />
</section>
    </div>
  );
}
