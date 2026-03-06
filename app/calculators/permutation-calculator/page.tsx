"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PermutationCalculator() {
  const [n, setN] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [result, setResult] = useState<{
    permutations: string;
    formula: string;
  } | null>(null);

  const factorial = (num: number): bigint => {
    let result = BigInt(1);
    for (let i = 2; i <= num; i++) {
      result *= BigInt(i);
    }
    return result;
  };

  const calculate = () => {
    const nVal = parseInt(n);
    const rVal = parseInt(r);

    if (
      !isNaN(nVal) &&
      !isNaN(rVal) &&
      nVal >= 0 &&
      rVal >= 0 &&
      nVal >= rVal
    ) {
      const permutations = factorial(nVal) / factorial(nVal - rVal);
      setResult({
        permutations: permutations.toString(),
        formula: `P(${nVal}, ${rVal}) = ${nVal}! / (${nVal}-${rVal})! = ${permutations}`,
      });
    }
  };

  const reset = () => {
    setN("");
    setR("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Total items (n)
              </label>
              <Input
                type="number"
                placeholder="e.g., 10"
                min="0"
                value={n}
                onChange={(e) => setN(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Items to select (r)
              </label>
              <Input
                type="number"
                placeholder="e.g., 3"
                min="0"
                value={r}
                onChange={(e) => setR(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Permutations</p>
                  <p className="text-2xl font-semibold">
                    {result.permutations}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Formula</p>
                  <p className="text-sm">{result.formula}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>How to Use This Permutation Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</div>
              <div>
                <p className="font-medium text-foreground">Enter total items (n)</p>
                <p>Input the total number of items in your set. This is the complete pool you're selecting from.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</div>
              <div>
                <p className="font-medium text-foreground">Enter items to select (r)</p>
                <p>Input how many items you want to arrange. This must be less than or equal to n.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</div>
              <div>
                <p className="font-medium text-foreground">Click Calculate</p>
                <p>The calculator computes P(n,r) — the number of possible arrangements where order matters.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permutation Examples Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Scenario</th>
                    <th className="text-left py-3 px-2 font-semibold">n</th>
                    <th className="text-left py-3 px-2 font-semibold">r</th>
                    <th className="text-left py-3 px-2 font-semibold">P(n,r)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">Podium finishes (1st, 2nd, 3rd) from 8 runners</td>
                    <td className="py-3 px-2">8</td>
                    <td className="py-3 px-2">3</td>
                    <td className="py-3 px-2 font-mono">336</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Arrange 5 books on a shelf</td>
                    <td className="py-3 px-2">5</td>
                    <td className="py-3 px-2">5</td>
                    <td className="py-3 px-2 font-mono">120</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Pick president and VP from 10 members</td>
                    <td className="py-3 px-2">10</td>
                    <td className="py-3 px-2">2</td>
                    <td className="py-3 px-2 font-mono">90</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">4-digit codes from digits 0-9</td>
                    <td className="py-3 px-2">10</td>
                    <td className="py-3 px-2">4</td>
                    <td className="py-3 px-2 font-mono">5,040</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Seating 6 people at a table</td>
                    <td className="py-3 px-2">6</td>
                    <td className="py-3 px-2">6</td>
                    <td className="py-3 px-2 font-mono">720</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Top 3 songs from playlist of 20</td>
                    <td className="py-3 px-2">20</td>
                    <td className="py-3 px-2">3</td>
                    <td className="py-3 px-2 font-mono">6,840</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Permutations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">What Is a Permutation?</h4>
              <p>A permutation is an arrangement of items where order matters. ABC and BAC are different permutations of the same three letters. The key question permutations answer is: "How many different ways can I arrange r items selected from n total items?"</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">The Permutation Formula</h4>
              <p>The formula for permutations is P(n,r) = n! / (n-r)!. Factorial (written as !) means multiply all positive integers up to that number. So 5! = 5 × 4 × 3 × 2 × 1 = 120. For P(8,3): 8! / (8-3)! = 8! / 5! = 8 × 7 × 6 = 336.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Permutations vs Combinations</h4>
              <p>Permutations count arrangements where order matters. Combinations count selections where order doesn't matter. Picking a committee of 3 from 10 people is a combination. Picking president, VP, and treasurer from 10 people is a permutation — the positions are distinct.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>When to Use Permutations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Rankings and Positions</p>
                <p>Use permutations for race results, contest rankings, or any scenario where 1st, 2nd, 3rd are different outcomes.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Passwords and Codes</p>
                <p>Arranging digits or characters where sequence matters. The code 1234 differs from 4321.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Seating Arrangements</p>
                <p>Who sits where matters. Different seatings of the same people count as different permutations.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Scheduling</p>
                <p>Order of tasks, classes, or appointments. The sequence affects the outcome.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">What does P(n,r) mean?</h4>
              <p>P(n,r) means "permutations of n items taken r at a time." It counts how many ways you can arrange r items selected from n total items when order matters.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">When do I use factorial in permutations?</h4>
              <p>Factorial appears in the permutation formula: P(n,r) = n! / (n-r)!. When r equals n (arranging all items), it simplifies to just n!.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">How is permutation different from combination?</h4>
              <p>Permutations care about order; combinations don't. ABC and BAC are 2 different permutations but 1 combination. Use permutations for arrangements, combinations for selections.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Can r be larger than n?</h4>
              <p>No. You can't select more items than you have. If r &gt; n, the permutation equals 0. The calculator requires r ≤ n.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">What is 0! (zero factorial)?</h4>
              <p>By definition, 0! = 1. This makes the formulas work correctly. P(n,n) = n! / 0! = n! / 1 = n!, which is correct for arranging all n items.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <a href="/calculators/combinations-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Combinations Calculator</span>
                <p className="text-muted-foreground">Calculate combinations where order doesn't matter</p>
              </a>
              <a href="/calculators/factorial-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Factorial Calculator</span>
                <p className="text-muted-foreground">Calculate factorials for any positive integer</p>
              </a>
              <a href="/calculators/probability-calculator" className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <span className="font-medium text-foreground">Probability Calculator</span>
                <p className="text-muted-foreground">Calculate probabilities for various scenarios</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
