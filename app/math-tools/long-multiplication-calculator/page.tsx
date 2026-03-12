"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MultiplicationStep {
  multiplier: number;
  multiplicand: number;
  digit: number;
  partialProduct: number;
  zeros: number;
  explanation: string;
}

export default function LongMultiplicationCalculator() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [steps, setSteps] = useState<MultiplicationStep[]>([]);
  const [finalProduct, setFinalProduct] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const performLongMultiplication = () => {
    setError("");
    setSteps([]);
    setFinalProduct(null);

    if (!num1 || !num2) {
      setError("Please enter both numbers");
      return;
    }

    if (!/^\d+$/.test(num1) || !/^\d+$/.test(num2)) {
      setError("Please enter positive whole numbers only");
      return;
    }

    const n1 = parseInt(num1);
    const n2 = parseInt(num2);
    const multiplicationSteps: MultiplicationStep[] = [];
    
    const num2Str = num2.toString();
    let totalProduct = 0;

    for (let i = num2Str.length - 1; i >= 0; i--) {
      const digit = parseInt(num2Str[i]);
      const zeros = num2Str.length - 1 - i;
      const partialProduct = n1 * digit * Math.pow(10, zeros);

      multiplicationSteps.push({
        multiplier: n1,
        multiplicand: n2,
        digit: digit,
        partialProduct: n1 * digit,
        zeros: zeros,
        explanation: `${n1} × ${digit} = ${n1 * digit}${zeros > 0 ? ` (add ${zeros} zero${zeros > 1 ? 's' : ''}) = ${partialProduct.toLocaleString()}` : ''}`
      });

      totalProduct += partialProduct;
    }

    setSteps(multiplicationSteps.reverse());
    setFinalProduct(totalProduct);
  };

  const reset = () => {
    setNum1("");
    setNum2("");
    setSteps([]);
    setFinalProduct(null);
    setError("");
  };

  const renderMultiplicationVisual = () => {
    if (steps.length === 0 || finalProduct === null) return null;

    return (
      <div className="font-mono text-sm overflow-x-auto">
        <div className="text-right mb-4">
          <div className="text-lg">{num1}</div>
          <div className="text-lg">× {num2}</div>
          <div className="border-t border-foreground my-1"></div>
          {steps.map((step, i) => (
            <div key={i} className="text-lg">
              {step.partialProduct.toLocaleString()}{" ".repeat(step.zeros)}
            </div>
          ))}
          <div className="border-t border-foreground my-1"></div>
          <div className="text-xl font-bold">{finalProduct.toLocaleString()}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Long Multiplication Calculator – Step-by-Step Multiplication</h1>
        <p className="text-muted-foreground">
          Multiply large numbers with full step-by-step working using our free online long multiplication calculator. See every step laid out clearly – perfect for students learning multiplication.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Long Multiplication Calculator</CardTitle>
          <CardDescription>
            Enter two numbers to see the complete long multiplication process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Number</Label>
                <Input
                  type="text"
                  placeholder="e.g., 123"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && performLongMultiplication()}
                />
              </div>
              <div>
                <Label>Second Number</Label>
                <Input
                  type="text"
                  placeholder="e.g., 45"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && performLongMultiplication()}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={performLongMultiplication}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {finalProduct !== null && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Product</p>
                  <p className="text-5xl font-bold">{finalProduct.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {num1} × {num2} = {finalProduct.toLocaleString()}
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Visual Layout</h4>
                  {renderMultiplicationVisual()}
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
                            Multiply by {step.digit} (ones place{step.zeros > 0 ? ` + ${step.zeros} zero${step.zeros > 1 ? 's' : ''}` : ''})
                          </span>
                        </div>
                        <div className="ml-11 space-y-1 text-sm">
                          <div className="font-mono">
                            {step.multiplier.toLocaleString()} × {step.digit} = {step.partialProduct.toLocaleString()}
                          </div>
                          {step.zeros > 0 && (
                            <div className="font-mono text-muted-foreground">
                              Add {step.zeros} zero{step.zeros > 1 ? 's' : ''}: {step.partialProduct.toLocaleString()} × {Math.pow(10, step.zeros).toLocaleString()} = {(step.partialProduct * Math.pow(10, step.zeros)).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Sum of Partial Products</h4>
                  <div className="font-mono text-sm space-y-2">
                    <div>
                      {steps.map((step, i) => (
                        <span key={i}>
                          {(step.partialProduct * Math.pow(10, step.zeros)).toLocaleString()}
                          {i < steps.length - 1 ? " + " : ""}
                        </span>
                      ))}
                    </div>
                    <div className="border-t border-border pt-2">
                      = {finalProduct.toLocaleString()}
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
          <h2 className="text-2xl font-semibold mb-3">Long Multiplication Calculator – Step-by-Step Multiplication</h2>
          <p className="text-muted-foreground">
            Long multiplication breaks down large multiplication problems into smaller, manageable steps. This calculator shows every partial product and how they combine to give the final answer. It's built for students learning the column method and anyone who wants to understand the process behind multiplying large numbers.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Enter any two positive whole numbers. The calculator multiplies them using the standard algorithm, showing each digit-by-digit multiplication and how place value affects the final result. You'll see partial products stacked and summed, just like working on paper.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Long Multiplication Terms</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Multiplicand</h4>
            <p className="text-sm text-muted-foreground">
              The number being multiplied. In 123 × 45, the multiplicand is 123.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Multiplier</h4>
            <p className="text-sm text-muted-foreground">
              The number you multiply by. In 123 × 45, the multiplier is 45.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Product</h4>
            <p className="text-sm text-muted-foreground">
              The result of multiplication. In 123 × 45 = 5535, the product is 5535.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How Long Multiplication Works</h3>
        <div className="p-6 bg-muted rounded-lg">
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Start from the right</p>
                <p className="text-muted-foreground">
                  Begin with the ones digit of the multiplier. Multiply it by each digit of the multiplicand, working right to left.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Write the partial product</p>
                <p className="text-muted-foreground">
                  Write the result below the line. This is your first partial product.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Move to the next digit</p>
                <p className="text-muted-foreground">
                  Move left to the next digit in the multiplier. Multiply and write the result on a new line, shifted one position to the left (or add a zero placeholder).
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Add all partial products</p>
                <p className="text-muted-foreground">
                  Sum all the partial products to get the final answer.
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
            <h4 className="font-semibold text-sm mb-3">Example 1: 23 × 4</h4>
            <div className="font-mono text-sm space-y-2">
              <div>3 × 4 = 12 (write 2, carry 1)</div>
              <div>2 × 4 = 8, plus carried 1 = 9</div>
              <div className="text-muted-foreground">Answer: 92</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: 45 × 12</h4>
            <div className="font-mono text-sm space-y-2">
              <div>First partial: 45 × 2 = 90</div>
              <div>Second partial: 45 × 1 = 45 (shift left, so 450)</div>
              <div>Add: 90 + 450 = 540</div>
              <div className="text-muted-foreground">Answer: 540</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: 123 × 45</h4>
            <div className="font-mono text-sm space-y-2">
              <div>First partial: 123 × 5 = 615</div>
              <div>Second partial: 123 × 4 = 492 (shift left, so 4920)</div>
              <div>Add: 615 + 4920 = 5535</div>
              <div className="text-muted-foreground">Answer: 5535</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: 256 × 37</h4>
            <div className="font-mono text-sm space-y-2">
              <div>First partial: 256 × 7 = 1792</div>
              <div>Second partial: 256 × 3 = 768 (shift left, so 7680)</div>
              <div>Add: 1792 + 7680 = 9472</div>
              <div className="text-muted-foreground">Answer: 9472</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Tips for Long Multiplication</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Keep columns aligned</h4>
            <p className="text-xs text-muted-foreground">
              Use graph paper or draw light vertical lines. Misaligned columns cause most errors in long multiplication.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Use zero placeholders</h4>
            <p className="text-xs text-muted-foreground">
              When moving to tens, hundreds places, write a zero in the ones column. It keeps everything aligned.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Check with estimation</h4>
            <p className="text-xs text-muted-foreground">
              Round both numbers and multiply mentally. 123 × 45 should be around 100 × 50 = 5000. If you get 500 or 50000, something's wrong.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Master single-digit facts</h4>
            <p className="text-xs text-muted-foreground">
              Long multiplication relies on knowing your times tables. Practice 1×1 through 9×9 until they're automatic.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do we shift left for each digit?</h4>
            <p className="text-sm text-muted-foreground">
              Each position represents a higher place value. When you multiply by the tens digit, you're really multiplying by 10, 20, 30, etc. Shifting left (or adding a zero) accounts for this.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if there's a zero in the multiplier?</h4>
            <p className="text-sm text-muted-foreground">
              Multiply by zero to get zero for that partial product. Still write it (or use it as a placeholder) to keep columns aligned. For example, 123 × 105 has a zero in the tens place.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I multiply decimals this way?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Ignore decimal points during multiplication, then count total decimal places in both original numbers. Place the decimal in the product so it has that many decimal places.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the lattice method?</h4>
            <p className="text-sm text-muted-foreground">
              An alternative to long multiplication using a grid. Each cell holds a digit product, and you add along diagonals. It's more visual but takes more space.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
