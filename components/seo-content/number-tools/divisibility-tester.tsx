import React from "react"

export default function DivisibilityTesterSeo() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Enter a number to test if it's divisible by another number. The tool shows whether division produces a whole number or leaves a remainder.
          </p>
          <p>
            Enable "test all divisors" to find every factor of a number. The tool lists all divisors from 1 up to the number itself, showing the complete factorization.
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium mb-2">Examples:</p>
            <pre className="text-xs font-mono bg-background p-2 rounded">Test: Is 100 divisible by 5?
Result: Yes ✓
100 ÷ 5 = 20 remainder 0

Test: Is 100 divisible by 7?
Result: No ✗
100 ÷ 7 = 14 remainder 2

All divisors of 100:
1, 2, 4, 5, 10, 20, 25, 50, 100
(9 divisors total)</pre>
          </div>
          <p>
            Built-in divisibility rules show quick mental math tricks. Test for 2, 3, 4, 5, 6, 7, 8, 9, 10, and 11 without doing the full division.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">When You'd Actually Use This</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Fraction simplification</h3>
            <p className="text-sm text-muted-foreground">
              Before simplifying 84/126, check common divisors. Both are divisible by 2 (even), by 3 (digit sum), and more. Finding the GCF requires testing divisibility.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Prime factorization</h3>
            <p className="text-sm text-muted-foreground">
              Breaking 360 into primes: divisible by 2 (yes), divide to get 180. Again by 2: 90. Again: 45. Now try 3: yes, get 15. Continue: 360 = 2³ × 3² × 5.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Equal distribution problems</h3>
            <p className="text-sm text-muted-foreground">
              Can 147 students be divided into equal teams of 7? Test divisibility: 147 ÷ 7 = 21 exactly. Yes, 21 teams of 7 students each works perfectly.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Packaging and grouping</h3>
            <p className="text-sm text-muted-foreground">
              You have 288 items. Can they be packed in boxes of 12? Test: 288 ÷ 12 = 24 exactly. Yes, 24 boxes with no leftovers. What about boxes of 15? 288 ÷ 15 = 19.2, so no.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Cryptography and number theory</h3>
            <p className="text-sm text-muted-foreground">
              RSA encryption relies on prime factorization being hard. Testing whether large numbers are divisible by small primes is the first step in factoring attempts.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Math competition preparation</h3>
            <p className="text-sm text-muted-foreground">
              Divisibility rules are essential for math contests. Quickly identifying that 4,536 is divisible by 9 (4+5+3+6=18, divisible by 9) saves calculation time.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What to Know Before Using</h2>
        <div className="space-y-3 text-muted-foreground">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Divisibility by 2: check the last digit.</strong>
              If the last digit is 0, 2, 4, 6, or 8, the number is even and divisible by 2. This is the easiest divisibility test.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Divisibility by 3: sum the digits.</strong>
              Add all digits. If the sum is divisible by 3, so is the original number. For 123: 1+2+3=6, which is divisible by 3, so 123 is divisible by 3.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Divisibility by 5: ends in 0 or 5.</strong>
              Numbers ending in 0 or 5 are divisible by 5. Numbers ending in 0 are also divisible by 10. This is useful for quick mental checks.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm">
              <strong className="text-foreground">Every number is divisible by 1 and itself.</strong>
              These are trivial divisors. When listing "all divisors," 1 and the number itself always appear. Prime numbers have exactly these two divisors.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Pro tip:</strong> For finding all divisors, you only need to check up to the square root. If 12 divides 144, then 144÷12=12 also divides 144. Pairs complete at the square root.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Common Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's the divisibility rule for 7?</h3>
            <p className="text-sm text-muted-foreground">
              Double the last digit, subtract from the rest. For 161: 16 - (2×1) = 14. Since 14 is divisible by 7, so is 161. Repeat if needed for large numbers.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How do I test divisibility by 11?</h3>
            <p className="text-sm text-muted-foreground">
              Alternating sum of digits. For 1353: 1 - 3 + 5 - 3 = 0. Since 0 is divisible by 11, so is 1353. If the result is 0 or divisible by 11, the number is divisible by 11.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a prime number?</h3>
            <p className="text-sm text-muted-foreground">
              A prime has exactly two divisors: 1 and itself. 2, 3, 5, 7, 11, 13 are prime. 4, 6, 8, 9, 10 are composite (have additional divisors). 1 is neither prime nor composite.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">How many divisors does a number have?</h3>
            <p className="text-sm text-muted-foreground">
              Use prime factorization. For 360 = 2³ × 3² × 5¹, add 1 to each exponent and multiply: (3+1)(2+1)(1+1) = 4×3×2 = 24 divisors.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What's a perfect number?</h3>
            <p className="text-sm text-muted-foreground">
              A perfect number equals the sum of its proper divisors (excluding itself). 6 has divisors 1, 2, 3, and 1+2+3=6. Next is 28: 1+2+4+7+14=28.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Is zero divisible by any number?</h3>
            <p className="text-sm text-muted-foreground">
              Zero divided by any non-zero number equals zero with remainder zero. So technically, zero is divisible by every non-zero integer. But division by zero is undefined.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="font-medium mb-2">What are coprime numbers?</h3>
            <p className="text-sm text-muted-foreground">
              Two numbers are coprime if their only common divisor is 1. For example, 8 and 15 are coprime. Their GCF is 1, even though neither is prime.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
