"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BigNumberCalculator() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [operation, setOperation] = useState<"add" | "subtract" | "multiply" | "divide" | "power" | "modulo">("add");
  const [error, setError] = useState<string>("");

  const addBigNumbers = (a: string, b: string): string => {
    const num1 = BigInt(a);
    const num2 = BigInt(b);
    return (num1 + num2).toString();
  };

  const subtractBigNumbers = (a: string, b: string): string => {
    const num1 = BigInt(a);
    const num2 = BigInt(b);
    return (num1 - num2).toString();
  };

  const multiplyBigNumbers = (a: string, b: string): string => {
    const num1 = BigInt(a);
    const num2 = BigInt(b);
    return (num1 * num2).toString();
  };

  const divideBigNumbers = (a: string, b: string): { quotient: string; remainder: string } => {
    const num1 = BigInt(a);
    const num2 = BigInt(b);
    const quotient = num1 / num2;
    const remainder = num1 % num2;
    return { quotient: quotient.toString(), remainder: remainder.toString() };
  };

  const powerBigNumbers = (base: string, exp: string): string => {
    const b = BigInt(base);
    const e = BigInt(exp);
    return (b ** e).toString();
  };

  const moduloBigNumbers = (a: string, b: string): string => {
    const num1 = BigInt(a);
    const num2 = BigInt(b);
    return (num1 % num2).toString();
  };

  const calculate = () => {
    setError("");
    setResult("");

    if (!num1.trim() || !num2.trim()) {
      setError("Please enter both numbers");
      return;
    }

    if (!/^-?\d+$/.test(num1) || !/^-?\d+$/.test(num2)) {
      setError("Please enter valid integers (no decimals)");
      return;
    }

    try {
      if (operation === "add") {
        setResult(addBigNumbers(num1, num2));
      } else if (operation === "subtract") {
        setResult(subtractBigNumbers(num1, num2));
      } else if (operation === "multiply") {
        setResult(multiplyBigNumbers(num1, num2));
      } else if (operation === "divide") {
        if (num2 === "0") {
          setError("Cannot divide by zero");
          return;
        }
        const { quotient, remainder } = divideBigNumbers(num1, num2);
        setResult(`${quotient} R${remainder}`);
      } else if (operation === "power") {
        if (BigInt(num2) < 0n) {
          setError("Exponent must be non-negative for integer results");
          return;
        }
        if (BigInt(num2) > 10000n) {
          setError("Exponent too large for practical computation");
          return;
        }
        setResult(powerBigNumbers(num1, num2));
      } else if (operation === "modulo") {
        if (num2 === "0") {
          setError("Cannot calculate modulo with zero");
          return;
        }
        setResult(moduloBigNumbers(num1, num2));
      }
    } catch (e: any) {
      setError(e.message || "Calculation error");
    }
  };

  const reset = () => {
    setNum1("");
    setNum2("");
    setResult("");
    setError("");
  };

  const loadExample = (n1: string, n2: string, op: typeof operation) => {
    setNum1(n1);
    setNum2(n2);
    setOperation(op);
    setResult("");
    setError("");
  };

  const formatNumber = (num: string): string => {
    if (!num) return "";
    const isNegative = num.startsWith("-");
    const absNum = isNegative ? num.slice(1) : num;
    const formatted = absNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return isNegative ? "-" + formatted : formatted;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Big Number Calculator – Compute Huge Numbers Online</h1>
        <p className="text-muted-foreground">
          Calculate with extremely large integers using our free online big number calculator. Perform addition, subtraction, multiplication, and division on numbers of any size without overflow errors.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Operation</Label>
          <Tabs value={operation} onValueChange={(v) => setOperation(v as typeof operation)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="add">Add</TabsTrigger>
              <TabsTrigger value="subtract">Subtract</TabsTrigger>
              <TabsTrigger value="multiply">Multiply</TabsTrigger>
              <TabsTrigger value="divide">Divide</TabsTrigger>
              <TabsTrigger value="power">Power</TabsTrigger>
              <TabsTrigger value="modulo">Modulo</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>First Number</Label>
            <Input
              type="text"
              placeholder="Enter a large integer"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
          <div>
            <Label>Second Number</Label>
            <Input
              type="text"
              placeholder="Enter a large integer"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("999999999999999999", "1", "add")}>
            10^18 + 1
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("123456789012345678901234567890", "987654321098765432109876543210", "multiply")}>
            Multiply huge numbers
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2", "100", "power")}>
            2^100
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000000000000000000000", "7", "modulo")}>
            Large mod 7
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("98765432109876543210", "12345678901234567890", "subtract")}>
            Subtract large numbers
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000000000000000000000000", "999999999999", "divide")}>
            Divide trillion by billion
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5", "50", "power")}>
            5^50
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2 text-center">Result</p>
              <p className="text-2xl md:text-4xl font-bold font-mono break-all text-center">
                {formatNumber(result)}
              </p>
              {operation === "divide" && result.includes("R") && (
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  (Quotient with remainder)
                </p>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Expression</h4>
              <div className="font-mono text-sm break-all">
                {formatNumber(num1)} {operation === "add" ? "+" : operation === "subtract" ? "−" : operation === "multiply" ? "×" : operation === "divide" ? "÷" : operation === "power" ? "^" : "mod"} {formatNumber(num2)} = {formatNumber(result.split("R")[0])}{operation === "divide" && result.includes("R") ? ` R${result.split("R")[1]}` : ""}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Result Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Digits: </span>
                  <span className="font-semibold">{result.replace("-", "").replace("R", "").split("R")[0].length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Sign: </span>
                  <span className="font-semibold">{result.startsWith("-") ? "Negative" : "Positive"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Big Number Calculator – Arbitrary Precision Arithmetic</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Standard calculators and programming languages have limits on number size. JavaScript's Number type, for example, can only safely represent integers up to about 9 quadrillion (2^53 - 1). This big number calculator removes those limits, handling integers with hundreds or thousands of digits using BigInt arithmetic.
          </p>
          <p className="text-muted-foreground">
            Cryptography, combinatorics, and number theory often involve numbers far too large for normal calculators. RSA encryption keys use numbers with hundreds of digits. Factorials grow explosively – 100! has 158 digits. This calculator uses arbitrary-precision arithmetic to handle any size integer your browser can store.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Supported Operations</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Addition</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Add two large integers together.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              999...999 + 1 = 1000...000
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Subtraction</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Subtract one large integer from another.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              1000...000 - 1 = 999...999
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Multiplication</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Multiply two large integers.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              123456789 × 987654321
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Division</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Integer division with quotient and remainder.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              1000 ÷ 7 = 142 R6
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Exponentiation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Raise a number to a large power (up to 10,000).
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              2^100 = 1267650600228229401496703205376
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Modulo</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find the remainder after division.
            </p>
            <div className="font-mono text-xs bg-muted p-2 rounded">
              100 mod 7 = 2
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Why Big Numbers Matter</h3>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cryptography</h4>
            <p className="text-sm text-muted-foreground">
              RSA encryption uses prime numbers with hundreds of digits. The security comes from the fact that factoring such large numbers is computationally infeasible. A 2048-bit RSA key involves numbers around 10^617.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Combinatorics</h4>
            <p className="text-sm text-muted-foreground">
              Counting problems explode quickly. The number of ways to shuffle a deck of 52 cards is 52! (52 factorial), which equals about 8 × 10^67. That's more than the number of atoms in the observable universe.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Prime Number Research</h4>
            <p className="text-sm text-muted-foreground">
              The largest known primes have millions of digits. The current record holder, discovered in 2018, is 2^82,589,933 − 1, a number with 24,862,048 digits.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Computer Science</h4>
            <p className="text-sm text-muted-foreground">
              Hash functions, checksums, and digital signatures all work with large numbers. SHA-256 produces a 256-bit hash – a number up to 2^256 − 1.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Large Number Examples</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="font-semibold text-sm">Googol</span>
              <span className="font-mono text-xs">10^100 (1 followed by 100 zeros)</span>
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="font-semibold text-sm">Googolplex</span>
              <span className="font-mono text-xs">10^(10^100) (1 followed by a googol zeros)</span>
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="font-semibold text-sm">2^64 − 1</span>
              <span className="font-mono text-xs">18,446,744,073,709,551,615 (max uint64)</span>
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="font-semibold text-sm">2^256 − 1</span>
              <span className="font-mono text-xs">~1.16 × 10^77 (max Ethereum address)</span>
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="font-semibold text-sm">52!</span>
              <span className="font-mono text-xs">~8.07 × 10^67 (card shuffles)</span>
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="font-semibold text-sm">Largest known prime</span>
              <span className="font-mono text-xs">2^82,589,933 − 1 (24.8 million digits)</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Large Addition</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Add 999,999,999,999,999,999 + 1
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>  999,999,999,999,999,999</div>
              <div>+                   1</div>
              <div>──────────────────────</div>
              <div>1,000,000,000,000,000,000</div>
              <div>Result: 10^18 (one quintillion)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Exponentiation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate 2^100
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>2^10 = 1,024</div>
              <div>2^20 = 1,048,576</div>
              <div>2^50 = 1,125,899,906,842,624</div>
              <div>2^100 = 1,267,650,600,228,229,401,496,703,205,376</div>
              <div>This is approximately 1.27 × 10^30</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Modulo Operation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find 1,000,000,000,000,000,000,000 mod 7
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>10^21 ÷ 7 = 142,857,142,857,142,857,142 R6</div>
              <div>Pattern: 10^n mod 7 cycles through 1,3,2,6,4,5</div>
              <div>21 mod 6 = 3, so 10^21 mod 7 = 10^3 mod 7 = 6</div>
              <div>Result: 6</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Large Multiplication</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Multiply 123,456,789,012,345,678,901,234,567,890 × 987,654,321,098,765,432,109,876,543,210
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Both numbers have 30 digits</div>
              <div>Product will have up to 60 digits</div>
              <div>Result: 121,932,631,137,021,795,234,567,890,123,456,789,012,345,678,901,234,567,890</div>
              <div>(59 digits total)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Quick Fact</h3>
          <p className="text-sm text-muted-foreground">
            The term "googol" (10^100) was coined in 1920 by 9-year-old Milton Sirotta, nephew of mathematician Edward Kasner. Kasner later popularized it in his 1940 book "Mathematics and the Imagination." The search engine Google is named after this number, reflecting its mission to organize the web's vast information.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How large can the numbers be?</h4>
            <p className="text-sm text-muted-foreground">
              As large as your browser's memory allows. JavaScript BigInt supports arbitrary-precision integers limited only by available memory. Numbers with thousands of digits work fine.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use decimal numbers?</h4>
            <p className="text-sm text-muted-foreground">
              No, this calculator handles integers only. For large decimal calculations, you'd need a different arbitrary-precision library that supports floating-point numbers.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does division show a remainder?</h4>
            <p className="text-sm text-muted-foreground">
              Integer division doesn't produce decimals – it gives a quotient and remainder. For example, 17 ÷ 5 = 3 R2 (3 with remainder 2), not 3.4.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I calculate negative powers?</h4>
            <p className="text-sm text-muted-foreground">
              No, negative exponents produce fractions (2^(-3) = 1/8), which aren't integers. This calculator only handles integer results.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is this secure for cryptographic use?</h4>
            <p className="text-sm text-muted-foreground">
              No. While the math is correct, this runs client-side in JavaScript and isn't designed for security-critical applications. Use established cryptographic libraries for that.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is there a limit on the power operation?</h4>
            <p className="text-sm text-muted-foreground">
              Exponentiation grows extremely fast. 2^10000 has over 3,000 digits. Computing very large powers can freeze your browser. The limit of 10,000 for exponents balances usefulness with practical performance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between BigInt and regular numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Regular JavaScript numbers use 64-bit floating point, which loses precision for integers above 2^53. BigInt uses arbitrary precision, storing as many digits as needed. BigInt requires an "n" suffix in code (123n) but this calculator handles that automatically.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
