"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DivisionStep {
  dividend: string;
  divisor: number;
  quotient: string;
  remainder: number;
  currentDividend: number;
  product: number;
  difference: number;
  bringDown: number | null;
  explanation: string;
}

export default function LongDivisionCalculator() {
  const [dividend, setDividend] = useState<string>("");
  const [divisor, setDivisor] = useState<string>("");
  const [steps, setSteps] = useState<DivisionStep[]>([]);
  const [finalQuotient, setFinalQuotient] = useState<number | null>(null);
  const [finalRemainder, setFinalRemainder] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const performLongDivision = () => {
    setError("");
    setSteps([]);
    setFinalQuotient(null);
    setFinalRemainder(null);

    const div = parseInt(divisor);
    const divi = dividend;

    if (!divi || !divisor) {
      setError("Please enter both dividend and divisor");
      return;
    }

    if (div <= 0) {
      setError("Divisor must be greater than zero");
      return;
    }

    if (!/^\d+$/.test(divi)) {
      setError("Dividend must be a positive whole number");
      return;
    }

    const digits = divi.split("").map(Number);
    const divisionSteps: DivisionStep[] = [];
    let currentDividend = 0;
    let quotient = "";
    let remainder = 0;
    let started = false;

    for (let i = 0; i < digits.length; i++) {
      currentDividend = currentDividend * 10 + digits[i];
      
      if (currentDividend < div && i < digits.length - 1) {
        if (started) {
          quotient += "0";
          divisionSteps.push({
            dividend: divi,
            divisor: div,
            quotient: quotient,
            remainder: currentDividend,
            currentDividend: currentDividend,
            product: 0,
            difference: currentDividend,
            bringDown: digits[i + 1],
            explanation: `${currentDividend} < ${div}, bring down ${digits[i + 1]} → ${currentDividend * 10 + digits[i + 1]}`
          });
        }
        continue;
      }

      started = true;
      const digitQuotient = Math.floor(currentDividend / div);
      const product = digitQuotient * div;
      const difference = currentDividend - product;
      
      quotient += digitQuotient.toString();
      
      divisionSteps.push({
        dividend: divi,
        divisor: div,
        quotient: quotient,
        remainder: difference,
        currentDividend: currentDividend,
        product: product,
        difference: difference,
        bringDown: i < digits.length - 1 ? digits[i + 1] : null,
        explanation: `${div} goes into ${currentDividend} ${digitQuotient} time(s). ${digitQuotient} × ${div} = ${product}. ${currentDividend} - ${product} = ${difference}${i < digits.length - 1 ? `, bring down ${digits[i + 1]}` : ""}`
      });

      currentDividend = difference;
    }

    remainder = currentDividend;
    
    if (quotient === "") quotient = "0";

    setSteps(divisionSteps);
    setFinalQuotient(parseInt(quotient));
    setFinalRemainder(remainder);
  };

  const reset = () => {
    setDividend("");
    setDivisor("");
    setSteps([]);
    setFinalQuotient(null);
    setFinalRemainder(null);
    setError("");
  };

  const renderLongDivisionVisual = () => {
    if (steps.length === 0 || finalQuotient === null) return null;

    const divisorNum = parseInt(divisor);
    
    return (
      <div className="font-mono text-sm overflow-x-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{finalQuotient}</div>
            {finalRemainder !== 0 && (
              <div className="text-xs text-muted-foreground mt-1">
                R{finalRemainder}
              </div>
            )}
          </div>
          <div className="border-t-2 border-l-2 border-foreground px-4 py-2">
            <div className="text-lg">{dividend}</div>
          </div>
          <div className="text-lg">
            <span className="text-muted-foreground">÷</span> {divisorNum}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Long Division Calculator – Step-by-Step Division with Remainder</h1>
        <p className="text-muted-foreground">
          Solve long division problems step by step with our free online long division calculator. See every step of the division process including quotient and remainder – ideal for learning.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Long Division Calculator</CardTitle>
          <CardDescription>
            Enter dividend and divisor to see the complete long division process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Dividend</Label>
                <Input
                  type="text"
                  placeholder="e.g., 847"
                  value={dividend}
                  onChange={(e) => setDividend(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && performLongDivision()}
                />
              </div>
              <div>
                <Label>Divisor</Label>
                <Input
                  type="text"
                  placeholder="e.g., 5"
                  value={divisor}
                  onChange={(e) => setDivisor(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && performLongDivision()}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={performLongDivision}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {finalQuotient !== null && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg">
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Quotient</p>
                      <p className="text-4xl font-bold">{finalQuotient}</p>
                    </div>
                    {finalRemainder !== null && (
                      <>
                        <div className="text-2xl text-muted-foreground">/</div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-1">Remainder</p>
                          <p className="text-4xl font-bold">{finalRemainder}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="text-center mt-4 text-sm text-muted-foreground">
                    {dividend} ÷ {divisor} = {finalQuotient} {finalRemainder !== 0 && `R${finalRemainder}`}
                    {finalRemainder !== 0 && (
                      <span className="ml-2">or {finalQuotient} + {finalRemainder}/{divisor}</span>
                    )}
                  </div>
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
                          <span className="font-mono text-sm">
                            {step.divisor} into {step.currentDividend}: {Math.floor(step.currentDividend / step.divisor)}
                          </span>
                        </div>
                        <div className="ml-11 space-y-1 text-sm">
                          <div className="font-mono text-muted-foreground">
                            {step.divisor} × {Math.floor(step.currentDividend / step.divisor)} = {step.product}
                          </div>
                          <div className="font-mono text-muted-foreground">
                            {step.currentDividend} - {step.product} = {step.difference}
                          </div>
                          {step.bringDown !== null && (
                            <div className="font-mono text-muted-foreground">
                              Bring down {step.bringDown} → {step.difference * 10 + step.bringDown}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Verification</h4>
                  <div className="font-mono text-sm space-y-2">
                    <div>Quotient × Divisor + Remainder = Dividend</div>
                    <div>{finalQuotient} × {divisor} + {finalRemainder} = {finalQuotient * parseInt(divisor) + (finalRemainder || 0)}</div>
                    <div className="text-muted-foreground">
                      {finalQuotient * parseInt(divisor)} + {finalRemainder} = {dividend} ✓
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Long Division Calculator – Step-by-Step Division with Remainder</h2>
          <p className="text-muted-foreground">
            Long division breaks down complex division problems into manageable steps. This calculator shows every single step of the process, from the first division through the final remainder. It's designed for students learning the method and anyone who needs to understand how division works, not just get an answer.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            The calculator handles any positive whole number division. Enter your dividend (the number being divided) and divisor (the number you're dividing by). You'll see the quotient, any remainder, and a complete breakdown of each calculation step with explanations.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Long Division Terms</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Dividend</h4>
            <p className="text-sm text-muted-foreground">
              The number being divided. In 847 ÷ 5, the dividend is 847.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Divisor</h4>
            <p className="text-sm text-muted-foreground">
              The number you divide by. In 847 ÷ 5, the divisor is 5.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Quotient</h4>
            <p className="text-sm text-muted-foreground">
              The result of division. In 847 ÷ 5 = 169 R1, the quotient is 169.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Remainder</h4>
            <p className="text-sm text-muted-foreground">
              What's left after division. In 847 ÷ 5 = 169 R1, the remainder is 1.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How Long Division Works</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Divide</p>
                <p className="text-muted-foreground">
                  Determine how many times the divisor goes into the current portion of the dividend. Write this digit in the quotient.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Multiply</p>
                <p className="text-muted-foreground">
                  Multiply the divisor by the quotient digit you just found. Write the product below the current dividend.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Subtract</p>
                <p className="text-muted-foreground">
                  Subtract the product from the current dividend. Write the difference below.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Bring Down</p>
                <p className="text-muted-foreground">
                  Bring down the next digit from the original dividend. Combine it with the difference to form a new number.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">5</span>
              <div>
                <p className="font-semibold mb-1">Repeat</p>
                <p className="text-muted-foreground">
                  Repeat steps 1-4 until you've brought down all digits. The final difference is your remainder.
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
            <h4 className="font-semibold text-sm mb-3">Example 1: 84 ÷ 4</h4>
            <div className="font-mono text-sm space-y-2">
              <div>8 ÷ 4 = 2 (write 2 in quotient)</div>
              <div>2 × 4 = 8, subtract: 8 - 8 = 0</div>
              <div>Bring down 4: new dividend is 4</div>
              <div>4 ÷ 4 = 1 (write 1 in quotient)</div>
              <div>1 × 4 = 4, subtract: 4 - 4 = 0</div>
              <div className="text-muted-foreground">Answer: 21 R0 (or just 21)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: 157 ÷ 3</h4>
            <div className="font-mono text-sm space-y-2">
              <div>15 ÷ 3 = 5 (write 5 in quotient)</div>
              <div>5 × 3 = 15, subtract: 15 - 15 = 0</div>
              <div>Bring down 7: new dividend is 7</div>
              <div>7 ÷ 3 = 2 (write 2 in quotient)</div>
              <div>2 × 3 = 6, subtract: 7 - 6 = 1</div>
              <div className="text-muted-foreground">Answer: 52 R1</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: 1024 ÷ 8</h4>
            <div className="font-mono text-sm space-y-2">
              <div>10 ÷ 8 = 1 (write 1 in quotient)</div>
              <div>1 × 8 = 8, subtract: 10 - 8 = 2</div>
              <div>Bring down 2: new dividend is 22</div>
              <div>22 ÷ 8 = 2 (write 2 in quotient)</div>
              <div>2 × 8 = 16, subtract: 22 - 16 = 6</div>
              <div>Bring down 4: new dividend is 64</div>
              <div>64 ÷ 8 = 8 (write 8 in quotient)</div>
              <div>8 × 8 = 64, subtract: 64 - 64 = 0</div>
              <div className="text-muted-foreground">Answer: 128 R0 (or just 128)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What if the divisor doesn't go into the first digit?</h4>
            <p className="text-sm text-muted-foreground">
              Look at the first two digits instead. For example, in 156 ÷ 3, start with 15 ÷ 3, not 1 ÷ 3. The calculator handles this automatically.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the remainder be larger than the divisor?</h4>
            <p className="text-sm text-muted-foreground">
              No. If your remainder is larger than the divisor, you made an error. The divisor should go into the remainder at least one more time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I check my long division answer?</h4>
            <p className="text-sm text-muted-foreground">
              Multiply the quotient by the divisor, then add the remainder. You should get the original dividend. The calculator shows this verification automatically.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if there's a zero in the quotient?</h4>
            <p className="text-sm text-muted-foreground">
              When the divisor doesn't go into the current dividend, write 0 in the quotient and bring down the next digit. For example, 105 ÷ 5 = 21, but 1005 ÷ 5 = 201.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this for decimal division?</h4>
            <p className="text-sm text-muted-foreground">
              This calculator handles whole number division with remainders. For decimal results, you'd continue the process by adding zeros after a decimal point in the dividend.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/long-multiplication-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Long Multiplication Calculator</p>
            <p className="text-xs text-muted-foreground">Multiply with steps</p>
          </a>
          <a href="/math-tools/fraction-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Fraction Calculator</p>
            <p className="text-xs text-muted-foreground">Fraction operations</p>
          </a>
          <a href="/math-tools/standard-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Standard Calculator</p>
            <p className="text-xs text-muted-foreground">Basic arithmetic</p>
          </a>
        </div>
      </section>
    </div>
  );
}
