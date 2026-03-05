"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step {
  expression: string;
  operation: string;
  result: string;
  explanation: string;
}

export default function OrderOfOperationsSolver() {
  const [expression, setExpression] = useState<string>("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [finalResult, setFinalResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const tokenize = (expr: string): (number | string)[] => {
    const tokens: (number | string)[] = [];
    let i = 0;
    
    while (i < expr.length) {
      const char = expr[i];
      
      if (/\s/.test(char)) {
        i++;
        continue;
      }
      
      if (/[\d.]/.test(char)) {
        let numStr = "";
        while (i < expr.length && /[\d.]/.test(expr[i])) {
          numStr += expr[i];
          i++;
        }
        tokens.push(parseFloat(numStr));
        continue;
      }
      
      if (["+", "-", "*", "/", "^", "(", ")"].includes(char)) {
        tokens.push(char);
        i++;
        continue;
      }
      
      throw new Error(`Invalid character: ${char}`);
    }
    
    return tokens;
  };

  const evaluateStep = (tokens: (number | string)[], stepNum: number): { steps: Step[]; result: number } => {
    const allSteps: Step[] = [];
    let currentTokens = [...tokens];
    
    const expressionToStr = (t: (number | string)[]) => t.join(" ");
    
    // Step 1: Handle parentheses
    while (currentTokens.includes("(")) {
      let openIndex = -1;
      let closeIndex = -1;
      
      for (let i = 0; i < currentTokens.length; i++) {
        if (currentTokens[i] === "(") {
          openIndex = i;
        } else if (currentTokens[i] === ")" && openIndex !== -1) {
          closeIndex = i;
          break;
        }
      }
      
      if (openIndex !== -1 && closeIndex !== -1) {
        const innerTokens = currentTokens.slice(openIndex + 1, closeIndex);
        const innerResult = evaluateInner(innerTokens);
        const innerExpr = expressionToStr(innerTokens);
        
        allSteps.push({
          expression: expressionToStr(currentTokens),
          operation: `Parentheses: (${innerExpr})`,
          result: innerResult.toString(),
          explanation: `Evaluate expression inside parentheses first`
        });
        
        currentTokens = [
          ...currentTokens.slice(0, openIndex),
          innerResult,
          ...currentTokens.slice(closeIndex + 1)
        ];
      } else {
        break;
      }
    }
    
    // Step 2: Handle exponents
    while (currentTokens.includes("^")) {
      const expIndex = currentTokens.indexOf("^");
      const base = currentTokens[expIndex - 1] as number;
      const exp = currentTokens[expIndex + 1] as number;
      const result = Math.pow(base, exp);
      
      allSteps.push({
        expression: expressionToStr(currentTokens),
        operation: `Exponents: ${base}^${exp}`,
        result: result.toString(),
        explanation: `Calculate ${base} raised to the power of ${exp}`
      });
      
      currentTokens = [
        ...currentTokens.slice(0, expIndex - 1),
        result,
        ...currentTokens.slice(expIndex + 2)
      ];
    }
    
    // Step 3: Handle multiplication and division (left to right)
    let i = 0;
    while (i < currentTokens.length) {
      if (currentTokens[i] === "*" || currentTokens[i] === "/") {
        const op = currentTokens[i] as string;
        const left = currentTokens[i - 1] as number;
        const right = currentTokens[i + 1] as number;
        const result = op === "*" ? left * right : left / right;
        
        allSteps.push({
          expression: expressionToStr(currentTokens),
          operation: `${op === "*" ? "Multiply" : "Divide"}: ${left} ${op} ${right}`,
          result: result.toString(),
          explanation: `${op === "*" ? "Multiplication" : "Division"} from left to right`
        });
        
        currentTokens = [
          ...currentTokens.slice(0, i - 1),
          result,
          ...currentTokens.slice(i + 2)
        ];
        i--;
      }
      i++;
    }
    
    // Step 4: Handle addition and subtraction (left to right)
    i = 0;
    while (i < currentTokens.length) {
      if (currentTokens[i] === "+" || currentTokens[i] === "-") {
        const op = currentTokens[i] as string;
        const left = currentTokens[i - 1] as number;
        const right = currentTokens[i + 1] as number;
        const result = op === "+" ? left + right : left - right;
        
        allSteps.push({
          expression: expressionToStr(currentTokens),
          operation: `${op === "+" ? "Add" : "Subtract"}: ${left} ${op} ${right}`,
          result: result.toString(),
          explanation: `${op === "+" ? "Addition" : "Subtraction"} from left to right`
        });
        
        currentTokens = [
          ...currentTokens.slice(0, i - 1),
          result,
          ...currentTokens.slice(i + 2)
        ];
        i--;
      }
      i++;
    }
    
    return { steps: allSteps, result: currentTokens[0] as number };
  };

  const evaluateInner = (tokens: (number | string)[]): number => {
    let currentTokens = [...tokens];
    
    // Handle exponents
    while (currentTokens.includes("^")) {
      const expIndex = currentTokens.indexOf("^");
      const base = currentTokens[expIndex - 1] as number;
      const exp = currentTokens[expIndex + 1] as number;
      const result = Math.pow(base, exp);
      currentTokens = [...currentTokens.slice(0, expIndex - 1), result, ...currentTokens.slice(expIndex + 2)];
    }
    
    // Handle multiplication and division
    let i = 0;
    while (i < currentTokens.length) {
      if (currentTokens[i] === "*" || currentTokens[i] === "/") {
        const op = currentTokens[i] as string;
        const left = currentTokens[i - 1] as number;
        const right = currentTokens[i + 1] as number;
        const result = op === "*" ? left * right : left / right;
        currentTokens = [...currentTokens.slice(0, i - 1), result, ...currentTokens.slice(i + 2)];
        i--;
      }
      i++;
    }
    
    // Handle addition and subtraction
    i = 0;
    while (i < currentTokens.length) {
      if (currentTokens[i] === "+" || currentTokens[i] === "-") {
        const op = currentTokens[i] as string;
        const left = currentTokens[i - 1] as number;
        const right = currentTokens[i + 1] as number;
        const result = op === "+" ? left + right : left - right;
        currentTokens = [...currentTokens.slice(0, i - 1), result, ...currentTokens.slice(i + 2)];
        i--;
      }
      i++;
    }
    
    return currentTokens[0] as number;
  };

  const solve = () => {
    setError("");
    setSteps([]);
    setFinalResult(null);

    if (!expression.trim()) {
      setError("Please enter an expression");
      return;
    }

    try {
      const tokens = tokenize(expression);
      const { steps: calcSteps, result } = evaluateStep(tokens, 0);
      setSteps(calcSteps);
      setFinalResult(result);
    } catch (e: any) {
      setError(e.message || "Invalid expression");
    }
  };

  const reset = () => {
    setExpression("");
    setSteps([]);
    setFinalResult(null);
    setError("");
  };

  const loadExample = (expr: string) => {
    setExpression(expr);
    setError("");
    setSteps([]);
    setFinalResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">BODMAS / PEMDAS Calculator – Order of Operations Solver</h1>
        <p className="text-muted-foreground">
          Solve any math expression using the correct order of operations with our free BODMAS/PEMDAS calculator. Get step-by-step breakdowns to understand exactly how each expression is evaluated.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order of Operations Calculator</CardTitle>
          <CardDescription>
            Enter a mathematical expression to see it solved step by step.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Mathematical Expression</Label>
              <Input
                type="text"
                placeholder="e.g., 2 + 3 * 4 or (5 + 3)^2 / 4"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && solve()}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supports: + - * / ^ ( ) and decimals
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={solve}>Solve</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Try:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("2 + 3 * 4")}>2 + 3 × 4</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("(5 + 3) * 2")}> (5 + 3) × 2</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("10 - 2^3")}>10 − 2³</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("4 + 6 / 2 * 3")}>4 + 6 ÷ 2 × 3</Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("(8 - 2) * (3 + 1)")}> (8 − 2) × (3 + 1)</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {finalResult !== null && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Final Answer</p>
                  <p className="text-5xl font-bold">{finalResult}</p>
                  <p className="text-sm text-muted-foreground mt-2 font-mono">
                    {expression} = {finalResult}
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
                  <div className="space-y-4">
                    {steps.map((step, i) => (
                      <div key={i} className="p-3 bg-muted rounded">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {i + 1}
                          </span>
                          <span className="font-semibold text-sm">{step.operation}</span>
                        </div>
                        <div className="ml-11 space-y-2">
                          <div className="font-mono text-sm">
                            <span className="text-muted-foreground">Expression: </span>
                            {step.expression}
                          </div>
                          <div className="font-mono text-sm">
                            <span className="text-muted-foreground">Result: </span>
                            {step.result}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {step.explanation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">BODMAS / PEMDAS Calculator – Order of Operations Solver</h2>
          <p className="text-muted-foreground">
            Order of operations rules tell us which part of a mathematical expression to calculate first. Without these rules, the same expression could have multiple answers. This calculator follows BODMAS/PEMDAS rules and shows every step so you can follow along and learn the process.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Enter any expression with numbers, basic operations (+, −, ×, ÷), exponents, and parentheses. The calculator evaluates it in the correct order, explaining each step. You'll see parentheses handled first, then exponents, then multiplication and division, and finally addition and subtraction.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">BODMAS vs PEMDAS</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">BODMAS (UK, Australia, others)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">B</span>
                <span><strong>Brackets</strong> (parentheses)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">O</span>
                <span><strong>Orders</strong> (powers, roots, exponents)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">D</span>
                <span><strong>Division</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">M</span>
                <span><strong>Multiplication</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">A</span>
                <span><strong>Addition</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">S</span>
                <span><strong>Subtraction</strong></span>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">PEMDAS (US)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">P</span>
                <span><strong>Parentheses</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">E</span>
                <span><strong>Exponents</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">M</span>
                <span><strong>Multiplication</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">D</span>
                <span><strong>Division</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">A</span>
                <span><strong>Addition</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">S</span>
                <span><strong>Subtraction</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Both acronyms mean the same thing. Division and multiplication have equal priority – work left to right. Same for addition and subtraction. The different letters just reflect different regional terminology.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Key Rules</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">1. Parentheses/Brackets First</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Always evaluate what's inside parentheses or brackets before anything else. If there are nested parentheses, start with the innermost pair.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              (5 + 3) × 2 = 8 × 2 = 16 (not 5 + 6 = 11)
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">2. Exponents/Orders Next</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate powers and roots after parentheses. This includes squares, cubes, and any other exponents.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              3 + 2² = 3 + 4 = 7 (not 5² = 25)
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">3. Multiplication and Division (Left to Right)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              These have equal priority. Work from left to right, not multiplication before division.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              12 ÷ 3 × 2 = 4 × 2 = 8 (not 12 ÷ 6 = 2)
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">4. Addition and Subtraction (Left to Right)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              These also have equal priority. Work from left to right.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              10 - 3 + 2 = 7 + 2 = 9 (not 10 - 5 = 5)
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: 2 + 3 × 4</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Multiplication first: 3 × 4 = 12</div>
              <div>Then addition: 2 + 12 = 14</div>
              <div className="text-muted-foreground">Answer: 14</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: (5 + 3) × 2</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Parentheses first: 5 + 3 = 8</div>
              <div>Then multiplication: 8 × 2 = 16</div>
              <div className="text-muted-foreground">Answer: 16</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: 10 - 2³</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Exponent first: 2³ = 8</div>
              <div>Then subtraction: 10 - 8 = 2</div>
              <div className="text-muted-foreground">Answer: 2</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: 4 + 6 ÷ 2 × 3</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Division first (left to right): 6 ÷ 2 = 3</div>
              <div>Multiplication next: 3 × 3 = 9</div>
              <div>Finally addition: 4 + 9 = 13</div>
              <div className="text-muted-foreground">Answer: 13</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: (8 - 2) × (3 + 1)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>First parentheses: 8 - 2 = 6</div>
              <div>Second parentheses: 3 + 1 = 4</div>
              <div>Multiply results: 6 × 4 = 24</div>
              <div className="text-muted-foreground">Answer: 24</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Mistakes</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Adding before multiplying</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Wrong: 2 + 3 × 4 = 5 × 4 = 20
            </p>
            <p className="text-xs text-muted-foreground">
              Right: 2 + 3 × 4 = 2 + 12 = 14
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Doing multiplication before division</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Wrong: 12 ÷ 3 × 2 = 12 ÷ 6 = 2
            </p>
            <p className="text-xs text-muted-foreground">
              Right: 12 ÷ 3 × 2 = 4 × 2 = 8 (left to right)
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Ignoring parentheses</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Wrong: (5 + 3) × 2 = 5 + 6 = 11
            </p>
            <p className="text-xs text-muted-foreground">
              Right: (5 + 3) × 2 = 8 × 2 = 16
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Subtracting before adding</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Wrong: 10 - 3 + 2 = 10 - 5 = 5
            </p>
            <p className="text-xs text-muted-foreground">
              Right: 10 - 3 + 2 = 7 + 2 = 9 (left to right)
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does order of operations matter?</h4>
            <p className="text-sm text-muted-foreground">
              Without agreed-upon rules, the same expression could have different answers. Order of operations ensures everyone gets the same result when solving mathematical expressions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do calculators follow order of operations?</h4>
            <p className="text-sm text-muted-foreground">
              Scientific calculators do. Basic four-function calculators often don't – they calculate as you type. That's why 2 + 3 × 4 gives 14 on a scientific calculator but 20 on a basic one.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What about fractions in expressions?</h4>
            <p className="text-sm text-muted-foreground">
              Treat the numerator and denominator as if they're in parentheses. Evaluate each separately, then divide. For example, (2 + 3) / (4 - 1) = 5 / 3.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I remember the order?</h4>
            <p className="text-sm text-muted-foreground">
              Use the acronym: PEMDAS ("Please Excuse My Dear Aunt Sally") or BODMAS. Remember that M/D and A/S are equal priority – left to right within each pair.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/standard-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Standard Calculator</p>
            <p className="text-xs text-muted-foreground">Basic arithmetic</p>
          </a>
          <a href="/math-tools/long-division-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Long Division Calculator</p>
            <p className="text-xs text-muted-foreground">Division with steps</p>
          </a>
          <a href="/math-tools/fraction-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Fraction Calculator</p>
            <p className="text-xs text-muted-foreground">Fraction operations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
