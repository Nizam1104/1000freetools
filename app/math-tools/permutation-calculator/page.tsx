"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PermutationCalculator() {
  const [n, setN] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const factorial = (num: number): string => {
    if (num <= 1) return "1";
    let result = BigInt(1);
    for (let i = BigInt(2); i <= BigInt(num); i++) result *= i;
    return result.toString();
  };

  const factorialNum = (num: number): bigint => {
    if (num <= 1) return BigInt(1);
    let result = BigInt(1);
    for (let i = BigInt(2); i <= BigInt(num); i++) result *= i;
    return result;
  };

  const calculate = () => {
    setResult(null);
    setError("");

    const nNum = parseInt(n);
    const rNum = parseInt(r);

    if (isNaN(nNum) || isNaN(rNum) || nNum < 0 || rNum < 0 || rNum > nNum) {
      setError("Enter valid values (0 ≤ r ≤ n)");
      return;
    }

    const nFact = factorialNum(nNum);
    const nrFact = factorialNum(nNum - rNum);
    const rFact = factorialNum(rNum);
    const npr = nFact / nrFact;

    setResult({
      n: nNum,
      r: rNum,
      npr: npr.toString(),
      nFact: nFact.toString(),
      nrFact: nrFact.toString(),
      rFact: rFact.toString(),
      steps: [
        `Formula: P(n,r) = n! / (n-r)!`,
        ``,
        `Substitute values:`,
        `  P(${nNum},${rNum}) = ${nNum}! / (${nNum}-${rNum})!`,
        `  P(${nNum},${rNum}) = ${nNum}! / ${nNum - rNum}!`,
        ``,
        `Calculate factorials:`,
        `  ${nNum}! = ${nFact.toString()}`,
        `  ${nNum - rNum}! = ${nrFact.toString()}`,
        ``,
        `Divide:`,
        `  P(${nNum},${rNum}) = ${nFact.toString()} / ${nrFact.toString()}`,
        `  P(${nNum},${rNum}) = ${npr.toString()}`,
      ],
    });
  };

  const reset = () => {
    setN("");
    setR("");
    setResult(null);
    setError("");
  };

  const loadExample = (nVal: string, rVal: string) => {
    setN(nVal);
    setR(rVal);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Permutation Calculator - Calculate nPr Online
        </h1>
        <p className="text-muted-foreground">
          Calculate permutations (nPr) instantly with our free online
          permutation calculator. Find the number of ways r items can be
          arranged from n items with formula and solution shown.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>n (total items)</Label>
            <Input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
          <div>
            <Label>r (items to arrange)</Label>
            <Input
              type="number"
              value={r}
              onChange={(e) => setR(e.target.value)}
              placeholder="e.g., 3"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
            {error}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5", "3")}>5P3 (books)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("8", "3")}>8P3 (podium)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10", "4")}>10P4 (codes)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("6", "6")}>6P6 (all items)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12", "2")}>12P2 (officers)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("7", "4")}>7P4 (seating)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("15", "5")}>15P5 (large)</Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">
                P(n,r) = nPr
              </p>
              <p className="text-5xl font-bold">{result.npr}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {result.n}! / ({result.n}-{result.r})!
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">
                Step-by-Step Solution
              </h4>
              <div className="space-y-2 text-sm font-mono">
                {result.steps.map((s: string, i: number) => (
                  <div key={i}>{s}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Permutations</h2>
        <p className="text-muted-foreground">
          Permutations count the number of ways you can arrange items when order matters. Think about it: picking a president, vice-president, and treasurer from 10 people gives different results depending on who gets which role. That's a permutation problem.
        </p>
        <p className="text-muted-foreground">
          The key insight is that each position you fill reduces your options. For the first position, you have n choices. For the second, you have n-1 choices (one person is already placed). For the third, n-2 choices, and so on.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Permutation Formula</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-mono text-center text-lg mb-3">
            P(n,r) = n! / (n-r)!
          </p>
          <p className="text-sm text-muted-foreground">
            Where n is the total number of items, r is how many you're arranging, and ! means factorial (multiply all whole numbers from 1 up to that number). The formula essentially multiplies n × (n-1) × (n-2) × ... for r terms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">When Order Matters</h4>
            <p className="text-sm text-muted-foreground mb-2">Use permutations when:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Assigning specific roles (president, VP, secretary)</li>
              <li>• Creating passwords or codes</li>
              <li>• Arranging items in a row</li>
              <li>• Determining race finish orders</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">When Order Doesn't Matter</h4>
            <p className="text-sm text-muted-foreground mb-2">Use combinations instead for:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Selecting team members (no roles)</li>
              <li>• Picking lottery numbers</li>
              <li>• Choosing menu items</li>
              <li>• Drawing cards from a deck</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Arranging Books on a Shelf</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You have 5 different books and want to display 3 of them on a shelf. How many different arrangements are possible?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>n = 5 (total books), r = 3 (books to arrange)</div>
              <div>P(5,3) = 5! / (5-3)! = 5! / 2!</div>
              <div>5! = 5 × 4 × 3 × 2 × 1 = 120</div>
              <div>2! = 2 × 1 = 2</div>
              <div>P(5,3) = 120 / 2 = 60</div>
              <div className="text-green-600 font-semibold">There are 60 different ways to arrange 3 books from 5</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Race Podium Finishes</h4>
            <p className="text-sm text-muted-foreground mb-2">
              In a race with 8 runners, how many different ways can the top 3 positions (gold, silver, bronze) be filled?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>n = 8 (runners), r = 3 (podium positions)</div>
              <div>P(8,3) = 8! / (8-3)! = 8! / 5!</div>
              <div>This simplifies to: 8 × 7 × 6 = 336</div>
              <div className="text-green-600 font-semibold">There are 336 possible podium outcomes</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Creating 4-Digit PINs</h4>
            <p className="text-sm text-muted-foreground mb-2">
              How many unique 4-digit PINs can be created using digits 0-9 without repeating any digit?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>n = 10 (digits 0-9), r = 4 (PIN length)</div>
              <div>P(10,4) = 10! / (10-4)! = 10! / 6!</div>
              <div>= 10 × 9 × 8 × 7 = 5,040</div>
              <div className="text-green-600 font-semibold">5,040 unique PINs without digit repetition</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Electing Club Officers</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A club with 12 members needs to elect a president and vice-president. How many possible outcomes?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>n = 12 (members), r = 2 (officer positions)</div>
              <div>P(12,2) = 12! / (12-2)! = 12! / 10!</div>
              <div>= 12 × 11 = 132</div>
              <div className="text-green-600 font-semibold">132 different ways to elect the two officers</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Seating Arrangements</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Seven people are to be seated in a row, but there are only 4 chairs. How many seating arrangements?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>n = 7 (people), r = 4 (chairs)</div>
              <div>P(7,4) = 7! / (7-4)! = 7! / 3!</div>
              <div>= 7 × 6 × 5 × 4 = 840</div>
              <div className="text-green-600 font-semibold">840 different seating arrangements</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            The factorial symbol (!) was introduced by French mathematician Christian Kramp in 1808. Before that, mathematicians wrote out "factorial" in full. The notation caught on quickly because it saved space - imagine writing n × (n-1) × (n-2) × ... × 1 every time! Fun fact: 0! equals 1 by definition, which makes permutation formulas work correctly even when r equals n.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between permutations and combinations?</h4>
            <p className="text-sm text-muted-foreground">
              Order matters in permutations but not in combinations. Picking Alice, Bob, then Carol as president, VP, secretary (permutation) is different from Carol, Alice, Bob. But picking those three people for a committee (combination) is the same group either way. Permutations always give larger numbers: P(n,r) = C(n,r) × r!
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can r be larger than n in permutations?</h4>
            <p className="text-sm text-muted-foreground">
              No, that's impossible. You can't arrange more items than you have. If you have 5 books, you can't create an arrangement of 6 books. Mathematically, P(n,r) = 0 when r &gt; n, though most calculators will just give an error.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does P(n,n) equal?</h4>
            <p className="text-sm text-muted-foreground">
              P(n,n) = n! - you're arranging all n items. For example, P(5,5) = 5! = 120. This makes sense: arranging all 5 books on a shelf means 5 choices for first position, 4 for second, 3 for third, 2 for fourth, 1 for fifth: 5 × 4 × 3 × 2 × 1 = 120.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does P(n,0) equal?</h4>
            <p className="text-sm text-muted-foreground">
              P(n,0) = 1 for any n. There's exactly one way to arrange zero items: do nothing. Mathematically, P(n,0) = n! / n! = 1. This might seem odd, but it keeps the formulas consistent.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate permutations without a calculator?</h4>
            <p className="text-sm text-muted-foreground">
              Don't compute full factorials! Use the shortcut: P(n,r) = n × (n-1) × (n-2) × ... for r terms. For P(10,4), just multiply 10 × 9 × 8 × 7 = 5,040. Much faster than calculating 10! and 6! separately.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When would I use permutations in real life?</h4>
            <p className="text-sm text-muted-foreground">
              Permutations show up in password security (how many possible passwords?), scheduling (how many ways to order tasks?), sports brackets (possible tournament outcomes), genetics (gene sequence arrangements), and any situation where you need to count ordered arrangements.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/combination-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Combination Calculator</p>
            <p className="text-xs text-muted-foreground">nCr - when order doesn't matter</p>
          </a>
          <a href="/math-tools/probability-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Probability Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate event probabilities</p>
          </a>
          <a href="/math-tools/factorial-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Factorial Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate n!</p>
          </a>
        </div>
      </section>
    </div>
  );
}
