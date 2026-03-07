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
        // Handle parentheses (simplified - only one level)
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
        // Element symbol
        let elem = formula[i];
        i++;
        while (i < formula.length && formula[i] >= 'a' && formula[i] <= 'z') {
          elem += formula[i];
          i++;
        }
        
        // Count
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

  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
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

    // Get all elements
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

    // Build matrix for linear system
    // For each element: sum(reactant_coeffs * counts) = sum(product_coeffs * counts)
    // This gives us nElements equations with nCompounds unknowns
    
    // Use null space method (simplified brute force for small systems)
    const maxCoeff = 20;
    
    // Try all combinations of coefficients
    const formulas = [...reactantStrings.map(s => s.replace(/^\d+/, '')), ...productStrings.map(s => s.replace(/^\d+/, ''))];
    
    for (let total = nCompounds; total <= maxCoeff * nCompounds; total++) {
      const coeffs = findCoefficients(total, nCompounds, formulas, elements, parseFormula, nReactants);
      if (coeffs) {
        // Verify and simplify
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
    // Generate all coefficient combinations that sum to total
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
          Balance any chemical equation with our free online equation balancer. Get balanced equations with coefficients and step-by-step solutions for chemistry homework.
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

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
