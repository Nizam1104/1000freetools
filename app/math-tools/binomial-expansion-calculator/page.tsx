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

  const factorial = (num: number): number => {
    if (num <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    return result;
  };

  const binomialCoefficient = (n: number, k: number): number => {
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

    if (nValue > 15) {
      setError("Please enter n ≤ 15 for practical computation");
      return;
    }

    const terms: string[] = [];
    const coefficientSteps: string[] = [];

    for (let k = 0; k <= nValue; k++) {
      const coeff = binomialCoefficient(nValue, k);
      const aPower = nValue - k;
      const bPower = k;

      let term = "";
      let coeffStr = coeff === 1 && (aPower > 0 || bPower > 0) ? "" : coeff.toString();

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
    <div className="w-full max-w-4xl mx-auto space-y-8">
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
                    C({result.n},{i}) = {binomialCoefficient(result.n, i)}
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

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
