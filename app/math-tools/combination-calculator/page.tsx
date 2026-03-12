"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CombinationCalculator() {
  const [n, setN] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

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

    if (nNum > 170) {
      setError("For practical calculations, please keep n ≤ 170");
      return;
    }

    const nFact = factorialNum(nNum);
    const nrFact = factorialNum(nNum - rNum);
    const rFact = factorialNum(rNum);
    const ncr = nFact / (nrFact * rFact);

    setResult({
      n: nNum,
      r: rNum,
      ncr: ncr.toString(),
      nFact: nFact.toString(),
      nrFact: nrFact.toString(),
      rFact: rFact.toString(),
      steps: [
        `Formula: C(n,r) = n! / (r! × (n-r)!)`,
        ``,
        `Substitute values:`,
        `  C(${nNum},${rNum}) = ${nNum}! / (${rNum}! × (${nNum}-${rNum})!)`,
        `  C(${nNum},${rNum}) = ${nNum}! / (${rNum}! × ${nNum - rNum}!)`,
        ``,
        `Calculate factorials:`,
        `  ${nNum}! = ${nFact.toString()}`,
        `  ${rNum}! = ${rFact.toString()}`,
        `  ${nNum - rNum}! = ${nrFact.toString()}`,
        ``,
        `Calculate:`,
        `  C(${nNum},${rNum}) = ${nFact.toString()} / (${rFact.toString()} × ${nrFact.toString()})`,
        `  C(${nNum},${rNum}) = ${nFact.toString()} / ${(rFact * nrFact).toString()}`,
        `  C(${nNum},${rNum}) = ${ncr.toString()}`,
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
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Combination Calculator – Calculate nCr Online
        </h1>
        <p className="text-muted-foreground">
          Calculate combinations (nCr) instantly with our free online
          combination calculator. Find how many ways r items can be chosen from
          n items using the combination formula.
        </p>
      </div>

      <div className="space-y-6">
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
            <Label>r (items to choose)</Label>
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
          <Button variant="ghost" size="sm" onClick={() => loadExample("52", "5")}>52C5 (Cards)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("12", "4")}>12C4 (Committee)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("8", "3")}>8C3 (Toppings)</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10", "3")}>10C3</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("20", "5")}>20C5</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("6", "2")}>6C2</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("15", "6")}>15C6</Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">
                C(n,r) = nCr
              </p>
              <p className="text-5xl font-bold">{result.ncr}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {result.n}! / ({result.r}! × ({result.n}-{result.r})!)
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
        <h2 className="text-2xl font-semibold">Understanding Combinations</h2>
        <p className="text-muted-foreground">
          Combinations count the number of ways you can select items from a larger set when the order doesn't matter. If you're picking 3 toppings for your pizza from 10 available options, it doesn't matter whether you pick pepperoni first or last – you end up with the same pizza. That's a combination.
        </p>
        <p className="text-muted-foreground">
          This is different from permutations, where order does matter. A lock combination is actually a permutation – 1-2-3 opens the lock, but 3-2-1 does not. In true combinations, selecting Alice, Bob, and Carol for a committee is the same as selecting Carol, Alice, and Bob.
        </p>
        <p className="text-muted-foreground">
          Combinations appear everywhere: lottery drawings, card hands, committee selections, menu combinations, and sample selections in research. Anytime you're choosing a subset without regard to order, you're dealing with combinations.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">The Combination Formula</h2>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-lg mb-4 text-center">
            C(n,r) = n! / (r! × (n-r)!)
          </div>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Also written as <sub>n</sub>C<sub>r</sub>, <span className="italic">C</span><sub>n,r</sub>, or the binomial coefficient <span className="font-serif">(<sup>n</sup>&frasl;<sub>r</sub>)</span>
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">n</div>
              <div className="text-muted-foreground">Total number of items available</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">r</div>
              <div className="text-muted-foreground">Number of items to choose</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">!</div>
              <div className="text-muted-foreground">Factorial: multiply all integers from 1 to that number</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Key Properties</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono">C(n,0) = 1</div>
                <div className="text-muted-foreground">There's one way to choose nothing</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono">C(n,n) = 1</div>
                <div className="text-muted-foreground">There's one way to choose everything</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono">C(n,r) = C(n, n-r)</div>
                <div className="text-muted-foreground">Choosing r to include = choosing (n-r) to exclude</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono">C(n,1) = n</div>
                <div className="text-muted-foreground">There are n ways to choose 1 item from n</div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Combinations vs Permutations</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Combinations (order doesn't matter)</div>
                <div className="text-muted-foreground">C(n,r) = P(n,r) / r!</div>
                <div className="text-muted-foreground">Pizza toppings, lottery numbers, committee members</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Permutations (order matters)</div>
                <div className="text-muted-foreground">P(n,r) = n! / (n-r)!</div>
                <div className="text-muted-foreground">Password codes, race rankings, seating arrangements</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: Poker Hands</h3>
            <p className="text-sm text-muted-foreground mb-3">How many different 5-card hands can be dealt from a standard 52-card deck?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>n = 52</strong> (total cards), <strong>r = 5</strong> (cards in hand)</div>
              <div className="font-mono">C(52,5) = 52! / (5! × 47!)</div>
              <div className="font-mono">= (52 × 51 × 50 × 49 × 48) / (5 × 4 × 3 × 2 × 1)</div>
              <div className="font-mono">= 311,875,200 / 120</div>
              <div className="font-mono font-semibold">= 2,598,960 possible hands</div>
              <div className="pt-2 text-muted-foreground">
                This is why getting a specific hand like a royal flush is so rare – there's only 4 ways out of nearly 2.6 million possibilities.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Committee Selection</h3>
            <p className="text-sm text-muted-foreground mb-3">A club has 12 members. How many ways can they choose a 4-person committee?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>n = 12</strong> (members), <strong>r = 4</strong> (committee size)</div>
              <div className="font-mono">C(12,4) = 12! / (4! × 8!)</div>
              <div className="font-mono">= (12 × 11 × 10 × 9) / (4 × 3 × 2 × 1)</div>
              <div className="font-mono">= 11,880 / 24</div>
              <div className="font-mono font-semibold">= 495 possible committees</div>
              <div className="pt-2 text-muted-foreground">
                Notice we only multiply the top 4 terms of 12! because the 8! cancels with the denominator's 8!.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Pizza Toppings</h3>
            <p className="text-sm text-muted-foreground mb-3">A pizza shop offers 8 toppings. How many different 3-topping pizzas can you order?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>n = 8</strong> (toppings), <strong>r = 3</strong> (toppings per pizza)</div>
              <div className="font-mono">C(8,3) = 8! / (3! × 5!)</div>
              <div className="font-mono">= (8 × 7 × 6) / (3 × 2 × 1)</div>
              <div className="font-mono">= 336 / 6</div>
              <div className="font-mono font-semibold">= 56 different pizzas</div>
              <div className="pt-2 text-muted-foreground">
                If you could also choose 0, 1, 2, 4, 5, 6, 7, or 8 toppings, the total would be C(8,0) + C(8,1) + ... + C(8,8) = 2⁸ = 256 possible pizzas.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Lottery Odds</h3>
            <p className="text-sm text-muted-foreground mb-3">A lottery requires choosing 6 numbers from 1 to 49. What are your odds of winning?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>n = 49</strong> (numbers), <strong>r = 6</strong> (choices)</div>
              <div className="font-mono">C(49,6) = 49! / (6! × 43!)</div>
              <div className="font-mono">= (49 × 48 × 47 × 46 × 45 × 44) / (6 × 5 × 4 × 3 × 2 × 1)</div>
              <div className="font-mono">= 10,068,347,520 / 720</div>
              <div className="font-mono font-semibold">= 13,983,816 possible combinations</div>
              <div className="pt-2 text-muted-foreground">
                Your odds of winning are 1 in 13,983,816. This is why lotteries can offer such large jackpots – the probability of any single ticket winning is extremely low.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>Blaise Pascal</strong> (1623-1662) studied combinations extensively and arranged them in what we now call Pascal's Triangle. Each entry in the triangle is a combination value C(n,r). The triangle reveals patterns in binomial expansions, probability, and even fractal geometry (the Sierpinski triangle emerges when you color odd numbers). Pascal's work on combinations with Pierre de Fermat also founded probability theory – they developed it while solving a gambler's problem about how to fairly divide stakes in an interrupted game.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">When do I use combinations instead of permutations?</h3>
            <p className="text-sm text-muted-foreground">
              Use combinations when order doesn't matter – selecting team members, choosing menu items, drawing cards. Use permutations when order matters – creating passwords, ranking finishers in a race, arranging books on a shelf. Ask yourself: if I rearrange my selections, is it still the same outcome? If yes, it's a combination.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Why does C(n,r) equal C(n, n-r)?</h3>
            <p className="text-sm text-muted-foreground">
              Choosing r items to include automatically determines which (n-r) items you're excluding. If you have 10 people and choose 3 for a committee, you're also choosing 7 people who won't be on the committee. There's a one-to-one correspondence between the two choices, so they have the same count.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What does the factorial symbol (!) mean?</h3>
            <p className="text-sm text-muted-foreground">
              Factorial means multiply all positive integers from 1 up to that number. So 5! = 5 × 4 × 3 × 2 × 1 = 120. By definition, 0! = 1. Factorials grow extremely fast – 10! is already 3,628,800. This is why combination formulas often cancel out large portions of the factorials.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can r be larger than n?</h3>
            <p className="text-sm text-muted-foreground">
              No, C(n,r) is undefined when r &gt; n. You can't choose 10 items from a set of only 5. Mathematically, the formula would require calculating factorials of negative numbers, which aren't defined. If you try to compute it, you should get 0 or an error.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What is the binomial coefficient?</h3>
            <p className="text-sm text-muted-foreground">
              The binomial coefficient <span className="font-serif">(<sup>n</sup>&frasl;<sub>r</sub>)</span> is exactly the same as C(n,r). It's called the binomial coefficient because it appears in the binomial theorem: (a + b)ⁿ = Σ C(n,k) × aⁿ⁻ᵏ × bᵏ. The coefficients in the expansion of (a + b)ⁿ are the combination values.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How do I calculate combinations without a calculator?</h3>
            <p className="text-sm text-muted-foreground">
              Write out the formula and cancel before multiplying. For C(8,3) = 8!/(3!×5!), expand to (8×7×6×5!)/(3!×5!). The 5! cancels, leaving (8×7×6)/(3×2×1). Simplify: 6/6 = 1, so you have 8×7 = 56. Always cancel factorials first to keep numbers manageable.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the largest combination I can calculate?</h3>
            <p className="text-sm text-muted-foreground">
              This calculator handles n up to 170 because 171! exceeds the maximum value for standard number types. For most practical purposes, this is more than enough. Lottery calculations, card probabilities, and typical combinatorics problems all fall well within this range.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
