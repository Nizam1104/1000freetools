"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CombinationCalculator() {
  const [n, setN] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [result, setResult] = useState<{ combinations: string; formula: string } | null>(null);

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
    
    if (!isNaN(nVal) && !isNaN(rVal) && nVal >= 0 && rVal >= 0 && nVal >= rVal) {
      const combinations = factorial(nVal) / (factorial(rVal) * factorial(nVal - rVal));
      setResult({
        combinations: combinations.toString(),
        formula: `C(${nVal}, ${rVal}) = ${nVal}! / (${rVal}! × (${nVal}-${rVal})!) = ${combinations}`
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
        <CardHeader>
          <CardTitle>Combination Calculator</CardTitle>
          <CardDescription>Calculate selections where order doesn't matter: C(n,r)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Total items (n)</label>
              <Input
                type="number"
                placeholder="e.g., 10"
                min="0"
                value={n}
                onChange={(e) => setN(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Items to select (r)</label>
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
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Combinations</p>
                  <p className="text-2xl font-semibold">{result.combinations}</p>
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

      {/* SEO Content Section */}
      <div className="mt-12 space-y-12">
        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Combinations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Total Items (n)</h3>
                <p className="text-muted-foreground text-sm">Input the total number of items in your set from which you're selecting.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Items to Select (r)</h3>
                <p className="text-muted-foreground text-sm">Specify how many items you want to choose from the total set.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Combination Result</h3>
                <p className="text-muted-foreground text-sm">See the total number of possible combinations with the complete formula breakdown.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Benefits */}
        <section className="bg-card rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">Understanding Combinations in Mathematics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">📐 Order Doesn't Matter</h3>
              <p className="text-muted-foreground text-sm">Combinations count selections where order is irrelevant. Choosing <code className="bg-muted px-1 rounded">{`{A,B}`}</code> is the same as <code className="bg-muted px-1 rounded">{`{B,A}`}</code> in combinations.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎲 Probability & Statistics</h3>
              <p className="text-muted-foreground text-sm">Essential for calculating odds in lottery, card games, and statistical sampling problems.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🔬 Scientific Applications</h3>
              <p className="text-muted-foreground text-sm">Used in genetics, chemistry, and research for calculating possible outcomes and sample sizes.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📚 Step-by-Step Formula</h3>
              <p className="text-muted-foreground text-sm">See the complete factorial calculation showing how C(n,r) is derived using n! / (r! × (n-r)!).</p>
            </div>
          </div>
        </section>

        {/* Reference Table */}
        <section className="bg-card rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">Combinations vs Permutations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-left py-3 px-4">Combinations</th>
                  <th className="text-left py-3 px-4">Permutations</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Order Matters?</td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">Yes</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Formula</td>
                  <td className="py-3 px-4">C(n,r) = n!/(r!(n-r)!)</td>
                  <td className="py-3 px-4">P(n,r) = n!/(n-r)!</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Example</td>
                  <td className="py-3 px-4">Committee selection</td>
                  <td className="py-3 px-4">Race rankings</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Result Size</td>
                  <td className="py-3 px-4">Smaller (divides by r!)</td>
                  <td className="py-3 px-4">Larger</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Combination Formula FAQs</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">What is the combination formula?</h3>
              <p className="text-muted-foreground text-sm">C(n,r) = n! / (r! × (n-r)!) where n is total items, r is items to select, and ! means factorial (multiply all integers up to that number).</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">When do I use combinations instead of permutations?</h3>
              <p className="text-muted-foreground text-sm">Use combinations when order doesn't matter (picking team members, lottery numbers). Use permutations when order matters (race results, passwords).</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">How many combinations of 3 from 10?</h3>
              <p className="text-muted-foreground text-sm">C(10,3) = 10!/(3!×7!) = (10×9×8)/(3×2×1) = 720/6 = 120 possible combinations.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">What does nCr mean in math?</h3>
              <p className="text-muted-foreground text-sm">nCr is another notation for combinations, read as "n choose r". It's the same as C(n,r) and represents choosing r items from n total.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Can r be larger than n in combinations?</h3>
              <p className="text-muted-foreground text-sm">No, you cannot select more items than available. If r &gt; n, the combination equals 0 (impossible selection).</p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Related Math & Statistics Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/compounding-frequency-comparison" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Compounding Frequency Calculator</h3>
              <p className="text-muted-foreground text-sm">Calculate investment growth with different compounding periods.</p>
            </a>
            <a href="/calculators/concentration-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Concentration Calculator</h3>
              <p className="text-muted-foreground text-sm">Calculate solution concentrations for chemistry applications.</p>
            </a>
            <a href="/calculators/cost-of-capital-calculator" className="block p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-1">Cost of Capital Calculator</h3>
              <p className="text-muted-foreground text-sm">Financial calculations using statistical and mathematical formulas.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
