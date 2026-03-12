"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BinomialExpansionCalculator() {
  const [a, setA] = useState("x");
  const [b, setB] = useState("1");
  const [n, setN] = useState("3");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const factorial = (num: number): bigint => {
    if (num <= 1) return BigInt(1);
    let result = BigInt(1);
    for (let i = 2; i <= num; i++) result *= BigInt(i);
    return result;
  };

  const binomialCoefficient = (n: number, k: number): bigint => {
    return factorial(n) / (factorial(k) * factorial(n - k));
  };

  const expand = () => {
    setError("");
    setResult(null);

    const nValue = parseInt(n);
    if (isNaN(nValue) || nValue < 0) {
      setError("Please enter a non-negative integer for n");
      return;
    }

    if (nValue > 25) {
      setError("Please enter n ≤ 25 for practical computation");
      return;
    }

    const terms: string[] = [];
    const coefficientSteps: string[] = [];

    for (let k = 0; k <= nValue; k++) {
      const coeff = binomialCoefficient(nValue, k);
      const aPower = nValue - k;
      const bPower = k;

      let term = "";
      let coeffStr = coeff === BigInt(1) && (aPower > 0 || bPower > 0) ? "" : coeff.toString();

      // Build the term
      if (aPower === 0 && bPower === 0) {
        term = coeffStr || "1";
      } else if (aPower === 0) {
        if (b === "1") {
          term = coeffStr || "1";
        } else if (bPower === 1) {
          term = `${coeffStr}${b}`.replace(/^1/, "");
        } else {
          term = `${coeffStr}${b}^${bPower}`.replace(/^1/, "");
        }
      } else if (bPower === 0) {
        if (a === "x" && aPower === 1) {
          term = `${coeffStr}x`.replace(/^1x/, "x").replace(/^-1x/, "-x");
        } else if (a === "x") {
          term = `${coeffStr}x^${aPower}`.replace(/^1x/, "x").replace(/^-1x/, "-x");
        } else if (aPower === 1) {
          term = `${coeffStr}${a}`.replace(/^1/, "");
        } else {
          term = `${coeffStr}${a}^${aPower}`.replace(/^1/, "");
        }
      } else {
        if (a === "x" && aPower === 1) {
          if (b === "1") {
            term = `${coeffStr}x`.replace(/^1x/, "x");
          } else if (bPower === 1) {
            term = `${coeffStr}x${b}`.replace(/^1/, "");
          } else {
            term = `${coeffStr}x${b}^${bPower}`.replace(/^1/, "");
          }
        } else if (a === "x") {
          if (b === "1") {
            term = `${coeffStr}x^${aPower}`.replace(/^1x/, "x");
          } else if (bPower === 1) {
            term = `${coeffStr}x^${aPower}${b}`.replace(/^1/, "");
          } else {
            term = `${coeffStr}x^${aPower}${b}^${bPower}`.replace(/^1/, "");
          }
        } else {
          term = `${coeffStr}${a}^${aPower}${b}^${bPower}`.replace(/^1/, "");
        }
      }

      // Clean up the term
      term = term.replace(/\+\-/g, "-").replace(/^\+/, "");
      if (term === "") term = "1";

      terms.push(term);
      coefficientSteps.push(`C(${nValue},${k}) = ${coeff}`);
    }

    // Build the full expansion
    let expansion = terms[0];
    for (let i = 1; i < terms.length; i++) {
      if (terms[i].startsWith("-")) {
        expansion += " - " + terms[i].substring(1);
      } else {
        expansion += " + " + terms[i];
      }
    }

    setResult({
      expansion,
      terms,
      n: nValue,
      a,
      b,
      coefficientSteps,
      formula: `(a + b)^n = Σ(k=0 to n) C(n,k) × a^(n-k) × b^k`
    });
  };

  const reset = () => {
    setA("x");
    setB("1");
    setN("3");
    setResult(null);
    setError("");
  };

  const loadExample = (aVal: string, bVal: string, nVal: string) => {
    setA(aVal);
    setB(bVal);
    setN(nVal);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Binomial Expansion Calculator – Expand (a+b)^n</h1>
        <p className="text-muted-foreground">
          Expand binomial expressions using the binomial theorem with our free online calculator. Get step-by-step expansion of (a+b)^n with binomial coefficients shown.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>First Term (a)</Label>
            <Input
              placeholder="x"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </div>
          <div>
            <Label>Second Term (b)</Label>
            <Input
              placeholder="1"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </div>
          <div>
            <Label>Power (n)</Label>
            <Input
              type="number"
              placeholder="3"
              value={n}
              onChange={(e) => setN(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={expand}>Expand</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("x", "1", "3")}>(x+1)³</Button>
          <Button variant="outline" onClick={() => loadExample("x", "y", "4")}>(x+y)⁴</Button>
          <Button variant="outline" onClick={() => loadExample("2x", "3", "5")}>(2x+3)⁵</Button>
          <Button variant="outline" onClick={() => loadExample("a", "b", "6")}>(a+b)⁶</Button>
          <Button variant="outline" onClick={() => loadExample("x", "-2", "4")}>(x-2)⁴</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Expansion of ({a} + {b})^{result.n}</p>
              <p className="text-xl md:text-2xl font-bold font-mono break-all">{result.expansion}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Binomial Theorem Formula</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {result.formula}
              </code>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Binomial Coefficients (Pascal's Triangle Row {result.n})</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {result.terms.map((_: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-muted rounded-full text-sm font-mono">
                    C({result.n},{i}) = {binomialCoefficient(result.n, i).toString()}
                  </span>
                ))}
              </div>
              <div className="space-y-1 font-mono text-sm bg-muted p-3 rounded">
                {result.coefficientSteps.map((step: string, i: number) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Term-by-Term Breakdown</h4>
              <div className="space-y-2">
                {result.terms.map((term: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Term {i + 1}:</span>
                    <code className="font-mono bg-muted px-2 py-1 rounded">{term}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-2xl font-semibold">Understanding Binomial Expansion</h2>

        <div className="space-y-4">
          <p>
            The binomial expansion lets you multiply out expressions like (a + b)^n without doing all the algebra by hand. It's one of those tools that shows up everywhere — from probability to calculus to physics.
          </p>

          <h3 className="text-xl font-semibold">How the Binomial Theorem Works</h3>
          <p>
            The formula behind this calculator is:
          </p>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-sm font-mono block">
              (a + b)^n = Σ(k=0 to n) C(n,k) × a^(n-k) × b^k
            </code>
          </div>
          <p>
            Breaking that down: C(n,k) is the binomial coefficient — the number of ways to choose k items from n. You'll also see it written as "n choose k" or <span className="font-mono">nCk</span>. Each term in the expansion picks a different value of k, starting from 0 and going up to n.
          </p>

          <h3 className="text-xl font-semibold">Worked Examples</h3>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 1: Expanding (x + 1)³</h4>
              <p className="text-sm text-muted-foreground mb-2">
                This is the classic introductory example. With n=3, we get 4 terms.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                (x + 1)³ = x³ + 3x² + 3x + 1
              </code>
              <p className="text-sm mt-2">
                The coefficients 1, 3, 3, 1 come from row 3 of Pascal's triangle.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 2: Expanding (x + y)⁴</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Now with two variables, the powers split between them.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                (x + y)⁴ = x⁴ + 4x³y + 6x²y² + 4xy³ + y⁴
              </code>
              <p className="text-sm mt-2">
                Notice how the powers of x decrease (4→3→2→1→0) while powers of y increase (0→1→2→3→4). The coefficients 1, 4, 6, 4, 1 are symmetric.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Example 3: Expanding (2x - 3)⁵</h4>
              <p className="text-sm text-muted-foreground mb-2">
                When one term has a coefficient or is negative, you carry it through each term.
              </p>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                (2x - 3)⁵ = 32x⁵ - 240x⁴ + 360x³ - 270x² + 135x - 27
              </code>
              <p className="text-sm mt-2">
                The alternating signs come from the negative term. The coefficients get multiplied by powers of 2 and 3.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold">A Quick Fact</h3>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              The binomial theorem for positive integer exponents was known to mathematicians in the 10th century, but Blaise Pascal's 1653 treatise on the arithmetic triangle made it widely known in Europe. Isaac Newton later generalized it to work with fractional and negative exponents — a key step in developing calculus.
            </p>
          </div>

          <h3 className="text-xl font-semibold">Common Questions</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">What does the binomial coefficient represent?</h4>
              <p className="text-sm">
                C(n,k) counts the number of ways to pick k items from a set of n. In the expansion, it tells you how many different ways you can grab "a" exactly (n-k) times and "b" exactly k times when multiplying out (a+b)×(a+b)×...×(a+b).
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Why do the coefficients form Pascal's triangle?</h4>
              <p className="text-sm">
                Each row of Pascal's triangle gives you the coefficients for a specific power. Row 0 is (a+b)⁰, row 1 is (a+b)¹, and so on. The pattern emerges because C(n,k) = C(n-1,k-1) + C(n-1,k) — the same rule that builds Pascal's triangle.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Can this calculator handle negative or fractional powers?</h4>
              <p className="text-sm">
                This tool handles non-negative integer exponents. For negative or fractional powers, you'd need the generalized binomial theorem, which produces infinite series instead of finite expansions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">What's the largest n I can use?</h4>
              <p className="text-sm">
                The calculator supports n up to 25. Beyond that, the coefficients get extremely large and the expansion becomes unwieldy to display. For reference, (a+b)^25 has 26 terms and the middle coefficient is over 26 billion.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">How do I use this for probability?</h4>
              <p className="text-sm">
                The binomial expansion is the foundation of the binomial distribution. If you have a coin with probability p of heads, the expansion of (p + (1-p))^n gives you the probabilities of getting 0, 1, 2, ..., n heads in n flips.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
