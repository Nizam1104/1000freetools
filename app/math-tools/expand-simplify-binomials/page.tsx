"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ExpandSimplifyBinomials() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operation, setOperation] = useState("square");
  const [result, setResult] = useState<{
    expanded: string;
    simplified: string;
    steps: string[];
    formula: string;
  } | null>(null);
  const [error, setError] = useState("");

  const expand = () => {
    if (!a.trim() || !b.trim()) {
      setError("Please enter both terms");
      setResult(null);
      return;
    }

    setError("");
    const steps: string[] = [];
    let expanded = "";
    let simplified = "";
    let formula = "";

    const aTerm = a.trim();
    const bTerm = b.trim();

    if (operation === "square") {
      formula = "(a + b)² = a² + 2ab + b²";
      steps.push(`Expanding: (${aTerm} + ${bTerm})²`);
      steps.push(`Using formula: (a + b)² = a² + 2ab + b²`);
      steps.push(`(${aTerm})² + 2(${aTerm})(${bTerm}) + (${bTerm})²`);

      const a2 = simplifyTerm(aTerm, 2);
      const ab = simplifyProduct(aTerm, bTerm, 2);
      const b2 = simplifyTerm(bTerm, 2);

      steps.push(`${a2} + ${ab} + ${b2}`);
      expanded = `(${aTerm} + ${bTerm})²`;
      simplified = `${a2} + ${ab} + ${b2}`;
    } else if (operation === "cube") {
      formula = "(a + b)³ = a³ + 3a²b + 3ab² + b³";
      steps.push(`Expanding: (${aTerm} + ${bTerm})³`);
      steps.push(`Using formula: (a + b)³ = a³ + 3a²b + 3ab² + b³`);
      steps.push(`(${aTerm})³ + 3(${aTerm})²(${bTerm}) + 3(${aTerm})(${bTerm})² + (${bTerm})³`);

      const a3 = simplifyTerm(aTerm, 3);
      const a2b = simplifyProduct(aTerm, aTerm, 3, bTerm);
      const ab2 = simplifyProduct(aTerm, bTerm, bTerm, 3);
      const b3 = simplifyTerm(bTerm, 3);

      steps.push(`${a3} + ${a2b} + ${ab2} + ${b3}`);
      expanded = `(${aTerm} + ${bTerm})³`;
      simplified = `${a3} + ${a2b} + ${ab2} + ${b3}`;
    } else if (operation === "product") {
      formula = "(a + b)(c + d) = ac + ad + bc + bd (FOIL)";
      const [a1, b1] = parseBinomial(aTerm);
      const [a2, b2] = parseBinomial(bTerm);

      steps.push(`Expanding: (${aTerm})(${bTerm})`);
      steps.push(`Using FOIL: First + Outer + Inner + Last`);

      const first = simplifyProduct(a1, a2);
      const outer = simplifyProduct(a1, b2);
      const inner = simplifyProduct(b1, a2);
      const last = simplifyProduct(b1, b2);

      steps.push(`First: ${a1} × ${a2} = ${first}`);
      steps.push(`Outer: ${a1} × ${b2} = ${outer}`);
      steps.push(`Inner: ${b1} × ${a2} = ${inner}`);
      steps.push(`Last: ${b1} × ${b2} = ${last}`);

      const combined = combineLikeTerms([first, outer, inner, last]);
      steps.push(`Combine: ${combined}`);

      expanded = `(${aTerm})(${bTerm})`;
      simplified = combined;
    } else if (operation === "difference") {
      formula = "(a + b)(a - b) = a² - b²";
      steps.push(`Expanding: (${aTerm} + ${bTerm})(${aTerm} - ${bTerm})`);
      steps.push(`Using formula: (a + b)(a - b) = a² - b²`);

      const a2 = simplifyTerm(aTerm, 2);
      const b2 = simplifyTerm(bTerm, 2);

      steps.push(`(${aTerm})² - (${bTerm})²`);
      expanded = `(${aTerm} + ${bTerm})(${aTerm} - ${bTerm})`;
      simplified = `${a2} - ${b2}`;
    }

    setResult({ expanded, simplified, steps, formula });
  };

  const parseBinomial = (expr: string): [string, string] => {
    const parts = expr.split(/(?=[+-])/);
    if (parts.length >= 2) {
      return [parts[0].trim(), parts.slice(1).join("").trim()];
    }
    return [parts[0].trim(), "0"];
  };

  const simplifyTerm = (term: string, power: number): string => {
    const numMatch = term.match(/^(-?\d+\.?\d*)$/);
    const varMatch = term.match(/^(-?\d*\.?\d*)([a-zA-Z]+)(?:\^(\d+))?$/);

    if (numMatch) {
      const num = parseFloat(numMatch[1]);
      return `${Math.pow(num, power)}`;
    }

    if (varMatch) {
      const coef = varMatch[1] === "" || varMatch[1] === "+" ? 1 : varMatch[1] === "-" ? -1 : parseFloat(varMatch[1]);
      const variable = varMatch[2];
      const existingPower = varMatch[3] ? parseInt(varMatch[3]) : 1;
      const newPower = existingPower * power;

      const coefPowered = Math.pow(coef, power);
      if (newPower === 1) {
        return coefPowered === 1 ? variable : coefPowered === -1 ? `-${variable}` : `${coefPowered}${variable}`;
      }
      return coefPowered === 1 ? `${variable}^${newPower}` : coefPowered === -1 ? `-${variable}^${newPower}` : `${coefPowered}${variable}^${newPower}`;
    }

    return `(${term})^${power}`;
  };

  const simplifyProduct = (...terms: (string | number)[]): string => {
    let coefficient = 1;
    const variables: Map<string, number> = new Map();

    terms.forEach((term) => {
      if (typeof term === "number") {
        coefficient *= term;
        return;
      }

      const numMatch = term.match(/^(-?\d+\.?\d*)$/);
      const varMatch = term.match(/^(-?\d*\.?\d*)([a-zA-Z]+)(?:\^(\d+))?$/);

      if (numMatch) {
        coefficient *= parseFloat(numMatch[1]);
      } else if (varMatch) {
        const coef = varMatch[1] === "" || varMatch[1] === "+" ? 1 : varMatch[1] === "-" ? -1 : parseFloat(varMatch[1]);
        coefficient *= coef;
        const variable = varMatch[2];
        const power = varMatch[3] ? parseInt(varMatch[3]) : 1;
        variables.set(variable, (variables.get(variable) || 0) + power);
      }
    });

    let result = "";
    if (coefficient !== 1 || variables.size === 0) {
      result = coefficient.toString();
    }

    variables.forEach((power, variable) => {
      if (power === 1) {
        result += variable;
      } else {
        result += `${variable}^${power}`;
      }
    });

    return result || "0";
  };

  const combineLikeTerms = (terms: string[]): string => {
    const termMap = new Map<string, number>();

    terms.forEach((term) => {
      const varMatch = term.match(/^(-?\d+\.?\d*)([a-zA-Z]+)?(?:\^(\d+))?$/);
      if (varMatch) {
        const coef = parseFloat(varMatch[1]) || (varMatch[1] === "-" ? -1 : 1);
        const variable = varMatch[2] || "";
        const power = varMatch[3] ? parseInt(varMatch[3]) : (variable ? 1 : 0);
        const key = `${variable}${power > 0 ? `^${power}` : ""}`;
        termMap.set(key, (termMap.get(key) || 0) + coef);
      }
    });

    const result: string[] = [];
    termMap.forEach((coef, key) => {
      if (coef !== 0) {
        if (key === "") {
          result.push(`${coef}`);
        } else if (coef === 1) {
          result.push(key);
        } else if (coef === -1) {
          result.push(`-${key}`);
        } else {
          result.push(`${coef}${key}`);
        }
      }
    });

    return result.join(" + ").replace(/\+ -/g, "- ").replace(/\s+/g, " ") || "0";
  };

  const reset = () => {
    setA("");
    setB("");
    setResult(null);
    setError("");
  };

  const loadExample = (op: string, aVal: string, bVal: string) => {
    setOperation(op);
    setA(aVal);
    setB(bVal);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Binomial Expansion Calculator – Expand & Simplify Binomials</h1>
        <p className="text-muted-foreground">
          Expand and simplify binomial expressions instantly with our free online binomial expansion calculator. Handles products, squares, and cubes of binomials with full step-by-step solutions using FOIL and special product formulas.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Operation Type</Label>
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="square">Square (a + b)²</SelectItem>
              <SelectItem value="cube">Cube (a + b)³</SelectItem>
              <SelectItem value="product">Product (a + b)(c + d)</SelectItem>
              <SelectItem value="difference">Difference of Squares (a + b)(a - b)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {operation === "product" ? (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>First Binomial (a + b)</Label>
              <Input
                type="text"
                placeholder="e.g., x + 3 or 2x - 5"
                value={a}
                onChange={(e) => setA(e.target.value)}
              />
            </div>
            <div>
              <Label>Second Binomial (c + d)</Label>
              <Input
                type="text"
                placeholder="e.g., x - 2 or 3x + 1"
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </div>
          </div>
        ) : operation === "difference" ? (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>First Term (a)</Label>
              <Input
                type="text"
                placeholder="e.g., x or 2x"
                value={a}
                onChange={(e) => setA(e.target.value)}
              />
            </div>
            <div>
              <Label>Second Term (b)</Label>
              <Input
                type="text"
                placeholder="e.g., 3 or y"
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>First Term (a)</Label>
              <Input
                type="text"
                placeholder="e.g., x or 2x"
                value={a}
                onChange={(e) => setA(e.target.value)}
              />
            </div>
            <div>
              <Label>Second Term (b)</Label>
              <Input
                type="text"
                placeholder="e.g., 3 or y"
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          <Button onClick={expand}>Expand</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="outline" size="sm" onClick={() => loadExample("square", "x", "3")}>(x+3)²</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("square", "2x", "5")}>(2x+5)²</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("cube", "x", "2")}>(x+2)³</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("product", "x+3", "x-3")}>(x+3)(x-3)</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("product", "2x+1", "x-4")}>(2x+1)(x-4)</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("difference", "x", "5")}>x²-25</Button>
          <Button variant="outline" size="sm" onClick={() => loadExample("difference", "3x", "2")}>9x²-4</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Formula Used</p>
              <p className="text-lg font-semibold font-mono">{result.formula}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Original Expression</p>
              <p className="text-xl font-semibold font-mono">{result.expanded}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Expanded & Simplified</p>
              <p className="text-2xl font-semibold font-mono">{result.simplified}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <ol className="space-y-2 text-sm">
                {result.steps.map((step, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-muted-foreground">{index + 1}.</span>
                    <span className="font-mono">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Binomial Expansion</h2>
        <p className="text-muted-foreground">
          A binomial is an algebraic expression with two terms, like (x + 3) or (2a - b). Expanding binomials means multiplying them out and simplifying. This skill is fundamental in algebra and appears everywhere from solving equations to calculus.
        </p>
        <p className="text-muted-foreground">
          Special patterns make expansion easier. The square of a binomial (a + b)² always equals a² + 2ab + b². The cube (a + b)³ follows the pattern a³ + 3a²b + 3ab² + b³. The product (a + b)(a - b) always simplifies to a² - b², called the difference of squares.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Binomial Expansion Formulas</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Square of a Binomial</h4>
            <div className="font-mono text-center p-3 bg-muted rounded mb-3">(a + b)² = a² + 2ab + b²</div>
            <p className="text-sm text-muted-foreground">First squared, plus twice the product, plus second squared.</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cube of a Binomial</h4>
            <div className="font-mono text-center p-3 bg-muted rounded mb-3">(a + b)³ = a³ + 3a²b + 3ab² + b³</div>
            <p className="text-sm text-muted-foreground">Coefficients follow Pascal's triangle: 1, 3, 3, 1.</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">FOIL Method</h4>
            <div className="font-mono text-center p-3 bg-muted rounded mb-3">(a + b)(c + d) = ac + ad + bc + bd</div>
            <p className="text-sm text-muted-foreground">First, Outer, Inner, Last – multiply each pair of terms.</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Difference of Squares</h4>
            <div className="font-mono text-center p-3 bg-muted rounded mb-3">(a + b)(a - b) = a² - b²</div>
            <p className="text-sm text-muted-foreground">Sum times difference equals difference of squares.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: (x + 3)²</h4>
            <div className="text-sm space-y-2">
              <p>Using (a + b)² = a² + 2ab + b²</p>
              <p>a = x, b = 3</p>
              <p>x² + 2(x)(3) + 3²</p>
              <p>x² + 6x + 9</p>
              <p className="text-muted-foreground">The middle term is twice the product: 2 × x × 3 = 6x.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: (2x + 5)²</h4>
            <div className="text-sm space-y-2">
              <p>Using (a + b)² = a² + 2ab + b²</p>
              <p>a = 2x, b = 5</p>
              <p>(2x)² + 2(2x)(5) + 5²</p>
              <p>4x² + 20x + 25</p>
              <p className="text-muted-foreground">Remember to square the coefficient: (2x)² = 4x².</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: (x + 2)³</h4>
            <div className="text-sm space-y-2">
              <p>Using (a + b)³ = a³ + 3a²b + 3ab² + b³</p>
              <p>a = x, b = 2</p>
              <p>x³ + 3(x²)(2) + 3(x)(2²) + 2³</p>
              <p>x³ + 6x² + 12x + 8</p>
              <p className="text-muted-foreground">Coefficients 1, 3, 3, 1 come from Pascal's triangle row 3.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: (x + 3)(x - 3)</h4>
            <div className="text-sm space-y-2">
              <p>Using difference of squares: (a + b)(a - b) = a² - b²</p>
              <p>a = x, b = 3</p>
              <p>x² - 3²</p>
              <p>x² - 9</p>
              <p className="text-muted-foreground">The middle terms cancel: +3x and -3x add to zero.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: (2x + 1)(x - 4)</h4>
            <div className="text-sm space-y-2">
              <p>Using FOIL:</p>
              <p>First: 2x × x = 2x²</p>
              <p>Outer: 2x × (-4) = -8x</p>
              <p>Inner: 1 × x = x</p>
              <p>Last: 1 × (-4) = -4</p>
              <p>Combine: 2x² - 8x + x - 4 = 2x² - 7x - 4</p>
              <p className="text-muted-foreground">FOIL ensures you multiply every term in the first binomial by every term in the second.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 6: (3x)² - (2)²</h4>
            <div className="text-sm space-y-2">
              <p>This is the result of expanding (3x + 2)(3x - 2)</p>
              <p>Using difference of squares:</p>
              <p>(3x)² - 2²</p>
              <p>9x² - 4</p>
              <p className="text-muted-foreground">The factored form (3x + 2)(3x - 2) expands to 9x² - 4.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>Pascal's Triangle gives binomial coefficients.</strong> For (a + b)^n, the coefficients come from row n of Pascal's triangle. Row 0: 1. Row 1: 1, 1. Row 2: 1, 2, 1. Row 3: 1, 3, 3, 1. Row 4: 1, 4, 6, 4, 1. This pattern was known to mathematicians in China, Persia, and Europe centuries before Pascal.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does FOIL stand for?</h4>
            <p className="text-sm text-muted-foreground">
              FOIL is a mnemonic: First, Outer, Inner, Last. It tells you which terms to multiply when expanding two binomials. Multiply the first terms, then outer terms, then inner terms, then last terms, and add them all.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is (a + b)² not equal to a² + b²?</h4>
            <p className="text-sm text-muted-foreground">
              Because you're missing the middle term! (a + b)² = (a + b)(a + b) = a² + ab + ba + b² = a² + 2ab + b². The cross terms (ab and ba) add up to 2ab. This is a common mistake.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I expand (a - b)² the same way?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, but watch the signs. (a - b)² = a² - 2ab + b². The middle term is negative because you're multiplying a by -b twice. The last term is still positive because (-b)² = b².
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if there are coefficients?</h4>
            <p className="text-sm text-muted-foreground">
              Treat the coefficient as part of the term. (2x)² = 4x², not 2x². Square both the coefficient and the variable. For (3x + 4)²: (3x)² + 2(3x)(4) + 4² = 9x² + 24x + 16.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I expand (a + b + c)²?</h4>
            <p className="text-sm text-muted-foreground">
              For trinomials: (a + b + c)² = a² + b² + c² + 2ab + 2ac + 2bc. Every pair of terms contributes a cross term. There are three squared terms and three cross terms.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When would I use binomial expansion?</h4>
            <p className="text-sm text-muted-foreground">
              Binomial expansion appears in factoring, solving quadratic equations, completing the square, calculus (derivatives and integrals), probability (binomial distribution), and physics (Taylor series approximations).
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
