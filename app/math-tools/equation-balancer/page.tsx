"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ParsedEquation {
  reactants: { [key: string]: number };
  products: { [key: string]: number };
  reactantStrings: string[];
  productStrings: string[];
}

export default function EquationBalancer() {
  const [equation, setEquation] = useState("H2 + O2 -> H2O");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const parseFormula = (formula: string): { [key: string]: number } => {
    const elements: { [key: string]: number } = {};
    let i = 0;

    while (i < formula.length) {
      if (formula[i] === '(') {
        const closeParen = formula.indexOf(')', i);
        if (closeParen === -1) break;

        const innerFormula = formula.substring(i + 1, closeParen);
        const innerElements = parseFormula(innerFormula);

        let multiplier = 1;
        let j = closeParen + 1;
        let numStr = '';
        while (j < formula.length && formula[j] >= '0' && formula[j] <= '9') {
          numStr += formula[j];
          j++;
        }
        if (numStr) multiplier = parseInt(numStr);

        for (const [elem, count] of Object.entries(innerElements)) {
          elements[elem] = (elements[elem] || 0) + count * multiplier;
        }
        i = j;
      } else if (formula[i] >= 'A' && formula[i] <= 'Z') {
        let elem = formula[i];
        i++;
        while (i < formula.length && formula[i] >= 'a' && formula[i] <= 'z') {
          elem += formula[i];
          i++;
        }

        let countStr = '';
        while (i < formula.length && formula[i] >= '0' && formula[i] <= '9') {
          countStr += formula[i];
          i++;
        }
        const count = countStr ? parseInt(countStr) : 1;

        elements[elem] = (elements[elem] || 0) + count;
      } else {
        i++;
      }
    }

    return elements;
  };

  const parseEquation = (eq: string): ParsedEquation | null => {
    const parts = eq.split(/->|→|=/);
    if (parts.length !== 2) return null;

    const reactantStrings = parts[0].split('+').map(s => s.trim()).filter(s => s);
    const productStrings = parts[1].split('+').map(s => s.trim()).filter(s => s);

    const reactants: { [key: string]: number } = {};
    const products: { [key: string]: number } = {};

    for (const r of reactantStrings) {
      const match = r.match(/^(\d*)?(.+)$/);
      if (!match) continue;
      const coef = match[1] ? parseInt(match[1]) : 1;
      const formula = match[2];
      const elements = parseFormula(formula);
      for (const [elem, count] of Object.entries(elements)) {
        reactants[elem] = (reactants[elem] || 0) + count * coef;
      }
    }

    for (const p of productStrings) {
      const match = p.match(/^(\d*)?(.+)$/);
      if (!match) continue;
      const coef = match[1] ? parseInt(match[1]) : 1;
      const formula = match[2];
      const elements = parseFormula(formula);
      for (const [elem, count] of Object.entries(elements)) {
        products[elem] = (products[elem] || 0) + count * coef;
      }
    }

    return { reactants, products, reactantStrings, productStrings };
  };

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const balanceEquation = () => {
    setError("");
    setResult(null);

    const parsed = parseEquation(equation);
    if (!parsed) {
      setError("Invalid equation format. Use: A + B -> C");
      return;
    }

    const { reactantStrings, productStrings } = parsed;
    const nReactants = reactantStrings.length;
    const nProducts = productStrings.length;
    const nCompounds = nReactants + nProducts;

    const allElements = new Set<string>();
    for (const r of reactantStrings) {
      const elements = parseFormula(r.replace(/^\d+/, ''));
      Object.keys(elements).forEach(e => allElements.add(e));
    }
    for (const p of productStrings) {
      const elements = parseFormula(p.replace(/^\d+/, ''));
      Object.keys(elements).forEach(e => allElements.add(e));
    }

    const elements = Array.from(allElements);
    const nElements = elements.length;

    if (nElements === 0) {
      setError("No valid chemical formulas found");
      return;
    }

    const maxCoeff = 20;
    const formulas = [...reactantStrings.map(s => s.replace(/^\d+/, '')), ...productStrings.map(s => s.replace(/^\d+/, ''))];

    for (let total = nCompounds; total <= maxCoeff * nCompounds; total++) {
      const coeffs = findCoefficients(total, nCompounds, formulas, elements, parseFormula, nReactants);
      if (coeffs) {
        const simplified = simplifyCoefficients(coeffs);

        const balancedReactants = reactantStrings.map((r, i) => {
          const formula = r.replace(/^\d+/, '');
          return simplified[i] === 1 ? formula : `${simplified[i]}${formula}`;
        });

        const balancedProducts = productStrings.map((p, i) => {
          const formula = p.replace(/^\d+/, '');
          return simplified[nReactants + i] === 1 ? formula : `${simplified[nReactants + i]}${formula}`;
        });

        setResult({
          original: equation,
          balanced: `${balancedReactants.join(' + ')} → ${balancedProducts.join(' + ')}`,
          coefficients: simplified,
          reactants: balancedReactants,
          products: balancedProducts,
          steps: [
            `Identify elements: ${elements.join(', ')}`,
            `Set up atom balance equations for each element`,
            `Solve system of linear equations`,
            `Find smallest whole number coefficients: ${simplified.join(', ')}`,
            `Verify: atoms of each element are equal on both sides`
          ]
        });
        return;
      }
    }

    setError("Could not balance this equation. Please check the formulas.");
  };

  const findCoefficients = (
    total: number,
    n: number,
    formulas: string[],
    elements: string[],
    parseFormula: (f: string) => { [key: string]: number },
    nReactants: number
  ): number[] | null => {
    const combinations = generateCombinations(total, n);

    for (const coeffs of combinations) {
      if (coeffs.some(c => c === 0)) continue;

      let balanced = true;
      for (const elem of elements) {
        let reactantCount = 0;
        let productCount = 0;

        for (let i = 0; i < nReactants; i++) {
          const elements_in_formula = parseFormula(formulas[i]);
          reactantCount += coeffs[i] * (elements_in_formula[elem] || 0);
        }

        for (let i = nReactants; i < n; i++) {
          const elements_in_formula = parseFormula(formulas[i]);
          productCount += coeffs[i] * (elements_in_formula[elem] || 0);
        }

        if (reactantCount !== productCount) {
          balanced = false;
          break;
        }
      }

      if (balanced) return coeffs;
    }

    return null;
  };

  const generateCombinations = (sum: number, n: number): number[][] => {
    if (n === 1) return [[sum]];

    const result: number[][] = [];
    for (let i = 1; i <= sum - n + 1; i++) {
      const subCombinations = generateCombinations(sum - i, n - 1);
      for (const sub of subCombinations) {
        result.push([i, ...sub]);
      }
    }
    return result;
  };

  const simplifyCoefficients = (coeffs: number[]): number[] => {
    const commonDivisor = coeffs.reduce((a, b) => gcd(a, b));
    return coeffs.map(c => c / commonDivisor);
  };

  const reset = () => {
    setEquation("H2 + O2 -> H2O");
    setResult(null);
    setError("");
  };

  const loadExample = (eq: string) => {
    setEquation(eq);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Chemical Equation Balancer – Balance Chemical Reactions</h1>
        <p className="text-muted-foreground">
          Balance any chemical equation with our free online equation balancer. Get balanced equations with coefficients and step-by-step solutions for chemistry homework and stoichiometry calculations.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Chemical Equation</Label>
          <Input
            placeholder="H2 + O2 -> H2O"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use -&gt; or → for arrow. Example: CH4 + O2 -&gt; CO2 + H2O
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={balanceEquation}>Balance Equation</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("H2 + O2 -> H2O")}>H₂ + O₂ → H₂O</Button>
          <Button variant="outline" onClick={() => loadExample("CH4 + O2 -> CO2 + H2O")}>CH₄ + O₂ → CO₂ + H₂O</Button>
          <Button variant="outline" onClick={() => loadExample("Fe + O2 -> Fe2O3")}>Fe + O₂ → Fe₂O₃</Button>
          <Button variant="outline" onClick={() => loadExample("C6H12O6 + O2 -> CO2 + H2O")}>C₆H₁₂O₆ + O₂ → CO₂ + H₂O</Button>
          <Button variant="outline" onClick={() => loadExample("N2 + H2 -> NH3")}>N₂ + H₂ → NH₃</Button>
          <Button variant="outline" onClick={() => loadExample("Al + HCl -> AlCl3 + H2")}>Al + HCl → AlCl₃ + H₂</Button>
          <Button variant="outline" onClick={() => loadExample("Ca(OH)2 + H3PO4 -> Ca3(PO4)2 + H2O")}>Complex</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Original Equation</p>
              <p className="text-lg mb-4">{result.original}</p>
              <p className="text-sm text-muted-foreground mb-2">Balanced Equation</p>
              <p className="text-2xl font-bold font-mono">{result.balanced}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Coefficients</h4>
              <div className="flex flex-wrap gap-2">
                {result.coefficients.map((c: number, i: number) => (
                  <span key={i} className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 text-sm bg-muted p-3 rounded">
                {result.steps.map((step: string, i: number) => (
                  <div key={i}>{step}</div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Atom Count Verification</h4>
              <p className="text-sm text-muted-foreground">
                After balancing, each element has the same number of atoms on both sides of the equation, satisfying the law of conservation of mass.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Chemical Equation Balancing</h2>
        <p className="text-muted-foreground">
          Chemical equations represent reactions, showing what substances react (reactants) and what substances form (products). But an equation isn't complete until it's balanced – meaning the same number of atoms of each element appears on both sides. This reflects the law of conservation of mass: matter cannot be created or destroyed in a chemical reaction.
        </p>
        <p className="text-muted-foreground">
          Balancing works by adjusting coefficients – the numbers in front of chemical formulas. You never change the subscripts within formulas (that would change the substance itself). The goal is finding the smallest whole-number coefficients that make atom counts equal on both sides.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Balance Chemical Equations</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Write the unbalanced equation</p>
                <p className="text-muted-foreground">
                  List reactants on the left, products on the right, separated by an arrow. Use correct chemical formulas.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Count atoms of each element</p>
                <p className="text-muted-foreground">
                  List how many atoms of each element appear on both sides. Remember: subscripts multiply, coefficients multiply everything in the formula.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Add coefficients to balance</p>
                <p className="text-muted-foreground">
                  Start with elements that appear in only one compound on each side. Save hydrogen and oxygen for last. Adjust coefficients until counts match.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Simplify coefficients</p>
                <p className="text-muted-foreground">
                  Reduce to the smallest whole numbers. If all coefficients are divisible by 2, divide them. Check that all atom counts still balance.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Water Formation (H₂ + O₂ → H₂O)</h4>
            <div className="text-sm space-y-2">
              <p>Unbalanced: H₂ + O₂ → H₂O</p>
              <p>Count: Left has 2 H, 2 O. Right has 2 H, 1 O.</p>
              <p>Balance oxygen: H₂ + O₂ → 2H₂O (now 2 O on right)</p>
              <p>Balance hydrogen: 2H₂ + O₂ → 2H₂O (now 4 H on both sides)</p>
              <p>Balanced: 2H₂ + O₂ → 2H₂O</p>
              <p className="text-muted-foreground">Two molecules of hydrogen react with one molecule of oxygen to form two molecules of water.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Methane Combustion (CH₄ + O₂ → CO₂ + H₂O)</h4>
            <div className="text-sm space-y-2">
              <p>Unbalanced: CH₄ + O₂ → CO₂ + H₂O</p>
              <p>Balance C: Already balanced (1 on each side)</p>
              <p>Balance H: CH₄ + O₂ → CO₂ + 2H₂O (4 H on each side)</p>
              <p>Balance O: CH₄ + 2O₂ → CO₂ + 2H₂O (4 O on each side)</p>
              <p>Balanced: CH₄ + 2O₂ → CO₂ + 2H₂O</p>
              <p className="text-muted-foreground">Complete combustion of methane produces carbon dioxide and water. This is the reaction in natural gas burning.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Rust Formation (Fe + O₂ → Fe₂O₃)</h4>
            <div className="text-sm space-y-2">
              <p>Unbalanced: Fe + O₂ → Fe₂O₃</p>
              <p>Balance Fe: 2Fe + O₂ → Fe₂O₃</p>
              <p>Balance O: Need 3 O on left, but O₂ comes in pairs</p>
              <p>Use fraction: 2Fe + 1.5O₂ → Fe₂O₃</p>
              <p>Multiply by 2: 4Fe + 3O₂ → 2Fe₂O₃</p>
              <p>Balanced: 4Fe + 3O₂ → 2Fe₂O₃</p>
              <p className="text-muted-foreground">Iron rusting requires oxygen from air. The balanced equation shows 4 iron atoms react with 3 oxygen molecules.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Photosynthesis (C₆H₁₂O₆ + O₂ → CO₂ + H₂O)</h4>
            <div className="text-sm space-y-2">
              <p>Actually, photosynthesis is: CO₂ + H₂O → C₆H₁₂O₆ + O₂</p>
              <p>Balance C: 6CO₂ + H₂O → C₆H₁₂O₆ + O₂</p>
              <p>Balance H: 6CO₂ + 6H₂O → C₆H₁₂O₆ + O₂</p>
              <p>Balance O: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</p>
              <p>Balanced: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</p>
              <p className="text-muted-foreground">Plants use sunlight to convert carbon dioxide and water into glucose and oxygen. This reaction sustains life on Earth.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: Ammonia Synthesis (N₂ + H₂ → NH₃)</h4>
            <div className="text-sm space-y-2">
              <p>Unbalanced: N₂ + H₂ → NH₃</p>
              <p>Balance N: N₂ + H₂ → 2NH₃ (2 N on each side)</p>
              <p>Balance H: N₂ + 3H₂ → 2NH₃ (6 H on each side)</p>
              <p>Balanced: N₂ + 3H₂ → 2NH₃</p>
              <p className="text-muted-foreground">The Haber process produces ammonia from nitrogen and hydrogen. This reaction is crucial for fertilizer production.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 6: Complex Equation (Ca(OH)₂ + H₃PO₄ → Ca₃(PO₄)₂ + H₂O)</h4>
            <div className="text-sm space-y-2">
              <p>Balance Ca: 3Ca(OH)₂ + H₃PO₄ → Ca₃(PO₄)₂ + H₂O</p>
              <p>Balance PO₄: 3Ca(OH)₂ + 2H₃PO₄ → Ca₃(PO₄)₂ + H₂O</p>
              <p>Balance H: 3Ca(OH)₂ + 2H₃PO₄ → Ca₃(PO₄)₂ + 6H₂O</p>
              <p>Check O: 6 + 8 = 14 on left, 8 + 6 = 14 on right ✓</p>
              <p>Balanced: 3Ca(OH)₂ + 2H₃PO₄ → Ca₃(PO₄)₂ + 6H₂O</p>
              <p className="text-muted-foreground">This acid-base reaction forms calcium phosphate (a precipitate) and water. Parentheses in formulas mean the subscript applies to everything inside.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>Antoine Lavoisier established the law of conservation of mass in 1789.</strong> His careful measurements showed that matter is neither created nor destroyed in chemical reactions. This fundamental principle is why we balance equations – the atoms present at the start must all be present at the end, just rearranged into different compounds.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why must chemical equations be balanced?</h4>
            <p className="text-sm text-muted-foreground">
              Balanced equations obey the law of conservation of mass. Atoms aren't created or destroyed in chemical reactions – they just rearrange. An unbalanced equation would imply atoms appear or disappear, which violates fundamental physics.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I change subscripts to balance equations?</h4>
            <p className="text-sm text-muted-foreground">
              Never. Changing subscripts changes the chemical identity of the substance. H₂O is water; H₂O₂ is hydrogen peroxide (very different!). Only coefficients (numbers in front) can be changed when balancing.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What do the coefficients mean?</h4>
            <p className="text-sm text-muted-foreground">
              Coefficients represent the mole ratio of reactants and products. In 2H₂ + O₂ → 2H₂O, two moles of hydrogen react with one mole of oxygen to produce two moles of water.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if I get fractional coefficients?</h4>
            <p className="text-sm text-muted-foreground">
              Fractions are mathematically correct but conventionally we use whole numbers. Multiply all coefficients by the denominator to eliminate fractions. For example, if you get 1, 1.5, 1, multiply by 2 to get 2, 3, 2.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I handle polyatomic ions?</h4>
            <p className="text-sm text-muted-foreground">
              If a polyatomic ion (like SO₄²⁻ or NO₃⁻) appears unchanged on both sides, treat it as a unit. Balance the ion as a whole rather than counting individual atoms within it.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the inspection method for balancing?</h4>
            <p className="text-sm text-muted-foreground">
              Inspection means balancing by trial and error, adjusting coefficients until counts match. Start with complex molecules, save simple elements (like O₂) for last. For difficult equations, use the algebraic method with variables.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/molar-mass-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Molar Mass Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate molecular weight</p>
          </a>
          <a href="/math-tools/stoichiometry-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Stoichiometry Calculator</p>
            <p className="text-xs text-muted-foreground">Reaction calculations</p>
          </a>
          <a href="/math-tools/limiting-reagent-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Limiting Reagent</p>
            <p className="text-xs text-muted-foreground">Find limiting reactant</p>
          </a>
        </div>
      </section>
    </div>
  );
}
