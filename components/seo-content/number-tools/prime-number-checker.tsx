import React from "react"

export default function PrimeNumberCheckerSEO() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">How the Prime Number Checker Works</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground">
            This tool determines whether a number is prime using efficient divisibility testing algorithms.
            For non-prime numbers, it displays all divisors and finds the nearest prime numbers above and below.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <h3 className="text-lg font-semibold">Prime Testing Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Enter a positive integer to test</li>
            <li>The tool checks divisibility starting from 2 up to the square root of the number</li>
            <li>If no divisors are found, the number is prime</li>
            <li>For non-prime numbers, all divisors are calculated and displayed</li>
            <li>The previous and next prime numbers are found for context</li>
            <li>Optional range finder lists all primes between two values</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specific Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Cryptography Key Validation</h3>
            <p className="text-sm text-muted-foreground">
              A developer working with RSA encryption needs to verify that chosen numbers are prime.
              They use this tool to quickly validate candidate primes before using them in key generation.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Math Homework and Study</h3>
            <p className="text-sm text-muted-foreground">
              A student learning about prime factorization checks their work by verifying which numbers are prime.
              The divisor list helps them understand the factorization of composite numbers.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Hash Function Design</h3>
            <p className="text-sm text-muted-foreground">
              A computer scientist designing a hash table needs prime numbers for table sizes to minimize collisions.
              They use the range finder to locate primes in their desired size range.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Mathematical Research and Exploration</h3>
            <p className="text-sm text-muted-foreground">
              An enthusiast exploring prime number patterns uses the tool to test hypotheses about prime distribution
              and verify conjectures about specific number ranges.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Programming Algorithm Testing</h3>
            <p className="text-sm text-muted-foreground">
              A developer writing their own prime-checking algorithm uses this tool to generate test cases
              and verify their implementation produces correct results.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">What to Know Before Using This Tool</h2>
        <div className="rounded-lg border bg-muted/30 p-6 space-y-4">
          <p className="text-muted-foreground">
            Understanding prime numbers and the tool&apos;s capabilities:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>A prime number is only divisible by 1 and itself</li>
            <li>The number 1 is NOT considered prime by mathematical convention</li>
            <li>2 is the only even prime number</li>
            <li>Range searches are limited to 10,000 numbers for performance</li>
            <li>Divisors are displayed for composite (non-prime) numbers</li>
            <li>Previous prime shows &quot;None&quot; for numbers less than 3</li>
            <li>Results can be copied for use in documentation or code</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What is a prime number?</h3>
            <p className="text-sm text-muted-foreground">
              A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.
              Examples: 2, 3, 5, 7, 11, 13. The number 4 is not prime because it&apos;s divisible by 2.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why isn&apos;t 1 considered a prime number?</h3>
            <p className="text-sm text-muted-foreground">
              By mathematical convention, 1 is not prime because it would break the Fundamental Theorem of Arithmetic
              (every number has a unique prime factorization). If 1 were prime, factorizations wouldn&apos;t be unique.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What&apos;s the largest prime number?</h3>
            <p className="text-sm text-muted-foreground">
              There&apos;s no largest prime - they go on infinitely (proven by Euclid). The largest known prime
              changes as mathematicians discover new ones. As of 2024, it&apos;s 2^82,589,933 - 1 with over 24 million digits.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">How do you find the next prime after a number?</h3>
            <p className="text-sm text-muted-foreground">
              The tool tests each number sequentially, checking if it&apos;s divisible by any number up to its square root.
              The first number that passes this test is the next prime.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">What are twin primes?</h3>
            <p className="text-sm text-muted-foreground">
              Twin primes are pairs of primes that differ by 2, like (3,5), (11,13), or (17,19).
              It&apos;s an open mathematical question whether there are infinitely many twin primes.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Why are prime numbers important in cryptography?</h3>
            <p className="text-sm text-muted-foreground">
              Prime numbers are fundamental to RSA encryption. The security relies on the fact that multiplying
              two large primes is easy, but factoring the result back to the original primes is extremely difficult.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
